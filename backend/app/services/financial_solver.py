"""
Financial Constraint Solver for PRISM Engine.
Evaluates tuition, living costs, family budget, loan appetite, and scholarships.
Uses SciPy linear programming (linprog) optimization to determine minimal financial stress.
"""

from typing import Dict, Any
import numpy as np
from scipy.optimize import linprog


def solve_financial_feasibility(
    education_cost: float,
    living_cost: float,
    family_annual_budget: float,
    max_affordable_ceiling: float,
    scholarship_amount: float = 0.0,
    loan_preference: str = "Low",
    risk_appetite: str = "Medium",
    avg_starting_salary: float = 800000.0,
    duration_years: int = 4
) -> Dict[str, Any]:
    """
    Computes financial feasibility, debt exposure, family stress, and 5-year ROI using SciPy optimization.
    """
    total_budget_ceiling = max(max_affordable_ceiling, family_annual_budget)
    total_education_cost = education_cost + (living_cost * duration_years * 0.5)
    effective_cost = max(0.0, total_education_cost - scholarship_amount)

    loan_cap_multiplier = {
        "None": 0.0,
        "Low": 0.25,
        "Moderate": 0.50,
        "High": 0.85
    }.get(loan_preference, 0.3)

    risk_tolerance_factor = {
        "Low": 0.8,
        "Medium": 1.0,
        "High": 1.3
    }.get(risk_appetite, 1.0)

    max_acceptable_loan = total_education_cost * loan_cap_multiplier * risk_tolerance_factor

    # SciPy Linear Programming Formulation
    # Variables: x = [family_contribution, loan_taken, unfunded_gap]
    # Minimize: w_family * x[0] + w_loan * x[1] + w_gap * x[2]
    w_gap = 1000.0
    w_loan = 2.5 if loan_preference in ["None", "Low"] else 1.2
    w_family = 1.0
    c = [w_family, w_loan, w_gap]

    # Equality constraint: x[0] + x[1] + x[2] == effective_cost
    A_eq = [[1.0, 1.0, 1.0]]
    b_eq = [effective_cost]

    # Variable bounds
    bounds = [
        (0.0, total_budget_ceiling),
        (0.0, max(0.0, max_acceptable_loan)),
        (0.0, None)
    ]

    try:
        res = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method="highs")
        if res.success:
            opt_family, opt_loan, opt_gap = res.x
        else:
            opt_family = min(total_budget_ceiling, effective_cost)
            opt_loan = max(0.0, min(max_acceptable_loan, effective_cost - opt_family))
            opt_gap = max(0.0, effective_cost - (opt_family + opt_loan))
    except Exception:
        opt_family = min(total_budget_ceiling, effective_cost)
        opt_loan = max(0.0, min(max_acceptable_loan, effective_cost - opt_family))
        opt_gap = max(0.0, effective_cost - (opt_family + opt_loan))

    # Feasibility evaluation
    is_financially_difficult = False

    remaining_budget = max(0.0, total_budget_ceiling - opt_family)
    loan_required = opt_loan

    # Evaluation conditions
    if effective_cost <= total_budget_ceiling * 0.85:
        # Fully comfortably affordable
        financial_fit_score = 92.0 + (1.0 - (effective_cost / max(1.0, total_budget_ceiling))) * 8.0
        status_label = "✓ Financially Feasible"
        risk_level = "Low"
    elif effective_cost <= total_budget_ceiling:
        # Affordable within threshold
        financial_fit_score = 80.0 + (1.0 - (effective_cost / total_budget_ceiling)) * 12.0
        status_label = "✓ Financially Feasible"
        risk_level = "Low-Medium"
    elif effective_cost <= total_budget_ceiling + max_acceptable_loan:
        # Feasible with student loan
        pct_over = (effective_cost - total_budget_ceiling) / max(1.0, max_acceptable_loan)
        financial_fit_score = max(52.0, 78.0 - (pct_over * 26.0))
        status_label = "⚠ Feasible with Educational Aid / Loan"
        risk_level = "Medium"
    else:
        # Exceeds family ceiling + acceptable loan limit
        is_financially_difficult = True
        excess_ratio = effective_cost / max(1.0, total_budget_ceiling)
        financial_fit_score = max(15.0, 48.0 - (excess_ratio * 10.0))
        status_label = "✕ Financially Difficult"
        risk_level = "High Risk / Out of Budget"

    # Strict loan preference check
    if loan_preference == "None" and effective_cost > total_budget_ceiling:
        is_financially_difficult = True
        status_label = "✕ Financially Difficult (Zero Loan Tolerance)"
        risk_level = "High Risk"
        financial_fit_score = min(financial_fit_score, 35.0)

    # 5-Year Return on Investment (ROI) score
    five_year_earnings = avg_starting_salary * 5.2
    roi_ratio = five_year_earnings / max(1.0, total_education_cost)
    roi_score = min(100.0, max(20.0, roi_ratio * 18.0))

    budget_coverage_pct = round(min(100.0, (total_budget_ceiling / max(1.0, effective_cost)) * 100.0), 1)

    explanation = (
        f"Pathway cost of ₹{total_education_cost:,.0f} vs family affordability ceiling of ₹{total_budget_ceiling:,.0f}. "
    )
    if is_financially_difficult:
        explanation += (
            f"Requires ₹{effective_cost - total_budget_ceiling:,.0f} in excess financing beyond approved thresholds, "
            f"making this financially difficult without significant external scholarships."
        )
    else:
        explanation += (
            f"Coverage is {budget_coverage_pct}% with estimated loan requirement of ₹{loan_required:,.0f}, "
            f"keeping family financial risk at {risk_level} with a 5-year ROI score of {roi_score:.0f}/100."
        )

    return {
        "feasible": not is_financially_difficult,
        "is_financially_difficult": is_financially_difficult,
        "financial_fit_score": round(financial_fit_score, 1),
        "status_label": status_label,
        "total_cost": round(total_education_cost, 2),
        "effective_cost": round(effective_cost, 2),
        "budget_coverage": budget_coverage_pct,
        "remaining_budget": round(remaining_budget, 2),
        "loan_required": round(loan_required, 2),
        "financial_risk_level": risk_level,
        "roi_score": round(roi_score, 1),
        "optimization_breakdown": {
            "optimal_family_contribution": round(opt_family, 2),
            "optimal_loan": round(opt_loan, 2),
            "scholarship_grant": round(scholarship_amount, 2),
            "unfunded_gap": round(opt_gap, 2),
        },
        "explanation": explanation
    }

