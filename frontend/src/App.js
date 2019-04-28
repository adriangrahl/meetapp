import dotenv from 'dotenv';
import React from 'react';
import { Provider } from 'react-redux';
import './config/reactotron';
import Global from './styles/global';
import Routes from './routes';

import store from './store';

dotenv.config();

const App = () => (
  <Provider store={store}>
    <Global />
    <Routes />
  </Provider>
);

export default App;
