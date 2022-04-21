import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import Todoreducer from "./todos/reducer";
import Authreducer from "./auth/reducer";

import logger from "redux-logger";
import thunk from "redux-thunk";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({
  todoStore: Todoreducer,
  authStore: Authreducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
