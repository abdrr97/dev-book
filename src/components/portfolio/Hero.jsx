import React from 'react'
import { BsChat } from 'react-icons/bs'

const Hero = ({ userInfo }) => {
  const {
    address,
    bio,
    birthDate,
    email,
    photoURL,
    username,
    experience,
  } = userInfo

  // TODO: online here
  // TODO: icons
  return (
    <>
      <section className='bg-half-260 d-table w-100'>
        <div className='bg-overlay'></div>
      </section>
      <section className='section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-5 col-12'>
              <div className='card job-profile shadow border-0'>
                <div className='text-center py-5 border-bottom rounded-top'>
                  <img
                    src={photoURL}
                    className='avatar avatar-medium mx-auto rounded-circle shadow d-block'
                    alt=''
                  />
                  <h5 className='mt-3 mb-0'>{username}</h5>
                  <p className='text-muted mb-0'>Senior Web Developer</p>
                  {/* TODO: add position */}
                </div>
                <div className='card-body'>
                  <h5 className='card-title'>Personal Details :</h5>

                  <ul className='list-unstyled'>
                    <li className='h6'>
                      <span className='text-muted'>Email :</span>
                      {email}
                    </li>
                    <li className='h6'>
                      <span className='text-muted'>D.O.B. :</span>
                      {birthDate}
                    </li>
                    <li className='h6'>
                      <span className='text-muted'>Address :</span>
                      {address}
                    </li>
                    <li>
                      <ul className='list-unstyled social-icon mb-0 mt-4'>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-facebook fea icon-sm fea-social'
                            >
                              <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-instagram fea icon-sm fea-social'
                            >
                              <rect
                                x='2'
                                y='2'
                                width='20'
                                height='20'
                                rx='5'
                                ry='5'
                              ></rect>
                              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path>
                              <line
                                x1='17.5'
                                y1='6.5'
                                x2='17.51'
                                y2='6.5'
                              ></line>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-twitter fea icon-sm fea-social'
                            >
                              <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-linkedin fea icon-sm fea-social'
                            >
                              <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                              <rect x='2' y='9' width='4' height='12'></rect>
                              <circle cx='4' cy='4' r='2'></circle>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-github fea icon-sm fea-social'
                            >
                              <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-youtube fea icon-sm fea-social'
                            >
                              <path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z'></path>
                              <polygon points='9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02'></polygon>
                            </svg>
                          </button>
                        </li>
                        <li className='list-inline-item'>
                          <button className='rounded'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              className='feather feather-gitlab fea icon-sm fea-social'
                            >
                              <path d='M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z'></path>
                            </svg>
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className='d-grid'>
                    <button className='btn btn-primary'>
                      <BsChat className='align-middle mx-3' />
                      Contact Me
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-8 col-md-7 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
              <div className='ms-lg-4'>
                <h4>About Me:</h4>
                <p className='text-muted mb-0'>{bio}</p>

                <h4 className='mt-lg-5 mt-4'>Experience :</h4>
                <div className='row'>
                  {experience &&
                    experience.map(({ year, title, company, description }) => {
                      return (
                        <div className='col-lg-12 mt-4 pt-2'>
                          <div className='d-flex'>
                            <div className='company-logo text-muted h6 me-3 text-center'>
                              {year}
                            </div>
                            <div className='flex-1'>
                              <h5 className='title mb-0'>{title}</h5>
                              <small className='text-muted company-university'>
                                {company}
                              </small>
                              <p className='text-muted mt-2 mb-0'>
                                {description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>

                <h4 className='mt-lg-5 mt-4'>Projects :</h4>
                <div className='row'>
                  <div className='col-md-6 col-12 mt-4 pt-2'>
                    <div className='card border-0 work-container work-classic'>
                      <div className='card-body p-0'>
                        <a href='portfolio-detail-one.html'>
                          <img
                            src='images/work/1.jpg'
                            className='img-fluid rounded work-image'
                            alt=''
                          />
                        </a>
                        <div className='content pt-3'>
                          <h5 className='mb-0'>
                            <a
                              href='portfolio-detail-one.html'
                              className='text-dark title'
                            >
                              Iphone mockup
                            </a>
                          </h5>
                          <h6 className='text-muted tag mb-0'>Branding</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 col-12 mt-4 pt-2'>
                    <div className='card border-0 work-container work-classic'>
                      <div className='card-body p-0'>
                        <a href='portfolio-detail-one.html'>
                          <img
                            src='images/work/2.jpg'
                            className='img-fluid rounded work-image'
                            alt=''
                          />
                        </a>
                        <div className='content pt-3'>
                          <h5 className='mb-0'>
                            <a
                              href='portfolio-detail-one.html'
                              className='text-dark title'
                            >
                              Mockup Collection
                            </a>
                          </h5>
                          <h6 className='text-muted tag mb-0'>Mockup</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 col-12 mt-4 pt-2'>
                    <div className='card border-0 work-container work-classic'>
                      <div className='card-body p-0'>
                        <a href='portfolio-detail-one.html'>
                          <img
                            src='images/work/3.jpg'
                            className='img-fluid rounded work-image'
                            alt=''
                          />
                        </a>
                        <div className='content pt-3'>
                          <h5 className='mb-0'>
                            <a
                              href='portfolio-detail-one.html'
                              className='text-dark title'
                            >
                              Abstract images
                            </a>
                          </h5>
                          <h6 className='text-muted tag mb-0'>Abstract</h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6 col-12 mt-4 pt-2'>
                    <div className='card border-0 work-container work-classic'>
                      <div className='card-body p-0'>
                        <a href='portfolio-detail-one.html'>
                          <img
                            src='images/work/4.jpg'
                            className='img-fluid rounded work-image'
                            alt=''
                          />
                        </a>
                        <div className='content pt-3'>
                          <h5 className='mb-0'>
                            <a
                              href='portfolio-detail-one.html'
                              className='text-dark title'
                            >
                              Yellow bg with Books
                            </a>
                          </h5>
                          <h6 className='text-muted tag mb-0'>Books</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='mt-4 pt-2'>
                  <button className='btn btn-primary me-2'>
                    <i className='uil uil-user-check'></i>
                    Hire me
                  </button>
                  <button
                    className='btn btn-outline-primary'
                  >
                    <i className='uil uil-print'></i>
                    Print CV
                  </button>
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
