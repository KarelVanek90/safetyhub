import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Icon className="text-blue-600" size={28} />
      </div>

      <div>
        <p className="text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold">{value}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
