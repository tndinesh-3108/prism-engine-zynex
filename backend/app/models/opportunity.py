import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from app.database import Base


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    type = Column(String(50), nullable=False)        # "Internship", "Hackathon", "Innovation Lab", "Skill Program"
    organization = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)    # "Chennai", "Bengaluru", "Remote", etc.
    career_domain = Column(String(100), nullable=False)
    eligibility = Column(String(150), nullable=False)
    deadline = Column(String(50), nullable=False)
    stipend_or_award = Column(String(100), default="Certificates & Grants")
    description = Column(Text, nullable=False)
    url = Column(String(255), default="#")


class Exam(Base):
    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    conducting_body = Column(String(100), nullable=False)
    eligibility = Column(String(150), nullable=False)
    deadline = Column(String(50), nullable=False)
    exam_date = Column(String(50), nullable=False)
    related_careers = Column(JSON, default=list)
    website = Column(String(255), default="#")


class Scholarship(Base):
    __tablename__ = "scholarships"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    provider = Column(String(100), nullable=False)
    amount = Column(String(100), nullable=False)
    eligibility = Column(String(200), nullable=False)
    deadline = Column(String(50), nullable=False)
    application_url = Column(String(255), default="#")

