import { useState, useEffect } from "react";
import axios from "axios";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://mocki.io/v1/bde0f2c9-827f-4b70-aa4e-4cf317d6d6d2"
        );
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
