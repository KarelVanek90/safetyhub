import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import type { EmployeeFormData } from "../types/employee";
import { editEmployee } from "../services/employeesService";
import EditEmployeeForm from "../components/EditEmployeeForm";
import useEmployee from "../hooks/useEmployee";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState<string | null>(null);
  const { employee, error, isLoading } = useEmployee(id);
  const [isSaving, setIsSaving] = useState(false);

  if (typeof id === "undefined") return <div>Neplatné ID zaměstnance</div>;
  if (isLoading) return <p>Právě teď čekám na odpověď serveru</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!employee) return <p>Zaměstnanec nebyl nalezen.</p>;

  const handleUpdateEmployee = async (data: EmployeeFormData) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await editEmployee(id, data);
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error("Zaměstnance se nepodařilo aktualizovat:", error);
      setSaveError("Zaměstnance se nepodařilo aktualizovat.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleCancel = () => {
    navigate(`/employees/${id}`);
  };
  return (
    <div>
      <Link
        to={`/employees/${id}`}
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na detail
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Upravit zaměstnance
      </h1>
      <EditEmployeeForm
        employee={employee}
        onSubmit={handleUpdateEmployee}
        isSaving={isSaving}
        saveError={saveError}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditEmployee;
