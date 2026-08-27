const COLORS = ["#22c55e", "#eab308", "#ef4444"];
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getEmployeesLabel } from "../functions/textUtils";

type ProgressData = {
  id: number;
  title: string;
  percent: number;
};
type ComplianceCardProps = {
  data: ProgressData[];
  unknownStatus: number;
};

const ComplianceCard = ({ data, unknownStatus }: ComplianceCardProps) => {
  const completed = data[0]?.percent ?? 0;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Plnění povinností
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Detailní report
        </button>
      </div>
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <div className="relative h-52 w-52">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="percent"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
              >
                {data.map((item, index) => (
                  <Cell key={item.id} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">
              {completed}%
            </span>

            <span className="text-sm text-gray-500">Celkový stav</span>
          </div>
        </div>

        <div className="w-full sm:flex-1">
          <div className="flex-1 space-y-4">
            {data.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />

                  <span className="text-sm text-gray-700">{item.title}</span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-700">
                Není stanovena:{" "}
              </span>
              {unknownStatus} {getEmployeesLabel(unknownStatus)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCard;
