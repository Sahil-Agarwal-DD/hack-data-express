import * as React from "react";

import "react-querybuilder/dist/query-builder-layout.css";
import { QueryBuilderStyles } from "./FilterPane.styles";
import { QueryBuilder } from "react-querybuilder";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { getFullPathOfNode } from "../../../utils";

export const FilterPane: React.FC = () => {
  const setQuery = useDataExpressStore((state) => state.setQuery);
  const query = useDataExpressStore((state) => state.values.query);
  const leafNodes = useDataExpressStore((state) => state.values.leafNodes);

  console.log("====> query", query);

  const fields = React.useMemo(() => {
    return (leafNodes || []).map((v: TreeNode) => ({
      name: v.name,
      label: getFullPathOfNode(v),
    }));
  }, [leafNodes]);

  return (
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
  );
};
