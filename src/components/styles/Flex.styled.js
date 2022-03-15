import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-item: center;
  & > div,
  & > ul {
    flex: 1;
  }
`;
