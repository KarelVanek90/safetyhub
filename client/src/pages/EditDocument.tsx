import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Document, DocumentFormData } from "../types/document";
import { editDocument, getDocumentById } from "../services/documentService";
import EditDocumentForm from "../components/EditDocumentForm";
import useEmployees from "../hooks/useEmployees";

const EditDocument = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees } = useEmployees();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
  const handleUpdateDocument = async (data: DocumentFormData) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await editDocument(id, data);
      navigate(`/documents/${id}`);
    } catch (error) {
      console.error("Dokument se nepodařilo aktualizovat:", error);
      setSaveError("Dokument se nepodařilo aktualizovat.");
    } finally {
      setIsSaving(false);
    }
  };
  const handleCancel = () => {
    navigate(`/documents/${id}`);
  };

  const documentFormData: DocumentFormData = {
    title: document.title,
    category: document.category,
    employeeId: document.employeeId?._id ?? "",
    issueDate: document.issueDate.slice(0, 10),
    expiryDate: document.expiryDate?.slice(0, 10) ?? "",
    note: document.note ?? "",
    fileUrl: document.fileUrl ?? "",
  };

  return (
    <div>
      <Link
        to={`/documents/${id}`}
        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Zpět na detail
      </Link>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Upravit dokument
      </h1>
      <EditDocumentForm
        document={documentFormData}
        employees={employees}
        onSubmit={handleUpdateDocument}
        isSaving={isSaving}
        saveError={saveError}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditDocument;
