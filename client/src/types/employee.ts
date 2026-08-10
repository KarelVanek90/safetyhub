export type Employee = {
  _id: string;
  name: string;
  position: string;
  category: number;
  medicalExamDate: string;
  training: "Platné" | "Končí";
  ppe: boolean;
  status: "ok" | "warning" | "error";
};

export type EmployeeFormData = {
  name: string;
  position: string;
  category: number;
  medicalExamDate: string;
  training: "Platné" | "Končí";
  ppe: boolean;
};
