import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Select, SelectItem } from './components/Select';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="sc-container">
      <Select label="Age" onChange={(value) => console.log(value)}>
        <SelectItem value="1">Item 1</SelectItem>
        <SelectItem value="2">Item 2</SelectItem>
        <SelectItem value="3">Item 3</SelectItem>
      </Select>
    </div>
  </React.StrictMode>
);
