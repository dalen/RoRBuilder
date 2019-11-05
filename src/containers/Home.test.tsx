/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import Home from './Home';
import rootReducer from '../reducers';

it('renders without crashing', () => {
  // Create store, apply middlewares etc
  const loggerMiddleware = createLogger();
  const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    div,
  );
});
