import DataTable from "../../components/common/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Switch, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

export default function Users() {
  const navigate = useNavigate();

  const columns = [
    {
      name: "First Name",
      field: "firstName",
      key: "firstName",
      sortable: true,
    },
    { name: "Last Name", field: "lastName", key: "lastName", sortable: true },
    { name: "Email", field: "email", key: "email", sortable: true },

    {
      name: "Roles",
      key: "roles",
      formatter: (row) => (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {row.roles.map((role, i) => (
            <Chip
              key={i}
              label={role}
              size="small"
              style={{
                borderRadius: "4px", // square
                padding: "4px 6px",
                backgroundColor: "#1976d2",
                borderColor: "#1976d2",
                color: "#fff", // white text
                fontWeight: 600,
                fontSize: "12px",
              }}
            />
          ))}
        </div>
      ),
    },
    {
      name: "Last Login",
      field: "lastLogin",
      key: "lastLogin",
      sortable: true,
    },

    {
      name: "Active",
      key: "active",
      formatter: (row) => <Switch defaultChecked />,
    },

    {
      name: "Edit",
      key: "edit",
      formatter: (row) => (
        <FaEdit
          size={18}
          color="#1976d2"
          style={{ cursor: "pointer" }}
          onClick={() => alert("Edit " + row.firstName)}
        />
      ),
    },

    {
      name: "Delete",
      key: "delete",
      formatter: (row) => (
        <FaTrash
          size={18}
          color="blue"
          style={{ cursor: "pointer" }}
          onClick={() => alert("Delete " + row.firstName)}
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
      roles: ["Admin", "Manager"],
      lastLogin: "2025-01-10 09:45",
    },
    {
      id: 2,
      firstName: "Rohit",
      lastName: "Sharma",
      email: "rohit@test.com",
      roles: ["Editor"],
      lastLogin: "2025-01-09 14:20",
    },
    {
      id: 3,
      firstName: "Aisha",
      lastName: "Khan",
      email: "aisha@test.com",
      roles: ["Viewer"],
      lastLogin: "2025-01-08 18:05",
    },
    {
      id: 4,
      firstName: "Karan",
      lastName: "Bajaj",
      email: "karan@test.com",
      roles: ["Admin"],
      lastLogin: "2025-01-11 11:30",
    },
    {
      id: 5,
      firstName: "Simran",
      lastName: "Gupta",
      email: "simran@test.com",
      roles: ["Editor", "Viewer"],
      lastLogin: "2025-01-06 16:50",
    },
    {
      id: 6,
      firstName: "Aman",
      lastName: "Verma",
      email: "aman@test.com",
      roles: ["Viewer"],
      lastLogin: "2025-01-10 07:22",
    },
    {
      id: 7,
      firstName: "Priya",
      lastName: "Sethi",
      email: "priya@test.com",
      roles: ["Admin", "Editor"],
      lastLogin: "2025-01-04 13:40",
    },
    {
      id: 8,
      firstName: "Vikas",
      lastName: "Yadav",
      email: "vikas@test.com",
      roles: ["Viewer"],
      lastLogin: "2025-01-03 10:17",
    },
    {
      id: 9,
      firstName: "Meera",
      lastName: "Nair",
      email: "meera@test.com",
      roles: ["Editor"],
      lastLogin: "2025-01-02 19:55",
    },
    {
      id: 10,
      firstName: "Harsh",
      lastName: "Kapoor",
      email: "harsh@test.com",
      roles: ["Admin"],
      lastLogin: "2025-01-01 08:30",
    },
  ];

  return (
    <>
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

      <DataTable columns={columns} rows={rows} />
    </>
  );
}
