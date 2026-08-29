import { useEffect, useState } from "react";
import type { Document } from "../types/document";
import { getDocuments } from "../services/documentService";
import { ArrowUp, ArrowDown } from "lucide-react";

type SortKey = "expiryDate" | "updatedAt";
const categoryLabels: Record<Document["category"], string> = {
  "employee-documentation": "Dokumentace k zaměstnancům",
  bozp: "BOZP",
  po: "Požární ochrana",
  "internal-regulations": "Vnitřní předpisy",
  other: "Ostatní",
};

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Nepodařilo se načíst Dokumenty:", error);
        setError("Dokumenty se nepodařilo načíst.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDocuments();
  }, []);

  if (isLoading) {
    return <p>Načítám dokumenty...</p>;
  }

  if (error !== null) {
    return <p>{error}</p>;
  }

  if (documents.length === 0) {
    return <p>Zatím nejsou evidovány žádné dokumenty.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">Dokumenty</h2>
        <p className="mt-1 text-sm text-gray-500">
          Přehled evidovaných dokumentů
        </p>
      </div>
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
                  <span className="inline-flex rounded-full bg-gray-100  py-1 text-xs font-medium text-gray-700">
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

export default Documents;
