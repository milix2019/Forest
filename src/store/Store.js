import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducer/index';

/*
  Modify the logger (which can be seen in the console.log output),
  and create store with the help of middleware
*/

const logger = createLogger({
  collapsed: true,
  // predicate: () =>
  // process.env.NODE_ENV === 'development'
});

// create the middleware and store
const middleware = applyMiddleware(reduxThunk, logger);

const store = middleware(createStore)(rootReducer);

export {store};
