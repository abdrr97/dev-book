import React from 'react'
import ReactDOM from 'react-dom'
import { AuthProvider } from './context/authContext'
import { ChatProvider } from './context/chatContext'
import { PortfolioProvider } from './context/context'

import { App } from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './index.css'

const root = document.getElementById('root')

ReactDOM.render(
  <AuthProvider>
    <PortfolioProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </PortfolioProvider>
  </AuthProvider>,
  root
)
