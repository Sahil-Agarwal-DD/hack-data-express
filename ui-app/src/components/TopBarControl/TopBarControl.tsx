import { Divider, Stack, Typography } from "@mui/material";
import * as React from "react";
import { DataDomainDropdown } from "../DataDomainDropdown";
import { DataMartDropdown } from "../DataMartDropdown";
import { TemplatesDropdown } from "../TemplatesDropdown";
import { LoadSaved } from "../LoadSaved/LoadSaved";
import { ElectricBolt } from "@mui/icons-material";

interface TopBarControlProps {}

export const TopBarControl: React.FC<TopBarControlProps> = () => {
  return (
    <Stack direction={"column"} style={{ width: "100%" }} spacing={1}>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <ElectricBolt style={{ fontSize: 35 }} />
            <Typography variant="h5">DataXpress</Typography>
          </Stack>
          <DataDomainDropdown />
          <DataMartDropdown />
        </Stack>
        <TemplatesDropdown />
        <LoadSaved />
      </Stack>
      <Divider />
    </Stack>
  );
};
