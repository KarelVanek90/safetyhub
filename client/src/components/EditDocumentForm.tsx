import { useState } from "react";
import type { DocumentFormData } from "../types/document";
import DocumentFormFields from "./DocumentFormFields";
import type { Employee } from "../types/employee";

type EditDocumentFormProps = {
  document: DocumentFormData;
  employees: Employee[];
  isSaving: boolean;
  saveError: string | null;
  onSubmit: (data: DocumentFormData) => Promise<void>;
  onCancel: () => void;
};

const EditDocumentForm = ({
  document,
  employees,
  onSubmit,
  isSaving,
  saveError,
  onCancel,
}: EditDocumentFormProps) => {
  const [formData, setFormData] = useState<DocumentFormData>(document);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit}>
        <DocumentFormFields
          formData={formData}
          setFormData={setFormData}
          employees={employees}
        />
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
            disabled={isSaving}
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Ukládám..." : "Uložit změny"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocumentForm;
