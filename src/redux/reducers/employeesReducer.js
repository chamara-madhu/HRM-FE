import {
  GET_EMPLOYEES_FETCH_START,
  GET_EMPLOYEES_FETCH_ERROR,
  GET_EMPLOYEES_FETCH_SUCCESS,
  ADD_EMPLOYEE_START,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_START,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_START,
  UPDATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../actions/types";
import { employeesList } from "./initialState";

const employeesReducer = (state = employeesList, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_FETCH_START:
    case ADD_EMPLOYEE_START:
    case UPDATE_EMPLOYEE_START:
    case DELETE_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
      };
    case GET_EMPLOYEES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ADD_EMPLOYEE_SUCCESS:
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((el) => el.id !== action.payload),
      };
    case GET_EMPLOYEES_FETCH_ERROR:
    case ADD_EMPLOYEE_ERROR:
    case UPDATE_EMPLOYEE_ERROR:
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default employeesReducer;
