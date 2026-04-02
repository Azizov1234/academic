"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Award, Download, QrCode, ExternalLink, Star } from "lucide-react";
import { mockCertificates } from "@/lib/mock-data";
import { getLevelBgColor, formatDate } from "@/lib/utils-helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function StudentCertificatesPage() {
  const certs = mockCertificates.filter(c => c.studentId === "s1");

  return (
    <DashboardLayout title="Sertifikatlarim">
      <div className="space-y-5">
        {certs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Trophy className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-semibold mb-2">Hali sertifikat yo'q</h2>
            <p className="text-sm">Unitlarni muvaffaqiyatli tugatib sertifikat oling!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map(cert => (
              <Card key={cert.id} className="overflow-hidden border-amber-200 dark:border-amber-900/30">
                {/* Certificate Visual */}
                <div className="relative h-40 gradient-primary flex flex-col items-center justify-center text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 h-24 w-24 rounded-full border-4 border-white/40" />
                    <div className="absolute bottom-4 right-4 h-16 w-16 rounded-full border-4 border-white/30" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full border-2 border-white/20" />
                  </div>
                  <Trophy className="h-10 w-10 mb-2 text-amber-300" />
                  <div className="text-center z-10">
                    <div className="font-bold text-lg">Sertifikat</div>
                    <div className="text-white/80 text-sm">{cert.courseName}</div>
                  </div>
                  <Badge className={cn(
                    "absolute top-3 right-3 text-xs border-none",
                    "bg-white/20 text-white"
                  )}>
                    {cert.level}
                  </Badge>
                </div>

                <CardContent className="pt-4 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Berilgan sana</span>
                      <span className="font-medium text-foreground">{formatDate(cert.issuedAt)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Tekshirish kodi</span>
                      <span className="font-mono font-medium text-foreground text-[11px]">{cert.verifyCode}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => toast.info("PDF yuklanmoqda...")}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Yuklab olish
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => toast.info("QR kod ko'rsatilmoqda...")}
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      QR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Banner */}
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/30">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-amber-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-sm">Sertifikat qanday olinadi?</div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unit imtihonidan 70%+ ball olsangiz, sertifikat avtomatik ravishda generatsiya qilinadi.
                  Sertifikatda ismingiz, daraja va markaz nomi ko'rsatiladi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
