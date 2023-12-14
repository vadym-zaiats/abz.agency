"use client";

import store, { persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading="загрузка" persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
