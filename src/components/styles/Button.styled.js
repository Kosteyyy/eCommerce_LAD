import styled from "styled-components";

export const Button = styled.button`
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 5px 10px;
  margin: 10px;
  background-color: ${({ bg }) => bg || "#369"};
  color: ${({ color }) => color || "#fff"};

  &: hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
