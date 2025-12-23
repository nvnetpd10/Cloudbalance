// Save JWT token and user info
export const login = (email, token) => {
  localStorage.setItem("user", JSON.stringify({ email }));
  localStorage.setItem("token", token);
};

// Remove JWT token
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Check if user is logged in by checking token
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

// Get token for API requests
export const getToken = () => {
  return localStorage.getItem("token");
};
