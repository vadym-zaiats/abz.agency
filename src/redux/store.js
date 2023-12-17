import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./slices/peopleSlice";
import tokenSlice from "./slices/tokenSlice";
import positionsSlice from "./slices/positionsSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    peoples: peopleSlice,
    token: tokenSlice,
    positions: positionsSlice,
    middleware: [thunk],
  },
});
