import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";

type Props = {};

export const TemplatesDropdown: React.FC<Props> = () => {
  const { domains, selectedDomain, QueryTemplate, selectedQueryTemplate, queryExecutionState: queryExecuting } = useDataExpressStore((s) => s.values);
  const { setDomains, setSelectedDomain, setQueryTemplates, setSelectedQueryTemplate } =
    useDataExpressStore();

  React.useEffect(() => {
    fetch(`${API_PATH}/query-templates-list`)
      .then((v) => v.json())
      .then((v) => {
        setQueryTemplates(
          v?.query_templates_list.map((d: string) => ({
            label: d,
          }))
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      disabled={queryExecuting === 'loading'}
      disablePortal
      options={QueryTemplate}
      size="small"
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Query Templates" />}
      value={selectedQueryTemplate}
      onChange={(event, value) => {
        setSelectedQueryTemplate(value);
      }}
    />
  );
};
