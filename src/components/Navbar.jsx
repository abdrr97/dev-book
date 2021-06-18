import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { PortfolioContext } from '../context/context'
import { BsBellFill } from 'react-icons/bs'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const { user } = useContext(PortfolioContext)
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
                    <button className='btn-notification mx-2 btn nav-link'>
                      <BsBellFill />
                      <span className='notification'></span>
                    </button>
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
