import { configureStore } from "@reduxjs/toolkit";
import AlertReducers from "../store/AlertReducers";
import UsersReducer from "../store/UsersReducer";
export default configureStore({
  reducer: {
    alert: AlertReducers,
    user: UsersReducer,
  },
});
