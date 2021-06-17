import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { db } from '../../firebase'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassowrd, setConfirmPassowrd] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useContext(AuthContext)
  const history = useHistory()

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassowrd.trim()) {
      return setError('Passwords do not match 😭😭')
    }
    setIsLoading(true)

    try {
      setError('')

      signup(email, password)
        .then(({ user }) => {
          db.collection('users')
            .doc(email)
            .set({
              username: '',
              bio: '',
              uid: user.uid,
            })
            .finally(() => {
              history.push('/')
            })
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (ex) {
      setError(`${ex.message} 😢😢`)
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
              <h2 className='text-center mb-4'>Sign Up</h2>

              <form onSubmit={handleSignUp}>
                {error && <div className='alert alert-danger'>{error}</div>}

                <div className='mb-3'>
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
                <div className='mb-3'>
                  <label htmlFor='password-confirmation'>
                    Password Confirmation
                  </label>
                  <input
                    value={confirmPassowrd}
                    onChange={(event) => setConfirmPassowrd(event.target.value)}
                    required
                    id='password-confirmation'
                    name='password-confirmation'
                    type='password'
                    placeholder='ReWrite your password'
                    className='form-control'
                  />
                </div>

                <button
                  disabled={isLoading}
                  type='submit'
                  className='w-100 btn btn-primary mt-5'
                >
                  {!isLoading && 'Sign Up'}
                  {isLoading && (
                    <div className='d-flex justify-content-center'>
                      <div className='spinner-border'></div>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className='w-100 text-center mt-2'>
            Already Have an Account? <Link to='/log-in'>Log in</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
