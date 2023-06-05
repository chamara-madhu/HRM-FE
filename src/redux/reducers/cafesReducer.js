import {
  GET_CAFES_FETCH_START,
  GET_CAFES_FETCH_ERROR,
  GET_CAFES_FETCH_SUCCESS,
  ADD_CAFE_START,
  ADD_CAFE_SUCCESS,
  ADD_CAFE_ERROR,
  DELETE_CAFE_START,
  DELETE_CAFE_ERROR,
  DELETE_CAFE_SUCCESS,
  UPDATE_CAFE_START,
  UPDATE_CAFE_ERROR,
  UPDATE_CAFE_SUCCESS,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_START,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_SUCCESS,
  GET_CAFES_UNIQUE_LOCATIONS_FETCH_ERROR,
} from "../actions/types";
import { cafesList } from "./initialState";

const cafesReducer = (state = cafesList, action) => {
  switch (action.type) {
    case GET_CAFES_FETCH_START:
    case GET_CAFES_UNIQUE_LOCATIONS_FETCH_START:
    case ADD_CAFE_START:
    case UPDATE_CAFE_START:
    case DELETE_CAFE_START:
      return {
        ...state,
        loading: true,
      };
    case GET_CAFES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GET_CAFES_UNIQUE_LOCATIONS_FETCH_SUCCESS:
      return {
        ...state,
        uniqueLocations: action.payload,
        loading: false,
      };
    case ADD_CAFE_SUCCESS:
    case UPDATE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((el) => el._id !== action.payload),
      };
    case GET_CAFES_FETCH_ERROR:
    case GET_CAFES_UNIQUE_LOCATIONS_FETCH_ERROR:
    case ADD_CAFE_ERROR:
    case UPDATE_CAFE_ERROR:
    case DELETE_CAFE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cafesReducer;
