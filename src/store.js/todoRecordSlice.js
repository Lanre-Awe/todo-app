import { createSlice } from "@reduxjs/toolkit";

const getData = () => {
  const data = localStorage.getItem("TODORECORD");
  if (data !== null) {
    const recievedData = JSON.parse(data);

    return recievedData;
  } else {
    return null;
  }
};

const initialState = {
  todoRecord: [
    {
      id: "pending",
      total: getData() ? getData().pending : 0,
    },
    {
      id: "completed",
      total: getData() ? getData().finished : 0,
    },
    { id: "discarded", total: getData() ? getData().discarded : 0 },
  ],
  total: 0,
};
const todoSlice = createSlice({
  name: "todoRecord",
  initialState,
  reducers: {
    addTotal(state) {
      state.total++;
    },
    addPending(state) {
      state.todoRecord[0].total++;
    },

    onCompleted(state) {
      state.todoRecord[1].total++;
      state.todoRecord[0].total--;
    },
    onDiscard(state) {
      state.todoRecord[2].total++;
      state.todoRecord[0].total--;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
