"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, Legend,
} from "recharts";
import { Download, TrendingUp, Users, GraduationCap, BarChart3, FileText } from "lucide-react";
import { mockAdminStats, mockStudentStats, mockGroups } from "@/lib/mock-data";
import { toast } from "sonner";

export default function AdminReportsPage() {
  const stats = mockAdminStats;

  const attendanceData = [
    { name: "IELTS A", present: 85, absent: 10, late: 5 },
    { name: "Beginners B", present: 78, absent: 15, late: 7 },
    { name: "Business C", present: 90, absent: 6, late: 4 },
    { name: "Advanced D", present: 88, absent: 8, late: 4 },
  ];

  const skillsData = [
    { skill: "Reading", score: 78 },
    { skill: "Listening", score: 72 },
    { skill: "Writing", score: 65 },
    { skill: "Speaking", score: 58 },
    { skill: "Vocabulary", score: 83 },
    { skill: "Grammar", score: 76 },
  ];

  const paymentTrend = stats.paymentByMonth.map(p => ({
    month: p.month,
    "To'langan": Math.round(p.paid / 1000000),
    "To'lanmagan": Math.round(p.unpaid / 1000000),
  }));

  return (
    <DashboardLayout title="Hisobotlar">
      <div className="space-y-5">
        {/* Export buttons */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Analytika va Hisobotlar</h2>
            <p className="text-sm text-muted-foreground">Barcha ko'rsatkichlar bir joyda</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("PDF yuklanmoqda...")}>
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Excel yuklanmoqda...")}>
              <FileText className="h-4 w-4" /> Excel
            </Button>
          </div>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Umumiy studentlar", value: stats.totalStudents, icon: GraduationCap, color: "text-blue-600" },
            { label: "Faol guruhlar", value: stats.totalGroups, icon: Users, color: "text-purple-600" },
            { label: "O'rtacha davomat", value: "84%", icon: TrendingUp, color: "text-green-600" },
            { label: "To'lov foizi", value: `${Math.round((stats.paidPayments / (stats.paidPayments + stats.pendingPayments)) * 100)}%`, icon: BarChart3, color: "text-amber-600" },
          ].map((item, i) => (
            <Card key={i}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                  <div>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Attendance by group */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Guruh Davomat (%)</CardTitle>
              <CardDescription>Qatnashish, kelmagan, kech</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={attendanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="present" name="Keldi" fill="#22c55e" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="late" name="Kech" fill="#f59e0b" stackId="a" />
                  <Bar dataKey="absent" name="Kelmadi" fill="#ef4444" stackId="a" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills average */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">O'rtacha Ko'nikma Bali</CardTitle>
              <CardDescription>Barcha guruhlar bo'yicha</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="currentColor" className="opacity-10" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="Ball" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold">To'lov Trendi (mln so'm)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={paymentTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Legend />
                  <Line type="monotone" dataKey="To'langan" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="To'lanmagan" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Group table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Guruh Tahlili</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {["Guruh", "Mentor", "Daraja", "Studentlar", "To'lish", "O'rtacha ball"].map(h => (
                      <th key={h} className="text-left py-2 px-3 font-semibold text-muted-foreground text-xs">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockGroups.map(g => {
                    const fillPct = Math.round(((g.currentStudents || 0) / g.maxStudents) * 100);
                    return (
                      <tr key={g.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-3 px-3 font-medium">{g.name}</td>
                        <td className="py-3 px-3 text-muted-foreground">{g.mentorName}</td>
                        <td className="py-3 px-3">
                          <Badge className="text-[10px]" variant="outline">{g.level}</Badge>
                        </td>
                        <td className="py-3 px-3">{g.currentStudents}/{g.maxStudents}</td>
                        <td className="py-3 px-3">{fillPct}%</td>
                        <td className="py-3 px-3 font-semibold text-primary">
                          {[78, 72, 82, 85][mockGroups.indexOf(g)]}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
