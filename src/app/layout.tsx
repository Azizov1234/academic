import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Academy CEFR — English Learning Center CRM",
    template: "%s | Academy CEFR",
  },
  description:
    "Ingliz tili o'quv markazi uchun to'liq CRM tizimi. O'qituvchilar, studentlar va administratorlar uchun zamonaviy platforma.",
  keywords: ["english", "cefr", "learning", "crm", "academy", "education"],
  authors: [{ name: "Academy CEFR" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
