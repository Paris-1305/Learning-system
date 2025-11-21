import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Moon, Sun, Globe, User } from 'lucide-react'
import { useDarkMode } from '../context/DarkModeContext'  // ← Add this import

export const Navbar: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode()  // ← Use context instead of local state
    const [isLangOpen, setIsLangOpen] = useState(false)
    const [selectedLang, setSelectedLang] = useState('EN')

    // Remove these two lines:
    // const [darkMode, setDarkMode] = useState(false)
    // const toggleDarkMode = () => setDarkMode(!darkMode)

    return (
        <nav className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${darkMode
                ? 'bg-gray-900/95 border-gray-800 text-white'
                : 'bg-white/95 border-gray-200 text-gray-900'
            }`}>
            {/* Rest of your navbar code stays exactly the same */}
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                            <span className="text-white font-bold text-xl">L</span>
                        </div>
                        <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Learnify
                        </span>
                    </Link>

                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${darkMode
                                        ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                            >
                                <Globe className="w-4 h-4" />
                                <span className="font-medium">{selectedLang}</span>
                            </button>

                            {isLangOpen && (
                                <div className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}>
                                    {['EN', 'FR', 'ES', 'DE'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => {
                                                setSelectedLang(lang)
                                                setIsLangOpen(false)
                                            }}
                                            className={`w-full px-4 py-2 text-left transition-colors ${darkMode
                                                    ? 'hover:bg-gray-700 text-gray-200'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                } ${selectedLang === lang ? 'bg-blue-500/10 text-blue-600' : ''}`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg transition-all duration-200 ${darkMode
                                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${darkMode
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }`}>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-white">Hi, User</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar