import { createSlice } from "@reduxjs/toolkit";
const getCatTask = () => {
  const data = localStorage.getItem("ONSHOWCATEGORY");
  return JSON.parse(data);
};
const initialState = {
  categoryTask: getCatTask(),
};
const categoryTask = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    onAdd(state, action) {
      state.categoryTask = action.payload;
    },
    onAddTask(state, action) {
      state.categoryTask.tasks.push(action.payload);
    },
    onfilter(state, action) {
      state.categoryTask.tasks = action.payload;
    },
  },
});

export const taskAction = categoryTask.actions;
export default categoryTask;
