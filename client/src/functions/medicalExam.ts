import type { EmployeeMedicalExamStatus } from "../types/medicalExamStatus";
import { getValidityStatus } from "./dateUtils";

type NextMedicalExamDate = Date | null;
type EmployeeMedicalExamInfo = {
  status: EmployeeMedicalExamStatus;
  nextMedicalExamDate: NextMedicalExamDate;
};

const getNextMedicalExamDate = (
  date: string,
  category: number,
): NextMedicalExamDate => {
  const dateInspection = new Date(date);
  if (Number.isNaN(dateInspection.getTime())) {
    return null;
  }
  if (category === 3) {
    const newDate = new Date(dateInspection.getTime());
    newDate.setFullYear(dateInspection.getFullYear() + 2);
    return newDate;
  }
  return null;
};

export const getEmployeeMedicalExamInfo = (
  medicalExamDate: string,
  category: number,
): EmployeeMedicalExamInfo => {
  const nextMedicalExamDate = getNextMedicalExamDate(medicalExamDate, category);
  const status = nextMedicalExamDate
    ? getValidityStatus(nextMedicalExamDate)
    : "unknown";
  return { nextMedicalExamDate, status };
};
