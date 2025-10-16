import React, {useState, useEffect, useMemo} from 'react'
import { useParams, Link } from 'react-router-dom'
import { DEFAULT } from '../data/defaultCourses'
import { useTranslation } from 'react-i18next'

function loadCourses(){ try{ const raw = localStorage.getItem('chem_courses'); return raw? JSON.parse(raw): null }catch(e){return null} }
function save(c){ localStorage.setItem('chem_courses', JSON.stringify(c)) }

export default function CoursePage(){
  const { id } = useParams()
  const { t } = useTranslation()
  const stored = loadCourses() || DEFAULT
  const course = stored.find(c=>c.id===id) || DEFAULT[0]
  const [active, setActive] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const [progress, setProgress] = useState(()=> { try{ const p=JSON.parse(localStorage.getItem('chem_progress')||'{}'); return p[id]||0 }catch(e){return 0} })

  useEffect(()=>{ setScore(null); setAnswers({}) },[active])

  function handleAnswer(qid, idx){ setAnswers(a=>({...a, [qid]: idx})) }
  function submit(){
    const qlist = course.chapters[active].quiz || []
    let correct = 0
    qlist.forEach(q=>{ if(answers[q.id]===q.answerIndex) correct++ })
    setScore({correct, total: qlist.length})
    if(qlist.length===0 || (qlist.length>0 && correct/qlist.length>=0.5)){
      const next = Math.max(progress, active+1)
      setProgress(next)
      const all = JSON.parse(localStorage.getItem('chem_progress')||'{}'); all[id]=next; localStorage.setItem('chem_progress', JSON.stringify(all))
    }
  }

  // Поддержка локальных видео в src/video с Vite:
  // импортируем все файлы из src/video как URL (eager + as:'url')
  const localVideos = useMemo(()=> {
    // требует Vite: import.meta.glob с {eager: true, as: 'url'}
    // возвращает объект: { '/src/video/v_1.MOV': '/_assets/v_1.abc123.MOV', ... }
    try {
      return import.meta.glob('/src/video/*', { eager: true, as: 'url' })
    } catch(e) {
      return {}
    }
  }, [])

  // нормализует путь из админки в URL, если файл лежит в src/video
  function resolveVideoUrl(input){
    if(!input) return ''
    const trimmed = String(input).trim()
    // если это YouTube или абсолютный http(s) или путём от public (/video/...), возвращаем как есть
    if(/youtube\.com|youtu\.be/.test(trimmed)) return trimmed
    if(/^https?:\/\//.test(trimmed)) return trimmed
    if(trimmed.startsWith('/')) return trimmed

    // если пользователь указал windows-путь или относительный путь внутри src, берем имя файла
    const filename = trimmed.split(/[\\/]/).pop()
    if(!filename) return trimmed

    // ищем совпадение по имени в локальных видео
    const found = Object.entries(localVideos).find(([key, url]) => key.endsWith('/' + filename) || key.toLowerCase().endsWith('/' + filename.toLowerCase()))
    if(found) return found[1]

    // fallback — если не нашли, вернуть исходное значение (возможно это рабочий путь)
    return trimmed
  }

  const rawVideo = course.chapters[active].video || ''
  const videoUrl = resolveVideoUrl(rawVideo)
  const isYouTube = /youtube\.com|youtu\.be/.test(videoUrl)

  return (
    <div className="mt-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="card p-6">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <div className="mt-4">
            <h3 className="text-xl">{course.chapters[active].title}</h3>
            <p className="small mt-2" style={{whiteSpace:'pre-wrap'}}>{course.chapters[active].content}</p>
            <div className="mt-4">
              {videoUrl ? (
                isYouTube ? (
                  <iframe
                    className="w-full h-72"
                    src={videoUrl.replace('watch?v=','embed/')}
                    title="video"
                    allowFullScreen
                  />
                ) : (
                  <video className="w-full h-72 bg-black" controls>
                    <source src={videoUrl} />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                )
              ) : (
                <div className="small">Видео не добавлено</div>
              )}
            </div>
          </div>
        </div>

        <div className="card p-6 mt-4">
          <h4 className="font-semibold">Тест</h4>
          { (course.chapters[active].quiz||[]).length===0 && <div className="small mt-2">Тест не задан</div> }
          {(course.chapters[active].quiz||[]).map(q=>(
            <div key={q.id} className="mt-3">
              <div className="font-medium">{q.question}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {q.options.map((opt,i)=>(
                  <label key={i} className={'p-3 border rounded cursor-pointer '+ (answers[q.id]===i? 'bg-slate-100':'')}>
                    <input type="radio" name={q.id} checked={answers[q.id]===i} onChange={()=>handleAnswer(q.id,i)} className="mr-2"/> {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="mt-4"><button className="btn" onClick={submit}>{t('results')}</button></div>
          {score && <div className="small mt-3">Результат: {score.correct} / {score.total}</div>}
        </div>
      </div>

      <aside className="card p-4">
        <h4 className="font-semibold">Оглавление</h4>
        <div className="small mt-2">Прогресс: {progress} / {course.chapters.length}</div>
        <div className="mt-4 space-y-2">
          {course.chapters.map((ch, idx)=>(
            <button key={ch.id} className={'w-full text-left p-3 rounded '+ (idx===active? 'bg-slate-100':'')} onClick={()=>setActive(idx)}>{ch.title}</button>
          ))}
        </div>
        <div className="mt-4"><Link to="/">← На главную</Link></div>
      </aside>
    </div>
  )
}
