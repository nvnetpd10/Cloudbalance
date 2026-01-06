import api from "../../../utils/axios";

export default function useUserActions() {
  const addUser = async (payload) => {
    const res = await api.post("/users", payload);
    return res.data;
  };

  const updateUser = async (id, payload) => {
    const res = await api.put(`/users/${id}`, payload);
    return res.data;
  };

  const fetchUser = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  };

  return { addUser, updateUser, fetchUser };
}
