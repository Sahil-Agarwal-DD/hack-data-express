import styled from "@emotion/styled";

export const QueryBuilderStyles = styled.div`
  .ruleGroup-body-1 {
    /* Override the default flex layout */
    display: grid !important;
    /* Allow the right-hand column (the rule/subgroup) to expand as needed */
    /* Collapse the left-hand column (the combinator) to the width of the content */
    grid-template-columns: min-content auto;
    /* Keep the combinator aligned with the top of the rule/subgroup */
    align-items: start;
  }

  .ruleGroup {
    background: rgb(147 148 149 / 20%);
  }

  /* Indent the first rule/subgroup since it has no preceding combinator */
  .ruleGroup-body > .rule:first-child:not(:only-child),
  .ruleGroup-body > .ruleGroup:first-child:not(:only-child) {
    grid-column-start: 2;
  }

  .rule > .rule-fields {
    width: 20%;
  }
  .rule > .rule-operators {
    width: 20%;
  }
  .rule > .rule-value {
    width: 40%;
  }
`;
