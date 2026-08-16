import { useState } from "react";
import type { EmployeeFormData } from "../types/employee";
import { createEmployee } from "../services/employeesService";
import EmployeeFormFields from "./EmployeeFormFields";

type AddEmployeeFormProps = {
  onEmployeeAdded: () => void;
  onClose: () => void;
};

const AddEmployeeForm = ({
  onEmployeeAdded,
  onClose,
}: AddEmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    category: 1,
    medicalExamDate: "",
    training: "Platné",
    ppe: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      await createEmployee(formData);

      onEmployeeAdded();
      onClose();
    } catch (error) {
      console.error("Zaměstnance se nepodařilo přidat:", error);
      setError("Zaměstnance se nepodařilo přidat.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Přidat zaměstnance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Vyplňte základní údaje nového zaměstnance.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Zrušit
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <EmployeeFormFields formData={formData} setFormData={setFormData} />

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Zrušit
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Ukládám..." : "Přidat zaměstnance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
