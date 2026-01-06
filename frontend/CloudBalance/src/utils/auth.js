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

export const isLoggedIn = () => !!getToken(); // ONLY checks presence

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  return decodeToken(token)?.role || null;
};

export const hasSession = () => {
  return !!localStorage.getItem("token");
};
