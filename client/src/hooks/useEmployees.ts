import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeesService";
import type { Employee } from "../types/employee";

const useEmployees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Nepodařilo se načíst zaměstnance:", error);
      setError("Zaměstnance se nepodařilo načíst.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadEmployees();
  }, []);
  return { employees, error, isLoading, loadEmployees };
};
export default useEmployees;
