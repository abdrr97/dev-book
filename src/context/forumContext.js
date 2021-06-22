import React, { useState, useEffect, createContext, useContext } from 'react'
import { db, storage, timestamp } from '../firebase'
import { AuthContext } from './authContext'
import { PortfolioContext } from './context'

const ForumContext = createContext()

const ForumProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const { user } = useContext(PortfolioContext)
  const [posts, setPosts] = useState([])

  const createPost = (_post) => {
    if (!currentUser) return
    const _docRef = db.collection('forum')

    // upload/update image url only
    const { postImage } = _post
    const types = ['image/png', 'image/jpeg']

    if (postImage && types.includes(postImage.type)) {
      const stgRef = storage.ref(_post.postTitle + currentUser.uid)
      stgRef.put(postImage).on(
        'state_changed',
        (snap) => {
          // uploading
          //   const _percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          //   setProgress(_percentage)
        },
        (err) => {},
        () => {
          // on finish upload
          stgRef.getDownloadURL().then((url) => {
            // get post image url
            // when upload is done !

            _docRef.add({
              post: {
                ..._post,
                postImage: url,
              },
              author: user,
              comments: [],
              createdAt: timestamp(),
            })
          })
        }
      )
    }
  }

  // this method is looking for a posts by its postId
  // and returns his doc when its found
  const isPostExists = (docId) => {
    return db.collection('forum').doc(docId)
  }

  const addComment = (_post, _comment) => {
    const _userComment = {
      user,
      comment: _comment,
    }
    console.log(_post.docId)
    const _docRef = db.collection('forum').doc(_post.docId)

    _docRef.get().then((_doc) => {
      if (_doc.exists) {
        _docRef.update({
          comments: [..._doc.data().comments, _userComment],
        })
      }
    })
  }

  // getting posts from forum collection
  useEffect(() => {
    const unsubscribe = db.collection('forum').onSnapshot((snapshot) => {
      const _posts = snapshot.docs.map((_doc) => {
        return {
          docId: _doc.id,
          ..._doc.data(),
        }
      })

      setPosts(_posts)
    })

    return unsubscribe
  }, [])

  const values = { posts, createPost, isPostExists, addComment }

  return <ForumContext.Provider value={values} children={children} />
}

export { ForumContext, ForumProvider }
