import axios from "axios";
import type { Employee, EmployeeFormData } from "../types/employee";

const API_URL = import.meta.env.VITE_API_URL;
const EMPLOYEES_URL = `${API_URL}/api/employees`;

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(EMPLOYEES_URL);

  return response.data.docs;
};
export const createEmployee = async (
  employeeData: EmployeeFormData,
): Promise<Employee> => {
  const response = await axios.post(EMPLOYEES_URL, employeeData);

  return response.data.docs;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const response = await axios.get(`${EMPLOYEES_URL}/${id}`);

  return response.data.docs;
};

export const editEmployee = async (
  id: string,
  employeeData: EmployeeFormData,
): Promise<Employee> => {
  const response = await axios.patch(
    `${API_URL}/api/employees/${id}`,
    employeeData,
  );

  return response.data.docs;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await axios.delete(`${EMPLOYEES_URL}/${id}`);
};
