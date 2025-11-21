import React from 'react'
import { useDarkMode } from '../context/DarkModeContext'

export const Footer: React.FC = () => {
    const { darkMode } = useDarkMode()

    return (
        <footer className={`mt-auto py-6 px-4 border-t transition-colors duration-300 ${darkMode
                ? 'bg-gray-900 border-gray-800 text-gray-400'
                : 'bg-white border-gray-200 text-gray-600'
            }`}>
            <div className="container mx-auto text-center">
                <p className="text-sm">
                   built with ❤️ & ☕ @ispark_classroom
                </p>

            </div>
        </footer>
    )
}

export default Footer