import { Box, TextField, MenuItem } from "@mui/material";

export default function UserFormFields({ form, errors, isEdit, onChange }) {
  return (
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
  );
}
