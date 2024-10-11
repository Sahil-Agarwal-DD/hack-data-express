import { IconButton } from "@mui/material";
import * as React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { DxTooltip } from "../../CommonComponents";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { DxMenuList } from "../../DxMenuList/DxMenuList";

const timeWindowFunctions = [
  "L7d",
  "L28d",
  "Prior1D",
  "Prior28d",
  "WTD",
  "MTD",
  "YTD",
  "Prior1Y",
];
interface TimeWindowFunctionsProps {
  node: TreeNode;
}

export const TimeWindowFunctions: React.FC<TimeWindowFunctionsProps> = ({
  node,
}) => {
  const {
    setSelectedColumns,
    values: { selectedColumns },
  } = useDataExpressStore();

  const timeWindowOptions = React.useMemo(
    () => timeWindowFunctions.map((v) => ({ label: v })),
    []
  );
  const currentCol = React.useMemo(
    () => selectedColumns[node.parentPath],
    [selectedColumns, node]
  );

  const isTimeWindowSet = React.useMemo(
    () => (currentCol?.period ? true : false),
    [currentCol]
  );

  return (
    <>
      <DxMenuList
        selectedOption={
          currentCol.period ? { label: currentCol.period } : undefined
        }
        menuItems={timeWindowOptions}
        onOptionClick={(opt) => {
          setSelectedColumns(
            {
              ...node,
              period: currentCol.period === opt.label ? undefined : opt.label,
            },
            true
          );
        }}
      >
        <DxTooltip title={`Toggle Time Window Functions ${currentCol?.period ?? ""}`}>
          <IconButton
            size="small"
            aria-label="time-window-functions"
            onClick={() => {}}
          >
            <AccessTimeIcon
              color={isTimeWindowSet ? "info" : undefined}
              fontSize="small"
            />
          </IconButton>
        </DxTooltip>
      </DxMenuList>
    </>
  );
};
