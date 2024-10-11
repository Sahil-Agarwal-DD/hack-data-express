import * as React from "react";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { QueryExecuteContainer } from "./QueryExecuteContainer";
import { QueryExecuteTracker } from "./QueryExecuteTracker";
import CloseIcon from "@mui/icons-material/Close";
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
    values: { queryExecutionPayloads, selectedQueryTabIndex: tabIndex },
    setSelectedQueryTabIndex: setTabIndex,
    removeQueryExecutionPayload,
  } = useDataExpressStore();

  const queryExecPayloads = React.useMemo(() => {
    return Object.values(queryExecutionPayloads || {});
  }, [queryExecutionPayloads]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (queryExecPayloads.length === 0) {
    return null;
  }

  return (
    <>
      <Divider />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {queryExecPayloads.map((v, i) => (
              <Tab
                key={v.id}
                label={
                  <Stack
                    direction={"row"}
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{`Query ${i + 1}`}</Typography>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        removeQueryExecutionPayload(v.id);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                }
                {...a11yProps(i)}
              />
            ))}
          </Tabs>
        </Box>
        {queryExecPayloads.map((v, i) => (
          <CustomTabPanel key={v.id} value={tabIndex} index={i}>
            <QueryExecuteContainer queryExecutionPayload={v} />
          </CustomTabPanel>
        ))}
        {queryExecPayloads.map((v) => (
          <QueryExecuteTracker key={v.id} queryExecutionPayload={v} />
        ))}
      </Box>
    </>
  );
};
