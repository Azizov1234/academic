"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role, User } from "./types";
import { mockUsers } from "./mock-data";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: Role) => void;
}

// Demo credentials
const DEMO_ACCOUNTS = {
  "superadmin@academy.uz": { password: "admin123", userId: "sa1" },
  "admin@academy.uz": { password: "admin123", userId: "a1" },
  "mentor1@academy.uz": { password: "mentor123", userId: "m1" },
  "student1@academy.uz": { password: "student123", userId: "s1" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const account = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];
        if (!account || account.password !== password) {
          return { success: false, error: "Email yoki parol noto'g'ri" };
        }
        const user = mockUsers.find((u) => u.id === account.userId);
        if (!user) {
          return { success: false, error: "Foydalanuvchi topilmadi" };
        }
        set({ user, isAuthenticated: true });
        return { success: true };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      switchRole: (role: Role) => {
        const roleUserMap: Record<Role, string> = {
          superadmin: "sa1",
          admin: "a1",
          mentor: "m1",
          student: "s1",
        };
        const user = mockUsers.find((u) => u.id === roleUserMap[role]);
        if (user) set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "academy-auth",
    }
  )
);
