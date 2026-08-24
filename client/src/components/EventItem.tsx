import { getDayLabel } from "../function/dateUtils";
import {
  getMedicalExamStatusLabel,
  getMedicalExamStatusStyles,
} from "../function/statusUtils";
import type { Event } from "../types/event";

type EventItemProps = {
  event: Event;
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
              className={`text-sm px-2 py-0.5 rounded-full w-fit ${getMedicalExamStatusStyles(event.status)}`}
            >
              {getMedicalExamStatusLabel(event.status)}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            {event.category}{" "}
            {event.daysLeft !== null && (
              <span>
                · končí za {event.daysLeft} {getDayLabel(event.daysLeft)}
              </span>
            )}
          </p>
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
