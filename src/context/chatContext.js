import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react'
import { db, storage, timestamp } from '../firebase'
import { AuthContext } from './authContext'

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  const startConversation = (message) => {
    if (!currentUser) return

    db.collection('messages').add({
      uid: currentUser.uid,
      email: currentUser.email,
      room: selectedUser,
      message: message,
      createdAt: timestamp(),
    })
  }

  useEffect(() => {
    if (!currentUser) return

    const unsubscribe = db
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const _messages = snapshot.docs.map((_doc) => {
          return {
            docId: _doc.id,
            ..._doc.data(),
          }
        })

        setMessages(_messages)
      })

    return unsubscribe
  }, [currentUser, selectedUser])

  const values = {
    startConversation,
    messages,
    setSelectedUser,
    selectedUser,
  }

  return <ChatContext.Provider value={values} children={children} />
}

export { ChatContext, ChatProvider }
