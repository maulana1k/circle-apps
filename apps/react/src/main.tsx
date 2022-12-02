import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './app/app';
import './styles.css';

axios.defaults.baseURL = process.env['API_URI'];


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode="dark" />
      <App />
    </BrowserRouter>
  </StrictMode>
);
