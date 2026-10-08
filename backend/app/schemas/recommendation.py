from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class RecommendationItem(BaseModel):
    id: int
    career_id: int
    career_name: str
    slug: str
    career_domain: str
    rank: int
    prism_score: float
    student_fit: float
    financial_fit: float
    market_fit: float
    parent_alignment: float
    geographic_fit: float
    is_financially_difficult: bool
    financial_status: str
    education_cost: float
    avg_starting_salary: float
    why_explanation: str
    reasons: List[str]
    skill_gaps: List[str]
    required_skills: Dict[str, float]
    # Advanced Psychological & Macroeconomic Outputs
    student_career_match_score: float = 85.0
    financial_viability_index: float = 80.0
    parent_student_conflict_index: float = 20.0
    automation_risk_warning: str = "Low Automation Risk (<20%) - Future-Proof AI Resilient"
    sector_velocity_10yr: float = 8.5
    automation_risk_index: float = 0.15
    skill_elasticity: float = 0.72


class RecommendationsResponse(BaseModel):
    student_id: int
    student_name: str
    total_recommendations: int
    top_recommendations: List[RecommendationItem]
    financially_difficult_careers: List[RecommendationItem]
    scoring_weights: Dict[str, float]
    parent_budget: Optional[float] = None
    ai_summary: Optional[str] = None
    # Master Macro & Deterministic Indices
    student_career_match_score: Optional[float] = None
    financial_viability_index: Optional[float] = None
    parent_student_conflict_index: Optional[float] = None
    automation_risk_warning: Optional[str] = None


class RoadmapMilestone(BaseModel):
    stage_number: int
    stage_name: str
    description: str
    skills_to_learn: List[str]
    recommended_certifications: List[str]
    recommended_projects: List[str]
    exams_and_milestones: List[str]
    estimated_duration: str


class RoadmapResponse(BaseModel):
    career_id: int
    career_name: str
    education_path: str
    total_milestones: int
    stages: List[RoadmapMilestone]
    current_student_skills: Dict[str, float]
    required_skills: Dict[str, float]
    skill_gaps: List[Dict[str, Any]]
    personalized_advice: str


class MentorChatRequest(BaseModel):
    student_id: Optional[int] = None
    message: str
    conversation_history: Optional[List[Dict[str, str]]] = None


class MentorChatResponse(BaseModel):
    reply: str
    suggested_followups: List[str]
    is_gemini_generated: bool

