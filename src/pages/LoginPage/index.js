import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import { signIn } from '../../actions/userFlow'

import './index.css'

const LoginPage = ({ signIn, history }) => {
  const alert = useAlert()

  useEffect(() => {
    const backgroundImage = require('../../assets/images/homepage.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post(`${process.env.REACT_APP_API_BACKEND_URL}/login`, {
        mail: e.target.email.value,
        pass: e.target.pass.value,
      })

      await signIn(res.data)
      alert.success('Login successful')
      history.push('/settings')
    } catch (e) {
      alert.error('Invalid username or password')
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <div className={window.innerWidth <= 900 ? 'div-login-main-sm' : 'div-login-main'}>
        <input name="email" type="mail" placeholder="Email" className="div-login-email" />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          className="div-login-email"
          style={{ marginTop: '3vh' }}
        />
        <button className="div-login-main-btn">Log in</button>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </form>
  )
}

const mapDispatchToProps = { signIn }

export default connect(null, mapDispatchToProps)(LoginPage)
