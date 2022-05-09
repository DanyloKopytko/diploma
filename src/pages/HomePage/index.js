import React, { useEffect } from 'react'

import './index.css'

const HomePage = ({ history }) => {
  useEffect(() => {
    const backgroundImage = require('../../assets/images/homepage.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  const redirect = (url) => history.push(url)

  return (
    <div className="div-main-body">
      <div className={window.innerWidth <= 800 ? 'div-main-sm' : 'div-main-xl'}>
        <div className="div-text text-align-center">
          <span>Find your perfect pcr-test or vaccination post with PCR-Surfer</span>
          <br />
          <span>Never play with your health, get a health checkout now</span>
          <div className="div-btns">
            <div className="div-btns-default login" onClick={() => redirect('/login')}>
              Login
            </div>
            <div className="div-btns-default register" onClick={() => redirect('/register')}>
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
