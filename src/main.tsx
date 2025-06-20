import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Modal } from './components/Modal';
import { Button } from './components/Button';

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="sc-container">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>hello world</div>
      </Modal>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
