type MedicalExamStatus = "valid" | "expiring" | "expired";
type NextMedicalExamDate = Date | null;

export const getMedicalExamStatus = (date: Date): MedicalExamStatus => {
  const dateInspection = new Date(date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateInspection.setHours(0, 0, 0, 0);
  const thirtyDaysFromToday = new Date(today.getTime());
  thirtyDaysFromToday.setDate(today.getDate() + 30);
  if (dateInspection < today) return "expired";
  else if (dateInspection <= thirtyDaysFromToday) return "expiring";
  return "valid";
};

export const getNextMedicalExamDate = (
  date: string,
  category: number
): NextMedicalExamDate => {
  const dateInspection = new Date(date);
  if (category === 3) {
    const newDate = new Date(dateInspection.getTime());
    newDate.setFullYear(dateInspection.getFullYear() + 2);
    return newDate;
  }
  return null;
};
