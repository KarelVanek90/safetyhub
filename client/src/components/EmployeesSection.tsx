import { Link } from "react-router-dom";
import EmployeesTable from "./EmployeesTable";
import type { Employee } from "../types/employee";
import { useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";

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
  return (
    <div>
      <div className="flex w-full items-center justify-between px-6 pt-6 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Zamestnanci</h2>
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
          {showViewAll && (
            <Link
              to="/employees"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Zobrazit vse
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
              + Pridat zamestnance
            </button>
          )}
        </div>
      </div>
      <EmployeesTable employees={employees} />
    </div>
  );
};

export default EmployeesSection;
