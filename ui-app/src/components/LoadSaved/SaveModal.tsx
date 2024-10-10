import * as React from "react";
import { DxModal } from "../DxModal";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";
import { Button, TextField } from "@mui/material";

interface SaveModalProps {}

export const SaveModal: React.FC<SaveModalProps> = () => {
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
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Save
      </Button>

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
    </>
  );
};
