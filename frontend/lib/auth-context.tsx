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
        
        // Asynchronously revalidate session with backend
        getCurrentUserProfile()
          .then((freshUser) => {
            setUser(freshUser);
            localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
          })
          .catch(() => {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setToken(null);
            setUser(null);
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
      const res = await loginUser(payload);
      handleAuthSuccess(res);
      return res;
    },
    [handleAuthSuccess]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<AuthResponse> => {
      const res = await registerUser(payload);
      handleAuthSuccess(res);
      return res;
    },
    [handleAuthSuccess]
  );

  const demoLogin = useCallback(
    async (role: UserRole): Promise<AuthResponse> => {
      const res = await demoLoginUser(role);
      handleAuthSuccess(res);
      return res;
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

