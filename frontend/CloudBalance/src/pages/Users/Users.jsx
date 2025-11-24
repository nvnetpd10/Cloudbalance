import DataTable from "../../components/common/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Switch, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  const columns = [
    { name: "First Name", field: "firstName", key: "firstName" },
    { name: "Last Name", field: "lastName", key: "lastName" },
    { name: "Email", field: "email", key: "email" },
    { name: "Roles", field: "roles", key: "roles" },
    { name: "Last Login", field: "lastLogin", key: "lastLogin" },

    {
      name: "Active",
      key: "active",
      formatter: (row) => (
        <Switch
          checked={row.active}
          onChange={() => console.log("Toggled:", row.id)}
          size="small"
        />
      ),
    },
    {
      name: "Edit",
      key: "edit",
      formatter: (row) => (
        <FaEdit
          size={18}
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => console.log("Edit user:", row.id)}
        />
      ),
    },
    {
      name: "Delete",
      key: "delete",
      formatter: (row) => (
        <FaTrash
          size={18}
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => console.log("Delete user:", row.id)}
        />
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      firstName: "Navneet",
      lastName: "Tiwari",
      email: "navneet@test.com",
      roles: "Admin",
      lastLogin: "2025-01-10 09:45",
    },
    {
      id: 2,
      firstName: "Rohit",
      lastName: "Sharma",
      email: "rohit@test.com",
      roles: "Editor",
      lastLogin: "2025-01-09 14:20",
    },
    {
      id: 3,
      firstName: "Aisha",
      lastName: "Khan",
      email: "aisha@test.com",
      roles: "Viewer",
      lastLogin: "2025-01-08 18:05",
    },
    {
      id: 4,
      firstName: "Karan",
      lastName: "Bajaj",
      email: "karan@test.com",
      roles: "Admin",
      lastLogin: "2025-01-11 11:30",
    },
  ];

  return (
    <>
      {/* Header Top Bar */}
      <Paper
        elevation={2}
        style={{
          padding: "14px 20px",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: "#1976d2" }}>USERS</h3>

        {/* Navigate to Add User Page */}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#1976d2",
            textTransform: "none",
            paddingLeft: 18,
            paddingRight: 18,
          }}
          onClick={() => navigate("/dashboard/users/add")}
        >
          Add New User
        </Button>
      </Paper>

      {/* Data Table */}
      <DataTable columns={columns} rows={rows} />
    </>
  );
}
