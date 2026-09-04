import type { Document, DocumentCategory } from "../types/document";

type DocumentDetailCardProps = {
  document: Document;
};
const categoryLabels: Record<DocumentCategory, string> = {
  "employee-documentation": "Dokumentace k zaměstnancům",
  bozp: "BOZP",
  po: "Požární ochrana",
  "internal-regulations": "Vnitřní předpisy",
  other: "Ostatní",
};

const DocumentDetailCard = ({ document }: DocumentDetailCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {categoryLabels[document.category]}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Přiřazeno</p>
          <p className="mt-1 font-medium text-gray-900">
            {document.employeeId?.name ?? "Firma"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Datum vydání</p>
          <p className="mt-1 font-medium text-gray-900">
            {new Date(document.issueDate).toLocaleDateString("cs-CZ")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Platnost do</p>
          <p className="mt-1 font-medium text-gray-900">
            {document.expiryDate
              ? new Date(document.expiryDate).toLocaleDateString("cs-CZ")
              : "-"}
          </p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">Poznámka</p>

        <p className="mt-1 text-sm text-gray-900">{document.note || "-"}</p>
      </div>
    </div>
  );
};

export default DocumentDetailCard;
