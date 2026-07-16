import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="bg-[#F2F0EA] min-h-screen flex justify-center w-full">
      <App />
    </div>
  </React.StrictMode>,
);