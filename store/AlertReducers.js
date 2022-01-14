import { createSlice } from "@reduxjs/toolkit";

const AlertReducers = createSlice({
  name: "alert",
  initialState: {
    isLogin: false,
  },
  reducers: {
    showAlert: (state, action) => {
      state.isLogin = action.isLogin;
    },
  },
});

export const { showAlert } = AlertReducers.actions;
export default AlertReducers.reducer;
