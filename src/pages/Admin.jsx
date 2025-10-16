import React, {useState, useEffect} from 'react'
import { DEFAULT } from '../data/defaultCourses'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'

function load(){ try{ const r=localStorage.getItem('chem_courses'); return r? JSON.parse(r): null }catch(e){return null} }
function save(data){ localStorage.setItem('chem_courses', JSON.stringify(data)) }

export default function Admin(){
  const { t } = useTranslation()
  const [courses, setCourses] = useState(()=> load() || DEFAULT)
  const [courseIdx, setCourseIdx] = useState(0)

  useEffect(()=> save(courses), [courses])

  function addQuestion(chIdx){
    const q = { id: uuidv4(), question: 'Новый вопрос', options: ['Вариант 1','Вариант 2'], answerIndex:0 }
    setCourses(prev=>{ const next = JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[chIdx].quiz.push(q); return next })
  }
  function addOption(chIdx,qIdx){
    setCourses(prev=>{ const next = JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[chIdx].quiz[qIdx].options.push('Новый вариант'); return next })
  }

  function updateQuestion(chIdx, qIdx, field, value) {
    setCourses(prev=>{
      const next = JSON.parse(JSON.stringify(prev))
      const q = next[courseIdx].chapters[chIdx].quiz[qIdx]
      if(!q) return prev
      if(field === 'question') q.question = value
      else if(field === 'options') q.options = value
      else if(field === 'answerIndex') q.answerIndex = value
      return next
    })
  }

  // Утилиты классов для визуального выделения полей и корректного цвета в тёмной теме
  const inputStyle = "input mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
  const groupStyle = "mb-3"
  const fieldBox = "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg p-4 shadow-sm text-gray-900 dark:text-gray-100"
  const labelStyle = "small block mb-1 text-gray-700 dark:text-gray-300"
  const smallMuted = "small text-gray-600 dark:text-gray-400"

  return (
    <div className="mt-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Админ-панель</h2>
      <div className="card p-6">
        <label className={labelStyle}>Курсы</label>
        <select className={`${inputStyle}`} value={courseIdx} onChange={e=>setCourseIdx(Number(e.target.value))}>
          {courses.map((c,i)=>(<option key={c.id} value={i} className="text-gray-900 dark:text-gray-100">{c.title}</option>))}
        </select>

        <div className="mt-6 space-y-4">
          {courses[courseIdx].chapters.map((ch, ci)=>(
            <div key={ch.id} className={`${fieldBox}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{ch.title}</h4>
                <div className={smallMuted}>{ch.id}</div>
              </div>

              <div className={groupStyle}>
                <label className={labelStyle}>Заголовок</label>
                <input
                  className={inputStyle}
                  value={ch.title}
                  onChange={e=>{ const v=e.target.value; setCourses(prev=>{ const next=JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[ci].title=v; return next })}}
                />
              </div>

              <div className={groupStyle}>
                <label className={labelStyle}>Контент</label>
                <textarea
                  className={inputStyle}
                  rows="4"
                  value={ch.content}
                  onChange={e=>{ const v=e.target.value; setCourses(prev=>{ const next=JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[ci].content=v; return next })}}
                />
              </div>

              <div className={groupStyle}>
                <label className={labelStyle}>Видео (URL)</label>
                <input
                  className={inputStyle}
                  value={ch.video}
                  onChange={e=>{ const v=e.target.value; setCourses(prev=>{ const next=JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[ci].video=v; return next })}}
                />
              </div>

              <div className="mt-4">
                <h5 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Вопросы</h5>

                <div className="space-y-3">
                  {ch.quiz.map((q, qi)=>(
                    <div key={q.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-3 text-gray-900 dark:text-gray-100">
                      <div className="mb-2">
                        <label className={labelStyle}>Вопрос</label>
                        <input
                          className={`${inputStyle} bg-white dark:bg-gray-800`}
                          value={q.question}
                          onChange={e=> updateQuestion(ci,qi,'question', e.target.value)}
                        />
                      </div>

                      <div className="mb-2">
                        <div className={smallMuted}>Варианты</div>
                        <div className="space-y-2">
                          {q.options.map((opt,oi)=>(
                            <div key={oi} className="flex gap-2 items-center">
                              <input
                                className="input flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                value={opt}
                                onChange={e=> updateQuestion(ci,qi,'options', q.options.map((o,i)=> i===oi? e.target.value : o ))}
                              />
                              <button className="btn" onClick={()=> addOption(ci,qi)}>{t('addOption')}</button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <label className={labelStyle}>Правильный ответ</label>
                        <select
                          className="input w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                          value={q.answerIndex}
                          onChange={e=> updateQuestion(ci,qi,'answerIndex', Number(e.target.value))}
                        >
                          {q.options.map((_, idx)=> <option key={idx} value={idx} className="text-gray-900 dark:text-gray-100">{idx+1}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <button className="btn" onClick={()=> addQuestion(ci)}>{t('addQuestion')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button className="btn" onClick={()=>{ save(courses); alert(t('save')) }}>{t('save')}</button>
        </div>
      </div>
    </div>
  )
}
