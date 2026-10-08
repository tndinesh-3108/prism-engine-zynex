# PRISM Engine

## Multi-Dimensional STEAM Career Guidance & Hyper-Local Innovation Platform

> **One-line vision:** PRISM is an AI-powered career guidance platform
> that combines student abilities and interests, family financial
> constraints, parent expectations, and real-world market demand to
> deliver personalized, financially viable, and future-ready career
> pathways.

**Track:** AI & EdTech\
**Team:** Zynex\
**Project:** DataQuest 3.0 -- Round 1

------------------------------------------------------------------------

# 1. What is PRISM?

PRISM is not just a career quiz.

It is a multi-dimensional career guidance system that connects:

**Student + Family + Market → PRISM Engine → Career Recommendation +
Financial Feasibility + Alignment + Roadmap**

The platform is designed to answer four important questions:

1.  **What is the student good at?**
2.  **What careers match the student's interests and abilities?**
3.  **Can the family realistically afford the pathway?**
4.  **How do student preferences, parent expectations, and market demand
    align?**

The final goal is to provide a career pathway that is both **personally
suitable and financially realistic**.

------------------------------------------------------------------------

# 2. The Problem We Are Solving

Many students do not have access to personalized career guidance.

Career decisions can be affected by:

-   Student interests
-   Academic/technical abilities
-   Parent expectations
-   Family financial constraints
-   Location limitations
-   Education costs
-   Scholarships and loans
-   Career risk tolerance
-   Market demand
-   Future growth

Traditional career guidance often focuses mainly on student interests or
academic performance.

PRISM combines multiple dimensions into one decision-support system.

------------------------------------------------------------------------

# 3. PRISM Core Idea

The complete PRISM pipeline is:

``` text
                    STUDENT
                       |
             24-Question Assessment
                       |
                       v
              Student PRISM Vector
                       |
                       |
PARENT/FAMILY ---------+---------- MARKET
                       |
                       v
                 PRISM ENGINE
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
   Career Fit     Financial       Market Demand
                   Solver
        |              |              |
        +--------------+--------------+
                       |
                       v
              Parent-Student
                 Alignment
                       |
                       v
              Ranked Career
                 Pathways
                       |
                       v
             Personalized Roadmap
                       |
                       v
              PRISM Final Report
```

------------------------------------------------------------------------

# 4. Four Main Intelligence Dimensions

## 4.1 Student Intelligence

The student completes a 24-question assessment.

The assessment has four dimensions:

-   Aptitude
-   Interest
-   Cognitive
-   Competency

Each dimension contains 6 questions.

Answers use a 1--5 Likert scale:

  Score   Meaning
  ------- -------------------
  1       Strongly Disagree
  2       Disagree
  3       Neutral
  4       Agree
  5       Strongly Agree

Each dimension is converted into a **0--100 score**.

------------------------------------------------------------------------

# 5. Student Assessment

## Aptitude

1.  I can identify patterns in numerical data.
2.  I enjoy solving logical problems.
3.  I can break complex problems into smaller steps.
4.  I understand mathematical concepts quickly.
5.  I enjoy finding different solutions to a problem.
6.  I can make decisions based on evidence.

## Interest

7.  I am interested in computers and software.
8.  I enjoy learning science and technology.
9.  I like creating new technologies.
10. I am interested in machines and engineering systems.
11. I enjoy research and discovering new ideas.
12. I like combining technology, science, design or business.

## Cognitive

13. I prefer analytical and reasoning-based tasks.
14. I prefer creating new solutions.
15. I enjoy practical, hands-on activities.
16. I investigate a problem before deciding.
17. I enjoy understanding other people's perspectives.
18. I am comfortable with problems that have no single answer.

## Competency

19. I can learn technical concepts independently.
20. I can explain my ideas clearly.
21. I work effectively in a team.
22. I can stay focused on difficult problems.
23. I take initiative in projects.
24. I am willing to continuously develop my skills.

------------------------------------------------------------------------

# 6. Student PRISM Vector

The 24 answers are converted into:

``` text
{
  aptitude: 0-100,
  interest: 0-100,
  cognitive: 0-100,
  competency: 0-100
}
```

The system must calculate these values from the **actual student
answers**.

Do not hardcode a student's vector or career result.

Example:

``` text
Aptitude     91
Interest     87
Cognitive    74
Competency   88
```

This vector becomes the student's input to the career recommendation
engine.

------------------------------------------------------------------------

# 7. Career Recommendation Engine

PRISM currently evaluates these 10 career pathways:

1.  AI/ML Engineer
2.  Data Scientist
3.  Software Engineer
4.  Cybersecurity Analyst
5.  Data Analyst
6.  Cloud Engineer
7.  Robotics Engineer
8.  UI/UX Designer
9.  Product Manager
10. Electronics/Embedded Engineer

------------------------------------------------------------------------

# 8. Career Fit Calculation

Career fit uses:

  Dimension      Weight
  ------------ --------
  Aptitude          25%
  Interest          30%
  Cognitive         20%
  Competency        25%

Conceptually:

``` text
Career Fit =
(Aptitude × 25%)
+ (Interest × 30%)
+ (Cognitive × 20%)
+ (Competency × 25%)
```

The result is the student's **PRISM Fit Score**.

This is a decision-support score, not a guaranteed prediction of future
success.

------------------------------------------------------------------------

# 9. Final Career Ranking

Career ranking combines:

  Factor            Weight
  --------------- --------
  Career Fit           60%
  Market Demand        25%
  Growth               15%

Conceptually:

``` text
Final PRISM Score =
(Fit × 60%)
+ (Market Demand × 25%)
+ (Growth × 15%)
```

The system should rank all available careers instead of simply
displaying one hardcoded career.

------------------------------------------------------------------------

# 10. Explainable Recommendations

Every recommendation should answer:

### Why this career?

Example:

``` text
AI/ML Engineer

PRISM Fit: 91/100

Why:
- Strong analytical aptitude
- High technology interest
- Strong technical learning competency
- Good alignment with current market demand
```

The system should use the student's actual assessment vector.

------------------------------------------------------------------------

# 11. Parent / Family Module

Parents are an important part of the PRISM decision system.

The parent module captures:

### Financial information

-   Education budget
-   Hostel/travel budget
-   Scholarships
-   Loans
-   Investment willingness
-   Existing financial commitments

### Career preferences

-   Stability
-   Prestige
-   Risk tolerance
-   Career aspiration
-   Location preference
-   Willingness to relocate
-   Hostel/travel preference
-   Education duration

------------------------------------------------------------------------

# 12. Financial Constraint Solver

The solver compares:

``` text
Career Education Cost
        +
Hostel/Travel Cost
        +
Other Expected Costs
        |
        v
Family Available Budget
        |
        v
Financial Constraint Solver
```

Possible outputs:

``` text
AFFORDABLE
PARTIALLY_AFFORDABLE
NOT_AFFORDABLE
```

The system should also show:

-   Estimated cost
-   Available budget
-   Financial gap
-   Scholarship/loan possibility
-   Risk level

------------------------------------------------------------------------

# 13. Important Financial Rule

A high career-fit score does NOT automatically mean that the career
should be recommended as the final pathway.

Example:

``` text
Career Fit = 96%
Financial Status = NOT AFFORDABLE
```

The system should not simply call this the best final pathway.

Instead, it should explain the financial constraint and potentially
suggest:

-   Scholarship
-   Loan planning
-   Lower-cost institution/pathway
-   Alternative pathway
-   Affordable related career

Possible recommendation statuses:

``` text
RECOMMENDED
RECOMMENDED_WITH_FINANCIAL_PLANNING
ALTERNATIVE_PATHWAY
NOT_FINANCIALLY_FEASIBLE
```

This separation is important:

**Fit Score ≠ Financial Feasibility**

------------------------------------------------------------------------

# 14. Student--Parent Alignment

PRISM compares student preferences with parent preferences.

Inputs can include:

-   Career preference
-   Risk appetite
-   Location preference
-   Stability preference
-   Education budget
-   Education duration

Output:

``` text
Alignment Score: 0–100
```

Example:

``` text
Alignment Score: 78/100
Level: Moderate Alignment

Factors:
+ Career preference aligned
+ Education duration aligned
- Parent prefers local education
- Student prefers relocation
```

This is an explainable alignment indicator.

It must NOT be described as a clinical or psychological diagnosis.

------------------------------------------------------------------------

# 15. Market Intelligence

For each career, PRISM can display:

-   Market demand
-   Growth
-   Salary range
-   Required skills
-   Relevant exams
-   Hiring/opportunity information

Example:

``` text
Cloud Engineer

Market Demand: 90/100
Growth: 85/100
Salary Range: ₹X–Y LPA
Key Skills:
- Cloud platforms
- Networking
- Linux
- DevOps
```

### Prototype data rule

If live job-board or salary APIs are not connected, the UI must clearly
label data as:

-   Demo
-   Estimated
-   Prototype
-   Stored dataset

Do not claim that static data is live market data.

------------------------------------------------------------------------

# 16. Feasibility Boundaries

For the current prototype, the following are intentionally outside the
core Round 1 scope:

-   Full live job-board integration
-   Real-time salary feeds
-   Clinical-grade psychometrics

Instead, the prototype can use:

-   Stored datasets
-   Deterministic scoring
-   Rule-based fallback
-   Local calculations
-   Free/low-cost infrastructure

------------------------------------------------------------------------

# 17. Main User Roles

PRISM supports role-based experiences.

## Student

Route:

``` text
/student/dashboard
```

Main capabilities:

-   Complete assessment
-   View PRISM vector
-   View career pathways
-   View market intelligence
-   View scholarships
-   View exams/hiring tracker
-   View PRISM report

## Parent

Route:

``` text
/parent/dashboard
```

Main capabilities:

-   Financial profile
-   Career expectations
-   Risk/location preferences
-   Affordability results
-   Student-parent alignment

## Counsellor

Route:

``` text
/counsellor/dashboard
```

Potential capabilities:

-   Review student profile
-   Review recommendations
-   Review alignment
-   Support career discussions

## Institution

Route:

``` text
/institution/dashboard
```

Potential capabilities:

-   Student insights
-   Career trends
-   Institutional guidance data

## Admin

Route:

``` text
/admin/dashboard
```

Potential capabilities:

-   Dataset management
-   Career data
-   Market data
-   User management
-   System monitoring

------------------------------------------------------------------------

# 18. Student Dashboard

The student dashboard should provide a quick overview.

Important cards can include:

``` text
PRISM Top Fit Score
Profile Completion
Family Alignment
Market Demand Score
```

Then:

``` text
Your PRISM 4-Pillar Vector
```

with:

-   Aptitude
-   Interest
-   Cognitive
-   Competency

And:

``` text
Next Recommended Action
```

The dashboard should be generated from actual user data wherever
possible.

------------------------------------------------------------------------

# 19. Career Pathways Page

The Career Pathways page should show ranked careers.

Each career should contain:

``` text
Career Name
PRISM Fit Score
Market Demand
Growth
Financial Status
Salary Information
Why Recommended
Required Skills
Possible Roadmap
```

The ranking must come from the PRISM engine.

------------------------------------------------------------------------

# 20. Landing Page

The landing page communicates the PRISM concept.

The student animation can represent:

``` text
Students
   ↓
Abilities + Interests
   ↓
PRISM AI
   ↓
Family + Finance + Market
   ↓
Career Pathway
```

The animation should be:

-   Modern
-   Professional
-   Youthful
-   Educational
-   Subtle

Avoid making it look like a children's cartoon.

------------------------------------------------------------------------

# 21. System Architecture

Recommended architecture:

``` text
                    React + Vite
                         |
                         v
                  PRISM Frontend
                         |
                    REST API
                         |
                         v
                   FastAPI Backend
                         |
        +----------------+----------------+
        |                |                |
        v                v                v
   AI/Scoring       Financial Solver   Market Engine
        |                |                |
        +----------------+----------------+
                         |
                         v
                    Database
```

------------------------------------------------------------------------

# 22. Technology Stack

## Frontend

-   React
-   Vite
-   Tailwind CSS
-   React Router
-   Recharts

## Backend

-   Python
-   FastAPI

## AI / Data Processing

-   Python
-   Scikit-learn where useful

## Optimization

-   SciPy
-   PuLP where appropriate

## Database

-   PostgreSQL / Supabase

## Authentication

Prototype:

-   Local/demo authentication

Future:

-   JWT-based authentication

## Deployment

Frontend:

-   Vercel

Backend:

-   Render or equivalent

Database:

-   Supabase/PostgreSQL

------------------------------------------------------------------------

# 23. Repository Structure

Recommended project structure:

``` text
PRISM/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   └── services/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── schemas/
│
├── ai-engine/
│
├── optimization-engine/
│
├── market-engine/
│
├── database/
│
├── README.md
│
└── .gitignore
```

------------------------------------------------------------------------

# 24. Current Backend

The local FastAPI backend currently runs on:

``` text
http://127.0.0.1:8000
```

Start command:

``` bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Health endpoint:

``` text
/api/health
```

Expected response:

``` json
{
  "status": "ok",
  "service": "PRISM API"
}
```

Frontend API configuration should use:

``` text
VITE_API_URL=http://127.0.0.1:8000/api
```

After changing `.env`, restart the Vite development server.

------------------------------------------------------------------------

# 25. Development Workflow

Every team member should follow this basic workflow:

``` text
1. Pull latest code
2. Create/checkout your branch
3. Make your changes
4. Test locally
5. Check console for errors
6. Commit
7. Push
8. Create Pull Request
9. Team lead reviews
10. Merge
```

Do not directly overwrite another person's work.

------------------------------------------------------------------------

# 26. Git Branching

Recommended:

``` text
main
│
├── frontend
├── backend
├── ai-engine
├── financial-engine
├── market-engine
└── docs
```

Example:

``` bash
git checkout -b feature/assessment-engine
```

Commit example:

``` bash
git add .
git commit -m "feat: implement PRISM assessment scoring"
git push origin feature/assessment-engine
```

------------------------------------------------------------------------

# 27. Team Responsibilities

## Member 1 -- Lead / Integration

Responsible for:

-   Overall architecture
-   Integration
-   GitHub
-   Final testing
-   Demo flow
-   Ensuring all modules communicate correctly

## Member 2 -- Frontend

Responsible for:

-   React UI
-   Dashboard
-   Landing page
-   Navigation
-   Charts
-   Responsive design

## Member 3 -- Backend

Responsible for:

-   FastAPI
-   API routes
-   Validation
-   Database integration
-   CORS
-   Backend testing

## Member 4 -- AI / Assessment

Responsible for:

-   24-question assessment
-   Student vector
-   Career-fit scoring
-   Explainability
-   AI/data-processing logic

## Member 5 -- Financial / Optimization

Responsible for:

-   Family financial profile
-   Financial Constraint Solver
-   Affordability classification
-   Financial gap
-   Scholarship/loan considerations

## Member 6 -- Market Intelligence

Responsible for:

-   Career dataset
-   Market demand
-   Growth
-   Salary data
-   Skills
-   Exams/hiring/scholarships
-   Data labeling and validation

------------------------------------------------------------------------

# 28. Important Rule for Everyone

Do not hardcode results just to make the dashboard look impressive.

Bad:

``` text
AI/ML Engineer = 97%
```

for every student.

Good:

``` text
Student answers
      ↓
Student vector
      ↓
Career calculation
      ↓
Actual ranking
```

The same principle applies to:

-   Financial status
-   Alignment score
-   Market score
-   Profile completion
-   Recommendation reasons

Whenever possible, display values calculated from actual stored data.

------------------------------------------------------------------------

# 29. Demo Flow

The hackathon demo should follow this sequence:

``` text
1. Open PRISM Landing Page
        ↓
2. Student Login
        ↓
3. Student Dashboard
        ↓
4. Complete 24-Q Assessment
        ↓
5. Generate PRISM Vector
        ↓
6. View Career Pathways
        ↓
7. Show Ranked Careers
        ↓
8. Open Parent Profile
        ↓
9. Enter Financial Constraints
        ↓
10. Run Financial Solver
        ↓
11. Show Student-Parent Alignment
        ↓
12. Show Market Intelligence
        ↓
13. Generate PRISM Report
        ↓
14. Show Personalized Career Roadmap
```

This demonstrates the complete PRISM concept instead of showing
disconnected pages.

------------------------------------------------------------------------

# 30. What Makes PRISM Different?

PRISM combines three major perspectives:

``` text
STUDENT
"What am I suited for?"

       +

FAMILY
"Can we realistically support it?"

       +

MARKET
"Does the pathway have demand and growth?"

       ↓

       PRISM

       ↓

"Which pathway is suitable,
financially realistic,
and future-ready?"
```

This is the central product story.

------------------------------------------------------------------------

# 31. Important UI/Data Integrity Rules

The interface must never claim something is live when it is not.

For example:

Bad:

``` text
LIVE MARKET DATA
```

when using a static prototype dataset.

Good:

``` text
MARKET DATA
Prototype / Estimated
```

Similarly:

Bad:

``` text
AI prediction: You WILL become an AI Engineer
```

Good:

``` text
PRISM Fit Score: 91/100
Recommended based on your assessment profile
```

PRISM is a decision-support platform, not a guarantee engine.

------------------------------------------------------------------------

# 32. Testing Checklist

Before the final demo, test:

### Authentication

-   [ ] Student login
-   [ ] Parent login
-   [ ] Role switching
-   [ ] Logout

### Assessment

-   [ ] All 24 questions appear
-   [ ] All 5 options work
-   [ ] Previous/Next works
-   [ ] Answers persist
-   [ ] Submission works
-   [ ] Vector is calculated correctly
-   [ ] Refresh does not unexpectedly lose results

### Career Engine

-   [ ] All 10 careers appear
-   [ ] Ranking changes according to student answers
-   [ ] Fit score is calculated
-   [ ] Market score is shown
-   [ ] Growth is shown
-   [ ] Recommendation reason is displayed

### Financial Engine

-   [ ] Parent profile saves
-   [ ] Budget is processed
-   [ ] Affordability status is calculated
-   [ ] Financial gap is shown
-   [ ] Scholarship/loan option is considered

### Alignment

-   [ ] Student preference is captured
-   [ ] Parent preference is captured
-   [ ] Alignment score is calculated
-   [ ] Factors are explained

### Backend

-   [ ] `/api/health` works
-   [ ] CORS works
-   [ ] API errors are handled
-   [ ] Frontend does not break if API is temporarily unavailable

### UI

-   [ ] Full-width desktop layout
-   [ ] No unwanted horizontal scrolling
-   [ ] Responsive tablet layout
-   [ ] Responsive mobile layout
-   [ ] No console errors
-   [ ] No broken routes

------------------------------------------------------------------------

# 33. Development Priority

Do not build everything at once.

Use this order:

``` text
PHASE 1
Assessment
      ↓
Student Vector

PHASE 2
Career Engine
      ↓
Career Ranking

PHASE 3
Parent Profile
      ↓
Financial Solver

PHASE 4
Student-Parent Alignment

PHASE 5
Market Intelligence

PHASE 6
Roadmap + Opportunities

PHASE 7
PRISM Report

PHASE 8
Testing + Demo + Deployment
```

The most important rule:

**Make the core data pipeline work before adding decorative features.**

------------------------------------------------------------------------

# 34. What We Should NOT Do

Avoid:

-   Fake AI outputs
-   Random hardcoded scores
-   Claiming static data is live
-   Unexplained recommendations
-   Clinical psychological claims
-   Overly complicated ML when deterministic scoring is enough
-   Adding unnecessary features before the core pipeline works
-   Breaking working backend functionality while modifying UI
-   Replacing working components unnecessarily

------------------------------------------------------------------------

# 35. Future Enhancements

After the core prototype works, possible extensions include:

-   Live job-market APIs
-   Real-time salary feeds
-   Scholarship API integration
-   College/course recommendation
-   Regional opportunity mapping
-   More career pathways
-   Better personalization
-   Secure authentication
-   Production database
-   Advanced analytics
-   More sophisticated ML models

These should come **after the Round 1 core pipeline is stable**.

------------------------------------------------------------------------

# 36. Final Product Vision

PRISM should ultimately behave like this:

``` text
                    ┌───────────────┐
                    │    STUDENT    │
                    └───────┬───────┘
                            │
                     24-Q Assessment
                            │
                            ▼
                    ┌───────────────┐
                    │ PRISM VECTOR  │
                    └───────┬───────┘
                            │
                            ▼
              ┌──────────────────────────┐
              │     CAREER ENGINE        │
              └────────────┬─────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
           Student       Family       Market
             Fit        Finance       Demand
              │            │            │
              └────────────┼────────────┘
                           ▼
                 ┌──────────────────┐
                 │ PRISM DECISION   │
                 │     ENGINE       │
                 └────────┬─────────┘
                          │
                          ▼
                 Career Recommendation
                          │
                          ▼
                    Roadmap + Skills
                          │
                          ▼
                    PRISM REPORT
```

------------------------------------------------------------------------

# 37. One Sentence Everyone on the Team Should Remember

> **PRISM does not simply tell a student what career they like; it finds
> career pathways that match the student's abilities and interests,
> considers family financial reality and parent expectations, and
> combines those factors with market demand to produce an explainable,
> financially realistic career pathway.**

------------------------------------------------------------------------

## Status

This README is the shared project understanding document.

Before adding a new feature, the team should ask:

1.  Does it support the PRISM core idea?
2.  Does it use real data instead of hardcoded output?
3.  Does it integrate with the existing pipeline?
4.  Does it improve the final demo?
5.  Will it break an existing module?

If the answer to these questions is unclear, discuss it with the
integration lead before implementing it.
