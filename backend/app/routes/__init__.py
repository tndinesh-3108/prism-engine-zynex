from app.routes.students import router as students_router
from app.routes.parents import router as parents_router
from app.routes.careers import router as careers_router
from app.routes.recommendations import router as recommendations_router
from app.routes.market import router as market_router
from app.routes.opportunities import router as opportunities_router
from app.routes.roadmap import router as roadmap_router
from app.routes.mentor import router as mentor_router
from app.routes.auth import router as auth_router
from app.routes.engine import router as engine_router

__all__ = [
    "students_router",
    "parents_router",
    "careers_router",
    "recommendations_router",
    "market_router",
    "opportunities_router",
    "roadmap_router",
    "mentor_router",
    "auth_router",
    "engine_router",
]

