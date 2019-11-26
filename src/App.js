import React from 'react';

import { Router } from 'react-router-dom';
import history from './services/history';

import GlobalStyle from './styles/global';

import Root from './components/Root';

const App = () => {
  return (
    <Router history={history}>
      <Root />
      <GlobalStyle />
    </Router>
  );
};

export default App;
