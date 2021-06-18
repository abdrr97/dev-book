import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'

const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { updateUserProfile, userProfileInfo, message, user } =
    useContext(PortfolioContext)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  // added
  const [address, setAddress] = useState('')
  const [file, setFile] = useState(null)
  const [birthDate, setBirthDate] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const userInfo = {
      bio,
      username,
      address,
      file,
      birthDate,
    }

    if (username.trim() !== '') {
      updateUserProfile(userInfo)
    }
  }

  useEffect(() => {
    if (userProfileInfo.username) {
      setUsername(userProfileInfo.username)
      setBio(userProfileInfo.bio)
      setAddress(userProfileInfo.address)
      setBirthDate(userProfileInfo.birthDate)
    }
  }, [userProfileInfo])

  //
  return (
    <>
      <section className='mt-5'>
        <h3 className='display-3'>Profile</h3>

        {user && (
          <img
            width='100'
            className='mb-3 img-thumbnail'
            src={user.photoURL}
            alt={user.username}
          />
        )}

        {message && (
          <div className='alert alert-success'>{message}</div>
        )}

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

          <textarea
            onChange={({ target }) => setAddress(target.value)}
            value={address}
            placeholder='Address'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) => setFile(target.files[0])}
            type='file'
            className='form-control mb-3'
          />
          <input
            onChange={({ target }) => setBirthDate(target.value)}
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
