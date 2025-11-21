// import React from 'react'
// import { Link } from 'react-router-dom'
// import Card from './Card'
// import type { Lesson } from '../types/lesson'

// export const LessonList: React.FC<{ lessons?: Lesson[] }> = ({ lessons = [] }) => {
//   if (!lessons || lessons.length === 0)
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-400 py-6">
//         No lessons available.
//       </div>
//     )

//   // Utility function for difficulty colors
//   const difficultyColor = (difficulty?: string) => {
//     switch (difficulty?.toLowerCase()) {
//       case 'easy':
//         return 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300'
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'
//       case 'hard':
//         return 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
//       default:
//         return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
//     }
//   }

//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {lessons.map((lesson) => (
//         <Card key={lesson.id}>
//           <div className="flex flex-col h-full">
//             {/* Image */}
//             <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
//               <img
//                 src={lesson.imageUrl || 'https://via.placeholder.com/400x200?text=Lesson+Image'}
//                 alt={lesson.title}
//                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//               />
//             </div>

//             {/* Content */}
//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                   {lesson.title}
//                 </h3>

//                 {/* Difficulty pill */}
//                 {lesson.difficulty && (
//                   <span
//                     className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor(
//                       lesson.difficulty
//                     )}`}
//                   >
//                     {lesson.difficulty}
//                   </span>
//                 )}
//               </div>

//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
//                 {lesson.description || 'No description available for this lesson.'}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="mt-auto">
//               <Link
//                 to={`/lessons/${lesson.id}`}
//                 className="btn-primary inline-block w-full text-center"
//               >
//                 View Lesson
//               </Link>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default LessonList


import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import type { Lesson } from '../types/lesson'
import { getAllLessons } from '../api/api'

const LessonList: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllLessons() // returns array
        setLessons(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load lessons.')
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  if (loading) return <p className="text-center py-6">Loading lessons...</p>
  if (error) return <p className="text-center text-red-500 py-6">{error}</p>
  if (!lessons.length)
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-6">
        No lessons available.
      </div>
    )

  const difficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
    }
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <Card key={lesson.id}>
          <div className="flex flex-col h-full">
            <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
              <img
                src={lesson.imageUrl || 'https://via.placeholder.com/400x200?text=Lesson+Image'}
                alt={lesson.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {lesson.title}
                </h3>
                {lesson.difficulty && (
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor(
                      lesson.difficulty
                    )}`}
                  >
                    {lesson.difficulty}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {lesson.description || 'No description available for this lesson.'}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                to={`/lessons/${lesson.id}`}
                className="btn-primary inline-block w-full text-center"
              >
                View Lesson
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default LessonList
