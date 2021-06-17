import React, { useContext, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { userProfile } = useContext(PortfolioContext)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const userInfo = {
      bio,
      username,
    }
    if (bio.trim() !== '' || username.trim() !== '') {
      userProfile(userInfo)
    }
  }

  return (
    <>
      <h1>Profile</h1>

      {currentUser && currentUser.email}

      <form onSubmit={(e) => submitHandler(e)}>
        <input
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          placeholder='username'
          type='text'
          className='form-control mb-3'
        />
        <input
          onChange={({ target }) => setBio(target.value)}
          value={bio}
          placeholder='bio'
          type='text'
          className='form-control mb-3'
        />
        <input
          disabled
          value={currentUser.email}
          type='email'
          className='form-control mb-3'
        />

        <button className='btn btn-primary'>Save</button>
      </form>
    </>
  )
}

export default Profile
