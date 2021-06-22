import React, { useContext, useState } from 'react'
import { ForumContext } from '../../context/forumContext'

const CreatePost = () => {
  const { createPost } = useContext(ForumContext)

  const [post, setPost] = useState({
    postTitle: '',
    postText: '',
    postImage: null,
  })

  const submitHandler = (e) => {
    e.preventDefault()

    if (post.postTitle.trim() !== '') {
      createPost(post)
    }
  }

  return (
    <>
      <main className='container mt-5'>
        <h1 className='display-4'>Create Post</h1>

        <form onSubmit={(e) => submitHandler(e)}>
          <input
            value={post.postTitle}
            onChange={({ target }) =>
              setPost({ ...post, postTitle: target.value })
            }
            className='form-control mb-3'
            placeholder='title'
            type='text'
          />
          <input
            onChange={({ target }) =>
              setPost({ ...post, postImage: target.files[0] })
            }
            className='form-control mb-3'
            type='file'
          />
          <textarea
            placeholder='Enter more information ....'
            value={post.postText}
            onChange={({ target }) =>
              setPost({ ...post, postText: target.value })
            }
            className='form-control mb-3'
          />
          <button className='btn btn-info'>Create Post</button>
        </form>
      </main>
    </>
  )
}

export default CreatePost
