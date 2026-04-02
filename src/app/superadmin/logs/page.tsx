"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Activity, AlertCircle, AlertTriangle, Bug, Terminal, Info, Search, Filter, RefreshCw, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type LogLevel = "INFO" | "WARNING" | "ERROR" | "DEBUG";

interface SystemLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  source: "Auth" | "API" | "Database" | "Payment" | "System";
  message: string;
  details?: string;
  statusCode?: number;
  userId?: string;
  ip?: string;
}

const mockLogs: SystemLog[] = [
  { id: "LOG-001", timestamp: "2025-02-15T08:30:12Z", level: "ERROR", source: "Auth", message: "Failed login attempt: Invalid password", statusCode: 401, ip: "192.168.1.104", details: "User ID: usr_789456, Method: POST /api/auth/login" },
  { id: "LOG-002", timestamp: "2025-02-15T08:31:05Z", level: "INFO", source: "Auth", message: "User successfully authenticated", statusCode: 200, userId: "usr_123456", ip: "10.0.0.5" },
  { id: "LOG-003", timestamp: "2025-02-15T08:35:40Z", level: "WARNING", source: "Database", message: "High latency detected on query execution", details: "Query taking > 2000ms on table 'attendances'", statusCode: 200 },
  { id: "LOG-004", timestamp: "2025-02-15T08:42:10Z", level: "DEBUG", source: "System", message: "Cron job triggered: calculate_weekly_streak" },
  { id: "LOG-005", timestamp: "2025-02-15T08:45:00Z", level: "INFO", source: "Payment", message: "Payment webhook received successfully", statusCode: 200, details: "Provider: Click, Amount: 400000 UZS" },
  { id: "LOG-006", timestamp: "2025-02-15T08:50:22Z", level: "ERROR", source: "Database", message: "Connection pool exhausted", statusCode: 500, details: "Max connections (100) reached. Check unclosed connections." },
  { id: "LOG-007", timestamp: "2025-02-15T09:00:10Z", level: "INFO", source: "API", message: "Homework submitted by student", statusCode: 201, userId: "usr_445566" },
  { id: "LOG-008", timestamp: "2025-02-15T09:05:00Z", level: "WARNING", source: "API", message: "Rate limit approach for IP", ip: "84.54.12.33", details: "90 requests per minute from single origin" },
  { id: "LOG-009", timestamp: "2025-02-15T09:12:33Z", level: "DEBUG", source: "API", message: "Fetching user analytics payload constructed", details: "Size: 45KB, Redis Cache Hit" },
  { id: "LOG-010", timestamp: "2025-02-15T09:20:01Z", level: "ERROR", source: "Payment", message: "S3 Upload failed for receipt PDF", statusCode: 502, details: "Timeout waiting for AWS response" },
  { id: "LOG-011", timestamp: "2025-02-15T09:25:00Z", level: "INFO", source: "System", message: "Daily backup completed successfully", details: "Size: 2.4GB, S3 path: /backups/db/daily/" },
  { id: "LOG-012", timestamp: "2025-02-15T09:30:00Z", level: "INFO", source: "Auth", message: "New mentor account created", userId: "usr_998877" },
];

export default function SuperAdminLogsPage() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [openLogId, setOpenLogId] = useState<string | null>(null);

  const getLevelStyles = (level: LogLevel) => {
    switch (level) {
      case "ERROR": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "WARNING": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "INFO": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "DEBUG": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
      default: return "";
    }
  };

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case "ERROR": return <AlertCircle className="h-4 w-4" />;
      case "WARNING": return <AlertTriangle className="h-4 w-4" />;
      case "INFO": return <Info className="h-4 w-4" />;
      case "DEBUG": return <Bug className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  // Filter Logic
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.id.toLowerCase().includes(search.toLowerCase()) ||
                          log.source.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter;
    const matchesSource = sourceFilter === "ALL" || log.source === sourceFilter;
    
    return matchesSearch && matchesLevel && matchesSource;
  });

  const selectedLog = mockLogs.find(l => l.id === openLogId);

  return (
    <DashboardLayout title="Tizim Loglari">
      <div className="space-y-6">
        
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Barcha Loglar", value: mockLogs.length, icon: Terminal, color: "text-foreground" },
            { label: "Errors", value: mockLogs.filter(l => l.level === "ERROR").length, icon: AlertCircle, color: "text-red-500" },
            { label: "Warnings", value: mockLogs.filter(l => l.level === "WARNING").length, icon: AlertTriangle, color: "text-yellow-500" },
            { label: "Infos", value: mockLogs.filter(l => l.level === "INFO").length, icon: Info, color: "text-blue-500" },
            { label: "Debugs", value: mockLogs.filter(l => l.level === "DEBUG").length, icon: Bug, color: "text-gray-500" },
          ].map((stat, idx) => (
            <Card key={idx} className="bg-card shadow-sm border-border">
              <CardContent className="p-4 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:flex-1">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Xabar yoki ID bo'yicha qidiruv..." 
                    className="pl-9 bg-background"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <Select value={levelFilter} onValueChange={(val) => { if(val) setLevelFilter(val) }}>
                  <SelectTrigger className="w-full sm:w-[150px] bg-background">
                    <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Daraja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Barchasi (Daraja)</SelectItem>
                    <SelectItem value="ERROR">Errors</SelectItem>
                    <SelectItem value="WARNING">Warnings</SelectItem>
                    <SelectItem value="INFO">Infos</SelectItem>
                    <SelectItem value="DEBUG">Debugs</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sourceFilter} onValueChange={(val) => { if(val) setSourceFilter(val) }}>
                  <SelectTrigger className="w-full sm:w-[150px] bg-background">
                    <SelectValue placeholder="Manba" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Barchasi (Manba)</SelectItem>
                    <SelectItem value="Auth">Auth</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => { setSearch(""); setLevelFilter("ALL"); setSourceFilter("ALL"); }}>
                <RefreshCw className="h-4 w-4" /> Tozalamoq
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-border shadow-sm overflow-hidden line-clamp-none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-medium border-b">
                <tr>
                  <th className="px-4 py-3 cursor-pointer hover:text-foreground">Vaqt</th>
                  <th className="px-4 py-3">Daraja</th>
                  <th className="px-4 py-3">Manba</th>
                  <th className="px-4 py-3">Xabar</th>
                  <th className="px-4 py-3 w-16 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map(log => (
                    <Dialog key={log.id} open={openLogId === log.id} onOpenChange={(open) => !open && setOpenLogId(null)}>
                      <DialogTrigger render={
                        <tr 
                          className="hover:bg-muted/30 transition-colors cursor-pointer group"
                          onClick={() => setOpenLogId(log.id)}
                        />
                      }>
                        <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground font-mono">
                          {format(new Date(log.timestamp), "MMM dd, HH:mm:ss")}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border", getLevelStyles(log.level))}>
                            {getLevelIcon(log.level)}
                            {log.level}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-[10px] bg-background">
                            {log.source}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground truncate max-w-[300px] md:max-w-md lg:max-w-lg">
                          {log.message}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </td>
                      </DialogTrigger>

                      {/* Log Details Modal */}
                      <DialogContent className="max-w-2xl font-mono text-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <span className={cn("p-1.5 inline-flex rounded-md border", getLevelStyles(log.level))}>
                              {getLevelIcon(log.level)}
                            </span>
                            Log Details: {log.id}
                          </DialogTitle>
                          <DialogDescription>
                            Detailed information about this system event.
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedLog && (
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground uppercase">Timestamp</div>
                                <div>{format(new Date(selectedLog.timestamp), "yyyy-MM-dd HH:mm:ss 'UTC'")}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground uppercase">Daraja</div>
                                <div><Badge variant="outline" className={getLevelStyles(selectedLog.level)}>{selectedLog.level}</Badge></div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground uppercase">Manba</div>
                                <div>{selectedLog.source}</div>
                              </div>
                              {selectedLog.statusCode && (
                                <div className="space-y-1">
                                  <div className="text-xs text-muted-foreground uppercase">HTTP Status</div>
                                  <div>
                                    <Badge variant="outline" className={cn(
                                      selectedLog.statusCode >= 500 ? "text-red-500 border-red-200" :
                                      selectedLog.statusCode >= 400 ? "text-yellow-600 border-yellow-200" :
                                      "text-green-600 border-green-200"
                                    )}>
                                      {selectedLog.statusCode}
                                    </Badge>
                                  </div>
                                </div>
                              )}
                              {selectedLog.ip && (
                                <div className="space-y-1">
                                  <div className="text-xs text-muted-foreground uppercase">IP Manzil</div>
                                  <div>{selectedLog.ip}</div>
                                </div>
                              )}
                              {selectedLog.userId && (
                                <div className="space-y-1">
                                  <div className="text-xs text-muted-foreground uppercase">User ID</div>
                                  <div className="text-blue-500 hover:underline cursor-pointer">{selectedLog.userId}</div>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-1 pt-2 border-t">
                              <div className="text-xs text-muted-foreground uppercase mb-2 mt-2">Xabar (Message)</div>
                              <div className="p-3 bg-muted rounded-md text-foreground border border-border">
                                {selectedLog.message}
                              </div>
                            </div>
                            
                            {selectedLog.details && (
                              <div className="space-y-1">
                                <div className="text-xs text-muted-foreground uppercase mb-2">Qo'shimcha tafsilotlar (Details / Context)</div>
                                <pre className="p-3 bg-zinc-950 dark:bg-zinc-900/50 text-zinc-50 rounded-md overflow-x-auto border border-zinc-800 text-xs">
                                  {selectedLog.details}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="h-8 w-8 mb-2 opacity-20" />
                        <p>Hech qanday log topilmadi</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length > 0 && (
            <div className="p-3 border-t bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
              <div>Jami: {filteredLogs.length} ta natija</div>
              <div className="flex gap-1">
                <Button variant="outline" size="icon-sm" disabled><ChevronRight className="h-4 w-4 rotate-180" /></Button>
                <Button variant="outline" size="icon-sm"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
