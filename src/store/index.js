import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

const storeObj = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));

export default storeObj;
