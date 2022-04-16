import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRouter from './components/PrivateRouter'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import LinkPage from './pages/LinkPage'
import PointPage from './pages/PointPage'
import SettingsPage from './pages/SettingsPage'
import RegistrationPage from './pages/RegistrationPage'
import NotFoundPage from './pages/NotFoundPage'
import CatalogPage from './pages/CatalogPage'
import FavouritesPage from './pages/FavouritesPage'
import MyPointsPage from './pages/MyPointsPage'

import { signUpByToken, signOut } from './actions/userFlow'

import './App.css'
import 'antd/dist/antd.less'

const App = ({ signUpByToken }) => {
  useEffect(() => {
    async function fetchData() {
      await signUpByToken()
    }
    if (JSON.parse(localStorage.getItem('tokens'))?.accessToken) fetchData()
  }, [signUpByToken])

  return (
    <Router>
      <LinkPage />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/view-point/:id" component={(props) => <PointPage isViewing {...props} />} />
        <Route exact path="/catalog" component={CatalogPage} />
        <PrivateRouter exact path="/add-point" component={PointPage} />
        <PrivateRouter exact path="/my-points" component={MyPointsPage} />
        <PrivateRouter exact path="/update-point/:id" component={PointPage} />
        <PrivateRouter path="/settings" component={() => <SettingsPage />} />
        <PrivateRouter path="/favourites" component={FavouritesPage} />
        <Route component={NotFoundPage} />

        {JSON.parse(localStorage.getItem('tokens'))?.accessToken ? <Redirect to="/catalog" /> : <Redirect to="/" />}
      </Switch>
    </Router>
  )
}

const mapDispatchToProps = { signUpByToken, signOut }

export default connect(null, mapDispatchToProps)(App)
