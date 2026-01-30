import { createSlice } from "@reduxjs/toolkit";

const requestReceivedSlice = createSlice({
  name: "requestReceived",
  initialState: null,
  reducers: {
    addRequestReceived: (state, action) => action.payload,
  },
});

export const { addRequestReceived } = requestReceivedSlice.actions;
export default requestReceivedSlice.reducer;
