"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Edit,
  Trash2,
  UserCheck,
  Filter,
} from "lucide-react";
import { mockStudents } from "@/lib/mock-data";
import { Student, Level } from "@/lib/types";
import { getInitials, getLevelBgColor, formatDate } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function AdminStudentsPage() {
  const [students] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openDialog, setOpenDialog] = useState(false);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.phone && s.phone.includes(search));
    const matchLevel = levelFilter === "all" || s.level === levelFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && s.isActive) ||
      (statusFilter === "inactive" && !s.isActive);
    return matchSearch && matchLevel && matchStatus;
  });

  return (
    <DashboardLayout title="Studentlar">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Studentlar Ro'yxati</h2>
            <p className="text-sm text-muted-foreground">Jami {students.length} student, {students.filter(s => s.isActive).length} faol</p>
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger render={<Button className="gap-2" />}>
                <Plus className="h-4 w-4" />
                Yangi Student
              </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Yangi Student Qo'shish</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Ism</Label>
                    <Input placeholder="Ism" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Familiya</Label>
                    <Input placeholder="Familiya" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-1.5">
                  <Label>Telefon</Label>
                  <Input placeholder="+998 90 123 45 67" />
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
                    <Label>Guruh</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g1">IELTS Advanced A</SelectItem>
                        <SelectItem value="g2">Beginners B</SelectItem>
                        <SelectItem value="g3">Business C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Parol</Label>
                  <Input type="password" placeholder="Vaqtinchalik parol" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" onClick={() => { toast.success("Student qo'shildi!"); setOpenDialog(false); }}>
                    Saqlash
                  </Button>
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Bekor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ism, email yoki telefon orqali qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={levelFilter} onValueChange={(val) => { if(val) setLevelFilter(val) }}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Daraja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(val) => { if(val) setStatusFilter(val) }}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Holat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="active">Faol</SelectItem>
              <SelectItem value="inactive">Nofaol</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{student.name}</span>
                      {student.level && (
                        <Badge className={cn("text-[10px] px-1.5", getLevelBgColor(student.level))}>
                          {student.level}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">{student.email}</span>
                    </div>
                    {student.phone && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{student.phone}</span>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" />}>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toast.info("Tahrirlash oynasi")}>
                        <Edit className="h-4 w-4 mr-2" /> Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => toast.error("O'chirish tasdiqlandi")}>
                        <Trash2 className="h-4 w-4 mr-2" /> O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>🔥 {student.streak || 0} kun</span>
                    <span>⭐ {student.totalScore || 0} ball</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      student.isActive
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-gray-50 text-gray-500"
                    )}
                  >
                    {student.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <UserCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Student topilmadi</p>
            <p className="text-sm">Qidiruv filtrlarini o'zgartiring</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
