import styled from "@emotion/styled";

export const TreeViewContainer = styled.div`
  margin-left: 10px;

  [data-testid="icon"] {
    width: 20px;
    height: 20px;
  }

  .ml-4 {
    margin-left: 10px;
  }

  .mr-2 {
    margin-right: 5px;
  }

  .pl-4 {
    padding-left: 10px;
  }

  .rotate-90 {
    transform: rotate(90deg);
  }

  .node-item {
    padding-left: 5px;
    height: 30px;
    cursor: pointer;

    :hover {
      background-color: #ccc;
    }

    /* inline children height 100% */
    > div {
      height: 100%;
    }
  }

  .node-item.highlight {
    font-style: italic;
  }
`;
