import React, { useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import './index.css'

const RegistrationPage = ({ history }) => {
  const alert = useAlert()

  useEffect(() => {
    const backgroundImage = require('../../assets/images/registration-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  const handleRegister = (e) => {
    e.preventDefault()
    const bodyFormData = new FormData()

    if (e.target.pass.value !== e.target.passConfirm.value) return alert.error('Passwords are different')

    bodyFormData.set('name', `${e.target.name.value}`)
    bodyFormData.set('surname', `${e.target.lastName.value}`)
    bodyFormData.set('pass', `${e.target.pass.value}`)
    bodyFormData.set('mail', `${e.target.email.value}`)

    axios
      .post(`${process.env.REACT_APP_API_BACKEND_URL}/register`, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        alert.success('Registration Successful')
        history.push('/login')
      })
      .catch((error) => {
        alert.error(error.response.data)
      })
  }

  return (
    <form id="formElem" onSubmit={(e) => handleRegister(e)}>
      <div className={window.innerWidth <= 900 ? 'div-reg-main-sm' : 'div-reg-main'}>
        <input name="name" type="text" placeholder="Name" className="div-reg-email" required />
        <input
          name="lastName"
          type="text"
          placeholder="Surname"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <input
          name="passConfirm"
          type="password"
          placeholder="Confirm your password"
          className="div-reg-email"
          style={{ marginTop: '3vh' }}
          required
        />
        <button className="div-reg-main-btn">Register</button>
        <Link to="/login">Already have an account?</Link>
      </div>
    </form>
  )
}

export default RegistrationPage
