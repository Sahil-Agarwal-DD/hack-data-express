import * as React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-textmate";
import "gethue/ext/ace/mode-sql";

import {
  formatQuery,
  RuleGroupTypeAny,
  defaultRuleProcessorSQL,
  RuleProcessor,
} from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { formatDialect, sql } from "sql-formatter";
import { Stack } from "@mui/material";
import { useDataExpressStore } from "../../../stores/useDataExpressStore";
import { isNumber } from "lodash";

const customRuleProcessor: RuleProcessor = (rule, options) => {
  const rr = { ...rule, value: rule.value?.mainValue };
  // if (rule.operator === "has") {
  //   return `UPPER(${rule.field}) LIKE UPPER('%${rule.value}%')`;
  // }

  const returnValue = defaultRuleProcessorSQL(rr, {
    ...options,
    quoteFieldNamesWith: "`",
  });

  const thenValue = isNumber(rule.value?.thenValue)
    ? rule.value?.thenValue
    : `'${rule.value?.thenValue}'`;

  return `WHEN ${returnValue} THEN ${thenValue}`;
};

export const ResultsPane: React.FC = () => {
  const query = useDataExpressStore((state) => state.values.query);
  const calculatedComponents = useDataExpressStore(
    (state) => state.values.calculatedComponents
  );
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );

  const cases = React.useMemo(() => {
    console.log("====> calculatedConmponents", calculatedComponents);

    const cc = Object.values(calculatedComponents || {});

    if (cc.length > 0) {
      const allCases = [];
      for (let i = 0; i < cc.length; i += 1) {
        const c = cc[i];
        const casee = formatQuery(c.value, {
          format: "sql",
          ruleProcessor: customRuleProcessor,
        })
        // TODO: check how to remove "and" and brackets from generated case when statement
          .replaceAll("and", "")
          .replace("(", "")
          .replace(")", "");

        const caseC = `
        CASE
          ${casee}
        END as ${c.label}
      `;

        allCases.push(caseC);
      }

      return allCases.join(",\n\t\t");
    }
    return "";
  }, [calculatedComponents]);

  const fields = React.useMemo(
    () => [...Object.keys(selectedColumns), cases],
    [selectedColumns, cases]
  );

  const formattedQuery = React.useMemo(() => {
    try {
      // console.log("====> json", formatQuery(query as RuleGroupTypeAny, "json"));
      return formatQuery(query as RuleGroupTypeAny, "sql");
    } catch {
      return "";
    }
  }, [query]);

  const generatedSql = React.useMemo(
    () => `SELECT ${fields.join(", ")} FROM some_table WHERE ${formattedQuery}`,
    [fields, formattedQuery, cases]
  );

  const prettifiedSql = React.useMemo(
    () =>
      formatDialect(generatedSql, {
        dialect: sql,
      }),
    [generatedSql]
  );

  return (
    <Stack className="common-border" style={{ height: "35vh" }}>
      <AceEditor
        className={"ace-tm"}
        height="100%"
        width="100%"
        mode="sql"
        theme="textmate"
        value={prettifiedSql}
        editorProps={{
          $blockScrolling: true,
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          vScrollBarAlwaysVisible: true,
          minLines: 5,
          //   highlightActiveLine: !isDisabled,
          //   highlightGutterLine: !isDisabled,
          // maxLines: 20,
        }}
        showPrintMargin
      />
    </Stack>
  );
};
