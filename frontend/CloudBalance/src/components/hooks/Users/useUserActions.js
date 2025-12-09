import axios from "axios";

export default function useUserActions() {
  const baseURL = "http://localhost:8080/users";

  const addUser = async (payload) => {
    return axios.post(`${baseURL}/addUsers`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const updateUser = async (id, payload) => {
    return axios.put(`${baseURL}/updateUsers/${id}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  };

  return {
    addUser,
    updateUser,
  };
}
