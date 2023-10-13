import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers/slices";

const store = configureStore({
  reducer: reducer,
});

export default store;
