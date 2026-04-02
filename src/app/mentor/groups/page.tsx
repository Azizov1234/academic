"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, Construct } from "lucide-react";

export default function MentorGroupsPage() {
  return (
    <DashboardLayout title="Groups">
      <div className="space-y-6">
        <Card className="border-dashed shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <div className="h-16 w-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Ushbu sahifa hozircha bo'sh</h2>
            <p className="max-w-md">Loyiha doirasida kerakli ma'lumotlar bilan to'ldiriladi. Sahifalar o'rtasida ishlashida muammo bo'lmasligi uchun bu xabarni ko'rmoqdasiz.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
