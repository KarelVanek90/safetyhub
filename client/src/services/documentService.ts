import axios from "axios";
import type { Document, DocumentFormData } from "../types/document";
const API_URL = import.meta.env.VITE_API_URL;
const DOCUMENTS_URL = `${API_URL}/api/documents`;

type DocumentsResponse = {
  msg: string;
  docs: Document[];
};
type DocumentResponse = {
  msg: string;
  docs: Document;
};

export const getDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<DocumentsResponse>(DOCUMENTS_URL);

  return response.data.docs;
};

export const createDocument = async (
  documentData: DocumentFormData,
): Promise<Document> => {
  const response = await axios.post<DocumentResponse>(
    DOCUMENTS_URL,
    documentData,
  );

  return response.data.docs;
};

export const getDocumentById = async (id: string): Promise<Document> => {
  const response = await axios.get<DocumentResponse>(`${DOCUMENTS_URL}/${id}`);

  return response.data.docs;
};

export const editDocument = async (
  id: string,
  documentData: DocumentFormData,
): Promise<Document> => {
  const response = await axios.patch<DocumentResponse>(
    `${DOCUMENTS_URL}/${id}`,
    documentData,
  );

  return response.data.docs;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await axios.delete(`${DOCUMENTS_URL}/${id}`);
};
