"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Plus,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { mockGroups } from "@/lib/mock-data";
import { Group, Level } from "@/lib/types";
import { getLevelBgColor } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function AdminGroupsPage() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filtered = mockGroups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    (g.mentorName && g.mentorName.toLowerCase().includes(search.toLowerCase()))
  );

  const fillPercent = (g: Group) =>
    Math.round(((g.currentStudents || 0) / g.maxStudents) * 100);

  return (
    <DashboardLayout title="Guruhlar">
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Guruhlar Boshqaruvi</h2>
            <p className="text-sm text-muted-foreground">Jami {mockGroups.length} guruh · {mockGroups.filter(g => g.isActive).length} faol</p>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger render={<Button className="gap-2" />}><Plus className="h-4 w-4" />Yangi Guruh</DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader><DialogTitle>Yangi Guruh Yaratish</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Guruh nomi</Label>
                  <Input placeholder="Masalan: IELTS Advanced — Guruh E" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Daraja</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>
                        {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Mentor</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m1">Dilnoza Yusupova</SelectItem>
                        <SelectItem value="m2">Jasur Toshmatov</SelectItem>
                        <SelectItem value="m3">Gulnora Saidova</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Kurs</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="c1">IELTS Academic</SelectItem>
                        <SelectItem value="c2">General English</SelectItem>
                        <SelectItem value="c3">Business English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Max studentlar</Label>
                    <Input type="number" placeholder="12" defaultValue={12} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Dars kunlari</Label>
                  <Input placeholder="Dushanba, Chorshanba, Juma" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Boshlanish vaqti</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Tugash vaqti</Label>
                    <Input type="time" defaultValue="11:00" />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={() => { toast.success("Guruh yaratildi!"); setOpenDialog(false); }}>Saqlash</Button>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Bekor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Guruh yoki mentor nomi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((group) => {
            const fill = fillPercent(group);
            return (
              <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                <div className={cn(
                  "h-1.5",
                  fill >= 90 ? "bg-green-500" : fill >= 60 ? "bg-primary" : "bg-amber-500"
                )} style={{ width: `${fill}%` }} />
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm">{group.name}</h3>
                        <Badge className={cn("text-[10px]", getLevelBgColor(group.level))}>
                          {group.level}
                        </Badge>
                        {!group.isActive && (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground">Nofaol</Badge>
                        )}
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[9px] bg-purple-100 text-purple-700">
                              {(group.mentorName || "").split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {group.mentorName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          {group.courseName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {group.schedule.days.join(", ")} · {group.schedule.startTime}–{group.schedule.endTime}
                        </div>
                        {group.schedule.room && (
                          <div className="text-xs text-muted-foreground">📍 {group.schedule.room}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-center flex-shrink-0">
                      <div className="text-2xl font-bold">{group.currentStudents}</div>
                      <div className="text-xs text-muted-foreground">/{group.maxStudents}</div>
                      <div className="text-xs text-muted-foreground">student</div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> To'lish darajasi</span>
                      <span className={cn(
                        "font-medium",
                        fill >= 90 ? "text-green-600" : fill >= 60 ? "text-primary" : "text-amber-600"
                      )}>{fill}%</span>
                    </div>
                    <Progress value={fill} className="h-1.5" />
                  </div>

                  <Button
                    className="w-full mt-3 gap-2"
                    variant="outline"
                    size="sm"
                   
                   render={<Link href={`/admin/groups/${group.id}`} />}>
                      Batafsil ko'rish <ArrowRight className="h-3 w-3" />
                    </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
