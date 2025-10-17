import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const chapters = [
        {
            id: 1,
            title: "Глава 1 — Введение",
            description: "Временный текст: основные понятия. Замените при необходимости.",
            icon: '🧪',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 2,
            title: "Глава 2 — Теория",
            description: "Краткая теория.",
            icon: '📚',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 3,
            title: "Глава 3 — Практика",
            description: "Практическое задание.",
            icon: '🔬',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 4,
            title: "Глава 4 — Итоги",
            description: "Выводы и рекомендации.",
            icon: '🏆',
            color: 'from-orange-500 to-red-500',
        }
    ]

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Курс по химии
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Проверьте знания, поделитесь опытом и вдохновите коллег
                </p>

                
            </section>

            {/* Chapters Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {chapters.map((chapter, index) => (
                    <div
                        key={chapter.id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    >
                        <div className={`h-2 bg-gradient-to-r ${chapter.color}`}></div>

                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="text-3xl mr-3">{chapter.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                                    {chapter.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {chapter.description}
                            </p>

                            <Link
                                to={`/course/${chapter.id}`}
                                className={`inline-flex items-center bg-gradient-to-r ${chapter.color} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg`}
                            >
                                Перейти →
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">⚡</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 mb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        🎯 Почему наш курс эффективен?
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">👨‍🔬</div>
                        <h3 className="text-xl font-semibold mb-3">Практические знания</h3>
                        <p className="text-gray-600">Реальные химические эксперименты и задачи</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-3">Интерактивное обучение</h3>
                        <p className="text-gray-600">Тесты, видео и интерактивные материалы</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">🏅</div>
                        <h3 className="text-xl font-semibold mb-3">Сертификация</h3>
                        <p className="text-gray-600">Получите сертификат по окончании курса</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Готовы стать экспертом в химии?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    Присоединяйтесь к тысячам преподавателей, уже прошедших наш курс
                </p>
                <button className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    🧪 Начать обучение бесплатно
                </button>
            </section>
        </div>
    )
}