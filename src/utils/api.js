import axios from "axios";
import { logoutApp } from "../utils/auth";

const API_URL = import.meta.env.VITE_BE_API_URL;
axios.defaults.withCredentials = true;

/**
 * Base function for making API requests.
 * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @param {string} endpoint - API endpoint.
 * @param {object} [data=null] - Request body data (for POST, PUT, PATCH).
 * @param {object} [headers={}] - Custom headers.
 * @returns {Promise<any>} - Response data.
 */

export const apiRequestConfig = async (config) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response?.data?.login) {
      return await logoutApp(() => {
        axios.CancelToken.source();
      });
    }
    throw error.response?.data?.message || error.response?.data?.error || error.message;
  }
};

export const apiRequest = async (method, endpoint, data = {}, headers = {}, timeout = 5000) => {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      timeout: timeout,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      ...(method === "GET" ? { params: data } : { data }) // Use params for GET requests
    };
    return await apiRequestConfig(config);
  } catch (error) {
    throw error;
  }
};


// ✅ Helper functions for specific HTTP methods
export const apiGet = (endpoint, headers = {}) => apiRequest("GET", endpoint, {}, headers);
export const apiPost = (endpoint, data, headers = {}) => apiRequest("POST", endpoint, data, headers);
export const apiPut = (endpoint, data, headers = {}) => apiRequest("PUT", endpoint, data, headers);
export const apiPatch = (endpoint, data, headers = {}) => apiRequest("PATCH", endpoint, data, headers);
export const apiDelete = (endpoint, data, headers = {}) => apiRequest("DELETE", endpoint, data, headers);
