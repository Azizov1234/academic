"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CreditCard,
  BarChart3,
  Settings,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  School,
  ClipboardList,
  FileText,
  Mic,
  Brain,
  Trophy,
  UserCheck,
  Shield,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils-helpers";
import { Role } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: Record<Role, NavItem[]> = {
  superadmin: [
    { href: "/superadmin/dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { href: "/superadmin/centers", label: "O'quv markazlar", icon: Building2 },
    { href: "/superadmin/admins", label: "Adminlar", icon: Shield },
    { href: "/superadmin/settings", label: "Sozlamalar", icon: Settings },
    { href: "/superadmin/logs", label: "Tizim loglari", icon: Activity },
  ],
  admin: [
    { href: "/admin/dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { href: "/admin/students", label: "Studentlar", icon: GraduationCap },
    { href: "/admin/mentors", label: "Mentorlar", icon: UserCheck },
    { href: "/admin/groups", label: "Guruhlar", icon: Users },
    { href: "/admin/courses", label: "Kurslar", icon: BookOpen },
    { href: "/admin/exams", label: "Imtihonlar", icon: ClipboardList },
    { href: "/admin/payments", label: "To'lovlar", icon: CreditCard },
    { href: "/admin/attendance", label: "Davomat", icon: Calendar },
    { href: "/admin/reports", label: "Hisobotlar", icon: BarChart3 },
    { href: "/admin/settings", label: "Sozlamalar", icon: Settings },
  ],
  mentor: [
    { href: "/mentor/dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { href: "/mentor/groups", label: "Guruhlarim", icon: Users },
    { href: "/mentor/homework", label: "Vazifalar", icon: FileText, badge: 5 },
    { href: "/mentor/exams", label: "Imtihonlar", icon: ClipboardList },
    { href: "/mentor/attendance", label: "Davomat", icon: Calendar },
  ],
  student: [
    { href: "/student/dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { href: "/student/units", label: "Darslar", icon: BookOpen },
    { href: "/student/homework", label: "Vazifalar", icon: FileText, badge: 2 },
    { href: "/student/exams", label: "Imtihonlar", icon: ClipboardList },
    { href: "/student/vocabulary", label: "Lug'at mashqi", icon: Brain },
    { href: "/student/progress", label: "Progressim", icon: BarChart3 },
    { href: "/student/certificates", label: "Sertifikatlar", icon: Trophy },
  ],
};

const ROLE_ICONS: Record<Role, React.ComponentType<{ className?: string }>> = {
  superadmin: Shield,
  admin: Building2,
  mentor: School,
  student: GraduationCap,
};

const ROLE_LABELS: Record<Role, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  mentor: "Mentor",
  student: "Student",
};

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const role = user.role;
  const items = navItems[role];
  const RoleIcon = ROLE_ICONS[role];

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border flex-shrink-0">
        {!collapsed && (
          <Link href={`/${role}/dashboard`} className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">Academy</div>
              <div className="text-[10px] text-sidebar-foreground/60 leading-tight">CEFR Platform</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href={`/${role}/dashboard`} className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <GraduationCap className="h-5 w-5 text-white" />
          </Link>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent">
            <RoleIcon className="h-4 w-4 text-sidebar-primary flex-shrink-0" />
            <span className="text-xs font-semibold text-sidebar-primary uppercase tracking-wide">
              {ROLE_LABELS[role]}
            </span>
          </div>
        </div>
      )}

      {/* Expand button when collapsed */}
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="mx-auto mt-2 h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
                )}
              />
              {!collapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-3 border-t border-sidebar-border flex-shrink-0">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</div>
              <div className="text-xs text-sidebar-foreground/50 truncate">{user.email}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/50 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
              onClick={handleLogout}
              title="Chiqish"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-10 text-sidebar-foreground/50 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleLogout}
            title="Chiqish"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </aside>
  );
}
