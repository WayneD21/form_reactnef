import { create } from "zustand";
import { apiRequestConfig } from "../utils/api.js";
const API_URL_BE = import.meta.env.VITE_BE_API_URL;

const useRequestsStore = create((set, get) => ({
  response: {},
  onloadApi: {},
  open: {},
  loading: {},
  error: {},

  setLoading: (newdata) => {
    set((state) => ({
      loading: { ...state.loading, ...newdata }
    }));
  },

  setResponse: (newdata) => {
    set((state) => ({
      response: { ...state.response, ...newdata }
    }));
  },

  setOpen: (newdata) => {
    set((state) => ({
      open: { ...state.open, ...newdata }
    }));
  },

  setError: (newdata) => {
    set((state) => ({
      error: { ...state.error, ...newdata }
    }));
  },

  setSuccess: (newdata) => {
    set((state) => ({
      success: { ...state.success, ...newdata }
    }));
  },

  setOnloadApi: (newdata) => {
    set((state) => ({
      onloadApi: { ...state.onloadApi, ...newdata }
    }));
  },

  callRequests: async (taskId, method, endpoint, data = {}, headers = {}, timeout = 5000) => {
    const jsonData = {};
    jsonData[taskId] = "start";
    get().setOnloadApi(jsonData);
    jsonData[taskId] = null;
    get().setError(jsonData);
    try {
      const config = {
        method: method,
        url: `${API_URL_BE}${endpoint}`,
        timeout: timeout,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        ...(method === "GET" ? { params: data } : { data }) // Use params for GET requests
      };
      const resp = await apiRequestConfig(config);
      jsonData[taskId] = resp;
      get().setResponse(jsonData);
    } catch (error) {
      jsonData[taskId] = error;
      get().setError(jsonData);
    }
    jsonData[taskId] = "end";
    get().setOnloadApi(jsonData);
  }
}));

export default useRequestsStore;
