import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(String(20), nullable=False)  # "student" or "parent"
    student_id = Column(Integer, ForeignKey("students.id", ondelete="SET NULL"), nullable=True)
    parent_id = Column(Integer, ForeignKey("parents.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    student = relationship("Student", foreign_keys=[student_id], lazy="joined")
    parent = relationship("Parent", foreign_keys=[parent_id], lazy="joined")

