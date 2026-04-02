"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Upload,
  Mic,
  Send,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ChevronLeft,
  Star,
  MessageSquare,
} from "lucide-react";
import { mockHomework, mockSubmissions } from "@/lib/mock-data";
import { getTimeAgo, isOverdue, isDeadlineNear } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentHomeworkPage() {
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});

  const submitted = mockSubmissions.filter(s => s.studentId === "s1");
  const submittedIds = submitted.map(s => s.homeworkId);
  const pending = mockHomework.filter(hw => !submittedIds.includes(hw.id));

  async function handleSubmit(hwId: string) {
    if (!textAnswers[hwId]?.trim()) {
      toast.error("Iltimos, javob yozing");
      return;
    }
    setSubmitting(hwId);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitting(null);
    toast.success("Vazifa muvaffaqiyatli topshirildi!");
  }

  return (
    <DashboardLayout title="Vazifalar">
      <div className="space-y-5">
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Topshirilmagan
              {pending.length > 0 && (
                <span className="ml-2 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {pending.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Topshirilgan ({submitted.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4 space-y-4">
            {pending.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500 opacity-70" />
                <p className="font-medium">Barcha vazifalar topshirilgan!</p>
                <p className="text-sm">Ajoyib ish, davom eting 🎉</p>
              </div>
            )}
            {pending.map(hw => {
              const overdue = isOverdue(hw.deadline);
              const near = isDeadlineNear(hw.deadline);
              const isSubmitting = submitting === hw.id;

              return (
                <Card key={hw.id} className={cn(
                  "overflow-hidden",
                  overdue && "border-red-200 dark:border-red-900/30"
                )}>
                  <div className={cn(
                    "h-1",
                    overdue ? "bg-red-500" : near ? "bg-amber-500" : "bg-primary"
                  )} />
                  <CardContent className="pt-5 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{hw.title}</h3>
                          <Badge variant="outline" className="text-[10px]">
                            {hw.type === "writing" ? "✍️ Writing" : hw.type === "speaking" ? "🎤 Speaking" : hw.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{hw.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          <span>Max: {hw.maxScore}</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 text-xs mt-1",
                          overdue ? "text-red-600 font-semibold" :
                          near ? "text-amber-600 font-semibold" :
                          "text-muted-foreground"
                        )}>
                          {overdue ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {overdue ? "Muddat o'tdi!" : hw.deadline.split("T")[0]}
                        </div>
                      </div>
                    </div>

                    {hw.type === "writing" && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Bu yerga javobingizni yozing..."
                          rows={5}
                          value={textAnswers[hw.id] || ""}
                          onChange={e => setTextAnswers(prev => ({ ...prev, [hw.id]: e.target.value }))}
                          className="resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {(textAnswers[hw.id] || "").split(" ").filter(Boolean).length} so'z
                          </span>
                          <Button
                            size="sm"
                            onClick={() => handleSubmit(hw.id)}
                            disabled={isSubmitting}
                            className="gap-2"
                          >
                            {isSubmitting ? (
                              <><span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" /> Topshirilmoqda...</>
                            ) : (
                              <><Send className="h-3.5 w-3.5" /> Topshirish</>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {hw.type === "speaking" && (
                      <div className="space-y-2">
                        <div className="border-2 border-dashed rounded-xl p-6 text-center space-y-3 hover:border-primary/50 transition-colors cursor-pointer">
                          <div className="h-14 w-14 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto">
                            <Mic className="h-7 w-7 text-rose-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Audio yozib yuborish</p>
                            <p className="text-xs text-muted-foreground">MP3 yoki WAV formatda yuklaing</p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-3.5 w-3.5" /> Audio fayl tanlash
                          </Button>
                        </div>
                        <Button size="sm" onClick={() => toast.success("Topshirildi!")} className="w-full gap-2">
                          <Send className="h-3.5 w-3.5" /> Topshirish
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="submitted" className="mt-4 space-y-3">
            {submitted.map(sub => {
              const hw = mockHomework.find(h => h.id === sub.homeworkId);
              return (
                <Card key={sub.id} className={cn(
                  "overflow-hidden",
                  sub.status === "graded" && "border-green-200 dark:border-green-900/30"
                )}>
                  <div className={cn("h-1", sub.status === "graded" ? "bg-green-500" : "bg-amber-400")} />
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{hw?.title || "Vazifa"}</span>
                          <Badge variant="outline" className={cn(
                            "text-[10px]",
                            sub.status === "graded"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          )}>
                            {sub.status === "graded" ? "✓ Baholandi" : "⏳ Tekshirilmoqda"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Topshirildi: {getTimeAgo(sub.submittedAt)}
                        </div>
                        {sub.content && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{sub.content}</p>
                        )}
                        {sub.feedback && (
                          <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-center gap-1.5 mb-1">
                              <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                              <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">Mentor izohi</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{sub.feedback}</p>
                          </div>
                        )}
                      </div>
                      {sub.status === "graded" && sub.score !== undefined && (
                        <div className="text-center flex-shrink-0">
                          <div className="h-14 w-14 rounded-full border-4 border-green-500 flex flex-col items-center justify-center">
                            <div className="text-lg font-bold text-green-600">{sub.score}</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1">/ {hw?.maxScore || 100}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
