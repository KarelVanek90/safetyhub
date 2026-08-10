import EmployeesSection from "../components/EmployeesSection";
import { getEmployees } from "../services/employeesService";
import type { Employee } from "../types/employee";

import { useEffect, useState } from "react";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Nepodařilo se načíst zaměstnance:", error);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div>
      <EmployeesSection
        showAddEmployee
        employees={employees}
        onEmployeeAdded={loadEmployees}
      />
    </div>
  );
};

export default Employees;
