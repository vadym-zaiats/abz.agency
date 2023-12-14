import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./slices/peopleSlice";

export const store = configureStore({
  reducer: {
    peoples: peopleSlice,
  },
});
