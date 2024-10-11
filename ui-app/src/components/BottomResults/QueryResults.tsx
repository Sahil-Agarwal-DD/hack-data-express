import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chance from "chance";
import { TablePagination } from "@mui/material";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  state: string;
}

const chance = new Chance(42);

function createData(id: number): Data {
  return {
    id,
    firstName: chance.first(),
    lastName: chance.last(),
    age: chance.age(),
    phone: chance.phone(),
    state: chance.state({ full: true }),
  };
}

export const QueryResults = () => {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {
    values: { selectedColumns, calculatedComponents },
  } = useDataExpressStore();

  const tableHeaders = React.useMemo(() => {
    const cols = Object.values(selectedColumns || {}).map(
      (v) => v.alias || v.name
    );
    const calCols = Object.keys(calculatedComponents || {});

    return [...cols, ...calCols];
  }, [selectedColumns, calculatedComponents]);

  const rows: Data[] = React.useMemo(
    () => Array.from({ length: 20 }, (_, index) => createData(index)),
    []
  );

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

  return (
    <div style={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} size="small">
          <TableHead>
            <TableRow>
              {tableHeaders.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row.id}
                //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {tableHeaders.map((col) => (
                  <TableCell component="th" scope="row">
                    {row.firstName}
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
