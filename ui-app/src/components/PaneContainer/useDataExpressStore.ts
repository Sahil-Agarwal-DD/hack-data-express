import { omit } from "lodash";
import { RuleGroupTypeAny } from "react-querybuilder";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type useDataExpressStoreTypeValues = {
  selectedColumns: Record<string, boolean>;
  query?: RuleGroupTypeAny;
};
type useDataExpressStoreType = {
  values: useDataExpressStoreTypeValues;
  setSelectedColumns: (value: string) => void;
  setQuery: (value: RuleGroupTypeAny) => void;
};

const initialValues: useDataExpressStoreTypeValues = {
  selectedColumns: {},
  query: {
    combinator: "and",
    rules: [],
  },
};

export const useDataExpressStore = create<useDataExpressStoreType>()(
  devtools(
    persist(
      immer((set) => ({
        values: initialValues,
        setSelectedColumns(value: string) {
          set((state) => {
            if (state.values.selectedColumns[value]) {
              // remove if already exists
              state.values.selectedColumns = {
                ...omit(state.values.selectedColumns, value),
              };
            } else {
              // add if not exists
              state.values.selectedColumns = {
                ...state.values.selectedColumns,
                [value]: true,
              };
            }
          });
        },
        setQuery(value: RuleGroupTypeAny) {
          set((state) => {
            state.values.query = value;
          });
        },
      })),
      {
        name: "useDataExpressStore",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
    {
      name: "useDataExpressStore",
      enabled: true,
    }
  )
);
