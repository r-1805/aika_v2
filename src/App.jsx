import React, {useEffect, useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import AnimatedBg from './components/AnimatedBg'
import './styles.css'

export default function App(){
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [currentLang, setCurrentLang] = useState('ru')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function switchLang(l) {
    setCurrentLang(l)
    localStorage.setItem('lang', l)
  }

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <AnimatedBg/>
      
      <header className="container mx-auto px-6 py-6 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm rounded-2xl mt-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="logo cursor-pointer bg-transparent border-0 p-0 text-2xl font-bold text-blue-600 dark:text-blue-400 hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
            aria-label="На главную"
          >
            ⚗️ ChemEdu
          </button>
          <div>
            <div className="text-xl font-bold dark:text-white">Курс по химии</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Проверьте знания, поделитесь опытом и вдохновите коллег</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Переключатель языка */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow px-3 py-2 flex gap-1">
            <button 
              className={`px-3 py-1 rounded transition-all ${
                currentLang === 'ru' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-blue-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => switchLang('ru')}
            >
              RU
            </button>
            <button 
              className={`px-3 py-1 rounded transition-all ${
                currentLang === 'kz' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-blue-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => switchLang('kz')}
            >
              KZ
            </button>
          </div>

          {/* Переключатель темы */}
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow px-3 py-2 flex gap-1">
            <button 
              className={`px-3 py-1 rounded transition-all flex items-center gap-2 ${
                theme === 'light' 
                  ? 'bg-yellow-500 text-white shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTheme('light')}
            >
              <span>☀️</span>
              Светлая
            </button>
            <button 
              className={`px-3 py-1 rounded transition-all flex items-center gap-2 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-white shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTheme('dark')}
            >
              <span>🌙</span>
              Тёмная
            </button>
          </div>

          {/* Кнопка админа */}
          <button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            onClick={() => navigate('/admin')}
          >
            <span>⚙️</span>
            Admin
          </button>

          {/* Кнопка входа */}
          <button 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
            onClick={() => navigate('/auth')}
          >
            <span>🔐</span>
            Вход
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/course/:id" element={<CoursePage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
        <div className="footer mt-12"></div>
      </main>
    </div>
  )
}