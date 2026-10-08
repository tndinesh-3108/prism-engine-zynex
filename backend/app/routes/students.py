from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.database import get_db
from app.models.student import Student, Assessment
from app.schemas.student import StudentCreate, AssessmentSubmit, CareerDNAResponse
from app.services.gemini_service import explain_career_dna

router = APIRouter(prefix="/api", tags=["Students"])


@router.post("/students")
def create_or_update_student(payload: StudentCreate, db: Session = Depends(get_db)):
    # Check if student exists or create new
    student = db.query(Student).filter(Student.name == payload.name).first()
    if not student:
        student = Student(
            name=payload.name,
            age=payload.age,
            class_grade=payload.class_grade,
            location=payload.location,
            academic_stream=payload.academic_stream,
            academic_score=payload.academic_score,
            aptitude_score=payload.academic_score * 0.95 + 4.0, # initial baseline
            interests=payload.interests,
            skills=payload.skills,
            career_preferences=payload.career_preferences
        )
        db.add(student)
    else:
        student.age = payload.age
        student.class_grade = payload.class_grade
        student.location = payload.location
        student.academic_stream = payload.academic_stream
        student.academic_score = payload.academic_score
        student.interests = payload.interests
        student.skills = payload.skills
        student.career_preferences = payload.career_preferences

    db.commit()
    db.refresh(student)
    return {
        "status": "success",
        "student_id": student.id,
        "message": f"Student profile for {student.name} saved successfully."
    }


@router.get("/students/{student_id}")
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        # Fallback to first student if available (for demo convenience)
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    return {
        "id": student.id,
        "name": student.name,
        "age": student.age,
        "class_grade": student.class_grade,
        "location": student.location,
        "academic_stream": student.academic_stream,
        "academic_score": student.academic_score,
        "aptitude_score": student.aptitude_score,
        "interests": student.interests,
        "skills": student.skills,
        "career_preferences": student.career_preferences,
        "riasec_scores": student.riasec_scores or {"R": 85.0, "I": 92.0, "A": 65.0, "S": 60.0, "E": 75.0, "C": 70.0},
        "big_five_scores": student.big_five_scores or {"Openness": 88.0, "Conscientiousness": 85.0, "Extraversion": 65.0, "Agreeableness": 70.0, "Neuroticism": 35.0},
        "locus_of_control": student.locus_of_control or "Internal",
        "growth_mindset_score": student.growth_mindset_score if student.growth_mindset_score is not None else 85,
        "liking_vs_ability_divergence": student.liking_vs_ability_divergence if student.liking_vs_ability_divergence is not None else 4.5,
    }


@router.post("/assessment")
def submit_assessment(payload: AssessmentSubmit, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == payload.student_id).first()
    if not student:
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    # Calculate category scores
    correct_counts = {}
    total_counts = {}

    for resp in payload.responses:
        cat = resp.category
        total_counts[cat] = total_counts.get(cat, 0) + 1
        if resp.is_correct:
            correct_counts[cat] = correct_counts.get(cat, 0) + 1

    def cat_pct(cat_name):
        tot = total_counts.get(cat_name, 1)
        corr = correct_counts.get(cat_name, 0)
        return round((corr / max(1, tot)) * 100.0, 1)

    logical = cat_pct("logical")
    numerical = cat_pct("numerical")
    spatial = cat_pct("spatial")
    verbal = cat_pct("verbal")
    problem_solving = cat_pct("problem_solving")

    normalized = round((logical + numerical + spatial + verbal + problem_solving) / 5.0, 1)

    # Save assessment record
    assessment_rec = Assessment(
        student_id=student.id,
        logical_score=logical,
        numerical_score=numerical,
        spatial_score=spatial,
        verbal_score=verbal,
        problem_solving_score=problem_solving,
        normalized_aptitude=normalized,
        raw_responses=payload.raw_responses or {}
    )
    db.add(assessment_rec)

    # Update student aptitude
    student.aptitude_score = normalized
    db.commit()

    return {
        "status": "success",
        "student_id": student.id,
        "aptitude_score": normalized,
        "category_scores": {
            "logical": logical,
            "numerical": numerical,
            "spatial": spatial,
            "verbal": verbal,
            "problem_solving": problem_solving
        }
    }


@router.get("/career-dna/{student_id}", response_model=CareerDNAResponse)
def get_career_dna(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    skills = student.skills or {}
    aptitude = student.aptitude_score or 91.0

    # Build Recharts Radar data structure
    radar_data = [
        {"subject": "Analytical Thinking", "A": skills.get("Analytical Thinking", 86), "fullMark": 100},
        {"subject": "Problem Solving", "A": skills.get("Problem Solving", 91), "fullMark": 100},
        {"subject": "Programming", "A": skills.get("Programming", 92), "fullMark": 100},
        {"subject": "Mathematics", "A": skills.get("Mathematics", 89), "fullMark": 100},
        {"subject": "Creativity", "A": skills.get("Creativity", 74), "fullMark": 100},
        {"subject": "Communication", "A": skills.get("Communication", 68), "fullMark": 100},
    ]

    # Calculate aggregate scores
    avg_skill = sum(skills.values()) / max(1, len(skills)) if skills else 85.0
    interest_count = len(student.interests or [])
    interest_score = min(100.0, 75.0 + interest_count * 8.0)
    academic_fit = min(100.0, student.academic_score * 1.05)

    # Sort top strengths
    sorted_skills = sorted(skills.items(), key=lambda x: x[1], reverse=True)
    top_strengths = [f"{s[0]} ({int(s[1])}/100)" for s in sorted_skills[:4]]

    # Generate AI summary
    student_dict = {
        "name": student.name,
        "aptitude_score": aptitude,
        "skills": skills,
        "interests": student.interests
    }
    ai_summary = explain_career_dna(student_dict)

    risk_prof = student.career_preferences.get("risk_tolerance", "Moderate") if student.career_preferences else "Moderate"

    riasec_data = student.riasec_scores or {"R": 85.0, "I": 92.0, "A": 65.0, "S": 60.0, "E": 75.0, "C": 70.0}
    big_five_data = student.big_five_scores or {"Openness": 88.0, "Conscientiousness": 85.0, "Extraversion": 65.0, "Agreeableness": 70.0, "Neuroticism": 35.0}

    riasec_radar = [
        {"subject": "Realistic (R)", "A": riasec_data.get("R", 85.0), "fullMark": 100},
        {"subject": "Investigative (I)", "A": riasec_data.get("I", 92.0), "fullMark": 100},
        {"subject": "Artistic (A)", "A": riasec_data.get("A", 65.0), "fullMark": 100},
        {"subject": "Social (S)", "A": riasec_data.get("S", 60.0), "fullMark": 100},
        {"subject": "Enterprising (E)", "A": riasec_data.get("E", 75.0), "fullMark": 100},
        {"subject": "Conventional (C)", "A": riasec_data.get("C", 70.0), "fullMark": 100},
    ]

    big_five_radar = [
        {"subject": "Openness", "A": big_five_data.get("Openness", 88.0), "fullMark": 100},
        {"subject": "Conscientiousness", "A": big_five_data.get("Conscientiousness", 85.0), "fullMark": 100},
        {"subject": "Extraversion", "A": big_five_data.get("Extraversion", 65.0), "fullMark": 100},
        {"subject": "Agreeableness", "A": big_five_data.get("Agreeableness", 70.0), "fullMark": 100},
        {"subject": "Emotional Stability", "A": 100.0 - big_five_data.get("Neuroticism", 35.0), "fullMark": 100},
    ]

    return CareerDNAResponse(
        student_id=student.id,
        student_name=student.name,
        aptitude_score=round(aptitude, 1),
        interest_score=round(interest_score, 1),
        skill_score=round(avg_skill, 1),
        academic_fit=round(academic_fit, 1),
        risk_profile=risk_prof,
        cognitive_radar=radar_data,
        riasec_radar=riasec_radar,
        big_five_radar=big_five_radar,
        riasec_scores=riasec_data,
        big_five_scores=big_five_data,
        locus_of_control=student.locus_of_control or "Internal",
        growth_mindset_score=student.growth_mindset_score if student.growth_mindset_score is not None else 88,
        liking_vs_ability_divergence=student.liking_vs_ability_divergence if student.liking_vs_ability_divergence is not None else 4.5,
        top_strengths=top_strengths,
        ai_dna_summary=ai_summary,
        gemini_generated=False
    )

