import React from 'react';
import ReactDOM from 'react-dom/client';  // ✅ Import from 'react-dom/client'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from 'bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));  // ✅ Use createRoot()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
