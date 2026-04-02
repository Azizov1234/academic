"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, Video, MapPin, Search, FileText } from "lucide-react";
import { mockGroups } from "@/lib/mock-data";
import { getLevelBgColor } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function MentorSchedulePage() {
  const mentorGroups = mockGroups.filter((g) => g.mentorName === "Dilnoza Yusupova");

  const todayStr = "Dushanba"; // Mock today

  return (
    <DashboardLayout title="Dars Jadvali">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Mening Darslarim</h2>
            <p className="text-sm text-muted-foreground">{mentorGroups.length} ta faol guruh</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Guruh izlash..." className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Bugungi Darslar - {todayStr}
            </h3>
            
            <div className="space-y-3">
              {mentorGroups.map((group) => {
                // Determine if group has class today
                const hasClassToday = group.schedule.days.includes("Dushanba") || group.schedule.days.includes("Du");
                
                return (
                  <Card key={group.id} className={cn(
                    "relative overflow-hidden transition-all hover:shadow-md",
                    hasClassToday ? "border-primary/30" : "opacity-60"
                  )}>
                    {hasClassToday && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    )}
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-bold text-base">{group.name}</h4>
                            <Badge className={cn("text-[10px]", getLevelBgColor(group.level))}>
                              {group.level}
                            </Badge>
                            {hasClassToday && (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                                Bugun
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">{group.courseName}</div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 flex-wrap">
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span className="font-medium text-foreground">{group.schedule.startTime} - {group.schedule.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CalendarIcon className="h-3.5 w-3.5" />
                              <span className="truncate">{group.schedule.days.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{group.schedule.room || "Xona belgilanmagan"}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Users className="h-3.5 w-3.5" />
                              <span>{group.currentStudents} / {group.maxStudents} o'quvchi</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                          <Button size="sm" variant={hasClassToday ? "default" : "outline"} className="flex-1 sm:flex-none w-full sm:w-auto">
                            Darsga kirish
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 sm:flex-none w-full sm:w-auto" render={<Link href={`/admin/attendance`} />}>Davomat</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Actions & Mini Calendar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Tezkor amallar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" render={<Link href="/mentor/homework/create" />}><FileText className="h-4 w-4" /> Vazifa yuklash</Button>
                <Button variant="outline" className="w-full justify-start gap-2" render={<Link href="/mentor/homework" />}><Clock className="h-4 w-4" /> Baholashni boshlash</Button>
                <Button variant="outline" className="w-full justify-start gap-2" render={<Link href="#" />}><Video className="h-4 w-4" /> Onlayn dars yaratish</Button>
              </CardContent>
            </Card>

            <Card className="gradient-primary text-white border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Keyingi Dars</h3>
                  <Clock className="h-5 w-5 text-white/80" />
                </div>
                {mentorGroups.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold mb-1">{mentorGroups[0].schedule.startTime}</div>
                    <div className="text-white/80 font-medium mb-4">{mentorGroups[0].name}</div>
                    <div className="flex items-center gap-2 text-sm bg-white/10 p-2 rounded-lg">
                      <MapPin className="h-4 w-4" /> {mentorGroups[0].schedule.room || "Xona yo'q"}
                    </div>
                  </>
                ) : (
                  <p className="text-white/80">Yaqin orada darsingiz yo'q</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
