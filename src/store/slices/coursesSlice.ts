
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses, getCourseById } from "../../api/api";
import type { Course } from "../../types/course";

interface CoursesState {
  entities: Record<string, Course>;
  allIds: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  entities: {},
  allIds: [],
  loading: false,
  error: null,
};

// Fetch all courses
export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const data = await getCourses();
  return data;
});

// Fetch a single course by ID
export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id: string) => {
    const data = await getCourseById(id);
    return data;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((course) => {
          state.entities[String(course.id)] = course;
          if (!state.allIds.includes(String(course.id))) state.allIds.push(String(course.id));
        });
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load courses";
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        const course = action.payload;
        state.entities[String(course.id)] = course;
        if (!state.allIds.includes(String(course.id))) state.allIds.push(String(course.id));
      });
  },
});

export default coursesSlice.reducer;
