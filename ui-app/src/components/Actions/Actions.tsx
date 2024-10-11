import { Button, Stack } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { v4 as uuidv4 } from "uuid";

interface ActionsProps {}

export const Actions: React.FC<ActionsProps> = () => {
  const {
    setShowSql,
    setQueryExecutionPayload,
    setSelectedQueryTabIndex,
    values: {
      showSql,
      queryExecutionState: queryExecuting,
      queryExecutionPayloads,
    },
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
          setQueryExecutionPayload({
            id: uuidv4(),
            status: "loading",
            seconds: 0,
          });
          setSelectedQueryTabIndex(Object.keys(queryExecutionPayloads).length);
          setShowSql(false);
        }}
      >
        Execute
      </Button>
    </Stack>
  );
};
