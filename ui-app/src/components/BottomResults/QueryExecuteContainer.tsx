import * as React from "react";

import { QueryExecutionPayload } from "../../types";
import { Stack, CircularProgress } from "@mui/material";
import { QueryResults } from "./QueryResults";

type QueryExecuteContainerProps = {
  queryExecutionPayload: QueryExecutionPayload;
};

export const QueryExecuteContainer: React.FC<QueryExecuteContainerProps> = ({
  queryExecutionPayload,
}) => {
  const isLoading = React.useMemo(
    () =>
      queryExecutionPayload.status === "loading" ||
      queryExecutionPayload.status === "initial",
    [queryExecutionPayload]
  );

  return (
    <Stack
      style={{
        height: "30vh",
        width: "100%",
        border: "1px solid #ccc",
      }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {isLoading && (
        <>
          <CircularProgress />
          {queryExecutionPayload.seconds}
        </>
      )}
      {queryExecutionPayload.status === "success" && <QueryResults />}
    </Stack>
  );
};
