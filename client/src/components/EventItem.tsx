import { getDayLabel } from "../function/dateUtils";
import type { Event } from "../types/event";

type EventItemProps = {
  event: Event;
};
type DataValidity = "Platné" | "Končí" | "Propadlé" | "Nelze určit";

const getDataValidity = (status: Event["status"]): DataValidity => {
  if (status === "valid") return "Platné";
  if (status === "expiring") return "Končí";
  if (status === "expired") return "Propadlé";
  return "Nelze určit";
};

const getDataValidityStyles = (status: Event["status"]): string => {
  if (status === "valid") return "bg-green-100 text-green-600";
  if (status === "expiring") return "bg-orange-100 text-orange-600";
  if (status === "expired") return "bg-red-100 text-red-600";
  return "bg-gray-100 text-gray-600";
};

const EventItem = ({ event }: EventItemProps) => {
  const Icon = event.icon;
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Icon className="text-blue-600" size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{event.title}</p>

            <p
              className={`text-sm px-2 py-0.5 rounded-full w-fit ${getDataValidityStyles(event.status)}`}
            >
              {getDataValidity(event.status)}
            </p>
          </div>

          {event.daysLeft !== null && (
            <p className="text-sm text-gray-500">
              {event.category} končí za {event.daysLeft}{" "}
              {getDayLabel(event.daysLeft)}
            </p>
          )}
        </div>
      </div>
      {event.date && (
        <p className="text-sm text-gray-500">
          {event.date.toLocaleDateString("cs-CZ")}
        </p>
      )}
    </div>
  );
};

export default EventItem;
