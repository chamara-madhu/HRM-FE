import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_EMPLOYEE_START,
  DELETE_EMPLOYEE_START,
  GET_EMPLOYEES_FETCH_START,
  UPDATE_EMPLOYEE_START,
} from "../actions/types";
import {
  addEmployeeApi,
  deleteEmployeeApi,
  getEmployeesApi,
  updateEmployeeApi,
} from "../api/employeesApi";
import {
  addEmployeeError,
  addEmployeeSuccess,
  deleteEmployeeError,
  deleteEmployeeSuccess,
  getEmployeesFetchError,
  getEmployeesFetchSuccess,
  updateEmployeeError,
  updateEmployeeSuccess,
} from "../actions/employeesActions";

function* getEmployeesFetchAsync() {
  try {
    const response = yield call(getEmployeesApi);
    yield put(getEmployeesFetchSuccess(response.data.data));
  } catch (err) {
    yield put(getEmployeesFetchError(err.response.data));
  }
}

function* addEmployeeAsync({ payload }) {
  try {
    const response = yield call(addEmployeeApi, payload);
    yield put(addEmployeeSuccess());
  } catch (err) {
    yield put(addEmployeeError(err.response.data));
  }
}

function* updateEmployeeAsync({ payload: { id, JSONData } }) {
  try {
    const response = yield call(updateEmployeeApi, id, JSONData);
    yield put(updateEmployeeSuccess());
  } catch (err) {
    yield put(updateEmployeeError(err.response.data));
  }
}

function* deleteEmployeeAsync({ payload }) {
  try {
    const response = yield call(deleteEmployeeApi, payload);
    yield put(deleteEmployeeSuccess(payload));
  } catch (err) {
    yield put(deleteEmployeeError(err.response.data));
  }
}

export function* getEmployeesFetch() {
  yield takeEvery(GET_EMPLOYEES_FETCH_START, getEmployeesFetchAsync);
}

export function* addEmployee() {
  yield takeLatest(ADD_EMPLOYEE_START, addEmployeeAsync);
}

export function* updateEmployee() {
  yield takeLatest(UPDATE_EMPLOYEE_START, updateEmployeeAsync);
}

export function* deleteEmployee() {
  yield takeLatest(DELETE_EMPLOYEE_START, deleteEmployeeAsync);
}
