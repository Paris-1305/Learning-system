import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLessonsByCourse } from "../../api/api";
import type { Lesson } from "../../types/lesson";

interface LessonsByCourse {
  [courseId: string]: {
    data: Lesson[];
    loading: boolean;
    error: string | null;
  };
}

interface LessonsState {
  byCourse: LessonsByCourse;
}

const initialState: LessonsState = {
  byCourse: {},
};

// Async thunk with caching check
export const fetchLessonsByCourse = createAsyncThunk(
  "lessons/fetchByCourse",
  async (courseId: string, { getState }) => {
    const state = getState() as { lessons: LessonsState };
    if (state.lessons.byCourse[courseId]?.data.length) {
      // Return cached data
      return { courseId, data: state.lessons.byCourse[courseId].data };
    }
    const data = await getLessonsByCourse(courseId);
    return { courseId, data };
  }
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsByCourse.pending, (state, action) => {
        const id = action.meta.arg;
        state.byCourse[id] = { data: [], loading: true, error: null };
      })
      .addCase(fetchLessonsByCourse.fulfilled, (state, action) => {
        const { courseId, data } = action.payload;
        state.byCourse[courseId] = { data, loading: false, error: null };
      })
      .addCase(fetchLessonsByCourse.rejected, (state, action) => {
        const id = action.meta.arg;
        state.byCourse[id] = { data: [], loading: false, error: action.error.message || "Failed to load lessons" };
      });
  },
});

export default lessonsSlice.reducer;
