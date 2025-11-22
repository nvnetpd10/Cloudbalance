import DataTable from "../../components/common/DataTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Switch } from "@mui/material";

export default function Users() {
  const columns = [
    { name: "First Name", field: "firstName", key: "firstName" },
    { name: "Last Name", field: "lastName", key: "lastName" },
    { name: "Email", field: "email", key: "email" },
    { name: "Roles", field: "roles", key: "roles" },
    { name: "Last Login", field: "lastLogin", key: "lastLogin" },

    // Toggle column
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

    // Edit column
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

    // Delete column
    {
      name: "Delete",
      key: "delete",
      formatter: (row) => (
        <FaTrash
          size={18}
          style={{ cursor: "pointer", color: "#1976d2" }} // blue
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
    {
      id: 5,
      firstName: "Simran",
      lastName: "Arora",
      email: "simran@test.com",
      roles: "Viewer",
      lastLogin: "2025-01-12 12:10",
    },
    {
      id: 6,
      firstName: "Zoya",
      lastName: "Ali",
      email: "zoya@test.com",
      roles: "Editor",
      lastLogin: "2025-01-09 16:55",
    },
    {
      id: 7,
      firstName: "Arjun",
      lastName: "Singh",
      email: "arjun@test.com",
      roles: "Viewer",
      lastLogin: "2025-01-10 08:40",
    },
    {
      id: 8,
      firstName: "Meera",
      lastName: "Joshi",
      email: "meera@test.com",
      roles: "Editor",
      lastLogin: "2025-01-12 10:25",
    },
    {
      id: 9,
      firstName: "Vikram",
      lastName: "Kapoor",
      email: "vikram@test.com",
      roles: "Admin",
      lastLogin: "2025-01-11 17:50",
    },
    {
      id: 10,
      firstName: "Tanya",
      lastName: "Mishra",
      email: "tanya@test.com",
      roles: "Viewer",
      lastLogin: "2025-01-07 09:15",
    },
  ];

  return <DataTable columns={columns} rows={rows} />;
}
