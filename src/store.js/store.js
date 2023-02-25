import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import categoryTask from "./categoryTask";
import descriptionSlice from "./descriptionSlice";
import sideSlice from "./sideSlice";
import todoLegendSlice from "./todoLegendSlice";
import todoSlice from "./todoRecordSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    todoLegend: todoLegendSlice.reducer,
    categories: categorySlice.reducer,
    tasks: categoryTask.reducer,
    description: descriptionSlice.reducer,
    side: sideSlice.reducer,
  },
});
