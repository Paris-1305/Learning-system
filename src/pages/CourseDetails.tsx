// import React from 'react'
// import LessonList from '../components/LessonList'
// import Card from '../components/Card'
// import Button from '../components/Button'
// import type { Lesson } from '../types/lesson'
// import type { Course } from '../types/course'
// import { CourseProgress } from "../components/CourseProgress";

// interface CourseDetailsProps {
//     course?: Course 
//     lessons?: Lesson[]
// }

// export const CourseDetails: React.FC<CourseDetailsProps> = ({ course, lessons }) => {
//     const lessonIndex = 0
//     const featuredLesson = lessons && lessons.length > 0 ? lessons[lessonIndex] : null

//     return (
//         <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
//             {/* Course Header */}
//             <Card className="flex flex-col md:flex-row gap-6">
//                 <img
//                     src={course?.imageUrl || `https://picsum.photos/400/200`}
//                     alt={course?.title || 'Course'}
//                     className="w-full md:w-64 h-48 object-cover rounded-lg"
//                 />
//                 <div className="flex-grow">
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
//                         {course?.title || 'Course Title'}
//                     </h1>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {course?.description?.intro || 'Course description goes here.'}
//                     </p>
//                     <div className="flex items-center gap-4 mb-4">
//                         <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
//                             {course?.difficulty || 'Beginner Friendly'}
//                         </span>
//                         <span className="text-gray-600 dark:text-gray-400 text-sm">
//                             ⏱️ {lessons?.length || 0} lessons
//                         </span>
//                     </div>
//                     <Button variant="primary">Enroll Now</Button>
//                 </div>
//             </Card>

//             {/* Featured Lesson */}
//             {featuredLesson && (
//                 <Card>
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                         Featured Lesson: {featuredLesson.title}
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {featuredLesson.content || 'Lesson content goes here.'}
//                     </p>
//                 </Card>
//             )}

//             {/* All Lessons */}
//             <div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//                     All Lessons
//                 </h2>
//                 <LessonList lessons={lessons || []} />
//             </div>

//             {/* About Section */}
//             {course?.description?.scope && course.description.scope.length > 0 && (
//                 <Card>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                         About This Course
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {course.description.intro}
//                     </p>
//                     <ul className="space-y-2 text-gray-600 dark:text-gray-400">
//                         {course.description.scope.map((item, idx) => (
//                             <li key={idx} className="flex items-start">
//                                 <span className="text-green-500 mr-2">✓</span>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </Card>
//             )}
//         </div>
//     )
// }


// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import LessonList from '../components/LessonList';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import type { Lesson } from '../types/lesson';
// import type { Course } from '../types/course';
// import { CourseProgress } from "../components/CourseProgress";
// import { useAppSelector } from "../store/hooks";

// import { getCourseById, getLessonsByCourse } from "../api/api";

// const CourseDetails: React.FC = () => {
//     const { id } = useParams(); // <-- get course ID from URL
//     const completedLessons = useAppSelector(s => s.progress.completedLessons);

//     const [course, setCourse] = useState<Course | null>(null);
//     const [lessons, setLessons] = useState<Lesson[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 if (!id) return;

//                 // Fetch course
//                 const courseData = await getCourseById(id);
//                 setCourse(courseData);

//                 // Fetch lessons
//                 const lessonData = await getLessonsByCourse(id);
                 
//                 setLessons(lessonData || []); // ✅ use lessonData directly

//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to load course details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadData();
//     }, [id]);

//     if (loading) return <p className="text-center py-6">Loading course...</p>;
//     if (error) return <p className="text-center text-red-500 py-6">{error}</p>;

//     const featuredLesson = lessons.length > 0 ? lessons[0] : null;

//     return (
//         <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
            
//             {/* Course Header */}
//             <Card className="flex flex-col md:flex-row gap-6">
//                 <img
//                     src={course?.imageUrl || `https://picsum.photos/400/200`}
//                     alt={course?.title || 'Course'}
//                     className="w-full md:w-64 h-48 object-cover rounded-lg"
//                 />

//                 <div className="flex-grow">
//                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
//                         {course?.title}
//                     </h1>

//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {course?.description?.intro}
//                     </p>

//                     <div className="flex items-center gap-4 mb-4">
//                         <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 
//                             text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
//                             {course?.difficulty || 'Beginner Friendly'}
//                         </span>

//                         <span className="text-gray-600 dark:text-gray-400 text-sm">
//                             ⏱️ {lessons.length} lessons
//                         </span>
//                     </div>

//                     {/* Progress Bar */}
//                     {lessons.length > 0 && (
//                         <CourseProgress lessons={lessons} completedLessons={completedLessons} />
//                     )}

//                     <Button variant="primary" className="mt-4">
//                         Enroll Now
//                     </Button>
//                 </div>
//             </Card>

//             {/* Featured Lesson */}
//             {featuredLesson && (
//                 <Card>
//                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                         Featured Lesson: {featuredLesson.title}
//                     </h2>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {featuredLesson.content || 'Lesson content not available.'}
//                     </p>
//                 </Card>
//             )}

//             {/* All Lessons */}
//             <div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//                     All Lessons
//                 </h2>

//                 <LessonList lessons={lessons} />
//             </div>

//             {/* About the Course */}
//             {course?.description?.scope && course.description.scope.length > 0 && (
//                 <Card>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                         About This Course
//                     </h3>

//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                         {course.description.intro}
//                     </p>

//                     <ul className="space-y-2 text-gray-600 dark:text-gray-400">
//                         {course.description.scope.map((item, idx) => (
//                             <li key={idx} className="flex items-start">
//                                 <span className="text-green-500 mr-2">✓</span>
//                                 {item}
//                             </li>
//                         ))}
//                     </ul>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default CourseDetails;

import React from 'react';
import LessonList from '../components/LessonList';
import Card from '../components/Card';
import Button from '../components/Button';
import type { Lesson } from '../types/lesson';
import type { Course } from '../types/course';
import { CourseProgress } from "../components/CourseProgress";
import { useAppSelector } from "../store/hooks";

interface CourseDetailsProps {
  course: Course;
  lessons: Lesson[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, lessons }) => {
  const completedLessons = useAppSelector(s => s.progress.completedLessons);

  const featuredLesson = lessons.length > 0 ? lessons[0] : null;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
      {/* Course Header */}
      <Card className="flex flex-col md:flex-row gap-6">
        <img
          src={course.imageUrl || `https://picsum.photos/400/200`}
          alt={course.title}
          className="w-full md:w-64 h-48 object-cover rounded-lg"
        />

        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description?.intro}</p>

          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              {course.difficulty || 'Beginner Friendly'}
            </span>

            <span className="text-gray-600 dark:text-gray-400 text-sm">
              ⏱️ {lessons.length} lessons
            </span>
          </div>

          {lessons.length > 0 && (
            <CourseProgress lessons={lessons} completedLessons={completedLessons} />
          )}

          <Button variant="primary" className="mt-4">Enroll Now</Button>
        </div>
      </Card>

      {/* Featured Lesson */}
      {featuredLesson && (
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Lesson: {featuredLesson.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {featuredLesson.content || 'Lesson content not available.'}
          </p>
        </Card>
      )}

      {/* All Lessons */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Lessons</h2>
        <LessonList lessons={lessons} />
      </div>

      {/* About the Course */}
      {course.description?.scope && course.description.scope.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description.intro}</p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {course.description.scope.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default CourseDetails;
