import React, { useContext } from 'react'
import { PortfolioContext } from '../context/context'
import { Link  } from 'react-router-dom'
import { RiRadioButtonLine } from 'react-icons/ri'

const Home = () => {
  const { users } = useContext(PortfolioContext)

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

        <section className='row'>
          {users.map((_user, idx) => {
            const { bio, username, online, photoURL, skills } = _user
            return (
              <article key={idx} className='col-lg-4 col-md-6 col-12 mt-4 pt-2'>
                <div className='candidate-list card rounded border-0 shadow'>
                  <div className='card-body'>
                    <ul className='list-unstyled align-items-center'>
                      <li className='list-inline-item'>
                        <span
                          className={
                            online === 'ONLINE'
                              ? 'badge rounded-pill bg-soft-success'
                              : online === 'OFFLINE'
                              ? 'badge rounded-pill bg-soft-danger'
                              : 'badge rounded-pill bg-soft-warning'
                          }
                        >
                          <RiRadioButtonLine />
                        </span>
                      </li>
                    </ul>

                    <div className='content text-center'>
                      <img
                        src={photoURL}
                        alt={username}
                        className='avatar avatar-md-md shadow-md rounded-circle'
                      />
                      <ul className='list-unstyled mb-1 mt-2'></ul>
                      <Link to={`/p/${username}`} className='text-dark h5 name'>
                        {username}
                      </Link>
                      <ul className='list-unstyled mt-3'>
                        {skills &&
                          skills.map(({ id, language }) => {
                            return (
                              <li key={id} className='list-inline-item m-1'>
                                <span className='rounded bg-light py-1 px-2 text-muted small'>
                                  {language}
                                </span>
                              </li>
                            )
                          })}
                      </ul>

                      <p className='text-muted my-1'>Front-end Developer</p>

                      <span className='text-muted'>
                        <i className='uil uil-graduation-cap h4 mb-0 me-2 text-primary'></i>
                        Experience
                        <span className='text-success'>3+ years</span>
                      </span>

                      <ul className='list-unstyled mt-3'></ul>
                      <div className='d-grid'>
                        <Link
                          to={`/p/${username}`}
                          className='btn btn-soft-primary'
                        >
                          Read More
                          <i className='uil uil-angle-right-b align-middle'></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </>
  )
}

export default Home
