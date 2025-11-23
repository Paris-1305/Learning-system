// // import React, { useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import CourseDetails from "../pages/CourseDetails";
// // import { useAppDispatch, useAppSelector } from "../store/hooks";
// // import { fetchCourseById, fetchCourses } from "../store/slices/coursesSlice";
// // import { fetchLessonsByCourse } from "../store/slices/lessonsSlice";
// // import type { Lesson } from "../types/lesson";
// // import type { Course } from "../types/course";
// // import { NotFound } from "../pages/NotFound";

// // const CourseDetailsWrapper: React.FC = () => {
// //   const { courseId } = useParams<{ courseId?: string }>();
// //   const navigate = useNavigate();
// //   const dispatch = useAppDispatch();

// //   // selectors
// //   const coursesEntities = useAppSelector((s) => s.courses.entities ?? {});
// //   const coursesLoaded = useAppSelector((s) => (s.courses.allIds ?? []).length > 0);
// //   const lessonsState = useAppSelector(
// //     (s) => (courseId ? s.lessons.byCourse[String(courseId)] : undefined)
// //   );

// //   // fetch course and lessons if not loaded
// //   useEffect(() => {
// //     if (!courseId) {
// //       navigate("/not-found");
// //       return;
// //     }

// //     if (!coursesLoaded) dispatch(fetchCourses());
// //     if (!coursesEntities[String(courseId)]) dispatch(fetchCourseById(courseId));
// //     dispatch(fetchLessonsByCourse(courseId));
// //   }, [courseId, coursesEntities, coursesLoaded, dispatch, navigate]);

// //   const course: Course | undefined = courseId ? coursesEntities[String(courseId)] : undefined;
// //   const lessons: Lesson[] = lessonsState?.data ?? [];

// //   if (!course && !coursesLoaded) return <div className="p-6">Loading course…</div>;
// //   if (!course) return <NotFound />;

// //   return <CourseDetails course={course} lessons={lessons} />;
// // };

// // export default CourseDetailsWrapper;

// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import CourseDetails from "../pages/CourseDetails";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { fetchCourseById, fetchCourses } from "../store/slices/coursesSlice";
// import { fetchLessonsByCourse } from "../store/slices/lessonsSlice";
// import type { Lesson } from "../types/lesson";
// import type { Course } from "../types/course";
// import { NotFound } from "../pages/NotFound";

// const CourseDetailsWrapper: React.FC = () => {
//   const { courseId } = useParams<{ courseId?: string }>();
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   // Keep courseId as string for Redux lookups
//   const courseIdStr = courseId ?? "";
//   // Convert to number for API calls if needed
//   const numericCourseId = Number(courseIdStr);

//   // Hooks must be called unconditionally
//   const coursesEntities = useAppSelector((s) => s.courses.entities ?? {});
//   const coursesLoaded = useAppSelector((s) => (s.courses.allIds ?? []).length > 0);
//   const lessonsState = useAppSelector(
//     (s) => s.lessons.byCourse[courseIdStr] // use string key
//   );

//   // Redirect if courseId is invalid
//   useEffect(() => {
//     if (!courseId || isNaN(numericCourseId)) {
//       navigate("/not-found");
//       return;
//     }

//     if (!coursesLoaded) dispatch(fetchCourses());

//     if (!coursesEntities[courseIdStr]) {
//       dispatch(fetchCourseById(numericCourseId)); // API expects number
//     }

//     if (!lessonsState || lessonsState.data.length === 0) {
//       dispatch(fetchLessonsByCourse(numericCourseId)); // API expects number
//     }
//   }, [
//     courseIdStr,
//     numericCourseId,
//     coursesEntities,
//     coursesLoaded,
//     lessonsState,
//     dispatch,
//     navigate,
//   ]);

//   const course: Course | undefined = coursesEntities[courseIdStr];
//   const lessons: Lesson[] = lessonsState?.data ?? [];

//   if (!course && !coursesLoaded) return <div className="p-6">Loading course…</div>;
//   if (!course) return <NotFound />;

//   return <CourseDetails course={course} lessons={lessons} />;
// };

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCourseById, fetchCourses } from "../store/slices/coursesSlice";
import { fetchLessonsByCourse } from "../store/slices/lessonsSlice";
import type { Lesson } from "../types/lesson";
import type { Course } from "../types/course";
import { NotFound } from "../pages/NotFound";

const CourseDetailsWrapper: React.FC = () => {
  const { courseId } = useParams<{ courseId?: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // -------------------------------
  // Call all hooks unconditionally
  // -------------------------------
  const coursesEntities = useAppSelector((s) => s.courses.entities);
  const coursesLoaded = useAppSelector((s) => s.courses.allIds.length > 0);
  const lessonsState = useAppSelector((s) =>
    courseId ? s.lessons.byCourse[courseId] : undefined
  );

  // -------------------------------
  // Effect for fetching data
  // -------------------------------
  useEffect(() => {
    if (!courseId) {
      navigate("/not-found");
      return;
    }

    if (!coursesLoaded) dispatch(fetchCourses());
    if (!coursesEntities[courseId]) dispatch(fetchCourseById(courseId));
    dispatch(fetchLessonsByCourse(courseId));
  }, [courseId, coursesEntities, coursesLoaded, dispatch, navigate]);

  const course: Course | undefined = courseId ? coursesEntities[courseId] : undefined;
  const lessons: Lesson[] = lessonsState?.data ?? [];

  // -------------------------------
  // Render logic
  // -------------------------------
  if (!courseId) return null; // safeguard
  if (!course && !coursesLoaded) return <div className="p-6">Loading course…</div>;
  if (!course) return <NotFound />;

  return <CourseDetails course={course} lessons={lessons} />;
};

export default CourseDetailsWrapper;

