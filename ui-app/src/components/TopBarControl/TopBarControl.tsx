import { Stack, Button } from "@mui/material";
import * as React from "react";
import { DataDomainDropdown } from "../DataDomainDropdown";
import { DataMartDropdown } from "../DataMartDropdown";

interface TopBarControlProps {}

export const TopBarControl: React.FC<TopBarControlProps> = () => {
  return (
    <Stack
      style={{ width: "100%" }}
      direction="row"
      spacing={3}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
        <DataDomainDropdown />
        <DataMartDropdown />
      </Stack>
      <Button variant="contained">Load</Button>
    </Stack>
  );
};
