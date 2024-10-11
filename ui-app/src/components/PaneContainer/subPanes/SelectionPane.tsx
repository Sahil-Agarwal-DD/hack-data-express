import * as React from "react";

import {
  PaneBody,
  PaneStackChildren,
  PaneTitle,
  SelectionItemContainer,
} from "../PaneContainer.styles";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { getFullPathOfNode } from "../../../utils";
import { TreeNode } from "../../TreeView/type";
import { CalculatedColumn } from "../../../types";
import SelectionPaneActions from "./SelectionPaneActions";

const SelectedContainer: React.FC<{
  v: TreeNode;
}> = ({ v }) => {
  return (
    <SelectionItemContainer key={getFullPathOfNode(v)}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{getFullPathOfNode(v)}</Typography>
          {v.alias && (
            <Typography variant="body2" color="secondary">
              as {v.alias}
            </Typography>
          )}
        </Stack>
        <SelectionPaneActions node={v} />
      </Stack>
    </SelectionItemContainer>
  );
};

const CaseWhen: React.FC<{
  v: CalculatedColumn;
}> = ({ v }) => {
  const {
    setEditCalculatedComponent,
    setShowCalculatedModal,
    removeCalculatedComponent,
  } = useDataExpressStore();
  return (
    <SelectionItemContainer>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
        sx={{ mb: 1 }}
      >
        <Typography variant="body2">{v.label}</Typography>

        <Stack direction={"row"}>
          <IconButton
            aria-label="delete"
            onClick={() => {
              removeCalculatedComponent(v);
            }}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => {
              // setSelectedColumns(v);
              setEditCalculatedComponent(v);
              setShowCalculatedModal(true);
            }}
          >
            <EditOutlined />
          </IconButton>
        </Stack>
      </Stack>
    </SelectionItemContainer>
  );
};

export const SelectionPane: React.FC = () => {
  const {
    values: { selectedColumns, calculatedComponents },
  } = useDataExpressStore();

  const caseWhens = React.useMemo(
    () => Object.values(calculatedComponents || {}),
    [calculatedComponents]
  );

  return (
    <PaneStackChildren>
      <PaneTitle>
        <b>Selection Pane</b>
      </PaneTitle>
      <PaneBody>
        <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
          {Object.values(selectedColumns || []).map((v, i) => (
            <SelectedContainer key={getFullPathOfNode(v)} v={v} />
          ))}
          {Object.values(caseWhens || []).map((v, i) => (
            <CaseWhen key={v.label} v={v} />
          ))}
        </Stack>
      </PaneBody>
    </PaneStackChildren>
  );
};
