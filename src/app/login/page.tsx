"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Eye, EyeOff, LogIn, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/types";

const DEMO_ACCOUNTS = [
  { role: "superadmin" as Role, email: "superadmin@academy.uz", password: "admin123", label: "Super Admin", color: "bg-orange-500" },
  { role: "admin" as Role, email: "admin@academy.uz", password: "admin123", label: "Admin", color: "bg-blue-500" },
  { role: "mentor" as Role, email: "mentor1@academy.uz", password: "mentor123", label: "Mentor", color: "bg-purple-500" },
  { role: "student" as Role, email: "student1@academy.uz", password: "student123", label: "Student", color: "bg-green-500" },
];

const ROLE_ROUTES: Record<Role, string> = {
  superadmin: "/superadmin/dashboard",
  admin: "/admin/dashboard",
  mentor: "/mentor/dashboard",
  student: "/student/dashboard",
};

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("admin@academy.uz");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // simulated delay
    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      const user = useAuthStore.getState().user;
      toast.success("Muvaffaqiyatli kirildi!");
      router.push(ROLE_ROUTES[user!.role]);
    } else {
      toast.error(result.error || "Kirish muvaffaqiyatsiz");
    }
  }

  function handleQuickLogin(account: (typeof DEMO_ACCOUNTS)[0]) {
    setEmail(account.email);
    setPassword(account.password);
    setLoading(true);
    setTimeout(() => {
      const result = login(account.email, account.password);
      setLoading(false);
      if (result.success) {
        toast.success(`${account.label} sifatida kirildi!`);
        router.push(ROLE_ROUTES[account.role]);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">Academy CEFR</h1>
            <p className="text-xs text-muted-foreground">English Learning Platform</p>
          </div>
        </div>

        <Card className="shadow-xl border-border/50">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold">Kirish</CardTitle>
            <CardDescription>Hisobingizga kiring yoki demo rolni tanlang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Quick Login */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tezkor kirish</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => handleQuickLogin(account)}
                    disabled={loading}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-all text-left text-sm",
                      "hover:border-primary/30 hover:shadow-sm"
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full flex-shrink-0", account.color)} />
                    <span className="font-medium truncate">{account.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">yoki</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Kirilmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Kirish
                  </span>
                )}
              </Button>
            </form>

            {/* Demo info */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Demo ma'lumotlar:</p>
              <p className="text-xs text-muted-foreground">Admin: <span className="font-mono text-foreground">admin@academy.uz / admin123</span></p>
              <p className="text-xs text-muted-foreground">Mentor: <span className="font-mono text-foreground">mentor1@academy.uz / mentor123</span></p>
              <p className="text-xs text-muted-foreground">Student: <span className="font-mono text-foreground">student1@academy.uz / student123</span></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2025 Academy CEFR. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}
