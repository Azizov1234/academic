"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils-helpers";
import { Check, X, Clock, Save, FileSpreadsheet, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  status: "present" | "absent" | "late";
  phone: string;
}

export default function MentorAttendancePage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("GRP-101");
  const [students, setStudents] = useState<Student[]>([
    { id: "STU-001", name: "Dilshod Rahimov", status: "present", phone: "+998 90 123 45 67" },
    { id: "STU-002", name: "Malika Azimova", status: "present", phone: "+998 90 987 65 43" },
    { id: "STU-003", name: "Aziz Murodov", status: "late", phone: "+998 99 111 22 33" },
    { id: "STU-004", name: "Nigora Umarova", status: "absent", phone: "+998 97 444 55 66" },
    { id: "STU-005", name: "Sardor Yo'ldoshev", status: "present", phone: "+998 93 777 88 99" },
    { id: "STU-006", name: "Zuhra Aliyeva", status: "present", phone: "+998 90 222 33 44" },
  ]);

  const updateStatus = (id: string, newStatus: Student["status"]) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const saveAttendance = () => {
    toast.success("Davomat saqlandi!");
  };

  return (
    <DashboardLayout title="Davomat Jurnali">
      <div className="space-y-6">
        
        {/* Controls */}
        <Card>
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select value={selectedGroup} onValueChange={(val) => { if(val) setSelectedGroup(val) }}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Guruhni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GRP-101">General English Upper-Int</SelectItem>
                  <SelectItem value="GRP-102">CEFR Preparation C1</SelectItem>
                  <SelectItem value="GRP-103">IELTS Foundation</SelectItem>
                </SelectContent>
              </Select>

              {/* Date is mocked to Today for Mentor simplicity */}
              <div className="px-4 py-2 bg-muted/50 rounded-lg border text-sm font-medium flex items-center justify-center">
                📆 Bugun: {new Date().toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" /> Export
              </Button>
              <Button onClick={saveAttendance} className="gap-2">
                <Save className="h-4 w-4" /> Saqlash
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Jami o'quvchilar</div>
                <div className="text-2xl font-bold">{students.length} ta</div>
              </div>
              <Users className="h-8 w-8 text-blue-500 opacity-20" />
            </CardContent>
          </Card>
          <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">Kelganlar</div>
                <div className="text-2xl font-bold">{students.filter(s => s.status === 'present' || s.status === 'late').length} ta</div>
              </div>
              <Check className="h-8 w-8 text-green-500 opacity-20" />
            </CardContent>
          </Card>
          <Card className="bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-red-600 dark:text-red-400">Kelmaganlar</div>
                <div className="text-2xl font-bold">{students.filter(s => s.status === 'absent').length} ta</div>
              </div>
              <X className="h-8 w-8 text-red-500 opacity-20" />
            </CardContent>
          </Card>
        </div>

        {/* Attendance List */}
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-medium border-b">
                <tr>
                  <th className="px-6 py-4">O'quvchi</th>
                  <th className="px-6 py-4 text-center">Sababsiz (YQ)</th>
                  <th className="px-6 py-4 text-center">Kechikkan (K)</th>
                  <th className="px-6 py-4 text-center">Kelgan (+)</th>
                  <th className="px-6 py-4">Status holati</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarFallback className="bg-transparent">{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-foreground">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Button 
                          variant={student.status === "absent" ? "destructive" : "outline"} 
                          size="icon-sm"
                          className={cn("rounded-full", student.status !== "absent" && "hover:bg-red-50 hover:text-red-600 border-dashed")}
                          onClick={() => updateStatus(student.id, "absent")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="icon-sm"
                          className={cn("rounded-full", 
                            student.status === "late" ? "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30" : "hover:bg-yellow-50 hover:text-yellow-600 border-dashed"
                          )}
                          onClick={() => updateStatus(student.id, "late")}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Button 
                          variant="outline" 
                          size="icon-sm"
                          className={cn("rounded-full", 
                            student.status === "present" ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30" : "hover:bg-green-50 hover:text-green-600 border-dashed"
                          )}
                          onClick={() => updateStatus(student.id, "present")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {student.status === "present" && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">Darsda qatnashyapti</span>}
                        {student.status === "late" && <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Darsga kechikdi</span>}
                        {student.status === "absent" && <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">Darsga kelmadi</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
