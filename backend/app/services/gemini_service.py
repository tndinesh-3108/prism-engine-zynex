"""
Gemini AI Service for PRISM Engine.
Handles explainable AI summaries, parent-friendly translations, and AI Career Mentor chat.
The deterministic PRISM engine makes decisions; Gemini provides natural-language explainability.
Includes comprehensive offline fallback templates if GEMINI_API_KEY is not set or times out.
"""

import os
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

# Initialize Gemini if key is present
genai_client = None
if GEMINI_API_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        genai_client = genai.GenerativeModel("gemini-1.5-flash")
    except Exception as e:
        print(f"Warning: Could not initialize Gemini client: {e}")
        genai_client = None


def explain_career_dna(student_data: Dict[str, Any]) -> str:
    """Explains student cognitive aptitude, strengths, and risk profile."""
    name = student_data.get("name", "Student")
    skills = student_data.get("skills", {})
    interests = student_data.get("interests", [])
    aptitude = student_data.get("aptitude_score", 90.0)

    # If Gemini is live
    if genai_client:
        try:
            prompt = (
                f"You are the PRISM Engine AI Career Advisor. Analyze this student's profile concisely (3-4 sentences):\n"
                f"Student Name: {name}\n"
                f"Overall Aptitude Score: {aptitude}/100\n"
                f"Top Skills: {skills}\n"
                f"Interests: {interests}\n"
                f"Explain their cognitive strengths, how their skills align with STEAM domains, and their career readiness. "
                f"Keep it encouraging, precise, and professional."
            )
            response = genai_client.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"Gemini API fallback triggered for Career DNA: {e}")

    # High quality fallback template
    top_skills_list = sorted(skills.items(), key=lambda x: x[1], reverse=True)[:3]
    top_skill_names = [s[0] for s in top_skills_list] if top_skills_list else ["Analytical Thinking", "Problem Solving"]
    interests_str = ", ".join(interests) if interests else "Emerging Technology"

    return (
        f"Your PRISM Career DNA reflects an exceptional cognitive foundation with an aptitude score of {aptitude:.0f}/100. "
        f"You display distinctive mastery in {', '.join(top_skill_names)}, highlighting strong systematic problem-solving and structured algorithmic thinking. "
        f"Your deep interest in {interests_str} directly complements high-velocity STEAM sectors, positioning you well for quantitative and design-driven engineering pathways."
    )


def explain_recommendation(
    student_data: Dict[str, Any],
    parent_data: Dict[str, Any],
    career_data: Dict[str, Any],
    prism_scores: Dict[str, Any]
) -> str:
    """Explains why a specific career was ranked #1 or highly recommended."""
    career_name = career_data.get("name", "Target Career")
    prism_score = prism_scores.get("prism_score", 90)
    student_fit = prism_scores.get("student_fit", 90)
    financial_fit = prism_scores.get("financial_fit", 85)
    market_fit = prism_scores.get("market_fit", 95)
    parent_alignment = prism_scores.get("parent_alignment", 80)
    geographic_fit = prism_scores.get("geographic_fit", 90)

    if genai_client:
        try:
            prompt = (
                f"Explain why '{career_name}' is recommended for the student based on PRISM's multi-dimensional evaluation.\n"
                f"PRISM Score: {prism_score}/100 (Student Fit: {student_fit}%, Financial Fit: {financial_fit}%, "
                f"Market Fit: {market_fit}%, Parent Alignment: {parent_alignment}%, Geographic Fit: {geographic_fit}%).\n"
                f"Provide a 3-bullet concise explanation addressing Student Fit, Affordability, and Future Market Demand."
            )
            response = genai_client.generate_content(prompt)
            if response and response.text:
                return response.text.strip()
        except Exception as e:
            print(f"Gemini API fallback for recommendation explanation: {e}")

    # Fallback explanation
    return (
        f"{career_name} is ranked prominently with a PRISM Score of {prism_score}/100. "
        f"The recommendation combines strong cognitive and skill compatibility ({student_fit}%), "
        f"a financially feasible educational budget ({financial_fit}%), robust market expansion ({market_fit}%), "
        f"and harmonious parent expectation alignment ({parent_alignment}%)."
    )


def mentor_chat_response(
    user_message: str,
    student_context: Optional[Dict[str, Any]] = None,
    conversation_history: Optional[List[Dict[str, str]]] = None
) -> Dict[str, Any]:
    """
    Interactive PRISM AI Career Mentor response.
    Never overrides deterministic scores; grounds answers in PRISM findings.
    """
    student_name = student_context.get("name", "Student") if student_context else "Student"
    top_career = student_context.get("top_career", "AI / ML Engineer") if student_context else "AI / ML Engineer"

    if genai_client:
        try:
            system_context = (
                f"You are the PRISM AI Career Mentor, an expert mentor for school and college students in India.\n"
                f"Student Name: {student_name}\n"
                f"Student Context: {student_context}\n"
                f"Core Principles: Be encouraging, factual, and actionable. "
                f"Do not guess financial feasibility arbitrarily; refer to PRISM's financial constraint solver where relevant. "
                f"Give concise, structured answers with practical advice (degrees, skills, exams, local hubs)."
            )
            full_prompt = f"{system_context}\n\nStudent Question: {user_message}\nMentor Advice:"
            response = genai_client.generate_content(full_prompt)
            if response and response.text:
                return {
                    "reply": response.text.strip(),
                    "suggested_followups": [
                        "What exams should I take for this career?",
                        "How can I bridge my current skill gaps?",
                        "Is this career financially feasible for my family?"
                    ],
                    "is_gemini_generated": True
                }
        except Exception as e:
            print(f"Gemini API fallback for mentor: {e}")

    # Contextual template responses based on message keywords
    msg_lower = user_message.lower()

    if "skill" in msg_lower or "learn" in msg_lower:
        reply = (
            f"For {top_career}, prioritize building strong fundamentals first. "
            f"1. Core Programming (Python & Data Structures)\n"
            f"2. Applied Mathematics (Linear Algebra & Probability)\n"
            f"3. Domain Tools (PyTorch, SQL, and Docker)\n"
            f"Building 2-3 portfolio projects and publishing your GitHub repositories will demonstrate your capability to recruiters."
        )
        followups = ["What projects should I build?", "Which certifications are most respected?", "What is the education cost?"]
    elif "why" in msg_lower and ("recommend" in msg_lower or "data science" in msg_lower or "ai" in msg_lower):
        reply = (
            f"PRISM recommended {top_career} because your profile shows strong mathematical and analytical problem-solving abilities, "
            f"your education pathway fits comfortably within your family's ₹6,00,000 budget, and market hiring velocity in your region is currently at 95/100."
        )
        followups = ["What are the starting salaries?", "How do parents view this career?", "What are alternative careers?"]
    elif "after 12th" in msg_lower or "college" in msg_lower or "degree" in msg_lower:
        reply = (
            f"After 12th (PCM), the most strategic pathway is pursuing a B.Tech / B.E. in Computer Science, Artificial Intelligence, or Data Science. "
            f"Key entrance examinations to target include JEE Main, State CET (e.g. TNEA in Tamil Nadu), and BITSAT. "
            f"Make sure to maintain strong academic performance (85%+) to qualify for merit scholarships."
        )
        followups = ["Which scholarships are available?", "What entrance exams should I register for?", "Can I study locally?"]
    elif "afford" in msg_lower or "budget" in msg_lower or "loan" in msg_lower or "cost" in msg_lower:
        reply = (
            f"PRISM's Financial Constraint Solver evaluates pathways against your family's annual budget. "
            f"For top government and state institutions, tuition is typically ₹3-5 Lakhs for 4 years, which is well within your budget ceiling. "
            f"For private universities, educational loans up to 25% of total fees can be safely covered without heavy family financial stress."
        )
        followups = ["Show me scholarship options", "What is the 5-year expected ROI?", "Compare with other careers"]
    else:
        reply = (
            f"Hello {student_name}! As your PRISM Career Mentor, I am here to help you navigate your STEAM journey. "
            f"Based on your profile, your highest matching trajectory is {top_career}. "
            f"You can ask me about preparation roadmaps, skill requirements, college entrance exams, or family financial planning."
        )
        followups = [
            "What skills should I learn for AI engineering?",
            "Why was this career recommended?",
            "What entrance exams should I focus on?"
        ]

    return {
        "reply": reply,
        "suggested_followups": followups,
        "is_gemini_generated": False
    }

