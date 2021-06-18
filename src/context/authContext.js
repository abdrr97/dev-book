import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import PageLoading from '../components/PageLoading'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    const docRef = db.collection('users').doc(currentUser.email)
    return docRef
      .update({
        online: false,
      })
      .finally(() => {
        return auth.signOut()
      })
  }

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
  }

  const updateEmail = (email) => {
    return currentUser.updateEmail(email)
  }
  const updatePassword = (password) => {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.email)
      if (currentUser) {
        docRef.update({
          online: true,
        })
      }
    }
  }, [currentUser])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const values = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider
      value={values}
      children={!isLoading ? children : <PageLoading />}
    />
  )
}
export { AuthContext, AuthProvider }
