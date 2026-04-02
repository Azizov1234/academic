"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MoreVertical } from "lucide-react";

export default function AdminMentorsPage() {
  const users = [
    { name: "Sardor Alimov", email: "sardor@example.com", phone: "+998 90 123 45 67", role: "Mentor" },
    { name: "Malika Yusupova", email: "malika@example.com", phone: "+998 90 765 43 21", role: "Mentor" },
    { name: "Aziz Rakhimov", email: "aziz@example.com", phone: "+998 99 987 65 43", role: "Mentor" }
  ];

  return (
    <DashboardLayout title="Mentors">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Barcha Mentors</CardTitle>
            <Button>Yangi Qo'shish</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((u, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{u.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {u.email}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {u.phone}</span>
                    </div>
                  </div>
                </div>
                <div><Badge variant="outline">{u.role}</Badge></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}