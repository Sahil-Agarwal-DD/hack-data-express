import omit from "lodash/omit";
import { RuleGroupTypeAny } from "react-querybuilder";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  CalculatedColumn,
  DataMart,
  Domain,
  QueryExecutionPayload,
  QueryTemplate,
} from "../types";
import { TreeNode } from "../components/TreeView/type";
import { cloneDeep } from "lodash";

type QueryExecutionState = "loading" | "stopped" | "success";
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
  blockUI: boolean;
  queryExecutionState: QueryExecutionState;
  showSql: boolean;
  queryResultsTabs: number;
  selectedQueryTabIndex: number;
  QueryTemplate: QueryTemplate[];
  selectedQueryTemplate?: QueryTemplate | null;
  queryExecutionPayloads: Record<string, QueryExecutionPayload>;
  loadedSavedConfigName: string | null;
};
type useDataExpressStoreType = {
  values: useDataExpressStoreTypeValues;
  setSelectedColumns: (value: TreeNode, shouldUpdate?: boolean) => void;
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
  load: (val: Partial<useDataExpressStoreTypeValues>) => void;
  reset: () => void;
  setBlockUI: (val: boolean) => void;
  setQueryExecuting: (val: QueryExecutionState) => void;
  setShowSql: (val: boolean) => void;
  setQueryResultsTabs: (val: number) => void;
  setSelectedQueryTabIndex: (val: number) => void;
  setQueryTemplates: (value: QueryTemplate[]) => void;
  setSelectedQueryTemplate: (value: QueryTemplate | null) => void;
  setQueryExecutionPayload: (value: QueryExecutionPayload) => void;
  removeQueryExecutionPayload: (id: string) => void;
  setLoadedSavedConfigName: (val: string) => void;
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
  selectedDomain: null,
  dataMarts: [],
  selectedDataMart: null,
  leafNodes: [],
  nodes: [],
  showCalculatedModal: false,
  blockUI: false,
  queryExecutionState: "stopped",
  showSql: false,
  queryResultsTabs: 0,
  selectedQueryTabIndex: 0,
  QueryTemplate: [],
  selectedQueryTemplate: null,
  queryExecutionPayloads: {},
  loadedSavedConfigName: null,
};

export const useDataExpressStore = create<useDataExpressStoreType>()(
  devtools(
    persist(
      immer((set) => ({
        values: cloneDeep(initialValues),
        setSelectedQueryTabIndex(val: number) {
          set((state) => {
            state.values.selectedQueryTabIndex = val;
          });
        },
        setLoadedSavedConfigName(val: string | null) {
          set((state) => {
            state.values.loadedSavedConfigName = val;
          });
        },
        setQueryResultsTabs(val: number) {
          set((state) => {
            state.values.queryResultsTabs = val;
          });
        },
        setShowSql(val: boolean) {
          set((state) => {
            state.values.showSql = val;
          });
        },
        setQueryExecutionPayload(value: QueryExecutionPayload) {
          set((state) => {
            state.values.queryExecutionPayloads[value.id] = value;
          });
        },
        removeQueryExecutionPayload(id: string) {
          set((state) => {
            state.values.queryExecutionPayloads = {
              ...omit(state.values.queryExecutionPayloads, id),
            };

            const totalTabs = Object.keys(
              state.values.queryExecutionPayloads
            ).length;
            state.values.selectedQueryTabIndex =
              totalTabs > 0 ? totalTabs - 1 : 0;
          });
        },
        setQueryExecuting(val: QueryExecutionState) {
          set((state) => {
            state.values.queryExecutionState = val;
          });
        },
        setBlockUI(val: boolean) {
          set((state) => {
            state.values.blockUI = val;
          });
        },
        reset() {
          set((state) => {
            state.values = cloneDeep(initialValues);
          });
        },
        load(value: Partial<useDataExpressStoreTypeValues>) {
          set((state) => {
            state.values = {
              ...cloneDeep(initialValues),
              ...state.values,
              ...value,
            };
          });
        },
        setSelectedColumns(value: TreeNode, shouldUpdate = false) {
          set((state) => {
            if (
              !shouldUpdate &&
              state.values.selectedColumns[value.parentPath]
            ) {
              // remove if already exists
              state.values.selectedColumns = {
                ...omit(state.values.selectedColumns, value.parentPath),
              };
            } else {
              // add if not exists
              state.values.selectedColumns = {
                ...state.values.selectedColumns,
                [value.parentPath]: value,
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
        setQueryTemplates(value: QueryTemplate[]) {
          set((state) => {
            state.values.QueryTemplate = value;
          });
        },
        setSelectedQueryTemplate(value: QueryTemplate | null) {
          set((state) => {
            state.values.selectedQueryTemplate = value;
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
