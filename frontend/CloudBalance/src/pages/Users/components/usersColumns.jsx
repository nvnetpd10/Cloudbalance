import { FaEdit } from "react-icons/fa";
import { Chip, Switch } from "@mui/material";

const formatDateTime = (iso) => {
  if (!iso) return "--";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

export const buildUserColumns = ({
  isAdmin,
  myEmail,
  onToggleActive,
  onEdit,
}) => {
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
      name: "Role",
      key: "role",
      formatter: (row) => (
        <Chip
          label={row.role}
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
      ),
    },
    {
      name: "Last Login",
      field: "lastLogin",
      key: "lastLogin",
      sortable: true,
      formatter: (row) => formatDateTime(row.lastLogin),
    },
  ];

  // if (isAdmin) {
  //   columns.push(
  //     {
  //       name: "Active",
  //       key: "active",
  //       formatter: (row) => (
  //         <Switch
  //           checked={row.active}
  //           onChange={() => onToggleActive(row.id, row.active, row.firstName)}
  //           color="primary"
  //           size="small"
  //         />
  //       ),
  //     },
  //     {
  //       name: "Edit",
  //       key: "edit",
  //       formatter: (row) => (
  //         <FaEdit
  //           size={18}
  //           color="#1976d2"
  //           style={{ cursor: "pointer" }}
  //           onClick={() => onEdit(row.id)}
  //         />
  //       ),
  //     }
  //   );
  // }

  if (isAdmin) {
    columns.push(
      {
        name: "Active",
        key: "active",
        formatter: (row) => {
          const isSelf =
            String(row.email || "")
              .toLowerCase()
              .trim() ===
            String(myEmail || "")
              .toLowerCase()
              .trim();

          return (
            <Switch
              checked={row.active}
              disabled={isSelf} // ✅ disable for self
              onChange={() =>
                onToggleActive(row.id, row.active, row.firstName, row.email)
              } // ✅ pass email
              color="primary"
              size="small"
            />
          );
        },
      },
      {
        name: "Edit",
        key: "edit",
        formatter: (row) => {
          const isSelf =
            String(row.email || "")
              .toLowerCase()
              .trim() ===
            String(myEmail || "")
              .toLowerCase()
              .trim();

          return (
            <FaEdit
              size={18}
              color={isSelf ? "#9e9e9e" : "#1976d2"}
              style={{
                cursor: isSelf ? "not-allowed" : "pointer",
                opacity: isSelf ? 0.5 : 1,
              }}
              onClick={() => onEdit(row.id, row.email)} // ✅ pass email
            />
          );
        },
      }
    );
  }

  return columns;
};
