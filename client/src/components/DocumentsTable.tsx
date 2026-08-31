import { useState } from "react";
import type { Document } from "../types/document";
import { ArrowUp, ArrowDown } from "lucide-react";

type DocumentsTableProps = {
  documents: Document[];
};

type SortKey = "expiryDate" | "updatedAt";
const categoryLabels: Record<Document["category"], string> = {
  "employee-documentation": "Dokumentace k zaměstnancům",
  bozp: "BOZP",
  po: "Požární ochrana",
  "internal-regulations": "Vnitřní předpisy",
  other: "Ostatní",
};

const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<SortKey>("expiryDate");
  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      sortDirection === "asc"
        ? setSortDirection("desc")
        : setSortDirection("asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedDocuments = [...documents];
  sortedDocuments.sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (!valueA && !valueB) return 0;
    if (!valueA) return 1;
    if (!valueB) return -1;
    const dateA = new Date(valueA).getTime();
    const dateB = new Date(valueB).getTime();
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full table-fixed text-left">
        <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-500">
          <tr>
            <th className="px-6 py-3">Název</th>
            <th className="px-6 py-3">Kategorie</th>
            <th className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort("expiryDate")}
                className="flex cursor-pointer items-center gap-1 hover:text-gray-900"
              >
                Platnost do
                {sortKey === "expiryDate" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </button>
            </th>
            <th className="px-6 py-3">Přiřazeno</th>
            <th className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort("updatedAt")}
                className="flex cursor-pointer items-center gap-1 hover:text-gray-900"
              >
                Poslední aktualizace
                {sortKey === "updatedAt" &&
                  (sortDirection === "asc" ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  ))}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDocuments.map((document) => {
            return (
              <tr
                key={document._id}
                className="border-t border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {document.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="inline-flex rounded-full bg-gray-100 py-0.5 px-1 text-xs font-medium text-gray-700">
                    {categoryLabels[document.category]}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="whitespace-nowrap">
                    {document.expiryDate
                      ? new Date(document.expiryDate).toLocaleDateString(
                          "cs-CZ",
                        )
                      : "-"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {document.employeeId?.name ?? "Firma"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="whitespace-nowrap">
                    {new Date(document.updatedAt).toLocaleDateString("cs-CZ")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentsTable;
