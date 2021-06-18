import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { setUserProfile, userProfileInfo, message } =
    useContext(PortfolioContext)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    if (userProfileInfo) {
      setUsername(userProfileInfo.username)
      setBio(userProfileInfo.bio)
    }
  }, [userProfileInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    const userInfo = {
      bio,
      username,
    }
    if (bio.trim() !== '' || username.trim() !== '') {
      setUserProfile(userInfo)
    }
  }

  return (
    <>
      <section className='mt-5'>
        <h3 className='display-3'>Profile</h3>

        {message && <div className='alert alert-success'>{message}</div>}

        <form onSubmit={(e) => submitHandler(e)}>
          <input
            disabled
            value={currentUser.email}
            type='email'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            placeholder='username'
            className='form-control mb-3'
            type='text'
          />
          <input
            onChange={({ target }) => setBio(target.value)}
            value={bio}
            placeholder='bio'
            type='text'
            className='form-control mb-3'
          />

          <button className='btn btn-primary'>Save</button>
        </form>
      </section>
    </>
  )
}

export default Profile
