// export const login = (email, token) => {
//   localStorage.setItem("user", JSON.stringify({ email }));
//   localStorage.setItem("token", token);
// };

// export const logout = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
// };

// export const isLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   return token !== null;
// };

// export const getToken = () => {
//   return localStorage.getItem("token");
// };


export const login = (email, token, role) => {
  localStorage.setItem("user", JSON.stringify({ email, role })); // Role bhi save karo
  localStorage.setItem("token", token);
  localStorage.setItem("role", role); // Direct access ke liye
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