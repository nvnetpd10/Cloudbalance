import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { createStore } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
