from sqlalchemy import Column, Integer, String, Float, Text, JSON
from app.database import Base


class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False) # e.g. "AI / ML Engineer"
    slug = Column(String(100), unique=True, nullable=False) # e.g. "ai-ml-engineer"
    description = Column(Text, nullable=False)
    career_domain = Column(String(100), nullable=False)     # "Technology", "Engineering", "Design", etc.
    education_cost = Column(Float, nullable=False)          # e.g. 500000.0
    living_cost_estimate = Column(Float, default=150000.0)  # e.g. 150000.0 per year
    duration_years = Column(Integer, default=4)             # 4 years B.Tech / 3 years B.Sc
    required_skills = Column(JSON, default=dict)            # {"Programming": 85, "Mathematics": 85, ...}
    market_demand = Column(Float, default=80.0)             # 0-100 score
    growth_score = Column(Float, default=85.0)              # 0-100 score (projected 5-yr growth)
    salary_score = Column(Float, default=85.0)              # 0-100 score
    avg_starting_salary = Column(Float, default=800000.0)   # INR
    avg_mid_salary = Column(Float, default=2200000.0)       # INR
    geographic_demand = Column(JSON, default=dict)          # {"Chennai": 90, "Bengaluru": 98, ...}
    education_path = Column(Text, nullable=False)
    exam_options = Column(JSON, default=list)               # ["JEE Main", "JEE Advanced", "BITSAT", ...]
    roadmap_milestones = Column(JSON, default=list)         # List of roadmap stages and objectives
    is_stem = Column(Integer, default=1)
    # Advanced Macroeconomic Forecasting Attributes
    sector_velocity_10yr = Column(Float, default=8.5)       # Projected 10-year growth percentage
    automation_risk_index = Column(Float, default=0.15)     # 0.0 (immune) to 1.0 (highly automated)
    skill_elasticity = Column(Float, default=0.72)          # 0.0 to 1.0 adaptability score
    target_riasec = Column(JSON, default=dict)              # {"R": 80, "I": 90, ...}
    target_big_five = Column(JSON, default=dict)            # {"Openness": 85, ...}

