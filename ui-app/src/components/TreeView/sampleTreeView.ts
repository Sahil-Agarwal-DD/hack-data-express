import { TreeNode } from './type'

export const treeData: TreeNode[] = [
  {
    name: 'Financials',
    isExpanded: true,
    children: [
      {
        name: 'gov',
        isExpanded: true,
      },
      {
        name: 'delivery_volume',
        isExpanded: true,
      },
      {
        name: 'subtotal',
        isExpanded: true,
      },
      {
        name: 'variable_profit',
        isExpanded: true,
      },
    ],
  },
  {
    name: 'geo',
    isExpanded: true,
    children: [
      {
        name: 'submarket',
        isExpanded: true,
      },
      {
        name: 'market',
        isExpanded: true,
      },
      {
        name: 'region',
        isExpanded: true,
      },
      {
        name: 'country',
        isExpanded: true,
      },
    ],
  },
]
