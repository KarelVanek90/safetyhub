import type { LucideIcon } from "lucide-react";
import { Wrench, HeartPulse, GraduationCap } from "lucide-react";

type Event = {
  id: number;
  title: string;
  category: string;
  date: string;
  daysLeft: number;
  icon: LucideIcon;
};

const UpcomingEvents = () => {
  const events: Event[] = [
    {
      id: 1,
      title: "Jan Novák",
      category: "Lékařská prohlídka",
      date: "25. 5. 2024",
      daysLeft: 14,
      icon: HeartPulse,
    },
    {
      id: 2,
      title: "Petr Svoboba",
      category: "BOZP školení končí",
      date: "31. 5. 2024",
      daysLeft: 20,
      icon: GraduationCap,
    },
    {
      id: 3,
      title: "Hydraulický lis č. 3",
      category: "Revize",
      date: "10. 5. 2024",
      daysLeft: 10,
      icon: Wrench,
    },
    {
      id: 4,
      title: "Jana Horáková",
      category: "Lékařská prohlídka",
      date: "5. 6. 2024",
      daysLeft: 25,
      icon: HeartPulse,
    },
    {
      id: 5,
      title: "Žebřík AL 3,5m",
      category: "Revize",
      date: "1. 6. 2024",
      daysLeft: 24,
      icon: Wrench,
    },
  ];

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
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div
              key={event.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Icon className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">{event.title}</p>

                  <p className="text-sm text-gray-500">
                    {event.category} za {event.daysLeft} dní
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
