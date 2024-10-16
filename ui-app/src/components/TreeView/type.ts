export type TreeNode = {
  name: string;
  parentNodes?: TreeNode[];
  aggfun?: string;
  period?: string;
  parentPath: string;
  alias?: string;
  type?: string;
  description?: string;
  isExpanded?: boolean;
  children?: TreeNode[]; // children is optional as leaf nodes may not have children
  enumValues?: string[];
};
