// import { useState, useEffect } from "react";
// import {
//   Paper,
//   Button,
//   Chip,
//   Switch,
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Typography,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { getRole } from "../../utils/auth"; // Role utility import ki
// import DataTable from "../../components/common/DataTable";
// import Pagination from "../../components/common/DataPagination";
// import FullScreenLoader from "../../components/common/FullScreenLoader";
// import useOnBoarding from "../../components/hooks/OnBoarding/useOnBoarding";

// export default function Onboarding() {
//   const navigate = useNavigate();
//   const { users: accounts, lloading } = useOnBoarding();
//   const [pagedAccounts, setPagedAccounts] = useState([]);

//   // LOGIC: Case-insensitive role check
//   const userRole = getRole()?.toUpperCase() || "";
//   const isAdmin = userRole === "ADMIN";

//   useEffect(() => {
//     if (accounts.length) {
//       setPagedAccounts(accounts.slice(0, 5));
//     }
//   }, [accounts]);

//   const [toggleDialog, setToggleDialog] = useState({
//     open: false,
//     accountId: null,
//     newState: null,
//   });

//   const handleConfirmToggle = () => {
//     const { accountId, newState } = toggleDialog;
//     setPagedAccounts((prev) =>
//       prev.map((acc) =>
//         acc.accountId === accountId ? { ...acc, scheduler: newState } : acc
//       )
//     );
//     setToggleDialog({ open: false, accountId: null, newState: null });
//   };

//   const handlePageChange = (page, rowsPerPage) => {
//     const start = page * rowsPerPage;
//     const end = start + rowsPerPage;
//     setPagedAccounts(accounts.slice(start, end));
//   };

//   const columns = [
//     {
//       name: "ID",
//       key: "id",
//     },
//     {
//       name: "Account ID",
//       key: "accountId",
//     },
//     {
//       name: "Account Name",
//       key: "accountName",
//     },
//     {
//       name: "ARN",
//       key: "arn",
//     },
//   ];

//   return (
//     <>
//       <Box sx={{ mb: 2, mt: 2 }}>
//         <Typography variant="h5" fontWeight={600}>
//           Accounts
//         </Typography>
//       </Box>

//       <Paper
//         elevation={2}
//         sx={{
//           p: 2,
//           mb: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h3 style={{ margin: 0 }}>Displaying all connected AWS accounts</h3>

//         {/* LOGIC: Link Account button sirf ADMIN ko dikhega */}
//         {isAdmin && (
//           <Button
//             variant="contained"
//             onClick={() => navigate("/dashboard/onboarding/create-iam-role")}
//           >
//             + Link Account
//           </Button>
//         )}
//       </Paper>

//       <Box sx={{ position: "relative", minHeight: "400px" }}>
//         {lloading ? (
//           <FullScreenLoader />
//         ) : (
//           <>
//             <DataTable columns={columns} rows={pagedAccounts} />
//             <Pagination
//               total={accounts.length}
//               onPageChange={handlePageChange}
//             />
//           </>
//         )}
//       </Box>

//       <Dialog open={toggleDialog.open} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ fontWeight: 600 }}>
//           {toggleDialog.newState ? "Enable Scheduler" : "Disable Scheduler"}
//         </DialogTitle>

//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to{" "}
//             <strong>{toggleDialog.newState ? "enable" : "disable"}</strong>{" "}
//             scheduler for account <strong>{toggleDialog.accountId}</strong>?
//           </DialogContentText>
//         </DialogContent>

//         <DialogActions>
//           <Button
//             onClick={() =>
//               setToggleDialog({
//                 open: false,
//                 accountId: null,
//                 newState: null,
//               })
//             }
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmToggle} variant="contained">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import {
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRole } from "../../utils/auth";
import DataTable from "../../components/common/DataTable";
import Pagination from "../../components/common/DataPagination";
import FullScreenLoader from "../../components/common/FullScreenLoader";
import useOnBoarding from "../../components/hooks/OnBoarding/useOnBoarding";

export default function Onboarding() {
  const navigate = useNavigate();
  const { users: accounts, lloading } = useOnBoarding();

  const [pagedAccounts, setPagedAccounts] = useState([]);
  const [toggleDialog, setToggleDialog] = useState({
    open: false,
    accountId: null,
    newState: null,
  });

  const userRole = getRole()?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  // ✅ ALWAYS slice when accounts change
  useEffect(() => {
    setPagedAccounts(accounts.slice(0, 5));
  }, [accounts]);

  const handlePageChange = (page, rowsPerPage) => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    setPagedAccounts(accounts.slice(start, end));
  };

  const columns = [
    {
      name: "ID",
      field: "id",
      key: "id",
      sortable: true,
    },
    {
      name: "Account ID",
      field: "accountId",
      key: "accountId",
      sortable: true,
    },
    {
      name: "Account Name",
      field: "accountName",
      key: "accountName",
      sortable: true,
    },
    {
      name: "ARN",
      field: "arn",
      key: "arn",
      sortable: false,
    },
  ];

  return (
    <>
      <Box sx={{ mb: 2, mt: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Accounts
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Displaying all connected AWS accounts</h3>

        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard/onboarding/create-iam-role")}
          >
            + Link Account
          </Button>
        )}
      </Paper>

      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {lloading ? (
          <FullScreenLoader />
        ) : (
          <>
            <DataTable columns={columns} rows={pagedAccounts} />

            {accounts.length > 0 && (
              <Pagination
                total={accounts.length}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Box>

      <Dialog open={toggleDialog.open} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {toggleDialog.newState ? "Enable Scheduler" : "Disable Scheduler"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to{" "}
            <strong>{toggleDialog.newState ? "enable" : "disable"}</strong>{" "}
            scheduler for account <strong>{toggleDialog.accountId}</strong>?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setToggleDialog({
                open: false,
                accountId: null,
                newState: null,
              })
            }
          >
            Cancel
          </Button>
          <Button variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
