import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ForumContext } from '../../context/forumContext'
import PageLoading from '../../components/PageLoading'

const SinglePost = () => {
  const { postId } = useParams()
  const { isPostExists, addComment } = useContext(ForumContext)
  const [exists, setExists] = useState(false)
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  // adding comment

  const submitCommentHandler = (e) => {
    e.preventDefault()

    // add comment to this post
    if (comment.trim() !== '') {
      addComment(post, comment)
    }
  }

  useEffect(() => {
    let _exists = false
    isPostExists(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          _exists = true
          setPost({
            docId: doc.id,
            ...doc.data(),
          })
        } else {
          _exists = false
          console.log('No such document!')
        }
      })
      .finally(() => {
        setLoading(false)
        setExists(_exists)
      })
  }, [isPostExists, postId])

  // show this if loading is finished and he doesn't exist
  if (!loading && !exists) {
    return (
      <div className='text-center'>
        <h1 className='display-1'>Post not found</h1>
      </div>
    )
  }

  // show this if still loading
  if (loading) {
    return <PageLoading />
  }

  // show this if user was found
  if (exists) {
    return (
      <>
        <main className='container'>
          <div className='row mb-3'>
            <div className='col-12'>
              <h1 className='display-1'>Post</h1>
              <div className='card'>
                <div className='card-header'>
                  <h5>{post.author.username}</h5>
                  <img
                    width='50'
                    src={post.author.photoURL}
                    alt={post.author.username}
                  />
                </div>
                <div className='card-body'>
                  <h3>{post.post.postTitle}</h3>
                  <img
                    width='200'
                    src={post.post.postImage}
                    alt={post.post.postTitle}
                  />
                  <p>{post.post.postText}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <h4>Comments Section</h4>
              <form onSubmit={(e) => submitCommentHandler(e)} className='mb-4'>
                <textarea
                  onChange={({ target }) => setComment(target.value)}
                  value={comment}
                  className='form-control mb-2'
                  placeholder='write your answer here !!'
                />
                <button className='btn btn-sm btn-info'>Submit</button>
              </form>
            </div>
          </div>

          <ul className='list-group my-4'>
            {post.comments.map(({ user, comment, createdAt }, idx) => {
              return (
                <li key={idx} className='list-group-item'>
                  {user.username} - {comment}
                </li>
              )
            })}
          </ul>
        </main>
      </>
    )
  }
}

export default SinglePost
