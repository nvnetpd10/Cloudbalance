import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function AddUser() {
  const { open } = useOutletContext();

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
          Add New User
        </Typography>

        {/* 2-column form but with smaller input box width */}
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
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Last Name"
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            label="Email ID"
            required
            fullWidth
            sx={{ maxWidth: "380px" }}
          />

          <TextField
            select
            label="Select Roles"
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
        >
          Create User
        </Button>
      </Paper>
    </Box>
  );
}
