"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Clock,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Trophy,
  Play,
  Lock,
  BarChart3,
} from "lucide-react";
import { mockExams, mockExamResults } from "@/lib/mock-data";
import { Exam } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Mock exam questions
const MOCK_QUESTIONS = [
  {
    id: "q1",
    type: "multiple_choice",
    text: "Which word best completes the sentence: 'The company made a _____ decision to expand overseas.'",
    options: ["A) strategic", "B) strategy", "C) strategize", "D) strategically"],
    correct: "A) strategic",
    points: 5,
  },
  {
    id: "q2",
    type: "multiple_choice",
    text: "Choose the correct form: 'By next year, they _____ the project.'",
    options: ["A) will complete", "B) will have completed", "C) have completed", "D) completed"],
    correct: "B) will have completed",
    points: 5,
  },
  {
    id: "q3",
    type: "fill_in_the_blank",
    text: "Fill in: The results were ___________ (positive/negative) than expected.",
    correct: "more positive",
    points: 5,
  },
  {
    id: "q4",
    type: "multiple_choice",
    text: "The text states that technology... (True / False / Not Given)",
    options: ["A) True", "B) False", "C) Not Given"],
    correct: "A) True",
    points: 5,
  },
];

export default function StudentExamsPage() {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!examStarted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  function startExam(exam: Exam) {
    setActiveExam(exam);
    setTimeLeft(exam.timeLimitMin * 60);
    setExamStarted(true);
    setSubmitted(false);
    setAnswers({});
  }

  function handleSubmit() {
    if (!submitted) {
      setSubmitted(true);
      setExamStarted(false);
      // Calculate score
      let total = 0;
      MOCK_QUESTIONS.forEach(q => {
        if (answers[q.id] === q.correct) total += q.points;
      });
      setScore(total);
      toast.success("Imtihon topshirildi!");
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timePercent = activeExam ? (timeLeft / (activeExam.timeLimitMin * 60)) * 100 : 100;
  const isTimeWarning = timePercent < 25;

  const TYPE_LABELS: Record<string, string> = {
    unit_test: "Unit Test",
    progress_test: "Progress Test",
    placement_test: "Placement Test",
  };

  const TYPE_COLORS: Record<string, string> = {
    unit_test: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress_test: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    placement_test: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  const myResults = mockExamResults.filter(r => r.studentId === "s1");

  return (
    <DashboardLayout title="Imtihonlar">
      {/* Active Exam Modal */}
      <Dialog open={examStarted || submitted} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{activeExam?.title}</span>
              {examStarted && (
                <div className={cn(
                  "flex items-center gap-1.5 text-base font-mono px-3 py-1 rounded-lg",
                  isTimeWarning
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-muted text-foreground"
                )}>
                  <Clock className={cn("h-4 w-4", isTimeWarning && "animate-pulse")} />
                  {formatTime(timeLeft)}
                </div>
              )}
            </DialogTitle>
          </DialogHeader>

          {!submitted ? (
            <div className="space-y-5 pt-2">
              {/* Timer bar */}
              <Progress
                value={timePercent}
                className={cn("h-2", isTimeWarning && "[&>div]:bg-red-500")}
              />

              {MOCK_QUESTIONS.map((q, idx) => (
                <Card key={q.id} className={cn(
                  "border",
                  answers[q.id] ? "border-primary/30" : ""
                )}>
                  <CardContent className="pt-4 pb-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 rounded px-1.5 py-0.5 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium">{q.text}</p>
                    </div>

                    {q.type === "multiple_choice" && q.options && (
                      <RadioGroup
                        value={answers[q.id]}
                        onValueChange={v => setAnswers(prev => ({ ...prev, [q.id]: v }))}
                        className="space-y-2"
                      >
                        {q.options.map(opt => (
                          <div key={opt} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                            <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                            <Label htmlFor={`${q.id}-${opt}`} className="cursor-pointer text-sm">{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {q.type === "fill_in_the_blank" && (
                      <Input
                        placeholder="Javobingizni yozing..."
                        value={answers[q.id] || ""}
                        onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      />
                    )}

                    <div className="text-xs text-muted-foreground">{q.points} ball</div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex items-center justify-between pt-2 pb-4">
                <span className="text-sm text-muted-foreground">
                  {Object.keys(answers).length}/{MOCK_QUESTIONS.length} javob berildi
                </span>
                <Button onClick={handleSubmit} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Topshirish
                </Button>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="text-center space-y-4 py-4">
              <div className={cn(
                "h-24 w-24 rounded-full flex flex-col items-center justify-center mx-auto border-4",
                score >= (activeExam?.passingScore || 70)
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-red-500 bg-red-50 dark:bg-red-900/20"
              )}>
                {score >= (activeExam?.passingScore || 70) ? (
                  <Trophy className="h-8 w-8 text-green-600 mb-1" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600 mb-1" />
                )}
                <div className={cn(
                  "text-2xl font-bold",
                  score >= (activeExam?.passingScore || 70) ? "text-green-600" : "text-red-600"
                )}>{score}%</div>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {score >= (activeExam?.passingScore || 70) ? "🎉 Tabriklaymiz!" : "😔 Muvaffaqiyatsiz"}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {score >= (activeExam?.passingScore || 70)
                    ? "Imtihondan o'tdingiz! Navbatdagi unit ochildi."
                    : `O'tish bali: ${activeExam?.passingScore}%. Qayta urinib ko'ring.`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                {MOCK_QUESTIONS.map((q, i) => (
                  <div key={q.id} className={cn(
                    "p-2 rounded-lg text-xs",
                    answers[q.id] === q.correct
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20"
                      : "bg-red-50 text-red-700 dark:bg-red-900/20"
                  )}>
                    {i + 1}. {answers[q.id] === q.correct ? "✓ To'g'ri" : "✗ Noto'g'ri"}
                  </div>
                ))}
              </div>

              <Button onClick={() => { setActiveExam(null); setSubmitted(false); }} className="w-full">
                Yopish
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-5">
        {/* Exams List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Imtihonlar</h2>
          {mockExams.map(exam => {
            const myResult = myResults.find(r => r.examId === exam.id);
            const passed = myResult?.passed;

            return (
              <Card key={exam.id} className={cn(
                "hover:shadow-md transition-shadow",
                !exam.isActive && "opacity-60"
              )}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      passed ? "gradient-success" : exam.isActive ? "gradient-primary" : "bg-muted"
                    )}>
                      {passed ? (
                        <Trophy className="h-6 w-6 text-white" />
                      ) : exam.isActive ? (
                        <ClipboardList className="h-6 w-6 text-white" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{exam.title}</span>
                        <Badge className={cn("text-[10px]", TYPE_COLORS[exam.type])}>
                          {TYPE_LABELS[exam.type]}
                        </Badge>
                        {passed && (
                          <Badge className="text-[10px] bg-green-100 text-green-700">
                            ✓ O'tdi: {myResult?.percentage}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{exam.timeLimitMin} daqiqa</span>
                        <span className="flex items-center gap-1"><BarChart3 className="h-3 w-3" />O'tish: {exam.passingScore}%</span>
                        <span>{exam.attemptsAllowed} urinish</span>
                        {exam.questionCount && <span>{exam.questionCount} savol</span>}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      disabled={!exam.isActive || (myResult?.attempt || 0) >= exam.attemptsAllowed}
                      onClick={() => startExam(exam)}
                      className="gap-1.5 flex-shrink-0"
                      variant={passed ? "outline" : "default"}
                    >
                      <Play className="h-3.5 w-3.5" />
                      {passed ? "Qayta" : myResult ? "Davom" : "Boshlash"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Past Results */}
        {myResults.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Natijalarim</h2>
            {myResults.map(result => (
              <Card key={result.id}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-14 w-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white",
                      result.passed ? "gradient-success" : "gradient-danger"
                    )}>
                      <div className="text-xl font-bold">{result.percentage}</div>
                      <div className="text-[10px] opacity-80">%</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{mockExams.find(e => e.id === result.examId)?.title}</div>
                      <div className="text-xs text-muted-foreground">{new Date(result.finishedAt).toLocaleDateString()}</div>
                      <div className="flex gap-2 mt-1">
                        {result.passed
                          ? <Badge className="text-[10px] bg-green-100 text-green-700">O'tdi ✓</Badge>
                          : <Badge className="text-[10px] bg-red-100 text-red-700">O'tmadi ✗</Badge>}
                        <Badge variant="outline" className="text-[10px]">Urinish: {result.attempt}</Badge>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold">{result.score}</div>
                      <div className="text-xs text-muted-foreground">/{result.totalPoints}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
