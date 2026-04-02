"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Building2,
  Users,
  GraduationCap,
  Shield,
  TrendingUp,
  Server,
  Database,
  HardDrive,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Globe,
} from "lucide-react";
import { mockSuperAdminStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getStatusColor, getStatusLabel } from "@/lib/utils-helpers";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const stats = mockSuperAdminStats;
  const health = stats.systemHealth;

  const growthData = stats.monthlyGrowth.map((m) => ({
    month: m.month,
    Studentlar: m.students,
    Daromad: Math.round(m.revenue / 1000000),
  }));

  function StatusIcon({ status }: { status: string }) {
    if (status === "healthy") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (status === "degraded") return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  }

  return (
    <DashboardLayout title="Super Admin Paneli">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="O'quv Markazlar"
            value={stats.totalCenters}
            subtitle="Barcha mintaqalar"
            icon={Building2}
            gradient="gradient-primary"
            trend={{ value: 14, label: "o'sish", positive: true }}
          />
          <StatsCard
            title="Jami Studentlar"
            value={stats.totalStudents.toLocaleString()}
            subtitle={`${stats.totalMentors} mentor`}
            icon={GraduationCap}
            gradient="gradient-success"
            trend={{ value: 8, label: "oylik o'sish", positive: true }}
          />
          <StatsCard
            title="Adminlar"
            value={stats.totalAdmins}
            subtitle="Faol markazlar"
            icon={Shield}
            gradient="gradient-purple"
          />
          <StatsCard
            title="Faollik"
            value={`${health.uptime}%`}
            subtitle="Tizim ishlash vaqti"
            icon={Activity}
            gradient="gradient-warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                O'sish Dinamikasi
              </CardTitle>
              <CardDescription>Studentlar soni va daromad (mln so'm)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="studGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} yAxisId="left" />
                  <YAxis tick={{ fontSize: 12 }} yAxisId="right" orientation="right" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area yAxisId="left" type="monotone" dataKey="Studentlar" stroke="#6366f1" fill="url(#studGrad)" strokeWidth={2} />
                  <Area yAxisId="right" type="monotone" dataKey="Daromad" stroke="#22c55e" fill="url(#revGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" />
                Tizim Holati
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Server</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={health.serverStatus} />
                    <span className={cn("text-xs font-medium", getStatusColor(health.serverStatus))}>
                      {getStatusLabel(health.serverStatus)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Ma'lumotlar bazasi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon status={health.dbStatus} />
                    <span className={cn("text-xs font-medium", getStatusColor(health.dbStatus))}>
                      {getStatusLabel(health.dbStatus)}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Saqlash joyi</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {health.storageUsed} / {health.storageTotal} GB
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-primary/20">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${(health.storageUsed / health.storageTotal) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Oxirgi backup:</span>{" "}
                {new Date(health.lastBackup).toLocaleDateString("uz-UZ")}
              </div>

              <Button variant="outline" size="sm" className="w-full" render={<Link href="/superadmin/logs" />}>Batafsil loglari</Button>
            </CardContent>
          </Card>
        </div>

        {/* Centers Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                O'quv Markazlar
              </CardTitle>
              <CardDescription>Barcha filiallar holati</CardDescription>
            </div>
            <Button variant="outline" size="sm" render={<Link href="/superadmin/centers" />}>Barchasi</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground text-xs">Markaz</th>
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground text-xs">Shahar</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground text-xs">Studentlar</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground text-xs">Mentorlar</th>
                    <th className="text-center py-2 px-3 font-semibold text-muted-foreground text-xs">Holat</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.centerStats.map((center) => (
                    <tr key={center.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3 font-medium">{center.name}</td>
                      <td className="py-3 px-3 text-muted-foreground">{center.city}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-semibold">{center.studentCount}</span>
                      </td>
                      <td className="py-3 px-3 text-center text-muted-foreground">{center.mentorCount}</td>
                      <td className="py-3 px-3 text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px]",
                            center.isActive
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                          )}
                        >
                          {center.isActive ? "Faol" : "Nofaol"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
