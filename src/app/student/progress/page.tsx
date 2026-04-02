"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  LineChart,
  Line,
} from "recharts";
import { Flame, Trophy, TrendingUp, Target, Star, Download } from "lucide-react";
import { mockStudentStats, mockExamResults } from "@/lib/mock-data";
import { SkillType } from "@/lib/types";
import { getSkillColor, getSkillIcon, getSkillLabel, getScoreColor, getLevelBgColor } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const ALL_SKILLS: SkillType[] = ["reading", "listening", "writing", "speaking", "vocabulary", "grammar"];

export default function StudentProgressPage() {
  const stats = mockStudentStats;

  const radarData = ALL_SKILLS.map(skill => ({
    skill: getSkillLabel(skill),
    score: stats.skillProgress[skill],
    fullMark: 100,
  }));

  const gradeData = stats.recentGrades.map(g => ({
    name: g.subject.slice(0, 12),
    ball: g.score,
    max: g.maxScore,
  }));

  const activityData = stats.weeklyActivity.map(d => ({
    day: d.day,
    daqiqa: d.minutes,
    darslar: d.lessonsCompleted,
  }));

  return (
    <DashboardLayout title="Progressim">
      <div className="space-y-5">
        {/* Overview Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="col-span-2 lg:col-span-1 border-primary/30 bg-primary/5">
            <CardContent className="pt-4 pb-4 text-center">
              <div className="text-5xl font-black text-primary">{stats.overallProgress}%</div>
              <div className="text-sm text-muted-foreground mt-1">Umumiy progress</div>
              <Progress value={stats.overallProgress} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <Flame className="h-5 w-5 text-orange-500 mr-1" />
              </div>
              <div className="text-3xl font-bold">{stats.streak}</div>
              <div className="text-xs text-muted-foreground">Streak (kun)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-5 w-5 text-amber-500 mr-1" />
              </div>
              <div className="text-3xl font-bold">{stats.totalLessonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Dars tugallangan</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4 text-center">
              <Badge className={cn("text-sm px-3 py-1", getLevelBgColor(stats.currentLevel))}>
                {stats.currentLevel}
              </Badge>
              <div className="text-xs text-muted-foreground mt-2">Joriy daraja</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Ko'nikma Tahlili
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="currentColor" className="opacity-10" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="Ball" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2.5} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Ko'nikmalar Bo'yicha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ALL_SKILLS.map(skill => {
                const score = stats.skillProgress[skill];
                return (
                  <div key={skill} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "h-7 w-7 rounded flex items-center justify-center text-sm",
                          getSkillColor(skill)
                        )}>
                          {getSkillIcon(skill)}
                        </span>
                        <span className="text-sm font-medium">{getSkillLabel(skill)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-bold", getScoreColor(score))}>{score}%</span>
                        <div className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          score >= 80 ? "bg-green-100 text-green-700" :
                          score >= 60 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {score >= 80 ? "A'lo" : score >= 70 ? "Yaxshi" : score >= 60 ? "Qoniq" : "Zaif"}
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={score}
                      className="h-2"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Weekly activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Haftalik Faollik</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                    formatter={(v: any, n: any) => [n === "daqiqa" ? `${v} daqiqa` : `${v} dars`, n]}
                  />
                  <Bar dataKey="daqiqa" name="daqiqa" fill="#6366f1" radius={4} />
                  <Bar dataKey="darslar" name="darslar" fill="#22c55e" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent grades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                So'nggi Baholar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stats.recentGrades.map((grade, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0",
                    getSkillColor(grade.skill)
                  )}>
                    {getSkillIcon(grade.skill)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{grade.subject}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Progress
                        value={(grade.score / grade.maxScore) * 100}
                        className="h-1.5 flex-1"
                      />
                      <span className={cn("text-xs font-bold flex-shrink-0", getScoreColor(grade.score, grade.maxScore))}>
                        {grade.score}/{grade.maxScore}
                      </span>
                    </div>
                  </div>
                  <div className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0",
                    grade.score / grade.maxScore >= 0.8
                      ? "bg-green-100 text-green-700"
                      : grade.score / grade.maxScore >= 0.6
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  )}>
                    {Math.round((grade.score / grade.maxScore) * 100)}%
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
