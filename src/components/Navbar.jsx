import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  return (
    <>
      <nav className='navbar navbar-expand navbar-light bg-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Dev Book
          </Link>

          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link active' to='/'>
                  Home
                </Link>
              </li>

              <li className='nav-item'>
                <Link className='nav-link' to='/sign-up'>
                  Create Your Portfolio
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/profile'>
                      Profile
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button onClick={logout} className='btn nav-link'>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className='nav-item'>
                  <Link className='nav-link' to='/log-in'>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
