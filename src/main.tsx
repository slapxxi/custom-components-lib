import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Select, SelectItem } from './components/Select';

function App() {
  const [value, setValue] = React.useState('');
  console.log(value);

  return (
    <div className="sc-container">
      <Select label="Controlled Component" value={value} onChange={setValue}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
        <SelectItem value="69">Item Sixty Nine</SelectItem>
      </Select>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
