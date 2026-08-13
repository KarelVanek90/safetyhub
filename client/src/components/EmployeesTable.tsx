import { Check, AlertTriangle, X } from "lucide-react";

import type { Employee } from "../types/employee";
import { useNavigate } from "react-router-dom";

type EmployeesTableProps = {
  employees: Employee[];
};

const trainingConfig = {
  Platné: "bg-green-100 text-green-700",
  Končí: "bg-yellow-100 text-yellow-700",
};

const statusConfig = {
  ok: {
    icon: Check,
    className: "bg-green-100 text-green-600",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-100 text-yellow-600",
  },
  error: {
    icon: X,
    className: "bg-red-100 text-red-600",
  },
};

const EmployeesTable = ({ employees }: EmployeesTableProps) => {
  const navigate = useNavigate();
  const handleOpenDetail = (id: string) => {
    navigate(`/employees/${id}`);
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
          <tr>
            <th className="px-6 py-3">Jméno</th>
            <th className="px-6 py-3">Pozice</th>
            <th className="px-6 py-3">Kategorie práce</th>
            <th className="px-6 py-3">Lékařské prohlídky</th>
            <th className="px-6 py-3">Školení</th>
            <th className="px-6 py-3">OOPP</th>
            <th className="px-6 py-3">Stav</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => {
            const status = statusConfig[employee.status];
            const StatusIcon = status.icon;
            return (
              <tr
                key={employee._id}
                onClick={() => {
                  handleOpenDetail(employee._id);
                }}
                className="border-t border-gray-100 cursor-pointer"
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {employee.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {employee.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {employee.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(employee.medicalExamDate).toLocaleDateString(
                    "cs-CZ",
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${trainingConfig[employee.training]}`}
                  >
                    {employee.training}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      employee.ppe
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.ppe ? "V pořádku" : "Chybí výdej"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${status.className}`}
                  >
                    <StatusIcon size={16} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
