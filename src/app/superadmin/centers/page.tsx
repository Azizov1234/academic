"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building2, MapPin, Users, Phone, Mail, Plus, Edit, Trash2, Search } from "lucide-react";
import { mockSuperAdminStats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SuperAdminCentersPage() {
  const [centers, setCenters] = useState(mockSuperAdminStats.centerStats);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filtered = centers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="O'quv Markazlar">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Markaz nomi yoki shahar..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger render={<Button className="gap-2" />}><Plus className="h-4 w-4" /> Yangi Markaz</DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Yangi O'quv Markaz Qo'shish</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Texnik Nomi</Label>
                  <Input placeholder="Toshkent Bosh Filial" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Shahar</Label>
                    <Input placeholder="Toshkent" />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefon</Label>
                    <Input placeholder="+998" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Manzil</Label>
                  <Input placeholder="To'liq manzil..." />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Bekor qilish</Button>
                  <Button onClick={() => { toast.success("Markaz qo'shildi!"); setOpenDialog(false); }}>Saqlash</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(center => (
            <Card key={center.id} className="group hover:shadow-md transition-all relative overflow-hidden">
              <div className={cn(
                "absolute top-0 left-0 right-0 h-1",
                center.isActive ? "bg-green-500" : "bg-red-500"
              )} />
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <Badge variant={center.isActive ? "default" : "destructive"} className="text-[10px]">
                    {center.isActive ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-lg leading-tight mb-1">{center.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  {center.city}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-foreground">{center.studentCount}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase mt-0.5">O'quvchilar</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-foreground">{center.mentorCount}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase mt-0.5">Mentorlar</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Edit className="h-3.5 w-3.5" /> Tahrirlash
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
