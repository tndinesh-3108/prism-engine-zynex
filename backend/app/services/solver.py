"""
Deterministic Mathematical Solvers for PRISM Engine.
Integrates Advanced Psychological Vectorization and Macroeconomic Forecasting:
1. calculate_financial_viability(parent, career_cost)
2. calculate_conflict_index(student, parent)
3. calculate_career_match(student, career)

Imports: numpy, scipy
"""

from typing import Dict, Any, Union, Optional
import numpy as np
from scipy.spatial.distance import cosine
from scipy.special import expit


# Default career RIASEC and Big Five psychometric profiles for deterministic matching
CAREER_PSYCHOMETRIC_ARCHETYPES = {
    "ai-ml-engineer": {
        "riasec": {"R": 80.0, "I": 95.0, "A": 65.0, "S": 50.0, "E": 75.0, "C": 70.0},
        "big_five": {"Openness": 92.0, "Conscientiousness": 88.0, "Extraversion": 60.0, "Agreeableness": 70.0, "Neuroticism": 30.0},
        "default_automation_risk": 0.08,
        "default_sector_velocity": 14.5,
    },
    "data-scientist": {
        "riasec": {"R": 70.0, "I": 92.0, "A": 60.0, "S": 55.0, "E": 70.0, "C": 78.0},
        "big_five": {"Openness": 88.0, "Conscientiousness": 86.0, "Extraversion": 58.0, "Agreeableness": 72.0, "Neuroticism": 35.0},
        "default_automation_risk": 0.14,
        "default_sector_velocity": 12.0,
    },
    "robotics-engineer": {
        "riasec": {"R": 92.0, "I": 88.0, "A": 60.0, "S": 50.0, "E": 65.0, "C": 72.0},
        "big_five": {"Openness": 85.0, "Conscientiousness": 87.0, "Extraversion": 62.0, "Agreeableness": 68.0, "Neuroticism": 32.0},
        "default_automation_risk": 0.12,
        "default_sector_velocity": 11.2,
    },
    "cybersecurity-analyst": {
        "riasec": {"R": 75.0, "I": 90.0, "A": 55.0, "S": 50.0, "E": 72.0, "C": 85.0},
        "big_five": {"Openness": 82.0, "Conscientiousness": 90.0, "Extraversion": 55.0, "Agreeableness": 68.0, "Neuroticism": 28.0},
        "default_automation_risk": 0.10,
        "default_sector_velocity": 13.0,
    },
    "software-engineer": {
        "riasec": {"R": 78.0, "I": 86.0, "A": 65.0, "S": 55.0, "E": 68.0, "C": 75.0},
        "big_five": {"Openness": 84.0, "Conscientiousness": 85.0, "Extraversion": 60.0, "Agreeableness": 70.0, "Neuroticism": 34.0},
        "default_automation_risk": 0.22,
        "default_sector_velocity": 9.5,
    },
    "renewable-energy-engineer": {
        "riasec": {"R": 88.0, "I": 84.0, "A": 62.0, "S": 65.0, "E": 68.0, "C": 70.0},
        "big_five": {"Openness": 86.0, "Conscientiousness": 84.0, "Extraversion": 65.0, "Agreeableness": 78.0, "Neuroticism": 32.0},
        "default_automation_risk": 0.15,
        "default_sector_velocity": 10.8,
    },
    "ui-ux-designer": {
        "riasec": {"R": 50.0, "I": 70.0, "A": 96.0, "S": 78.0, "E": 72.0, "C": 58.0},
        "big_five": {"Openness": 95.0, "Conscientiousness": 80.0, "Extraversion": 75.0, "Agreeableness": 82.0, "Neuroticism": 38.0},
        "default_automation_risk": 0.25,
        "default_sector_velocity": 8.0,
    },
    "biomedical-engineer": {
        "riasec": {"R": 84.0, "I": 90.0, "A": 62.0, "S": 70.0, "E": 64.0, "C": 74.0},
        "big_five": {"Openness": 88.0, "Conscientiousness": 88.0, "Extraversion": 62.0, "Agreeableness": 76.0, "Neuroticism": 30.0},
        "default_automation_risk": 0.13,
        "default_sector_velocity": 10.2,
    },
    "biotechnology-researcher": {
        "riasec": {"R": 72.0, "I": 94.0, "A": 65.0, "S": 60.0, "E": 60.0, "C": 76.0},
        "big_five": {"Openness": 90.0, "Conscientiousness": 89.0, "Extraversion": 55.0, "Agreeableness": 74.0, "Neuroticism": 32.0},
        "default_automation_risk": 0.14,
        "default_sector_velocity": 9.8,
    },
    "environmental-data-analyst": {
        "riasec": {"R": 70.0, "I": 88.0, "A": 65.0, "S": 72.0, "E": 62.0, "C": 75.0},
        "big_five": {"Openness": 87.0, "Conscientiousness": 85.0, "Extraversion": 60.0, "Agreeableness": 80.0, "Neuroticism": 32.0},
        "default_automation_risk": 0.18,
        "default_sector_velocity": 9.2,
    },
    "physician-medicine": {
        "riasec": {"R": 65.0, "I": 92.0, "A": 55.0, "S": 94.0, "E": 72.0, "C": 80.0},
        "big_five": {"Openness": 82.0, "Conscientiousness": 95.0, "Extraversion": 75.0, "Agreeableness": 88.0, "Neuroticism": 26.0},
        "default_automation_risk": 0.11,
        "default_sector_velocity": 6.5,
    },
}


def calculate_financial_viability(
    parent: Union[Dict[str, Any], Any],
    career_cost: Union[float, int, Dict[str, Any]]
) -> float:
    """
    1. calculate_financial_viability(parent, career_cost)
    Calculates a derived Affordability Index using family micro-financials
    (annual income, savings, budget constraints).
    Returns a Match/Mismatch Index in the range [0.0, 100.0].
    """
    # 1. Parse parent financials
    if hasattr(parent, "__dict__"):
        p_dict = parent.__dict__
    elif isinstance(parent, dict):
        p_dict = parent
    else:
        p_dict = {}

    micro = p_dict.get("micro_financials") or {}
    annual_income = float(micro.get("annual_income") or p_dict.get("annual_income") or 1200000.0)
    savings = float(micro.get("savings") or p_dict.get("savings") or 450000.0)
    budget_constraint = float(
        micro.get("budget_constraint") or p_dict.get("annual_budget") or 600000.0
    )
    max_ceiling = float(p_dict.get("max_affordable_cost") or (budget_constraint * 1.33))

    # 2. Parse career cost
    if isinstance(career_cost, dict):
        edu_cost = float(career_cost.get("education_cost", 500000.0))
        living = float(career_cost.get("living_cost_estimate", 150000.0))
        duration = int(career_cost.get("duration_years", 4))
        total_cost = edu_cost + (living * duration * 0.5)
    else:
        total_cost = float(career_cost or 500000.0)

    # 3. Available family liquid capacity over 4-year degree timeline
    # 70% of available savings + 3.5 years of annual educational budget allocation
    available_liquidity = (savings * 0.70) + (budget_constraint * 3.5)
    effective_ceiling = max(max_ceiling, available_liquidity)

    # Affordability ratio R
    affordability_ratio = effective_ceiling / max(1.0, total_cost)

    # 4. SciPy Logistic Sigmoid Transformation
    # Center inflection at 1.0 (exact budget match = 75), slope = 4.0
    z = (affordability_ratio - 1.0) * 4.0
    sig = float(expit(z)) # ranges (0, 1)

    # Scale to 0-100 Match/Mismatch index
    if affordability_ratio >= 1.25:
        # Superior liquidity: 90 - 100
        affordability_index = 90.0 + min(10.0, (affordability_ratio - 1.25) * 10.0)
    elif affordability_ratio >= 1.0:
        # Feasible match: 78 - 90
        affordability_index = 78.0 + (affordability_ratio - 1.0) * 48.0
    elif affordability_ratio >= 0.75:
        # Tight budget / moderate gap: 50 - 77
        affordability_index = 50.0 + (affordability_ratio - 0.75) * 108.0
    else:
        # Severe mismatch: 10 - 49
        affordability_index = max(10.0, sig * 70.0)

    return round(float(np.clip(affordability_index, 0.0, 100.0)), 1)


def calculate_conflict_index(
    student: Union[Dict[str, Any], Any],
    parent: Union[Dict[str, Any], Any]
) -> float:
    """
    2. calculate_conflict_index(student, parent)
    Calculates the friction between the student's locus_of_control & RIASEC independence
    vs. the parent's intergenerational_mobility_drive & autonomy_support_index.
    Returns a 0-100 friction score.
    """
    if hasattr(student, "__dict__"):
        s_dict = student.__dict__
    elif isinstance(student, dict):
        s_dict = student
    else:
        s_dict = {}

    if hasattr(parent, "__dict__"):
        p_dict = parent.__dict__
    elif isinstance(parent, dict):
        p_dict = parent
    else:
        p_dict = {}

    # Student Parameters
    locus = str(s_dict.get("locus_of_control", "Internal")).strip().capitalize()
    # 'Internal' locus = 1.0 (high agency/self-determination); 'External' = 0.35
    locus_factor = 1.0 if locus == "Internal" else 0.35

    growth_mindset = float(s_dict.get("growth_mindset_score", 85)) / 100.0 # 0.0 to 1.0

    riasec = s_dict.get("riasec_scores") or {"R": 85.0, "I": 92.0, "A": 65.0, "S": 60.0, "E": 75.0, "C": 70.0}
    r_val = float(riasec.get("R", 80.0))
    i_val = float(riasec.get("I", 90.0))
    a_val = float(riasec.get("A", 65.0))
    s_val = float(riasec.get("S", 60.0))
    e_val = float(riasec.get("E", 75.0))
    c_val = float(riasec.get("C", 70.0))

    # RIASEC Independence Score:
    # Autonomous/Innovative drives (Investigative, Artistic, Enterprising) vs Normative/Conformist (Conventional, Social)
    independence_vector = (i_val * 0.40 + a_val * 0.40 + e_val * 0.20) / max(1.0, (c_val * 0.50 + s_val * 0.50))
    # Normalized roughly around 1.0
    norm_independence = float(np.clip(independence_vector / 1.5, 0.4, 1.6))

    # Student Autonomy Drive (0.0 to 1.0)
    student_autonomy_drive = float(
        np.clip(0.45 * locus_factor + 0.35 * norm_independence + 0.20 * growth_mindset, 0.2, 1.2)
    )

    # Parent Parameters
    mobility_drive = float(p_dict.get("intergenerational_mobility_drive", 80)) / 100.0 # 0.0 to 1.0
    autonomy_support = float(p_dict.get("autonomy_support_index", 75)) / 100.0       # 0.0 to 1.0

    # Parent Controlling Pressure:
    # High mobility drive with low autonomy support exerts high prescriptive control
    parent_control_pressure = mobility_drive * (1.0 - (autonomy_support * 0.85))

    # Interpersonal Friction Equation:
    # High student autonomy drive conflicting with high parent controlling pressure causes friction
    friction_interaction = student_autonomy_drive * parent_control_pressure

    # Baseline adjustment: when autonomy support is high (e.g. >= 0.75), conflict stays low (<= 25%)
    # When autonomy support is low (<= 0.35) and mobility drive is high, conflict reaches 70-90%
    scaled_conflict = (friction_interaction * 125.0) - (autonomy_support * 15.0)

    conflict_index = float(np.clip(scaled_conflict, 4.0, 96.0))
    return round(conflict_index, 1)


def calculate_career_match(
    student: Union[Dict[str, Any], Any],
    career: Union[Dict[str, Any], Any]
) -> float:
    """
    3. calculate_career_match(student, career)
    Uses Cosine Similarity on the RIASEC and Big Five psychometric vectors.
    Applies negative weights for automation_risk_index and positive weights for sector_velocity_10yr.
    Returns a 0-100 composite match score.
    """
    if hasattr(student, "__dict__"):
        s_dict = student.__dict__
    elif isinstance(student, dict):
        s_dict = student
    else:
        s_dict = {}

    if hasattr(career, "__dict__"):
        c_dict = career.__dict__
    elif isinstance(career, dict):
        c_dict = career
    else:
        c_dict = {}

    career_slug = c_dict.get("slug", "")

    # 1. Student 11-dimensional Psychometric Vector
    # [R, I, A, S, E, C, Openness, Conscientiousness, Extraversion, Agreeableness, Emotional_Stability]
    s_riasec = s_dict.get("riasec_scores") or {"R": 85.0, "I": 92.0, "A": 65.0, "S": 60.0, "E": 75.0, "C": 70.0}
    s_b5 = s_dict.get("big_five_scores") or {
        "Openness": 88.0,
        "Conscientiousness": 85.0,
        "Extraversion": 65.0,
        "Agreeableness": 70.0,
        "Neuroticism": 35.0,
    }

    student_vec = np.array([
        float(s_riasec.get("R", 80.0)),
        float(s_riasec.get("I", 90.0)),
        float(s_riasec.get("A", 65.0)),
        float(s_riasec.get("S", 60.0)),
        float(s_riasec.get("E", 75.0)),
        float(s_riasec.get("C", 70.0)),
        float(s_b5.get("Openness", 85.0)),
        float(s_b5.get("Conscientiousness", 85.0)),
        float(s_b5.get("Extraversion", 65.0)),
        float(s_b5.get("Agreeableness", 70.0)),
        float(100.0 - s_b5.get("Neuroticism", 35.0)), # Emotional Stability
    ], dtype=np.float64)

    # 2. Career Target Psychometric Vector
    archetype = CAREER_PSYCHOMETRIC_ARCHETYPES.get(career_slug, {})
    c_riasec = c_dict.get("target_riasec") or archetype.get("riasec") or {
        "R": 75.0, "I": 85.0, "A": 65.0, "S": 60.0, "E": 70.0, "C": 70.0
    }
    c_b5 = c_dict.get("target_big_five") or archetype.get("big_five") or {
        "Openness": 85.0, "Conscientiousness": 85.0, "Extraversion": 60.0, "Agreeableness": 70.0, "Neuroticism": 30.0
    }

    career_vec = np.array([
        float(c_riasec.get("R", 75.0)),
        float(c_riasec.get("I", 85.0)),
        float(c_riasec.get("A", 65.0)),
        float(c_riasec.get("S", 60.0)),
        float(c_riasec.get("E", 70.0)),
        float(c_riasec.get("C", 70.0)),
        float(c_b5.get("Openness", 85.0)),
        float(c_b5.get("Conscientiousness", 85.0)),
        float(c_b5.get("Extraversion", 60.0)),
        float(c_b5.get("Agreeableness", 70.0)),
        float(100.0 - c_b5.get("Neuroticism", 30.0)),
    ], dtype=np.float64)

    # 3. Compute Cosine Similarity with SciPy
    norm_s = np.linalg.norm(student_vec)
    norm_c = np.linalg.norm(career_vec)

    if norm_s > 0 and norm_c > 0:
        cos_dist = float(cosine(student_vec, career_vec))
        cos_sim = max(0.0, 1.0 - cos_dist)
    else:
        cos_sim = 0.85

    base_psychometric_match = cos_sim * 100.0

    # 4. Macroeconomic Weighting
    auto_risk = float(c_dict.get("automation_risk_index") or archetype.get("default_automation_risk", 0.15))
    sec_velocity = float(c_dict.get("sector_velocity_10yr") or archetype.get("default_sector_velocity", 8.5))

    # Negative penalty for automation risk (0.0 - 1.0): up to -20 points
    risk_penalty = auto_risk * 20.0

    # Positive bonus for sector velocity: benchmarked against baseline 7.0% growth
    velocity_bonus = float(np.clip((sec_velocity - 7.0) * 1.2, -6.0, 14.0))

    # Composite Match Score
    composite_score = base_psychometric_match - risk_penalty + velocity_bonus
    composite_score = float(np.clip(composite_score, 0.0, 100.0))

    return round(composite_score, 1)


def generate_automation_risk_warning(automation_risk_index: float) -> str:
    """Generates user-facing transparent advisory string regarding automation resilience."""
    if automation_risk_index <= 0.12:
        return f"Low Automation Risk ({int(automation_risk_index*100)}%) - Future-Proof AI Resilient"
    elif automation_risk_index <= 0.25:
        return f"Moderate Automation Risk ({int(automation_risk_index*100)}%) - Adaptive Technical Skills Recommended"
    else:
        return f"High Automation Vulnerability ({int(automation_risk_index*100)}%) - Proactive Human-in-the-Loop Specialization Critical"

