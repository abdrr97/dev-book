import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ForumContext } from '../../context/forumContext'
import PageLoading from '../../components/PageLoading'
import { AuthContext } from '../../context/authContext'
import moment from 'moment'

const SinglePost = () => {
  const { currentUser } = useContext(AuthContext)
  const { postId } = useParams()
  const { isPostExists, addComment } = useContext(ForumContext)
  const [exists, setExists] = useState(false)
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')

  // adding comment
  const submitCommentHandler = (e) => {
    e.preventDefault()
    if (!currentUser) return

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
                  <img width='50' src={post.author.photoURL} alt={post.author.username} />
                </div>
                <div className='card-body'>
                  <h3>{post.post.postTitle}</h3>
                  <img width='200' src={post.post.postImage} alt={post.post.postTitle} />
                  <p>{post.post.postText}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <h4>Leave A Comment :</h4>

              {currentUser ? (
                <form onSubmit={(e) => submitCommentHandler(e)} className='mb-4'>
                  <label htmlFor='comment'>Your Comment</label>
                  <textarea
                    id='comment'
                    onChange={({ target }) => setComment(target.value)}
                    value={comment}
                    className='form-control mb-2'
                    placeholder='write your answer here !!'
                  />
                  <button className='btn btn-sm btn-info'>Submit</button>
                </form>
              ) : (
                <Link to='/log-in'>Log In</Link>
              )}
            </div>
          </div>
          <ul className='media-list list-unstyled mb-0'>
            {post?.comments?.map(({ id, user, comment, createdAt }, idx) => {
              return (
                <li key={idx} className='mt-4'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                      <Link to='/' className='pe-3'>
                        <img
                          src={user?.photoURL}
                          className='img-fluid avatar avatar-md-sm rounded-circle shadow'
                          alt='img'
                        />
                      </Link>
                      <div className='flex-1 commentor-detail'>
                        <h6 className='mb-0'>
                          <Link to='/' className='text-dark media-heading'>
                            {user?.username}
                          </Link>
                        </h6>
                        {createdAt && moment(createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className='mt-3'>
                    <p className='text-muted fst-italic p-3 bg-light rounded'>{comment}</p>
                  </div>
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
