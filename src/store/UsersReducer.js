import { createSlice } from "@reduxjs/toolkit";

const UsersReducer = createSlice({
  name: "users",
  initialState: {
    userdata: {},
  },
  reducers: {
    setUserdata: (state, action) => {
      state.userdata = action.payload.userdata;
    },
  },
});

export const { setUserdata } = UsersReducer.actions;
export default UsersReducer.reducer;
