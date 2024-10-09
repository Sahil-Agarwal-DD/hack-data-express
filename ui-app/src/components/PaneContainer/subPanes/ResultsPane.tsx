import * as React from "react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-textmate";
import "gethue/ext/ace/mode-sql";

import { useDataExpressStore } from "../useDataExpressStore";

import { formatQuery, RuleGroupTypeAny } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { formatDialect, sql } from "sql-formatter";
import { Stack } from "@mui/material";

export const ResultsPane: React.FC = () => {
  const query = useDataExpressStore((state) => state.values.query);
  const selectedColumns = useDataExpressStore(
    (state) => state.values.selectedColumns
  );

  const fields = React.useMemo(
    () => Object.keys(selectedColumns),
    [selectedColumns]
  );

  const formattedQuery = React.useMemo(() => {
    try {
      return formatQuery(query as RuleGroupTypeAny, "sql");
    } catch {
      return "";
    }
  }, [query]);

  const generatedSql = React.useMemo(
    () => `SELECT ${fields.join(", ")} FROM some_table WHERE ${formattedQuery}`,
    [fields, formattedQuery]
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
