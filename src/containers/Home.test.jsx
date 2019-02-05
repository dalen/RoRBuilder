/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import Home from './Home';
import rootReducer from '../reducers';

it('renders without crashing', () => {
  // Create store, apply middlewares etc
  const store = createStore(rootReducer, applyMiddleware(promise));
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    div,
  );
});
