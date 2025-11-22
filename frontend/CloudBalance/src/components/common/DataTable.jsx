// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// // ---- COMMON STYLING ----
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#ffffff", // white background
//     color: "#1976d2", // blue text
//     fontWeight: 600,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// // ---- REUSABLE TABLE COMPONENT ----
// export default function DataTable({ columns = [], rows = [] }) {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }}>
//         <TableHead>
//           <TableRow>
//             {columns.map((col) => (
//               <StyledTableCell key={col.key || col.field}>
//                 {col.name}
//               </StyledTableCell>
//             ))}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {rows.map((row, index) => (
//             <StyledTableRow key={index}>
//               {columns.map((col) => (
//                 <StyledTableCell key={col.key || col.field}>
//                   {col.formatter
//                     ? col.formatter(row) // 🎉 <-- FIXED
//                     : row[col.field]}
//                 </StyledTableCell>
//               ))}
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// ---- STYLING ----
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "#1976d2",
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable({ columns = [], rows = [] }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const handleSort = (col, index) => {
    // Only allow sorting for first 5 columns
    if (index > 4) return;

    let direction = "asc";
    if (sortConfig.key === col.field && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (
      sortConfig.key === col.field &&
      sortConfig.direction === "desc"
    ) {
      direction = null; // remove sorting
    }

    setSortConfig({ key: col.field, direction });
  };

  const sortedRows = [...rows];

  if (sortConfig.direction) {
    sortedRows.sort((a, b) => {
      const valA = a[sortConfig.key]?.toString().toLowerCase() || "";
      const valB = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
      if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
      return 0;
    });
  }

  const getSortIcon = (col) => {
    if (sortConfig.key !== col.field) return "↕️";
    if (sortConfig.direction === "asc") return "↑";
    if (sortConfig.direction === "desc") return "↓";
    return "↕️";
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <StyledTableCell
                key={col.key}
                onClick={() => handleSort(col, index)}
              >
                {col.name}{" "}
                {index < 5 && (
                  <span style={{ fontSize: 12 }}>{getSortIcon(col)}</span>
                )}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedRows.map((row, index) => (
            <StyledTableRow key={index}>
              {columns.map((col) => (
                <StyledTableCell key={col.key}>
                  {col.formatter ? col.formatter(row) : row[col.field]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
