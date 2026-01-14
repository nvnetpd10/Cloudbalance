import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../utils/axios";
import { getRole } from "../../utils/auth";

import { Box } from "@mui/material";

import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import FullScreenLoader from "../../components/common/FullScreenLoader";
import useUsers from "../../components/hooks/Users/useUsers";

import UsersHeader from "./components/UsersHeader.jsx";
import ToggleUserDialog from "./components/ToggleUserDialog.jsx";
import { buildUserColumns } from "./components/usersColumns.jsx";

export default function Users() {
  const navigate = useNavigate();
  const { users, loading } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [pagedUsers, setPagedUsers] = useState([]);

  const userRole = getRole()?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      `${u.firstName} ${u.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const activeCount = useMemo(
    () => users.filter((u) => u.active).length,
    [users]
  );
  const inactiveCount = useMemo(
    () => users.filter((u) => u.active === false).length,
    [users]
  );

  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    userId: null,
    newState: null,
    userName: "",
  });

  const handleActiveToggle = (userId, currentState, userName) => {
    setToggleDialog({
      open: true,
      userId,
      newState: !currentState,
      userName,
    });
  };

  const handleConfirmToggle = async () => {
    const { userId, newState } = toggleDialog;

    try {
      await api.patch(`/users/${userId}/active`, { active: newState });

      setPagedUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, active: newState } : u))
      );

      toast.success(
        `User ${newState ? "activated" : "deactivated"} successfully`
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update user status"
      );
    }

    setToggleDialog({
      open: false,
      userId: null,
      newState: null,
      userName: "",
    });
  };

  const handleCloseDialog = () => {
    setToggleDialog((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedUsers(filteredUsers.slice(start, end));
  };

  const columns = useMemo(() => {
    return buildUserColumns({
      isAdmin,
      onToggleActive: handleActiveToggle,
      onEdit: (id) => navigate(`/dashboard/users/edit/${id}`),
    });
  }, [isAdmin, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <UsersHeader
        isAdmin={isAdmin}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
        onAddUser={() => navigate("/dashboard/users/add")}
        onInitPage={() => setPagedUsers(filteredUsers.slice(0, 10))}
        users={users}
        filteredUsers={filteredUsers}
        setPagedUsers={setPagedUsers}
      />

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {loading ? (
          <FullScreenLoader />
        ) : (
          <DataTable columns={columns} rows={pagedUsers} />
        )}

        {!loading && (
          <Pagination
            total={filteredUsers.length}
            onPageChange={handlePageChange}
          />
        )}
      </Box>

      <ToggleUserDialog
        open={toggleDialog.open}
        newState={toggleDialog.newState}
        userName={toggleDialog.userName}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmToggle}
      />
    </>
  );
}
