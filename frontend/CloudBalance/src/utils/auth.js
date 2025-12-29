export const login = (email, token) => {
  localStorage.setItem("user", JSON.stringify({ email }));
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
