import { createSlice } from "@reduxjs/toolkit";

const AlertReducers = createSlice({
  name: "alert",
  initialState: {
    alertContent: {},
  },
  reducers: {
    showAlert: (state, action) => {
      state.alertContent = action.payload.alertContent;
    },
  },
});

export const { showAlert } = AlertReducers.actions;
export default AlertReducers.reducer;
