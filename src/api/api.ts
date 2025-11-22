import axios from "axios";
import type { Course } from "../types/course";
import type { Lesson } from "../types/lesson";

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL ?? "https://backend-learning-system.onrender.com"}/api`,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
//   },
// });

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://backend-learning-system.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});


console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API KEY:", import.meta.env.VITE_API_KEY);

// Courses
export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/courses");
  return response.data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get<Course>(`/courses/${id}`);
  return response.data;
};

// api.ts
export const getAllLessons = async (): Promise<Lesson[]> => {
  const response = await api.get("/lessons") // no need for <Lesson[]>
  return response.data.lessons // <-- return the array directly
}


// Get lessons for a specific course
export const getLessonsByCourse = async (courseId: string): Promise<Lesson[]> => {
  const response = await api.get<{
    course_id: number;
    course_title: string;
    lessons: Lesson[];
  }>(`/courses/${courseId}/lessons`);
  return response.data.lessons;
};

// Get a single lesson by ID
export const getLessonById = async (lessonId: string): Promise<Lesson> => {
  const response = await api.get<Lesson>(`/lessons/${lessonId}`);
  return response.data;
};