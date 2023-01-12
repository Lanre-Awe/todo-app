import { createSlice } from "@reduxjs/toolkit";
const getData = () => {
  const data = localStorage.getItem("GOALRECORD");
  if (data !== null) {
    const recievedData = JSON.parse(data);

    return recievedData;
  } else {
    return null;
  }
};

const initialState = {
  goalRecord: [
    {
      id: "pending",
      total: getData() ? getData().pending : 0,
    },
    {
      id: "completed",
      total: getData() ? getData().finished : 0,
    },
    {
      id: "discarded",
      total: getData() ? getData().discarded : 0,
    },
  ],

  total: 0,
  goals: true,
};

const goalRecordSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addPendingGoal(state) {
      state.goalRecord[0].total++;
    },

    onCompletedGoal(state) {
      state.goalRecord[1].total++;
      state.goalRecord[0].total--;
    },
    onDiscardGoal(state) {
      state.goalRecord[2].total++;
      state.goalRecord[0].total--;
    },
  },
});

export const goalAction = goalRecordSlice.actions;

export default goalRecordSlice;
