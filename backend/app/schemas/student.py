from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field


class StudentCreate(BaseModel):
    name: str = Field(..., example="Arun Kumar")
    age: int = Field(..., ge=12, le=30, example=17)
    class_grade: str = Field(..., example="12th Grade")
    location: str = Field(..., example="Chennai")
    academic_stream: str = Field(..., example="Science (PCM)")
    academic_score: float = Field(..., ge=0, le=100, example=88.0)
    interests: List[str] = Field(default_factory=list, example=["AI", "Technology", "Robotics"])
    skills: Dict[str, float] = Field(
        default_factory=dict,
        example={
            "Programming": 92.0,
            "Mathematics": 89.0,
            "Analytical Thinking": 86.0,
            "Problem Solving": 91.0,
            "Creativity": 74.0,
            "Communication": 68.0,
        },
    )
    career_preferences: Dict[str, Any] = Field(
        default_factory=dict,
        example={
            "preferred_domains": ["AI", "Engineering"],
            "work_style": "Innovation & Research",
            "risk_tolerance": "Moderate",
            "preferred_location": "Chennai",
            "higher_study_preference": "M.Tech / MS after B.Tech",
        },
    )
    # Advanced Psychological Vectorization
    riasec_scores: Dict[str, float] = Field(
        default_factory=lambda: {
            "R": 85.0,
            "I": 92.0,
            "A": 65.0,
            "S": 60.0,
            "E": 75.0,
            "C": 70.0,
        },
        description="Holland RIASEC profile: Realistic, Investigative, Artistic, Social, Enterprising, Conventional",
    )
    big_five_scores: Dict[str, float] = Field(
        default_factory=lambda: {
            "Openness": 88.0,
            "Conscientiousness": 85.0,
            "Extraversion": 65.0,
            "Agreeableness": 70.0,
            "Neuroticism": 35.0,
        },
        description="OCEAN Big Five personality dimension traits",
    )
    locus_of_control: str = Field(
        default="Internal",
        description="'Internal' (high autonomy & agency) or 'External'",
    )
    growth_mindset_score: int = Field(
        default=85,
        ge=0,
        le=100,
        description="Growth Mindset Score from 0 to 100",
    )
    liking_vs_ability_divergence: float = Field(
        default=4.5,
        description="Statistical divergence between expressed subject liking and demonstrated cognitive aptitude",
    )


class AssessmentQuestionAnswer(BaseModel):
    category: str # "logical", "numerical", "spatial", "verbal", "problem_solving"
    question_id: int
    selected_option: int
    is_correct: bool


class AssessmentSubmit(BaseModel):
    student_id: int
    responses: List[AssessmentQuestionAnswer]
    raw_responses: Optional[Dict[str, Any]] = None


class CareerDNAResponse(BaseModel):
    student_id: int
    student_name: str
    aptitude_score: float
    interest_score: float
    skill_score: float
    academic_fit: float
    risk_profile: str
    cognitive_radar: List[Dict[str, Any]] # [{"subject": "Analytical Thinking", "A": 86, "fullMark": 100}, ...]
    riasec_radar: Optional[List[Dict[str, Any]]] = None
    big_five_radar: Optional[List[Dict[str, Any]]] = None
    riasec_scores: Optional[Dict[str, float]] = None
    big_five_scores: Optional[Dict[str, float]] = None
    locus_of_control: Optional[str] = "Internal"
    growth_mindset_score: Optional[int] = 85
    liking_vs_ability_divergence: Optional[float] = 4.5
    top_strengths: List[str]
    ai_dna_summary: str
    gemini_generated: bool

