import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import api from "../../utils/axios"; // ✅ interceptor
import useUserActions from "../../components/hooks/Users/useUserActions";
import useOnBoarding from "../../components/hooks/OnBoarding/useOnBoarding";
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
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [draggedAccount, setDraggedAccount] = useState(null);

  const isEdit = Boolean(id);
  const { users: accounts, lloading } = useOnBoarding();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  // 🔹 LOAD USER (EDIT MODE)
  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);
    api
      .get(`/users/${id}`)
      .then((res) => {
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
        setLoading(false);
        if (err.response?.status === 404) {
          alert("User not found");
          navigate("/dashboard/users");
        } else {
          alert("Failed to load user data");
        }
      });
  }, [isEdit, id, navigate]);

  useEffect(() => {
    setAvailableAccounts(accounts);
  }, [accounts]);

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

  // 🔹 SUBMIT
  const handleSubmit = async () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.role.trim()) newErrors.role = "Role is required";

    if (!isEdit) {
      if (!form.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!isValidPassword(form.password)) {
        newErrors.password =
          "Min 5 chars, 1 letter, 1 number & 1 special character required";
      }
    } else if (form.password.trim() && !isValidPassword(form.password)) {
      newErrors.password =
        "Min 5 chars, 1 letter, 1 number & 1 special character required";
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

    if (!isEdit) payload.password = form.password;
    else if (form.password.trim()) payload.password = form.password;

    try {
      if (isEdit) {
        await updateUser(id, payload);
      } else {
        await addUser(payload);
      }
      navigate("/dashboard/users");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({ email: "User with this email already exists" });
      } else if (error.response?.status === 400) {
        setErrors({ general: "Invalid input. Please check all fields." });
      } else {
        setErrors({ general: "Failed to save user" });
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

  const handleDragStart = (account) => {
    setDraggedAccount(account);
  };

  const handleDropToAssigned = () => {
    if (!draggedAccount) return;

    setAvailableAccounts((prev) =>
      prev.filter((a) => a.id !== draggedAccount.id)
    );

    setAssignedAccounts((prev) => [...prev, draggedAccount]);

    setDraggedAccount(null);
  };

  const handleDropToAvailable = () => {
    if (!draggedAccount) return;

    setAssignedAccounts((prev) =>
      prev.filter((a) => a.id !== draggedAccount.id)
    );

    setAvailableAccounts((prev) => [...prev, draggedAccount]);

    setDraggedAccount(null);
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
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="ReadOnly">ReadOnly</MenuItem>
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

        {form.role === "Customer" && (
          <Box
            sx={{
              mt: 4,
              mb: 3,
              display: "flex",
              gap: 3,
              alignItems: "stretch",
              background: "#f9fbff",
              p: 3,
              borderRadius: "14px",
              border: "1px solid #dbe2f1",
            }}
          >
            {/* LEFT BOX – AVAILABLE ACCOUNTS */}
            <Box
              sx={{
                flex: 1,
                minHeight: 320,
                borderRadius: "14px",
                border: "2px solid #1976d2",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropToAvailable}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 1.8,
                  borderBottom: "1px solid #e3e8ef",
                  backgroundColor: "#f1f6ff",
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              >
                <Typography fontWeight={700} color="#1976d2">
                  Choose Account IDs to Associate
                </Typography>
              </Box>

              <Box sx={{ flex: 1, m: 2, overflowY: "auto" }}>
                {lloading ? (
                  <Typography sx={{ p: 2 }}>Loading accounts...</Typography>
                ) : availableAccounts.length === 0 ? (
                  <Typography sx={{ p: 2, color: "#6b7280" }}>
                    No accounts available
                  </Typography>
                ) : (
                  availableAccounts.map((acc) => (
                    <Box
                      key={acc.id}
                      draggable
                      onDragStart={() => handleDragStart(acc)}
                      sx={{
                        p: 1.6,
                        mb: 1,
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e0e7ff",
                        cursor: "grab",
                        "&:hover": { backgroundColor: "#eef2ff" },
                      }}
                    >
                      <Typography fontSize={14}>
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: "#1976d2" }}
                        >
                          Account Name
                        </Box>{" "}
                        → {acc.accountName}
                      </Typography>
                      <Typography fontSize={13}>
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: "#1976d2" }}
                        >
                          Account ID
                        </Box>{" "}
                        → {acc.accountId}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Box>

            {/* CENTER ARROWS (visual only) */}
            <Box
              sx={{
                width: 64,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              {["→", "←"].map((arrow) => (
                <Box
                  key={arrow}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 6px 14px rgba(25,118,210,0.35)",
                  }}
                >
                  {arrow}
                </Box>
              ))}
            </Box>

            {/* RIGHT BOX – ASSIGNED ACCOUNTS */}
            <Box
              sx={{
                flex: 1,
                minHeight: 320,
                borderRadius: "14px",
                border: "2px solid #43a047",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDropToAssigned}
            >
              <Box
                sx={{
                  px: 2.5,
                  py: 1.8,
                  borderBottom: "1px solid #e3e8ef",
                  backgroundColor: "#f1fbf4",
                  borderTopLeftRadius: "14px",
                  borderTopRightRadius: "14px",
                }}
              >
                <Typography fontWeight={700} color="#2e7d32">
                  Associated Account IDs
                </Typography>
              </Box>

              <Box sx={{ flex: 1, m: 2, overflowY: "auto" }}>
                {assignedAccounts.length === 0 ? (
                  <Typography sx={{ p: 2, color: "#6b7280" }}>
                    Drop accounts here
                  </Typography>
                ) : (
                  assignedAccounts.map((acc) => (
                    <Box
                      key={acc.id}
                      draggable
                      onDragStart={() => handleDragStart(acc)}
                      sx={{
                        p: 1.6,
                        mb: 1,
                        borderRadius: "8px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #b7e1c3",
                        cursor: "grab",
                        "&:hover": { backgroundColor: "#e8f5e9" },
                      }}
                    >
                      <Typography fontSize={14}>
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: "#2e7d32" }}
                        >
                          Account Name
                        </Box>{" "}
                        → {acc.accountName}
                      </Typography>
                      <Typography fontSize={13}>
                        <Box
                          component="span"
                          sx={{ fontWeight: 700, color: "#2e7d32" }}
                        >
                          Account ID
                        </Box>{" "}
                        → {acc.accountId}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        )}

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
