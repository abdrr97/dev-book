import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, storage, timestamp } from '../firebase'
import { AuthContext } from './authContext'

// Context

// const collections = {}

const PortfolioContext = createContext()

const PortfolioProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const [userProfileInfo, setUserProfileInfo] = useState({})

  useEffect(() => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.email).get()

      docRef.then((_doc) => {
        if (_doc.exists) {
          setUserProfileInfo(_doc.data())
        }
      })
    }
  }, [currentUser])

  const userProfile = (info) => {
    if (!currentUser) return
    let exists = false

    db.collection('users')
      .where('username', '==', info.username)
      .get()
      .then((_result) => {
        const data = _result.docs.map((_doc) => {
          return {
            docId: _doc.id,
            ..._doc.data(),
          }
        })
        exists = data.length > 0 ? true : false
        if (!exists) {
          db.collection('users').doc(currentUser.email).update(info)
        }
      })
  }

  const values = { userProfile, userProfileInfo }

  return <PortfolioContext.Provider value={values} children={children} />
}

export { PortfolioContext, PortfolioProvider }
