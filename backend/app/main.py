"""
PRISM Engine FastAPI Application.
Multi-Dimensional STEAM Career Guidance & Hyper-Local Innovation Platform.
"""

import os
import sys

# Ensure backend directory is in sys.path
_backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.routes import (
    students_router,
    parents_router,
    careers_router,
    recommendations_router,
    market_router,
    opportunities_router,
    roadmap_router,
    mentor_router,
    auth_router,
    engine_router,
)
from seed_data import seed_all_data

# Create database tables
Base.metadata.create_all(bind=engine)

# Auto seed if initial empty database
try:
    with SessionLocal() as db:
        seed_all_data(db, include_demo_student=True)
except Exception as e:
    print(f"Notice during startup seeding: {e}")

app = FastAPI(
    title="PRISM Engine API",
    description="Multi-Dimensional STEAM Career Guidance & Hyper-Local Innovation Platform",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)
app.include_router(students_router)
app.include_router(parents_router)
app.include_router(careers_router)
app.include_router(recommendations_router)
app.include_router(market_router)
app.include_router(opportunities_router)
app.include_router(roadmap_router)
app.include_router(mentor_router)
app.include_router(engine_router)


@app.get("/")
def root():
    return {
        "platform": "PRISM Engine",
        "tagline": "Turn career confusion into a clear, affordable and future-ready pathway.",
        "status": "Online",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
def healthcheck():
    return {"status": "healthy", "service": "PRISM Backend API"}

