/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

// const logger = createLogger({});

const middleware = applyMiddleware(thunk);

export default createStore(
  reducers,
  compose(
    middleware,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
