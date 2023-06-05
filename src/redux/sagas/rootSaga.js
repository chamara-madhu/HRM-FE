import { all, fork } from "redux-saga/effects";
import {
  addCafe,
  deleteCafe,
  getCafesFetch,
  getUniqueCafeLocationsFetch,
  updateCafe,
} from "./cafesSagas";
import {
  addEmployee,
  deleteEmployee,
  getEmployeesFetch,
  updateEmployee,
} from "./employeesSagas";

export default function* rootSaga() {
  yield all([
    fork(getCafesFetch),
    fork(getUniqueCafeLocationsFetch),
    fork(addCafe),
    fork(deleteCafe),
    fork(updateCafe),
    fork(getEmployeesFetch),
    fork(addEmployee),
    fork(deleteEmployee),
    fork(updateEmployee),
  ]);
}
