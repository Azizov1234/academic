"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  Plus,
  Clock,
  Lock,
  CheckCircle2,
  MoreVertical,
  FileVideo,
  FileAudio,
  FileText,
  ChevronRight,
} from "lucide-react";
import { mockCourses, mockUnits } from "@/lib/mock-data";
import { Course, Level, Unit } from "@/lib/types";
import { getLevelBgColor, getSkillIcon } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function AdminCoursesPage() {
  const [openCourse, setOpenCourse] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(mockCourses[0]);

  const courseUnits = mockUnits.filter(u => u.courseId === selectedCourse?.id);

  const CONTENT_ICONS: Record<string, React.ReactNode> = {
    video: <FileVideo className="h-4 w-4 text-blue-500" />,
    audio: <FileAudio className="h-4 w-4 text-purple-500" />,
    pdf: <FileText className="h-4 w-4 text-red-500" />,
    text: <FileText className="h-4 w-4 text-gray-500" />,
    exercise: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  };

  return (
    <DashboardLayout title="Kurslar">
      <div className="flex gap-5 h-[calc(100vh-11rem)]">
        {/* Courses List */}
        <div className="w-72 flex-shrink-0 space-y-3 overflow-y-auto pr-1">
          <div className="flex items-center justify-between sticky top-0 bg-background py-1">
            <h2 className="font-semibold text-sm">Kurslar</h2>
            <Dialog open={openCourse} onOpenChange={setOpenCourse}>
              <DialogTrigger render={<Button size="sm" variant="outline" className="h-7 gap-1" />}>
                  <Plus className="h-3.5 w-3.5" /> Yangi
                </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle>Yangi Kurs Yaratish</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label>Kurs nomi</Label>
                    <Input placeholder="Masalan: IELTS Academic Preparation" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tavsif</Label>
                    <Textarea placeholder="Kurs haqida qisqa ma'lumot..." rows={3} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Daraja</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>{LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => { toast.success("Kurs yaratildi!"); setOpenCourse(false); }}>Saqlash</Button>
                    <Button variant="outline" onClick={() => setOpenCourse(false)}>Bekor</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {mockCourses.map(course => (
            <Card
              key={course.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedCourse?.id === course.id && "border-primary ring-1 ring-primary/20"
              )}
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="pt-3 pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{course.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={cn("text-[10px]", getLevelBgColor(course.level))}>{course.level}</Badge>
                      {!course.isPublished && (
                        <Badge variant="outline" className="text-[10px] text-amber-600">Qoralama</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {course.unitCount} unit · {course.estimatedHours}h
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Units & Lessons */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {selectedCourse ? (
            <>
              {/* Course Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{selectedCourse.title}</h2>
                  <p className="text-sm text-muted-foreground">{selectedCourse.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Nashr qilingan</Label>
                    <Switch
                      checked={selectedCourse.isPublished}
                      onCheckedChange={() => toast.success("Holat yangilandi")}
                    />
                  </div>
                  <Dialog open={openUnit} onOpenChange={setOpenUnit}>
                    <DialogTrigger render={<Button size="sm" className="gap-2" />}>
                        <Plus className="h-4 w-4" /> Unit qo'shish
                      </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader><DialogTitle>Yangi Unit Qo'shish</DialogTitle></DialogHeader>
                      <div className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                          <Label>Unit nomi</Label>
                          <Input placeholder="Masalan: Reading Strategies" />
                        </div>
                        <div className="space-y-1.5">
                          <Label>Tavsif</Label>
                          <Textarea placeholder="Unit haqida..." rows={2} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label>Daraja</Label>
                            <Select defaultValue={selectedCourse.level}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label>Soat</Label>
                            <Input type="number" placeholder="10" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => { toast.success("Unit qo'shildi!"); setOpenUnit(false); }}>Saqlash</Button>
                          <Button variant="outline" onClick={() => setOpenUnit(false)}>Bekor</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Units List */}
              <Accordion className="space-y-2">
                {courseUnits.map((unit, idx) => (
                  <AccordionItem key={unit.id} value={unit.id} className="border rounded-xl overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/30">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0",
                          unit.isPublished ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                        )}>
                          {idx + 1}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{unit.title}</span>
                            <Badge className={cn("text-[10px]", getLevelBgColor(unit.level))}>{unit.level}</Badge>
                            {!unit.isPublished && (
                              <Badge variant="outline" className="text-[10px] text-amber-600">Qoralama</Badge>
                            )}
                          </div>
                          <div className="flex gap-2 text-xs text-muted-foreground mt-0.5 flex-wrap">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{unit.estimatedHours}h</span>
                            <span>{unit.lessonCount} dars</span>
                            <span className="flex gap-1">{unit.skillsIncluded.map(s => getSkillIcon(s))}</span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2 pb-4 space-y-2">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-muted-foreground">{unit.description}</p>
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => toast.info("Dars qo'shish")}>
                          <Plus className="h-3 w-3" /> Dars
                        </Button>
                      </div>
                      {/* Mock lessons */}
                      {["Introduction to Reading", "Skimming & Scanning", "MCQ Practice"].map((lesson, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 border">
                          {CONTENT_ICONS[i === 0 ? "video" : i === 1 ? "text" : "exercise"]}
                          <span className="text-sm flex-1">{lesson}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {["Video", "Matn", "Mashq"][i]}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toast.info("Tahrirlash")}>
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>Kurs tanlang</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
