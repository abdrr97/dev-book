import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ForumContext } from '../../context/forumContext'

const PostList = () => {
  const { posts } = useContext(ForumContext)

  return (
    <main className='container'>
      <nav className='d-flex align-items-center justify-content-between'>
        <h1 className='display-3'>Posts</h1>
        <Link className='btn btn-success' to='/posts/create'>
          + create your post
        </Link>
      </nav>

      <div className='row'>
        {posts &&
          posts.map(({ docId, author, post }) => {
            return (
              <div key={docId} className='col-4 mb-3'>
                <div className='card'>
                  <div className='card-body'>
                    <Link to={`/p/${author.username}`}> {author.username}</Link>{' '}
                    - <Link to={`post/${docId}`}>{post.postTitle}</Link>
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
