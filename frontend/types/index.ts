export interface Student {
  id: number;
  name: string;
  age: number;
  class_grade: string;
  location: string;
  academic_stream: string;
  academic_score: number;
  aptitude_score: number;
  interests: string[];
  skills: Record<string, number>;
  career_preferences: {
    preferred_domains?: string[];
    work_style?: string;
    risk_tolerance?: string;
    preferred_location?: string;
    higher_study_preference?: string;
  };
  // Advanced Psychological Vectorization
  riasec_scores?: Record<string, number>;
  big_five_scores?: Record<string, number>;
  locus_of_control?: string;
  growth_mindset_score?: number;
  liking_vs_ability_divergence?: number;
}

export interface ParentProfile {
  id?: number;
  student_id: number;
  annual_budget: number;
  max_affordable_cost: number;
  loan_preference: string;
  risk_appetite: string;
  preferred_career_domain: string;
  preferred_location: string;
  higher_study_expectation: string;
  // Advanced Sociological & Micro-Financial Variables
  intergenerational_mobility_drive?: number;
  autonomy_support_index?: number;
  micro_financials?: {
    annual_income: number;
    savings: number;
    budget_constraint: number;
  };
}

export interface CareerDNA {
  student_id: number;
  student_name: string;
  aptitude_score: number;
  interest_score: number;
  skill_score: number;
  academic_fit: number;
  risk_profile: string;
  cognitive_radar: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
  riasec_radar?: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
  big_five_radar?: Array<{
    subject: string;
    A: number;
    fullMark: number;
  }>;
  riasec_scores?: Record<string, number>;
  big_five_scores?: Record<string, number>;
  locus_of_control?: string;
  growth_mindset_score?: number;
  liking_vs_ability_divergence?: number;
  top_strengths: string[];
  ai_dna_summary: string;
  gemini_generated: boolean;
}

export interface RecommendationItem {
  id: number;
  career_id: number;
  career_name: string;
  slug: string;
  career_domain: string;
  rank: number;
  prism_score: number;
  student_fit: number;
  financial_fit: number;
  market_fit: number;
  parent_alignment: number;
  geographic_fit: number;
  is_financially_difficult: boolean;
  financial_status: string;
  education_cost: number;
  avg_starting_salary: number;
  why_explanation: string;
  reasons: string[];
  skill_gaps: string[];
  required_skills: Record<string, number>;
  // Advanced Deterministic Solver Outputs & Macroeconomic Variables
  student_career_match_score?: number;
  financial_viability_index?: number;
  parent_student_conflict_index?: number;
  automation_risk_warning?: string;
  sector_velocity_10yr?: number;
  automation_risk_index?: number;
  skill_elasticity?: number;
}

export interface RecommendationsData {
  student_id: number;
  student_name: string;
  total_recommendations: number;
  top_recommendations: RecommendationItem[];
  financially_difficult_careers: RecommendationItem[];
  scoring_weights: {
    student_fit: number;
    financial_fit: number;
    market_fit: number;
    parent_alignment: number;
    geographic_fit: number;
  };
  parent_budget?: number;
  ai_summary?: string;
  student_career_match_score?: number;
  financial_viability_index?: number;
  parent_student_conflict_index?: number;
  automation_risk_warning?: string;
}

export interface ConflictData {
  alignment_score: number;
  conflict_index: number;
  parent_student_conflict_index?: number;
  alignment_level: string;
  dimension_breakdown: Array<{
    dimension: string;
    student_value: string;
    parent_value: string;
    alignment_score: number;
    weight: string;
    status: string;
  }>;
  key_divergences: string[];
  common_ground_careers: Array<{
    name: string;
    domain: string;
    synergy_reason: string;
    fit_score: number;
  }>;
  parent_friendly_summary: string;
  gemini_generated: boolean;
}

export interface FinancialCheckResult {
  feasible: boolean;
  is_financially_difficult: boolean;
  financial_fit_score: number;
  status_label: string;
  total_cost: number;
  effective_cost: number;
  budget_coverage: number;
  remaining_budget: number;
  loan_required: number;
  financial_risk_level: string;
  roi_score: number;
  optimization_breakdown: {
    optimal_family_contribution: number;
    optimal_loan: number;
    scholarship_grant: number;
    unfunded_gap: number;
  };
  explanation: string;
}

export interface MarketData {
  career_id?: number;
  career_name?: string;
  career_slug?: string;
  market_demand: number;
  growth_trend: number;
  salary_potential: number;
  top_skills_in_demand: Array<{ skill: string; demand_pct: number }>;
  geographic_demand: Record<string, number>;
  emerging_steam_opportunities: string[];
  regional_hubs: Array<{
    city: string;
    state: string;
    specialties: string[];
    steam_demand_score: number;
    avg_entry_salary: string;
    key_employers: string[];
    growth_outlook: string;
    description: string;
  }>;
  is_demo_data: boolean;
  data_notice?: string;
}

export interface OpportunityItem {
  id: number;
  title: string;
  type: string;
  organization: string;
  location: string;
  career_domain: string;
  eligibility: string;
  deadline: string;
  stipend_or_award: string;
  description: string;
  url: string;
}

export interface TrackersData {
  exams: Array<{
    id: number;
    name: string;
    conducting_body: string;
    eligibility: string;
    deadline: string;
    exam_date: string;
    related_careers: string[];
    website: string;
    status: string;
  }>;
  scholarships: Array<{
    id: number;
    name: string;
    provider: string;
    amount: string;
    eligibility: string;
    deadline: string;
    application_url: string;
    status: string;
  }>;
}

export interface RoadmapData {
  career_id: number;
  career_name: string;
  education_path: string;
  total_milestones: number;
  stages: Array<{
    stage_number: number;
    stage_name: string;
    description: string;
    skills_to_learn: string[];
    recommended_certifications: string[];
    recommended_projects: string[];
    exams_and_milestones: string[];
    estimated_duration: string;
  }>;
  current_student_skills: Record<string, number>;
  required_skills: Record<string, number>;
  skill_gaps: Array<{
    skill: string;
    current_level: number;
    target_level: number;
    gap: number;
    status: string;
  }>;
  personalized_advice: string;
}

export type UserRole = "student" | "parent";

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  student_id?: number | null;
  parent_id?: number | null;
  created_at?: string;
}

export interface AuthResponse {
  status: string;
  access_token: string;
  token_type: string;
  role: UserRole;
  user: User;
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  class_grade?: string;
  location?: string;
  academic_stream?: string;
  academic_score?: number;
  student_id?: number;
  annual_budget?: number;
  max_affordable_cost?: number;
  loan_preference?: string;
  risk_appetite?: string;
  preferred_career_domain?: string;
}

