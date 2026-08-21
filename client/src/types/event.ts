import type { LucideIcon } from "lucide-react";

export type Event = {
  id: string;
  title: string;
  category: string;
  date: Date | null;
  status: "valid" | "expiring" | "expired" | "unknown";
  daysLeft: number | null;
  icon: LucideIcon;
};
