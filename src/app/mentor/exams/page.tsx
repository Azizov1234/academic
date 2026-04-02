"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileWarning, Clock, Users, Calendar, Plus, Trophy, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MentorExamsPage() {
  const [openCreate, setOpenCreate] = useState(false);

  const mockExams = [
    {
      id: "EXM-001",
      title: "Mid-term Speaking Test",
      group: "General English Upper-Int",
      date: "2025-02-20",
      time: "15:00",
      duration: "45 daqiqa",
      students: 14,
      status: "upcoming",
      type: "Oral Test"
    },
    {
      id: "EXM-002",
      title: "CEFR Mock Exam (Listening & Reading)",
      group: "CEFR Preparation",
      date: "2025-02-18",
      time: "18:00",
      duration: "90 daqiqa",
      students: 8,
      status: "completed",
      type: "Written Test"
    },
    {
      id: "EXM-003",
      title: "Grammar Assessment 1",
      group: "IELTS Foundation",
      date: "2025-02-25",
      time: "10:00",
      duration: "60 daqiqa",
      students: 15,
      status: "upcoming",
      type: "Written Test"
    }
  ];

  return (
    <DashboardLayout title="Imtihonlar">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Imtihonlar boshqaruvi</h2>
            <p className="text-muted-foreground text-sm mt-1">O'z guruhlaringiz uchun oraliq yoki yakuniy testlar rejalashtiring.</p>
          </div>
          
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Imtihon Belgilash</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Yangi imtihon qo'shish</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Imtihon nomi</Label>
                  <Input placeholder="Masalan: Final Mock Test" />
                </div>
                <div className="space-y-2">
                  <Label>Guruhni qistiring</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Guruh tanlang" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GRP-101">General English Upper-Int (B2)</SelectItem>
                      <SelectItem value="GRP-102">CEFR Preparation (C1)</SelectItem>
                      <SelectItem value="GRP-103">IELTS Foundation (B1+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sana</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Vaqt</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Davomiyligi (daqiqa)</Label>
                  <Input type="number" defaultValue={60} />
                </div>
                <div className="pt-4 flex gap-2">
                  <Button className="flex-1" onClick={() => {
                    toast.success("Yangi imtihon yaratildi!");
                    setOpenCreate(false);
                  }}>Saqlash va E'lon qilish</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="upcoming">Kelayotgan imtihonlar</TabsTrigger>
            <TabsTrigger value="completed">Tugagan (Arxiv)</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockExams.filter(e => e.status === "upcoming").map(exam => (
                <Card key={exam.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">
                          {exam.type}
                        </Badge>
                        <h3 className="font-semibold text-lg">{exam.title}</h3>
                        <p className="text-sm text-primary font-medium mt-1">{exam.group}</p>
                      </div>
                      <div className="p-2 border rounded-xl bg-muted/20 flex flex-col items-center justify-center min-w-[60px]">
                        <span className="text-xs text-muted-foreground uppercase font-semibold">{new Date(exam.date).toLocaleString('uz-UZ', { month: 'short' })}</span>
                        <span className="text-xl font-bold">{new Date(exam.date).getDate()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> {exam.time} ({exam.duration})
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" /> {exam.students} nafar o'quvchi
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex gap-2">
                    <Button variant="outline" className="w-full text-xs">Tahrirlash</Button>
                    <Button className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 dark:text-white">Boshlash</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockExams.filter(e => e.status === "completed").map(exam => (
                <Card key={exam.id} className="opacity-80">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2 bg-green-50 text-green-700 border-green-200">
                          Yakunlangan
                        </Badge>
                        <h3 className="font-semibold text-lg">{exam.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{exam.group}</p>
                      </div>
                      <Trophy className="h-6 w-6 text-yellow-500 opacity-50" />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-4 border-t text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> {exam.date}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button variant="outline" className="w-full text-xs gap-2">Natijalarni ko'rish <ChevronRight className="h-3 w-3" /></Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
