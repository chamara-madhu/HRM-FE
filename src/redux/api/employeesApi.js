import axios from "axios";
import { BASE_API } from "../../config/constants";

export const getEmployeesApi = () => axios.get(`${BASE_API}/api/v1/employees`);

export const addEmployeeApi = async (data) => {
  await axios.post(`${BASE_API}/api/v1/employee`, data);
};

export const updateEmployeeApi = async (employeeId, data) => {
  await axios.put(`${BASE_API}/api/v1/employee/${employeeId}`, data);
};

export const deleteEmployeeApi = async (employeeId) => {
  await axios.delete(`${BASE_API}/api/v1/employee/${employeeId}`);
};
