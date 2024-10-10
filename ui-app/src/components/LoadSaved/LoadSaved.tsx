import { Button, Stack } from "@mui/material";
import * as React from "react";
import { SaveModal } from "./SaveModal";
import { FetchSaved } from "./FetchSaved";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

interface LoadSavedProps {}

export const LoadSaved: React.FC<LoadSavedProps> = () => {
  const { reset } = useDataExpressStore();
  return (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "flex-end",
      }}
      spacing={1}
      style={{ width: 200 }}
    >
      <Button
        variant="contained"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </Button>
      <FetchSaved />

      <SaveModal />
    </Stack>
  );
};
