import * as React from "react";

import { QueryExecutionPayload } from "../../types";
import { Stack, CircularProgress, Typography } from "@mui/material";
import { QueryResults } from "./QueryResults";
import { ActualQueryResults } from "./ActualQueryResults";

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

      {/* errored */}
      {queryExecutionPayload.status === "error" && (
        <Stack direction={"column"}>
          <Typography color="error">Error</Typography>
          <Typography color="error">{queryExecutionPayload.error}</Typography>
        </Stack>
      )}

      {/* simulated */}
      {!queryExecutionPayload.loadedSavedConfigName &&
        queryExecutionPayload.status === "success" && <QueryResults />}

      {/* original */}
      {queryExecutionPayload.loadedSavedConfigName &&
        queryExecutionPayload.status === "success" &&
        queryExecutionPayload?.result?.resultset?.length &&
        (queryExecutionPayload?.result?.resultset?.length > 0 ? (
          <ActualQueryResults
            resultset={queryExecutionPayload?.result?.resultset || []}
          />
        ) : (
          <Typography>No data found</Typography>
        ))}
    </Stack>
  );
};
