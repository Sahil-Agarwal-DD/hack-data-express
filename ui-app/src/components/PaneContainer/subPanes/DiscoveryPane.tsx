import * as React from "react";

import { TreeView } from "../../TreeView/TreeView";
import { treeData } from "../../TreeView/sampleTreeView";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { addParentPathsAndGetLeafNodes } from "../../../utils";

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
    const { leafNodes, updatedTree } = addParentPathsAndGetLeafNodes(treeData);
    console.log("====>", { leafNodes, updatedTree });
    setNodes(updatedTree);
    setLeafNodes(leafNodes);
  }, []);

  return (
    <div style={{ width: "100%" }}>
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
    </div>
  );
};
