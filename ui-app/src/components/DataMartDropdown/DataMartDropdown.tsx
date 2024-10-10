import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";

type Props = {};

export const DataMartDropdown: React.FC<Props> = () => {
  const {
    dataMarts = [],
    selectedDomain,
    selectedDataMart,
    queryExecutionState: queryExecuting,
  } = useDataExpressStore((s) => s.values);
  const { setSelectedDataMart, setDataMarts } = useDataExpressStore();

  React.useEffect(() => {
    if (selectedDomain?.label) {
      fetch(`${API_PATH}/datamart-list/${selectedDomain.label}`)
        .then((v) => v.json())
        .then((v) => {
          setDataMarts(
            (v?.datamarts || [])?.map((d: string) => ({
              label: d,
            }))
          );
        });
    }
  }, [selectedDomain]);

  return (
    <Autocomplete
      disabled={queryExecuting === 'loading'}
      disablePortal
      options={dataMarts}
      size="small"
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="DataMarts" />}
      value={selectedDataMart}
      onChange={(event, value) => {
        setSelectedDataMart(value);
      }}
    />
  );
};
