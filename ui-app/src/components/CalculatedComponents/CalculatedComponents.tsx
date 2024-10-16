import * as React from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";

import { QueryBuilder, RuleGroupTypeAny } from "react-querybuilder";
import { CalculatedQueryBuilderStyles } from "./styles";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { CaseWhenValueEditor } from "./CaseWhenValueEditor";
import { useGetFields } from "../../hooks/useGetFields";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CalculatedComponentsProps {}

export const CalculatedComponents: React.FC<CalculatedComponentsProps> = () => {
  const notifications = useNotifications();

  const [alias, setAlias] = React.useState("");
  const [caseStatement, setCaseStatement] = React.useState<RuleGroupTypeAny>({
    rules: [],
  });

  const open = useDataExpressStore((state) => state.values.showCalculatedModal);
  const setOpen = useDataExpressStore((state) => state.setShowCalculatedModal);
  const editCalculatedComponent = useDataExpressStore(
    (state) => state.values.editCalculatedComponent
  );
  const setEditCalculatedComponent = useDataExpressStore(
    (state) => state.setEditCalculatedComponent
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAlias("");
    setCaseStatement({
      rules: [],
    });
    setEditCalculatedComponent(null);
  };

  React.useEffect(() => {
    let timer = setTimeout(() => {
      if (editCalculatedComponent) {
        setAlias(editCalculatedComponent.label);
        setCaseStatement({ ...editCalculatedComponent.value });
      } else {
        setAlias("");
        setCaseStatement({
          rules: [],
        });
      }
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [editCalculatedComponent]);

  const setCalculatedComponent = useDataExpressStore(
    (state) => state.setCalculatedComponent
  );

  const { fields } = useGetFields();

  const cancelClicked = () => {
    handleClose();
  };
  const okClicked = () => {
    if (!alias) {
      notifications.show("Add alias", {
        autoHideDuration: 4000,
        severity: "error",
      });
      return;
    }

    if (caseStatement?.rules?.length === 0) {
      notifications.show("Add conditions", {
        autoHideDuration: 4000,
        severity: "error",
      });

      return;
    }

    if (alias !== "" && caseStatement?.rules?.length > 0) {
      setCalculatedComponent({
        label: alias,
        value: caseStatement,
      });

      setEditCalculatedComponent(null);
    }
    handleClose();
  };

  React.useEffect(() => {
    console.log("====> caseStatement", caseStatement);
  }, [caseStatement]);
  return (
    <>
      <Button onClick={handleOpen}>+ Custom Field</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Custom Fields
            </Typography>
            <TextField
              id="outlined-basic"
              label="Enter Alias"
              variant="outlined"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
            />

            <CalculatedQueryBuilderStyles>
              <QueryBuilder
                controlClassnames={{
                  queryBuilder: "queryBuilder-branches",
                }}
                // if we uncomment combinators below to remove them then it explodes
                // combinators={}
                showCombinatorsBetweenRules={false}
                fields={fields}
                // @ts-expect-error
                query={caseStatement as RuleGroupTypeAny}
                onQueryChange={(v) => {
                  setCaseStatement(v as RuleGroupTypeAny);
                }}
                showShiftActions
                controlElements={{
                  // addGroupAction: () => null,
                  valueEditor: CaseWhenValueEditor,
                }}
              />
            </CalculatedQueryBuilderStyles>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" onClick={cancelClicked}>
                Cancel
              </Button>
              <Button variant="contained" onClick={okClicked}>
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
