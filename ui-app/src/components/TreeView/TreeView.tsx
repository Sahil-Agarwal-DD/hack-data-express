import * as React from "react";
import { TreeNode } from "./type";
import { TreeViewContainer } from "./TreeView.styles";

import { IconButton, Stack, Tooltip } from "@mui/material";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { DbColumn } from "../DbColumn";

type TreeNodeItemPropsType = {
  node: TreeNode;
  onClick?: (item: TreeNode) => void;
  highlightSelected?: boolean;
  selectedNodes?: Record<string, TreeNode>;
};
type TreeViewPropsType = Omit<TreeNodeItemPropsType, "node"> & {
  treeData: TreeNode[];
};

// Recursive component for rendering tree nodes
const TreeNodeItem: React.FC<TreeNodeItemPropsType> = ({
  node,
  onClick = () => {},
  highlightSelected = false,
  selectedNodes = {},
}) => {
  const [isOpen, setIsOpen] = React.useState(node.isExpanded);

  // Toggle the open state when clicking on a parent node
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    // eslint-disable-next-line no-param-reassign
    node.isExpanded = !isOpen;
  };

  const shouldHighlight = React.useMemo(
    () => highlightSelected && selectedNodes[node.name],
    [highlightSelected, selectedNodes, node.name]
  );

  // Check if the current node has children
  const hasChildren = node.children && node.children.length > 0;

  return (
    <TreeViewContainer className="ml-4">
      <Tooltip title={node.description} arrow>
        <div
          className={`node-item ${shouldHighlight ? "highlight" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick(node);
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, justifyContent: "flex-start", alignItems: "center" }}
          >
            {hasChildren && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOpen();
                }}
                data-testid="icon"
              >
                {isOpen ? <ExpandMore /> : <ChevronRight />}
              </IconButton>
            )}
            <DbColumn node={node} />
          </Stack>
        </div>
      </Tooltip>
      {/* If open, render children recursively */}
      {hasChildren && isOpen && (
        <div className="pl-4">
          {(node?.children || []).map((childNode, i) => (
            <TreeNodeItem
              key={`${childNode.name}-${i}`}
              node={childNode}
              onClick={onClick}
              selectedNodes={selectedNodes}
              highlightSelected={highlightSelected}
            />
          ))}
        </div>
      )}
    </TreeViewContainer>
  );
};

// Tree component that takes treeData as a prop
export const TreeView: React.FC<TreeViewPropsType> = ({
  treeData = [],
  selectedNodes = {},
  ...otherProps
}) => {
  return (
    <div>
      {treeData.map((node, i) => (
        <TreeNodeItem
          {...otherProps}
          selectedNodes={selectedNodes}
          key={`${node.name}-${i}`}
          node={node}
        />
      ))}
    </div>
  );
};
