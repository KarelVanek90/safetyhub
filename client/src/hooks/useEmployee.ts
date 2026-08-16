import { useEffect, useState } from "react";
import { getEmployeeById } from "../services/employeesService";
import type { Employee } from "../types/employee";

const useEmployee = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const loadEmployee = async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Nepodařilo se načíst zaměstnance:", error);
        setEmployee(null);
        setError("Zaměstnance se nepodařilo načíst.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadEmployee(id);
  }, [id]);
  return { employee, error, isLoading };
};
export default useEmployee;
