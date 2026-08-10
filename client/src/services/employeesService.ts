import axios from "axios";
import type { EmployeeFormData } from "../types/employee";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/api/employees`);

  return response.data.docs;
};
export const createEmployee = async (employeeData: EmployeeFormData) => {
  const response = await axios.post(`${API_URL}/api/employees`, employeeData);

  return response.data.docs;
};
