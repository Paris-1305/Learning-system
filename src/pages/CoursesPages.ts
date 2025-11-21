import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../store/slices/coursesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const CoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const coursesState = useAppSelector((s) => s.courses);

  useEffect(() => {
    if (!coursesState.allIds.length) dispatch(fetchCourses());
  }, [dispatch, coursesState.allIds.length]);

  if (coursesState.loading) return <div className="p-6">Loading courses…</div>;
  if (coursesState.error) return <div className="p-6 text-red-500">Error: {coursesState.error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Courses</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coursesState.allIds.map((id) => {
          const c = coursesState.entities[id];
          return (
            <Link key={id} to={`/courses/${id}`} className="block p-4 border rounded hover:shadow">
              <h2 className="font-semibold">{c.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
