import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { login, isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/CloudKeeper_Logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard/users", { replace: true });
    }
  }, []);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    if (!value.includes("@")) return "Email must contain @";
    const parts = value.split("@");
    if (!parts[1] || !parts[1].includes("."))
      return "Email must have a valid domain";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 5) return "Password must be at least 5 characters";
    if (!/[A-Za-z]/.test(value)) return "Password must contain a letter";
    if (!/[0-9]/.test(value)) return "Password must contain a number";
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value))
      return "Password must contain a special character";
    return "";
  };

  const handleLogin = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    login(email);
    navigate("/dashboard/users");
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            bgcolor: " #4d94ff",
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
