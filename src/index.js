import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './store'

import App from './App';
import './assets/bootstrap.min.css'
import './assets/hover-min.css'
import './assets/hover.css'
import 'react-toastify/dist/ReactToastify.css';




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

