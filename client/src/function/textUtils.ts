type EmployeesLabel = "zaměstnanec" | "zaměstnanci" | "zaměstnanců";

export const getEmployeesLabel = (
  numberOfEmployees: number,
): EmployeesLabel => {
  if (numberOfEmployees === 1) return "zaměstnanec";
  if (numberOfEmployees > 1 && numberOfEmployees < 5) return "zaměstnanci";
  return "zaměstnanců";
};
