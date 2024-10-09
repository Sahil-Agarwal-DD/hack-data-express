export type TreeNode = {
  name: string
  type?: string
  description?: string
  isExpanded?: boolean
  children?: TreeNode[] // children is optional as leaf nodes may not have children
}
