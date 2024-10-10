import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { ResultsPane } from "../PaneContainer/subPanes/ResultsPane";
import { Box, CircularProgress, Container, Stack } from "@mui/material";
import { QueryExecute } from "./QueryExecute";

interface BottomResultsProps {}

const BottomResults: React.FC<BottomResultsProps> = () => {
  const {
    values: { showSql },
  } = useDataExpressStore();
  return (
    <>
      {showSql && <ResultsPane />}
      <QueryExecute />
    </>
  );
};

export default BottomResults;
