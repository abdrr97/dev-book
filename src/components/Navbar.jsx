import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { PortfolioContext } from '../context/context'
import { BsBellFill } from 'react-icons/bs'
import { ChatContext } from '../context/chatContext'
// this is a very basic component

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { user } = useContext(PortfolioContext)
  const {
    setNotifications,
    notifications,
    setSelectedUser,
    changeNotificationStatus,
  } = useContext(ChatContext)
  const history = useHistory()

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    } else {
      return
    }
    if (
      notifications &&
      notifications.from &&
      notifications.to.includes(currentUser.email)
    ) {
      // doesn't work in mobile yet
      new Notification(
        `You have new messages from ${notifications.from.username}`
      )
    }
    console.log('notify')
  }, [currentUser, notifications])

  return (
    <>
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Dev Book
          </Link>

          <div className=' navbar-'>
            <ul className='navbar-nav'>
              {currentUser ? (
                <>
                  <li className='nav-item'>
                    <button
                      onClick={() => {
                        Promise.allSettled([
                          setSelectedUser({
                            ...notifications.from,
                          }),
                          setNotifications({
                            read: true,
                            from: null,
                          }),
                          changeNotificationStatus(),
                        ]).then(() => {
                          history.push('/chat-room')
                        })
                      }}
                      className='btn-notification mx-2 btn nav-link'
                    >
                      <BsBellFill />
                      {notifications && notifications.from && (
                        <span className='notification'></span>
                      )}
                    </button>
                    {notifications && notifications.from && (
                      <div>{notifications.from.username}</div>
                    )}
                  </li>
                  {user && (
                    <li className='nav-item'>
                      <Link className='nav-link' to={`/p/${user.username}`}>
                        {user.username}
                      </Link>
                    </li>
                  )}
                  <li className='nav-item'>
                    <Link className='active nav-link' to='/profile'>
                      Settings
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button onClick={logout} className='btn nav-link'>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/sign-up'>
                      SignUp
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/log-in'>
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
