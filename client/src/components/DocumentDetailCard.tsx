import type { Document, DocumentCategory } from "../types/document";
import type { DocumentStatus } from "../types/documentStatus";
import { getValidityStatus } from "../functions/dateUtils";
import {
  getValidityStatusLabel,
  getValidityStatusStyles,
} from "../functions/statusUtils";

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
  const status: DocumentStatus = document.expiryDate
    ? getValidityStatus(new Date(document.expiryDate))
    : "no-expiry";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>

        <p className="mt-1 text-sm text-gray-500">
          {categoryLabels[document.category]}
        </p>
      </div>

      {/* Základní informace */}
      <div className="pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Základní informace
        </h2>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Přiřazeno</p>
          <p className="mt-1 text-sm text-gray-900">
            {document.employeeId?.name ?? "Firma"}
          </p>
        </div>
      </div>

      {/* Platnost dokumentu */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Platnost dokumentu
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Datum vydání</p>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(document.issueDate).toLocaleDateString("cs-CZ")}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Platnost do</p>
            <p className="mt-1 text-sm text-gray-900">
              {document.expiryDate
                ? new Date(document.expiryDate).toLocaleDateString("cs-CZ")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Stav</p>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                status === "no-expiry"
                  ? "bg-gray-100 text-gray-600"
                  : getValidityStatusStyles(status)
              }`}
            >
              {status === "no-expiry"
                ? "Bez omezení"
                : getValidityStatusLabel(status)}
            </span>
          </div>
        </div>
      </div>

      {/* Poznámka */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">Poznámka</p>
        <p className="mt-1 text-sm text-gray-900">{document.note || "-"}</p>
      </div>
    </div>
  );
};

export default DocumentDetailCard;
