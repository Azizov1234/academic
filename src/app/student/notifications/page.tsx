"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function StudentNotificationsPage() {
  return (
    <DashboardLayout title="Bildirishnomalar">
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Tizim xabari #{i}</h4>
                <p className="text-sm text-muted-foreground">Siz uchun yangi imkoniyatlar qo'shildi. Iltimos barcha o'zgarishlarni ko'zdan kechiring.</p>
                <div className="text-xs text-muted-foreground mt-2">Bugun, 14:00</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}