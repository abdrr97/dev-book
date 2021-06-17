import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Login = () => {
  const [email, setEmail] = useState('abdrr97@gmail.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const history = useHistory()

  const handleSignUp = (e) => {
    e.preventDefault()
    try {
      setError('')
      setIsLoading(true)
      login(email, password)
        .then(() => {
          history.push('/')
        })
        .catch((err) => {
          setError(err.message)
        })
    } catch (ex) {
      setError(ex.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4'>Login</h2>
            <form onSubmit={handleSignUp}>
              {error && <div className='alert alert-danger'>{error}</div>}

              <div className='form-group'>
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
              <div className='form-group'>
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
                      <div className='spinner-border' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
                  )}
                </button>
                <Link to='/forgot-password'>Forgot Password</Link>
              </div>
            </form>
          </div>
        </div>
        <Link className='nav-link active' to='/'>
          Home
        </Link>
      </div>
    </>
  )
}

export default Login
