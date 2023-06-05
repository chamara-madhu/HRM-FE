import {
  GET_EMPLOYEES_FETCH_START,
  GET_EMPLOYEES_FETCH_ERROR,
  GET_EMPLOYEES_FETCH_SUCCESS,
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_START,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_START,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
} from "./types";

// fetch employees
export const getEmployeesFetchLoad = (cafeParam) => ({
  type: GET_EMPLOYEES_FETCH_START,
  payload: cafeParam,
});

export const getEmployeesFetchSuccess = (employees) => ({
  type: GET_EMPLOYEES_FETCH_SUCCESS,
  payload: employees,
});

export const getEmployeesFetchError = (error) => ({
  type: GET_EMPLOYEES_FETCH_ERROR,
  payload: error,
});

// add cafe
export const addEmployeeStart = (cafe) => ({
  type: ADD_EMPLOYEE_START,
  payload: cafe,
});

export const addEmployeeSuccess = () => ({
  type: ADD_EMPLOYEE_SUCCESS,
});

export const addEmployeeError = (error) => ({
  type: ADD_EMPLOYEE_ERROR,
  payload: error,
});

// update cafe
export const updateEmployeeStart = (cafeData) => ({
  type: UPDATE_EMPLOYEE_START,
  payload: cafeData,
});

export const updateEmployeeSuccess = () => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
});

export const updateEmployeeError = (error) => ({
  type: UPDATE_EMPLOYEE_ERROR,
  payload: error,
});

// delete cafe
export const deleteEmployeeStart = (cafeId) => ({
  type: DELETE_EMPLOYEE_START,
  payload: cafeId,
});

export const deleteEmployeeSuccess = (cafeId) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: cafeId,
});

export const deleteEmployeeError = (error) => ({
  type: DELETE_EMPLOYEE_ERROR,
  payload: error,
});
