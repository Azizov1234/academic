"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  BookOpen,
  FileText,
  Trophy,
  Flame,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Target,
  Zap,
} from "lucide-react";
import { mockStudentStats, mockHomework, mockExams } from "@/lib/mock-data";
import { getSkillColor, getSkillIcon, getSkillLabel, getScoreColor } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SkillType } from "@/lib/types";

const ALL_SKILLS: SkillType[] = ["reading", "listening", "writing", "speaking", "vocabulary", "grammar"];

export default function StudentDashboard() {
  const stats = mockStudentStats;

  const radarData = ALL_SKILLS.map((skill) => ({
    skill: getSkillLabel(skill),
    score: stats.skillProgress[skill],
  }));

  const activityData = stats.weeklyActivity.map((d) => ({
    day: d.day,
    minutes: d.minutes,
  }));

  return (
    <DashboardLayout title="O'quv Panelingiz">
      <div className="space-y-6">
        {/* Welcome + Streak */}
        <div className="gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-white/80 text-sm mb-1">Xush kelibsiz!</div>
              <h2 className="text-2xl font-bold">Bugun ham o'qishni davom eting 🎯</h2>
              <p className="text-white/70 text-sm mt-1">
                Daraja: <span className="font-bold text-white">{stats.currentLevel}</span> · 
                Jami progress: <span className="font-bold text-white">{stats.overallProgress}%</span>
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur rounded-xl p-4">
              <Flame className="h-8 w-8 text-orange-300" />
              <span className="text-2xl font-bold">{stats.streak}</span>
              <span className="text-xs text-white/70">kun streak</span>
            </div>
          </div>
          <div className="relative z-10 mt-4">
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Umumiy progress</span>
              <span>{stats.overallProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-1000"
                style={{ width: `${stats.overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Darslar"
            value={stats.totalLessonsCompleted}
            subtitle="Yakunlangan"
            icon={BookOpen}
            gradient="gradient-primary"
          />
          <StatsCard
            title="Vazifalar"
            value={stats.pendingHomework}
            subtitle="Topshirilmagan"
            icon={FileText}
            gradient="gradient-warning"
          />
          <StatsCard
            title="Sertifikatlar"
            value={stats.certificates}
            subtitle="Qo'lga kiritilgan"
            icon={Trophy}
            gradient="gradient-success"
          />
          <StatsCard
            title="Streak"
            value={`${stats.streak} kun`}
            subtitle="Ketma-ket o'qish"
            icon={Flame}
            gradient="gradient-danger"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Skill Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Ko'nikma Progressi
              </CardTitle>
              <CardDescription>Barcha sohalardagi darajangiz</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="currentColor" className="opacity-10" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar
                    name="Ball"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Haftalik Faollik
              </CardTitle>
              <CardDescription>So'nggi 7 kun (daqiqalar)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: any) => [`${v} daqiqa`, "Vaqt"]}
                    contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Bar dataKey="minutes" fill="#6366f1" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Ko'nikmalar
              </CardTitle>
              <CardDescription>Batafsil ko'rsatkichlar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ALL_SKILLS.map((skill) => {
                const score = stats.skillProgress[skill];
                return (
                  <div key={skill} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getSkillIcon(skill)}</span>
                        <span className="text-xs font-medium">{getSkillLabel(skill)}</span>
                      </div>
                      <span className={cn("text-xs font-bold", getScoreColor(score))}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-1.5" />
                  </div>
                );
              })}
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
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Topshirilmagan Vazifalar
                </CardTitle>
              </div>
              <Button variant="outline" size="sm" render={<Link href="/student/homework" />}>Barchasi</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockHomework.slice(0, 2).map((hw) => {
                const isLate = new Date(hw.deadline) < new Date();
                return (
                  <div
                    key={hw.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors hover:bg-muted/30",
                      isLate && "border-red-200 dark:border-red-900/30"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg",
                        hw.type === "writing" ? "bg-orange-100" : "bg-rose-100"
                      )}>
                        {hw.type === "writing" ? "✍️" : "🎤"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{hw.title}</div>
                        <div className={cn(
                          "text-xs mt-0.5",
                          isLate ? "text-red-500 font-medium" : "text-muted-foreground"
                        )}>
                          {isLate ? "⚠️ Muddati o'tdi!" : `Muddat: ${hw.deadline.split("T")[0]}`}
                        </div>
                      </div>
                      <Button size="sm" className="flex-shrink-0" render={<Link href={`/student/homework/${hw.id}`} />}>Topshirish</Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Grades + Upcoming Exam */}
          <div className="space-y-4">
            {/* Upcoming Exam */}
            {stats.upcomingExam && (
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-primary font-semibold uppercase tracking-wide">Yaqinlashayotgan imtihon</div>
                      <div className="text-sm font-bold mt-0.5">{stats.upcomingExam.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {stats.upcomingExam.timeLimitMin} daqiqa · {stats.upcomingExam.passingScore}% o'tish bali
                      </div>
                    </div>
                    <Button size="sm" render={<Link href="/student/exams" />}>Boshlash</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  So'nggi Baholar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats.recentGrades.slice(0, 3).map((grade, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0",
                      getSkillColor(grade.skill)
                    )}>
                      {getSkillIcon(grade.skill)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{grade.subject}</div>
                      <div className="text-xs text-muted-foreground">{grade.date}</div>
                    </div>
                    <div className={cn("text-sm font-bold", getScoreColor(grade.score, grade.maxScore))}>
                      {grade.score}/{grade.maxScore}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
