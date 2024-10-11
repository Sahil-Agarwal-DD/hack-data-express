import { Button, Stack } from "@mui/material";
import * as React from "react";
import { SaveModal } from "./SaveModal";
import { FetchSaved } from "./FetchSaved";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { fetchDomainList } from "../../apis";

interface LoadSavedProps {}

export const LoadSaved: React.FC<LoadSavedProps> = () => {
  const {
    reset,
    values: { queryExecutionState: queryExecuting },
  } = useDataExpressStore();

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
        disabled={queryExecuting === "loading"}
        variant="contained"
        onClick={() => {
          reset();
          fetchDomainList();
        }}
      >
        Reset
      </Button>
      <FetchSaved />
      <SaveModal />
    </Stack>
  );
};
