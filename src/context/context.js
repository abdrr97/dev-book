import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, storage } from '../firebase'
import { AuthContext } from './authContext'

const PortfolioContext = createContext()

const PortfolioProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(0)

  // this method is looking for a users by its username
  // and returns his doc when its found
  const isUserExists = (username) => {
    return db.collection('users').where('username', '==', username).get()
  }

  // this is the main function for updating user profile
  const updateUserProfile = (info) => {
    // if no user is logged in return
    // (don't execute the other code)
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
      const stgRef = storage.ref(currentUser.uid)
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

  const updateSkill = (skills) => {
    const _docRef = db.collection('users').doc(currentUser.email)
    _docRef.update({
      skills: skills,
    })
  }

  const updateExperience = (_experience) => {
    const _docRef = db.collection('users').doc(currentUser.email)
    _docRef.update({
      experience: _experience,
    })
  }

  useEffect(() => {
    // getting users only if they have a username
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      const _users = snapshot.docs
        .filter((_doc) => {
          return _doc.data().username !== '' ? true : false
        })
        .map((_doc) => {
          return {
            docId: _doc.id,
            ..._doc.data(),
          }
        })

      setUsers(_users)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentUser) return

    // getting the current logged-in user his info (username, bio, age, ...)
    const _docRef = db.collection('users').doc(currentUser.email)

    const unsubscribe = _docRef.onSnapshot((_doc) => {
      if (_doc.exists) {
        setUser({
          docId: _doc.id,
          ..._doc.data(),
        })
      }
    })

    return unsubscribe
  }, [currentUser])

  const values = {
    updateUserProfile,
    users,
    isUserExists,
    message,
    user,
    progress,
    updateSkill,
    updateExperience,
  }

  return <PortfolioContext.Provider value={values} children={children} />
}

export { PortfolioContext, PortfolioProvider }
