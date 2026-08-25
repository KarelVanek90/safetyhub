import { HeartPulse } from "lucide-react";
import type { Employee } from "../types/employee";
import { getEmployeeMedicalExamInfo } from "../function/medicalExam";
import { getRemainingDays } from "../function/dateUtils";
import type { Event } from "../types/event";
import EventItem from "./EventItem";
type UpcomingEventsProps = { employees: Employee[] };
const UpcomingEvents = ({ employees }: UpcomingEventsProps) => {
  const medicalEvents: Event[] = employees.map((employee) => {
    const { nextMedicalExamDate, status } = getEmployeeMedicalExamInfo(
      employee.medicalExamDate,
      employee.category
    );
    const remainingDays =
      nextMedicalExamDate && status === "expiring"
        ? getRemainingDays(nextMedicalExamDate)
        : null;
    return {
      id: employee._id,
      title: employee.name,
      category: "Lékařská prohlídka",
      date: nextMedicalExamDate,
      status: status,
      daysLeft: remainingDays,
      icon: HeartPulse,
    };
  });
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Nadcházející události
        </h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Zobrazit vše
        </button>
      </div>
      <div className="space-y-3">
        {medicalEvents.map((event) => {
          return <EventItem key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
};
export default UpcomingEvents;
