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

// Helper function to ensure the baseURL always ends with '/api'
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL ?? "https://backend-learning-system.onrender.com/api";
  
  // Ensure the base URL is just the root domain without /api
  let rootUrl = envUrl;
  if (rootUrl.endsWith('/api')) {
      rootUrl = rootUrl.slice(0, -4); // Remove '/api' if it's there
  }
  
  // Return the root URL plus the explicit /api prefix
  return rootUrl + "/api";
};

export const api = axios.create({
  // Use the guaranteed, non-redundant base URL
  baseURL: getBaseUrl(), 
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_API_KEY ?? "test-api-key-12345"}`,
  },
});

// -----------------------------
// COURSE SERVICE
// -----------------------------
export const courseService = {
  getAll() {
    // This will now request: baseURL + "/courses" -> .../api/courses
    return api.get("/courses").then((res) => {
      console.log("[API] Fetched all courses:", res.data);
      return res.data;
    });
  },

  getById(courseId: number) {
    return api.get(`/courses/${courseId}`).then((res) => {
      console.log(`[API] Fetched course ${courseId}:`, res.data);
      return res.data;
    });
  },

  create(data: unknown) {
    return api.post("/courses", data).then((res) => {
      console.log("[API] Created course:", res.data);
      return res.data;
    });
  },

  update(courseId: number, data: unknown) {
    return api.put(`/courses/${courseId}`, data).then((res) => {
      console.log(`[API] Updated course ${courseId}:`, res.data);
      return res.data;
    });
  },

  delete(courseId: number) {
    return api.delete(`/courses/${courseId}`).then((res) => {
      console.log(`[API] Deleted course ${courseId}:`, res.data);
      return res.data;
    });
  },
};

// -----------------------------
// LESSON SERVICE
// -----------------------------
export const lessonService = {
  getAll(courseId: number) {
    return api.get(`/courses/${courseId}/lessons`).then((res) => {
      console.log(`[API] Fetched lessons for course ${courseId}:`, res.data);
      return res.data;
    });
  },

  getById(courseId: number, lessonId: number) {
    return api.get(`/courses/${courseId}/lessons/${lessonId}`).then((res) => {
      console.log(`[API] Fetched lesson ${lessonId} for course ${courseId}:`, res.data);
      return res.data;
    });
  },

  create(courseId: number, data: unknown) {
    return api.post(`/courses/${courseId}/lessons`, data).then((res) => {
      console.log(`[API] Created lesson for course ${courseId}:`, res.data);
      return res.data;
    });
  },

  update(courseId: number, lessonId: number, data: unknown) {
    return api.put(`/courses/${courseId}/lessons/${lessonId}`, data).then((res) => {
      console.log(`[API] Updated lesson ${lessonId} for course ${courseId}:`, res.data);
      return res.data;
    });
  },

  delete(courseId: number, lessonId: number) {
    return api.delete(`/courses/${courseId}/lessons/${lessonId}`).then((res) => {
      console.log(`[API] Deleted lesson ${lessonId} for course ${courseId}:`, res.data);
      return res.data;
    });
  },
};

// Helper functions
export const getCourses = () => courseService.getAll();
export const getLessonsByCourse = (courseId: number) => {
  return lessonService.getAll(courseId);
};

// NOTE: Ensure your back-end defines a route for this, likely at /api/lessons
export const getAllLessons = async () => {
  const res = await api.get(`/lessons`); 
  console.log("[API] Fetched all lessons:", res.data);
  return res.data;
};

export const getCourseById = (id: number) => courseService.getById(id);