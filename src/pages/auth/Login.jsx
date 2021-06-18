import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const history = useHistory()

  const handleSignUp = (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      setError('')
      login(email, password)
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          history.push('/')
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
              <h2 className='text-center mb-4'>Login</h2>
              <form onSubmit={handleSignUp}>
                {error && <div className='alert alert-danger'>{error}</div>}

                <div className='mb-3'>
                  <label htmlFor='email'>Email</label>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    id='email'
                    type='email'
                    placeholder='Enter your email here'
                    className='form-control'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password'>Password</label>
                  <input
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter your password here'
                    className='form-control'
                  />
                </div>

                <div className='btn-group'>
                  <button
                    disabled={isLoading}
                    type='submit'
                    className='w-100 btn btn-primary mt-3'
                  >
                    {!isLoading && 'Login'}
                    {isLoading && (
                      <div className='d-flex justify-content-center'>
                        <div className='spinner-border'></div>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='w-100 text-center mt-2'>
            You don't have an account? <Link to='/sign-up'>Sign up</Link>
          </div>
          <div className='w-100 text-center mt-2'>
            <Link to='/forgot-password'>Forgot Password</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
