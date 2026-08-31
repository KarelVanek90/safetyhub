import { useState } from "react";
import type { Document } from "../types/document";
import type { Employee } from "../types/employee";
import AddDocumentForm from "./AddDocumentForm";
import DocumentsTable from "./DocumentsTable";

type DocumentsSectionProps = {
  documents: Document[];
  employees: Employee[];
  onDocumentAdded: () => void;
};

const DocumentsSection = ({
  documents,
  employees,
  onDocumentAdded,
}: DocumentsSectionProps) => {
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  return (
    <div>
      <div className="flex w-full flex-col items-start gap-3 px-6 pt-6 mb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Dokumenty</h2>

          <p className="mt-1 text-sm text-gray-500">
            Přehled evidovaných dokumentů
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsAddDocumentOpen(true)}
            className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:bg-blue-700
            transition-colors
          "
          >
            + Přidat dokument
          </button>
        </div>
      </div>

      {isAddDocumentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl">
            <AddDocumentForm
              employees={employees}
              onDocumentAdded={onDocumentAdded}
              onClose={() => setIsAddDocumentOpen(false)}
            />
          </div>
        </div>
      )}

      <DocumentsTable documents={documents} />
    </div>
  );
};

export default DocumentsSection;
