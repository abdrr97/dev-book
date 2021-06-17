import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortfolioContext } from '../context/context'

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
  }, [username])

  if (!loading && !exists) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>User not found</h1>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>...Searching for user</h1>
      </div>
    )
  }

  if (exists) {
    return (
      <>
        <h1>Portfolio</h1>
        <div className='card'>
          <div className='card-body'>
            {userInfo.docId}
            <br />
            {userInfo.username}
            <br />
            {userInfo.bio}
          </div>
        </div>
      </>
    )
  }
}

export default Portfolio
