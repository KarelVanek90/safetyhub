import type { EmployeeMedicalExamStatus } from "../types/medicalExamStatus";
type MedicalExamStatusLabel =
  | "Platné"
  | "Končí"
  | "Propadlé"
  | "Není stanovena";

export const getMedicalExamStatusLabel = (
  status: EmployeeMedicalExamStatus,
): MedicalExamStatusLabel => {
  if (status === "valid") return "Platné";
  if (status === "expiring") return "Končí";
  if (status === "expired") return "Propadlé";
  return "Není stanovena";
};

export const getMedicalExamStatusStyles = (
  status: EmployeeMedicalExamStatus,
): string => {
  if (status === "valid") return "bg-green-100 text-green-600";
  if (status === "expiring") return "bg-orange-100 text-orange-600";
  if (status === "expired") return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
};
