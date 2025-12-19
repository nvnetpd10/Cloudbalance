import { useState, useEffect } from "react";
import axios from "axios";

export default function useOnBoarding() {
  const [users, setUsers] = useState([]);
  const [lloading, setLloading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const res = await axios.get(
          "https://mocki.io/v1/9c33ce58-d41a-4161-9c9a-356fface37d5"
        );

        setUsers(res.data);
        setLloading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLloading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, lloading };
}
