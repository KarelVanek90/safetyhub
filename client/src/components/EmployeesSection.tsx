import { Link } from "react-router-dom";
import EmployeesTable from "./EmployeesTable";
import type { Employee } from "../types/employee";
import { useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import { Search } from "lucide-react";
import { normalizeSearchText } from "../function/textUtils";
import { getEmployeeMedicalExamInfo } from "../function/medicalExam";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedicalStatus, setSelectedMedicalStatus] = useState("all");

  const filteredEmployees = employees.filter((employee) => {
    const { status: medicalExamStatus } = getEmployeeMedicalExamInfo(
      employee.medicalExamDate,
      employee.category,
    );
    const findEmployeeName = normalizeSearchText(employee.name);
    const findEmployeePosition = normalizeSearchText(employee.position);
    const matchesSearch =
      findEmployeeName.includes(normalizedSearchTerm) ||
      findEmployeePosition.includes(normalizedSearchTerm);
    const matchesCategory =
      selectedCategory === "all" ||
      Number(selectedCategory) === employee.category;
    const matchesMedicalStatus =
      selectedMedicalStatus === "all" ||
      selectedMedicalStatus === medicalExamStatus;
    return matchesSearch && matchesCategory && matchesMedicalStatus;
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
          <select
            value={selectedMedicalStatus}
            onChange={(e) => setSelectedMedicalStatus(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="all">Všechny prohlídky</option>
            <option value="valid">Platné</option>
            <option value="expiring">Končí</option>
            <option value="expired">Propadlé</option>
            <option value="unknown">Není stanovena</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          >
            <option value="all">Všechny kategorie</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>

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
