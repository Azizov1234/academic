"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Star,
  Eye,
  Mic,
  PenLine,
  Download,
} from "lucide-react";
import { mockHomework, mockSubmissions } from "@/lib/mock-data";
import { Homework, Submission } from "@/lib/types";
import { getInitials, getTimeAgo, isOverdue, isDeadlineNear } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MentorHomeworkPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [activeHw, setActiveHw] = useState<Homework | null>(null);

  const pendingCount = mockSubmissions.filter(s => s.status === "submitted").length;

  const TYPE_ICONS: Record<string, React.ReactNode> = {
    writing: <PenLine className="h-4 w-4" />,
    speaking: <Mic className="h-4 w-4" />,
    quiz: <CheckCircle2 className="h-4 w-4" />,
    file: <Download className="h-4 w-4" />,
  };

  return (
    <DashboardLayout title="Vazifalar">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Vazifalar Boshqaruvi</h2>
            <p className="text-sm text-muted-foreground">
              {mockHomework.length} vazifa · <span className="text-amber-600 font-medium">{pendingCount} baholanmagan</span>
            </p>
          </div>
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger render={<Button className="gap-2" />}><Plus className="h-4 w-4" />Yangi Vazifa</DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Yangi Vazifa Yaratish</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Sarlavha</Label>
                  <Input placeholder="Vazifa sarlavhasi" />
                </div>
                <div className="space-y-1.5">
                  <Label>Ko'rsatma</Label>
                  <Textarea placeholder="Vazifa ko'rsatmasi, talablar..." rows={4} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <Label>Tur</Label>
                    <Select defaultValue="writing">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="writing">✍️ Writing</SelectItem>
                        <SelectItem value="speaking">🎤 Speaking</SelectItem>
                        <SelectItem value="quiz">✅ Quiz</SelectItem>
                        <SelectItem value="file">📎 Fayl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Max ball</Label>
                    <Input type="number" defaultValue={100} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Deadline</Label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Guruh</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Guruh tanlang" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g1">IELTS Advanced A</SelectItem>
                      <SelectItem value="g2">Beginners B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={() => { toast.success("Vazifa yaratildi!"); setOpenCreate(false); }}>
                    <Send className="h-4 w-4 mr-2" /> Yuborish
                  </Button>
                  <Button variant="outline" onClick={() => setOpenCreate(false)}>Bekor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Faol</TabsTrigger>
            <TabsTrigger value="submissions">
              Topshirishlar
              {pendingCount > 0 && (
                <span className="ml-2 h-5 px-1.5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-3">
            {mockHomework.map(hw => {
              const overdue = isOverdue(hw.deadline);
              const near = isDeadlineNear(hw.deadline);
              const subRate = ((hw.submissionCount || 0) / (hw.totalStudents || 1)) * 100;

              return (
                <Card key={hw.id} className={cn(
                  "hover:shadow-md transition-shadow",
                  overdue && "border-red-200 dark:border-red-900/30"
                )}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        hw.type === "writing" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30" :
                        hw.type === "speaking" ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30" :
                        "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                      )}>
                        {TYPE_ICONS[hw.type] || <FileText className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <h3 className="font-semibold text-sm">{hw.title}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{hw.description}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <Button size="sm" variant="outline" className="h-7 text-xs" render={<a href={`/mentor/homework/${hw.id}/grade`} />}>Baholash</Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <div className={cn(
                            "flex items-center gap-1 text-xs",
                            overdue ? "text-red-600 font-medium" :
                            near ? "text-amber-600 font-medium" :
                            "text-muted-foreground"
                          )}>
                            <Clock className="h-3 w-3" />
                            {overdue ? "Muddati o'tdi!" : hw.deadline.split("T")[0]}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            Max: {hw.maxScore}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <span className={cn(
                              "font-medium",
                              subRate >= 80 ? "text-green-600" : subRate >= 50 ? "text-amber-600" : "text-red-600"
                            )}>
                              {hw.submissionCount}/{hw.totalStudents}
                            </span>
                            <span className="text-muted-foreground">topshirdi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="submissions" className="mt-4 space-y-3">
            {mockSubmissions.map(sub => (
              <Card key={sub.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {getInitials(sub.studentName || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{sub.studentName}</span>
                        <Badge variant="outline" className={cn(
                          "text-[10px]",
                          sub.status === "graded" ? "bg-green-50 text-green-700 border-green-200" :
                          "bg-amber-50 text-amber-700 border-amber-200"
                        )}>
                          {sub.status === "graded" ? "Baholandi" : "Tekshirilmadi"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {sub.content?.slice(0, 80)}...
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {getTimeAgo(sub.submittedAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {sub.status === "graded" && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{sub.score}</div>
                          <div className="text-[10px] text-muted-foreground">ball</div>
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant={sub.status === "submitted" ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => toast.info("Baholash sahifasi")}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {sub.status === "submitted" ? "Baholash" : "Ko'rish"}
                      </Button>
                    </div>
                  </div>
                  {sub.feedback && (
                    <div className="mt-3 pl-14">
                      <div className="text-xs bg-muted/50 rounded-lg p-2 text-muted-foreground">
                        💬 {sub.feedback}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
