import * as React from "react";

import {
  PaneBody,
  PaneStackChildren,
  PaneTitle,
  SelectionItemContainer,
} from "../PaneContainer.styles";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { getFullPathOfNode } from "../../../utils";

export const SelectionPane: React.FC = () => {
  const {
    values: { selectedColumns },
    setSelectedColumns,
  } = useDataExpressStore();

  return (
    <PaneStackChildren>
      <PaneTitle>
        <span>Selection Pane</span>
      </PaneTitle>
      <PaneBody>
        <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
          {Object.values(selectedColumns || []).map((v, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SelectionItemContainer key={`${v}-${i}`}>
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
          ))}
        </Stack>
      </PaneBody>
    </PaneStackChildren>
  );
};
