import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import {
  ADD_CAFE_START,
  DELETE_CAFE_START,
  GET_CAFES_FETCH_START,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_START,
  UPDATE_CAFE_START,
} from "../actions/types";
import {
  addCafeApi,
  deleteCafeApi,
  getCafesApi,
  getUniqueCafeLocationsApi,
  updateCafeApi,
} from "../api/cafesApi";
import {
  addCafeError,
  addCafeSuccess,
  deleteCafeError,
  deleteCafeSuccess,
  getCafesFetchError,
  getCafesFetchSuccess,
  getCafesLocationsFetchError,
  getCafesLocationsFetchSuccess,
  updateCafeError,
  updateCafeSuccess,
} from "../actions/cafesActions";

function* getCafesFetchAsync({ payload }) {
  try {
    const response = yield call(getCafesApi, payload);
    yield put(getCafesFetchSuccess(response.data.data));
  } catch (err) {
    yield put(getCafesFetchError(err.response.data));
  }
}

function* getUniqueCafeLocationsAsync() {
  try {
    const response = yield call(getUniqueCafeLocationsApi);
    yield put(getCafesLocationsFetchSuccess(response.data));
  } catch (err) {
    yield put(getCafesLocationsFetchError(err.response.data));
  }
}

function* addCafeAsync({ payload }) {
  try {
    yield call(addCafeApi, payload);
    yield put(addCafeSuccess());
  } catch (err) {
    yield put(addCafeError(err.response.data));
  }
}

function* updateCafeAsync({ payload: { id, bodyFormData } }) {
  try {
    yield call(updateCafeApi, id, bodyFormData);
    yield put(updateCafeSuccess());
  } catch (err) {
    yield put(updateCafeError(err.response.data));
  }
}

function* deleteCafeAsync({ payload }) {
  try {
    yield call(deleteCafeApi, payload);
    yield put(deleteCafeSuccess(payload));
  } catch (err) {
    yield put(deleteCafeError(err.response.data));
  }
}

export function* getCafesFetch() {
  yield takeEvery(GET_CAFES_FETCH_START, getCafesFetchAsync);
}

export function* getUniqueCafeLocationsFetch() {
  yield takeEvery(
    GET_CAFES_UNIQUE_LOCATIONS_FETCH_START,
    getUniqueCafeLocationsAsync
  );
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
