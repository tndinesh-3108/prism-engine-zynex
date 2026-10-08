from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.database import get_db
from app.models.parent import Parent
from app.models.student import Student
from app.models.career import Career
from app.services.career_engine import rank_and_evaluate_careers
from app.schemas.parent import (
    ParentCreate,
    FinancialCheckRequest,
    FinancialCheckResponse,
    ConflictRequest,
    ConflictResponse
)
from app.services.financial_solver import solve_financial_feasibility
from app.services.conflict_index import compute_conflict_index

router = APIRouter(prefix="/api", tags=["Parents"])


@router.post("/parents")
def create_or_update_parent(payload: ParentCreate, db: Session = Depends(get_db)):
    parent = db.query(Parent).filter(Parent.student_id == payload.student_id).first()
    annual_budget = payload.micro_financials.get("budget_constraint", payload.annual_budget or 600000.0) if payload.micro_financials else (payload.annual_budget or 600000.0)
    max_cost = payload.max_affordable_cost or (annual_budget * 1.33)

    if not parent:
        parent = Parent(
            student_id=payload.student_id,
            annual_budget=annual_budget,
            max_affordable_cost=max_cost,
            intergenerational_mobility_drive=payload.intergenerational_mobility_drive,
            autonomy_support_index=payload.autonomy_support_index,
            micro_financials=payload.micro_financials or {},
            loan_preference=payload.loan_preference,
            risk_appetite=payload.risk_appetite,
            preferred_career_domain=payload.preferred_career_domain,
            preferred_location=payload.preferred_location,
            higher_study_expectation=payload.higher_study_expectation
        )
        db.add(parent)
    else:
        parent.annual_budget = annual_budget
        parent.max_affordable_cost = max_cost
        parent.intergenerational_mobility_drive = payload.intergenerational_mobility_drive
        parent.autonomy_support_index = payload.autonomy_support_index
        parent.micro_financials = payload.micro_financials or parent.micro_financials or {}
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
        "message": "Parent financial and preference profile saved successfully."
    }


@router.get("/parents/{parent_id}")
def get_parent(parent_id: int, db: Session = Depends(get_db)):
    parent = db.query(Parent).filter(Parent.id == parent_id).first()
    if not parent:
        parent = db.query(Parent).first()
        if not parent:
            raise HTTPException(status_code=404, detail="Parent profile not found")

    return {
        "id": parent.id,
        "student_id": parent.student_id,
        "annual_budget": parent.annual_budget,
        "max_affordable_cost": parent.max_affordable_cost,
        "intergenerational_mobility_drive": parent.intergenerational_mobility_drive if parent.intergenerational_mobility_drive is not None else 80,
        "autonomy_support_index": parent.autonomy_support_index if parent.autonomy_support_index is not None else 75,
        "micro_financials": parent.micro_financials or {
            "annual_income": 1200000.0,
            "savings": 450000.0,
            "budget_constraint": parent.annual_budget or 600000.0,
        },
        "loan_preference": parent.loan_preference,
        "risk_appetite": parent.risk_appetite,
        "preferred_career_domain": parent.preferred_career_domain,
        "preferred_location": parent.preferred_location,
        "higher_study_expectation": parent.higher_study_expectation
    }


@router.post("/financial/check", response_model=FinancialCheckResponse)
def check_financial_feasibility(payload: FinancialCheckRequest):
    result = solve_financial_feasibility(
        education_cost=payload.education_cost,
        living_cost=payload.living_cost or 150000.0,
        family_annual_budget=payload.family_annual_budget,
        max_affordable_ceiling=payload.max_affordable_ceiling,
        scholarship_amount=payload.scholarship_amount or 0.0,
        loan_preference=payload.loan_preference,
        risk_appetite=payload.risk_appetite
    )
    return FinancialCheckResponse(**result)


@router.post("/conflict", response_model=ConflictResponse)
def analyze_parent_student_conflict(payload: ConflictRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == payload.student_id).first()
    if not student:
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    parent = db.query(Parent).filter(Parent.student_id == student.id).first()
    if not parent:
        parent = db.query(Parent).first()

    student_dict = {
        "name": student.name,
        "location": student.location,
        "interests": student.interests or [],
        "skills": student.skills or {},
        "career_preferences": student.career_preferences or {}
    }

    parent_dict = {
        "annual_budget": parent.annual_budget if parent else 600000.0,
        "max_affordable_cost": parent.max_affordable_cost if parent else 800000.0,
        "loan_preference": parent.loan_preference if parent else "Low",
        "risk_appetite": parent.risk_appetite if parent else "Medium",
        "preferred_career_domain": parent.preferred_career_domain if parent else "Engineering / Technology",
        "preferred_location": parent.preferred_location if parent else "Chennai",
        "higher_study_expectation": parent.higher_study_expectation if parent else "Yes"
    }

    conflict_data = compute_conflict_index(student_dict, parent_dict)
    return ConflictResponse(**conflict_data)


class DynamicSolveRequest(BaseModel):
    student_id: int
    annual_budget: float
    max_affordable_cost: float
    loan_preference: Optional[str] = "Low"
    risk_appetite: Optional[str] = "Medium"
    preferred_career_domain: Optional[str] = None


@router.post("/parents/dynamic-solve")
@router.post("/dynamic-solve")
def dynamic_solve_parent_constraints(payload: DynamicSolveRequest, db: Session = Depends(get_db)):
    """
    Dynamically recalculates career feasibility and options as parent moves fees slider.
    Updates the parent database record and re-runs SciPy optimization & 5-factor scoring.
    """
    from app.models.career import Career
    from app.models.recommendation import Recommendation
    from app.services.career_engine import rank_and_evaluate_careers

    student = db.query(Student).filter(Student.id == payload.student_id).first()
    if not student:
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

    parent = db.query(Parent).filter(Parent.student_id == student.id).first()
    if not parent:
        parent = Parent(
            student_id=student.id,
            annual_budget=payload.annual_budget,
            max_affordable_cost=payload.max_affordable_cost,
            loan_preference=payload.loan_preference or "Low",
            risk_appetite=payload.risk_appetite or "Medium",
            preferred_career_domain=payload.preferred_career_domain or "Engineering / Technology",
            preferred_location=student.location or "Chennai",
            higher_study_expectation="Yes"
        )
        db.add(parent)
    else:
        parent.annual_budget = payload.annual_budget
        parent.max_affordable_cost = payload.max_affordable_cost
        if payload.loan_preference:
            parent.loan_preference = payload.loan_preference
        if payload.risk_appetite:
            parent.risk_appetite = payload.risk_appetite
        if payload.preferred_career_domain:
            parent.preferred_career_domain = payload.preferred_career_domain

    db.commit()
    db.refresh(parent)

    careers = db.query(Career).all()
    careers_dicts = [
        {
            "id": c.id,
            "name": c.name,
            "slug": c.slug,
            "career_domain": c.career_domain,
            "education_cost": c.education_cost,
            "living_cost_estimate": c.living_cost_estimate,
            "duration_years": c.duration_years,
            "required_skills": c.required_skills or {},
            "market_demand": c.market_demand,
            "growth_score": c.growth_score,
            "salary_score": c.salary_score,
            "avg_starting_salary": c.avg_starting_salary,
            "geographic_demand": c.geographic_demand or {},
            "education_path": c.education_path
        }
        for c in careers
    ]

    student_dict = {
        "id": student.id,
        "name": student.name,
        "location": student.location,
        "academic_score": student.academic_score,
        "aptitude_score": student.aptitude_score or 85.0,
        "interests": student.interests or [],
        "skills": student.skills or {},
        "career_preferences": student.career_preferences or {}
    }

    parent_dict = {
        "annual_budget": parent.annual_budget,
        "max_affordable_cost": parent.max_affordable_cost,
        "loan_preference": parent.loan_preference,
        "risk_appetite": parent.risk_appetite,
        "preferred_career_domain": parent.preferred_career_domain,
        "preferred_location": parent.preferred_location
    }

    eval_result = rank_and_evaluate_careers(student_dict, parent_dict, careers_dicts)

    return {
        "status": "success",
        "student_id": student.id,
        "annual_budget": parent.annual_budget,
        "max_affordable_cost": parent.max_affordable_cost,
        "top_recommendations": eval_result["top_recommendations"][:5],
        "financially_difficult_careers": eval_result["financially_difficult_careers"],
        "total_feasible_count": len(eval_result["top_recommendations"]),
        "total_difficult_count": len(eval_result["financially_difficult_careers"])
    }


