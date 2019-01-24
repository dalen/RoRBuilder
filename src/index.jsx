import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import './css/entry.css';

// For Google Analytics
import 'autotrack';

import rootReducer from './reducers';

//  Import Components
import App from './components/App';

// Create store, apply middlewares etc
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promise)),
);

// Create a function which will render a component to our DOM
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.querySelector('#root'),
  );
};

// Render the application
render(App);

// React HOT/HMR
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
