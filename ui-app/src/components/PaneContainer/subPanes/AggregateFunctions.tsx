import { IconButton } from "@mui/material";
import * as React from "react";
import FunctionsIcon from "@mui/icons-material/Functions";

import { DxTooltip } from "../../CommonComponents";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { DxMenuList } from "../../DxMenuList/DxMenuList";

const aggFunctions = ["SUM", "MAX", "AVG", "MIN", "COUNT", "COUNT_DISTINCT"];
interface AggregateFunctionsProps {
  node: TreeNode;
}

const AggregateFunctions: React.FC<AggregateFunctionsProps> = ({ node }) => {
  const {
    setSelectedColumns,
    values: { selectedColumns },
  } = useDataExpressStore();

  const aggFunOptions = React.useMemo(
    () => aggFunctions.map((v) => ({ label: v })),
    []
  );
  const currentCol = React.useMemo(
    () => selectedColumns[node.parentPath],
    [selectedColumns, node]
  );

  const isAggFunctionSet = React.useMemo(
    () => (currentCol?.aggfun ? true : false),
    [currentCol]
  );

  return (
    <>
      <DxMenuList
        selectedOption={
          currentCol.aggfun ? { label: currentCol.aggfun } : undefined
        }
        menuItems={aggFunOptions}
        onOptionClick={(opt) => {
          setSelectedColumns(
            {
              ...node,
              aggfun: currentCol.aggfun === opt.label ? undefined : opt.label,
            },
            true
          );
        }}
      >
        <DxTooltip title={`Click to Toggle Aggregate Functions ${currentCol?.aggfun ?? ""}`}>
          <IconButton size="small" aria-label="function">
            <FunctionsIcon
              color={isAggFunctionSet ? "info" : undefined}
              fontSize="small"
            />
          </IconButton>
        </DxTooltip>
      </DxMenuList>
    </>
  );
};

export default AggregateFunctions;
