import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import chat from './models/chat';

const reducers = combineReducers({
  chat
});

let enhancers = applyMiddleware(thunk);

if (process.env.NODE_ENV === 'development') {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (devTools) {
    enhancers = compose(enhancers, devTools());
  }
}

export default createStore(reducers, enhancers);