import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnectionsList: (state, action) => action.payload,
    removeConnectionList: () => null,
  },
});

export const { addConnectionsList, removeConnectionList } =
  connectionSlice.actions;
export default connectionSlice.reducer;
