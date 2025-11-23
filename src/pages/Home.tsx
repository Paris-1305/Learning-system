// import React, { useEffect, useState } from 'react';
// import Button from '../components/Button';
// import CourseList from '../components/CourseList';
// import type { Course } from '../types/course';

// export const Home: React.FC = () => {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch courses from API
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch('/api/courses'); // Adjust this to your actual API endpoint
//         if (!res.ok) throw new Error('Failed to fetch courses');
//         const data: Course[] = await res.json();
//         setCourses(data);
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="animate-fade-in">
//       {/* Hero Section */}
//       <div className="mb-12 text-center py-12 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
//         <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Welcome to Learnify
//         </h1>
//         <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
//           Discover thousands of courses and start your learning journey today
//         </p>
//         <div className="flex gap-4 justify-center">
//           <Button variant="primary">Get Started</Button>
//           <Button variant="outline">Browse Courses</Button>
//         </div>
//       </div>

//       {/* Courses Section */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Popular Courses
//           </h2>
//           <Button variant="secondary">View All</Button>
//         </div>

//         {loading && <div className="p-6">Loading courses...</div>}
//         {error && <div className="p-6 text-red-500">Error: {error}</div>}

//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <CourseList key={course.id} course={course} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//         <div className="card text-center">
//           <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
//             500+
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Courses Available</div>
//         </div>
//         <div className="card text-center">
//           <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
//             10K+
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Active Students</div>
//         </div>
//         <div className="card text-center">
//           <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
//             50+
//           </div>
//           <div className="text-gray-600 dark:text-gray-400">Expert Instructors</div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import CourseList from "../components/CourseList";
import type { Course } from "../types/course";
import { getCourses } from "../api/api";

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err: unknown) {
        console.error(err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="mb-12 text-center py-12 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Learnify
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Discover thousands of courses and start your learning journey today
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">Get Started</Button>
          <Button variant="outline">Browse Courses</Button>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Popular Courses
          </h2>
          <Button variant="secondary">View All</Button>
        </div>

        {loading && <div className="p-6">Loading courses...</div>}
        {error && <div className="p-6 text-red-500">{error}</div>}

        {!loading && !error && <CourseList courses={courses} />}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="card text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            500+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Courses Available</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            10K+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Active Students</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">
            50+
          </div>
          <div className="text-gray-600 dark:text-gray-400">Expert Instructors</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
