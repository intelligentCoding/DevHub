import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//middlewear
import thunk from 'redux-thunk';
// we are gonna have multiple reducers but we are gonna combine them in root reducers.
import rootReducer from './reducers';
// import setAuthToken from './utils/setAuthToken';
//Initial state will be empty.
const initialState = {};
const middleware = [thunk];
//createStore comes from redux

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
