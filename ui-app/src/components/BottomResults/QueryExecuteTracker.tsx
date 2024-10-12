import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { QueryExecutionPayload } from "../../types";
import { exeQuery } from "../../apis";

interface QueryExecuteTraclerProps {
  queryExecutionPayload: QueryExecutionPayload;
}

export const QueryExecuteTracker: React.FC<QueryExecuteTraclerProps> =
  React.memo(({ queryExecutionPayload }) => {
    const isCallExecuting = React.useRef(false);
    const abortControllerRef = React.useRef<AbortController>(null);
    const { setQueryExecutionPayload } = useDataExpressStore();

    const isLoading = React.useMemo(
      () =>
        queryExecutionPayload.status === "loading" ||
        queryExecutionPayload.status === "initial",
      [queryExecutionPayload]
    );

    React.useEffect(() => {
      return () => {
        // Cleanup function to abort any pending requests
        if (abortControllerRef?.current?.abort) {
          abortControllerRef.current?.abort();
        }
      };
    }, []);

    React.useEffect(() => {
      // track original / simulated

      let timer: string | number | NodeJS.Timer | undefined;

      timer = setInterval(() => {
        console.log("====> isLoading", queryExecutionPayload, isLoading);
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
      // track simulated
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
      // track original
      if (
        queryExecutionPayload.loadedSavedConfigName &&
        ["loading", "failed"].includes(queryExecutionPayload.status) &&
        !isCallExecuting.current
      ) {
        isCallExecuting.current = true;
        const newAbortController = new AbortController();
        // @ts-ignore
        abortControllerRef.current = newAbortController;

        exeQuery(
          queryExecutionPayload.loadedSavedConfigName,
          newAbortController.signal
        )
          .then((v) => {
            setQueryExecutionPayload({
              ...queryExecutionPayload,
              status: "success",
              seconds: 0,
              result: v,
            });
          })
          .catch((error) => {
            if (error.name !== "AbortError") {
              setQueryExecutionPayload({
                ...queryExecutionPayload,
                status: "error",
                error: JSON.stringify({
                  name: error?.name,
                  code: error?.code,
                  message: error.message,
                }),
                seconds: 0,
                result: undefined,
              });
            }
          })
          .finally(() => {
            setTimeout(() => {
              isCallExecuting.current = false;
            });
          });
      }
    }, [queryExecutionPayload]);

    return null;
  });
