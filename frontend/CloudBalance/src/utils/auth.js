export const login = (email, token, role) => {
  localStorage.setItem("user", JSON.stringify({ email }));
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const logout = () => {
  localStorage.clear();
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
