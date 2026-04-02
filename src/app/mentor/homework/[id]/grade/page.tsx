"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  CheckCircle2,
  Save,
  ChevronLeft,
  Mic,
  FileText,
  Clock,
  MessageSquare,
} from "lucide-react";
import { mockSubmissions } from "@/lib/mock-data";
import { getInitials, formatDateTime } from "@/lib/utils-helpers";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GradeHomeworkPage({ params }: { params: { id: string } }) {
  // Use the first submission that needs grading, or the first in list
  const submission = mockSubmissions.find(s => s.homeworkId === params.id) || mockSubmissions[1];
  const [score, setScore] = useState<number[]>([submission?.score || 70]);
  const [feedback, setFeedback] = useState(submission?.feedback || "");
  const [saved, setSaved] = useState(false);

  const scoreValue = score[0];

  function handleSave() {
    if (!feedback.trim()) {
      toast.error("Iltimos, fikr-mulohaza yozing");
      return;
    }
    setSaved(true);
    toast.success(`Ball va fikr-mulohaza saqlandi: ${scoreValue}/100`);
  }

  const scoreColor = scoreValue >= 80 ? "text-green-600" : scoreValue >= 60 ? "text-amber-600" : "text-red-600";

  return (
    <DashboardLayout title="Vazifa Baholash">
      <div className="space-y-5 max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" render={<Link href="/mentor/homework" />}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Orqaga
            </Button>
          <div>
            <h2 className="text-lg font-semibold">Vazifani Baholash</h2>
            <p className="text-sm text-muted-foreground">IELTS Writing Task 2 — Essay</p>
          </div>
        </div>

        {submission && (
          <>
            {/* Student Info */}
            <Card>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {getInitials(submission.studentName || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{submission.studentName}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Topshirildi: {formatDateTime(submission.submittedAt)}
                      </span>
                      <Badge variant="outline" className={cn(
                        "text-[10px]",
                        submission.status === "graded"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        {submission.status === "graded" ? "Baholangan" : "Baholanmagan"}
                      </Badge>
                    </div>
                  </div>
                  {saved && (
                    <div className="text-center">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto" />
                      <div className="text-xs text-green-600 mt-1 font-medium">Saqlandi</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submission Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Topshirilgan Javob
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submission.audioUrl ? (
                  <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center gap-3">
                    <Mic className="h-5 w-5 text-rose-600" />
                    <span className="text-sm font-medium text-rose-700">Audio fayl topshirilgan</span>
                    <Button size="sm" variant="outline" className="ml-auto text-xs">
                      Eshitish
                    </Button>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div className="p-4 rounded-lg bg-muted/50 text-sm leading-relaxed whitespace-pre-wrap">
                      {submission.content}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Grading Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  Ball Berish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Ball (0 — 100)</Label>
                    <div className={cn("text-3xl font-bold tabular-nums", scoreColor)}>
                      {scoreValue}
                    </div>
                  </div>
                  <Slider
                    value={score}
                    onValueChange={(val) => setScore(val as number[])}
                    min={0}
                    max={100}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 — Eng past</span>
                    <span className={cn(
                      "font-medium",
                      scoreValue >= 80 ? "text-green-600" : scoreValue >= 60 ? "text-amber-600" : "text-red-600"
                    )}>
                      {scoreValue >= 80 ? "🏆 A'lo" : scoreValue >= 70 ? "✅ Yaxshi" : scoreValue >= 60 ? "⚠️ Qoniqarli" : "❌ Yomon"}
                    </span>
                    <span>100 — Eng yuqori</span>
                  </div>

                  {/* Quick score buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {[50, 60, 70, 75, 80, 85, 90, 95, 100].map(v => (
                      <Button
                        key={v}
                        size="sm"
                        variant={scoreValue === v ? "default" : "outline"}
                        className="h-7 text-xs"
                        onClick={() => setScore([v])}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Fikr-Mulohaza
                  </Label>
                  <Textarea
                    placeholder="Studentga batafsil fikr yozing: kuchli tomonlar, kamchiliklar, tavsiyalar..."
                    rows={5}
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Yaxshi fikr-mulohaza studentni rivojlantirishga yordam beradi
                  </p>
                </div>

                <Button className="w-full gap-2" size="lg" onClick={handleSave} disabled={saved}>
                  {saved ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Saqlandi! ({scoreValue}/100)
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Ball va Fikrni Saqlash ({scoreValue}/100)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
