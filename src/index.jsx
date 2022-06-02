import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./app.jsx";
import { HelmetProvider } from 'react-helmet-async';

/**
* Root of react site 
*
* Imports Helment provider for the page head
* And App which defines the content and navigation
*/

// Render the site https://reactjs.org/docs/react-dom.html#render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <HelmetProvider>
      <FullApp
    </HelmetProvider>
  </React.StrictMode>,
);

