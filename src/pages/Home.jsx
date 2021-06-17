import React, { useContext } from 'react'
import { PortfolioContext } from '../context/context'
import { Link } from 'react-router-dom'

const Home = () => {
  const { users } = useContext(PortfolioContext)

  return (
    <>
      <main className='container-fluid'>
        <h1>Home</h1>

        <div className='row'>
          {users &&
            users.map(({ username, bio, online }, idx) => {
              return (
                <div key={idx} className='col-3 '>
                  <div className='card mb-5'>
                    {online ? (
                      <span className='badge bg-success'>o</span>
                    ) : (
                      <span className='badge bg-warning'>o</span>
                    )}

                    <div className='card-header'>
                      <Link to={`/p/${username}`}>{username}</Link> - {idx}
                    </div>
                    <div className='card-body'>{bio}</div>
                  </div>
                </div>
              )
            })}
        </div>
      </main>
    </>
  )
}

export default Home
