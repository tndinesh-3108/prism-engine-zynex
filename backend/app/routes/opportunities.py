from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional, List, Dict, Any
from app.database import get_db
from app.models.opportunity import Opportunity, Exam, Scholarship

router = APIRouter(prefix="/api", tags=["Opportunities"])


@router.get("/opportunities")
def get_opportunities(
    location: Optional[str] = None,
    career_domain: Optional[str] = None,
    type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Opportunity)
    if location and location != "All":
        query = query.filter(Opportunity.location.ilike(f"%{location}%"))
    if career_domain and career_domain != "All":
        query = query.filter(Opportunity.career_domain.ilike(f"%{career_domain}%"))
    if type and type != "All":
        query = query.filter(Opportunity.type.ilike(f"%{type}%"))

    items = query.all()
    return [
        {
            "id": op.id,
            "title": op.title,
            "type": op.type,
            "organization": op.organization,
            "location": op.location,
            "career_domain": op.career_domain,
            "eligibility": op.eligibility,
            "deadline": op.deadline,
            "stipend_or_award": op.stipend_or_award,
            "description": op.description,
            "url": op.url
        }
        for op in items
    ]


@router.get("/opportunities/trackers")
def get_trackers(db: Session = Depends(get_db)):
    exams = db.query(Exam).all()
    scholarships = db.query(Scholarship).all()

    return {
        "exams": [
            {
                "id": ex.id,
                "name": ex.name,
                "conducting_body": ex.conducting_body,
                "eligibility": ex.eligibility,
                "deadline": ex.deadline,
                "exam_date": ex.exam_date,
                "related_careers": ex.related_careers or [],
                "website": ex.website,
                "status": "Upcoming"
            }
            for ex in exams
        ],
        "scholarships": [
            {
                "id": sc.id,
                "name": sc.name,
                "provider": sc.provider,
                "amount": sc.amount,
                "eligibility": sc.eligibility,
                "deadline": sc.deadline,
                "application_url": sc.application_url,
                "status": "Active"
            }
            for sc in scholarships
        ]
    }

