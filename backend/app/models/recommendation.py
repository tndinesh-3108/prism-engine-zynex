import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    career_id = Column(Integer, ForeignKey("careers.id"), nullable=False)
    rank = Column(Integer, nullable=False)
    
    # 5 Dimensions
    prism_score = Column(Float, nullable=False)      # Weighted overall score 0-100
    student_fit = Column(Float, nullable=False)      # 35% weight
    financial_fit = Column(Float, nullable=False)    # 25% weight
    market_fit = Column(Float, nullable=False)       # 20% weight
    parent_alignment = Column(Float, nullable=False) # 10% weight
    geographic_fit = Column(Float, nullable=False)   # 10% weight
    
    # Financial constraint status
    is_financially_difficult = Column(Boolean, default=False)
    financial_status = Column(String(50), default="Feasible") # "Feasible", "Financially Difficult", "High Loan Risk"
    effective_cost = Column(Float, default=0.0)
    remaining_budget = Column(Float, default=0.0)
    loan_required = Column(Float, default=0.0)
    
    # Qualitative insights
    why_explanation = Column(Text, nullable=False)
    reasons = Column(JSON, default=list)             # List of bullet reasons
    skill_gaps = Column(JSON, default=list)           # List of skills to acquire
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="recommendations")
    career = relationship("Career")

