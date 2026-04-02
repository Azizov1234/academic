import { Level, SkillType } from "./types";

export function getLevelColor(level: Level): string {
  const colors: Record<Level, string> = {
    A1: "badge-a1",
    A2: "badge-a2",
    B1: "badge-b1",
    B2: "badge-b2",
    C1: "badge-c1",
    C2: "badge-c2",
  };
  return colors[level];
}

export function getLevelBgColor(level: Level): string {
  const colors: Record<Level, string> = {
    A1: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    A2: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
    B1: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    B2: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    C1: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    C2: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  };
  return colors[level];
}

export function getSkillColor(skill: SkillType): string {
  const colors: Record<SkillType, string> = {
    reading: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    listening: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
    writing: "text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400",
    speaking: "text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400",
    vocabulary: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    grammar: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400",
  };
  return colors[skill];
}

export function getSkillIcon(skill: SkillType): string {
  const icons: Record<SkillType, string> = {
    reading: "📖",
    listening: "🎧",
    writing: "✍️",
    speaking: "🎤",
    vocabulary: "📝",
    grammar: "🔤",
  };
  return icons[skill];
}

export function getSkillLabel(skill: SkillType): string {
  const labels: Record<SkillType, string> = {
    reading: "Reading",
    listening: "Listening",
    writing: "Writing",
    speaking: "Speaking",
    vocabulary: "Vocabulary",
    grammar: "Grammar",
  };
  return labels[skill];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("uz-UZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Hozir";
  if (minutes < 60) return `${minutes} daqiqa oldin`;
  if (hours < 24) return `${hours} soat oldin`;
  if (days < 7) return `${days} kun oldin`;
  return formatDate(dateStr);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    partial: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    present: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    absent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    excused: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    submitted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    graded: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    healthy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    degraded: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    down: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    paid: "To'landi",
    unpaid: "To'lanmadi",
    partial: "Qisman",
    present: "Qatnashdi",
    absent: "Kelmadi",
    late: "Kech keldi",
    excused: "Uzrli",
    submitted: "Topshirildi",
    graded: "Baholandi",
    pending: "Kutilmoqda",
    healthy: "Ishlayapti",
    degraded: "Muammo bor",
    down: "Ishlamayapti",
  };
  return labels[status] || status;
}

export function getScoreColor(score: number, maxScore: number = 100): string {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 90) return "text-green-600 dark:text-green-400";
  if (percentage >= 70) return "text-blue-600 dark:text-blue-400";
  if (percentage >= 50) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function isDeadlineNear(deadline: string): boolean {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000; // 24 hours
}

export function isOverdue(deadline: string): boolean {
  return new Date(deadline) < new Date();
}
