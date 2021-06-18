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
    if (!selectedUser) return

    const usersColRef = db.collection('users')
    const to = usersColRef.doc(selectedUser.email)
    const from = usersColRef.doc(currentUser.email)
    const chatRoomName = selectedUser.email + ' ' + currentUser.email

    from.update({
      room: chatRoomName,
    })
    to.update({
      room: chatRoomName,
    })

    db.collection('messages').add({
      uid: currentUser.uid,
      email: currentUser.email,
      roomName: chatRoomName,
      message: message,
      createdAt: timestamp(),
    })
  }

  useEffect(() => {
    if (!currentUser) return
    if (!selectedUser) return
    const chatRoomName1 = selectedUser.email + ' ' + currentUser.email
    const chatRoomName2 = currentUser.email + ' ' + selectedUser.email

    const unsubscribe = db
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        const _messages = snapshot.docs
          .filter((_doc) => {
            const _message = {
              docId: _doc.id,
              ..._doc.data(),
            }

            if (
              _message.roomName === chatRoomName1 ||
              _message.roomName === chatRoomName2
            ) {
              return true
            }
            return false
          })
          .map((_doc) => {
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
