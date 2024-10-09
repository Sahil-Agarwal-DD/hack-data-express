import omit from "lodash/omit";
import { RuleGroupTypeAny } from "react-querybuilder";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { DataMart, Domain } from "../types";

type useDataExpressStoreTypeValues = {
  selectedColumns: Record<string, boolean>;
  query?: RuleGroupTypeAny;
  domains: Domain[];
  selectedDomain?: Domain | null;
  dataMarts: DataMart[];
  selectedDataMart?: DataMart | null;
};
type useDataExpressStoreType = {
  values: useDataExpressStoreTypeValues;
  setSelectedColumns: (value: string) => void;
  setQuery: (value: RuleGroupTypeAny) => void;
  setDomains: (value: Domain[]) => void;
  setSelectedDomain: (value: Domain | null) => void;
  setDataMarts: (value: DataMart[]) => void;
  setSelectedDataMart: (value: DataMart | null) => void;
};

const initialValues: useDataExpressStoreTypeValues = {
  selectedColumns: {},
  query: {
    combinator: "and",
    rules: [],
  },
  domains: [],
  selectedDomain: undefined,
  dataMarts: [],
  selectedDataMart: undefined,
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
        setDomains(value: Domain[]) {
          set((state) => {
            state.values.domains = value;
          });
        },
        setSelectedDomain(value: Domain | null) {
          set((state) => {
            state.values.selectedDomain = value;
          });
        },
        setDataMarts(value: DataMart[]) {
          set((state) => {
            state.values.dataMarts = value;
          });
        },
        setSelectedDataMart(value: DataMart | null) {
          set((state) => {
            state.values.selectedDataMart = value;
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
