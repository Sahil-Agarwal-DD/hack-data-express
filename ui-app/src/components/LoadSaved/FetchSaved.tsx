import Chance from "chance";

import * as React from "react";
import { DxModal } from "../DxModal";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { delay } from "../../utils";
import { DxMenuList, DxMenuListItem } from "../DxMenuList/DxMenuList";
import { fetchTemplates } from "../../apis";

type ConfigRow = {
  name: string;
  createdBy: string;
  createdAt: string;
};
const chance = new Chance();
const menuItems = ["Saved", "Template"];

interface SaveModalProps {}

const rowsPerPage = 5;

export const FetchSaved: React.FC<SaveModalProps> = () => {
  const {
    reset,
    load,
    setBlockUI,
    setSelectedDataMart,
    setSelectedDomain,
    setLoadedSavedConfigName,
    values: { queryExecutionState: queryExecuting },
  } = useDataExpressStore();

  const [selectedLoadOption, setSelectedLoadOption] = React.useState<
    "saved" | "template"
  >();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [list, setList] = React.useState<ConfigRow[]>([]);

  const onClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    fetch(`${API_PATH}/data-express-model/name-list`)
      .then((v: any) => v.json())
      .then((v: any) => {
        setList(v as ConfigRow[]);
      })
      .catch(() => {
        alert("error loading");
      })
      .finally(() => {
        setPage(0);
      });
  };
  const fetchTemplatesHelper = () => {
    fetchTemplates()
      .then((v: any) => {
        setList(
          (v?.query_templates_list as string[]).map(
            (v) =>
              ({
                name: v,
                createdBy: `${chance.first()}.${chance.last()}@doordash.com`,
                createdAt: chance.date().toISOString(),
              } as ConfigRow)
          )
        );
      })
      .catch(() => {
        alert("error loading");
      })
      .finally(() => {
        setPage(0);
      });
  };

  const loadAsync = async (data: any) => {
    setBlockUI(true);
    try {
      await delay();
      setSelectedDomain(data.selectedDomain);
      setSelectedDataMart(data.selectedDataMart);

      // wait for domain list to fetch
      await delay(2000);
      load({
        query: data.query,
        selectedColumns: data.selectedColumns,
        calculatedComponents: data.calculatedComponents,
        blockUI: true,
      });
      //   setSelectedColumns(data.selectedColumns);
      await delay(2000);
      setBlockUI(false);
      //   setCalculatedComponent(data.calculatedComponents);
    } catch (err) {
      console.error(err);
      setBlockUI(false);
    }
  };

  const loadSelected = async (name: string) => {
    onClose();
    await delay(500);
    setBlockUI(true);
    fetch(`${API_PATH}/data-express-model/${name}`)
      .then((v) => v.json())
      .then((v) => {
        // setList(v as string[]);
        console.log("====> loaded values", v);
        reset();
        loadAsync(v.data_express_model.value);
        setLoadedSavedConfigName(name);
      })
      .catch(() => {
        reset();
        alert("error loading");
        setBlockUI(false);
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(
    () => [...list].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, list]
  );

  const menuItemsInput = React.useMemo(
    () => menuItems.map((v) => ({ label: v })),
    []
  );

  const onOptionClicked = (opt: DxMenuListItem) => {
    switch (opt.label) {
      case "Saved":
        fetchData();
        setOpen(true);
        setSelectedLoadOption("saved");
        break;
      case "Template":
        fetchTemplatesHelper();
        setOpen(true);
        setSelectedLoadOption("template");
        break;
    }
  };

  return (
    <>
      <DxMenuList menuItems={menuItemsInput} onOptionClick={onOptionClicked}>
        <Button variant="contained" disabled={queryExecuting === "loading"}>
          Load
        </Button>
      </DxMenuList>
      <DxModal
        open={open}
        maxWidth="md"
        onClose={onClose}
        title={
          selectedLoadOption === "saved" ? "Saved Configurations" : "Templates"
        }
        onOk={() => {}}
      >
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          <Typography>
            Click on any "
            {selectedLoadOption === "saved" ? "Config Name" : "Template Name"}"
            to load that configuration
          </Typography>
          <br />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    {selectedLoadOption === "saved"
                      ? "Config Name"
                      : "Template Name"}
                  </TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="text"
                        onClick={() => {
                          loadSelected(row.name);
                        }}
                      >
                        {row.name}
                      </Button>
                    </TableCell>
                    <TableCell>{row.createdBy}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[rowsPerPage]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Stack>
      </DxModal>
    </>
  );
};
