import React from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_COURSES } from '../data/courseData'
import { loadCourses } from '../data/utils'

export default function CourseList(){
  const courses = loadCourses() || DEFAULT_COURSES
  return (
    <div>
      <h1>Доступные курсы</h1>
      {courses.map(c=>(
        <div className="card" key={c.id}>
          <h2>{c.title}</h2>
          <p className="small">Глав: {c.chapters.length}</p>
          <div style={{marginTop:12}}>
            <Link className="btn" to={`/course/${c.id}`}>Открыть курс</Link>
          </div>
        </div>
      ))}
      <div className="footer"></div>
    </div>
  )
}
