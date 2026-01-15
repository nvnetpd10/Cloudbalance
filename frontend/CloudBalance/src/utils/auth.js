const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const login = (email, token) => {
  if (email) localStorage.setItem("user", JSON.stringify({ email }));
  localStorage.setItem("token", token);
};

export const logout = () => localStorage.clear();

export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken(); 

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token)?.role || null;
};

export const hasSession = () => {
  return !!localStorage.getItem("token");
};

export const getEmail = () => {
  try {
    return (JSON.parse(localStorage.getItem("user") || "{}")?.email || "").toLowerCase();
  } catch {
    return "";
  }
};


export const getEmailFromToken = () => {
  const token = getToken();
  if (!token) return "";

  const payload = decodeToken(token) || {};
  // common keys: email / sub / username
  return String(payload.email || payload.sub || payload.username || "")
    .toLowerCase()
    .trim();
};