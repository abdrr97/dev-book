import moment from 'moment'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ForumContext } from '../../context/forumContext'
import { BiComment } from 'react-icons/bi'
import { PortfolioContext } from '../../context/context'

const PostList = () => {
  const { posts } = useContext(ForumContext)
  const { users } = useContext(PortfolioContext)

  return (
    <main className='container'>
      <nav className='mt-5 d-flex align-items-center justify-content-between'>
        <div></div>
        <Link className='btn btn-success' to='/posts/create'>
          + create your post
        </Link>
      </nav>

      <div className='row my-5'>
        {posts &&
          posts.map(({ docId, author: authorEmail, post, comments, createdAt }) => {
            const author = users?.find((_user) => _user.docId === authorEmail)

            return (
              <div key={docId} className='col-12 mb-3'>
                <div className='card shadow-md rounded-md'>
                  <div className='card-body '>
                    <Link to={`post/${docId}`}>
                      <h1>{post.postTitle}?</h1>
                    </Link>

                    <p>{post.postText}</p>

                    <hr />
                    <div className='d-flex justify-content-between align-items-center'>
                      <div>
                        <img
                          alt={author?.username}
                          src={author?.photoURL}
                          className='img-fluid avatar avatar-ex-sm rounded-circle'
                        />
                        <span className='mx-2'>Posted By</span>
                        <Link to={`/p/${author?.username}`}>{author?.username}</Link>
                        <small className='mx-2'>
                          {createdAt && moment(createdAt.toDate(), 'MMDDYY').fromNow()}
                        </small>
                      </div>
                      <div className='d-flex  align-items-center'>
                        <small style={{ fontSize: '22px' }}>
                          <BiComment />
                        </small>
                        {comments?.length}+
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </main>
  )
}

export default PostList
