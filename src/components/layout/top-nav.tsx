"use client";

import { useAuthStore } from "@/lib/auth-store";
import { getInitials } from "@/lib/utils-helpers";
import { Role } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface TopNavProps {
  title?: string;
}

const ROLE_LABELS: Record<Role, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  mentor: "Mentor",
  student: "Student",
};

const ROLE_COLORS: Record<Role, string> = {
  superadmin: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  admin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  mentor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  student: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export function TopNav({ title }: TopNavProps) {
  const { user, logout, switchRole } = useAuthStore();
  const router = useRouter();

  const unreadCount = mockNotifications.filter(
    (n) => n.userId === user?.id && !n.isRead
  ).length;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  function handleRoleSwitch(role: Role) {
    switchRole(role);
    const roleRoutes: Record<Role, string> = {
      superadmin: "/superadmin/dashboard",
      admin: "/admin/dashboard",
      mentor: "/mentor/dashboard",
      student: "/student/dashboard",
    };
    router.push(roleRoutes[role]);
  }

  if (!user) return null;

  return (
    <header className="h-16 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-2 text-xs" />}>
              <RefreshCw className="h-3 w-3" />
              Demo: Rol almashtir
              <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Demo Rollar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["superadmin", "admin", "mentor", "student"] as Role[]).map((role) => (
              <DropdownMenuItem
                key={role}
                onClick={() => handleRoleSwitch(role)}
                className={cn("cursor-pointer", user.role === role && "bg-accent")}
              >
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium mr-2", ROLE_COLORS[role])}>
                  {ROLE_LABELS[role]}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative" render={<Link href={`/${user.role}/notifications`} />}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="gap-2 pl-2 pr-3" />}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium leading-none">{user.name}</div>
                <div className={cn("text-[10px] mt-1 px-1.5 py-0.5 rounded font-medium inline-block", ROLE_COLORS[user.role])}>
                  {ROLE_LABELS[user.role]}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground font-normal">{user.email}</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/${user.role}/settings`} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Sozlamalar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
