import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Paper, Chip, Box } from "@mui/material";

export default function UsersHeader({
  isAdmin,
  searchTerm,
  onSearchChange,
  activeCount,
  inactiveCount,
  onAddUser,
  users,
  filteredUsers,
  setPagedUsers,
}) {
  useEffect(() => {
    const initialized = filteredUsers.map((user) => ({
      ...user,
      active: user.active !== undefined ? user.active : true,
    }));
    setPagedUsers(initialized.slice(0, 10));
  }, [searchTerm, users]);

  return (
    <Paper
      elevation={2}
      style={{
        padding: "14px 20px",
        marginBottom: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <h3 style={{ margin: 0, color: "#1976d2" }}>USERS</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid #ccc",
          padding: "6px 10px",
          borderRadius: "4px",
          background: "#fff",
          width: "940px",
        }}
      >
        <FaSearch size={18} color="#1976d2" />
        <input
          type="text"
          placeholder="Search user by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ border: "none", outline: "none", fontSize: "14px" }}
        />
      </div>

      {isAdmin && (
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            background: "#f5f7fa",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "6px 12px",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          <Chip label={`Active: ${activeCount}`} color="success" size="small" />
          <Chip
            label={`InActive: ${inactiveCount}`}
            color="error"
            size="small"
          />
        </Box>
      )}

      {isAdmin && (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            paddingLeft: 14,
            paddingRight: 14,
            fontSize: "0.8rem",
          }}
          onClick={onAddUser}
        >
          Add New User
        </Button>
      )}
    </Paper>
  );
}
