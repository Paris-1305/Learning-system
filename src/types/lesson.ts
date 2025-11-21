export interface Lesson {
  id: number
  title: string
  content?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  courseId?: number
  imageUrl?: string
  description?: string
}

