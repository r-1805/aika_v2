// Default course data stored in localStorage key "dh_course_v2"
export const DEFAULT_COURSES = [
  {
    id: "course-1",
    title: "Курс: Основы веба",
    chapters: [
      {
        id: "c1",
        title: "Глава 1 — Введение",
        content: "Временный текст: в этой главе вы познакомитесь с базовыми понятиями. Замените этот текст на свой.",
            video: "\video\v_1.MOV",
        quiz: [
          { id: "q1", question: "Что такое HTML?", options: ["Язык стилей","Язык разметки","Язык программирования"], answerIndex: 1 }
        ]
      },
      {
        id: "c2",
        title: "Глава 2 — Теория",
        content: "Временный текст: краткая теория и пояснения по теме.",
          video: "\video\v_2.MOV",
        quiz: []
      },
      {
        id: "c3",
        title: "Глава 3 — Практика",
        content: "Временный текст: практическое задание.",
          video: "\video\v_3.MOV",
        quiz: []
      },
      {
        id: "c4",
        title: "Глава 4 — Итоги",
        content: "Временный текст: замечания, выводы и рекомендации.",
          video: "\video\v_4.MOV",
        quiz: []
      }
    ]
  }
]
