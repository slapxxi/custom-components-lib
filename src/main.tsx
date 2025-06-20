import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Checkbox } from './components/Checkbox';

function App() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="sc-container">
      <Checkbox checked={checked} onChange={setChecked} />
      <Checkbox checked={checked} disabled onChange={setChecked} />
      <div>
        <label htmlFor="custom">Disabled</label>
        <Checkbox checked={checked} onChange={setChecked} id="custom" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
