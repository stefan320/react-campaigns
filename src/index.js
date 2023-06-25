import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "./context/filtersContext";

import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
    <ThemeProvider>
        <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);