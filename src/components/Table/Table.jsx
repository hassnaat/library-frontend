import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "./Table.css";
const CustomTable = ({ headings, students, type, books }) => {
  const navigate = useNavigate();

  const formatDate = (ts) => {
    console.log(ts);
    const date = new Date(ts);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getYear()}`;
  };
  const formatUnixTimestamp = (ts) => {
    console.log(ts);
    const date = new Date(ts * 1000);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getYear()}`;
  };

  const handleClick = (id, sid) => {
    navigate(`/books/${id}?sid=${sid}`);
  };

  return (
    <div className="table_wrap">
      {type === "student" && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {type === "books" && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Borrowed By</TableCell>
                <TableCell>Borrowed At</TableCell>
                <TableCell>Return Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((row, index) => {
                const borrowed_by = students.filter((student) => {
                  return student.id === row.borrowed_by;
                });
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick(row.book, row.borrowed_by)}
                  >
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      {borrowed_by.length > 0
                        ? `${borrowed_by[0].first_name} ${borrowed_by[0].last_name}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {borrowed_by.length > 0
                        ? `${formatDate(row.created_at)}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {borrowed_by.length > 0
                        ? `${formatUnixTimestamp(row.return_date)}`
                        : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CustomTable;
