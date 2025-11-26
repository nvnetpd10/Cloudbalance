import { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Chip,
  Switch,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import useUsers from "../../components/hooks/useUsers";
import FullScreenLoader from "../../components/common/FullScreenLoader";

export default function Users() {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [pagedUsers, setPagedUsers] = useState([]);
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    message: "",
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: null,
    userName: "",
  });

  const handleDeleteClick = (id, name) => {
    setDeleteDialog({
      open: true,
      userId: id,
      userName: name,
    });
  };

  const handleConfirmDelete = () => {
    const id = deleteDialog.userId;

    const updatedPaged = pagedUsers.filter((u) => u.id !== id);
    setPagedUsers(updatedPaged);

    users.splice(
      users.findIndex((u) => u.id === id),
      1
    );

    setDeleteDialog({ open: false, userId: null, userName: "" });
  };

  const handleCloseDelete = () => {
    setDeleteDialog({ open: false, userId: null, userName: "" });
  };

  const handleActiveToggle = (userId, currentState) => {
    // First, update the switch state
    const updatedPagedUsers = pagedUsers.map((user) =>
      user.id === userId ? { ...user, active: !currentState } : user
    );
    setPagedUsers(updatedPagedUsers);

    // Then show the alert
    const newState = !currentState;
    setAlertDialog({
      open: true,
      message: `User has been ${
        newState ? "activated" : "deactivated"
      } successfully!`,
    });
  };

  const handleCloseAlert = () => {
    setAlertDialog({ open: false, message: "" });
  };

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
      formatter: (row) => (
        <Switch
          checked={row.active}
          onChange={() => handleActiveToggle(row.id, row.active)}
          color="primary"
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
          onClick={() => handleDeleteClick(row.id, row.firstName)}
        />
      ),
    },
  ];

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

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading && <FullScreenLoader />}
        <DataTable columns={columns} rows={pagedUsers} />
        <Pagination total={users.length} onPageChange={handlePageChange} />
      </Box>

      <Dialog open={alertDialog.open} onClose={handleCloseAlert}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>{alertDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAlert}
            color="primary"
            variant="contained"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.userName}</strong>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
