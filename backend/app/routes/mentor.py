from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.student import Student
from app.models.recommendation import Recommendation
from app.schemas.recommendation import MentorChatRequest, MentorChatResponse
from app.services.gemini_service import mentor_chat_response

router = APIRouter(prefix="/api", tags=["AI Mentor"])


@router.post("/mentor", response_model=MentorChatResponse)
def chat_with_mentor(payload: MentorChatRequest, db: Session = Depends(get_db)):
    student_context = None

    # Load student context if student exists
    student_id = payload.student_id or 1
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        student = db.query(Student).first()

    if student:
        # Get top recommended career
        top_rec = (
            db.query(Recommendation)
            .filter(Recommendation.student_id == student.id, Recommendation.rank == 1)
            .first()
        )
        career_name = top_rec.career.name if top_rec and top_rec.career else "AI / ML Engineer"

        student_context = {
            "name": student.name,
            "class_grade": student.class_grade,
            "location": student.location,
            "academic_stream": student.academic_stream,
            "academic_score": student.academic_score,
            "aptitude_score": student.aptitude_score,
            "interests": student.interests,
            "skills": student.skills,
            "top_career": career_name
        }

    response = mentor_chat_response(
        user_message=payload.message,
        student_context=student_context,
        conversation_history=payload.conversation_history
    )

    return MentorChatResponse(**response)

