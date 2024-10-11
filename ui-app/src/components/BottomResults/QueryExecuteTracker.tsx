import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { QueryExecutionPayload } from "../../types";
import { exeQuery } from "../../apis";

interface QueryExecuteTraclerProps {
  queryExecutionPayload: QueryExecutionPayload;
}

export const QueryExecuteTracker: React.FC<QueryExecuteTraclerProps> = ({
  queryExecutionPayload,
}) => {
  const isCallExecuting = React.useRef(false);
  const { setQueryExecutionPayload } = useDataExpressStore();

  const isLoading = React.useMemo(
    () =>
      queryExecutionPayload.status === "loading" ||
      queryExecutionPayload.status === "initial",
    [queryExecutionPayload]
  );

  React.useEffect(() => {
    let timer: string | number | NodeJS.Timer | undefined;
    console.log("====> loading");
    timer = setInterval(() => {
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
      !queryExecutionPayload.loadedSavedConfigName &&
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

  React.useEffect(() => {
    if (
      queryExecutionPayload.loadedSavedConfigName &&
      !isCallExecuting.current
    ) {
      isCallExecuting.current = true;
      exeQuery(queryExecutionPayload.loadedSavedConfigName)
        .then((v) => {
          setQueryExecutionPayload({
            ...queryExecutionPayload,
            status: "success",
            seconds: 0,
            result: v,
          });
        })
        .catch(() => {
          setQueryExecutionPayload({
            ...queryExecutionPayload,
            status: "error",
            seconds: 0,
            result: undefined,
          });
        })
        .finally(() => {
          setTimeout(() => {
            isCallExecuting.current = true;
          });
        });
    }
  }, [queryExecutionPayload]);

  return null;
};
