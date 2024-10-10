import { Button, Stack } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";

interface ActionsProps {}

export const Actions: React.FC<ActionsProps> = () => {
  const {
    setShowSql,
    setQueryExecuting,
    values: { showSql, queryExecutionState: queryExecuting },
  } = useDataExpressStore();

  return (
    <Stack
      style={{ width: "100%" }}
      direction="row"
      justifyContent={"flex-end"}
      spacing={1}
    >
      <Button variant="outlined" disabled={queryExecuting === "loading"}>
        Explore
      </Button>
      <Button variant="outlined" disabled={queryExecuting === "loading"}>
        Export
      </Button>
      <Button
        disabled={queryExecuting === "loading"}
        variant="outlined"
        onClick={() => {
          setShowSql(!showSql);
        }}
      >
        {showSql ? "Hide SQL" : "View SQL"}
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          setQueryExecuting(
            queryExecuting === "loading" ? "stopped" : "loading"
          );
          setShowSql(false);
        }}
      >
        {queryExecuting === "loading" ? "Stop" : "Execute"}
      </Button>
    </Stack>
  );
};
