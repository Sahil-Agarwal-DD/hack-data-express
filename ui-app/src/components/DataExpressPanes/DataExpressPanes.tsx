import * as React from 'react'
import { DataExpressLayout } from './DataExpressPanes.styles'
import { PaneContainer } from '../PaneContainer/PaneContainer'

export const DataExpressPanes: React.FC = () => {
  return (
    <DataExpressLayout>
      <PaneContainer />
    </DataExpressLayout>
  )
}
