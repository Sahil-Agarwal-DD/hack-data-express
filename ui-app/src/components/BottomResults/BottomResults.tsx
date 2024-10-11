import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { ResultsPane } from "../PaneContainer/subPanes/ResultsPane";
import { QueryExecute } from "./QueryExecute";
import { Stack } from "@mui/material";

interface BottomResultsProps {}

const BottomResults: React.FC<BottomResultsProps> = () => {
  const {
    values: { showSql },
  } = useDataExpressStore();
  return (
    <Stack spacing={2} direction={"column"}>
      {showSql && <ResultsPane />}
      <QueryExecute />
    </Stack>
  );
};

export default BottomResults;
