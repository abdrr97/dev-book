import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import { PortfolioContext } from '../context/context'
import { RiRadioButtonLine } from 'react-icons/ri'
import { AuthContext } from '../context/authContext'
import moment from 'moment'

// as i sed in the chat context this bit difficult logic to comprehend

const ChatRoom = () => {
  const { currentUser } = useContext(AuthContext)
  const { users } = useContext(PortfolioContext)
  const { messages, startConversation, selectedUser, setSelectedUser } =
    useContext(ChatContext)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (message.trim() === '') {
      setError('enter a message')
    } else if (!selectedUser.uid) {
      setError('select a user to chat with')
    } else {
      startConversation(message)
      setMessage('')
      setError('')
    }

    setTimeout(() => {
      setError('')
    }, 2500)
  }

  // scroll down when a message is added to the chat
  const down = useRef()
  useEffect(() => {
    down.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <h5 className='display-4'>Chat Room</h5>
      <section className='mt-5 row'>
        <article className='col-5'>
          <h5 className='display-5'>Users</h5>
          <ul className='list-group'>
            {users &&
              users
                // => this filter is if you want to message your self (if you are crazy enough)
                .filter((_user) => _user.docId !== currentUser.email)
                .map((_user, idx) => {
                  const { uid, username, docId, online } = _user
                  return (
                    <li
                      key={uid}
                      className='list-group-item d-flex justify-content-between'
                    >
                      <button
                        className={
                          selectedUser?.uid === uid
                            ? 'btn btn-sm btn-primary'
                            : 'btn btn-sm btn-outline-primary'
                        }
                        onClick={() =>
                          setSelectedUser({
                            ..._user,
                            email: _user.docId,
                          })
                        }
                      >
                        {username}
                        <small> - {docId}</small>
                      </button>

                      <span className={online ? 'text-success' : 'text-danger'}>
                        <RiRadioButtonLine />
                      </span>
                    </li>
                  )
                })}
          </ul>
        </article>

        <article className='col-7'>
          <h5 className='display-5'>Chat</h5>
          {error && <div className='alert alert-warning'>{error}</div>}
          <div
            className='list-group mb-3'
            style={{ maxHeight: '300px', overflowY: 'scroll' }}
          >
            {messages.map(({ message, uid, email, createdAt }, idx) => {
              return (
                <section
                  key={idx}
                  className='list-group-item d-flex justify-content-between'
                >
                  <article>
                    <small
                      className={
                        currentUser.uid === uid
                          ? 'badge bg-primary mx-2'
                          : 'badge bg-warning mx-2'
                      }
                    >
                      {email}
                    </small>
                    {message}
                  </article>
                  <small>
                    {moment(createdAt?.toDate(), 'MMDDYY').fromNow()}
                  </small>
                </section>
              )
            })}

            {/* this is to auto scroll down */}
            <span ref={down}></span>
          </div>

          <form onSubmit={(e) => submitHandler(e)}>
            <input
              autoFocus
              className='form-control'
              placeholder='Enter your message here !'
              type='text'
              value={message}
              onChange={({ target }) => setMessage(target.value)}
            />
          </form>
        </article>
      </section>
    </>
  )
}

export default ChatRoom
