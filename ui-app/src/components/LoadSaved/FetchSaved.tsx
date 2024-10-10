import * as React from "react";
import { DxModal } from "../DxModal";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";
import { Button, Stack } from "@mui/material";
import { delay } from "../../utils";

interface SaveModalProps {}

export const FetchSaved: React.FC<SaveModalProps> = () => {
  const {
    reset,
    load,
    setBlockUI,
    setSelectedDataMart,
    setSelectedDomain,
    values: { queryExecutionState: queryExecuting },
  } = useDataExpressStore();

  const [open, setOpen] = React.useState(false);

  const [list, setList] = React.useState<string[]>([]);

  const onClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch(`${API_PATH}/data-express-model/name-list`)
      .then((v) => v.json())
      .then((v) => {
        setList(v as string[]);
      })
      .catch(() => {
        alert("error loading");
      });
  }, []);

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
      })
      .catch(() => {
        reset();
        alert("error loading");
        setBlockUI(false);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        disabled={queryExecuting === "loading"}
      >
        Load
      </Button>

      <DxModal
        open={open}
        onClose={onClose}
        title="Save"
        onOk={() => {
          //   save();
        }}
      >
        Click on anyone to load that configuration
        <Stack
          direction={"column"}
          sx={{
            justifyContent: "flex-start",
          }}
          style={{ width: "30%" }}
        >
          {list.map((v) => (
            <Button
              variant="text"
              key={v}
              onClick={() => {
                loadSelected(v);
              }}
            >
              {v}
            </Button>
          ))}
        </Stack>
      </DxModal>
    </>
  );
};
