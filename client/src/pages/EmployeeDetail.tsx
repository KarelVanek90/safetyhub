import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteEmployee } from "../services/employeesService";
import EmployeeDetailCard from "../components/EmployeeDetailCard";
import useEmployee from "../hooks/useEmployee";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, error, isLoading } = useEmployee(id);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Skutečně chcete zaměstnance smazat?")) {
      return;
    }
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteEmployee(id);
      navigate("/employees");
    } catch (error) {
      console.error("Zaměstnance se nepodařilo smazat", error);
      setDeleteError("Zaměstnance se nepodařilo smazat.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (typeof id === "undefined") return <div>Neplatné ID zaměstnance</div>;
  if (isLoading) return <p>Právě teď čekám na odpověď serveru</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!employee) return <p>Zaměstnanec nebyl nalezen.</p>;
  return (
    <div>
      <Link
        to="/employees"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na zaměstnance
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Detail zaměstnance
      </h1>
      <EmployeeDetailCard employee={employee} />
      {deleteError && (
        <p className="mt-4 text-sm text-red-600">{deleteError}</p>
      )}
      <div className="mt-6 flex justify-end">
        <Link
          to="edit"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Upravit zaměstnance
        </Link>

        <button
          onClick={() => handleDelete(id)}
          disabled={isDeleting}
          className="ml-3 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Mažu..." : "Smazat zaměstnance"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
