import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { API_PATH } from "../../constants";

type Props = {};

export const DataDomainDropdown: React.FC<Props> = () => {
  const { domains, selectedDomain } = useDataExpressStore((s) => s.values);
  const { setDomains, setSelectedDomain, setDataMarts, setSelectedDataMart } =
    useDataExpressStore();

  React.useEffect(() => {
    fetch(`${API_PATH}/data-domain-list`)
      .then((v) => v.json())
      .then((v) => {
        setDomains(
          v?.domain_list.map((d: string) => ({
            label: d,
          }))
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={domains}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Domain" />}
      value={selectedDomain}
      onChange={(event, value) => {
        setSelectedDomain(value);
        setDataMarts([]);
        setSelectedDataMart(null);
      }}
    />
  );
};
