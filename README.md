# PRISM Engine

> **Multi-Dimensional STEAM Career Guidance & Hyper-Local Innovation Platform**
> *"Turn career confusion into a clear, affordable and future-ready pathway."*

---

## 1. Project Overview

**PRISM Engine** is an AI-powered full-stack decision intelligence platform built for school and college students (and their parents). 

Traditional ed-tech platforms recommend careers solely based on arbitrary student interests or generic aptitude questionnaires. In reality, Indian families face complex multi-stakeholder decisions involving **financial constraints, parental expectations, local industry demand, and realistic return on investment**.

PRISM addresses this fundamental gap with our core thesis:

> **CORE PRINCIPLE:** Never recommend careers based only on student interest. PRISM discovers trajectories that are:
> 1. Suitable for the student's cognitive aptitude and competencies
> 2. Financially feasible for the family's annual budget
> 3. Aligned with parental risk and security expectations
> 4. High-velocity in the actual regional and national job market
> 5. Accessible within the student's geographic preference

---

## 2. System Architecture & Mathematical Model

PRISM implements a multi-layer architecture separating mathematical decision optimization from generative explainability:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PRISM ENGINE PIPELINE                          │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│    STUDENT DNA      │       FAMILY BUDGET       │       MARKET & GEO        │
│ Aptitude (91%)      │ Annual Budget (₹6,00,000) │ Hiring Velocity (95/100)  │
│ Tech/Math Skills    │ Debt Tolerance: Low       │ Regional Hubs (Chennai)   │
│ Weight: 35%         │ Weight: 25% + CONSTRAINT  │ Weight: 20% + 10%         │
└──────────┬──────────┴─────────────┬─────────────┴─────────────┬─────────────┘
           │                        │                           │
           └────────────────────────┼───────────────────────────┘
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │             PRISM 5-FACTOR MATCHING FORMULA             │
       │  35% Student + 25% Financial + 20% Market               │
       │  + 10% Parent Alignment + 10% Geographic Fit            │
       └────────────────────────────┬────────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │            FINANCIAL CONSTRAINT SOLVER                  │
       │  SciPy Linear Programming (linprog):                    │
       │  Minimizes Debt & Family Distress                       │
       │  Exceeds Ceiling -> Tagged "Financially Difficult"      │
       └────────────────────────────┬────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│        FEASIBLE TOP MATCHES         │   │       FINANCIALLY CONSTRAINED       │
│ #1 AI / ML Engineer (90.5/100)      │   │ Medicine / MBBS (₹18 Lakhs)         │
│ #2 Data Scientist (89.2/100)        │   │ Quarantined to Scholarship Pathway  │
│ #3 Robotics Engineer (88.0/100)     │   │                                     │
└──────────────────┬──────────────────┘   └─────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                             ACTIONABLE EXECUTION                            │
│  Milestone Roadmap  •  Parent Conflict Index  •  Exams & Scholarships       │
│  Regional Opportunities  •  Gemini Grounded AI Career Mentor                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The 5-Dimensional Composite Formula

$$\text{PRISM Score} = 0.35 \cdot S + 0.25 \cdot F + 0.20 \cdot M + 0.10 \cdot P + 0.10 \cdot G$$

Where:
- $S$ (**Student Fit**): Cosine/vector overlap of student skills, cognitive aptitude test score, and academic score.
- $F$ (**Financial Fit**): Derived from SciPy optimization. Scaled by budget coverage ratio and debt penalty.
- $M$ (**Market Fit**): Weighted aggregation of hiring demand, 5-year growth trajectory, and salary potential.
- $P$ (**Parent Alignment**): Domain taxonomy overlap, risk tolerance match, and postgraduate consensus.
- $G$ (**Geographic Fit**): Local industry density in the candidate's preferred region (e.g., Chennai automotive/AI cluster).

### Hard Financial Feasibility Boundary
A career path whose total expenditure (tuition + living) exceeds:
$$\text{Cost} > \text{Max Affordable Ceiling} + \text{Permissible Loan}$$
is strictly classified as **"Financially Difficult"** and excluded from the primary top recommendations roster until unlocked by external grants.

---

## 3. Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom glassmorphism styling
- **Charts & Visualizations**: Recharts (Responsive Radar, Bar, Area charts)
- **Iconography**: Lucide React
- **API Client**: Centralized typed client (`frontend/lib/api.ts`)

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Validation**: Pydantic v2
- **ORM**: SQLAlchemy
- **Mathematical Optimization**: SciPy (`scipy.optimize.linprog`) / PuLP
- **AI & NLP**: Google Gemini API (`google-generativeai`) with graceful offline fallback templates
- **Server**: Uvicorn ASGI

### Database
- **Primary / Cloud**: Supabase PostgreSQL (`database_schema.sql`)
- **Local Fallback**: SQLite (`sqlite:///./prism.db`) for zero-configuration hackathon offline demonstration

---

## 4. Repository Structure

```
prism-engine/
│
├── frontend/                     # Next.js Frontend Application
│   ├── app/
│   │   ├── page.tsx              # Landing page & visual pipeline
│   │   ├── assessment/page.tsx   # 5-step interactive assessment
│   │   ├── career-dna/page.tsx   # Recharts radar & cognitive profile
│   │   ├── parent/page.tsx       # Parent constraint calculator
│   │   ├── parent/dashboard/page.tsx # Parent executive summary
│   │   ├── alignment/page.tsx    # Parent–Student Conflict Index
│   │   ├── recommendations/page.tsx # Top matches & financial tabs
│   │   ├── compare/page.tsx      # Multi-career comparison matrix
│   │   ├── market/page.tsx       # Regional STEAM intelligence
│   │   ├── opportunities/page.tsx# Internships & innovation labs
│   │   ├── opportunities/trackers/page.tsx # Exams & scholarships
│   │   ├── roadmap/[career]/page.tsx # Career milestones & skill gaps
│   │   ├── mentor/page.tsx       # Contextual AI Career Mentor chat
│   │   ├── dashboard/page.tsx    # Student unified master dashboard
│   │   ├── layout.tsx            # Global layout with theme
│   │   └── globals.css           # Styling & design system
│   ├── components/
│   │   ├── Navbar.tsx            # Responsive glassmorphism nav
│   │   └── Footer.tsx            # Ethical AI disclaimer & links
│   ├── lib/
│   │   └── api.ts                # Centralized REST API client
│   ├── types/
│   │   └── index.ts              # Comprehensive TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.ts
│   └── .env.local
│
├── backend/                      # Python FastAPI Analytical Backend
│   ├── app/
│   │   ├── main.py               # FastAPI entry point & CORS
│   │   ├── database.py           # SQLAlchemy Supabase / SQLite engine
│   │   ├── models/               # SQLAlchemy DB entities
│   │   │   ├── student.py        # Student & Assessment models
│   │   │   ├── parent.py         # Parent financial profiles
│   │   │   ├── career.py         # 10+ STEAM careers catalog
│   │   │   ├── opportunity.py    # Labs, exams, scholarships
│   │   │   └── recommendation.py # Saved recommendations
│   │   ├── schemas/              # Pydantic request/response schemas
│   │   ├── routes/               # Modular API routers
│   │   │   ├── students.py
│   │   │   ├── parents.py
│   │   │   ├── careers.py
│   │   │   ├── recommendations.py
│   │   │   ├── market.py
│   │   │   ├── opportunities.py
│   │   │   ├── roadmap.py
│   │   │   └── mentor.py
│   │   └── services/             # Analytical & AI engines
│   │       ├── career_engine.py  # 5-factor PRISM scoring formula
│   │       ├── financial_solver.py # SciPy linear optimization
│   │       ├── conflict_index.py # Parent–Student Conflict Index
│   │       ├── market_engine.py  # Regional STEAM hubs (Chennai, BLR)
│   │       ├── roadmap_engine.py # Milestone generation & skill gaps
│   │       └── gemini_service.py # Gemini API + fallback templates
│   ├── seed_data.py              # Seeder with Arun Kumar demo dataset
│   ├── test_api.py               # Automated verification test suite
│   ├── database_schema.sql       # Pure PostgreSQL schema for Supabase
│   ├── requirements.txt
│   └── .env
│
├── README.md
└── .gitignore
```

---

## 5. Local Setup & Running

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Python**: 3.10 or higher
- **Git**

---

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/prism-engine.git
cd prism-engine
```

---

### Step 2: Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
# Copy template or edit .env:
# GEMINI_API_KEY=your_gemini_api_key (Optional: app includes robust fallback templates)
# SUPABASE_DATABASE_URL= (Optional: defaults to local sqlite:///./prism.db)

# Seed database with Arun Kumar profile and STEAM careers
python seed_data.py

# Run automated verification tests
python test_api.py

# Start FastAPI backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API is now running at `http://localhost:8000` with interactive Swagger docs at `http://localhost:8000/docs`.

---

### Step 3: Frontend Setup
Open a new terminal window:
```bash
cd frontend

# Install npm dependencies
npm install

# Verify Next.js build
npm run build

# Start Next.js development server
npm run dev
```
The frontend is now running at `http://localhost:3000`.

---

## 6. Supabase PostgreSQL Setup (Production)

To connect PRISM Engine to a live Supabase cloud database:

1. Create a project in [Supabase](https://supabase.com).
2. Go to **SQL Editor** in your Supabase project dashboard.
3. Paste the contents of `backend/database_schema.sql` and click **Run**.
4. In your project settings, copy your Connection String under **Database Settings** (URI).
5. In `backend/.env`, set:
   ```env
   SUPABASE_DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
   SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
   ```
6. Re-run `python seed_data.py` to seed Supabase with careers and demo records.

---

## 7. Google Gemini API Setup

PRISM uses Google Gemini to generate explainable rationale and power the interactive AI Career Mentor:

1. Obtain a free API key at [Google AI Studio](https://aistudio.google.com).
2. Add the key to `backend/.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```
3. *Note*: Never expose this key in the frontend. If `GEMINI_API_KEY` is not provided, PRISM gracefully activates its high-precision deterministic explanation templates, ensuring 100% functionality offline.

---

## 8. Hackathon Demo Walkthrough (Arun Kumar Profile)

The application includes a pre-seeded student profile configured specifically for live hackathon demonstration:

| Parameter | Value |
|---|---|
| **Student Name** | Arun Kumar |
| **Age / Class** | 17 Years Old • Class 12 (Science PCM) |
| **Location** | Chennai, Tamil Nadu |
| **Academic Score** | 88% |
| **Cognitive Aptitude** | 91/100 (Logical: 94, Numerical: 92, Problem Solving: 90) |
| **Key Skills** | Programming (92), Mathematics (89), Problem Solving (91) |
| **Interests** | AI, Technology, Robotics |
| **Parent Annual Budget** | ₹6,00,000 (Max Ceiling: ₹8,00,000) |
| **Parent Loan Preference** | Low (Zero high-risk debt) |
| **Parent Preferred Domain** | Engineering / Technology (Chennai) |

### Demonstration Flow:
1. **Landing Page (`/`)**: View the visual 5-node pipeline and core principle statement.
2. **Student Assessment (`/assessment`)**: Click *"Load Arun Kumar Demo Profile"* to step through Basic Info, Interests, Cognitive Diagnostic test, Skills ratings, and Career Preferences.
3. **Student Career DNA (`/career-dna`)**: View the Recharts radar chart displaying Arun's 91/100 cognitive aptitude alongside Gemini AI strengths analysis.
4. **Parent Constraints Portal (`/parent`)**: Adjust family budget sliders and run live SciPy constraint simulations.
5. **Parent Executive Dashboard (`/parent/dashboard`)**: Inspect transparent cost coverage and the official family advisory statement.
6. **Parent–Student Conflict Index (`/alignment`)**: Explore the 95.5% harmony score, 4.5/100 conflict index, and synthesized **Common Ground** bridge careers.
7. **Ranked Recommendations (`/recommendations`)**:
   - **#1 Top Match**: **AI / ML Engineer** (PRISM Score: 90.5/100) — High aptitude match, ₹4.5L tuition within budget, and robust market demand.
   - **Financial Boundary Demonstration**: Click *"Financially Difficult / Constrained"* to show Medicine (MBBS: ₹18,00,000) quarantined due to budget excess.
8. **Career Comparison (`/compare`)**: Compare AI Engineering vs Data Science vs Robotics side-by-side using responsive Recharts bar charts.
9. **Regional Market Intelligence (`/market`)**: Switch between Chennai, Bengaluru, and Hyderabad to see local EV/AI clusters.
10. **Opportunities & Trackers (`/opportunities`, `/opportunities/trackers`)**: Browse internships at IIT Madras Research Park and track JEE Main and Reliance Foundation scholarships.
11. **Career Roadmap (`/roadmap/ai-ml-engineer`)**: Follow the 5-stage progression from Class 12 to industry placement with prioritized skill gap badges.
12. **PRISM AI Career Mentor (`/mentor`)**: Chat interactively with the context-grounded AI mentor.

---

## 9. API Reference

All backend endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/students` | Create or update student profile |
| `GET` | `/api/students/{id}` | Retrieve student profile details |
| `POST` | `/api/assessment` | Submit cognitive diagnostic responses |
| `GET` | `/api/career-dna/{id}` | Generate Career DNA radar and summary |
| `POST` | `/api/parents` | Save family budget and loan boundaries |
| `GET` | `/api/parents/{id}` | Retrieve parent configuration |
| `POST` | `/api/financial/check` | Execute SciPy linear optimization solver |
| `POST` | `/api/conflict` | Calculate Conflict Index and common ground |
| `GET` | `/api/recommendations/{id}`| Compute 5-factor ranked careers |
| `GET` | `/api/careers` | Catalog of 10+ STEAM careers |
| `GET` | `/api/market/{slug}` | Regional hiring trends and city hubs |
| `GET` | `/api/opportunities` | Local internships and hackathons |
| `GET` | `/api/opportunities/trackers`| National exams and scholarships |
| `GET` | `/api/roadmap/{slug}` | Multi-stage roadmap with skill gaps |
| `POST` | `/api/mentor` | Grounded AI Career Mentor conversation |

---

## 10. Deployment Instructions

### Deploying Frontend to Vercel
1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the repository and set the **Root Directory** to `frontend`.
3. Set the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```
4. Click **Deploy**.

### Deploying Backend to Render / Railway
1. In [Render](https://render.com), create a new **Web Service** connected to your repository.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `pip install -r requirements.txt && python seed_data.py`
4. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Configure Environment Variables:
   - `GEMINI_API_KEY`
   - `SUPABASE_DATABASE_URL`

---

## 11. Verification & Quality Assurance

- **TypeScript Compilation**: Clean build verified (`npm run build` completed with zero errors).
- **Backend Test Suite**: `backend/test_api.py` verified with 100% pass rate.
- **Offline Reliability**: Tested and functional even without external AI API availability.
- **Optimization Stability**: High-precision linear programming verified with SciPy.

---

## 12. License & Acknowledgments

Built for the **DataQuest 3.0 Hackathon**.
Designed with dedication to student potential and family financial peace of mind.

#   p r i s m - a l m o s t - f i n a l  
 