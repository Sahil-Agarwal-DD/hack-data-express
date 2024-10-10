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

const SelectedContainer: React.FC<{
  v: TreeNode;
}> = ({ v }) => {
  const { setSelectedColumns } = useDataExpressStore();
  return (
    <SelectionItemContainer key={getFullPathOfNode(v)}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
        sx={{ mb: 1 }}
      >
        <Typography variant="body2">{getFullPathOfNode(v)}</Typography>

        <IconButton
          aria-label="delete"
          onClick={() => {
            setSelectedColumns(v);
          }}
        >
          <CloseIcon />
        </IconButton>
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
    values: { selectedColumns, calculatedComponents: calculatedConmponents },
  } = useDataExpressStore();

  const caseWhens = React.useMemo(
    () => Object.values(calculatedConmponents || {}),
    [calculatedConmponents]
  );

  return (
    <PaneStackChildren>
      <PaneTitle>
        <span>Selection Pane</span>
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
