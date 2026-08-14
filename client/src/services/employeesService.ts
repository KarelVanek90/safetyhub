import axios from "axios";
import type { Employee, EmployeeFormData } from "../types/employee";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/api/employees`);

  return response.data.docs;
};
export const createEmployee = async (employeeData: EmployeeFormData) => {
  const response = await axios.post(`${API_URL}/api/employees`, employeeData);

  return response.data.docs;
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const response = await axios.get(`${API_URL}/api/employees/${id}`);

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
  axios.delete(`${API_URL}/api/employees/${id}`);
};
