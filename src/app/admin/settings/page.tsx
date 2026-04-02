"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout title="Sozlamalar">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shaxsiy Ma'lumotlar</CardTitle>
            <CardDescription>Profil sozlamalari va parolni o'zgartirish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Ism va familiya</Label>
              <Input defaultValue="ADMIN User" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="admin@academy.uz" />
            </div>
            <div className="pt-4 flex justify-end">
              <Button>Saqlash</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}