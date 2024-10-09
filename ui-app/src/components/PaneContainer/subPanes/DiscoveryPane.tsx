import * as React from "react";

import { TreeView } from "../../TreeView/TreeView";
import { treeData } from "../../TreeView/sampleTreeView";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";

export const DiscoveryPane: React.FC = () => {
  const setSelectedColumns = useDataExpressStore(
    (state) => state.setSelectedColumns
  );
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );

  return (
    <div style={{ width: "100%" }}>
      <TreeView
        selectedNodes={selectedColumns}
        highlightSelected
        treeData={treeData}
        onClick={(item) => {
          console.log(item);
          setSelectedColumns(item);
        }}
      />
    </div>
  );
};
