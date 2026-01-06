const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const login = (email, accessToken) => {
  localStorage.setItem("user", JSON.stringify({ email }));
  localStorage.setItem("token", accessToken);
};

export const logout = () => {
  localStorage.clear();
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.role || null;
};
