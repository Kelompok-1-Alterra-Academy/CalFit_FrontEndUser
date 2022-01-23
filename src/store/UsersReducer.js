import { createSlice } from "@reduxjs/toolkit";

const UsersReducer = createSlice({
  name: "users",
  initialState: {
    userdata: {},
  },
  reducers: {
    getUserdata: (state, action) => {
      state.userdata = action.payload.userdata;
    },
  },
});

export const { getUserdata } = UsersReducer.actions;
export default UsersReducer.reducer;
