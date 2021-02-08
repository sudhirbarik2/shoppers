import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import './index.css';
import logger from 'redux-logger';
import prodReducrer from './reducers/ProdReducer';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
let store=createStore(prodReducrer,applyMiddleware(logger));
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();