export interface Course {
  id: number
  title: string
  description?: 
  {
    intro: string
    scope: string []
  }
  category?: string
  imageUrl?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}