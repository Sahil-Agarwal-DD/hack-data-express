import * as React from "react";

import "react-querybuilder/dist/query-builder-layout.css";
import { QueryBuilderStyles } from "./FilterPane.styles";
import { QueryBuilder } from "react-querybuilder";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";

export const FilterPane: React.FC = () => {
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );
  const setQuery = useDataExpressStore((state) => state.setQuery);
  const query = useDataExpressStore((state) => state.values.query);

  console.log("====> query", query);

  const fields = React.useMemo(() => {
    return (Object.keys(selectedColumns) || []).map((v: string) => ({
      name: v,
      label: v,
    }));
  }, [selectedColumns]);

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
