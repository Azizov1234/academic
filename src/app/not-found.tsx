"use client";

import { useEffect } from "react";
import { useLoggerStore } from "@/lib/logger-store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { logWarning } = useLoggerStore();
  const pathname = usePathname();

  useEffect(() => {
    logWarning(
      `404 Sahifa topilmadi: ${pathname}`,
      "System",
      `Foydalanuvchi mavjud bo'lmagan marshrutga o'tishga urindi: ${pathname}`
    );
  }, [pathname, logWarning]);

  return (
    <div className="flex bg-background h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-primary opacity-20 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Sahifa topilmadi</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas. Manzilni xato kiritgan bo'lishingiz mumkin.
      </p>
      <Button render={<Link href="/" />}>Bosh sahifaga qaytish</Button>
    </div>
  );
}
