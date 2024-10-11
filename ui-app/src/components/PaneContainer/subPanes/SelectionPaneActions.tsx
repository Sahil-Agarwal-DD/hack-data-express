import { Stack, IconButton } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FunctionsIcon from "@mui/icons-material/Functions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { DxTooltip } from "../../CommonComponents";

type SelectionPaneActionsProps = {
  node: TreeNode;
};

const SelectionPaneActions: React.FC<SelectionPaneActionsProps> = ({
  node,
}) => {
  const {
    setSelectedColumns,
    setShowAggFunctionModal,
    setShowTimeWindowFunctionModal,
  } = useDataExpressStore();

  return (
    <Stack direction={"row"}>
      <DxTooltip title="Aggregate Functions">
        <IconButton
          size="small"
          aria-label="function"
          onClick={() => {
            setShowAggFunctionModal(true);
          }}
        >
          <FunctionsIcon />
        </IconButton>
      </DxTooltip>
      <DxTooltip title="Time Window Functions">
        <IconButton
          size="small"
          aria-label="time-window-functions"
          onClick={() => {
            setShowTimeWindowFunctionModal(true);
          }}
        >
          <AccessTimeIcon />
        </IconButton>
      </DxTooltip>
      <DxTooltip title="Remove">
        <IconButton
          size="small"
          aria-label="delete"
          onClick={() => {
            setSelectedColumns(node);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </DxTooltip>
    </Stack>
  );
};

export default SelectionPaneActions;
