import React, { useContext } from 'react'
import { PortfolioContext } from '../context/context'
import { Link } from 'react-router-dom'
import { RiRadioButtonLine } from 'react-icons/ri'

const Home = () => {
  const { users } = useContext(PortfolioContext)

  return (
    <>
      <section className='mt-5'>
        <h3 className='display-3 mb-3'>Home</h3>

        {users.length === 0 && (
          <div className='text-center'>
            <h3 className='display-6'>
              <i>No users yet</i>
            </h3>
          </div>
        )}

        <div className='row'>
          {users.map(({ username, bio, online }, idx) => {
            return (
              <div
                key={idx}
                className='col-3 col-md-4 col-sm-6 col-lg-3'
              >
                <div className='card mb-5'>
                  <div className='card-header d-flex justify-content-between align-items-center'>
                    <Link to={`/p/${username}`}>{username}</Link>
                    {
                      <span
                        className={
                          online ? 'text-success' : 'text-danger'
                        }
                      >
                        <RiRadioButtonLine />
                      </span>
                    }
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
