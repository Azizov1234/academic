"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Role } from "@/lib/types";

const ROLE_ROUTES: Record<Role, string> = {
  superadmin: "/superadmin/dashboard",
  admin: "/admin/dashboard",
  mentor: "/mentor/dashboard",
  student: "/student/dashboard",
};

export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(ROLE_ROUTES[user.role]);
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}
