import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, storage, timestamp } from '../firebase'
import { AuthContext } from './authContext'

const PortfolioContext = createContext()

const PortfolioProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const [userProfileInfo, setUserProfileInfo] = useState(null)
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  const isUserExists = (username) => {
    return db.collection('users').where('username', '==', username).get()
  }

  const getUsersProfile = () => {
    db.collection('users').onSnapshot((snapshot) => {
      const _filteredUsers = snapshot.docs.filter((_doc) => {
        return _doc.data().username !== '' ? true : false
      })

      const _users = _filteredUsers.map((_doc) => {
        return {
          docId: _doc.id,
          ..._doc.data(),
        }
      })

      setUsers(_users)
    })
  }

  const setUserProfile = (info) => {
    if (!currentUser) return
    let exists = false
    const _docRef = db.collection('users').doc(currentUser.email)

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
          _docRef.update({
            username: info.username,
          })
          setMessage('user was updated successfully')
        }
      })

    _docRef.update({
      bio: info.bio,
    })
    setMessage('bio was updated successfully')

    setTimeout(() => {
      setMessage(null)
    }, 2500)
  }

  useEffect(() => {
    getUsersProfile()
  }, [])

  useEffect(() => {
    if (currentUser) {
      const docRef = db.collection('users').doc(currentUser.email).get()

      docRef.then((_doc) => {
        if (_doc.exists) {
          setUserProfileInfo({
            docId: _doc.id,
            ..._doc.data(),
          })
        }
      })
    }
  }, [currentUser])

  const values = {
    setUserProfile,
    userProfileInfo,
    users,
    isUserExists,
    message,
  }

  return <PortfolioContext.Provider value={values} children={children} />
}

export { PortfolioContext, PortfolioProvider }
