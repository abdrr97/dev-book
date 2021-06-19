/* eslint-disable react-hooks/exhaustive-deps */
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
    if (!window.Notification) {
      console.log('Browser does not support notifications.')
    } else {
      // check if permission is already granted
      if (Notification.permission === 'granted') {
        // show notification here
        if (
          notifications &&
          notifications.from &&
          notifications.to.includes(currentUser.email)
        ) {
          // doesn't work in mobile yet
          const options = {
            body: notifications.from.message,
            icon: notifications.from.photoURL,
          }
          const notification = new Notification(
            `New message from ${notifications.from.username}`,
            options
          )
          notification.onclick = () => {
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
          }
        }
      } else {
        // request permission from user
        Notification.requestPermission()
          .then(function (p) {
            if (p === 'denied') {
              // show notification here
              console.log('User blocked notifications.')
            }
          })
          .catch(function (err) {
            console.error(err)
          })
      }
    }
  }, [notifications])

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
