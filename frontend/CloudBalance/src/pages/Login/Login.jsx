import { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, Avatar } from "@mui/material";
import { login, isLoggedIn, getRole } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/CloudKeeper_Logo.jpg";
import api from "../../utils/axios"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      const role = getRole();
      if (role === "CUSTOMER") {
        navigate("/dashboard/cost-explorer", { replace: true });
      } else {
        navigate("/dashboard/users", { replace: true });
      }
    }
  }, [navigate]);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Email must contain @";
    const parts = value.split("@");
    if (!parts[1] || !parts[1].includes(".")) {
      return "Email must have a valid domain";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 5) return "Password must be at least 5 characters";
    return "";
  };

  const handleLogin = async () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    try {
      const response = await api.post("/auth/login", { email, password });

      const accessToken = response.data?.accessToken;

     
      if (!accessToken) {
        toast.error("Login failed: access token missing");
        return;
      }

      toast.success("Login successful");

      login(email, accessToken);

      const role = getRole();

      if (role === "CUSTOMER") {
        navigate("/dashboard/cost-explorer");
      } else {
        navigate("/dashboard/users");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e6f0ff, #e6f0ff)",
        overflow: "hidden",
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: "-30px",
          width: 480,
          textAlign: "center",
          borderRadius: "20px",
          background: "white",
        }}
      >
        <Avatar
          src={Logo}
          alt="logo"
          sx={{
            width: 240,
            height: 120,
            mx: "auto",
            mb: 2,
            borderRadius: "12px",
          }}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          error={!!emailError}
          helperText={emailError}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            setEmailError(validateEmail(value));
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            setPasswordError(validatePassword(value));
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            bgcolor: "#4d94ff",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
