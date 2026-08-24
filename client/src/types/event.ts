import type { LucideIcon } from "lucide-react";
import type { EmployeeMedicalExamStatus } from "./medicalExamStatus";

export type Event = {
  id: string;
  title: string;
  category: string;
  date: Date | null;
  status: EmployeeMedicalExamStatus;
  daysLeft: number | null;
  icon: LucideIcon;
};
