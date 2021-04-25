import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';

const rootReducer = combineReducers(
   { app: reducer }
);

export default createStore(rootReducer);