import * as React from "react";

import "react-querybuilder/dist/query-builder-layout.css";
import { QueryBuilderStyles } from "./FilterPane.styles";
import { OptionGroup, QueryBuilder } from "react-querybuilder";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { getFullPathOfNode } from "../../../utils";
import { Stack } from "@mui/material";
import {
  PaneStackChildren,
  PaneTitle,
  PaneBody,
} from "../PaneContainer.styles";
import { values } from "lodash";

export const FilterPane: React.FC = () => {
  const setQuery = useDataExpressStore((state) => state.setQuery);
  const query = useDataExpressStore((state) => state.values.query);
  const leafNodes = useDataExpressStore((state) => state.values.leafNodes);

  console.log("====> query", query);

  const fields = React.useMemo(() => {
    return (leafNodes || []).map((v: TreeNode) => {
      const returnValue = {
        name: getFullPathOfNode(v),
        label: getFullPathOfNode(v),
      };

      if (v.enumValues) {
        (returnValue as any).valueEditorType = "select";

        (returnValue as any).values = [
          {
            label: v.name,
            options: v.enumValues.map((v) => ({ name: v, label: v })),
          },
        ] as OptionGroup[];
      }

      return returnValue;
    });
  }, [leafNodes]);

  return (
    <PaneStackChildren>
      <PaneTitle>
        <Stack>
          <span>Filter Pane</span>
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
