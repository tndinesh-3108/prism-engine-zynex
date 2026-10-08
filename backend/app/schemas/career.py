from typing import List, Dict, Any, Optional
from pydantic import BaseModel


class CareerBase(BaseModel):
    name: str
    slug: str
    description: str
    career_domain: str
    education_cost: float
    living_cost_estimate: float
    duration_years: int
    required_skills: Dict[str, float]
    market_demand: float
    growth_score: float
    salary_score: float
    avg_starting_salary: float
    avg_mid_salary: float
    geographic_demand: Dict[str, float]
    education_path: str
    exam_options: List[str]
    # Advanced Macroeconomic Forecasting Variables
    sector_velocity_10yr: float = 8.5
    automation_risk_index: float = 0.15 # 0.0 to 1.0
    skill_elasticity: float = 0.72      # 0.0 to 1.0
    target_riasec: Optional[Dict[str, float]] = None
    target_big_five: Optional[Dict[str, float]] = None


class CareerResponse(CareerBase):
    id: int
    roadmap_milestones: Optional[List[Dict[str, Any]]] = None

    class Config:
        from_attributes = True


class MarketIntelligenceResponse(BaseModel):
    career_id: Optional[int]
    career_name: Optional[str]
    market_demand: float
    growth_trend: float
    salary_potential: float
    top_skills_in_demand: List[Dict[str, Any]]
    geographic_demand: Dict[str, float]
    emerging_steam_opportunities: List[str]
    regional_hubs: List[Dict[str, Any]]
    is_demo_data: bool = True

