import { RuleGroupTypeAny } from "react-querybuilder";

export type Domain = { label: string };
export type DataMart = { label: string };
export type QueryTemplate = { label: string };

/* case when */
export type CalculatedColumn = { label: string; value: RuleGroupTypeAny };

export type QueryExecutionPayloadStatus =
  | "loading"
  | "error"
  | "initial"
  | "success";
export type QueryExecutionPayload = {
  id: string;
  status: QueryExecutionPayloadStatus;
  seconds: number;
  error?: string | null;
  loadedSavedConfigName: string | null; // this property is only for demo purpose. it can be remove later
  result?: {
    resultset: any[];
  };
};
