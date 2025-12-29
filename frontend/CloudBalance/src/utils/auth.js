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

// Function parameters update karein taaki ye backend response se match kare
export const login = (email, accessToken, refreshToken, role) => {
  localStorage.setItem("user", JSON.stringify({ email, role }));
  localStorage.setItem("token", accessToken); // accessToken ko save karein
  localStorage.setItem("refreshToken", refreshToken); // Refresh token bhi save karein
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

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};