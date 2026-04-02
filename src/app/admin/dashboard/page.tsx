"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Users,
  GraduationCap,
  CreditCard,
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { mockAdminStats } from "@/lib/mock-data";
import { getInitials, getLevelBgColor, formatCurrency, getTimeAgo } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const stats = mockAdminStats;

  const paymentData = stats.paymentByMonth.map((p) => ({
    ...p,
    paid: p.paid / 1000000,
    unpaid: p.unpaid / 1000000,
  }));

  return (
    <DashboardLayout title="Boshqaruv Paneli">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Jami Studentlar"
            value={stats.totalStudents}
            subtitle={`${stats.activeStudents} faol`}
            icon={GraduationCap}
            gradient="gradient-primary"
            trend={{ value: 8, label: "o'tgan oyga nisbatan", positive: true }}
          />
          <StatsCard
            title="Mentorlar"
            value={stats.totalMentors}
            subtitle="Barcha faol"
            icon={Users}
            gradient="gradient-purple"
            trend={{ value: 2, label: "yangi bu oy", positive: true }}
          />
          <StatsCard
            title="To'lanmagan"
            value={stats.pendingPayments}
            subtitle={`${stats.paidPayments} to'langan`}
            icon={CreditCard}
            gradient="gradient-warning"
            trend={{ value: 5, label: "o'tgan oyga nisbatan", positive: false }}
          />
          <StatsCard
            title="Guruhlar"
            value={stats.totalGroups}
            subtitle={`${stats.upcomingExams} imtihon yaqin`}
            icon={Calendar}
            gradient="gradient-success"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Payment Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                To'lov Dinamikasi
              </CardTitle>
              <CardDescription>Oylik to'lov holati (mln so'm)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={paymentData}>
                  <defs>
                    <linearGradient id="paidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="unpaidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: any) => [`${value.toFixed(1)} mln`, ""]}
                    contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="paid" name="To'landi" stroke="#6366f1" fill="url(#paidGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="unpaid" name="To'lanmadi" stroke="#ef4444" fill="url(#unpaidGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Group Fill Rate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guruh To'lishi
              </CardTitle>
              <CardDescription>Joriy holat</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.groupFillRate.map((g) => (
                <div key={g.groupName} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate max-w-[120px]">{g.groupName}</span>
                    <span className="text-xs text-muted-foreground">
                      {g.current}/{g.max}
                    </span>
                  </div>
                  <Progress value={g.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground">{g.percentage}% to'lgan</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Bugungi Darslar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.todaySchedule.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.groupName}</div>
                    <div className="text-xs text-muted-foreground">{s.mentorName}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-semibold">{s.startTime}</div>
                    <Badge className={cn("text-[10px] mt-0.5", getLevelBgColor(s.level))}>
                      {s.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Students */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Top 5 Student
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.topStudents.map((student, i) => (
                <div key={student.id} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                      i === 0 ? "bg-yellow-100 text-yellow-700" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      i === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-muted text-muted-foreground"
                    )}
                  >
                    {i + 1}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.groupName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">{student.score}</div>
                    <Badge variant="outline" className={cn("text-[10px]", getLevelBgColor(student.level))}>
                      {student.level}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                So'nggi Topshiriqlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(sub.studentName || "?")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{sub.studentName}</div>
                    <div className="text-xs text-muted-foreground">{getTimeAgo(sub.submittedAt)}</div>
                  </div>
                  <div className="flex-shrink-0">
                    {sub.status === "graded" ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs font-semibold text-green-600">{sub.score}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-xs text-amber-600">Kutilmoqda</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
