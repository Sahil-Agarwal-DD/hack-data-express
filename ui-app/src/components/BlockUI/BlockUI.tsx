import { Backdrop, CircularProgress, Stack } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

interface BlockUIProps {}

export const BlockUI: React.FC<BlockUIProps> = () => {
  const blockUI = useDataExpressStore((state) => state.values.blockUI);
  const setBlockUI = useDataExpressStore((state) => state.setBlockUI);
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={blockUI}
      onClick={() => {
        setBlockUI(false);
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
        <span>Loading</span>
      </Stack>
    </Backdrop>
  );
};
