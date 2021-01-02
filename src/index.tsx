import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ApiProvider } from './api/ApiProvider';

ReactDOM.render(
  <BrowserRouter>
    <ApiProvider>
      <App />
    </ApiProvider>
  </BrowserRouter>,
  document.getElementById('root')
);