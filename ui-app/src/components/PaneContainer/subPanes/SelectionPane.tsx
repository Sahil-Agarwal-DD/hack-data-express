import * as React from "react";

import { SelectionItemContainer } from "../PaneContainer.styles";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";

export const SelectionPane: React.FC = () => {
  const {
    values: { selectedColumns },
    setSelectedColumns,
  } = useDataExpressStore();

  return (
    <Stack direction="column" spacing={1} sx={{ mb: 1 }}>
      {Object.keys(selectedColumns || []).map((v, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <SelectionItemContainer key={`${v}-${i}`}>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={1}
            sx={{ mb: 1 }}
          >
            <span>{v}</span>

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
  );
};
