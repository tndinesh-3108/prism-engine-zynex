from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.career import Career
from app.models.student import Student
from app.schemas.recommendation import RoadmapResponse
from app.services.roadmap_engine import generate_career_roadmap

router = APIRouter(prefix="/api", tags=["Roadmap"])


@router.get("/roadmap/{career_identifier}", response_model=RoadmapResponse)
def get_roadmap(
    career_identifier: str,
    student_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    if career_identifier.isdigit():
        career = db.query(Career).filter(Career.id == int(career_identifier)).first()
    else:
        career = db.query(Career).filter(Career.slug == career_identifier).first()

    if not career:
        career = db.query(Career).first()
        if not career:
            raise HTTPException(status_code=404, detail="Career not found")

    student_dict = None
    if student_id:
        student = db.query(Student).filter(Student.id == student_id).first()
        if student:
            student_dict = {
                "name": student.name,
                "skills": student.skills or {}
            }
    else:
        # Default to first student if available
        student = db.query(Student).first()
        if student:
            student_dict = {
                "name": student.name,
                "skills": student.skills or {}
            }

    career_dict = {
        "id": career.id,
        "name": career.name,
        "slug": career.slug,
        "education_path": career.education_path,
        "required_skills": career.required_skills or {}
    }

    roadmap_data = generate_career_roadmap(career_dict, student_dict)
    return RoadmapResponse(**roadmap_data)

