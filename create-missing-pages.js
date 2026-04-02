const fs = require('fs');
const path = require('path');

const roles = ['superadmin', 'admin', 'mentor', 'student'];
const routes = {
  superadmin: ['dashboard', 'centers', 'admins', 'settings', 'logs', 'notifications'],
  admin: ['dashboard', 'students', 'mentors', 'groups', 'courses', 'exams', 'payments', 'attendance', 'reports', 'settings', 'notifications'],
  mentor: ['dashboard', 'groups', 'homework', 'exams', 'attendance', 'settings', 'schedule', 'notifications'],
  student: ['dashboard', 'units', 'homework', 'exams', 'vocabulary', 'progress', 'certificates', 'settings', 'notifications']
};

const baseDir = path.join(__dirname, 'src', 'app');

function createPage(role, route) {
  const dirPath = path.join(baseDir, role, route);
  const filePath = path.join(dirPath, 'page.tsx');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const title = route.charAt(0).toUpperCase() + route.slice(1);
    
    // Notifications and Settings have universal designs usually
    let content = `"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Info, Construct } from "lucide-react";

export default function ${role.charAt(0).toUpperCase() + role.slice(1)}${title}Page() {
  return (
    <DashboardLayout title="${title}">
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
`;
    // Specialized templates
    if (route === 'settings') {
      content = `"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ${role.charAt(0).toUpperCase() + role.slice(1)}SettingsPage() {
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
              <Input defaultValue="${role.toUpperCase()} User" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="${role}@academy.uz" />
            </div>
            <div className="pt-4 flex justify-end">
              <Button>Saqlash</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}`;
    } else if (route === 'notifications') {
      content = `"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function ${role.charAt(0).toUpperCase() + role.slice(1)}NotificationsPage() {
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
}`;
    } else if (route === 'admins' || route === 'mentors') {
      content = `"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, MoreVertical } from "lucide-react";

export default function ${role.charAt(0).toUpperCase() + role.slice(1)}${title}Page() {
  const users = [
    { name: "Sardor Alimov", email: "sardor@example.com", phone: "+998 90 123 45 67", role: "${title.slice(0,-1)}" },
    { name: "Malika Yusupova", email: "malika@example.com", phone: "+998 90 765 43 21", role: "${title.slice(0,-1)}" },
    { name: "Aziz Rakhimov", email: "aziz@example.com", phone: "+998 99 987 65 43", role: "${title.slice(0,-1)}" }
  ];

  return (
    <DashboardLayout title="${title}">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Barcha ${title}</CardTitle>
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
}`;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Created: ', filePath);
  }
}

roles.forEach(role => {
  if (routes[role]) {
    routes[role].forEach(route => createPage(role, route));
  }
});

console.log('Missing pages populated successfully!');
