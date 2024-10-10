import * as React from "react";
import { getFullPathOfNode } from "../utils";
import { OptionGroup } from "react-querybuilder";
import { TreeNode } from "../components/TreeView/type";
import { useDataExpressStore } from "../stores/useDataExpressStore";

export const useGetFields = () => {
  const leafNodes = useDataExpressStore((state) => state.values.leafNodes);

  const fields = React.useMemo(() => {
    return (leafNodes || []).map((v: TreeNode) => {
      const returnValue = {
        name: getFullPathOfNode(v),
        label: getFullPathOfNode(v),
      };

      if (v.enumValues) {
        (returnValue as any).valueEditorType = "select";

        (returnValue as any).values = [
          {
            label: v.alias || v.name,
            options: v.enumValues.map((v) => ({ name: v, label: v })),
          },
        ] as OptionGroup[];
      }

      return returnValue;
    });
  }, [leafNodes]);

  return { fields };
};
