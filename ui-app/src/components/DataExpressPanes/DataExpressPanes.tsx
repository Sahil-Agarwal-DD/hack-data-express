import * as React from "react";
import { DataExpressLayout } from "./DataExpressPanes.styles";
import { PaneContainer } from "../PaneContainer/PaneContainer";
import { BlockUI } from "../BlockUI/BlockUI";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { Button, Container, Stack } from "@mui/material";

const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Container maxWidth="sm">
      <Stack direction={"column"} spacing={2}>
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              resetErrorBoundary();
            }}
          >
            Start over
          </Button>
        </div>
      </Stack>
    </Container>
  );
};

export const DataExpressPanes: React.FC = () => {
  const reset = useDataExpressStore((state) => state.reset);
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        reset();
      }}
    >
      <DataExpressLayout>
        <PaneContainer />
        <BlockUI />
      </DataExpressLayout>
    </ErrorBoundary>
  );
};
