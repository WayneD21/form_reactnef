import Cookies from "js-cookie";
import { apiGet } from "./api";
import routes from "../configs/routesPath";

export const getSid = () => {
  return Cookies.get("session_id") || null;
};

export const removeSid = () => {
  if (getSid()) {Cookies.remove("session_id")}
};

export const saveSid = (sid) => {
  removeSid();
  Cookies.set("session_id", sid, { expires: 1, path: "", sameSite: "None", secure: true });
};

export const logoutApp = async (cancel) => {
  try {
    await apiGet("/auth/logout");
    if (typeof cancel === 'function') {
      cancel();
    } 
    removeSid();
    window.location.replace(routes.login);
  } catch (error) {
    throw error.response?.data?.message || error.response?.data?.error || error.message;
  }
};
