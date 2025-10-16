import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Auth(){
  const [name, setName] = useState('')
  const nav = useNavigate()
  const { t } = useTranslation()

  function login(){
    if(!name) return alert('Введите имя')
    localStorage.setItem('chem_user', JSON.stringify({name}))
    nav('/')
  }
  return (
    <div className="card p-6 mt-6">
      <h3 className="text-xl font-semibold">{t('login')}</h3>
      <input className="input mt-2" placeholder="Ваше имя" value={name} onChange={e=>setName(e.target.value)} />
      <div className="mt-3"><button className="btn" onClick={login}>Войти</button></div>
    </div>
  )
}
