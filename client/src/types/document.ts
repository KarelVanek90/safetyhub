export type Document = {
  _id: string;
  title: string;
  category:
    | "employee-documentation"
    | "bozp"
    | "po"
    | "internal-regulations"
    | "other";
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
