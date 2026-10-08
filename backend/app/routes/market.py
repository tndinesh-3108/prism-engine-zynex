from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.career import Career
from app.services.market_engine import get_market_intelligence, REGIONAL_STEAM_HUBS
from app.schemas.career import MarketIntelligenceResponse

router = APIRouter(prefix="/api", tags=["Market Intelligence"])


@router.get("/market", response_model=MarketIntelligenceResponse)
@router.get("/market/{career_identifier}", response_model=MarketIntelligenceResponse)
def get_market_data(career_identifier: str = "ai-ml-engineer", db: Session = Depends(get_db)):
    career_name = "AI / ML Engineer"
    career_id = 1
    slug = career_identifier

    if career_identifier.isdigit():
        career = db.query(Career).filter(Career.id == int(career_identifier)).first()
        if career:
            slug = career.slug
            career_name = career.name
            career_id = career.id
    else:
        career = db.query(Career).filter(Career.slug == career_identifier).first()
        if career:
            career_name = career.name
            career_id = career.id

    data = get_market_intelligence(slug)

    return MarketIntelligenceResponse(
        career_id=career_id,
        career_name=career_name,
        market_demand=data["market_demand"],
        growth_trend=data["growth_trend"],
        salary_potential=data["salary_potential"],
        top_skills_in_demand=data["top_skills_in_demand"],
        geographic_demand=data["geographic_demand"],
        emerging_steam_opportunities=data["emerging_steam_opportunities"],
        regional_hubs=REGIONAL_STEAM_HUBS,
        is_demo_data=True
    )

