import { configureStore } from "@reduxjs/toolkit";
import goalLegendSlice from "./goalLegendSlice";
import goalRecordSlice from "./goalsRecordSlice";
import todoLegendSlice from "./todoLegendSlice";
import todoSlice from "./todoRecordSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    goal: goalRecordSlice.reducer,
    todoLegend: todoLegendSlice.reducer,
    goalLegend: goalLegendSlice.reducer,
  },
});
