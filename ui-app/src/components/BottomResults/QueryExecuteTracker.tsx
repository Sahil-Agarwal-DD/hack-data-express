import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { QueryExecutionPayload } from "../../types";

interface QueryExecuteTraclerProps {
  queryExecutionPayload: QueryExecutionPayload;
}

export const QueryExecuteTracker: React.FC<QueryExecuteTraclerProps> = ({
  queryExecutionPayload,
}) => {
  const { setQueryExecutionPayload } = useDataExpressStore();

  const isLoading = React.useMemo(
    () =>
      queryExecutionPayload.status === "loading" ||
      queryExecutionPayload.status === "initial",
    [queryExecutionPayload]
  );

  React.useEffect(() => {
    console.log("====> loading");
    const timer = setInterval(() => {
      if (isLoading) {
        setQueryExecutionPayload({
          ...queryExecutionPayload,
          seconds: queryExecutionPayload.seconds + 1,
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isLoading, queryExecutionPayload]);

  React.useEffect(() => {
    if (
      queryExecutionPayload.seconds === 5 &&
      queryExecutionPayload.status !== "success"
    ) {
      console.log("====> success");
      setQueryExecutionPayload({
        ...queryExecutionPayload,
        status: "success",
        seconds: 0,
      });
    }
  }, [queryExecutionPayload]);

  return null;
};
