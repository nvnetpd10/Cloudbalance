import { useState, useEffect } from "react";
import api from "../../../utils/axios";

export default function useOnBoarding() {
  const [users, setUsers] = useState([]);
  const [lloading, setLloading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get("/onboarding/accounts");

        setUsers(res?.data || []);
      } catch (e) {
        console.error("❌ API ERROR:", e);
      } finally {
        setLloading(false);
      }
    };

    fetchAccounts();
  }, []);

  return { users, lloading };
}
