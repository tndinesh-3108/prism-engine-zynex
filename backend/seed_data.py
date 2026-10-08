"""
Database Seeder for PRISM Engine.
Populates 10+ STEAM careers, demo student Arun Kumar, demo parent profile,
local STEAM opportunities, national exams, and scholarships.
"""

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.student import Student, Assessment
from app.models.parent import Parent
from app.models.career import Career
from app.models.opportunity import Opportunity, Exam, Scholarship


CAREERS_DATA = [
    {
        "name": "AI / ML Engineer",
        "slug": "ai-ml-engineer",
        "description": "Designs, trains, and deploys machine learning models, neural networks, and generative AI systems for autonomous agents and enterprise intelligence.",
        "career_domain": "Technology & Engineering",
        "education_cost": 450000.0,
        "living_cost_estimate": 75000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 90,
            "Mathematics": 88,
            "Analytical Thinking": 85,
            "Problem Solving": 90,
            "Creativity": 70,
            "Communication": 65
        },
        "market_demand": 95.0,
        "growth_score": 96.0,
        "salary_score": 94.0,
        "avg_starting_salary": 950000.0,
        "avg_mid_salary": 2400000.0,
        "geographic_demand": {"Chennai": 90, "Bengaluru": 98, "Hyderabad": 94, "Coimbatore": 76},
        "education_path": "B.Tech in Artificial Intelligence / Computer Science -> Applied ML Certifications -> Industry Internship",
        "exam_options": ["JEE Main", "JEE Advanced", "BITSAT", "TNEA"]
    },
    {
        "name": "Data Scientist",
        "slug": "data-scientist",
        "description": "Extracts actionable insights and predictive signals from massive datasets using advanced mathematical modeling, Bayesian statistics, and machine learning.",
        "career_domain": "Analytics & Software",
        "education_cost": 450000.0,
        "living_cost_estimate": 130000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 84,
            "Mathematics": 90,
            "Analytical Thinking": 92,
            "Problem Solving": 88,
            "Creativity": 68,
            "Communication": 75
        },
        "market_demand": 92.0,
        "growth_score": 90.0,
        "salary_score": 91.0,
        "avg_starting_salary": 850000.0,
        "avg_mid_salary": 2100000.0,
        "geographic_demand": {"Chennai": 86, "Bengaluru": 96, "Hyderabad": 92, "Coimbatore": 72},
        "education_path": "B.Tech in Data Science / Mathematics & Computing / Statistics -> Advanced Big Data & MLOps Specialization",
        "exam_options": ["JEE Main", "ISI Admission Test", "BITSAT", "TNEA"]
    },
    {
        "name": "Robotics Engineer",
        "slug": "robotics-engineer",
        "description": "Integrates mechanical design, mechatronics, embedded firmware, computer vision, and autonomous control algorithms to engineer intelligent robotic hardware.",
        "career_domain": "Hardware & Intelligent Systems",
        "education_cost": 550000.0,
        "living_cost_estimate": 140000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 82,
            "Mathematics": 86,
            "Analytical Thinking": 88,
            "Problem Solving": 90,
            "Creativity": 80,
            "Communication": 62
        },
        "market_demand": 88.0,
        "growth_score": 92.0,
        "salary_score": 87.0,
        "avg_starting_salary": 780000.0,
        "avg_mid_salary": 1950000.0,
        "geographic_demand": {"Chennai": 94, "Bengaluru": 90, "Hyderabad": 82, "Coimbatore": 91},
        "education_path": "B.Tech in Mechatronics / Mechanical & Robotics -> Embedded Systems & ROS Certification -> Hardware Capstone",
        "exam_options": ["JEE Main", "JEE Advanced", "TNEA", "SRMJEEE"]
    },
    {
        "name": "Cybersecurity Analyst",
        "slug": "cybersecurity-analyst",
        "description": "Defends organizational infrastructure against cyber threats, conducts penetration tests, security audits, and engineers cryptographically secure architectures.",
        "career_domain": "Technology & Security",
        "education_cost": 480000.0,
        "living_cost_estimate": 130000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 80,
            "Mathematics": 78,
            "Analytical Thinking": 92,
            "Problem Solving": 89,
            "Creativity": 72,
            "Communication": 70
        },
        "market_demand": 93.0,
        "growth_score": 89.0,
        "salary_score": 88.0,
        "avg_starting_salary": 800000.0,
        "avg_mid_salary": 2000000.0,
        "geographic_demand": {"Chennai": 88, "Bengaluru": 95, "Hyderabad": 91, "Coimbatore": 70},
        "education_path": "B.Tech in Information Security / Computer Science -> CEH / CompTIA Security+ -> Red Team Labs",
        "exam_options": ["JEE Main", "BITSAT", "TNEA", "VITEEE"]
    },
    {
        "name": "Software Engineer",
        "slug": "software-engineer",
        "description": "Architects robust cloud-native microservices, scalable distributed backends, and modern web systems using industry-grade software engineering patterns.",
        "career_domain": "Technology",
        "education_cost": 450000.0,
        "living_cost_estimate": 130000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 88,
            "Mathematics": 80,
            "Analytical Thinking": 85,
            "Problem Solving": 88,
            "Creativity": 75,
            "Communication": 74
        },
        "market_demand": 94.0,
        "growth_score": 86.0,
        "salary_score": 89.0,
        "avg_starting_salary": 820000.0,
        "avg_mid_salary": 2200000.0,
        "geographic_demand": {"Chennai": 91, "Bengaluru": 98, "Hyderabad": 95, "Coimbatore": 78},
        "education_path": "B.Tech in Computer Science & Engineering -> Full Stack Projects -> Cloud Systems Certification",
        "exam_options": ["JEE Main", "BITSAT", "TNEA", "VITEEE"]
    },
    {
        "name": "Renewable Energy Engineer",
        "slug": "renewable-energy-engineer",
        "description": "Pioneers sustainable energy systems, clean microgrids, high-capacity battery storage, and offshore wind turbines to accelerate global decarbonization.",
        "career_domain": "CleanTech & Engineering",
        "education_cost": 420000.0,
        "living_cost_estimate": 120000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 65,
            "Mathematics": 84,
            "Analytical Thinking": 86,
            "Problem Solving": 84,
            "Creativity": 78,
            "Communication": 72
        },
        "market_demand": 85.0,
        "growth_score": 93.0,
        "salary_score": 82.0,
        "avg_starting_salary": 680000.0,
        "avg_mid_salary": 1750000.0,
        "geographic_demand": {"Chennai": 87, "Bengaluru": 84, "Hyderabad": 80, "Coimbatore": 93},
        "education_path": "B.Tech in Electrical & Clean Energy Systems / Mechanical Engineering -> Grid Simulation Internship",
        "exam_options": ["JEE Main", "TNEA", "GATE Clean Energy"]
    },
    {
        "name": "UI/UX Designer",
        "slug": "ui-ux-designer",
        "description": "Crafts intuitive digital interfaces, accessible user experiences, behavioral prototypes, and design systems for next-generation consumer and enterprise apps.",
        "career_domain": "Design & Technology",
        "education_cost": 380000.0,
        "living_cost_estimate": 120000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 55,
            "Mathematics": 50,
            "Analytical Thinking": 76,
            "Problem Solving": 80,
            "Creativity": 96,
            "Communication": 88
        },
        "market_demand": 86.0,
        "growth_score": 84.0,
        "salary_score": 82.0,
        "avg_starting_salary": 650000.0,
        "avg_mid_salary": 1800000.0,
        "geographic_demand": {"Chennai": 82, "Bengaluru": 96, "Hyderabad": 88, "Coimbatore": 65},
        "education_path": "B.Des in Interaction Design / B.Tech in CSE with Design Specialization -> Figma Portfolio",
        "exam_options": ["UCEED", "NID DAT", "CEED"]
    },
    {
        "name": "Biomedical Engineer",
        "slug": "biomedical-engineer",
        "description": "Invents medical diagnostic instruments, neural implants, robotic surgical prosthetics, and physiological monitoring sensors bridging engineering and biology.",
        "career_domain": "Healthcare & Engineering",
        "education_cost": 520000.0,
        "living_cost_estimate": 130000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 72,
            "Mathematics": 82,
            "Analytical Thinking": 87,
            "Problem Solving": 86,
            "Creativity": 82,
            "Communication": 75
        },
        "market_demand": 82.0,
        "growth_score": 88.0,
        "salary_score": 83.0,
        "avg_starting_salary": 690000.0,
        "avg_mid_salary": 1700000.0,
        "geographic_demand": {"Chennai": 90, "Bengaluru": 88, "Hyderabad": 92, "Coimbatore": 80},
        "education_path": "B.Tech in Biomedical Engineering -> Medical Device Regulatory Certifications -> Hospital R&D Lab",
        "exam_options": ["JEE Main", "TNEA", "VITEEE"]
    },
    {
        "name": "Biotechnology Researcher",
        "slug": "biotechnology-researcher",
        "description": "Researches synthetic biology, CRISPR gene editing, mRNA vaccine platforms, and cellular bio-manufacturing in clinical research laboratories.",
        "career_domain": "Life Sciences & Research",
        "education_cost": 500000.0,
        "living_cost_estimate": 130000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 60,
            "Mathematics": 78,
            "Analytical Thinking": 92,
            "Problem Solving": 85,
            "Creativity": 84,
            "Communication": 76
        },
        "market_demand": 79.0,
        "growth_score": 87.0,
        "salary_score": 78.0,
        "avg_starting_salary": 620000.0,
        "avg_mid_salary": 1600000.0,
        "geographic_demand": {"Chennai": 84, "Bengaluru": 91, "Hyderabad": 96, "Coimbatore": 72},
        "education_path": "B.Tech / B.Sc in Biotechnology -> M.Sc / M.Tech in Molecular Genetics -> R&D Fellowship",
        "exam_options": ["GAT-B", "JAM", "JEE Main", "CUET"]
    },
    {
        "name": "Environmental Data Analyst",
        "slug": "environmental-data-analyst",
        "description": "Monitors greenhouse emissions, climate simulation datasets, satellite telemetry, and oceanic temperatures using spatial data algorithms and GIS tools.",
        "career_domain": "Environment & Data",
        "education_cost": 410000.0,
        "living_cost_estimate": 120000.0,
        "duration_years": 4,
        "required_skills": {
            "Programming": 78,
            "Mathematics": 84,
            "Analytical Thinking": 89,
            "Problem Solving": 82,
            "Creativity": 74,
            "Communication": 78
        },
        "market_demand": 80.0,
        "growth_score": 90.0,
        "salary_score": 79.0,
        "avg_starting_salary": 640000.0,
        "avg_mid_salary": 1650000.0,
        "geographic_demand": {"Chennai": 83, "Bengaluru": 88, "Hyderabad": 84, "Coimbatore": 82},
        "education_path": "B.Tech in Environmental Engineering / Earth Data Systems -> GIS & Remote Sensing Projects",
        "exam_options": ["JEE Main", "TNEA", "CUET"]
    },
    {
        "name": "Medicine / Specialist Physician (MBBS + MD)",
        "slug": "physician-medicine",
        "description": "Clinical diagnosis, surgical therapies, inpatient critical care, and specialized medical practice requiring intensive multi-year medical residency.",
        "career_domain": "Healthcare & Medicine",
        "education_cost": 1800000.0, # High cost to verify Financial Constraint Solver
        "living_cost_estimate": 250000.0,
        "duration_years": 5,
        "required_skills": {
            "Programming": 20,
            "Mathematics": 60,
            "Analytical Thinking": 92,
            "Problem Solving": 94,
            "Creativity": 70,
            "Communication": 92
        },
        "market_demand": 94.0,
        "growth_score": 90.0,
        "salary_score": 92.0,
        "avg_starting_salary": 900000.0,
        "avg_mid_salary": 2800000.0,
        "geographic_demand": {"Chennai": 95, "Bengaluru": 92, "Hyderabad": 94, "Coimbatore": 90},
        "education_path": "MBBS (5.5 years) -> 1 Year Mandatory Internship -> NEET PG -> MD Residency",
        "exam_options": ["NEET UG", "NEET PG"]
    }
]


OPPORTUNITIES_DATA = [
    {
        "title": "Autonomous Vehicle AI Summer Fellowship",
        "type": "Internship",
        "organization": "TVS Tech & IIT Madras Research Park",
        "location": "Chennai",
        "career_domain": "AI & Robotics",
        "eligibility": "B.Tech / 12th Grade STEAM Pass with Python Proficiency",
        "deadline": "April 30, 2026",
        "stipend_or_award": "₹25,000 / month Stipend",
        "description": "Work on computer vision algorithms for 2-wheeler collision warning radars in Chennai automotive labs.",
        "url": "https://iitmrp.org"
    },
    {
        "title": "Smart India Hackathon (SIH 2026)",
        "type": "Hackathon",
        "organization": "Ministry of Education & AICTE",
        "location": "All India (Regional Centres)",
        "career_domain": "Software, AI & Mechatronics",
        "eligibility": "School (Class 9-12) & College STEAM Students",
        "deadline": "May 15, 2026",
        "stipend_or_award": "₹1,00,000 Cash Prize per problem statement",
        "description": "Nationwide digital product innovation competition solving government ministry and public challenges.",
        "url": "https://sih.gov.in"
    },
    {
        "title": "Zoho University Young Creator Incubation",
        "type": "Skill Program",
        "organization": "Zoho Corporation",
        "location": "Chennai / Tenkasi",
        "career_domain": "Software & Web Systems",
        "eligibility": "Students completed Class 12 or Polytechnic",
        "deadline": "Rolling Admissions",
        "stipend_or_award": "₹10,000 monthly stipend + Free Tuition",
        "description": "Hands-on experiential software engineering academy replacing conventional university tuition with real development.",
        "url": "https://zohoschools.com"
    },
    {
        "title": "Generative AI Systems Innovation Grant",
        "type": "Innovation Lab",
        "organization": "Karnataka Digital Economy Mission (KDEM)",
        "location": "Bengaluru",
        "career_domain": "Technology",
        "eligibility": "Student STEAM Builders under 22",
        "deadline": "June 10, 2026",
        "stipend_or_award": "₹5,00,000 Prototype Seed Grant",
        "description": "Prototyping grant for open-weights LLM solutions in Indian regional languages.",
        "url": "https://kdem.org"
    },
    {
        "title": "Clean Energy Smart Grid Hackathon",
        "type": "Hackathon",
        "organization": "TEDA & Coimbatore Innovation Hub",
        "location": "Coimbatore",
        "career_domain": "CleanTech",
        "eligibility": "Engineering & Polytechnic Students",
        "deadline": "May 20, 2026",
        "stipend_or_award": "₹75,000 First Prize + Incubation",
        "description": "Design smart micro-inverters and battery storage algorithms for solar rooftop systems.",
        "url": "https://teda.in"
    }
]


EXAMS_DATA = [
    {
        "name": "JEE Main (Joint Entrance Examination)",
        "conducting_body": "National Testing Agency (NTA)",
        "eligibility": "Class 12 Passed/Appearing (Physics, Chemistry, Mathematics)",
        "deadline": "December 2026",
        "exam_date": "January & April 2027",
        "related_careers": ["AI / ML Engineer", "Software Engineer", "Robotics Engineer", "Renewable Energy Engineer"],
        "website": "https://jeemain.nta.ac.in"
    },
    {
        "name": "BITSAT",
        "conducting_body": "BITS Pilani",
        "eligibility": "Class 12 with 75% aggregate in PCM",
        "deadline": "April 2027",
        "exam_date": "May & June 2027",
        "related_careers": ["AI / ML Engineer", "Data Scientist", "Software Engineer"],
        "website": "https://bitsadmission.com"
    },
    {
        "name": "TNEA (Tamil Nadu Engineering Admissions)",
        "conducting_body": "Directorate of Technical Education (DoTE) TN",
        "eligibility": "Class 12 Maths, Physics, Chemistry merit cutoff",
        "deadline": "June 2027",
        "exam_date": "Merit List based on Board Scores",
        "related_careers": ["AI / ML Engineer", "Robotics Engineer", "Renewable Energy Engineer", "Cybersecurity Analyst"],
        "website": "https://tneaonline.org"
    },
    {
        "name": "UCEED (Undergraduate Common Entrance Exam for Design)",
        "conducting_body": "IIT Bombay",
        "eligibility": "Class 12 in any stream (Science for B.Des at IIT Delhi/IIT Guwahati)",
        "deadline": "November 2026",
        "exam_date": "January 2027",
        "related_careers": ["UI/UX Designer"],
        "website": "https://uceed.iitb.ac.in"
    }
]


SCHOLARSHIPS_DATA = [
    {
        "name": "Reliance Foundation Undergraduate Scholarship",
        "provider": "Reliance Foundation",
        "amount": "Up to ₹2,00,000 total grant over degree duration",
        "eligibility": "First-year undergraduate STEAM students with household income < ₹15 Lakhs and Aptitude test score",
        "deadline": "October 15, 2026",
        "application_url": "https://scholarships.reliancefoundation.org"
    },
    {
        "name": "Central Sector Scheme of Scholarships (CSSS)",
        "provider": "Ministry of Education, Govt of India",
        "amount": "₹12,000 / year for graduation & ₹20,000 / year for post-graduation",
        "eligibility": "Students above 80th percentile in Class 12 Boards with family income < ₹4.5 Lakhs",
        "deadline": "November 30, 2026",
        "application_url": "https://scholarships.gov.in"
    },
    {
        "name": "INSPIRE Scholarship for Higher Education (SHE)",
        "provider": "Department of Science & Technology (DST)",
        "amount": "₹80,000 per annum (₹60,000 cash + ₹20,000 mentorship project)",
        "eligibility": "Top 1% in Class 12 Board Exams pursuing Natural/Basic Sciences & STEAM Research",
        "deadline": "December 15, 2026",
        "application_url": "https://online-inspire.gov.in"
    },
    {
        "name": "Tata Trusts Medical and Healthcare Scholarship",
        "provider": "Tata Trusts",
        "amount": "30% to 80% tuition fee waiver",
        "eligibility": "Undergraduate and postgraduate students enrolled in recognized medical colleges",
        "deadline": "October 30, 2026",
        "application_url": "https://tatatrusts.org"
    }
]


def seed_all_data(db: Session = None, include_demo_student: bool = False):
    """Inserts career catalog and knowledge dataset into the database. Fresh startup by default."""
    own_session = False
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        own_session = True

    try:
        # Seed Careers
        if db.query(Career).count() == 0:
            print("Seeding Careers...")
            for c_data in CAREERS_DATA:
                career = Career(**c_data)
                db.add(career)
            db.commit()

        # Seed Opportunities
        if db.query(Opportunity).count() == 0:
            print("Seeding Opportunities...")
            for op_data in OPPORTUNITIES_DATA:
                op = Opportunity(**op_data)
                db.add(op)
            db.commit()

        # Seed Exams
        if db.query(Exam).count() == 0:
            print("Seeding Exams...")
            for ex_data in EXAMS_DATA:
                ex = Exam(**ex_data)
                db.add(ex)
            db.commit()

        # Seed Scholarships
        if db.query(Scholarship).count() == 0:
            print("Seeding Scholarships...")
            for sc_data in SCHOLARSHIPS_DATA:
                sc = Scholarship(**sc_data)
                db.add(sc)
            db.commit()

        # Seed Demo Student if requested or if no student exists
        if include_demo_student or db.query(Student).count() == 0:
            demo_student = db.query(Student).filter(Student.name == "Arun Kumar").first()
            if not demo_student:
                print("Seeding Demo Student: Arun Kumar...")
                demo_student = Student(
                    name="Arun Kumar",
                    age=17,
                    class_grade="12th Grade",
                    location="Chennai",
                    academic_stream="Science (PCM)",
                    academic_score=88.0,
                    aptitude_score=91.0,
                    interests=["AI", "Technology", "Robotics"],
                    skills={
                        "Programming": 92.0,
                        "Mathematics": 89.0,
                        "Problem Solving": 91.0,
                        "Analytical Thinking": 86.0,
                        "Creativity": 74.0,
                        "Communication": 68.0,
                        "Leadership": 72.0,
                        "Research": 80.0
                    },
                    career_preferences={
                        "preferred_domains": ["AI", "Technology", "Robotics"],
                        "work_style": "Innovation & R&D",
                        "risk_tolerance": "Moderate",
                        "preferred_location": "Chennai",
                        "higher_study_preference": "M.Tech / MS after B.Tech"
                    },
                    riasec_scores={
                        "R": 85.0,
                        "I": 92.0,
                        "A": 65.0,
                        "S": 60.0,
                        "E": 75.0,
                        "C": 70.0
                    },
                    big_five_scores={
                        "Openness": 88.0,
                        "Conscientiousness": 85.0,
                        "Extraversion": 65.0,
                        "Agreeableness": 70.0,
                        "Neuroticism": 35.0
                    },
                    locus_of_control="Internal",
                    growth_mindset_score=88,
                    liking_vs_ability_divergence=4.5
                )
                db.add(demo_student)
                db.commit()
                db.refresh(demo_student)

                assessment = Assessment(
                    student_id=demo_student.id,
                    logical_score=94.0,
                    numerical_score=92.0,
                    spatial_score=88.0,
                    verbal_score=82.0,
                    problem_solving_score=90.0,
                    normalized_aptitude=91.0,
                    raw_responses={"completed": True, "demo_mode": True}
                )
                db.add(assessment)
                db.commit()

                demo_parent = Parent(
                    student_id=demo_student.id,
                    annual_budget=600000.0,
                    max_affordable_cost=800000.0,
                    intergenerational_mobility_drive=82,
                    autonomy_support_index=78,
                    micro_financials={
                        "annual_income": 1200000.0,
                        "savings": 450000.0,
                        "budget_constraint": 600000.0
                    },
                    loan_preference="Low",
                    risk_appetite="Medium",
                    preferred_career_domain="Engineering / Technology",
                    preferred_location="Chennai",
                    higher_study_expectation="Yes"
                )
                db.add(demo_parent)
                db.commit()
                print("Successfully seeded Arun Kumar and Parent profile.")

        # Seed Demo User Auth Accounts
        from app.models.user import User
        from app.services.auth_service import hash_password

        demo_student = db.query(Student).filter(Student.name == "Arun Kumar").first()
        demo_parent = db.query(Parent).first()

        if not db.query(User).filter(User.email == "student@prism.edu").first() and demo_student:
            student_user = User(
                email="student@prism.edu",
                hashed_password=hash_password("student123"),
                name=demo_student.name,
                role="student",
                student_id=demo_student.id
            )
            db.add(student_user)
            db.commit()
            print("Successfully seeded Student Auth Account: student@prism.edu")

        if not db.query(User).filter(User.email == "parent@prism.edu").first() and demo_student:
            parent_user = User(
                email="parent@prism.edu",
                hashed_password=hash_password("parent123"),
                name="K. Kumar (Parent)",
                role="parent",
                student_id=demo_student.id,
                parent_id=demo_parent.id if demo_parent else None
            )
            db.add(parent_user)
            db.commit()
            print("Successfully seeded Parent Auth Account: parent@prism.edu")

    finally:
        if own_session:
            db.close()


if __name__ == "__main__":
    import sys
    with_demo = "--demo" in sys.argv
    print(f"Running PRISM Database Seeder directly (include_demo={with_demo})...")
    seed_all_data(include_demo_student=with_demo)
    print("Database seeding completed.")

