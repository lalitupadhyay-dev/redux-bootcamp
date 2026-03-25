import axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

// defining sync actions
const syncActions = {
  getNormalAccountDetails: "normalAccount/getInfo",
  getFdAccountDetails: "fdAccount/getInfo",
};

// Defining async actions
const asyncActions = {
  getNormalAccountDetails: (id) => {
    return async (dispatch, getState) => {
      const { data } = await axios.get(`http://localhost:3000/account/${id}`);
      dispatch({ type: syncActions.getNormalAccountDetails, payload: data });
    };
  },
  getFdAccountDetails: (id) => {
    return async (dispatch, getState) => {
      const { data } = await axios.get(`http://localhost:3000/fdAccount/${id}`);
      dispatch({ type: syncActions.getFdAccountDetails, payload: data });
    };
  },
};

// creating reducers
const reducer = {
  getNormalAccountDetails: (state = { }, action) => {
    switch (action.type) {
      case syncActions.getNormalAccountDetails:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  getFdAccountDetails: (state = { }, action) => {
    switch (action.type) {
      case syncActions.getFdAccountDetails:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
};

// creating store
const store = createStore(
  combineReducers({
    normalAccount: reducer.getNormalAccountDetails,
    fdAccount: reducer.getFdAccountDetails,
  }),
  applyMiddleware(logger.default, thunk),
);

// dispatching actions
setTimeout(() => store.dispatch(asyncActions.getNormalAccountDetails(1)), 2000);
setTimeout(() => store.dispatch(asyncActions.getFdAccountDetails(1)), 2000);
