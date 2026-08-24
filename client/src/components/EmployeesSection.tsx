import { Link } from "react-router-dom";
import EmployeesTable from "./EmployeesTable";
import type { Employee } from "../types/employee";
import { useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import { Search } from "lucide-react";
import { normalizeSearchText } from "../function/textUtils";

type EmployeesSectionProps = {
  employees: Employee[];
  showViewAll?: boolean;
  showAddEmployee?: boolean;
  onEmployeeAdded: () => void;
};

const EmployeesSection = ({
  employees,
  showViewAll,
  showAddEmployee,
  onEmployeeAdded,
}: EmployeesSectionProps) => {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = normalizeSearchText(searchTerm);

  const filteredEmployees = employees.filter((employee) => {
    const findEmployeeName = normalizeSearchText(employee.name);
    const findEmployeePosition = normalizeSearchText(employee.position);
    return (
      findEmployeeName.includes(normalizedSearchTerm) ||
      findEmployeePosition.includes(normalizedSearchTerm)
    );
  });

  return (
    <div>
      <div className="flex w-full flex-col items-start gap-3 px-6 pt-6 mb-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Zaměstnanci</h2>
        {isAddEmployeeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-2xl">
              <AddEmployeeForm
                onEmployeeAdded={onEmployeeAdded}
                onClose={() => setIsAddEmployeeOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Hledat zaměstnance..."
              className="h-10 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {showViewAll && (
            <Link
              to="/employees"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Zobrazit vše
            </Link>
          )}
          {showAddEmployee && (
            <button
              className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-blue-700
              transition-colors
              "
              onClick={() => setIsAddEmployeeOpen(true)}
            >
              + Přidat zaměstnance
            </button>
          )}
        </div>
      </div>
      <EmployeesTable employees={filteredEmployees} />
    </div>
  );
};

export default EmployeesSection;
