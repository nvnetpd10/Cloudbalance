import { useState, useEffect } from "react";
import { Button, Paper, Chip, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import useUsers from "../../components/hooks/useUsers";

export default function Users() {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [pagedUsers, setPagedUsers] = useState([]);

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
                borderRadius: "4px",
                padding: "4px 6px",
                backgroundColor: "#1976d2",
                color: "#fff",
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
      formatter: () => <Switch defaultChecked />,
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
          color="#1976d2"
          style={{ cursor: "pointer" }}
          onClick={() => alert("Delete " + row.firstName)}
        />
      ),
    },
  ];

  // set default paged users whenever data changes
  useEffect(() => {
    if (users.length) setPagedUsers(users.slice(0, 10));
  }, [users]);

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedUsers(users.slice(start, end));
  };

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

      {loading ? (
        <div
          style={{
            width: "100%",
            height: "280px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <DataTable columns={columns} rows={pagedUsers} />
          <Pagination total={users.length} onPageChange={handlePageChange} />
        </>
      )}
    </>
  );
}
