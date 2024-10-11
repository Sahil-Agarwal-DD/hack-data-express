import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";

import { DxTooltip } from "../../CommonComponents";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { TreeNode } from "../../TreeView/type";

interface AggregateFunctionsProps {
  node: TreeNode;
}

export const AliasPopover: React.FC<AggregateFunctionsProps> = ({ node }) => {
  const {
    setSelectedColumns,
    values: { selectedColumns },
  } = useDataExpressStore();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentCol = React.useMemo(
    () => selectedColumns[node.parentPath],
    [selectedColumns, node]
  );

  const [alias, setAlias] = React.useState(currentCol.alias);

  const isAliasSet = React.useMemo(
    () => (currentCol?.alias ? true : false),
    [currentCol]
  );

  return (
    <>
      <DxTooltip title="Alias">
        <IconButton size="small" aria-label="alias" onClick={handleClick}>
          <EditIcon fontSize="small" color={isAliasSet ? "info" : undefined} />
        </IconButton>
      </DxTooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1.5}>
          <Stack direction={"row"} px={2} spacing={1}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Enter Alias"
              variant="outlined"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                setSelectedColumns(
                  {
                    ...node,
                    alias: currentCol.alias ? "" : alias,
                  },
                  true
                );
                handleClose();
              }}
            >
              Ok
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
