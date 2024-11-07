import axios from "axios";
import { setHeaders } from "./setHeaders";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const getRequest = async (url) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in GET request:", error.response.data);
    throw error;
  }
};

export const postRequest = async (url, data) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const putRequest = async (url, data) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.put(url, data, { headers });
    console.log("[putRequest] response.data: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    await api.delete(url, { headers });
  } catch (error) {
    console.error("Error in DELETE request:", error.error);
    throw error;
  }
};

export default api;