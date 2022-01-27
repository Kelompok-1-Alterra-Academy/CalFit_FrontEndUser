import { configureStore } from "@reduxjs/toolkit";
import AlertReducers from "../store/AlertReducers";
export default configureStore({
  reducer: {
    alert: AlertReducers,
  },
});
