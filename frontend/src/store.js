import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
  middleware: (gDM) => gDM(),
  devTools: true,
});

export default store;
