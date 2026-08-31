import { useState } from "react";
import type { DocumentFormData } from "../types/document";
import type { Employee } from "../types/employee";
import DocumentFormFields from "./DocumentFormFields";
import { createDocument } from "../services/documentService";
type AddDocumentFormProps = {
  onDocumentAdded: () => void;
  employees: Employee[];
  onClose: () => void;
};

const AddDocumentForm = ({
  onDocumentAdded,
  employees,
  onClose,
}: AddDocumentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>({
    title: "",
    category: "bozp",
    employeeId: "",
    issueDate: "",
    expiryDate: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
    };

    if (dataToSend.employeeId === "") {
      delete dataToSend.employeeId;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await createDocument(dataToSend);
      onDocumentAdded();
      onClose();
    } catch (error) {
      console.error("Dokument se nepodařilo vytvořit:", error);
      setError("Dokument se nepodařilo vytvořit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Přidat dokument
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Vyplňte údaje nového dokumentu
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Zavřít
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <DocumentFormFields
          employees={employees}
          formData={formData}
          setFormData={setFormData}
        />

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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Ukládám..." : "Přidat dokument"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDocumentForm;
