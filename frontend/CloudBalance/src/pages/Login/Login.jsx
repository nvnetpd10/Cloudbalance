import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { login } from "../../utils/auth";
import Logo from "../../assets/images/CloudKeeper_Logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (emailError) {
      alert("Please enter a valid email");
      return;
    }

    if (!email || !password) {
      alert("Enter Email & Password");
      return;
    }

    login(email);
    window.location.href = "/dashboard";
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
        {/* Logo */}
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

        {/* Email input */}
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

            if (!value.includes("@")) {
              setEmailError("Email must contain @");
            } else {
              setEmailError("");
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />

        {/* Password input */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
