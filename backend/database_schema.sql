-- PRISM Engine PostgreSQL / Supabase Database Schema
-- Multi-Dimensional STEAM Career Guidance & Hyper-Local Innovation Platform

-- Enable UUID extension if desired
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    class_grade VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    academic_stream VARCHAR(50) NOT NULL,
    academic_score FLOAT NOT NULL,
    aptitude_score FLOAT DEFAULT 0.0,
    interests JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '{}'::jsonb,
    career_preferences JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    logical_score FLOAT DEFAULT 0.0,
    numerical_score FLOAT DEFAULT 0.0,
    spatial_score FLOAT DEFAULT 0.0,
    verbal_score FLOAT DEFAULT 0.0,
    problem_solving_score FLOAT DEFAULT 0.0,
    normalized_aptitude FLOAT DEFAULT 0.0,
    raw_responses JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Parents Table
CREATE TABLE IF NOT EXISTS parents (
    id SERIAL PRIMARY KEY,
    student_id INT UNIQUE NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    annual_budget FLOAT NOT NULL,
    max_affordable_cost FLOAT NOT NULL,
    loan_preference VARCHAR(50) DEFAULT 'Low',
    risk_appetite VARCHAR(50) DEFAULT 'Medium',
    preferred_career_domain VARCHAR(100) NOT NULL,
    preferred_location VARCHAR(100) DEFAULT 'Chennai',
    higher_study_expectation VARCHAR(50) DEFAULT 'Yes',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Careers Table
CREATE TABLE IF NOT EXISTS careers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    career_domain VARCHAR(100) NOT NULL,
    education_cost FLOAT NOT NULL,
    living_cost_estimate FLOAT DEFAULT 150000.0,
    duration_years INT DEFAULT 4,
    required_skills JSONB DEFAULT '{}'::jsonb,
    market_demand FLOAT DEFAULT 80.0,
    growth_score FLOAT DEFAULT 85.0,
    salary_score FLOAT DEFAULT 85.0,
    avg_starting_salary FLOAT DEFAULT 800000.0,
    avg_mid_salary FLOAT DEFAULT 2200000.0,
    geographic_demand JSONB DEFAULT '{}'::jsonb,
    education_path TEXT NOT NULL,
    exam_options JSONB DEFAULT '[]'::jsonb,
    roadmap_milestones JSONB DEFAULT '[]'::jsonb,
    is_stem INT DEFAULT 1
);

-- 5. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    career_id INT NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
    rank INT NOT NULL,
    prism_score FLOAT NOT NULL,
    student_fit FLOAT NOT NULL,
    financial_fit FLOAT NOT NULL,
    market_fit FLOAT NOT NULL,
    parent_alignment FLOAT NOT NULL,
    geographic_fit FLOAT NOT NULL,
    is_financially_difficult BOOLEAN DEFAULT FALSE,
    financial_status VARCHAR(50) DEFAULT 'Feasible',
    effective_cost FLOAT DEFAULT 0.0,
    remaining_budget FLOAT DEFAULT 0.0,
    loan_required FLOAT DEFAULT 0.0,
    why_explanation TEXT NOT NULL,
    reasons JSONB DEFAULT '[]'::jsonb,
    skill_gaps JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    career_domain VARCHAR(100) NOT NULL,
    eligibility VARCHAR(150) NOT NULL,
    deadline VARCHAR(50) NOT NULL,
    stipend_or_award VARCHAR(100) DEFAULT 'Certificates & Grants',
    description TEXT NOT NULL,
    url VARCHAR(255) DEFAULT '#'
);

-- 7. Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    conducting_body VARCHAR(100) NOT NULL,
    eligibility VARCHAR(150) NOT NULL,
    deadline VARCHAR(50) NOT NULL,
    exam_date VARCHAR(50) NOT NULL,
    related_careers JSONB DEFAULT '[]'::jsonb,
    website VARCHAR(255) DEFAULT '#'
);

-- 8. Scholarships Table
CREATE TABLE IF NOT EXISTS scholarships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    eligibility VARCHAR(200) NOT NULL,
    deadline VARCHAR(50) NOT NULL,
    application_url VARCHAR(255) DEFAULT '#'
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_recommendations_student ON recommendations(student_id);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_opportunities_location ON opportunities(location);

