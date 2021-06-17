import React, { useContext } from 'react'
import { PortfolioContext } from '../context/context'
import { Link } from 'react-router-dom'

const Home = () => {
  const { users } = useContext(PortfolioContext)

  return (
    <>
      <section className='mt-5'>
        <h3 className='display-3 mb-3'>Home</h3>

        <div className='row'>
          {users &&
            users.map(({ username, bio, online }, idx) => {
              return (
                <div key={idx} className='col-3 col-md-4 col-sm-6 col-lg-3'>
                  <div className='card mb-5'>
                    <div className='card-header d-flex justify-content-between align-items-center'>
                      <Link to={`/p/${username}`}>{username}</Link>
                      {online ? (
                        <span className='badge bg-success'>o</span>
                      ) : (
                        <span className='badge bg-danger'>o</span>
                      )}
                    </div>
                    <div className='card-body'>
                      {bio || (
                        <small>
                          <i>no bio for this user</i>
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}

export default Home
