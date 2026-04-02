"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2, BookOpen, Clock, ArrowRight, Zap } from "lucide-react";
import { mockUnits, mockCourses } from "@/lib/mock-data";
import { Unit, SkillType } from "@/lib/types";
import { getLevelBgColor, getSkillIcon, getSkillLabel } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StudentUnitsPage() {
  const course = mockCourses[0];
  const units = mockUnits;

  return (
    <DashboardLayout title="Darslar">
      <div className="space-y-5">
        {/* Course Header */}
        <div className="gradient-primary rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-none text-xs mb-3">
              {course.level} daraja
            </Badge>
            <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
            <p className="text-white/80 text-sm">{course.description}</p>
            <div className="flex items-center gap-4 mt-3 text-white/70 text-xs">
              <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.unitCount} unit</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.estimatedHours} soat</span>
            </div>
          </div>
        </div>

        {/* Units */}
        <div className="space-y-3">
          {units.map((unit, idx) => {
            const isLocked = !unit.isUnlocked;
            const isCompleted = (unit.completionScore || 0) >= 70;
            const isInProgress = unit.isUnlocked && !isCompleted;

            return (
              <Card
                key={unit.id}
                className={cn(
                  "overflow-hidden transition-all",
                  isLocked ? "opacity-70" : "hover:shadow-md",
                  isCompleted && "border-green-200 dark:border-green-900/30"
                )}
              >
                <div className={cn(
                  "h-1",
                  isLocked ? "bg-muted" :
                  isCompleted ? "bg-green-500" :
                  "bg-primary"
                )} />
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    {/* Index */}
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0",
                      isLocked ? "bg-muted text-muted-foreground" :
                      isCompleted ? "bg-green-100 dark:bg-green-900/30" :
                      "gradient-primary text-white"
                    )}>
                      {isLocked ? (
                        <Lock className="h-5 w-5" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{unit.title}</h3>
                        <Badge className={cn("text-[10px]", getLevelBgColor(unit.level))}>
                          {unit.level}
                        </Badge>
                        {isCompleted && (
                          <Badge className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            ✓ Tugatildi
                          </Badge>
                        )}
                      </div>

                      {unit.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{unit.description}</p>
                      )}

                      {/* Skills */}
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {unit.skillsIncluded.map(skill => (
                          <span
                            key={skill}
                            className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {getSkillIcon(skill)} {getSkillLabel(skill)}
                          </span>
                        ))}
                      </div>

                      {/* Progress */}
                      {!isLocked && unit.completionScore !== undefined && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span className={cn(
                              "font-medium",
                              isCompleted ? "text-green-600" : "text-primary"
                            )}>{unit.completionScore}%</span>
                          </div>
                          <Progress value={unit.completionScore} className="h-1.5" />
                        </div>
                      )}

                      {isLocked && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="h-3 w-3" />
                          Oldingi unitni 70%+ ball bilan o'tkazing
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="text-xs text-muted-foreground">
                        {unit.estimatedHours}h · {unit.lessonCount} dars
                      </div>
                      {!isLocked ? (
                        <Button size="sm" className="gap-1" render={<Link href={`/student/units/${unit.id}`} />}>
                            {isCompleted ? "Ko'rish" : isInProgress ? "Davom" : "Boshlash"}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="gap-1 opacity-50">
                          <Lock className="h-3.5 w-3.5" />
                          Qulflangan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
