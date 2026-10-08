"""
PRISM Career Roadmap Engine.
Generates multi-stage visual career pathways from Current Stage to Target Career,
quantifying skill gaps and suggesting relevant certifications, projects, and exams.
"""

from typing import Dict, Any, List


DEFAULT_CAREER_ROADMAPS = {
    "ai-ml-engineer": [
        {
            "stage_number": 1,
            "stage_name": "Current Stage & Foundation",
            "description": "Strengthen core mathematical principles, calculus, and introductory scripting.",
            "skills_to_learn": ["Advanced Calculus", "Linear Algebra", "Python 3 Core", "Data Structures"],
            "recommended_certifications": ["Python for Everybody (Coursera / University of Michigan)"],
            "recommended_projects": ["Data Analysis of City Weather or Kaggle Titanic Benchmark"],
            "exams_and_milestones": ["Class 12 Boards (Target 85%+)", "JEE Main / State Engineering Entrance"],
            "estimated_duration": "Months 0 - 6"
        },
        {
            "stage_number": 2,
            "stage_name": "Undergraduate Degree & Core Computing",
            "description": "Enroll in Computer Science / AI / Data Science engineering degree program.",
            "skills_to_learn": ["Object Oriented Programming", "Database Systems (SQL)", "Design & Analysis of Algorithms"],
            "recommended_certifications": ["DeepLearning.AI Machine Learning Specialization (Andrew Ng)"],
            "recommended_projects": ["Predictive House Price Regression API using FastAPI"],
            "exams_and_milestones": ["Maintain 8.5+ CGPA", "Participate in Smart India Hackathon"],
            "estimated_duration": "Years 1 - 2"
        },
        {
            "stage_number": 3,
            "stage_name": "Applied ML, Deep Learning & MLOps",
            "description": "Master deep neural networks, computer vision, natural language processing, and cloud deployment.",
            "skills_to_learn": ["PyTorch", "HuggingFace Transformers", "Docker & CI/CD", "Vector Databases (Pinecone/Chroma)"],
            "recommended_certifications": ["AWS Certified Machine Learning - Specialty", "TensorFlow Developer Certificate"],
            "recommended_projects": ["Multi-Modal Document RAG Pipeline with Semantic Search"],
            "exams_and_milestones": ["GATE CSE (Optional for IIT M.Tech / PSU)", "Publish Student Conference Paper"],
            "estimated_duration": "Years 3 - 4"
        },
        {
            "stage_number": 4,
            "stage_name": "Industry Internship & Capstone",
            "description": "Gain real-world engineering exposure in deep-tech startups or enterprise AI research labs.",
            "skills_to_learn": ["Distributed Training", "Model Quantization & TensorRT", "Production Monitoring"],
            "recommended_certifications": ["Databricks Certified Machine Learning Associate"],
            "recommended_projects": ["Edge AI Inference on Jetson Nano for Autonomous Robotics"],
            "exams_and_milestones": ["Summer Internship at Zoho / TVS Tech / Flipkart Lab"],
            "estimated_duration": "Final Year (Months 36 - 48)"
        },
        {
            "stage_number": 5,
            "stage_name": "Target Career Entry: AI / ML Engineer",
            "description": "Full-time placement in AI Engineering, Generative AI Systems, or Applied Machine Learning.",
            "skills_to_learn": ["Agentic AI Workflows", "Model Governance & Safety"],
            "recommended_certifications": ["Google Cloud Professional Machine Learning Engineer"],
            "recommended_projects": ["Full-Stack Autonomous Agent Engine"],
            "exams_and_milestones": ["Offer acceptance at ₹9.0 - 18.0 LPA entry tier"],
            "estimated_duration": "Career Launch"
        }
    ]
}


def generate_career_roadmap(
    career: Dict[str, Any],
    student_profile: Dict[str, Any] = None
) -> Dict[str, Any]:
    """Generates an end-to-end milestone roadmap with personalized skill gaps."""
    slug = career.get("slug", "ai-ml-engineer")
    stages = DEFAULT_CAREER_ROADMAPS.get(slug, DEFAULT_CAREER_ROADMAPS["ai-ml-engineer"])

    student_skills = student_profile.get("skills", {}) if student_profile else {}
    required_skills = career.get("required_skills", {})

    skill_gaps = []
    for skill, req_val in required_skills.items():
        curr_val = student_skills.get(skill, 40.0)
        gap = max(0.0, req_val - curr_val)
        status = "Proficient" if gap <= 0 else ("Developing" if gap <= 20 else "Priority Focus")
        skill_gaps.append({
            "skill": skill,
            "current_level": int(curr_val),
            "target_level": int(req_val),
            "gap": int(gap),
            "status": status
        })

    advice = (
        f"To successfully transition into {career.get('name', 'this career')}, "
        f"focus first on bridging the gap in {', '.join([g['skill'] for g in skill_gaps if g['gap'] > 0][:2]) or 'core foundations'}. "
        f"Completing hands-on projects and securing an internship in Year 3 will elevate your hiring readiness."
    )

    return {
        "career_id": career.get("id", 1),
        "career_name": career.get("name", "AI / ML Engineer"),
        "education_path": career.get("education_path", "B.Tech in Computer Science / Artificial Intelligence"),
        "total_milestones": len(stages),
        "stages": stages,
        "current_student_skills": student_skills,
        "required_skills": required_skills,
        "skill_gaps": skill_gaps,
        "personalized_advice": advice
    }

