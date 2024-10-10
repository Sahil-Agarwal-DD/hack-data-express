import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { QueryBuilder, RuleGroupTypeAny } from "react-querybuilder";
import { CalculatedQueryBuilderStyles } from "./styles";
import { useDataExpressStore } from "../../stores/useDataExpressStore";
import { getFullPathOfNode } from "../../utils";
import { TreeNode } from "../TreeView/type";
import { CaseWhenValueEditor } from "./CaseWhenValueEditor";

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
    if (editCalculatedComponent) {
      setAlias(editCalculatedComponent.label);
      setCaseStatement({ ...editCalculatedComponent.value });
    } else {
      setAlias("");
      setCaseStatement({
        rules: [],
      });
    }
  }, [editCalculatedComponent]);

  const leafNodes = useDataExpressStore((state) => state.values.leafNodes);
  const setCalculatedComponent = useDataExpressStore(
    (state) => state.setCalculatedComponent
  );

  const fields = React.useMemo(() => {
    return (leafNodes || []).map((v: TreeNode) => ({
      name: getFullPathOfNode(v),
      label: getFullPathOfNode(v),
    }));
  }, [leafNodes]);

  const cancelClicked = () => {
    handleClose();
  };
  const okClicked = () => {
    if (!alias) {
      alert("Add alias");
      return;
    }

    if (caseStatement?.rules?.length === 0) {
      alert("Add conditions");
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
      <Button onClick={handleOpen}>Calculated Component</Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Calculated Components (Case When)
            </Typography>
            <TextField
              id="outlined-basic"
              label="Enter Alias"
              variant="outlined"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
            />

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <CalculatedQueryBuilderStyles>
                <QueryBuilder
                  controlClassnames={{
                    queryBuilder: "queryBuilder-branches",
                  }}
                  combinators={[
                    {
                      name: "",
                      label: "",
                    },
                  ]}
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
            </Typography>
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
