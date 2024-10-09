import * as React from "react";

import {
  PaneBody,
  PaneFooter,
  PaneStackChildren,
  PaneTitle,
} from "./PaneContainer.styles";
import { SelectionPane } from "./subPanes/SelectionPane";
import { DiscoveryPane } from "./subPanes/DiscoveryPane";
import { FilterPane } from "./subPanes/FilterPane";
import { ResultsPane } from "./subPanes/ResultsPane";
import { Grid2, Stack, Typography } from "@mui/material";
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
          <PaneStackChildren>
            <PaneTitle>
              <Stack>
                <Typography variant="body1">Discovery Pane</Typography>
                <Typography variant="caption">
                  Click on the Item to move/remove to and from selection pane
                </Typography>
              </Stack>
            </PaneTitle>
            <PaneBody>
              <DiscoveryPane />
            </PaneBody>
            <PaneFooter>Calculated Components</PaneFooter>
          </PaneStackChildren>
        </Grid2>
        <Grid2 size={4}>
          <PaneStackChildren>
            <PaneTitle>
              <span>Selection Pane</span>
            </PaneTitle>
            <PaneBody>
              <SelectionPane />
            </PaneBody>
          </PaneStackChildren>
        </Grid2>
        <Grid2 size={4}>
          <PaneStackChildren>
            <PaneTitle>
              <Stack>
                <span>Filter Pane</span>
              </Stack>
            </PaneTitle>
            <PaneBody>
              <FilterPane />
            </PaneBody>
          </PaneStackChildren>
        </Grid2>
      </Grid2>
      <Grid2 size={12} height={"50%"}>
        <ResultsPane />
      </Grid2>
    </Grid2>
  );
};
