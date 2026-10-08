"""
Core PRISM Career Matching Engine.
Calculates 5-Dimensional Composite Scores:
35% Student Fit | 25% Financial Fit | 20% Market Fit | 10% Parent Alignment | 10% Geographic Fit
Enforces strict financial feasibility boundary constraints.
"""

from typing import Dict, Any, List
from app.services.financial_solver import solve_financial_feasibility
from app.services.conflict_index import calculate_domain_similarity
from app.services.solver import (
    calculate_financial_viability,
    calculate_conflict_index,
    calculate_career_match,
    generate_automation_risk_warning,
)


def compute_student_fit(
    student_profile: Dict[str, Any],
    career_profile: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Computes Student Fit based on Skills, Aptitude, Academic Score, and Interests.
    """
    student_skills = student_profile.get("skills", {})
    required_skills = career_profile.get("required_skills", {})

    # 1. Skill Match (Weight: 45%)
    skill_scores = []
    skill_gaps = []
    if required_skills:
        for skill_name, req_level in required_skills.items():
            stud_level = student_skills.get(skill_name, 50.0)
            # If student meets or exceeds requirement, high score; else proportional
            if stud_level >= req_level:
                match_pct = 100.0
            else:
                match_pct = max(30.0, (stud_level / max(1.0, req_level)) * 100.0)
                skill_gaps.append(f"{skill_name} (Current: {int(stud_level)}% vs Target: {int(req_level)}%)")
            skill_scores.append(match_pct)
        avg_skill_fit = sum(skill_scores) / len(skill_scores)
    else:
        avg_skill_fit = 80.0

    # 2. Aptitude Fit (Weight: 25%)
    aptitude_score = student_profile.get("aptitude_score", 85.0)

    # 3. Interest Fit (Weight: 20%)
    student_interests = student_profile.get("interests", [])
    career_domain = career_profile.get("career_domain", "")
    career_name = career_profile.get("name", "")
    interest_fit = 50.0

    for interest in student_interests:
        # Exact title match (e.g. "AI" in "AI / ML Engineer") gets top priority
        if interest.lower() in career_name.lower():
            interest_fit = 100.0
            break
        elif (interest.lower() in career_domain.lower() or
            career_domain.lower() in interest.lower()):
            interest_fit = max(interest_fit, 92.0)
        elif any(tech in interest.lower() for tech in ["ai", "tech", "robot", "data"]):
            if any(c_tech in career_name.lower() for c_tech in ["ai", "data", "software", "robot"]):
                interest_fit = max(interest_fit, 86.0)

    # 4. Academic Fit (Weight: 10%)
    acad_score = student_profile.get("academic_score", 80.0)
    academic_fit = min(100.0, max(50.0, acad_score * 1.05))

    student_fit = (
        avg_skill_fit * 0.45 +
        aptitude_score * 0.25 +
        interest_fit * 0.20 +
        academic_fit * 0.10
    )

    return {
        "student_fit": round(min(100.0, max(0.0, student_fit)), 1),
        "skill_gaps": skill_gaps,
        "avg_skill_fit": round(avg_skill_fit, 1)
    }


def compute_geographic_fit(
    student_location: str,
    parent_location: str,
    career_geo_demand: Dict[str, float]
) -> float:
    """Computes geographic alignment with local hiring clusters."""
    loc = student_location or parent_location or "Chennai"
    # Match local city demand if present
    for city, score in career_geo_demand.items():
        if city.lower() in loc.lower() or loc.lower() in city.lower():
            return float(score)

    # Fallback regional average
    if career_geo_demand:
        return sum(career_geo_demand.values()) / len(career_geo_demand)
    return 80.0


def rank_and_evaluate_careers(
    student_profile: Dict[str, Any],
    parent_profile: Dict[str, Any],
    careers_list: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """
    Main PRISM 5-factor scoring engine:
    PRISM SCORE = 35% Student Fit + 25% Financial Fit + 20% Market Fit + 10% Parent Alignment + 10% Geographic Fit
    Partitions into top recommendations and financially constrained pathways.
    """
    all_evaluated = []
    student_loc = student_profile.get("location", "Chennai")
    parent_loc = parent_profile.get("preferred_location", "Chennai")
    parent_budget = parent_profile.get("annual_budget", 600000.0)
    max_ceiling = parent_profile.get("max_affordable_cost", 800000.0)
    parent_loan_pref = parent_profile.get("loan_preference", "Low")
    parent_risk = parent_profile.get("risk_appetite", "Medium")
    parent_domain = parent_profile.get("preferred_career_domain", "Engineering / Technology")

    for career in careers_list:
        # 1. Student Fit (35%)
        s_eval = compute_student_fit(student_profile, career)
        student_fit = s_eval["student_fit"]
        skill_gaps = s_eval["skill_gaps"]

        # 2. Financial Fit (25%) & Hard Feasibility Constraint
        fin_eval = solve_financial_feasibility(
            education_cost=career.get("education_cost", 500000.0),
            living_cost=career.get("living_cost_estimate", 150000.0),
            family_annual_budget=parent_budget,
            max_affordable_ceiling=max_ceiling,
            scholarship_amount=0.0,
            loan_preference=parent_loan_pref,
            risk_appetite=parent_risk,
            avg_starting_salary=career.get("avg_starting_salary", 800000.0),
            duration_years=career.get("duration_years", 4)
        )
        financial_fit = fin_eval["financial_fit_score"]
        is_difficult = fin_eval["is_financially_difficult"]
        financial_status = fin_eval["status_label"]

        # 3. Market Fit (20%)
        m_demand = career.get("market_demand", 80.0)
        m_growth = career.get("growth_score", 85.0)
        m_salary = career.get("salary_score", 85.0)
        market_fit = round((m_demand * 0.45 + m_growth * 0.35 + m_salary * 0.20), 1)

        # 4. Parent Alignment (10%)
        domain_overlap = calculate_domain_similarity(
            student_domains=[career.get("career_domain", "Technology"), career.get("name", "")],
            parent_domain=parent_domain
        )
        parent_alignment = round(domain_overlap, 1)

        # 5. Geographic Fit (10%)
        geo_demand = career.get("geographic_demand", {})
        geographic_fit = round(compute_geographic_fit(student_loc, parent_loc, geo_demand), 1)

        # Composite PRISM SCORE
        prism_score = (
            student_fit * 0.35 +
            financial_fit * 0.25 +
            market_fit * 0.20 +
            parent_alignment * 0.10 +
            geographic_fit * 0.10
        )
        prism_score = round(min(100.0, max(0.0, prism_score)), 1)

        # Build transparent explanation bullets
        reasons = []
        if student_fit >= 80:
            reasons.append("Strong alignment with student's cognitive aptitude and core competencies.")
        if fin_eval["feasible"]:
            reasons.append(f"Financially feasible pathway within family ceiling (Budget coverage: {fin_eval['budget_coverage']}%).")
        else:
            reasons.append(f"Exceeds family affordability ceiling by ₹{fin_eval['effective_cost'] - max_ceiling:,.0f} - requires high external grant aid.")
        if market_fit >= 85:
            reasons.append(f"Robust market demand ({m_demand}/100) with projected {m_growth}/100 5-year growth trajectory.")
        if parent_alignment >= 75:
            reasons.append(f"High parent compatibility with {parent_domain} expectations.")
        if geographic_fit >= 80:
            reasons.append(f"Promising regional STEAM hiring density in {student_loc} and surrounding innovation corridors.")

        why_text = (
            f"{career['name']} achieves a PRISM Score of {prism_score}/100 because "
            f"student aptitude fit ({student_fit}%) and regional hiring demand ({market_fit}%) are high, "
            f"coupled with {fin_eval['financial_risk_level'].lower()} financial risk under family constraints."
        )

        # Advanced Deterministic Psychometric & Macroeconomic Solvers
        student_career_match_score = calculate_career_match(student_profile, career)
        financial_viability_index = calculate_financial_viability(parent_profile, career)
        conflict_idx = calculate_conflict_index(student_profile, parent_profile)
        auto_risk = float(career.get("automation_risk_index") if career.get("automation_risk_index") is not None else 0.15)
        sec_vel = float(career.get("sector_velocity_10yr") if career.get("sector_velocity_10yr") is not None else 8.5)
        elasticity = float(career.get("skill_elasticity") if career.get("skill_elasticity") is not None else 0.72)
        auto_warning = generate_automation_risk_warning(auto_risk)

        item = {
            "career_id": career.get("id", 1),
            "career_name": career.get("name", ""),
            "slug": career.get("slug", ""),
            "career_domain": career.get("career_domain", ""),
            "prism_score": prism_score,
            "student_fit": student_fit,
            "financial_fit": financial_fit,
            "market_fit": market_fit,
            "parent_alignment": parent_alignment,
            "geographic_fit": geographic_fit,
            "is_financially_difficult": is_difficult,
            "financial_status": financial_status,
            "education_cost": career.get("education_cost", 500000.0),
            "avg_starting_salary": career.get("avg_starting_salary", 800000.0),
            "why_explanation": why_text,
            "reasons": reasons,
            "skill_gaps": skill_gaps[:3],
            "required_skills": career.get("required_skills", {}),
            # Injected Deterministic Solver Outputs
            "student_career_match_score": student_career_match_score,
            "financial_viability_index": financial_viability_index,
            "parent_student_conflict_index": conflict_idx,
            "automation_risk_warning": auto_warning,
            "sector_velocity_10yr": sec_vel,
            "automation_risk_index": auto_risk,
            "skill_elasticity": elasticity,
        }
        all_evaluated.append(item)

    # Separate into feasible top recommendations and financially constrained
    top_recommendations = [c for c in all_evaluated if not c["is_financially_difficult"]]
    financially_difficult = [c for c in all_evaluated if c["is_financially_difficult"]]

    # Sort descending by PRISM score
    top_recommendations.sort(key=lambda x: x["prism_score"], reverse=True)
    financially_difficult.sort(key=lambda x: x["prism_score"], reverse=True)

    # Assign ranks
    for idx, c in enumerate(top_recommendations, start=1):
        c["rank"] = idx
    for idx, c in enumerate(financially_difficult, start=len(top_recommendations) + 1):
        c["rank"] = idx

    return {
        "top_recommendations": top_recommendations,
        "financially_difficult_careers": financially_difficult,
        "scoring_weights": {
            "student_fit": 0.35,
            "financial_fit": 0.25,
            "market_fit": 0.20,
            "parent_alignment": 0.10,
            "geographic_fit": 0.10
        }
    }
