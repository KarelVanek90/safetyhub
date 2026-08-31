import { useEffect, useState } from "react";
import type { Document } from "../types/document";
import { getDocuments } from "../services/documentService";
import DocumentsSection from "../components/DocumentsSection";
import useEmployees from "../hooks/useEmployees";

const Documents = () => {
  const { employees } = useEmployees();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  useEffect(() => {
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
    <DocumentsSection
      documents={documents}
      employees={employees}
      onDocumentAdded={loadDocuments}
    />
  );
};

export default Documents;
