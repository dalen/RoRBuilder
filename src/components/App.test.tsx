/* global it */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from '../reducers';

it('renders without crashing', () => {
  // Create store, apply middlewares etc
  const store = createStore(rootReducer);
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
  );
});
