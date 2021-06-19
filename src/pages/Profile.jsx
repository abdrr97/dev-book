import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'

// i refactored this to be much cleaner and more understandable
const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { progress, updateUserProfile, message, user } =
    useContext(PortfolioContext)

  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: '',
    address: '',
    file: null,
    birthDate: '',
  })

  const { username, bio, address, birthDate } = userInfo

  const submitHandler = (e) => {
    e.preventDefault()

    if (username.trim() !== '') {
      updateUserProfile(userInfo)
    }
  }

  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || '',
        bio: user.bio || '',
        address: user.address || '',
        birthDate: user.birthDate || '',
      })
    }
  }, [user])

  return (
    <>
      <section className='mt-5'>
        <h3 className='display-3'>Profile</h3>
        {message && <div className='alert alert-success'>{message}</div>}

        {user && (
          <img
            width='100'
            className='mb-3 img-thumbnail'
            src={user.photoURL}
            alt={user.username}
          />
        )}

        {progress > 0 && (
          <div className='progress mb-3'>
            Uploading
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              aria-valuenow={progress}
              aria-valuemin='0'
              aria-valuemax='100'
              style={{ width: progress + '%' }}
            >
              {progress + '%'}
            </div>
          </div>
        )}

        <form onSubmit={(e) => submitHandler(e)}>
          <input
            disabled
            value={currentUser.email}
            type='email'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, username: target.value })
            }
            value={username}
            placeholder='username'
            className='form-control mb-3'
            type='text'
          />
          <input
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, bio: target.value })
            }
            value={bio}
            placeholder='bio'
            type='text'
            className='form-control mb-3'
          />

          <textarea
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, address: target.value })
            }
            value={address}
            placeholder='Address'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, file: target.files[0] })
            }
            type='file'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, birthDate: target.value })
            }
            value={birthDate}
            type='date'
            className='form-control mb-3'
          />

          <button className='btn btn-primary'>Save</button>
        </form>
      </section>
    </>
  )
}

export default Profile
