"""
Automated Verification Suite for PRISM Engine Backend.
Tests database tables, financial solver, conflict index, career matching, and API endpoints.
"""

import os
import sys

# Ensure backend directory is in sys.path for direct script execution
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Ensure stdout and stderr handle UTF-8 symbols (checkmarks, etc.) safely on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from fastapi.testclient import TestClient
from app.main import app
from app.services.financial_solver import solve_financial_feasibility
from app.services.conflict_index import compute_conflict_index
from app.services.gemini_service import explain_career_dna, mentor_chat_response


client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"
    print("[OK] Healthcheck passed.")


def test_financial_solver():
    # Feasible test: AI Engineering (INR 5,00,000) vs family budget INR 6,00,000
    res_feasible = solve_financial_feasibility(
        education_cost=500000.0,
        living_cost=100000.0,
        family_annual_budget=600000.0,
        max_affordable_ceiling=800000.0,
        loan_preference="Low",
        risk_appetite="Medium"
    )
    assert res_feasible["feasible"] is True
    assert res_feasible["financial_fit_score"] > 80.0
    print(f"[OK] Financial Solver (Feasible Case): Fit Score={res_feasible['financial_fit_score']}, Status={res_feasible['status_label']}")

    # Infeasible test: Medicine (INR 18,00,000) vs family budget INR 6,00,000
    res_infeasible = solve_financial_feasibility(
        education_cost=1800000.0,
        living_cost=250000.0,
        family_annual_budget=600000.0,
        max_affordable_ceiling=800000.0,
        loan_preference="Low",
        risk_appetite="Medium"
    )
    assert res_infeasible["feasible"] is False
    assert res_infeasible["is_financially_difficult"] is True
    print(f"[OK] Financial Solver (Difficult Case): Fit Score={res_infeasible['financial_fit_score']}, Status={res_infeasible['status_label']}")


def test_conflict_index():
    stud = {
        "interests": ["AI", "Technology", "Robotics"],
        "career_preferences": {"risk_tolerance": "Moderate", "preferred_location": "Chennai", "higher_study_preference": "M.Tech"}
    }
    parent = {
        "preferred_career_domain": "Engineering / Technology",
        "preferred_location": "Chennai",
        "risk_appetite": "Medium",
        "higher_study_expectation": "Yes"
    }
    conflict = compute_conflict_index(stud, parent)
    assert conflict["alignment_score"] >= 70.0
    assert "common_ground_careers" in conflict
    print(f"[OK] Conflict Index: Alignment={conflict['alignment_score']}%, Conflict={conflict['conflict_index']}/100, Level={conflict['alignment_level']}")


def test_recommendations_endpoint():
    # Arun Kumar is student 1
    res = client.get("/api/recommendations/1")
    assert res.status_code == 200
    data = res.json()
    top_recs = data["top_recommendations"]
    assert len(top_recs) > 0
    top_career = top_recs[0]
    print(f"[OK] Top Career Ranked: #{top_career['rank']} {top_career['career_name']} (PRISM Score: {top_career['prism_score']}/100)")
    print(f"  - Student Fit: {top_career['student_fit']}% | Financial Fit: {top_career['financial_fit']}% | Market Fit: {top_career['market_fit']}%")
    assert "AI" in top_career["career_name"] or "Data" in top_career["career_name"]

    # Verify high-cost career is marked Financially Difficult and excluded from top recommendations
    diff_careers = data["financially_difficult_careers"]
    diff_names = [c["career_name"] for c in diff_careers]
    print(f"[OK] Financially Difficult Careers properly segmented: {diff_names}")
    assert any("Medicine" in name for name in diff_names)


def test_mentor_endpoint():
    res = client.post("/api/mentor", json={"student_id": 1, "message": "What skills should I learn for AI engineering?"})
    assert res.status_code == 200
    data = res.json()
    assert len(data["reply"]) > 20
    print(f"[OK] AI Mentor reply generated: {data['reply'][:80]}...")


if __name__ == "__main__":
    test_health()
    test_financial_solver()
    test_conflict_index()
    test_recommendations_endpoint()
    test_mentor_endpoint()
    print("\nALL BACKEND VERIFICATION TESTS PASSED SUCCESSFULLY!")
