import * as React from "react";

import { TreeView } from "../../TreeView/TreeView";
import { treeData } from "../../TreeView/sampleTreeView";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { addParentPathsAndGetLeafNodes } from "../../../utils";
import {
  PaneBody,
  PaneFooter,
  PaneStackChildren,
  PaneTitle,
} from "../PaneContainer.styles";
import { Stack, Typography } from "@mui/material";
import { CalculatedComponents } from "../../CalculatedComponents";
import cloneDeep from "lodash/cloneDeep";

export const DiscoveryPane: React.FC = () => {
  const setSelectedColumns = useDataExpressStore(
    (state) => state.setSelectedColumns
  );
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );
  const nodes = useDataExpressStore((state) => state.values.nodes || []);
  const setNodes = useDataExpressStore((state) => state.setNodes);
  const setLeafNodes = useDataExpressStore((state) => state.setLeafNodes);

  React.useEffect(() => {
    const { leafNodes, updatedTree } = addParentPathsAndGetLeafNodes(
      cloneDeep(treeData)
    );
    console.log("====>", { leafNodes, updatedTree });
    setNodes(updatedTree);
    setLeafNodes(leafNodes);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <PaneStackChildren>
        <PaneTitle>
          <Stack>
            <Typography variant="body1">Discovery Pane</Typography>
            <Typography variant="caption">
              Click on the Item to move/remove to and from selection pane
            </Typography>
          </Stack>
        </PaneTitle>
        <PaneBody>
          <TreeView
            selectedNodes={selectedColumns}
            highlightSelected
            treeData={nodes}
            onClick={(item) => {
              if (!item.children || item.children?.length === 0) {
                setSelectedColumns(item);
              }
            }}
          />
        </PaneBody>
        <PaneFooter>
          <CalculatedComponents />
        </PaneFooter>
      </PaneStackChildren>
    </div>
  );
};
