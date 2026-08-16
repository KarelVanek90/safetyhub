import { useState } from "react";
import type { EmployeeFormData } from "../types/employee";
import EmployeeFormFields from "./EmployeeFormFields";

type EditEmployeeFormProps = {
  employee: EmployeeFormData;
  isSaving: boolean;
  saveError: string | null;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
};

const EditEmployeeForm = ({
  employee,
  isSaving,
  saveError,
  onSubmit,
  onCancel,
}: EditEmployeeFormProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>(employee);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <EmployeeFormFields formData={formData} setFormData={setFormData} />
        {saveError && <p className="mt-4 text-sm text-red-600">{saveError}</p>}
        <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Zrušit
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Ukládám..." : "Uložit změny"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
