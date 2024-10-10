import {
  Calculate,
  CalendarMonth,
  Numbers,
  TextSnippet,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { TreeNode } from "../TreeView/type";

interface DbColumnProps {
  node: TreeNode;
}

export const DbColumn: React.FC<DbColumnProps> = ({ node }) => {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        mb: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {!hasChildren && <span>&nbsp;</span>}
      {node.type === "number" && (
        <Numbers
          style={{
            fontSize: 12,
          }}
        />
      )}
      {node.type === "string" && (
        <TextSnippet
          style={{
            fontSize: 12,
          }}
        />
      )}
      {node.type === "date" && (
        <CalendarMonth
          style={{
            fontSize: 12,
          }}
        />
      )}
      {node.type === "calc" && (
        <Calculate
          style={{
            fontSize: 12,
          }}
        />
      )}
      <Typography variant="body2">{node.name}</Typography>
    </Stack>
  );
};
