import { createGlobalStyle } from "styled-components";

const GlobylStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-family: "SegoeUI", "Roboto", "Oxygen", "Ubuntu", sans-serif;
    box-sizing: border-box;
  }
  
  body {
      background: #fff;
  }

`;

export default GlobylStyles;
