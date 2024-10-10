import { Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import { DxModal } from "../DxModal";
import { API_PATH } from "../../constants";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

interface LoadSavedProps {}

const LoadSaved: React.FC<LoadSavedProps> = () => {
  const {
    values: {
      selectedColumns,
      calculatedComponents,
      query,
      selectedDomain,
      selectedDataMart,
    },
  } = useDataExpressStore();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const onClose = () => {
    setOpen(false);
  };

  const save = () => {
    if (name) {
      fetch(`${API_PATH}/data-express-model`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Ensure the body is sent as JSON
        },
        body: JSON.stringify({
          name,
          value: {
            selectedColumns,
            calculatedComponents,
            query,
            selectedDomain,
            selectedDataMart,
          },
        }),
      })
        .then(() => {
          alert("saved");
        })
        .catch(() => {
          alert("error saving");
        })
        .finally(() => {
          onClose();
        });
    }
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "flex-end",
      }}
      spacing={1}
      style={{ width: 200 }}
    >
      <Button variant="contained" onClick={() => setOpen(true)}>
        Load
      </Button>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Save
      </Button>
      <DxModal
        open={open}
        onClose={onClose}
        onOk={onClose}
        title="Load Existing"
      >
        aaa
      </DxModal>
      <DxModal
        open={open}
        onClose={onClose}
        title="Save"
        onOk={() => {
          save();
        }}
      >
        <TextField
          label="Enter the name for this configuration"
          style={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
      </DxModal>
    </Stack>
  );
};

export default LoadSaved;
