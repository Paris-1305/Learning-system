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

  // selectors
  const coursesEntities = useAppSelector((s) => s.courses.entities ?? {});
  const coursesLoaded = useAppSelector((s) => (s.courses.allIds ?? []).length > 0);
  const lessonsState = useAppSelector(
    (s) => (courseId ? s.lessons.byCourse[String(courseId)] : undefined)
  );

  // fetch course and lessons if not loaded
  useEffect(() => {
    if (!courseId) {
      navigate("/not-found");
      return;
    }

    if (!coursesLoaded) dispatch(fetchCourses());
    if (!coursesEntities[String(courseId)]) dispatch(fetchCourseById(courseId));
    dispatch(fetchLessonsByCourse(courseId));
  }, [courseId, coursesEntities, coursesLoaded, dispatch, navigate]);

  const course: Course | undefined = courseId ? coursesEntities[String(courseId)] : undefined;
  const lessons: Lesson[] = lessonsState?.data ?? [];

  if (!course && !coursesLoaded) return <div className="p-6">Loading course…</div>;
  if (!course) return <NotFound />;

  return <CourseDetails course={course} lessons={lessons} />;
};

export default CourseDetailsWrapper;
