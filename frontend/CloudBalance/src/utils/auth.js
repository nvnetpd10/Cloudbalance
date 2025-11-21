export const login = (email) => {
  localStorage.setItem("user", JSON.stringify({ email }));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};
