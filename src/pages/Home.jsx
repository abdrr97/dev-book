import React, { useContext } from 'react'
import { PortfolioContext } from '../context/context'
import { Link, useHistory } from 'react-router-dom'
import { RiRadioButtonLine } from 'react-icons/ri'
import { ChatContext } from '../context/chatContext'
import { AuthContext } from '../context/authContext'

const Home = () => {
  const { users } = useContext(PortfolioContext)
  const { currentUser } = useContext(AuthContext)
  const { setSelectedUser } = useContext(ChatContext)
  const history = useHistory()

  return (
    <>
      <main className='container mt-5'>
        <h3 className='display-3 mb-3'>Home</h3>

        {users.length === 0 && (
          <div className='text-center'>
            <h3 className='display-6'>
              <i>No users yet</i>
            </h3>
          </div>
        )}

        <div className='row'>
          {users.map((_user, idx) => {
            const { bio, username, online } = _user
            return (
              <div key={idx} className='col-3 col-md-4 col-sm-6 col-lg-3'>
                <div className='card mb-5'>
                  <div className='card-header d-flex justify-content-between align-items-center'>
                    <Link to={`/p/${username}`}>{username}</Link>
                    {
                      <span className={online ? 'text-success' : 'text-danger'}>
                        <RiRadioButtonLine />
                      </span>
                    }
                  </div>
                  <div className='card-body'>
                    {bio.substring(0, 150) || (
                      <small>
                        <i>no bio for this user</i>
                      </small>
                    )}
                    ...
                  </div>
                  {currentUser && (
                    <div className='card-footer'>
                      {/* setting up the selected user for you to chat with  */}
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() => {
                          setSelectedUser({
                            ..._user,
                            email: _user.docId,
                          })
                          history.push('/chat-room')
                        }}
                      >
                        send message
                      </button>
                    </div>
                  )}
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
