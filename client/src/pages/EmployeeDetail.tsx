import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeesService";
import EmployeeDetailCard from "../components/EmployeeDetailCard";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (id) loadEmployee(id);
  }, [id]);

  if (typeof id === "undefined") {
    return <div>Neplatné ID zaměstnance</div>;
  }
  if (isLoading) {
    return <p>Právě teď čekám na odpověď serveru</p>;
  }
  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }
  if (!employee) {
    return <p>Zaměstnanec nebyl nalezen.</p>;
  }
  return (
    <div>
      <Link
        to="/employees"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na zaměstnance
      </Link>
      <EmployeeDetailCard employee={employee} />
    </div>
  );
};

export default EmployeeDetail;
