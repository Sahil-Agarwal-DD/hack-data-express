import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { Stack, CircularProgress } from "@mui/material";
import { QueryResults } from "./QueryResults";

interface QueryExecuteProps {}

export const QueryExecute: React.FC<QueryExecuteProps> = () => {
  const {
    values: { queryExecutionState: queryExecuting },
    setQueryExecuting,
  } = useDataExpressStore();

  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let timer: string | number | NodeJS.Timer | undefined;

    timer = setInterval(() => {
      if (queryExecuting !== "loading") {
        clearTimeout(timer);
        setSeconds(0);
      } else {
        setSeconds((v) => v + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [queryExecuting]);

  React.useEffect(() => {
    if (seconds === 5) {
      setSeconds(0);
      setQueryExecuting("success");
    }
  }, [seconds]);

  return (
    <>
      {queryExecuting === "loading" && (
        <Stack
          style={{ height: "30vh", width: "100%", border: "1px solid #ccc" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
          {seconds}
        </Stack>
      )}
      {queryExecuting === "success" && (
        <Stack
          style={{ height: "40vh", width: "100%", border: "1px solid #ccc", overflow: 'auto' }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <QueryResults />
        </Stack>
      )}
    </>
  );
};
