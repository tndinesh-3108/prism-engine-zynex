import datetime
from sqlalchemy import Column, Integer, String, Float, JSON, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    class_grade = Column(String(50), nullable=False)  # e.g., "12th Grade" or "2nd Year B.Tech"
    location = Column(String(100), nullable=False)    # e.g., "Chennai"
    academic_stream = Column(String(50), nullable=False) # e.g., "Science (PCM)"
    academic_score = Column(Float, nullable=False)     # e.g., 88.0
    aptitude_score = Column(Float, default=0.0)        # Overall aptitude score 0-100
    interests = Column(JSON, default=list)             # list of strings: ["AI", "Technology", "Robotics"]
    skills = Column(JSON, default=dict)                # dict: {"Programming": 92, "Mathematics": 89, ...}
    career_preferences = Column(JSON, default=dict)    # dict: {preferred_domains, work_style, risk_tolerance, preferred_location, higher_study}
    # Advanced Psychological Vectorization
    riasec_scores = Column(JSON, default=dict)          # dict: {"R": 85, "I": 92, "A": 65, "S": 60, "E": 75, "C": 70}
    big_five_scores = Column(JSON, default=dict)        # dict: {"Openness": 88, "Conscientiousness": 85, ...}
    locus_of_control = Column(String(50), default="Internal") # "Internal" or "External"
    growth_mindset_score = Column(Integer, default=85)  # 0 - 100
    liking_vs_ability_divergence = Column(Float, default=4.5)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    assessments = relationship("Assessment", back_populates="student", cascade="all, delete-orphan")
    parent_profile = relationship("Parent", back_populates="student", uselist=False, cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="student", cascade="all, delete-orphan")


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    logical_score = Column(Float, default=0.0)
    numerical_score = Column(Float, default=0.0)
    spatial_score = Column(Float, default=0.0)
    verbal_score = Column(Float, default=0.0)
    problem_solving_score = Column(Float, default=0.0)
    normalized_aptitude = Column(Float, default=0.0)
    raw_responses = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student = relationship("Student", back_populates="assessments")

