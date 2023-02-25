import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  description: null,
};
const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    onDisplay(state, action) {
      state.description = action.payload;
    },
  },
});

export const descriptionAction = descriptionSlice.actions;
export default descriptionSlice;
