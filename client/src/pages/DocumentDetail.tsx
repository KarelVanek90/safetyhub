import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Document, DocumentCategory } from "../types/document";
import { getDocumentById } from "../services/documentService";

const categoryLabels: Record<DocumentCategory, string> = {
  "employee-documentation": "Dokumentace k zaměstnancům",
  bozp: "BOZP",
  po: "Požární ochrana",
  "internal-regulations": "Vnitřní předpisy",
  other: "Ostatní",
};

const DocumentDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<Document | null>(null);
  useEffect(() => {
    const loadDocument = async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getDocumentById(id);
        setDocument(data);
      } catch (error) {
        console.error("Nepodařilo se načíst dokument:", error);
        setDocument(null);
        setError("Dokument se nepodařilo načíst.");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) loadDocument(id);
  }, [id]);

  if (typeof id === "undefined") return <div>Neplatné ID dokumentu</div>;
  if (isLoading) return <p>Právě teď čekám na odpověď serveru</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!document) return <p>Dokument nebyl nalezen.</p>;
  return (
    <div className="space-y-6">
      <Link
        to="/documents"
        className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na dokumenty
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Detail dokumentu
      </h1>
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

          <p className="mt-1 text-sm text-gray-900">{document.note ?? "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
