import * as React from "react";
import styled from "@emotion/styled";
import { TooltipProps, Tooltip, tooltipClasses } from "@mui/material";

export const DxTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
  },
}));
