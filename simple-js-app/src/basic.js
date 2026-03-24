// ------------------------------------------------------------------------------------------------
// Old way using Redux with "createStore()" method: -----------------------------------------------
// ------------------------------------------------------------------------------------------------

import { createStore } from "redux";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
// this is the initial state of the store
const initialState = {
  count: 0,
};

// creating reducer function
// It runs for every dispatched action
function reducer(state = initialState, action) {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  } else if (action.type === "decrement") {
    return { count: state.count - 1 };
  }
}

// creating store
const store = createStore(reducer, applyMiddleware(logger.default));

// dispatching actions "increment";
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });

// printing state from store
console.log(store.getState());

// dispatching action "decrement";
store.dispatch({ type: "decrement" });

// printing state from store
console.log(store.getState());