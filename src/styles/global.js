import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=DM+Sans:400,700&display=swap');
  
  html {
    height: 100%;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  a {
    color: #0070c9;
    cursor: pointer;
  }
  
  #root {
     height: 100%; 
     #toggle-sidebar {
      display: none;
    }
  }

  body {
    background-color: #fff;
    font-family: 'DM Sans', sans-serif;
    min-height: 100%;
    height: 100%;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  button {
    font-size: 13px;
    font-weight: 600;
    line-height: 26px;
    outline: 0;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    -webkit-appearance: none;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    padding: 0 10px;
    cursor: pointer;
    svg {
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: sub;
      color: #ffd557;
    }
  }
`;
