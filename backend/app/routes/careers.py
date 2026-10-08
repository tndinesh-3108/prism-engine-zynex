from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.career import Career
from app.schemas.career import CareerResponse

router = APIRouter(prefix="/api", tags=["Careers"])


@router.get("/careers", response_model=List[CareerResponse])
def get_all_careers(db: Session = Depends(get_db)):
    careers = db.query(Career).all()
    return careers


@router.get("/careers/{career_identifier}", response_model=CareerResponse)
def get_career(career_identifier: str, db: Session = Depends(get_db)):
    if career_identifier.isdigit():
        career = db.query(Career).filter(Career.id == int(career_identifier)).first()
    else:
        career = db.query(Career).filter(Career.slug == career_identifier).first()

    if not career:
        career = db.query(Career).first()
        if not career:
            raise HTTPException(status_code=404, detail="Career not found")

    return career

