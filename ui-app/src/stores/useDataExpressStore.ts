import omit from "lodash/omit";
import { RuleGroupTypeAny } from "react-querybuilder";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CalculatedColumn, DataMart, Domain } from "../types";
import { TreeNode } from "../components/TreeView/type";

type useDataExpressStoreTypeValues = {
  selectedColumns: Record<string, TreeNode>;
  query?: RuleGroupTypeAny;
  calculatedComponents?: Record<string, CalculatedColumn>;
  editCalculatedComponent?: CalculatedColumn | null;
  domains: Domain[];
  selectedDomain?: Domain | null;
  dataMarts: DataMart[];
  selectedDataMart?: DataMart | null;
  leafNodes: TreeNode[];
  nodes: TreeNode[];
  showCalculatedModal: boolean;
};
type useDataExpressStoreType = {
  values: useDataExpressStoreTypeValues;
  setSelectedColumns: (value: TreeNode) => void;
  setQuery: (value: RuleGroupTypeAny) => void;
  setDomains: (value: Domain[]) => void;
  setSelectedDomain: (value: Domain | null) => void;
  setDataMarts: (value: DataMart[]) => void;
  setSelectedDataMart: (value: DataMart | null) => void;
  setLeafNodes: (value: TreeNode[]) => void;
  setNodes: (value: TreeNode[]) => void;
  setCalculatedComponent: (value: CalculatedColumn) => void;
  removeCalculatedComponent: (value: CalculatedColumn) => void;
  setShowCalculatedModal: (value: boolean) => void;
  setEditCalculatedComponent: (value: CalculatedColumn | null) => void;
};

const initialValues: useDataExpressStoreTypeValues = {
  selectedColumns: {},
  query: {
    combinator: "and",
    rules: [],
  },
  calculatedComponents: {},
  editCalculatedComponent: {
    label: "",
    value: {
      rules: [],
    },
  },
  domains: [],
  selectedDomain: undefined,
  dataMarts: [],
  selectedDataMart: undefined,
  leafNodes: [],
  nodes: [],
  showCalculatedModal: false,
};

export const useDataExpressStore = create<useDataExpressStoreType>()(
  devtools(
    persist(
      immer((set) => ({
        values: initialValues,
        setSelectedColumns(value: TreeNode) {
          set((state) => {
            if (state.values.selectedColumns[value.name]) {
              // remove if already exists
              state.values.selectedColumns = {
                ...omit(state.values.selectedColumns, value.name),
              };
            } else {
              // add if not exists
              state.values.selectedColumns = {
                ...state.values.selectedColumns,
                [value.name]: value,
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
        setLeafNodes(value: TreeNode[]) {
          set((state) => {
            const val = Array.isArray(value) ? value : [];
            state.values.leafNodes = val;
          });
        },
        setNodes(value: TreeNode[]) {
          set((state) => {
            const val = Array.isArray(value) ? value : [];
            state.values.nodes = val;
          });
        },
        setCalculatedComponent(value: CalculatedColumn) {
          set((state) => {
            state.values.calculatedComponents = {
              ...(state.values.calculatedComponents || {}),
              [value.label]: value,
            };
          });
        },
        removeCalculatedComponent(value: CalculatedColumn) {
          set((state) => {
            state.values.calculatedComponents = {
              ...omit(state.values.calculatedComponents || {}, value.label),
            };
          });
        },
        setShowCalculatedModal(value: boolean) {
          set((state) => {
            state.values.showCalculatedModal = value;
          });
        },
        setEditCalculatedComponent(value: CalculatedColumn | null) {
          set((state) => {
            state.values.editCalculatedComponent = value
              ? { ...value }
              : {
                  label: "",
                  value: {
                    rules: [],
                  },
                };
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
