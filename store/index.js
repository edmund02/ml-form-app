// import { createStore } from "redux";
// import reducer from "../reducers";

// const store = createStore(reducer);

// export default store;


import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';

const rootReducer = combineReducers(
   { app: reducer }
);
const configureStore = () => {
   return createStore(rootReducer);
}
export default createStore(rootReducer);