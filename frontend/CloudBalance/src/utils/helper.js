import { jwtDecode } from "jwt-decode";

export const getUserFullNameFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return "";

  try {
    const decoded = jwtDecode(token);
    return `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim();
  } catch {
    return "";
  }
};
