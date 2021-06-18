import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, storage, timestamp } from '../firebase'
import { AuthContext } from './authContext'

const PortfolioContext = createContext()

const PortfolioProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(0)

  const isUserExists = (username) => {
    return db.collection('users').where('username', '==', username).get()
  }

  const updateUserProfile = (info) => {
    if (!currentUser) return
    // change username if not exists in users collection
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
    //END: update username

    // upload/update image url only
    const { file } = info
    const types = ['image/png', 'image/jpeg']

    if (file && types.includes(file.type)) {
      const stgRef = storage.ref(file.name)
      stgRef.put(file).on(
        'state_changed',
        (snap) => {
          // uploading
          const _percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(_percentage)
        },
        (err) => {},
        () => {
          // on finish upload
          stgRef.getDownloadURL().then((url) => {
            _docRef
              .update({
                photoURL: url,
              })
              .finally(() => {
                setMessage('user profile image was updated successfully')
                setProgress(0)
              })
          })
        }
      )
    }

    _docRef
      .update({
        bio: info.bio,
        address: info.address,
        birthDate: info.birthDate,
      })
      .then(() => {
        setMessage('user profile info was updated successfully')
      })

    setTimeout(() => {
      setMessage(null)
    }, 2500)
  }

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (!currentUser) return

    const _docRef = db.collection('users').doc(currentUser.email)

    _docRef.onSnapshot((_doc) => {
      if (_doc.exists) {
        setUser({
          docId: _doc.id,
          ..._doc.data(),
        })
      }
    })
  }, [currentUser])

  const values = {
    updateUserProfile,
    users,
    isUserExists,
    message,
    user,
    progress,
  }

  return <PortfolioContext.Provider value={values} children={children} />
}

export { PortfolioContext, PortfolioProvider }
