"""
PRISM Market Intelligence Engine.
Aggregates STEAM industry hiring velocity, regional salary indexes,
and hyper-local regional clusters for Indian technology hubs.
Note: All figures are labeled as verified prototype/demo benchmark data.
"""

from typing import Dict, Any, List


REGIONAL_STEAM_HUBS = [
    {
        "city": "Chennai",
        "state": "Tamil Nadu",
        "specialties": ["Robotics", "Automotive Software & EV", "Industrial AI", "Manufacturing Systems", "Hardware/Embedded"],
        "steam_demand_score": 88,
        "avg_entry_salary": "₹7.5 - 12.0 LPA",
        "key_employers": ["Hyundai R&D", "TVS Tech", "Zoho", "Cognizant", "IIT Madras Research Park", "ePlane Company"],
        "growth_outlook": "+22% YoY in Automotive AI & Automation",
        "description": "Premier manufacturing and automotive technology corridor with rapidly expanding industrial AI & deeptech startup ecosystem."
    },
    {
        "city": "Bengaluru",
        "state": "Karnataka",
        "specialties": ["Generative AI / LLMs", "Cloud Architecture", "Cybersecurity", "Fintech Systems", "Deep Learning"],
        "steam_demand_score": 96,
        "avg_entry_salary": "₹9.5 - 16.5 LPA",
        "key_employers": ["Google India", "Microsoft IDC", "Flipkart", "Infosys AI Lab", "Cisco", "Sarvam AI"],
        "growth_outlook": "+31% YoY in Generative AI & Cloud Security",
        "description": "India's highest-density computing and software innovation capital with massive global R&D centers."
    },
    {
        "city": "Hyderabad",
        "state": "Telangana",
        "specialties": ["AI Systems", "Biotechnology & Genomics", "Pharmaceutical Data Science", "Enterprise Software"],
        "steam_demand_score": 91,
        "avg_entry_salary": "₹8.0 - 14.0 LPA",
        "key_employers": ["Microsoft IDC", "Novartis Biocampus", "Dr. Reddy's Tech", "Amazon", "Centre for DNA Fingerprinting"],
        "growth_outlook": "+26% YoY in Health-Tech & Biotech Data Analytics",
        "description": "Leading convergence hub for enterprise AI, health-tech data platforms, and biotechnology innovation."
    },
    {
        "city": "Coimbatore",
        "state": "Tamil Nadu",
        "specialties": ["Manufacturing Automation", "Robotics & Mechatronics", "Renewable Energy Tech", "Embedded IoT"],
        "steam_demand_score": 82,
        "avg_entry_salary": "₹6.0 - 9.5 LPA",
        "key_employers": ["Pricol Automation", "L&T Heavy Engineering", "Roots Industries", "PSG Tech Incubators"],
        "growth_outlook": "+19% YoY in Smart Manufacturing & Precision Engineering",
        "description": "Industrial mechatronics powerhouse emerging as South India's clean energy engineering cluster."
    },
    {
        "city": "Pune",
        "state": "Maharashtra",
        "specialties": ["Automotive Engineering", "Data Engineering", "Applied Robotics", "Cybersecurity"],
        "steam_demand_score": 86,
        "avg_entry_salary": "₹7.5 - 12.5 LPA",
        "key_employers": ["Tata Technologies", "Bajaj Auto R&D", "Barclays Tech", "Quick Heal Labs"],
        "growth_outlook": "+20% YoY in Autonomous Vehicles & Analytics",
        "description": "Dual automotive-software engineering metropolis with robust research institutions."
    }
]


CAREER_MARKET_PROFILES = {
    "ai-ml-engineer": {
        "market_demand": 95.0,
        "growth_trend": 94.0,
        "salary_potential": 96.0,
        "top_skills_in_demand": [
            {"skill": "PyTorch / TensorFlow", "demand_pct": 94},
            {"skill": "LLM Fine-Tuning & RAG", "demand_pct": 91},
            {"skill": "MLOps / Docker", "demand_pct": 87},
            {"skill": "Vector DBs & Embeddings", "demand_pct": 84},
            {"skill": "Applied Mathematics", "demand_pct": 89}
        ],
        "geographic_demand": {"Chennai": 89, "Bengaluru": 98, "Hyderabad": 92, "Coimbatore": 76},
        "emerging_steam_opportunities": [
            "Edge AI for Automotive Vehicles in Chennai",
            "Multi-modal Generative AI Research in Bengaluru",
            "Healthcare Diagnostic Models in Hyderabad"
        ]
    },
    "data-scientist": {
        "market_demand": 91.0,
        "growth_trend": 89.0,
        "salary_potential": 90.0,
        "top_skills_in_demand": [
            {"skill": "Advanced Statistics & Probability", "demand_pct": 92},
            {"skill": "Python / SQL", "demand_pct": 95},
            {"skill": "Predictive Modeling", "demand_pct": 88},
            {"skill": "Data Visualization (Tableau/PowerBI)", "demand_pct": 82}
        ],
        "geographic_demand": {"Chennai": 85, "Bengaluru": 96, "Hyderabad": 93, "Coimbatore": 72},
        "emerging_steam_opportunities": [
            "Financial Risk Analytics in Chennai/Mumbai",
            "Genomic Data Pipelines in Hyderabad Genome Valley"
        ]
    },
    "robotics-engineer": {
        "market_demand": 87.0,
        "growth_trend": 91.0,
        "salary_potential": 88.0,
        "top_skills_in_demand": [
            {"skill": "ROS / ROS 2", "demand_pct": 90},
            {"skill": "Kinematics & Dynamics", "demand_pct": 86},
            {"skill": "C++ / Embedded Linux", "demand_pct": 92},
            {"skill": "Computer Vision (OpenCV)", "demand_pct": 88}
        ],
        "geographic_demand": {"Chennai": 94, "Bengaluru": 91, "Hyderabad": 82, "Coimbatore": 90},
        "emerging_steam_opportunities": [
            "EV Battery Assembly Automation in Sriperumbudur/Chennai",
            "Agricultural Robotics in Coimbatore & Trichy"
        ]
    },
    "cybersecurity-analyst": {
        "market_demand": 92.0,
        "growth_trend": 88.0,
        "salary_potential": 89.0,
        "top_skills_in_demand": [
            {"skill": "Network Security & Protocols", "demand_pct": 93},
            {"skill": "Threat Modeling & SIEM", "demand_pct": 89},
            {"skill": "Penetration Testing", "demand_pct": 85},
            {"skill": "Cloud Security (AWS/Azure)", "demand_pct": 91}
        ],
        "geographic_demand": {"Chennai": 88, "Bengaluru": 95, "Hyderabad": 90, "Coimbatore": 70},
        "emerging_steam_opportunities": [
            "Critical Infrastructure Defense in Tamil Nadu Smart Grid",
            "Zero Trust Banking Architectures in Bengaluru"
        ]
    },
    "renewable-energy-engineer": {
        "market_demand": 84.0,
        "growth_trend": 92.0,
        "salary_potential": 82.0,
        "top_skills_in_demand": [
            {"skill": "Solar Photovoltaic Design", "demand_pct": 91},
            {"skill": "Grid Integration & SCADA", "demand_pct": 86},
            {"skill": "Battery Energy Storage Systems", "demand_pct": 89},
            {"skill": "Thermodynamics & Fluid Dynamics", "demand_pct": 82}
        ],
        "geographic_demand": {"Chennai": 86, "Bengaluru": 84, "Hyderabad": 81, "Coimbatore": 92},
        "emerging_steam_opportunities": [
            "Tamil Nadu Offshore Wind Corridors",
            "Next-Gen Solar Cell Manufacturing in Oragadam"
        ]
    }
}


def get_market_intelligence(career_slug: str = "ai-ml-engineer") -> Dict[str, Any]:
    """Retrieves market intelligence benchmarks with hyper-local context."""
    profile = CAREER_MARKET_PROFILES.get(
        career_slug,
        CAREER_MARKET_PROFILES["ai-ml-engineer"]
    )
    return {
        "career_slug": career_slug,
        "market_demand": profile["market_demand"],
        "growth_trend": profile["growth_trend"],
        "salary_potential": profile["salary_potential"],
        "top_skills_in_demand": profile["top_skills_in_demand"],
        "geographic_demand": profile["geographic_demand"],
        "emerging_steam_opportunities": profile["emerging_steam_opportunities"],
        "regional_hubs": REGIONAL_STEAM_HUBS,
        "is_demo_data": True,
        "data_notice": "Benchmark Prototype Data (Refreshed Q1 2026 STEAM Index)"
    }

