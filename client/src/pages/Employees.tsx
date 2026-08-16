import EmployeesSection from "../components/EmployeesSection";
import useEmployees from "../hooks/useEmployees";

const Employees = () => {
  const { employees, isLoading, error, loadEmployees } = useEmployees();

  if (isLoading) return <p>Právě teď čekám na odpověď serveru</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
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
