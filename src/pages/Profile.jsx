import React, { useContext, useEffect, useState } from 'react'
import { PortfolioContext } from '../context/context'
import { AuthContext } from '../context/authContext'
import { FiTrash2 } from 'react-icons/fi'

// i refactored this to be much cleaner and more understandable
const Profile = () => {
  const { currentUser } = useContext(AuthContext)
  const { progress, updateUserProfile, message, user, removeSkill } =
    useContext(PortfolioContext)

  const [userInfo, setUserInfo] = useState({
    username: '',
    bio: '',
    address: '',
    file: null,
    birthDate: '',
    skills: [],
  })

  const { username, bio, address, birthDate, skills } = userInfo

  const [language, setLanguage] = useState('HTML')
  const [percentage, setPercentage] = useState(0)
  const [skillsList, setSkillsList] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()

    // add skills
    userInfo.skills = [
      ...skills,
      {
        id: Date.now(),
        language,
        percentage,
      },
    ]

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
        // skills
        skills: user.skills || [],
      })
      setSkillsList(user.skills)
    }
  }, [user])

  return (
    <>
      <section className='container mt-5'>
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

        <form className='card mb-3' onSubmit={(e) => submitHandler(e)}>
          <div className='card-body'>
            <h3>User Info</h3>
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
            <hr className='my-5' />
            <h3>Skills</h3>
            <label htmlFor='lang'>Language - {language}</label>
            <select
              onChange={({ target }) => setLanguage(target.value)}
              id='lang'
              className='form-select mb-3'
            >
              <option value='HTML'>HTML</option>
              <option value='CSS'>CSS</option>
              <option value='JS'>JS</option>
              <option value='PHP'>PHP</option>
              <option value='REACTJS'>REACTJS</option>
              <option value='LARAVEL'>LARAVEL</option>
            </select>
            <label htmlFor='percent'>Percentage - {percentage}%</label>
            <input
              onChange={({ target }) => setPercentage(target.value)}
              id='percent'
              value={percentage}
              className='form-range'
              type='range'
              min='0'
              max='100'
            />
            <ul className='list-group mb-3'>
              {skillsList.map(({ language, percentage, id }) => {
                return (
                  <li
                    key={id}
                    className='list-group-item d-flex justify-content-between'
                  >
                    {language} -{percentage}%
                    <button
                      onClick={() => {
                        setSkillsList(skillsList.filter((s) => s.id !== id))
                        removeSkill(skillsList.filter((s) => s.id !== id))
                      }}
                      type='button'
                      className='btn btn-sm btn-outline-danger'
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                )
              })}
            </ul>
            <button className='btn btn-primary mb-3 '>Save</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Profile
