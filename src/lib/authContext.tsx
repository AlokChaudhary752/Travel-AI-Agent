"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role, TeamMember } from "@/types/travel";
import { INITIAL_TEAM } from "./seedData";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  agencyName: string;
  role: Role;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  demoLogin: (role: Role) => void;
  signup: (data: { name: string; agency: string; email: string; phone: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (otp: string) => boolean;
  logout: () => void;
  switchRole: (role: Role) => void;
  failedAttempts: number;
  lockoutRemainingSec: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "voyara_auth_session";
const LOCKOUT_KEY = "voyara_login_lockout";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemainingSec, setLockoutRemainingSec] = useState(0);
  const [pendingSignup, setPendingSignup] = useState<any | null>(null);

  // Initialize from session
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Default to logged-in as Owner for seamless inspection & demo experience
        const defaultUser: AuthUser = {
          id: INITIAL_TEAM[0].id,
          name: INITIAL_TEAM[0].name,
          email: INITIAL_TEAM[0].email,
          agencyName: "Voyara Journeys Pvt Ltd",
          role: "Owner",
          avatar: INITIAL_TEAM[0].avatar,
        };
        setUser(defaultUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser));
      }

      // Check lockout status
      const lockData = localStorage.getItem(LOCKOUT_KEY);
      if (lockData) {
        const { lockUntil, attempts } = JSON.parse(lockData);
        setFailedAttempts(attempts || 0);
        const diff = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
        if (diff > 0) {
          setLockoutRemainingSec(diff);
        }
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemainingSec <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemainingSec((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(LOCKOUT_KEY);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemainingSec]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (lockoutRemainingSec > 0) {
      return { success: false, error: `Account locked due to 5 failed attempts. Please wait ${lockoutRemainingSec}s.` };
    }

    // Match demo accounts
    const match = INITIAL_TEAM.find((m) => m.email.toLowerCase() === email.toLowerCase());
    
    // For demo purposes, any valid password with length >= 6 or standard demo pass "Voyara@2026"
    if (match && pass.length >= 6) {
      const authUser: AuthUser = {
        id: match.id,
        name: match.name,
        email: match.email,
        agencyName: "Voyara Journeys Pvt Ltd",
        role: match.role,
        avatar: match.avatar,
      };
      setUser(authUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
      setFailedAttempts(0);
      localStorage.removeItem(LOCKOUT_KEY);
      return { success: true };
    }

    // Otherwise record failed attempt
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);

    if (newAttempts >= 5) {
      const lockUntil = Date.now() + 30000; // 30 second lock
      localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ lockUntil, attempts: newAttempts }));
      setLockoutRemainingSec(30);
      return { success: false, error: "Too many failed attempts. Login locked for 30 seconds." };
    }

    return {
      success: false,
      error: `Invalid credentials. Attempt ${newAttempts} of 5 before temporary lock. (Try demo button or pass: Voyara@2026)`,
    };
  };

  const demoLogin = (role: Role) => {
    const match = INITIAL_TEAM.find((m) => m.role === role) || INITIAL_TEAM[0];
    const authUser: AuthUser = {
      id: match.id,
      name: match.name,
      email: match.email,
      agencyName: "Voyara Journeys Pvt Ltd",
      role: match.role,
      avatar: match.avatar,
    };
    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    setFailedAttempts(0);
    localStorage.removeItem(LOCKOUT_KEY);
    router.push("/app");
  };

  const signup = async (data: { name: string; agency: string; email: string; phone: string; password: string }) => {
    setPendingSignup(data);
    return { success: true };
  };

  const verifyOtp = (otp: string): boolean => {
    if (otp === "849201" || otp.length === 6) {
      if (pendingSignup) {
        const newUser: AuthUser = {
          id: `user-${Date.now()}`,
          name: pendingSignup.name,
          email: pendingSignup.email,
          agencyName: pendingSignup.agency,
          role: "Owner",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        };
        setUser(newUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    router.push("/login");
  };

  const switchRole = (newRole: Role) => {
    if (!user) return;
    const match = INITIAL_TEAM.find((m) => m.role === newRole);
    const updated: AuthUser = {
      ...user,
      role: newRole,
      name: match ? match.name : user.name,
      email: match ? match.email : user.email,
    };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        demoLogin,
        signup,
        verifyOtp,
        logout,
        switchRole,
        failedAttempts,
        lockoutRemainingSec,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
