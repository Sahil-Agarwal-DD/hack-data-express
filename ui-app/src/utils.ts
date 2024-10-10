import { TreeNode } from "./components/TreeView/type";

export const addParentPathsAndGetLeafNodes = (
  treeData: TreeNode[],
  parentNodes: TreeNode[] = []
): { leafNodes: TreeNode[]; updatedTree: TreeNode[] } => {
  let leafNodes: TreeNode[] = [];
  for (let i = 0, len = treeData.length; i < len; i++) {
    const node = treeData[i];
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
  console.log("=====>", v);
  const returnValue = `${
    Array.isArray(v.parentNodes) && v.parentNodes.length > 0
      ? `${v.parentNodes.map((v) => v.name).join("/")}/`
      : ""
  }${v.name}`;

  console.log("====>", returnValue);
  return returnValue;
};
