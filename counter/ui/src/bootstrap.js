import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Counter from './Counter';

const root = ReactDOM.createRoot(document.getElementById('count'));
root.render(
  <React.StrictMode>
    <Counter />
  </React.StrictMode>
);