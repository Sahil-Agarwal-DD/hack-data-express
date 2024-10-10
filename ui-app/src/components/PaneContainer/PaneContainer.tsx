import * as React from "react";

import { SelectionPane } from "./subPanes/SelectionPane";
import { DiscoveryPane } from "./subPanes/DiscoveryPane";
import { FilterPane } from "./subPanes/FilterPane";
import { ResultsPane } from "./subPanes/ResultsPane";
import { Grid2, Stack } from "@mui/material";
import { DataDomainDropdown } from "../DataDomainDropdown";
import { DataMartDropdown } from "../DataMartDropdown";

export const PaneContainer: React.FC = () => {
  return (
    <Grid2 container direction={"column"} spacing={2} padding={1}>
      <Grid2 container spacing={3} size={12}>
        <Stack direction="row" spacing={2}>
          <DataDomainDropdown />
          <DataMartDropdown />
        </Stack>
      </Grid2>
      <Grid2 container spacing={2} size={12}>
        <Grid2 size={4}>
          <DiscoveryPane />
        </Grid2>
        <Grid2 size={4}>
          <SelectionPane />
        </Grid2>
        <Grid2 size={4}>
          <FilterPane />
        </Grid2>
      </Grid2>
      <Grid2 size={12} height={"50%"}>
        <ResultsPane />
      </Grid2>
    </Grid2>
  );
};
