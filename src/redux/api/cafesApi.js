import axios from "axios";
import { BASE_API } from "../../config/constants";

export const getCafesApi = (location) =>
  axios.get(
    `${BASE_API}/api/v1/cafes${location ? `?location=${location}` : ""}`
  );

export const getUniqueCafeLocationsApi = () =>
  axios.get(`${BASE_API}/api/v1/cafes/locations`);

export const addCafeApi = async (data) => {
  await axios.post(`${BASE_API}/api/v1/cafe`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCafeApi = async (cafeId, data) => {
  await axios.put(`${BASE_API}/api/v1/cafe/${cafeId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCafeApi = async (cafeId) => {
  await axios.delete(`${BASE_API}/api/v1/cafe/${cafeId}`);
};
