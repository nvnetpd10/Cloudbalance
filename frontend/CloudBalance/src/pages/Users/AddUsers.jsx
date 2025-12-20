import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserActions from "../../components/hooks/Users/useUserActions";

export default function AddUser() {
  const { open } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addUser, updateUser } = useUserActions();
  const [errors, setErrors] = useState({});

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/users`)
        .then((res) => {
          const user = res.data.find((u) => String(u.id) === String(id));

          if (user) {
            setForm({
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              email: user.email || "",
              role: user.role || "",
              password: user.password || "",
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isValidPassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.role.trim()) newErrors.role = "Role is required";

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(form.password)) {
      newErrors.password =
        "Min 5 chars, 1 letter, 1 number & 1 special character required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        role: form.role,
        password: form.password,
        active: true,
      };

      if (isEdit) {
        await updateUser(id, payload);
      } else {
        await addUser(payload);
      }

      navigate("/dashboard/users");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "USER_EMAIL_EXISTS"
      ) {
        setErrors({ email: "User with this email already exists" });
        return;
      }

      console.error("Error:", error);
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
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Email ID"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            select
            label="Select Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
            sx={{ maxWidth: "380px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">ReadOnly</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
          </TextField>

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            sx={{ maxWidth: "380px" }}
          />
        </Box>

        <Button
          type="button"
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
