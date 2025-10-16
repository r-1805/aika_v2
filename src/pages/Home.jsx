import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT } from '../data/defaultCourses'
import { useTranslation } from 'react-i18next'

export default function Home(){
  const { t } = useTranslation()
  const course = DEFAULT[0]
  return (
    <div className="mt-8">
      <div className="card p-8 mb-6">
        <h2 className="text-3xl font-bold mb-2">{t('title')}</h2>
        <p className="small mb-4">{t('subtitle')}</p>
        <div className="flex gap-4">
          <Link className="btn" to={`/course/${course.id}`}>{t('start')}</Link>
          <Link className="btn" to="/admin">Admin</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {course.chapters.map(ch=>(
          <div key={ch.id} className="card p-6">
            <h3 className="text-xl font-semibold">{ch.title}</h3>
            <p className="small mt-2">{ch.content}</p>
            <div className="mt-4"><Link to={`/course/${course.id}`} className="small">Перейти →</Link></div>
          </div>
        ))}
      </div>
    </div>
  )
}
