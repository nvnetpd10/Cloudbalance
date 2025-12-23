import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import useUserActions from "../../components/hooks/Users/useUserActions";
import { getToken } from "../../utils/auth";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function AddUser() {
  const { open } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addUser, updateUser } = useUserActions();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    console.log("🔍 useEffect triggered");
    console.log("📝 isEdit:", isEdit);
    console.log("🆔 User ID:", id);

    if (isEdit) {
      const token = getToken();
      console.log("🔑 Token:", token ? "EXISTS" : "MISSING");

      if (!token) {
        console.error("❌ No token found!");
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setLoading(true);
      console.log("🌐 Fetching user with ID:", id);

      axios
        .get(`http://localhost:8080/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("✅ User data received:", res.data);
          setForm({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            email: res.data.email || "",
            role: res.data.role || "",
            password: "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Error fetching user:", err);
          console.error("❌ Error response:", err.response);
          console.error("❌ Error status:", err.response?.status);
          console.error("❌ Error data:", err.response?.data);

          setLoading(false);

          if (err.response?.status === 404) {
            alert("User not found");
            navigate("/dashboard/users");
          } else if (
            err.response?.status === 401 ||
            err.response?.status === 403
          ) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            alert("Failed to load user data. Check console for details.");
          }
        });
    }
  }, [isEdit, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
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

    // ✅ Password validation logic fixed
    if (!isEdit) {
      // ADD MODE: Password is required
      if (!form.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!isValidPassword(form.password)) {
        newErrors.password =
          "Min 5 chars, 1 letter, 1 number & 1 special character required";
      }
    } else {
      // EDIT MODE: Password is optional, but if provided, must be valid
      if (form.password.trim() && !isValidPassword(form.password)) {
        newErrors.password =
          "Min 5 chars, 1 letter, 1 number & 1 special character required";
      }
      // ✅ If password is empty in edit mode, that's OK - no error
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      active: true,
    };

    // ✅ Only include password in payload if user entered one
    if (!isEdit) {
      // ADD MODE: Always include password
      payload.password = form.password;
    } else if (form.password.trim()) {
      // EDIT MODE: Only include password if user provided a new one
      payload.password = form.password;
    }

    console.log("📤 Submitting payload:", payload);

    try {
      if (isEdit) {
        console.log("🔄 Updating user with ID:", id);
        await updateUser(id, payload);
      } else {
        console.log("➕ Adding new user");
        await addUser(payload);
      }
      navigate("/dashboard/users");
    } catch (error) {
      console.error("❌ Submit Error:", error);

      if (error.message === "No token found") {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else if (error.response) {
        const msg = error.response.data?.message || error.response.data;
        if (error.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (error.response.status === 409) {
          setErrors({ email: "User with this email already exists" });
        } else if (error.response.status === 400) {
          setErrors({ general: "Invalid input. Please check all fields." });
        } else {
          setErrors({ general: msg || "Failed to save user." });
        }
      } else {
        setErrors({ general: "Network error. Please check your connection." });
      }
    }
  };
  if (loading) {
    return (
      <Box
        sx={{
          width: "96%",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Typography variant="h6">Loading user data...</Typography>
      </Box>
    );
  }

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

        {errors.general && (
          <Typography color="error" mb={2}>
            {errors.general}
          </Typography>
        )}

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
            required={!isEdit}
            error={!!errors.password}
            helperText={
              errors.password ||
              (isEdit ? "Leave blank to keep current password" : "")
            }
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
