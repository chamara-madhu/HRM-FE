import { combineReducers } from "redux";
import cafesReducer from "./cafesReducer";
import employeesReducer from "./employeesReducer";

const rootReducer = combineReducers({
  cafeList: cafesReducer,
  employeeList: employeesReducer,
});

export default rootReducer;
