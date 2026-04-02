import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  gradient?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-primary",
  trend,
  gradient,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "p-6 relative overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      {gradient && (
        <div
          className={cn(
            "absolute inset-0 opacity-5",
            gradient
          )}
        />
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend.positive !== false ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.positive !== false ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
            gradient || "bg-primary/10"
          )}
        >
          <Icon className={cn("h-6 w-6", gradient ? "text-white" : iconColor)} />
        </div>
      </div>
    </Card>
  );
}
