import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base


class Parent(Base):
    __tablename__ = "parents"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), unique=True, nullable=False)
    annual_budget = Column(Float, nullable=False)           # e.g., 600000.0 (in INR)
    max_affordable_cost = Column(Float, nullable=False)     # e.g., 800000.0 total education ceiling
    # Advanced Sociological & Micro-financial attributes
    intergenerational_mobility_drive = Column(Integer, default=80) # 0 - 100
    autonomy_support_index = Column(Integer, default=75)          # 0 - 100
    micro_financials = Column(JSON, default=dict)                 # {"annual_income": ..., "savings": ..., "budget_constraint": ...}
    loan_preference = Column(String(50), default="Low")    # "None", "Low", "Moderate", "High"
    risk_appetite = Column(String(50), default="Medium")   # "Low", "Medium", "High"
    preferred_career_domain = Column(String(100), nullable=False) # e.g., "Engineering / Technology"
    preferred_location = Column(String(100), default="Chennai")   # e.g., "Chennai" or "Within State"
    higher_study_expectation = Column(String(50), default="Yes")  # "Yes", "No", "Optional"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="parent_profile")

