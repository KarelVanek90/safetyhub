import axios from "axios";
import type { Document } from "../types/document";
const API_URL = import.meta.env.VITE_API_URL;
const DOCUMENTS_URL = `${API_URL}/api/documents`;

type DocumentsResponse = {
  msg: string;
  docs: Document[];
};

export const getDocuments = async (): Promise<Document[]> => {
  const response = await axios.get<DocumentsResponse>(DOCUMENTS_URL);

  return response.data.docs;
};
