"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Users,
  FileText,
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  Star,
  PenLine,
} from "lucide-react";
import { mockMentorStats, mockHomework } from "@/lib/mock-data";
import { getInitials, getLevelBgColor, getTimeAgo, getStatusColor, getStatusLabel } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MentorDashboard() {
  const stats = mockMentorStats;

  const progressData = stats.groupProgress.map((g) => ({
    name: g.groupName.split(" ")[0],
    "O'rtacha ball": g.averageScore,
    "Yakunlash": g.completionRate,
  }));

  return (
    <DashboardLayout title="Mentor Paneli">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Guruhlarim"
            value={stats.totalGroups}
            subtitle={`${stats.totalStudents} student`}
            icon={Users}
            gradient="gradient-primary"
          />
          <StatsCard
            title="Baholanmagan"
            value={stats.pendingGrading}
            subtitle="Tekshirishni kutmoqda"
            icon={FileText}
            gradient="gradient-warning"
          />
          <StatsCard
            title="Yaqin Imtihonlar"
            value={stats.upcomingExams}
            subtitle="Bu hafta"
            icon={ClipboardList}
            gradient="gradient-purple"
          />
          <StatsCard
            title="Bugungi Darslar"
            value={stats.todayLessons.length}
            subtitle="Jadvalda"
            icon={Clock}
            gradient="gradient-success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Group Progress Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Guruh Progressi
              </CardTitle>
              <CardDescription>O'rtacha ball va yakunlash darajasi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="O'rtacha ball" fill="#6366f1" radius={4} />
                  <Bar dataKey="Yakunlash" fill="#22c55e" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Bugungi Jadval
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.todayLessons.map((lesson) => (
                <div key={lesson.id} className="p-3 rounded-lg bg-muted/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{lesson.startTime} — {lesson.endTime}</span>
                    <Badge className={cn("text-[10px]", getLevelBgColor(lesson.level))}>{lesson.level}</Badge>
                  </div>
                  <div className="text-sm font-medium">{lesson.groupName}</div>
                  {lesson.room && (
                    <div className="text-xs text-muted-foreground">{lesson.room}</div>
                  )}
                </div>
              ))}
              <Button className="w-full" variant="outline" size="sm" render={<Link href="/mentor/attendance" />}>Davomat belgilash</Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pending Homework */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-primary" />
                  Baholanmagan Vazifalar
                </CardTitle>
                <CardDescription>Tezroq tekshiring</CardDescription>
              </div>
              <Button variant="outline" size="sm" render={<Link href="/mentor/homework" />}>Barchasi</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentSubmissions.filter(s => s.status === "submitted").map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                      {getInitials(sub.studentName || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{sub.studentName}</div>
                    <div className="text-xs text-muted-foreground">{getTimeAgo(sub.submittedAt)}</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs" render={<Link href={`/mentor/homework/${sub.homeworkId}/grade`} />}>Baholash</Button>
                </div>
              ))}
              {stats.recentSubmissions.filter(s => s.status === "submitted").length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm">Barcha vazifalar baholangan!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Homework */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Faol Vazifalar
                </CardTitle>
                <CardDescription>Topshirilgan / Jami</CardDescription>
              </div>
              <Button variant="outline" size="sm" render={<Link href="/mentor/homework" />}>Yangi yaratish</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockHomework.slice(0, 3).map((hw) => (
                <div key={hw.id} className="p-3 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium">{hw.title}</div>
                      <div className="text-xs text-muted-foreground">Muddat: {hw.deadline.split("T")[0]}</div>
                    </div>
                    <Badge variant="outline" className="text-[10px] flex-shrink-0">
                      {hw.type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Topshirildi</span>
                      <span>{hw.submissionCount}/{hw.totalStudents}</span>
                    </div>
                    <Progress
                      value={((hw.submissionCount || 0) / (hw.totalStudents || 1)) * 100}
                      className="h-1.5"
                    />
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
