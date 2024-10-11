import * as React from "react";

import "react-querybuilder/dist/query-builder-layout.css";
import { QueryBuilderStyles } from "./FilterPane.styles";
import { QueryBuilder } from "react-querybuilder";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { Stack } from "@mui/material";
import {
  PaneStackChildren,
  PaneTitle,
  PaneBody,
} from "../PaneContainer.styles";

import { useGetFields } from "../../../hooks/useGetFields";

export const FilterPane: React.FC = () => {
  const setQuery = useDataExpressStore((state) => state.setQuery);
  const query = useDataExpressStore((state) => state.values.query);

  const { fields } = useGetFields();

  return (
    <PaneStackChildren>
      <PaneTitle>
        <Stack>
          <b>Filter Pane</b>
        </Stack>
      </PaneTitle>
      <PaneBody>
        <QueryBuilderStyles>
          {/* @ts-expect-error */}
          <QueryBuilder
            controlClassnames={{ queryBuilder: "queryBuilder-branches" }}
            showCombinatorsBetweenRules={false}
            fields={fields}
            query={query}
            onQueryChange={setQuery}
            showShiftActions
          />
        </QueryBuilderStyles>
      </PaneBody>
    </PaneStackChildren>
  );
};
