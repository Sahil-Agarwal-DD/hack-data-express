import { Stack, Typography } from "@mui/material";
import { ValueEditor, ValueEditorProps } from "react-querybuilder";

export const CaseWhenValueEditor = (props: ValueEditorProps) => {
  console.log("====> CaseWhenValueEditor", props);
  return (
    <Stack direction={"row"} spacing={0.5}>
      <ValueEditor
        {...props}
        value={props.value?.mainValue}
        handleOnChange={(value) => {
          props.handleOnChange({
            ...(props.value || {}),
            mainValue: value,
          });
        }}
      />
      <Typography variant="caption">Then</Typography>
      <input
        data-testid="case-when-value-editor"
        type="text"
        placeholder=""
        title="Value"
        className="rule-value case-when-value-editor"
        // value={}
        onChange={(e) => {
          props.handleOnChange({
            ...(props.value || {}),
            thenValue: e.target.value,
          });
        }}
      ></input>
    </Stack>
  );
};
