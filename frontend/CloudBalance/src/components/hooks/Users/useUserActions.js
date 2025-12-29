import axios from "axios";
import { getToken, logout } from "../../../utils/auth";

export default function useUserActions() {
  const baseURL = "http://localhost:8080/users";

  const getAuthHeader = () => {
    const token = getToken();
    if (!token) {
      logout();
      throw new Error("No token found");
    }
    return { Authorization: `Bearer ${token}` };
  };

  const addUser = async (payload) => {
    const response = await axios.post(baseURL, payload, {
      headers: getAuthHeader(),
    });
    return response.data;
  };

  const updateUser = async (id, payload) => {
    const response = await axios.put(`${baseURL}/${id}`, payload, {
      headers: getAuthHeader(),
    });
    return response.data;
  };

  const fetchUser = async (id) => {
    const response = await axios.get(`${baseURL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  };

  return {
    addUser,
    updateUser,
    fetchUser,
  };
}
