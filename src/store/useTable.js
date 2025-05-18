import { create } from "zustand";
import { apiGet, apiPost, apiPatch, apiDelete } from "../utils/api.js";

const storeCache = {};

const createTableStore = (apiPath, default_params, push_history) => {
  if (!storeCache[apiPath]) {
    storeCache[apiPath] = create((set, get) => ({
      datas: [],
      error: null,
      onF5: true,
      onloadApi: "",
      loading: {},
      indexModal: {},
      openModal: {},
      radioSelect: {},
      pageSize: 10,
      countItem: 0,
      currentPage: 1,
      selectedRows: [],
      searchParams: {},
      searchCache: {},

      setLoading: (newdata) => {
        set((state) => ({
          loading: { ...state.loading, ...newdata }
        }));
      },

      setRadioSelect: (newdata) => {
        set((state) => ({
          radioSelect: { ...state.radioSelect, ...newdata }
        }));
      },

      setSelectedRows: (rowId) => {
        set({ selectedRows: rowId ? rowId : [] });
      },

      setSearchParams: (newdata) => {
        set((state) => ({
          searchParams: { ...state.searchParams, ...newdata }
        }));
      },

      setSearchCache: (newdata) => {
        if (get().datas.length > 0) {
          set({ datas: [] });
        }
        const isOnloadApi = get().onloadApi;
        if (isOnloadApi.includes("on_")) {
          return;
        }
        set((state) => ({
          searchCache: { ...state.searchCache, ...newdata }
        }));
        const loading_table = get().loading.table;
        if (!loading_table) {
          get().setLoading({ table: true });
        }
        const cache_search_0 = get().searchCache;
        setTimeout(() => {
          const cache_search_1 = get().searchCache;
          if (cache_search_0 === cache_search_1) {
            set((state) => ({
              searchParams: {
                ...state.searchParams,
                ...cache_search_0
              }
            }));
            get().setLoading({ table: false });
          }
        }, 1000);
      },

      setOpenModal: (newdata) => {
        set((state) => ({
          openModal: { ...state.openModal, ...newdata }
        }));
      },

      setIndexModal: (newdata) => {
        set((state) => ({
          indexModal: { ...state.indexModal, ...newdata }
        }));
      },

      setPageSize: (number) => {
        set({ pageSize: number });
      },

      setCurrentPage: (number) => {
        set({ currentPage: number });
      },

      // method (GET)
      findAllData: async (params) => {
        const searchs = new URLSearchParams(window.location.search);
        if (get().onF5 == true && searchs.size > 0 && push_history) {
          const queryObject = {};
          for (const [key, value] of searchs.entries()) {
            queryObject[key] = value;
          }
          params = queryObject;
          set({ searchCache: queryObject, onF5: false });
        } else {
          for (let [key, value] of Object.entries(params)) {
            if (!value || value.toString().length < 1) {
              delete params[key];
            }
          }
        }
        if (default_params) {
          for (const key of Object.keys(default_params)) {
            params[key] = default_params[key];
          }
        }
        set({ onloadApi: "on_findAll", error: null });

        try {
          const queryStr = "?" + new URLSearchParams(params).toString();
          if(push_history){
            window.history.replaceState({}, "", window.location.pathname + queryStr);
          }
          const finData = await apiGet(apiPath + queryStr);
          set({ datas: finData.data, countItem: finData.count });
        } catch (error) {
          set({ error: error, countItem: 0 });
        }
        set({ onloadApi: "off_findAll" });
      },

      // method (POST)
      addData: async (addata) => {
        set({ onloadApi: "on_add", error: null });
        try {
          await apiPost(apiPath, addata);
        } catch (error) {
          set({ error: error });
        }
        set({ onloadApi: "off_add" });
      },

      // method (PATCH)
      updateData: async (updateData) => {
        set({ onloadApi: "on_update", error: null });
        try {
          await apiPatch(apiPath, updateData);
        } catch (error) {
          set({ error: error });
        }
        set({ onloadApi: "off_update" });
      },

      // method (PATCH) update multiple status
      updateMultipleStatus: async (updateData) => {
        set({ onloadApi: "on_update", error: null });
        try {
          await apiPatch(apiPath + "/update-status", updateData);
        } catch (error) {
          set({ error: error });
        }
        set({ onloadApi: "off_update" });
      },

      // method (DELETE)
      deleteData: async (deleteData) => {
        set({ onloadApi: "on_delete", error: null });
        try {
          await apiDelete(apiPath, deleteData); // Send data with array of IDs
        } catch (error) {
          set({ error: error });
        }
        set({ onloadApi: "off_delete" });
      },

      // method (POST)
      restoreData: async (restoreData) => {
        set({ onloadApi: "on_trash_restore", error: null });
        try {
          await apiPost(apiPath + "/trash/restore", restoreData); // Send data with array of IDs
        } catch (error) {
          set({ error: error });
        }
        set({ onloadApi: "off_trash_restore" });
      }
    }));
  }

  return storeCache[apiPath];
};

const useTableStore = (apiPath, default_params, push_history=true) => {
  return createTableStore(apiPath, default_params, push_history)();
};

export default useTableStore;
