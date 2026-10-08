from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.models.student import Student, Assessment
from app.models.parent import Parent
from app.models.user import User
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)

router = APIRouter(prefix="/api/auth", tags=["Authentication & Portals"])


class StudentRegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, example="Priya Sharma")
    age: int = Field(default=17, ge=10, le=35)
    class_grade: str = Field(default="12th Grade")
    location: str = Field(default="Chennai")
    academic_stream: str = Field(default="Science (PCM)")
    academic_score: float = Field(default=85.0, ge=0, le=100)
    interests: Optional[List[str]] = Field(default_factory=list)
    skills: Optional[Dict[str, float]] = Field(default_factory=dict)
    career_preferences: Optional[Dict[str, Any]] = Field(default_factory=dict)


class ParentRegisterRequest(BaseModel):
    student_id: int
    annual_budget: float = Field(default=500000.0, ge=0)
    max_affordable_cost: float = Field(default=700000.0, ge=0)
    loan_preference: str = Field(default="Low")
    risk_appetite: str = Field(default="Medium")
    preferred_career_domain: str = Field(default="Engineering / Technology")
    preferred_location: str = Field(default="Chennai")
    higher_study_expectation: str = Field(default="Yes")


@router.post("/student")
def register_or_login_student(payload: StudentRegisterRequest, db: Session = Depends(get_db)):
    """Registers a fresh student or logs in existing student with updated details."""
    student = db.query(Student).filter(Student.name.ilike(payload.name.strip())).first()
    
    if not student:
        # Default skills if student has not completed assessment yet
        initial_skills = payload.skills or {
            "Programming": 75.0,
            "Mathematics": 80.0,
            "Problem Solving": 80.0,
            "Analytical Thinking": 78.0,
            "Creativity": 70.0,
            "Communication": 68.0,
        }
        student = Student(
            name=payload.name.strip(),
            age=payload.age,
            class_grade=payload.class_grade,
            location=payload.location,
            academic_stream=payload.academic_stream,
            academic_score=payload.academic_score,
            aptitude_score=payload.academic_score,
            interests=payload.interests or ["Technology", "AI"],
            skills=initial_skills,
            career_preferences=payload.career_preferences or {
                "preferred_domains": ["Technology", "Engineering"],
                "work_style": "Innovation & R&D",
                "risk_tolerance": "Moderate",
                "preferred_location": payload.location,
                "higher_study_preference": "M.Tech / MS after B.Tech"
            }
        )
        db.add(student)
        db.commit()
        db.refresh(student)

        # Create initial assessment record
        initial_assessment = Assessment(
            student_id=student.id,
            logical_score=student.academic_score,
            numerical_score=student.academic_score,
            spatial_score=student.academic_score,
            verbal_score=student.academic_score,
            problem_solving_score=student.academic_score,
            normalized_aptitude=student.academic_score,
            raw_responses={"initial": True}
        )
        db.add(initial_assessment)

        # Create baseline parent profile if not exists
        default_parent = Parent(
            student_id=student.id,
            annual_budget=600000.0,
            max_affordable_cost=800000.0,
            loan_preference="Low",
            risk_appetite="Medium",
            preferred_career_domain="Engineering / Technology",
            preferred_location=payload.location,
            higher_study_expectation="Yes"
        )
        db.add(default_parent)
        db.commit()
    else:
        # Update existing student's latest info
        student.age = payload.age
        student.class_grade = payload.class_grade
        student.location = payload.location
        student.academic_stream = payload.academic_stream
        student.academic_score = payload.academic_score
        if payload.interests:
            student.interests = payload.interests
        if payload.skills:
            student.skills = payload.skills
        db.commit()
        db.refresh(student)

    return {
        "status": "success",
        "student_id": student.id,
        "name": student.name,
        "role": "student",
        "class_grade": student.class_grade,
        "location": student.location,
        "message": f"Welcome, {student.name}! Student session activated."
    }


@router.post("/parent")
def register_or_login_parent(payload: ParentRegisterRequest, db: Session = Depends(get_db)):
    """Registers parent constraints linked directly to the selected student."""
    student = db.query(Student).filter(Student.id == payload.student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student record not found to link parent profile.")

    parent = db.query(Parent).filter(Parent.student_id == student.id).first()
    if not parent:
        parent = Parent(
            student_id=student.id,
            annual_budget=payload.annual_budget,
            max_affordable_cost=payload.max_affordable_cost,
            loan_preference=payload.loan_preference,
            risk_appetite=payload.risk_appetite,
            preferred_career_domain=payload.preferred_career_domain,
            preferred_location=payload.preferred_location,
            higher_study_expectation=payload.higher_study_expectation
        )
        db.add(parent)
    else:
        parent.annual_budget = payload.annual_budget
        parent.max_affordable_cost = payload.max_affordable_cost
        parent.loan_preference = payload.loan_preference
        parent.risk_appetite = payload.risk_appetite
        parent.preferred_career_domain = payload.preferred_career_domain
        parent.preferred_location = payload.preferred_location
        parent.higher_study_expectation = payload.higher_study_expectation

    db.commit()
    db.refresh(parent)

    return {
        "status": "success",
        "parent_id": parent.id,
        "student_id": student.id,
        "student_name": student.name,
        "annual_budget": parent.annual_budget,
        "max_affordable_cost": parent.max_affordable_cost,
        "role": "parent",
        "message": f"Parent profile linked to student {student.name} successfully."
    }


@router.get("/students")
def get_registered_students(db: Session = Depends(get_db)):
    """Returns all registered student profiles in the database for parent linking or selection."""
    students = db.query(Student).order_by(Student.id.desc()).all()
    return [
        {
            "id": s.id,
            "name": s.name,
            "class_grade": s.class_grade,
            "location": s.location,
            "academic_stream": s.academic_stream,
            "academic_score": s.academic_score,
            "created_at": s.created_at.isoformat() if s.created_at else None
        }
        for s in students
    ]


@router.get("/current/{student_id}")
def get_current_session_info(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    parent = db.query(Parent).filter(Parent.student_id == student.id).first()
    return {
        "student": {
            "id": student.id,
            "name": student.name,
            "class_grade": student.class_grade,
            "location": student.location,
            "academic_score": student.academic_score,
            "aptitude_score": student.aptitude_score
        },
        "parent": {
            "id": parent.id if parent else None,
            "annual_budget": parent.annual_budget if parent else 600000.0,
            "max_affordable_cost": parent.max_affordable_cost if parent else 800000.0,
            "loan_preference": parent.loan_preference if parent else "Low"
        } if parent else None
    }


# -------------------------------------------------------------
# Centralized Authentication & Token Management Endpoints
# -------------------------------------------------------------

class CentralLoginRequest(BaseModel):
    email: str = Field(..., example="student@prism.edu")
    password: str = Field(..., min_length=4, example="student123")
    role: Optional[str] = Field(None, example="student")


class CentralRegisterRequest(BaseModel):
    email: str
    password: str = Field(..., min_length=4)
    name: str
    role: str = Field("student", example="student")  # "student" or "parent"
    class_grade: Optional[str] = "12th Grade"
    location: Optional[str] = "Chennai"
    academic_stream: Optional[str] = "Science (PCM)"
    academic_score: Optional[float] = 85.0
    student_id: Optional[int] = None
    annual_budget: Optional[float] = 600000.0
    max_affordable_cost: Optional[float] = 800000.0
    loan_preference: Optional[str] = "Low"
    risk_appetite: Optional[str] = "Medium"
    preferred_career_domain: Optional[str] = "Engineering / Technology"


class DemoLoginRequest(BaseModel):
    role: str = Field("student", example="student")


@router.post("/login")
def login_user(payload: CentralLoginRequest, db: Session = Depends(get_db)):
    """Authenticates student or parent with email, password, and role check."""
    email_clean = payload.email.strip().lower()
    user = db.query(User).filter(User.email.ilike(email_clean)).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials.",
        )

    # Role enforcement check
    if payload.role and payload.role.strip().lower() != user.role.lower():
        role_title = user.role.capitalize()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This account is registered under the {role_title} role. Please switch to the {role_title} tab to sign in.",
        )

    token_claims = {
        "sub": str(user.id),
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "student_id": user.student_id,
        "parent_id": user.parent_id,
    }
    access_token = create_access_token(token_claims)

    return {
        "status": "success",
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "student_id": user.student_id,
            "parent_id": user.parent_id,
        },
        "message": f"Welcome back, {user.name}! Authenticated as {user.role.capitalize()}."
    }


@router.post("/register")
def register_user(payload: CentralRegisterRequest, db: Session = Depends(get_db)):
    """Registers a fresh student or parent account with encrypted password."""
    email_clean = payload.email.strip().lower()
    existing = db.query(User).filter(User.email.ilike(email_clean)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please log in instead.",
        )

    student_id = payload.student_id
    parent_id = None

    if payload.role.lower() == "student":
        student = Student(
            name=payload.name.strip(),
            age=17,
            class_grade=payload.class_grade or "12th Grade",
            location=payload.location or "Chennai",
            academic_stream=payload.academic_stream or "Science (PCM)",
            academic_score=payload.academic_score or 85.0,
            aptitude_score=payload.academic_score or 85.0,
            interests=["Technology", "AI"],
            skills={"Programming": 75.0, "Mathematics": 80.0, "Problem Solving": 80.0},
            career_preferences={
                "preferred_domains": ["Technology", "Engineering"],
                "work_style": "Innovation & R&D",
                "risk_tolerance": "Moderate",
                "preferred_location": payload.location or "Chennai",
            }
        )
        db.add(student)
        db.commit()
        db.refresh(student)
        student_id = student.id
    elif payload.role.lower() == "parent":
        if not student_id:
            first_student = db.query(Student).first()
            student_id = first_student.id if first_student else 1

        parent = Parent(
            student_id=student_id,
            annual_budget=payload.annual_budget or 600000.0,
            max_affordable_cost=payload.max_affordable_cost or 800000.0,
            loan_preference=payload.loan_preference or "Low",
            risk_appetite=payload.risk_appetite or "Medium",
            preferred_career_domain=payload.preferred_career_domain or "Engineering / Technology",
            preferred_location="Chennai",
            higher_study_expectation="Yes"
        )
        db.add(parent)
        db.commit()
        db.refresh(parent)
        parent_id = parent.id

    new_user = User(
        email=email_clean,
        hashed_password=hash_password(payload.password),
        name=payload.name.strip(),
        role=payload.role.lower(),
        student_id=student_id,
        parent_id=parent_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token_claims = {
        "sub": str(new_user.id),
        "email": new_user.email,
        "name": new_user.name,
        "role": new_user.role,
        "student_id": new_user.student_id,
        "parent_id": new_user.parent_id,
    }
    access_token = create_access_token(token_claims)

    return {
        "status": "success",
        "access_token": access_token,
        "token_type": "bearer",
        "role": new_user.role,
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name,
            "role": new_user.role,
            "student_id": new_user.student_id,
            "parent_id": new_user.parent_id,
        },
        "message": f"Account created successfully for {new_user.name}."
    }


@router.post("/demo-login")
def demo_login(payload: DemoLoginRequest, db: Session = Depends(get_db)):
    """Instant 1-Click demo authentication for evaluation without typing."""
    role = payload.role.strip().lower()
    target_email = "student@prism.edu" if role == "student" else "parent@prism.edu"

    user = db.query(User).filter(User.email == target_email).first()
    if not user:
        user = db.query(User).filter(User.role == role).first()
        if not user:
            demo_student = db.query(Student).first()
            s_id = demo_student.id if demo_student else 1
            if role == "student":
                user = User(
                    email="student@prism.edu",
                    hashed_password=hash_password("student123"),
                    name="Arun Kumar",
                    role="student",
                    student_id=s_id
                )
            else:
                demo_parent = db.query(Parent).first()
                user = User(
                    email="parent@prism.edu",
                    hashed_password=hash_password("parent123"),
                    name="K. Kumar (Parent)",
                    role="parent",
                    student_id=s_id,
                    parent_id=demo_parent.id if demo_parent else None
                )
            db.add(user)
            db.commit()
            db.refresh(user)

    token_claims = {
        "sub": str(user.id),
        "email": user.email,
        "name": user.name,
        "role": user.role,
        "student_id": user.student_id,
        "parent_id": user.parent_id,
    }
    access_token = create_access_token(token_claims)

    return {
        "status": "success",
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role,
            "student_id": user.student_id,
            "parent_id": user.parent_id,
        },
        "message": f"Logged in as Demo {user.role.capitalize()} ({user.name})."
    }


@router.get("/me")
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Returns the authenticated user details validated via JWT Bearer token."""
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role,
        "student_id": current_user.student_id,
        "parent_id": current_user.parent_id,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None
    }

