// import axios from "axios";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://backend-learning-system.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${import.meta.env.VITE_API_KEY ?? "test-api-key-12345"}`,
//   },
// });


// // -----------------------------
// // COURSE SERVICE
// // -----------------------------
// export const courseService = {
//   getAll() {
//     return api.get("/courses").then((res) => {
//       console.log("[API] Fetched all courses:", res.data);
//       return res.data;
//     });
//   },

//   getById(courseId: number) {
//     return api.get(`/courses/${courseId}`).then((res) => {
//       console.log(`[API] Fetched course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   create(data: unknown) {
//     return api.post("/courses", data).then((res) => {
//       console.log("[API] Created course:", res.data);
//       return res.data;
//     });
//   },

//   update(courseId: number, data: unknown) {
//     return api.put(`/courses/${courseId}`, data).then((res) => {
//       console.log(`[API] Updated course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   delete(courseId: number) {
//     return api.delete(`/courses/${courseId}`).then((res) => {
//       console.log(`[API] Deleted course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },
// };

// // -----------------------------
// // LESSON SERVICE
// // -----------------------------
// export const lessonService = {
//   getAll(courseId: number) {
//     return api.get(`/courses/${courseId}/lessons`).then((res) => {
//       console.log(`[API] Fetched lessons for course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   getById(courseId: number, lessonId: number) {
//     return api.get(`/courses/${courseId}/lessons/${lessonId}`).then((res) => {
//       console.log(`[API] Fetched lesson ${lessonId} for course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   create(courseId: number, data: unknown) {
//     return api.post(`/courses/${courseId}/lessons`, data).then((res) => {
//       console.log(`[API] Created lesson for course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   update(courseId: number, lessonId: number, data: unknown) {
//     return api.put(`/courses/${courseId}/lessons/${lessonId}`, data).then((res) => {
//       console.log(`[API] Updated lesson ${lessonId} for course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },

//   delete(courseId: number, lessonId: number) {
//     return api.delete(`/courses/${courseId}/lessons/${lessonId}`).then((res) => {
//       console.log(`[API] Deleted lesson ${lessonId} for course ${courseId}:`, res.data);
//       return res.data;
//     });
//   },
// };

// // Helper functions
// export const getCourses = () => courseService.getAll();
// export const getLessonsByCourse = (courseId: number) => {
//   return lessonService.getAll(courseId);
// };
// export const getAllLessons = async () => {
//   const res = await api.get(`/lessons`); // backend endpoint to get all lessons
//   console.log("[API] Fetched all lessons:", res.data);
//   return res.data;
// };
// export const getCourseById = (id: number) => courseService.getById(id);

import axios from "axios";

// -----------------------------
// Helper function to compute base URL safely
// -----------------------------
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL ?? "https://backend-learning-system.onrender.com/api";

  let rootUrl = envUrl;
  if (rootUrl.endsWith("/api")) {
    rootUrl = rootUrl.slice(0, -4);
  }

  return rootUrl + "/api";
};

// -----------------------------
// Axios instance with debugging interceptors
// -----------------------------
export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_API_KEY ?? "test-api-key-12345"}`,
  },
});

api.interceptors.request.use((config) => {
  console.log("[AXIOS REQUEST]", {
    method: config.method,
    url: `${config.baseURL ?? ""}${config.url ?? ""}`, // safely handle undefined
    headers: config.headers,
    data: config.data,
  });
  return config;
});


// Log every request
api.interceptors.request.use((config) => {
  console.log("[AXIOS REQUEST]", {
    method: config.method,
    url: `${config.baseURL ?? ""}${config.url ?? ""}`, // safe fallback
    headers: config.headers,
    data: config.data,
  });
  return config;
});

// Log every response
api.interceptors.response.use(
  (response) => {
    console.log("[AXIOS RESPONSE]", {
      status: response.status,
      url: `${response.config.baseURL ?? ""}${response.config.url ?? ""}`, // safe fallback
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error("[AXIOS ERROR]", {
      message: error.message,
      code: error.code,
      url: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`, // safe fallback
      method: error.config?.method,
      headers: error.config?.headers,
      status: error.response?.status,
      responseData: error.response?.data,
    });
    return Promise.reject(error);
  }
);

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

// -----------------------------
// LESSON SERVICE
// -----------------------------
export const lessonService = {
  getAll(courseId: number) {
    return api.get(`/courses/${courseId}/lessons`).then((res) => res.data);
  },

  getById(courseId: number, lessonId: number) {
    return api.get(`/courses/${courseId}/lessons/${lessonId}`).then((res) => res.data);
  },

  create(courseId: number, data: unknown) {
    return api.post(`/courses/${courseId}/lessons`, data).then((res) => res.data);
  },

  update(courseId: number, lessonId: number, data: unknown) {
    return api.put(`/courses/${courseId}/lessons/${lessonId}`, data).then((res) => res.data);
  },

  delete(courseId: number, lessonId: number) {
    return api.delete(`/courses/${courseId}/lessons/${lessonId}`).then((res) => res.data);
  },
};

// -----------------------------
// Helper functions
// -----------------------------
export const getCourses = () => courseService.getAll();
export const getLessonsByCourse = (courseId: number) => lessonService.getAll(courseId);
export const getCourseById = (id: number) => courseService.getById(id);

// -----------------------------
// Test fetch immediately (debugging)
// -----------------------------
getCourses()
  .then((courses) => console.log("[DEBUG] Courses fetched:", courses))
  .catch((err) => console.error("[DEBUG] Fetch courses error:", err));
