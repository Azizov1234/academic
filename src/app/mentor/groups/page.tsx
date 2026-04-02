"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, MapPin, Target, CalendarDays, MoreHorizontal } from "lucide-react";

export default function MentorGroupsPage() {
  const mentorGroups = [
    {
      id: "GRP-101",
      name: "General English Upper-Int",
      level: "B2",
      students: 14,
      limit: 15,
      schedule: "Du, Chor, Juma",
      time: "15:00 - 17:00",
      room: "Room 4 - Qavat 2",
      status: "Aktiv",
      progress: 65, // percentage
    },
    {
      id: "GRP-102",
      name: "CEFR Preparation",
      level: "C1",
      students: 8,
      limit: 10,
      schedule: "Se, Pay, Shan",
      time: "18:00 - 20:00",
      room: "Room 1 - Qavat 1",
      status: "Aktiv",
      progress: 30, // percentage
    },
    {
      id: "GRP-103",
      name: "IELTS Foundation",
      level: "B1+",
      students: 15,
      limit: 15,
      schedule: "Du, Chor, Juma",
      time: "10:00 - 12:00",
      room: "Room 6 - Qavat 3",
      status: "Aktiv",
      progress: 90, // percentage
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "A1":
      case "A2":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "B1":
      case "B1+":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case "B2":
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400";
      case "C1":
      case "C2":
        return "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout title="Guruhlarim">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Sizga biriktirilgan guruhlar</h2>
            <p className="text-muted-foreground text-sm mt-1">Siz jami {mentorGroups.length} ta guruhga dars bermoqdasiz.</p>
          </div>
          <Button variant="outline">Arxivlanganlar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorGroups.map((group) => (
            <Card key={group.id} className="border-border shadow-sm flex flex-col hover:shadow-md transition-all overflow-hidden group">
              <div className="h-2 w-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all rounded-r-full" style={{ width: `${group.progress}%` }} />
              </div>
              <CardHeader className="p-5 pb-0">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className={getLevelColor(group.level)}>
                    {group.level} Level
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    {group.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-1">{group.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-5 flex-1">
                <div className="space-y-3 mt-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{group.students} / {group.limit} O'quvchilar</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{group.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{group.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{group.room}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 border-t bg-muted/20 flex gap-2">
                <Button className="flex-1 text-xs">Jurnalni Ochish</Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {/* New Group Placeholder */}
          <Card className="border-dashed shadow-none flex flex-col items-center justify-center p-8 bg-muted/10 min-h-[300px]">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">Yangi guruh kutilyapti</h3>
            <p className="text-sm text-muted-foreground text-center max-w-[200px]">Admin tomonidan yangi guruh o'quvchilari sizga biriktirilishi kutilmoqda</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
