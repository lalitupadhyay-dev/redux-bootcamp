// ------------------------------------------------------------------------------------------------
// Executing async actions using redux-thunk ------------------------------------------------------
// ------------------------------------------------------------------------------------------------


import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";

// this is initial state of store
const initialState = {};

// reducerFn() function
function reducerFn(state = initialState, action) {
  switch (action.type) {
    case "getAccountDetails":
      return { ...action.payload };
    default:
      return state;
  }
}

// action function for async operation
function getAccountDetails(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/account/${id}`);
    dispatch({ type: "getAccountDetails", payload: data });
  };
}

// creating store
const store = createStore(reducerFn, applyMiddleware(logger.default, thunk));

// calling the async action after 3 seconds
setTimeout(() => store.dispatch(getAccountDetails(1)), 3000);
