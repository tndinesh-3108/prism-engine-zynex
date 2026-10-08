import {
  Student,
  ParentProfile,
  CareerDNA,
  RecommendationsData,
  ConflictData,
  FinancialCheckResult,
  MarketData,
  OpportunityItem,
  TrackersData,
  RoadmapData,
  User,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UserRole,
} from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL !== undefined && process.env.NEXT_PUBLIC_API_URL !== ""
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof window !== "undefined"
    ? ""
    : "http://127.0.0.1:8000";

function getAuthHeader(): Record<string, string> {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("prism_auth_token");
      if (token) {
        return { Authorization: `Bearer ${token}` };
      }
    } catch {
      // ignore
    }
  }
  return {};
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const fullUrl = `${API_BASE}${url}`;
  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`API request failed [${res.status}] ${url}:`, errText);
      throw new Error(`API error ${res.status}: ${errText}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`Fetch error for ${url}:`, err);
    throw err;
  }
}

// Student APIs
export async function createStudent(payload: Partial<Student>): Promise<{ status: string; student_id: number }> {
  return fetchJson("/api/students", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getStudent(studentId = 1): Promise<Student> {
  return fetchJson(`/api/students/${studentId}`);
}

export async function submitAssessment(payload: {
  student_id: number;
  responses: Array<{ category: string; question_id: number; selected_option: number; is_correct: boolean }>;
  raw_responses?: Record<string, unknown>;
}): Promise<Record<string, unknown>> {
  return fetchJson("/api/assessment", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getCareerDNA(studentId = 1): Promise<CareerDNA> {
  return fetchJson(`/api/career-dna/${studentId}`);
}

// Parent APIs
export async function createParent(payload: ParentProfile): Promise<{ status: string; parent_id: number }> {
  return fetchJson("/api/parents", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getParent(parentId = 1): Promise<ParentProfile> {
  return fetchJson(`/api/parents/${parentId}`);
}

export async function checkFinancialFeasibility(payload: {
  education_cost: number;
  living_cost?: number;
  family_annual_budget: number;
  max_affordable_ceiling: number;
  scholarship_amount?: number;
  loan_preference?: string;
  risk_appetite?: string;
}): Promise<FinancialCheckResult> {
  return fetchJson("/api/financial/check", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getConflictAnalysis(studentId = 1): Promise<ConflictData> {
  return fetchJson("/api/conflict", {
    method: "POST",
    body: JSON.stringify({ student_id: studentId }),
  });
}

// Recommendations & Engine Evaluation APIs
export async function getRecommendations(studentId = 1): Promise<RecommendationsData> {
  return fetchJson(`/api/recommendations/${studentId}`);
}

export async function getEngineEvaluation(studentId = 1, careerId?: number): Promise<{
  student_id: number;
  career_id?: number;
  student_career_match_score: number;
  financial_viability_index: number;
  parent_student_conflict_index: number;
  automation_risk_warning: string | null;
  timestamp: string;
}> {
  const query = careerId ? `?career_id=${careerId}` : "";
  return fetchJson(`/api/engine/evaluate/${studentId}${query}`);
}

// Career & Market APIs
export async function getAllCareers(): Promise<Record<string, unknown>[]> {
  return fetchJson("/api/careers");
}

export async function getMarketData(careerSlug = "ai-ml-engineer"): Promise<MarketData> {
  return fetchJson(`/api/market/${careerSlug}`);
}

// Opportunities & Trackers
export async function getOpportunities(params?: {
  location?: string;
  career_domain?: string;
  type?: string;
}): Promise<OpportunityItem[]> {
  const query = new URLSearchParams();
  if (params?.location) query.set("location", params.location);
  if (params?.career_domain) query.set("career_domain", params.career_domain);
  if (params?.type) query.set("type", params.type);

  const qStr = query.toString() ? `?${query.toString()}` : "";
  return fetchJson(`/api/opportunities${qStr}`);
}

export async function getTrackers(): Promise<TrackersData> {
  return fetchJson("/api/opportunities/trackers");
}

// Roadmap API
export async function getRoadmap(careerIdentifier = "ai-ml-engineer", studentId = 1): Promise<RoadmapData> {
  return fetchJson(`/api/roadmap/${careerIdentifier}?student_id=${studentId}`);
}

// AI Mentor API
export async function sendMentorMessage(
  message: string,
  studentId = 1,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<{ reply: string; suggested_followups: string[]; is_gemini_generated: boolean }> {
  return fetchJson("/api/mentor", {
    method: "POST",
    body: JSON.stringify({
      student_id: studentId,
      message,
      conversation_history: conversationHistory,
    }),
  });
}

// Authentication APIs
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return fetchJson("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  return fetchJson("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function demoLoginUser(role: UserRole = "student"): Promise<AuthResponse> {
  return fetchJson("/api/auth/demo-login", {
    method: "POST",
    body: JSON.stringify({ role }),
  });
}

export async function getCurrentUserProfile(): Promise<User> {
  return fetchJson("/api/auth/me");
}

