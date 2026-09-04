import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Document } from "../types/document";
import { getDocumentById } from "../services/documentService";
import DocumentDetailCard from "../components/DocumentDetailCard";

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
    <div>
      <Link
        to="/documents"
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na dokumenty
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Detail dokumentu
      </h1>

      <DocumentDetailCard document={document} />

      <div className="mt-6 flex justify-end">
        <Link
          to="edit"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Upravit dokument
        </Link>
      </div>
    </div>
  );
};

export default DocumentDetail;
