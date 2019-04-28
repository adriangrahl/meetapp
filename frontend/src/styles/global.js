import { createGlobalStyle } from 'styled-components';
import { colors } from './index';
import 'font-awesome/css/font-awesome.css';
import 'flatpickr/dist/themes/material_green.css';

const Global = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    color: #FFF;
    text-decoration: none;
  }

  html, body, #root{
    height: 100%;
    display: flex;
    flex-direction: column;

  }

  body{
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: ${colors.secondary};
    font-family: Arial, Helvetica, sans-serif;
  }

  button{
    cursor: pointer;
  }
`;

export default Global;
