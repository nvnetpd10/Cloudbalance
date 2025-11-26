import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddUser() {
  const { open } = useOutletContext();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (isEdit) {
      const existingUser = {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      };
      setForm(existingUser);
    }
  }, [isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEdit) {
      alert("User updated!");
    } else {
      alert("User created!");
    }
  };

  return (
    <Box
      sx={{
        width: "96%",
        p: 3,
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: open ? "99%" : "98%",
          transition: "width 0.3s ease",
          p: 4,
          borderRadius: "12px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold" color="#1976d2">
          {isEdit ? "Edit User" : "Add New User"}
        </Typography>

        <Box
          component="form"
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 2.2fr",
            gap: 3,
          }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Email ID"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            select
            label="Select Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            sx={{ maxWidth: "380px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4, py: 1.4, width: "200px" }}
          onClick={handleSubmit}
        >
          {isEdit ? "Update User" : "Create User"}
        </Button>
      </Paper>
    </Box>
  );
}
