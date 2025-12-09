import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const res = await axios.get("http://localhost:8080/users/getUsers");
        console.log(res, "alsjdadaj");

        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
}
