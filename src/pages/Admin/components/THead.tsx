// Thead.tsx
import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material";

interface TheadProps {
  headers: string[]; // Accept an array of strings for table headers
}

const Thead: React.FC<TheadProps> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <TableCell
            key={index}
            sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Thead;
