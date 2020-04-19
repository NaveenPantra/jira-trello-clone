import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './root.reducer';

// const middleWares = [logger, composeWithDevTools()];
const store = createStore(rootReducer, composeWithDevTools());
export default store;
