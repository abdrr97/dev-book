import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/authContext'

// components
// import { Navbar, Sidebar, Footer } from './components'
// pages
import { Home, NotFound, Profile } from './pages'
// auth pages
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
// private route
import PrivateRoute from './routes/PrivateRoute'
import { PortfolioProvider } from './context'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <PortfolioProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              {/* <PrivateRoute path='/profile' component={Profile} /> */}

              <Route path='/log-in' component={Login} />
              <Route path='/sign-up' component={SignUp} />
              <Route path='/forgot-password' component={ForgotPassword} />

              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </PortfolioProvider>
      </AuthProvider>
    </>
  )
}
