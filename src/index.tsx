import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import './css/entry.css';

// For IE11
import 'react-app-polyfill/ie11';

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
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#root'),
  );
};

// Render the application
render();

// React HOT/HMR
/*
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector('#root'),
    );;
  });
}
*/
