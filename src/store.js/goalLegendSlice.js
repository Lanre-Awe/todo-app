import { createSlice } from "@reduxjs/toolkit";

const getHistoryData = () => {
  const data = localStorage.getItem("GOALRECORD");
  if (data !== null) {
    const recievedData = JSON.parse(data);

    return recievedData;
  } else {
    return null;
  }
};

const initialState = {
  history: getHistoryData() ? getHistoryData().history : [],
};

const goalLegendSlice = createSlice({
  name: "goalLegend",
  initialState,
  reducers: {
    onAddHistory(state, action) {
      const history = state.history;
      console.log(action.payload);
      history.push(action.payload);
    },
  },
});

export const goalLegendAction = goalLegendSlice.actions;

export default goalLegendSlice;
