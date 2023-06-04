import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_CAFE_START,
  DELETE_CAFE_START,
  GET_CAFES_FETCH_START,
  UPDATE_CAFE_START,
} from "../actions/types";
import {
  addCafeApi,
  deleteCafeApi,
  getCafesApi,
  updateCafeApi,
} from "../api/cafesApi";
import {
  addCafeError,
  addCafeSuccess,
  deleteCafeError,
  deleteCafeSuccess,
  getCafesFetchError,
  getCafesFetchSuccess,
  updateCafeError,
  updateCafeSuccess,
} from "../actions/cafesActions";

function* getCafesFetchAsync() {
  try {
    const response = yield call(getCafesApi);
    yield put(getCafesFetchSuccess(response.data.data));
  } catch (err) {
    yield put(getCafesFetchError(err.response.data));
  }
}

function* addCafeAsync({ payload }) {
  try {
    const response = yield call(addCafeApi, payload);
    yield put(addCafeSuccess());
  } catch (err) {
    yield put(addCafeError(err.response.data));
  }
}

function* updateCafeAsync({ payload: { id, bodyFormData } }) {
  try {
    const response = yield call(updateCafeApi, id, bodyFormData);
    yield put(updateCafeSuccess());
  } catch (err) {
    yield put(updateCafeError(err.response.data));
  }
}

function* deleteCafeAsync({ payload }) {
  try {
    const response = yield call(deleteCafeApi, payload);
    yield put(deleteCafeSuccess(payload));
  } catch (err) {
    yield put(deleteCafeError(err.response.data));
  }
}

export function* getCafesFetch() {
  yield takeEvery(GET_CAFES_FETCH_START, getCafesFetchAsync);
}

export function* addCafe() {
  yield takeLatest(ADD_CAFE_START, addCafeAsync);
}

export function* updateCafe() {
  yield takeLatest(UPDATE_CAFE_START, updateCafeAsync);
}

export function* deleteCafe() {
  yield takeLatest(DELETE_CAFE_START, deleteCafeAsync);
}
