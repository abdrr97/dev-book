import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import { PortfolioContext } from '../context/context'

const ChatRoom = () => {
  const { messages, startConversation, selectedUser, setSelectedUser } =
    useContext(ChatContext)
  const { users } = useContext(PortfolioContext)
  const [message, setMessage] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    startConversation(message)
    setMessage('')
  }

  return (
    <div>
      <h1>Chat Room</h1>

      <h5>users</h5>
      <ul className='list-group mb-5 '>
        {users.map(({ uid, username, docId }) => {
          return (
            <li className='list-group-item ' key={uid}>
              <button
                className={
                  selectedUser === uid
                    ? 'btn btn-sm btn-primary'
                    : 'btn btn-sm btn-outline-primary'
                }
                onClick={() => setSelectedUser(uid)}
              >
                {username} - {docId}
              </button>
            </li>
          )
        })}
      </ul>

      <h5>chat room</h5>
      <ul className='list-group'>
        {messages.map(({ email, message, userx }, idx) => {
          return (
            <li key={idx} className='list-group-item'>
              <small>{email}</small>-{message} - <small>{userx}</small>
            </li>
          )
        })}
      </ul>

      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type='text'
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </form>
    </div>
  )
}

export default ChatRoom
