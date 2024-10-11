import * as React from "react";
import { getFullPathOfNode } from "../utils";
import { defaultOperators, OptionGroup } from "react-querybuilder";
import { TreeNode } from "../components/TreeView/type";
import { useDataExpressStore } from "../stores/useDataExpressStore";

const commonOperators = ["null", "notNull"];
export const useGetFields = () => {
  const leafNodes = useDataExpressStore((state) => state.values.leafNodes);

  const fields = React.useMemo(() => {
    return (leafNodes || []).map((v: TreeNode) => {
      const returnValue = {
        name: getFullPathOfNode(v),
        label: getFullPathOfNode(v),
      };

      const hasEnumValues =
        Array.isArray(v.enumValues) && v.enumValues.length > 0;

      if (hasEnumValues) {
        (returnValue as any).valueEditorType = "multiselect";

        (returnValue as any).values = [
          {
            label: v.alias || v.name,
            options: (v?.enumValues || []).map((v) => ({ name: v, label: v })),
          },
        ] as OptionGroup[];

        (returnValue as any).operators = [
          ...defaultOperators.filter((op) =>
            ["=", "!=", "in", "notIn", ...commonOperators].includes(op.name)
          ),
        ];
      }

      if (v.type === "date") {
        (returnValue as any).inputType = "date";
        (returnValue as any).operators = [
          ...defaultOperators.filter((op) =>
            ["=", "!=", ">", "<", ">=", "<=", ...commonOperators].includes(
              op.name
            )
          ),
        ];
      }

      if (v.type === "number" || v.type === "numeric") {
        (returnValue as any).inputType = "number";
        (returnValue as any).operators = [
          ...defaultOperators.filter((op) =>
            ["=", "!=", ">", "<", ">=", "<=", ...commonOperators].includes(
              op.name
            )
          ),
        ];
      }

      if (!hasEnumValues && (v.type === "string" || v.type === "text")) {
        (returnValue as any).inputType = "number";
        (returnValue as any).operators = defaultOperators.filter((op) =>
          [
            "contains",
            "beginsWith",
            "endsWith",
            "doesNotContain",
            "doesNotBeginWith",
            "doesNotEndWith",
            "null",
            "notNull",
            "in",
            "notIn",
          ].includes(op.name)
        );
      }

      return returnValue;
    });
  }, [leafNodes]);

  return { fields };
};
