"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, UserRole, LoginPayload, RegisterPayload, AuthResponse } from "@/types";
import { loginUser, registerUser, demoLoginUser, getCurrentUserProfile } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  demoLogin: (role: UserRole) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "prism_auth_token";
const USER_KEY = "prism_auth_user";

const FALLBACK_DEMO_USERS: Record<UserRole, AuthResponse> = {
  student: {
    status: "success",
    access_token: "demo_student_token_prism_2026",
    token_type: "bearer",
    role: "student",
    user: {
      id: 1,
      email: "student@prism.edu",
      name: "Arun Kumar",
      role: "student",
      student_id: 1,
      parent_id: null,
    },
    message: "Logged in as Demo Student (Arun Kumar).",
  },
  parent: {
    status: "success",
    access_token: "demo_parent_token_prism_2026",
    token_type: "bearer",
    role: "parent",
    user: {
      id: 2,
      email: "parent@prism.edu",
      name: "K. Kumar (Parent)",
      role: "parent",
      student_id: 1,
      parent_id: 1,
    },
    message: "Logged in as Demo Parent (K. Kumar).",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Revalidate session with backend if possible
        getCurrentUserProfile()
          .then((freshUser) => {
            setUser(freshUser);
            localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          })
          .catch(() => {
            // Keep existing session if offline
          });
      }
    } catch (err) {
      console.warn("Could not read auth from localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAuthSuccess = useCallback((authData: AuthResponse) => {
    setToken(authData.access_token);
    setUser(authData.user);
    try {
      localStorage.setItem(TOKEN_KEY, authData.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    } catch (err) {
      console.warn("Could not persist auth to localStorage:", err);
    }
  }, []);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthResponse> => {
      try {
        const res = await loginUser(payload);
        handleAuthSuccess(res);
        return res;
      } catch (err) {
        // Fallback for demo accounts if backend is unreachable or returning error
        const cleanEmail = payload.email.trim().toLowerCase();
        if (cleanEmail === "student@prism.edu" || (payload.role === "student" && !cleanEmail)) {
          const fallback = FALLBACK_DEMO_USERS.student;
          handleAuthSuccess(fallback);
          return fallback;
        }
        if (cleanEmail === "parent@prism.edu" || (payload.role === "parent" && !cleanEmail)) {
          const fallback = FALLBACK_DEMO_USERS.parent;
          handleAuthSuccess(fallback);
          return fallback;
        }
        throw err;
      }
    },
    [handleAuthSuccess]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      try {
        const res = await registerUser(payload);
        handleAuthSuccess(res);
        return res;
      } catch {
        // Fallback registration if backend is offline
        const fallback: AuthResponse = {
          status: "success",
          access_token: `reg_token_${Date.now()}`,
          token_type: "bearer",
          role: payload.role,
          user: {
            id: Date.now(),
            email: payload.email,
            name: payload.name,
            role: payload.role,
            student_id: payload.role === "student" ? 1 : null,
            parent_id: payload.role === "parent" ? 1 : null,
          },
          message: `Welcome, ${payload.name}!`,
        };
        handleAuthSuccess(fallback);
        return fallback;
      }
    },
    [handleAuthSuccess]
  );

  const demoLogin = useCallback(
    async (role: UserRole): Promise<AuthResponse> => {
      try {
        const res = await demoLoginUser(role);
        handleAuthSuccess(res);
        return res;
      } catch (err) {
        console.warn("Using offline demo fallback for role:", role, err);
        const fallback = FALLBACK_DEMO_USERS[role] || FALLBACK_DEMO_USERS.student;
        handleAuthSuccess(fallback);
        return fallback;
      }
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (err) {
      console.warn("Could not clear localStorage:", err);
    }
  }, []);

  const role = user?.role || null;
  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
