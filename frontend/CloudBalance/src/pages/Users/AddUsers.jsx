import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Box, Paper, Typography, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../utils/axios";
import useUserActions from "../../components/hooks/Users/useUserActions";
import useOnBoarding from "../../components/hooks/OnBoarding/useOnBoarding";

import UserFormFields from "./components/UserFormFields";
import CustomerAccountTransfer from "./components/CustomerAccountTransfer";
import { validateUserForm } from "./components/validators";
import useUserAccountsTransfer from "./components/useUserAccountsTransfer";

export default function AddUser() {
  const { open } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addUser, updateUser } = useUserActions();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);
  const { users: accounts, lloading } = useOnBoarding();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const {
    availableAccounts,
    assignedAccounts,
    setAssignedAccounts,
    handleDragStart,
    handleDropToAssigned,
    handleDropToAvailable,
  } = useUserAccountsTransfer(accounts);

  useEffect(() => {
    if (!isEdit) return;

    setLoading(true);

    api
      .get(`/users/${id}`)
      .then((res) => {
        const user = res.data;

        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          role: user.role || "",
          password: "",
        });

        const assigned = Array.isArray(user.accounts) ? user.accounts : [];
        setAssignedAccounts(assigned);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isEdit, id, setAssignedAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = validateUserForm({
      form,
      isEdit,
      assignedAccounts,
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      toast.error(newErrors[firstKey]);
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      active: true,
      accountIds:
        form.role === "Customer" ? assignedAccounts.map((a) => a.id) : [],
    };

    if (!isEdit) payload.password = form.password;
    else if (form.password.trim()) payload.password = form.password;

    try {
      if (isEdit) {
        await updateUser(id, payload);
        toast.success("User updated successfully");
      } else {
        await addUser(payload);
        toast.success("User created successfully");
      }
      navigate("/dashboard/users");
    } catch (error) {
      if (error.response?.status === 409) {
        setErrors({ email: "User with this email already exists" });
        toast.error("User with this email already exists");
      } else if (error.response?.status === 400) {
        setErrors({ general: "Invalid input. Please check all fields." });
        toast.error("Invalid input. Please check all fields.");
      } else {
        setErrors({ general: "Failed to save user" });
        toast.error("Failed to save user");
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
      <ToastContainer position="top-right" autoClose={2000} />

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

        <UserFormFields
          form={form}
          errors={errors}
          isEdit={isEdit}
          onChange={handleChange}
        />

        {form.role === "Customer" && errors.accounts && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.accounts}
          </Typography>
        )}

        {form.role === "Customer" && (
          <CustomerAccountTransfer
            availableAccounts={availableAccounts}
            assignedAccounts={assignedAccounts}
            loadingAccounts={lloading}
            onDragStart={handleDragStart}
            onDropToAssigned={handleDropToAssigned}
            onDropToAvailable={handleDropToAvailable}
          />
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
