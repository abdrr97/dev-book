import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BsChat } from 'react-icons/bs'
import { ChatContext } from '../../context/chatContext'

const Hero = ({ userInfo }) => {
  const { setSelectedUser } = useContext(ChatContext)
  const { photoURL, username } = userInfo

  const history = useHistory()

  // TODO: online here
  // TODO: icons
  return (
    <>
      <section className='bg-profile d-table w-100 bg-info'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div
                className='card public-profile border-0 rounded shadow'
                style={{ zIndex: 1 }}
              >
                <div className='card-body'>
                  <div className='row align-items-center'>
                    <div className='col-lg-2 col-md-3 text-md-start text-center'>
                      <img
                        src={photoURL}
                        className='avatar avatar-large rounded-circle shadow d-block mx-auto'
                        alt={username}
                      />
                    </div>

                    <div className='col-lg-10 col-md-9'>
                      <div className='row align-items-end'>
                        <div className='col-md-7 text-md-start text-center mt-4 mt-sm-0'>
                          <h3 className='title mb-0'>{username}</h3>
                          <small className='text-muted h6 me-2'>
                            Web Developer
                          </small>
                          <ul className='list-inline mb-0 mt-3'>
                            <li className='list-inline-item me-2'>
                              <Link to='/' className='text-muted'>
                                instagram
                              </Link>
                            </li>
                            <li className='list-inline-item'>
                              <Link to='/' className='text-muted'>
                                Linked in
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className='col-md-5 text-md-end text-center'>
                          <ul className='list-unstyled social-icon social mb-0 mt-4'>
                            <li className='list-inline-item'>
                              <button
                                className='btn btn-sm btn-outline-primary rounded'
                                onClick={() => {
                                  setSelectedUser({
                                    ...userInfo,
                                    email: userInfo.docId,
                                  })
                                  history.push('/chat-room')
                                }}
                              >
                                <BsChat />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
