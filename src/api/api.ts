import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // must include /api
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});
// -----------------------------
// COURSE SERVICE
// -----------------------------
export const courseService = {
  getAll() {
    return api.get("/api/courses").then((res) => res.data);
  },

  getById(courseId: number) {
    return api.get(`/api/courses/${courseId}`).then((res) => res.data);
  },

  create(data: unknown) {
    return api.post("/api/courses", data).then((res) => res.data);
  },

  update(courseId: number, data: unknown) {
    return api.put(`/api/courses/${courseId}`, data).then((res) => res.data);
  },

  delete(courseId: number) {
    return api.delete(`/courses/${courseId}`).then((res) => res.data);
  },
};

export const lessonService = {
  getAll(courseId: number) {
    return api.get(`api/courses/${courseId}/lessons`).then((res) => res.data);
  },

  getById(courseId: number, lessonId: number) {
    return api
      .get(`api/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => res.data);
  },

  create(courseId: number, data: unknown) {
    return api
      .post(`api/courses/${courseId}/lessons`, data)
      .then((res) => res.data);
  },

  update(courseId: number, lessonId: number, data: unknown) {
    return api
      .put(`api/courses/${courseId}/lessons/${lessonId}`, data)
      .then((res) => res.data);
  },

  delete(courseId: number, lessonId: number) {
    return api
      .delete(`api/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => res.data);
  },
};

export const getCourses = () => {
  return courseService.getAll();
};

export const getCourseById = (id: number) => {
  return courseService.getById(id);
};