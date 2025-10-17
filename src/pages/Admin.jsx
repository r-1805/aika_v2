import React, { useState, useEffect } from 'react'
import { DEFAULT } from '../data/defaultCourses'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

function load() { try { const r = localStorage.getItem('chem_courses'); return r ? JSON.parse(r) : null } catch (e) { return null } }
function save(data) { localStorage.setItem('chem_courses', JSON.stringify(data)) }

export default function Admin() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState(() => load() || DEFAULT)
    const [courseIdx, setCourseIdx] = useState(0)

    useEffect(() => save(courses), [courses])

    function addQuestion(chIdx) {
        const q = { id: uuidv4(), question: 'Новый вопрос', options: ['Вариант 1', 'Вариант 2'], answerIndex: 0 }
        setCourses(prev => { const next = JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[chIdx].quiz.push(q); return next })
    }
    function addOption(chIdx, qIdx) {
        setCourses(prev => { const next = JSON.parse(JSON.stringify(prev)); next[courseIdx].chapters[chIdx].quiz[qIdx].options.push('Новый вариант'); return next })
    }

    function updateQuestion(chIdx, qIdx, field, value) {
        setCourses(prev => {
            const next = JSON.parse(JSON.stringify(prev))
            const q = next[courseIdx].chapters[chIdx].quiz[qIdx]
            if (!q) return prev
            if (field === 'question') q.question = value
            else if (field === 'options') q.options = value
            else if (field === 'answerIndex') q.answerIndex = value
            return next
        })
    }

    // Обновленные стили с современным дизайном
    const inputStyle = "mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
    const groupStyle = "mb-6"
    const fieldBox = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg mb-6"
    const labelStyle = "block mb-2 font-semibold text-gray-700 dark:text-gray-300"
    const smallMuted = "text-sm text-gray-500 dark:text-gray-400"

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Хедер админки */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Админ-панель</h1>
                            <p className="text-xl opacity-90">Управление курсами и контентом</p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2"
                        >
                            ← На главную
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    {/* Выбор курса */}
                    <div className="mb-8">
                        <label className={labelStyle}>🎯 Выберите курс</label>
                        <select className={`${inputStyle} text-lg`} value={courseIdx} onChange={e => setCourseIdx(Number(e.target.value))}>
                            {courses.map((c, i) => (
                                <option key={c.id} value={i} className="text-gray-900 dark:text-gray-100">{c.title}</option>
                            ))}
                        </select>
                    </div>

                    {/* Редактирование глав */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📖 Редактирование глав курса</h2>

                        {courses[courseIdx].chapters.map((ch, ci) => (
                            <div key={ch.id} className={fieldBox}>
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h4 className="font-bold text-xl text-gray-800 dark:text-white flex items-center gap-2">
                                        <span>📚</span>
                                        {ch.title}
                                    </h4>
                                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        Глава {ci + 1}
                                    </div>
                                </div>

                                {/* Заголовок главы */}
                                <div className={groupStyle}>
                                    <label className={labelStyle}>✏️ Заголовок главы</label>
                                    <input
                                        className={inputStyle}
                                        value={ch.title}
                                        onChange={e => {
                                            const v = e.target.value;
                                            setCourses(prev => {
                                                const next = JSON.parse(JSON.stringify(prev));
                                                next[courseIdx].chapters[ci].title = v;
                                                return next
                                            })
                                        }}
                                    />
                                </div>

                                {/* Контент главы */}
                                <div className={groupStyle}>
                                    <label className={labelStyle}>📝 Содержание главы</label>
                                    <textarea
                                        className={inputStyle}
                                        rows="6"
                                        value={ch.content}
                                        onChange={e => {
                                            const v = e.target.value;
                                            setCourses(prev => {
                                                const next = JSON.parse(JSON.stringify(prev));
                                                next[courseIdx].chapters[ci].content = v;
                                                return next
                                            })
                                        }}
                                    />
                                </div>

                                {/* Видео */}
                                <div className={groupStyle}>
                                    <label className={labelStyle}>🎬 Видео (URL или путь к файлу)</label>
                                    <input
                                        className={inputStyle}
                                        value={ch.video}
                                        placeholder="v_1.MOV или https://example.com/video.mp4"
                                        onChange={e => {
                                            const v = e.target.value;
                                            setCourses(prev => {
                                                const next = JSON.parse(JSON.stringify(prev));
                                                next[courseIdx].chapters[ci].video = v;
                                                return next
                                            })
                                        }}
                                    />
                                    <p className={smallMuted + " mt-2"}>
                                        💡 Используйте: /video/v_1.MOV, /video/v_2.MOV и т.д. для файлов в папке public/video/
                                    </p>
                                </div>

                                {/* Вопросы теста */}
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                                            <span>📋</span>
                                            Вопросы теста
                                        </h5>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all flex items-center gap-2"
                                            onClick={() => addQuestion(ci)}
                                        >
                                            <span>+</span>
                                            Добавить вопрос
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {ch.quiz.map((q, qi) => (
                                            <div key={q.id} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                                                {/* Вопрос */}
                                                <div className="mb-4">
                                                    <label className={labelStyle}>❓ Вопрос {qi + 1}</label>
                                                    <input
                                                        className={inputStyle}
                                                        value={q.question}
                                                        onChange={e => updateQuestion(ci, qi, 'question', e.target.value)}
                                                    />
                                                </div>

                                                {/* Варианты ответов */}
                                                <div className="mb-4">
                                                    <label className={labelStyle}>📝 Варианты ответов</label>
                                                    <div className="space-y-3">
                                                        {q.options.map((opt, oi) => (
                                                            <div key={oi} className="flex gap-3 items-center">
                                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${oi === q.answerIndex
                                                                    ? 'bg-green-500 border-green-500 text-white'
                                                                    : 'bg-white border-gray-300 dark:bg-gray-600 dark:border-gray-500'
                                                                    }`}>
                                                                    {oi === q.answerIndex && '✓'}
                                                                </div>
                                                                <input
                                                                    className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    value={opt}
                                                                    onChange={e => updateQuestion(ci, qi, 'options', q.options.map((o, i) => i === oi ? e.target.value : o))}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button
                                                        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
                                                        onClick={() => addOption(ci, qi)}
                                                    >
                                                        <span>+</span>
                                                        Добавить вариант
                                                    </button>
                                                </div>

                                                {/* Правильный ответ */}
                                                <div className="flex items-center gap-3">
                                                    <label className={labelStyle}>✅ Правильный ответ</label>
                                                    <select
                                                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={q.answerIndex}
                                                        onChange={e => updateQuestion(ci, qi, 'answerIndex', Number(e.target.value))}
                                                    >
                                                        {q.options.map((_, idx) => (
                                                            <option key={idx} value={idx} className="text-gray-900 dark:text-gray-100">
                                                                Вариант {idx + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка сохранения */}
                    <div className="mt-8 flex justify-end">
                        <button
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-3"
                            onClick={() => { save(courses); alert('✅ Изменения успешно сохранены!') }}
                        >
                            <span>💾</span>
                            Сохранить все изменения
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}