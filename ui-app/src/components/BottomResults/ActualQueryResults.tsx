import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, Typography } from "@mui/material";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

export const ActualQueryResults: React.FC<{ resultset: any[] }> = ({
  resultset = [],
}) => {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    values: { selectedColumns, calculatedComponents },
  } = useDataExpressStore();

  const tableHeaders = React.useMemo(() => {
    const first =
      Array.isArray(resultset) && resultset.length > 0 ? resultset[0] : {};

    const colsFromQuery = Object.keys(first);

    const cols = Object.values(selectedColumns || {}).map(
      (v) => v.alias || v.name
    );
    const calCols = Object.keys(calculatedComponents || {});

    return colsFromQuery.length > 0 ? colsFromQuery : [...cols, ...calCols];
  }, [resultset]);

  const rows = resultset;

  const visibleRows = React.useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, page, rowsPerPage]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (rows.length === 0) {
    return <Typography>No data found.</Typography>;
  }

  return (
    <div style={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow>
              {tableHeaders.map((col, colI) => (
                <TableCell key={`header${colI}`}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, i) => (
              <TableRow
                key={`row${i}`}
                //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableHeaders.map((col, ci) => (
                  <TableCell key={`col${ci}`} component="th" scope="row">
                    {row[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
