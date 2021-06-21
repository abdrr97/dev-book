import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// components
// pages
import { Home, NotFound, Profile } from './pages'

// auth pages
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import Portfolio from './pages/Portfolio'

// private route
import PrivateRoute from './routes/PrivateRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatRoom from './pages/ChatRoom'
import { AuthContext } from './context/authContext'
import { db } from './firebase'
import vis from 'ifvisible.js'

export const App = () => {
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    if (!currentUser) return

    const docRef = db.collection('users').doc(currentUser.email)

    vis.on('idle', () => {
      return docRef.update({
        online: 'BUSY',
      })
    })

    vis.on('wakeup', () => {
      return docRef.update({
        online: 'ONLINE',
      })
    })
    vis.setIdleDuration(240)
  }, [currentUser])

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/log-in' component={Login} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/chat-room' component={ChatRoom} />
          <Route path='/p/:username' component={Portfolio} />

          <Route path='*' component={NotFound} />
        </Switch>
        <Footer></Footer>
      </Router>
    </>
  )
}
