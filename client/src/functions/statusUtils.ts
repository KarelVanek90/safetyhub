import type { ValidityStatus } from "../types/validityStatus";
type ValidityStatusLabel = "Platné" | "Končí" | "Propadlé";
export const getValidityStatusLabel = (
  status: ValidityStatus,
): ValidityStatusLabel => {
  if (status === "valid") return "Platné";
  if (status === "expiring") return "Končí";
  return "Propadlé";
};

export const getValidityStatusStyles = (status: ValidityStatus): string => {
  if (status === "valid") return "bg-green-100 text-green-600";
  if (status === "expiring") return "bg-orange-100 text-orange-600";
  return "bg-red-100 text-red-600";
};
