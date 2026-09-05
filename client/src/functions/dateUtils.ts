import type { ValidityStatus } from "../types/validityStatus";

type RemainingDays = number;
type DayLabel = "den" | "dny" | "dnů";
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

export const getRemainingDays = (date: Date): RemainingDays => {
  const referenceDate = new Date(date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  referenceDate.setHours(0, 0, 0, 0);

  const remainingDays =
    (referenceDate.getTime() - today.getTime()) / MILLISECONDS_PER_DAY;
  return remainingDays;
};

export const getDayLabel = (days: number): DayLabel => {
  if (days === 1) return "den";
  if (days > 1 && days < 5) return "dny";
  return "dnů";
};

export const getValidityStatus = (date: Date): ValidityStatus => {
  const referenceDate = new Date(date.getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  referenceDate.setHours(0, 0, 0, 0);
  const thirtyDaysFromToday = new Date(today.getTime());
  thirtyDaysFromToday.setDate(today.getDate() + 30);
  if (referenceDate < today) return "expired";
  if (referenceDate <= thirtyDaysFromToday) return "expiring";
  return "valid";
};
