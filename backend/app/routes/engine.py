"""
Master PRISM Engine Route.
Executes advanced psychological vectorization and macroeconomic forecasting.
Endpoint: POST /api/engine/evaluate and GET /api/engine/evaluate/{student_id}
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any, List
from pydantic import BaseModel

from app.database import get_db
from app.models.student import Student
from app.models.parent import Parent
from app.models.career import Career
from app.services.career_engine import rank_and_evaluate_careers
from app.services.solver import (
    calculate_financial_viability,
    calculate_conflict_index,
    calculate_career_match,
    generate_automation_risk_warning,
)
from app.schemas.recommendation import RecommendationsResponse, RecommendationItem

router = APIRouter(prefix="/api/engine", tags=["Engine"])


class EngineEvaluationResponse(BaseModel):
    student_id: int
    student_name: str
    top_career_name: str
    student_career_match_score: float
    financial_viability_index: float
    parent_student_conflict_index: float
    automation_risk_warning: str
    sector_velocity_10yr: float
    automation_risk_index: float
    skill_elasticity: float
    total_recommendations: int
    top_recommendations: List[Dict[str, Any]]
    financially_difficult_careers: List[Dict[str, Any]]


@router.get("/evaluate/{student_id}", response_model=EngineEvaluationResponse)
@router.post("/evaluate/{student_id}", response_model=EngineEvaluationResponse)
def evaluate_master_engine(student_id: int, db: Session = Depends(get_db)):
    """
    Executes the 3 deterministic solvers:
    1. calculate_financial_viability(parent, career_cost)
    2. calculate_conflict_index(student, parent)
    3. calculate_career_match(student, career)
    """
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        student = db.query(Student).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")

    parent = db.query(Parent).filter(Parent.student_id == student.id).first()
    if not parent:
        parent = db.query(Parent).first()

    careers = db.query(Career).all()
    if not careers:
        raise HTTPException(status_code=404, detail="No careers found")

    student_dict = {
        "id": student.id,
        "name": student.name,
        "location": student.location,
        "academic_score": student.academic_score,
        "aptitude_score": student.aptitude_score or 90.0,
        "interests": student.interests or [],
        "skills": student.skills or {},
        "career_preferences": student.career_preferences or {},
        "riasec_scores": student.riasec_scores or {"R": 85.0, "I": 92.0, "A": 65.0, "S": 60.0, "E": 75.0, "C": 70.0},
        "big_five_scores": student.big_five_scores or {"Openness": 88.0, "Conscientiousness": 85.0, "Extraversion": 65.0, "Agreeableness": 70.0, "Neuroticism": 35.0},
        "locus_of_control": student.locus_of_control or "Internal",
        "growth_mindset_score": student.growth_mindset_score if student.growth_mindset_score is not None else 85,
        "liking_vs_ability_divergence": student.liking_vs_ability_divergence if student.liking_vs_ability_divergence is not None else 4.5,
    }

    parent_dict = {
        "annual_budget": parent.annual_budget if parent else 600000.0,
        "max_affordable_cost": parent.max_affordable_cost if parent else 800000.0,
        "intergenerational_mobility_drive": parent.intergenerational_mobility_drive if parent and parent.intergenerational_mobility_drive is not None else 80,
        "autonomy_support_index": parent.autonomy_support_index if parent and parent.autonomy_support_index is not None else 75,
        "micro_financials": (parent.micro_financials if parent and parent.micro_financials else {
            "annual_income": 1200000.0,
            "savings": 450000.0,
            "budget_constraint": parent.annual_budget if parent else 600000.0,
        }),
        "loan_preference": parent.loan_preference if parent else "Low",
        "risk_appetite": parent.risk_appetite if parent else "Medium",
        "preferred_career_domain": parent.preferred_career_domain if parent else "Engineering / Technology",
        "preferred_location": parent.preferred_location if parent else "Chennai"
    }

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
            "education_path": c.education_path,
            "sector_velocity_10yr": c.sector_velocity_10yr if c.sector_velocity_10yr is not None else 8.5,
            "automation_risk_index": c.automation_risk_index if c.automation_risk_index is not None else 0.15,
            "skill_elasticity": c.skill_elasticity if c.skill_elasticity is not None else 0.72,
            "target_riasec": c.target_riasec or {},
            "target_big_five": c.target_big_five or {},
        }
        for c in careers
    ]

    eval_result = rank_and_evaluate_careers(student_dict, parent_dict, careers_dicts)
    top_recs = eval_result["top_recommendations"]
    diff_recs = eval_result["financially_difficult_careers"]

    top_item = top_recs[0] if top_recs else {}
    top_career_cost = top_item.get("education_cost", 500000.0)

    # Deterministic Solvers Execution
    viability_idx = calculate_financial_viability(parent_dict, top_career_cost)
    conflict_idx = calculate_conflict_index(student_dict, parent_dict)
    match_score = calculate_career_match(student_dict, top_item)
    auto_risk = float(top_item.get("automation_risk_index", 0.15))
    sec_vel = float(top_item.get("sector_velocity_10yr", 8.5))
    elasticity = float(top_item.get("skill_elasticity", 0.72))
    warning = generate_automation_risk_warning(auto_risk)

    return EngineEvaluationResponse(
        student_id=student.id,
        student_name=student.name,
        top_career_name=top_item.get("career_name", "AI / ML Engineer"),
        student_career_match_score=match_score,
        financial_viability_index=viability_idx,
        parent_student_conflict_index=conflict_idx,
        automation_risk_warning=warning,
        sector_velocity_10yr=sec_vel,
        automation_risk_index=auto_risk,
        skill_elasticity=elasticity,
        total_recommendations=len(top_recs),
        top_recommendations=top_recs,
        financially_difficult_careers=diff_recs
    )

