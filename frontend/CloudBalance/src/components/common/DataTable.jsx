import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    direction: null,
  });

  const handleSort = (col) => {
    if (!col.sortable) return;

    let direction = "asc";

    if (sortConfig.key === col.field && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (
      sortConfig.key === col.field &&
      sortConfig.direction === "desc"
    ) {
      direction = null;
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
    if (!col.sortable) return null;

    const style = { fontSize: 12, marginLeft: 4, opacity: 0.8 };

    if (sortConfig.key !== col.field) return <span style={style}>⇅</span>;

    if (sortConfig.direction === "asc") return <span style={style}>⇑</span>;
    if (sortConfig.direction === "desc") return <span style={style}>⇓</span>;

    return <span style={style}>⇅</span>;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell
                key={col.key}
                onClick={() => handleSort(col)}
                style={{ cursor: col.sortable ? "pointer" : "default" }}
              >
                {col.name} {getSortIcon(col)}
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
