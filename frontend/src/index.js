import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'; 
import App from './App'; 
import reportWebVitals from './reportWebVitals'; // Optional- for performance measuring

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
