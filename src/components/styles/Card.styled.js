import styled from "styled-components";

export const Card = styled.div`
  border-radius: 5px;
  min-width: 500px;
  padding: 20px;
  margin: 20px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media (max-width: 768px) {
    min-width: 300px;
    width: 100%;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  a:visited {
    color: #369;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    margin-left: 0px;
  }
  select {
    font-size: 16px;
    padding: 5px;
  }
`;

export const CardTitle = styled.h4`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const CardFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0;

  label {
    font-size: 16px;
    margin: 5px 0;
  }
  input {
    width: 100%;
    font-size: 16px;
    padding: 5px;
    border: 1px solid #777;
    border-radius: 3px;
  }
`;
export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardErrorMessage = styled.div`
  color: red;
  max-width: 400px;
  margin: 10px 0px;
`;

export const RadioInputGroup = styled.div``;

export const RadioInputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  input {
    height: 16px;
    width: 16px;
    margin-right: 10px;
  }
`;
