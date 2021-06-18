import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { ChatProvider } from './context/chatContext'
import { PortfolioProvider } from './context/context'

// components
// import { Navbar, Sidebar, Footer } from './components'
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
import ChatRoom from './pages/ChatRoom'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <ChatProvider>
          <PortfolioProvider>
            <Router>
              <Navbar />
              <main className='container'>
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
              </main>
            </Router>
          </PortfolioProvider>
        </ChatProvider>
      </AuthProvider>
    </>
  )
}
