import {
  GET_CAFES_FETCH_START,
  GET_CAFES_FETCH_ERROR,
  GET_CAFES_FETCH_SUCCESS,
  ADD_CAFE_START,
  ADD_CAFE_SUCCESS,
  ADD_CAFE_ERROR,
  DELETE_CAFE_START,
  DELETE_CAFE_SUCCESS,
  DELETE_CAFE_ERROR,
  UPDATE_CAFE_START,
  UPDATE_CAFE_SUCCESS,
  UPDATE_CAFE_ERROR,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_START,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_SUCCESS,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_ERROR,
} from "./types";

// fetch cafes
export const getCafesFetchLoad = (locationParam) => ({
  type: GET_CAFES_FETCH_START,
  payload: locationParam,
});

export const getCafesFetchSuccess = (cafes) => ({
  type: GET_CAFES_FETCH_SUCCESS,
  payload: cafes,
});

export const getCafesFetchError = (error) => ({
  type: GET_CAFES_FETCH_ERROR,
  payload: error,
});

// add cafe
export const addCafeStart = (cafe) => ({
  type: ADD_CAFE_START,
  payload: cafe,
});

export const addCafeSuccess = () => ({
  type: ADD_CAFE_SUCCESS,
});

export const addCafeError = (error) => ({
  type: ADD_CAFE_ERROR,
  payload: error,
});

// update cafe
export const updateCafeStart = (cafeData) => ({
  type: UPDATE_CAFE_START,
  payload: cafeData,
});

export const updateCafeSuccess = () => ({
  type: UPDATE_CAFE_SUCCESS,
});

export const updateCafeError = (error) => ({
  type: UPDATE_CAFE_ERROR,
  payload: error,
});

// delete cafe
export const deleteCafeStart = (cafeId) => ({
  type: DELETE_CAFE_START,
  payload: cafeId,
});

export const deleteCafeSuccess = (cafeId) => ({
  type: DELETE_CAFE_SUCCESS,
  payload: cafeId,
});

export const deleteCafeError = (error) => ({
  type: DELETE_CAFE_ERROR,
  payload: error,
});

// fetch unique cafe locations
export const getCafesLocationsFetchStart = () => ({
  type: GET_CAFES_UNIQUE_LOCATIONS_FETCH_START,
});

export const getCafesLocationsFetchSuccess = (locations) => ({
  type: GET_CAFES_UNIQUE_LOCATIONS_FETCH_SUCCESS,
  payload: locations,
});

export const getCafesLocationsFetchError = (error) => ({
  type: GET_CAFES_UNIQUE_LOCATIONS_FETCH_ERROR,
  payload: error,
});
