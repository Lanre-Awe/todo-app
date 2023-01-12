import { createSlice } from "@reduxjs/toolkit";

const getTodoHistory = () => {
  const data = localStorage.getItem("TODORECORD");
  if (data !== null) {
    const recievedData = JSON.parse(data);

    return recievedData;
  } else {
    return null;
  }
};
console.log(getTodoHistory());
const initialState = {
  history: getTodoHistory() ? getTodoHistory().history : [],
};

const todoLegendSlice = createSlice({
  name: "legend",
  initialState,
  reducers: {
    onAddHistory(state, action) {
      const history = state.history;
      console.log(action.payload);
      history.push(action.payload);
    },
  },
});

export const todoLegendAction = todoLegendSlice.actions;

export default todoLegendSlice;
