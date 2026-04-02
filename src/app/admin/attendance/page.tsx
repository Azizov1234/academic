"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
} from "lucide-react";
import { mockAttendance, mockStudents, mockGroups } from "@/lib/mock-data";
import { AttendanceStatus, Student } from "@/lib/types";
import { getStatusColor, getStatusLabel } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_ICONS: Record<AttendanceStatus, React.ReactNode> = {
  present: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  absent: <XCircle className="h-4 w-4 text-red-500" />,
  late: <Clock className="h-4 w-4 text-amber-500" />,
  excused: <AlertTriangle className="h-4 w-4 text-blue-500" />,
};

export default function AdminAttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState("g1");
  const [selectedDate, setSelectedDate] = useState("2025-02-05");
  const [attendanceState, setAttendanceState] = useState<Record<string, AttendanceStatus>>({
    s1: "present",
    s2: "late",
    s7: "present",
  });

  const groupStudents = mockStudents.filter(s => s.groupIds.includes(selectedGroup));
  const group = mockGroups.find(g => g.id === selectedGroup);

  // Summary stats
  const attending = mockAttendance.filter(a => a.groupId === selectedGroup);
  const summary = groupStudents.map(student => {
    const records = attending.filter(a => a.studentId === student.id);
    const present = records.filter(a => a.status === "present").length;
    const total = records.length;
    return {
      student,
      present,
      absent: records.filter(a => a.status === "absent").length,
      late: records.filter(a => a.status === "late").length,
      excused: records.filter(a => a.status === "excused").length,
      total,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0,
    };
  });

  function markAttendance(studentId: string, status: AttendanceStatus) {
    setAttendanceState(prev => ({ ...prev, [studentId]: status }));
  }

  function saveAttendance() {
    toast.success(`${selectedDate} uchun davomat saqlandi!`);
  }

  return (
    <DashboardLayout title="Davomat">
      <div className="space-y-5">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Select value={selectedGroup} onValueChange={(val) => { if(val) setSelectedGroup(val) }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Guruh tanlang" />
              </SelectTrigger>
              <SelectContent>
                {mockGroups.map(g => (
                  <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-40" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("PDF yuklanmoqda...")}>
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button size="sm" onClick={saveAttendance}>Saqlash</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Mark Attendance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {selectedDate} — Davomat Belgilash
              </CardTitle>
              {group && (
                <p className="text-sm text-muted-foreground">{group.name}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {groupStudents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Bu guruhda student yo'q</p>
                  </div>
                )}
                {groupStudents.map(student => {
                  const status = attendanceState[student.id] || "absent";
                  return (
                    <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                      <div className="flex-1 font-medium text-sm">{student.name}</div>
                      <div className="flex gap-1">
                        {(["present", "absent", "late", "excused"] as AttendanceStatus[]).map(s => (
                          <Button
                            key={s}
                            size="sm"
                            variant={status === s ? "default" : "outline"}
                            className={cn(
                              "h-7 text-[10px] px-2",
                              status === s && s === "present" && "bg-green-600 hover:bg-green-700",
                              status === s && s === "absent" && "bg-red-600 hover:bg-red-700",
                              status === s && s === "late" && "bg-amber-600 hover:bg-amber-700",
                              status === s && s === "excused" && "bg-blue-600 hover:bg-blue-700",
                            )}
                            onClick={() => markAttendance(student.id, s)}
                          >
                            {getStatusLabel(s)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Davomat Xulosasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {summary.map(({ student, present, absent, late, excused, total, percentage }) => (
                <div key={student.id} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate max-w-[140px]">{student.name}</span>
                    <span className={cn(
                      "text-xs font-bold",
                      percentage >= 80 ? "text-green-600" : percentage >= 60 ? "text-amber-600" : "text-red-600"
                    )}>{percentage}%</span>
                  </div>
                  <Progress
                    value={percentage}
                    className={cn(
                      "h-1.5",
                      percentage < 80 && "[&>div]:bg-amber-500",
                      percentage < 60 && "[&>div]:bg-red-500"
                    )}
                  />
                  {total > 0 && (
                    <div className="flex gap-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5"><CheckCircle2 className="h-2.5 w-2.5 text-green-500" />{present}</span>
                      <span className="flex items-center gap-0.5"><XCircle className="h-2.5 w-2.5 text-red-500" />{absent}</span>
                      <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5 text-amber-500" />{late}</span>
                    </div>
                  )}
                  {percentage < 80 && percentage > 0 && (
                    <div className="text-[10px] text-amber-600 flex items-center gap-0.5">
                      <AlertTriangle className="h-2.5 w-2.5" />
                      Davomat past!
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
