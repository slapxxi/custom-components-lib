import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/Button';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="sc-container">
      <Button size="large">Contained</Button>
      <Button variant="text">Text</Button>
      <Button variant="outlined">Outlined</Button>
    </div>
  </React.StrictMode>
);
