import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      title: "Курс по химии",
      subtitle: "Проверьте знания, поделитесь опытом и вдохновите коллег",
      start: "Начать курс",
      admin: "Админка",
      login: "Вход",
      logout: "Выйти",
      light: "Светлая",
      dark: "Тёмная",
      chapters: "Главы",
      tests: "Тесты",
      results: "Результат",
      save: "Сохранить",
      addQuestion: "Добавить вопрос",
      addOption: "Добавить вариант",
      delete: "Удалить"
    }
  },
  kz: {
    translation: {
      title: "Курс по химии",
      subtitle: "Білімді тексеріңіз, тәжірибе бөлісіңіз және әріпестерді шабыттандырыңыз",
      start: "Курсты бастау",
      admin: "Әкімші",
      login: "Кіру",
      logout: "Шығу",
      light: "Жарық",
      dark: "Қараңғы",
      chapters: "Тараулар",
      tests: "Тесттер",
      results: "Нәтиже",
      save: "Сақтау",
      addQuestion: "Сұрақ қосу",
      addOption: "Жауап қосу",
      delete: "Жою"
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false }
})

export default i18n
