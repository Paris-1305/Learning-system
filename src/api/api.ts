import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // Append the /api here
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
    return api.get("/courses").then((res) => res.data);
  },

  getById(courseId: number) {
    return api.get(`/courses/${courseId}`).then((res) => res.data);
  },

  create(data: unknown) {
    return api.post("/courses", data).then((res) => res.data);
  },

  update(courseId: number, data: unknown) {
    return api.put(`/courses/${courseId}`, data).then((res) => res.data);
  },

  delete(courseId: number) {
    return api.delete(`/courses/${courseId}`).then((res) => res.data);
  },
};

export const lessonService = {
  getAll(courseId: number) {
    return api.get(`/courses/${courseId}/lessons`).then((res) => res.data);
  },

  getById(courseId: number, lessonId: number) {
    return api
      .get(`/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => res.data);
  },

  create(courseId: number, data: unknown) {
    return api
      .post(`/courses/${courseId}/lessons`, data)
      .then((res) => res.data);
  },

  update(courseId: number, lessonId: number, data: unknown) {
    return api
      .put(`/courses/${courseId}/lessons/${lessonId}`, data)
      .then((res) => res.data);
  },

  delete(courseId: number, lessonId: number) {
    return api
      .delete(`/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => res.data);
  },
};

export const getCourses = () => {
  return courseService.getAll();
};

export const getCourseById = (id: number) => {
  return courseService.getById(id);
};