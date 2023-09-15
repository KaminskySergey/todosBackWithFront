import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './modules/app';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
