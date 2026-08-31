export type DocumentCategory =
  | "employee-documentation"
  | "bozp"
  | "po"
  | "internal-regulations"
  | "other";

export type Document = {
  _id: string;
  title: string;
  category: DocumentCategory;
  employeeId?: {
    _id: string;
    name: string;
  };
  issueDate: string;
  expiryDate?: string;
  note?: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentFormData = {
  title: string;
  category: DocumentCategory;
  employeeId?: string;

  issueDate: string;
  expiryDate?: string;
  note?: string;
  fileUrl?: string;
};
