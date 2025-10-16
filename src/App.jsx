import React, {useEffect, useState} from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import { useTranslation } from 'react-i18next'
import AnimatedBg from './components/AnimatedBg'

export default function App(){
  const { t, i18n } = useTranslation()
  const [theme, setTheme] = useState(localStorage.getItem('theme')||'light')
  const navigate = useNavigate()

  useEffect(()=>{
    document.body.classList.remove('light','dark')
    document.body.classList.add(theme)
    localStorage.setItem('theme', theme)
  },[theme])

  function switchLang(l){
    i18n.changeLanguage(l)
    localStorage.setItem('lang', l)
  }

  return (
    <div>
      <AnimatedBg/>
      <header className="container header py-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="logo cursor-pointer bg-transparent border-0 p-0"
            onClick={()=>navigate('/')}
            aria-label="На главную"
          >
            ChemEdu
          </button>
          <div>
            <div className="text-xl font-bold">{t('title')}</div>
            <div className="small">{t('subtitle')}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="lang-switch card p-2">
            <button className="px-3 py-1 rounded" onClick={()=>switchLang('ru')}>RU</button>
            <button className="px-3 py-1 rounded" onClick={()=>switchLang('kz')}>KZ</button>
          </div>

          <div className="theme-switch card p-2">
            <button className="px-3 py-1 rounded" onClick={()=>setTheme('light')}>{t('light')}</button>
            <button className="px-3 py-1 rounded" onClick={()=>setTheme('dark')}>{t('dark')}</button>
          </div>

          <div className="card p-2">
            <button className="btn" onClick={()=>navigate('/auth')}>{t('login')}</button>
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/course/:id" element={<CoursePage/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
        <div className="footer"></div>
      </main>
    </div>
  )
}
