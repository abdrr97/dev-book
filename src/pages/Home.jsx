import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <main className='container'>
        <nav className='navbar navbar-light bg-light'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>
              Dev Book
            </Link>
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
            </ul>
          </div>
        </nav>
      </main>
    </>
  )
}

export default Home
