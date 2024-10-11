import { Stack, IconButton } from "@mui/material";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";
import { DxTooltip } from "../../CommonComponents";
import AggregateFunctions from "./AggregateFunctions";
import { TimeWindowFunctions } from "./TimeWindowFunctions";
import { AliasPopover } from "./AliasPopover";

type SelectionPaneActionsProps = {
  node: TreeNode;
};

const SelectionPaneActions: React.FC<SelectionPaneActionsProps> = ({
  node,
}) => {
  const { setSelectedColumns } = useDataExpressStore();

  return (
    <Stack direction={"row"}>
      <AggregateFunctions node={node} />
      <TimeWindowFunctions node={node} />
      <AliasPopover node={node} />
      <DxTooltip title="Remove">
        <IconButton
          size="small"
          aria-label="delete"
          onClick={() => {
            setSelectedColumns(node);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </DxTooltip>
    </Stack>
  );
};

export default SelectionPaneActions;
