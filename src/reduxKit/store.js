// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/slices";

const rootReducer = combineReducers({
  users: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
