import * as React from "react";

import { SelectionPane } from "./subPanes/SelectionPane";
import { DiscoveryPane } from "./subPanes/DiscoveryPane";
import { FilterPane } from "./subPanes/FilterPane";
import { ResultsPane } from "./subPanes/ResultsPane";
import { Button, Grid2 } from "@mui/material";
import { TopBarControl } from "../TopBarControl";
import { Actions } from "../Actions/Actions";
import BottomResults from "../BottomResults/BottomResults";

export const PaneContainer: React.FC = () => {
  return (
    <Grid2 container direction={"column"} spacing={2} padding={1}>
      <Grid2 container spacing={3} size={12}>
        <TopBarControl />
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
      <Grid2 size={12}>
        <Actions />
      </Grid2>
      <Grid2 size={12} height={"50%"}>
        <BottomResults />
      </Grid2>
    </Grid2>
  );
};
