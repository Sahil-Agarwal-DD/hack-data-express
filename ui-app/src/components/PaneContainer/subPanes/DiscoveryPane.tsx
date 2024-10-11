import * as React from "react";

import { TreeView } from "../../TreeView/TreeView";
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
import { API_PATH } from "../../../constants";
import { orderBy } from "lodash";

export const DiscoveryPane: React.FC = () => {
  const setSelectedColumns = useDataExpressStore(
    (state) => state.setSelectedColumns
  );
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );
  const setNodes = useDataExpressStore((state) => state.setNodes);
  const setLeafNodes = useDataExpressStore((state) => state.setLeafNodes);

  const { selectedDomain, selectedDataMart } = useDataExpressStore(
    (state) => state.values
  );
  const nodes = useDataExpressStore((state) => state.values.nodes || []);
  const treeNodes = React.useMemo(() => cloneDeep(nodes), [nodes]);

  React.useEffect(() => {
    if (selectedDomain && selectedDataMart) {
      fetch(
        `${API_PATH}/business-model/${selectedDomain.label}/${selectedDataMart.label}`
      )
        .then((v) => v.json())
        .then((v) => {
          const { leafNodes, updatedTree } = addParentPathsAndGetLeafNodes(
            cloneDeep(v?.business_model?.fields || [])
          );
          // orderBy(updatedTree, (v) => v?.children?.length || 0, "desc")
          setNodes(updatedTree);
          setLeafNodes(leafNodes);
        });
    }
  }, [selectedDomain, selectedDataMart]);
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
          {nodes.length === 0 &&
            "Select Domain (finance) and DataMarts to fetch the tree"}
          <TreeView
            selectedNodes={selectedColumns}
            highlightSelected
            treeData={treeNodes}
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
