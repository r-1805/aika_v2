import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CoursePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [videoError, setVideoError] = useState(false)

    // Функция для получения ID видео
    function getVideoId(chapterId) {
        const videoIds = {
            1: '1cQhZN22mPwM_4VtGG_FmHzM_OWvAIOXk',
            2: '1hAcAV27ln_nwuJ3tJOLVq9kXjfMTnTDb',
            3: '1Ej4ZoDMUna3hVkUthgt2hG3OdOLaIZZm',
            4: '1_kVCifNK1FY_swDIx_uD-HPRbOlCnrNq'
        }
        return videoIds[chapterId]
    }

    // Данные для глав
    const chaptersData = {
        1: { title: "Введение", description: "Временный текст: основные понятия. Замените при необходимости." },
        2: { title: "Теория", description: "Краткая теория." },
        3: { title: "Практика", description: "Практическое задание." },
        4: { title: "Итоги", description: "Выводы и рекомендации." }
    }

    const currentChapter = chaptersData[id] || chaptersData[1]

    // Сброс ошибки при смене главы
    useEffect(() => {
        setVideoError(false)
    }, [id])

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">Курс по химии</h1>
                    <p className="text-xl opacity-90">Проверьте знания, поделитесь опытом и вдохновите коллег</p>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Курс: Современная химия для преподавателей</h2>

                    {/* Контент главы */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8 border-l-4 border-blue-500">
                        <h3 className="text-xl font-semibold mb-4">Глава {id} — {currentChapter.title}</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {currentChapter.description}
                        </p>
                    </div>

                    {/* Видео блок */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-200">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <span className="mr-2">🎬</span>
                            БАТАРЕЙКА ИЗ МОНЕТ
                        </h4>

                        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                {!videoError ? (
                                    <iframe
                                        src={`https://drive.google.com/file/d/${getVideoId(id)}/preview`}
                                        className="w-full h-full"
                                        style={{
                                            aspectRatio: '16/9',
                                            border: 'none'
                                        }}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media; fullscreen"
                                        allowFullScreen
                                        title={`Video chapter ${id}`}
                                        onError={() => setVideoError(true)}
                                    />
                                ) : (
                                    <div className="text-white text-center p-8">
                                        <div className="text-4xl mb-4">📹</div>
                                        <p className="text-lg mb-4">Не удалось загрузить видео</p>
                                        <a
                                            href={`https://drive.google.com/file/d/${getVideoId(id)}/view`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition-colors"
                                        >
                                            Открыть видео в новой вкладке
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-600 text-sm">
                            <span>0,01 / 1,25 • Видео загружено с Google Drive</span>
                            <a
                                href={`https://drive.google.com/file/d/${getVideoId(id)}/view`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center"
                            >
                                <span className="mr-1">↗</span>
                                Открыть в новой вкладке
                            </a>
                        </div>

                        {/* Альтернативные решения */}
                        {videoError && (
                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-yellow-800 text-sm mb-2">
                                    <strong>Совет:</strong> Если видео не воспроизводится:
                                </p>
                                <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
                                    <li>Нажмите "Открыть в новой вкладке"</li>
                                    <li>Убедитесь, что файл в Google Drive доступен для просмотра</li>
                                    <li>Попробуйте обновить страницу (Ctrl+F5)</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Навигация */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {/* Тест */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                                <h4 className="text-xl font-semibold mb-4 flex items-center">
                                    <span className="mr-2">📝</span>
                                    Тест
                                </h4>
                                <p className="text-lg font-medium mb-4">Что такое молекула?</p>

                                <div className="space-y-3">
                                    {['Агрегат', 'Малая частица', 'Система атомов'].map((option, index) => (
                                        <label key={index} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                                            <input type="radio" name="molecule" className="mr-3" />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>

                                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold mt-6 hover:shadow-lg transition-all">
                                    Проверить результат
                                </button>
                            </div>
                        </div>

                        {/* Прогресс */}
                        <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-md p-6 border border-gray-200">
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="mr-2">📊</span>
                                Прогресс
                            </h4>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Прогресс:</span>
                                    <span className="font-semibold">{id} / 4</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full transition-all"
                                        style={{ width: `${(id / 4) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((chapterId) => (
                                    <div
                                        key={chapterId}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${chapterId == id
                                                ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold transform scale-105'
                                                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        onClick={() => navigate(`/course/${chapterId}`)}
                                    >
                                        Глава {chapterId} — {chaptersData[chapterId].title}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold mt-6 hover:bg-gray-900 transition-colors flex items-center justify-center"
                            >
                                ← На главную
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}