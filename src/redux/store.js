import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./slices/peopleSlice";
import tokenSlice from "./slices/tokenSlice";

export const store = configureStore({
  reducer: {
    peoples: peopleSlice,
    token: tokenSlice,
  },
});
