import styled from "@emotion/styled";

export const PaneStackChildren = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  max-height: 50vh;
`;

export const PaneTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: #ccc;
  height: 60px;
  padding: 10px;
  width: 100%;
`;
export const PaneBody = styled.div`
  padding: 10px 10px 10px 10px;
  width: 100%;
  flex: 1;
  overflow: auto;
`;
export const PaneFooter = styled.div`
  display: flex;
  align-items: center;
  background-color: #eee;
  height: 60px;
  padding: 10px;
  width: 100%;
`;

export const SelectionItemContainer = styled.div`
  border-bottom: 1px solid #aaa;
`;
