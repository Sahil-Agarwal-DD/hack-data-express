import { TreeNode } from "./components/TreeView/type";

export const addParentPathsAndGetLeafNodes = (
  treeData: TreeNode[],
  parentNodes: TreeNode[] = []
): { leafNodes: TreeNode[]; updatedTree: TreeNode[] } => {
  let leafNodes: TreeNode[] = [];
  for (let i = 0, len = treeData.length; i < len; i++) {
    const node = treeData[i];
    node.isExpanded = false;
    if ((node as any).enum_values) {
      node.enumValues = (node as any).enum_values;
    }
    const { children, ...parentNode } = node;
    node.parentNodes = [...parentNodes];
    if (Array.isArray(node.children) && node.children.length > 0) {
      const { leafNodes: childLeafNodes, updatedTree: updatedChildren } =
        addParentPathsAndGetLeafNodes(node.children, [
          ...parentNodes,
          parentNode,
        ]);
      node.children = updatedChildren;
      leafNodes = [...leafNodes, ...childLeafNodes];
    } else {
      leafNodes.push(node);
    }
  }

  return { leafNodes, updatedTree: treeData };
};

export const getFullPathOfNode = (v: TreeNode) => {
  const returnValue = `${
    Array.isArray(v.parentNodes) && v.parentNodes.length > 0
      ? `${v.parentNodes.map((v) => v.name).join("/")}/`
      : ""
  }${v.name}`;

  return returnValue;
};

export const delay = (ts = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ts);
  });
};
