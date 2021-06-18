import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const ForgotPassword = () => {
  const [email, setEmail] = useState('abdrr97@gmail.com')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { resetPassword } = useContext(AuthContext)

  const handleForgotPassword = (e) => {
    e.preventDefault()
    try {
      setMessage('')
      setError('')
      setIsLoading(true)

      resetPassword(email)
        .then(() => {
          setMessage('Check your email for further instructions 😊😊')
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (ex) {
      setError(ex.message)
    }
  }

  return (
    <>
      <div
        style={{ height: '100vh' }}
        className='d-flex justify-content-center align-items-center'
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Forgot Password</h2>
              <form action='' onSubmit={handleForgotPassword}>
                {message && (
                  <div className='alert alert-success'>{message}</div>
                )}
                {error && <div className='alert alert-danger'>{error}</div>}
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email here'
                    className='form-control'
                  />
                </div>

                <button
                  disabled={isLoading}
                  type='submit'
                  className='w-100 btn btn-primary mt-3'
                >
                  {!isLoading && 'Reset Password'}
                  {isLoading && (
                    <div className='d-flex justify-content-center'>
                      <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className='w-100 text-center mt-2'>
            <Link to='/sign-up'>Sign Up</Link> /{' '}
            <Link to='/log-in'>Log In</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
