// CourseProgress.tsx
import React from "react";
import type { Lesson } from "../types/lesson";

interface Props {
  lessons: Lesson[];
  completedLessons: Record<string, boolean>;
}

export const CourseProgress: React.FC<Props> = ({ lessons, completedLessons }) => {
  const completedCount = lessons.filter(l => completedLessons[l.id]).length;
  const progressPercent = lessons.length ? (completedCount / lessons.length) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1 text-sm text-gray-700 dark:text-gray-300">
        <span>Progress</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
        <div
          className="bg-green-500 h-2 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
