"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCard,
  Search,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Send,
  Filter,
} from "lucide-react";
import { mockPayments } from "@/lib/mock-data";
import { Payment, PaymentStatus } from "@/lib/types";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STATUS_ICONS: Record<PaymentStatus, React.ReactNode> = {
  paid: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  unpaid: <XCircle className="h-4 w-4 text-red-500" />,
  partial: <Clock className="h-4 w-4 text-amber-500" />,
};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [monthFilter, setMonthFilter] = useState<string>("2025-02");
  const [openDialog, setOpenDialog] = useState(false);

  const filtered = payments.filter((p) => {
    const matchSearch =
      (p.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.groupName || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchMonth = !monthFilter || p.month === monthFilter;
    return matchSearch && matchStatus && matchMonth;
  });

  const totalPaid = filtered.filter(p => p.status === "paid").reduce((a, b) => a + b.amount, 0);
  const totalUnpaid = filtered.filter(p => p.status !== "paid").reduce((a, b) => a + b.amount, 0);

  function changeStatus(id: string, status: PaymentStatus) {
    setPayments(prev =>
      prev.map(p => p.id === id ? {
        ...p, status,
        paidDate: status === "paid" ? new Date().toISOString().split("T")[0] : undefined
      } : p)
    );
    toast.success(`To'lov holati yangilandi: ${getStatusLabel(status)}`);
  }

  return (
    <DashboardLayout title="To'lovlar">
      <div className="space-y-5">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-green-200 dark:border-green-900/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">To'langan</div>
                  <div className="text-xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
                  <div className="text-xs text-muted-foreground">{filtered.filter(p => p.status === "paid").length} ta</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200 dark:border-red-900/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">To'lanmagan</div>
                  <div className="text-xl font-bold text-red-600">{formatCurrency(totalUnpaid)}</div>
                  <div className="text-xs text-muted-foreground">{filtered.filter(p => p.status !== "paid").length} ta</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Jami</div>
                  <div className="text-xl font-bold">{formatCurrency(totalPaid + totalUnpaid)}</div>
                  <div className="text-xs text-muted-foreground">{filtered.length} ta to'lov</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 flex-1">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Student yoki guruh..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Input type="month" value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className="w-40" />
            <Select value={statusFilter} onValueChange={(val) => { if(val) setStatusFilter(val) }}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Holat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="paid">To'langan</SelectItem>
                <SelectItem value="unpaid">To'lanmagan</SelectItem>
                <SelectItem value="partial">Qisman</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Excel yuklanmoqda...")}>
              <Download className="h-4 w-4" /> Excel
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Eslatma yuborildi")}>
              <Send className="h-4 w-4" /> Eslatma
            </Button>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger render={<Button size="sm" className="gap-2" />}><Plus className="h-4 w-4" />Qo'shish</DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle>To'lov Qo'shish</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label>Student</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Tanlang" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="s1">Malika Rahimova</SelectItem>
                        <SelectItem value="s2">Bobur Xoliqov</SelectItem>
                        <SelectItem value="s7">Feruza Rashidova</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label>Miqdor (so'm)</Label>
                      <Input type="number" placeholder="800000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Oy</Label>
                      <Input type="month" defaultValue="2025-02" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Holat</Label>
                    <Select defaultValue="paid">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">To'landi</SelectItem>
                        <SelectItem value="unpaid">To'lanmadi</SelectItem>
                        <SelectItem value="partial">Qisman to'landi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Izoh</Label>
                    <Textarea placeholder="Ixtiyoriy izoh..." rows={2} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => { toast.success("To'lov qo'shildi!"); setOpenDialog(false); }}>Saqlash</Button>
                    <Button variant="outline" onClick={() => setOpenDialog(false)}>Bekor</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Guruh</TableHead>
                    <TableHead>Oy</TableHead>
                    <TableHead className="text-right">Miqdor</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead>To'langan sana</TableHead>
                    <TableHead>Amal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((payment) => (
                    <TableRow key={payment.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{payment.studentName}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{payment.groupName}</TableCell>
                      <TableCell className="text-sm">{payment.month}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {STATUS_ICONS[payment.status]}
                          <Badge className={cn("text-[10px]", getStatusColor(payment.status))}>
                            {getStatusLabel(payment.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {payment.paidDate || "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {payment.status !== "paid" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs text-green-700 border-green-200 hover:bg-green-50"
                              onClick={() => changeStatus(payment.id, "paid")}
                            >
                              To'landi
                            </Button>
                          )}
                          {payment.status === "paid" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 text-xs text-muted-foreground"
                              onClick={() => changeStatus(payment.id, "unpaid")}
                            >
                              Bekor
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
