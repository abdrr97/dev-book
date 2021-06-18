import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortfolioContext } from '../context/context'
import moment from 'moment'

const Portfolio = () => {
  const { username } = useParams()
  const { isUserExists } = useContext(PortfolioContext)
  const [exists, setExists] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let _exists = false
    isUserExists(username)
      .then((_result) => {
        const data = _result.docs.map((_doc) => {
          return {
            docId: _doc.id,
            ..._doc.data(),
          }
        })
        setUserInfo(data[0])
        _exists = data.length > 0 ? true : false
      })
      .finally(() => {
        setLoading(false)
        setExists(_exists)
      })
  }, [isUserExists, username])

  // show this if loading is finished and he doesn't exist
  if (!loading && !exists) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>User not found</h1>
      </div>
    )
  }

  // show this if still loading
  if (loading) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>...Searching for user</h1>
      </div>
    )
  }

  // show this if user was found
  if (exists) {
    return (
      <>
        <section className='mt-5'>
          <h1 className='display-3'>Portfolio</h1>
          <div className='card'>
            <div className='card-body'>
              <img
                width='100'
                className='img-thumbnail mb-3'
                src={userInfo.photoURL}
                alt={userInfo.username}
              />

              <ul className='list-group '>
                <li className='list-group-item'>
                  <b>email:</b> {userInfo.docId}
                </li>
                <li className='list-group-item'>
                  <b>username:</b> {userInfo.username}
                </li>
                <li className='list-group-item'>
                  <b>bio:</b> {userInfo.bio}
                </li>
                <li className='list-group-item'>
                  <b>Birth </b>Date:
                  {userInfo.birthDate}
                </li>
                <li className='list-group-item'>
                  <b>Address:</b> {userInfo.address}
                </li>
                <li className='list-group-item'>
                  <b>Last Logged In:</b>
                  {moment(
                    userInfo?.lastLoggedIn?.toDate(),
                    'MMDDYYYY'
                  ).fromNow()}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Portfolio
