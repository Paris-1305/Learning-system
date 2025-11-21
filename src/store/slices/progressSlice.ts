import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  completedLessons: Record<string, boolean>;
}

const savedProgress = localStorage.getItem("userProgress");
const initialState: ProgressState = savedProgress
  ? JSON.parse(savedProgress)
  : { completedLessons: {} };

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    markLessonComplete: (state, action: PayloadAction<string>) => {
      state.completedLessons[action.payload] = true;
      localStorage.setItem("userProgress", JSON.stringify(state));
    },
    markLessonIncomplete: (state, action: PayloadAction<string>) => {
      delete state.completedLessons[action.payload];
      localStorage.setItem("userProgress", JSON.stringify(state));
    },
  },
});

export const { markLessonComplete, markLessonIncomplete } = progressSlice.actions;
export default progressSlice.reducer;
