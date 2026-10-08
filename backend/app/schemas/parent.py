from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class ParentCreate(BaseModel):
    student_id: int
    annual_budget: Optional[float] = Field(default=600000.0, ge=0, example=600000.0)
    max_affordable_cost: Optional[float] = Field(default=800000.0, ge=0, example=800000.0)
    # Advanced Macroeconomic & Sociological Parent Variables
    intergenerational_mobility_drive: int = Field(
        default=80, ge=0, le=100, description="Parental drive for upward intergenerational social & economic mobility (0-100)"
    )
    autonomy_support_index: int = Field(
        default=75, ge=0, le=100, description="Parental psychological autonomy support index (0-100)"
    )
    micro_financials: Dict[str, float] = Field(
        default_factory=lambda: {
            "annual_income": 1200000.0,
            "savings": 450000.0,
            "budget_constraint": 600000.0,
        },
        description="Granular family micro-financials: annual_income, savings, and budget_constraint",
    )
    loan_preference: str = Field(default="Low", example="Low") # "None", "Low", "Moderate", "High"
    risk_appetite: str = Field(default="Medium", example="Medium") # "Low", "Medium", "High"
    preferred_career_domain: str = Field(..., example="Engineering / Technology")
    preferred_location: str = Field(default="Chennai", example="Chennai")
    higher_study_expectation: str = Field(default="Yes", example="Yes")


class FinancialCheckRequest(BaseModel):
    student_id: Optional[int] = None
    career_id: Optional[int] = None
    education_cost: float
    living_cost: Optional[float] = 150000.0
    family_annual_budget: float
    max_affordable_ceiling: float
    scholarship_amount: Optional[float] = 0.0
    loan_preference: str = "Low"
    risk_appetite: str = "Medium"
    micro_financials: Optional[Dict[str, float]] = None


class FinancialCheckResponse(BaseModel):
    feasible: bool
    financial_fit_score: float # 0-100
    financial_viability_index: Optional[float] = None
    status_label: str # "✓ Financially Feasible", "✕ Financially Difficult", "⚠ Requires Scholarship/Loan"
    total_cost: float
    effective_cost: float
    budget_coverage: float
    remaining_budget: float
    loan_required: float
    financial_risk_level: str # "Low", "Medium", "High", "Critical"
    roi_score: float # 0-100
    optimization_breakdown: Dict[str, Any]
    explanation: str


class ConflictRequest(BaseModel):
    student_id: int
    parent_id: Optional[int] = None


class ConflictResponse(BaseModel):
    alignment_score: float # 0 - 100%
    conflict_index: float  # 0 - 100
    parent_student_conflict_index: Optional[float] = None
    alignment_level: str   # "High Harmony", "Moderate Tension", "Significant Divergence"
    dimension_breakdown: List[Dict[str, Any]]
    key_divergences: List[str]
    common_ground_careers: List[Dict[str, Any]]
    parent_friendly_summary: str
    gemini_generated: bool

