import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import ReactMarkdown from 'react-markdown'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchLessonsByCourse } from '../store/slices/lessonsSlice'
import { markLessonComplete, markLessonIncomplete } from '../store/slices/progressSlice'
import type { Lesson } from '../types/lesson'

interface LessonPageProps {
  lesson?: Lesson
}

const LessonPage: React.FC<LessonPageProps> = ({ lesson: propLesson }) => {
  const { id, courseId } = useParams<{ id?: string; courseId?: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Select lessons from Redux
  const lessonsState = useAppSelector(
    (s) => (courseId ? s.lessons.byCourse[courseId] : undefined)
  )
  const lessons: Lesson[] = lessonsState?.data ?? []

  // Determine current lesson
  const lessonId = id ? Number(id) : undefined
  const lesson =
    propLesson || lessons.find((l) => l.id === lessonId) || (lessons.length > 0 ? lessons[0] : undefined)

  // Lesson completion state from Redux
  const completedLessons = useAppSelector((s) => s.progress.completedLessons)
  const [completed, setCompleted] = useState(lesson ? !!completedLessons[lesson.id] : false)

  // Fetch lessons if courseId exists
  useEffect(() => {
    if (!courseId) return
    if (!lessonsState) {
      dispatch(fetchLessonsByCourse(courseId))
    }
  }, [courseId, lessonsState, dispatch])

  // Update local state when Redux completion changes
  useEffect(() => {
    if (lesson) {
      setCompleted(!!completedLessons[lesson.id])
    }
  }, [lesson, completedLessons])

  if (!lesson) return <div className="p-6 text-red-500">Lesson not found.</div>
  if (lessonsState?.loading) return <div className="p-6">Loading lessons...</div>
  if (lessonsState?.error) return <div className="p-6 text-red-500">{lessonsState.error}</div>

  const markdownContent = lesson.content || `# ${lesson.title}\n\nLesson content goes here.`

const toggleCompletion = () => {
  if (!lesson) return;
  if (completed) {
    dispatch(markLessonIncomplete(lesson.id.toString()));
    setCompleted(false);
  } else {
    dispatch(markLessonComplete(lesson.id.toString()));
    setCompleted(true);
  }
};


  // Map difficulty → color pill
  const difficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300'
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300'
    }
  }

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
        <span>/</span>
        <Link to={courseId ? `/courses/${courseId}` : '#'} className="hover:text-blue-600 dark:hover:text-blue-400">Course</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{lesson.title}</span>
      </div>

      {/* Lesson Card */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty || 'Beginner'}
          </span>
        </div>

        {/* Lesson Image */}
        {lesson.imageUrl && (
          <div className="relative mb-6 overflow-hidden rounded-xl shadow-md">
            <img
              src={lesson.imageUrl}
              alt={lesson.title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Markdown Body */}
        <div className="prose dark:prose-invert max-w-none text-gray-900 dark:text-white">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="primary" onClick={toggleCompletion}>
            {completed ? '✓ Completed' : 'Mark as Complete'}
          </Button>
          <Button variant="secondary" onClick={() => {
            const currentIndex = lessons.findIndex(l => l.id === lesson.id)
            const nextLesson = lessons[currentIndex + 1]
            if (nextLesson && courseId) navigate(`/lessons/${nextLesson.id}?courseId=${courseId}`)
          }}>
            Next Lesson →
          </Button>
        </div>
      </Card>

      {/* Resources Section */}
      <Card>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Additional Resources</h3>
        <div className="space-y-3">
          {[
            { name: '📄 Lesson Notes (PDF)', action: 'Download' },
            { name: '💻 Source Code', action: 'View' },
            { name: '🔗 Official Documentation', action: 'Open' },
          ].map((res) => (
            <a
              key={res.name}
              href="#"
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-900 dark:text-white font-medium">{res.name}</span>
              <span className="text-blue-600 dark:text-blue-400">{res.action}</span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LessonPage
