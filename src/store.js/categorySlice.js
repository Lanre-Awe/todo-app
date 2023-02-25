import { createSlice } from "@reduxjs/toolkit";
const getCategory = () => {
  const categories = localStorage.getItem("CATEGORY");
  if (categories != null) {
    return JSON.parse(categories);
  } else {
    return [];
  }
};
const initialState = {
  categories: getCategory(),
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onAdd(state, action) {
      state.categories.push(action.payload);
    },
    onAddTask(state, action) {
      const taskCategory = state.categories.find(
        (item) => item.category === action.payload.category
      );
      taskCategory.tasks.push(action.payload.tasks);
    },
    onFiltered(state, action) {
      const taskCategory = state.categories.find(
        (item) => item.category === action.payload.category
      );
      taskCategory.tasks = action.payload.tasks;
    },
    onfilterCategory(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryAction = categorySlice.actions;
export default categorySlice;
