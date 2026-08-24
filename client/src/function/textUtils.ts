type EmployeesLabel = "zaměstnanec" | "zaměstnanci" | "zaměstnanců";

export const getEmployeesLabel = (
  numberOfEmployees: number
): EmployeesLabel => {
  if (numberOfEmployees === 1) return "zaměstnanec";
  if (numberOfEmployees > 1 && numberOfEmployees < 5) return "zaměstnanci";
  return "zaměstnanců";
};

export const normalizeSearchText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};
