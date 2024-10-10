import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { Stack, CircularProgress, Box, Tab, Tabs } from "@mui/material";
import { QueryResults } from "./QueryResults";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface QueryExecuteProps {}

export const QueryExecute: React.FC<QueryExecuteProps> = () => {
  const {
    values: {
      queryExecutionState: queryExecuting,
      queryResultsTabs,
      selectedQueryTabIndex: tabIndex,
    },
    setQueryExecuting,
    setSelectedQueryTabIndex: setTabIndex,
  } = useDataExpressStore();

  const totalTabs = React.useMemo(
    () => Array.from({ length: queryResultsTabs }, (_, index) => index),
    [queryResultsTabs]
  );
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let timer: string | number | NodeJS.Timer | undefined;

    timer = setInterval(() => {
      if (queryExecuting !== "loading") {
        clearTimeout(timer);
        setSeconds(0);
      } else {
        setSeconds((v) => v + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [queryExecuting]);

  React.useEffect(() => {
    if (seconds === 5) {
      setSeconds(0);
      setQueryExecuting("success");
    }
  }, [seconds]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {totalTabs.map((v, i) => (
            <Tab label={`Query ${v + 1}`} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {totalTabs.map((v, i) => (
        <CustomTabPanel value={tabIndex} index={i}>
          {queryExecuting === "loading" && (
            <Stack
              style={{
                height: "30vh",
                width: "100%",
                border: "1px solid #ccc",
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
              {seconds}
            </Stack>
          )}
          {queryExecuting === "success" && (
            <Stack
              style={{
                width: "100%",
                border: "1px solid #ccc",
                overflow: "auto",
              }}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <QueryResults />
            </Stack>
          )}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
