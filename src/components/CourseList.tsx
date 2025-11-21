// import React from 'react'
// import { Link } from 'react-router-dom'
// import Card from './Card'
// import type { Course } from '../types/course'

// interface CourseListProps {
//   course: Course
// }

// export const CourseList: React.FC<CourseListProps> = ({ course }) => {
  
//   return (
//     <Card className="flex flex-col">
//       <img
//         src={course.imageUrl ?? `https://picsum.photos/300/300?random=${course.id}`}
//         alt={course.title}
//         className="w-full h-40 object-cover rounded-lg mb-2"
//       />
//       <h3 className="text-lg font-semibold dark:text-white" >{course.title}</h3>
//       <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
//         {course.description?.intro ?? 'No description available.'}
//       </p>
//       <Link
//         to={`/courses/${course.id}`}
//         className="btn-primary mt-3 self-start"
//       >
//         View Course
//       </Link>
//     </Card>
//   )
// }

// export default CourseList

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import type { Course } from "../types/course";
import { getCourses } from "../api/api";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 items-stretch sm:grid-cols-2 lg:grid-cols-1 gap-4">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <img
            src={course.image_url ?? `https://picsum.photos/300/300?random=${course.id}`}
            alt={course.title}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
          <h3 className="text-lg font-semibold dark:text-white">{course.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            {course.description?.intro ?? "No description available."}
          </p>
          <Link
            to={`/courses/${course.id}`}
            className="btn-primary mt-3 self-start"
          >
            View Course
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default CourseList;
