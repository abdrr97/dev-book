import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { db, timestamp } from '../../firebase'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useContext(AuthContext)

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password.trim() !== confirmPassword.trim()) {
      return setError('Passwords do not match 😭😭')
    }
    setIsLoading(true)
    setError('')

    try {
      signup(email, password)
        .then(({ user }) => {
          db.collection('users')
            .doc(email)
            .set({
              username: '',
              bio: '',
              address: '',
              birthDate: '',
              photoURL:
                'https://firebasestorage.googleapis.com/v0/b/react-dev-book.appspot.com/o/default%2Fdefault.jpg?alt=media&token=beb80150-a8da-46f0-908f-8cbfb7ad2f4c',
              uid: user.uid,
              email: email,
              lastLoggedIn: timestamp(),
            })
            .then(() => {
              // after the sign up user will be directed to his profile
              window.location = '/profile'
            })
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
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
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
