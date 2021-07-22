import React, { useState } from 'react'
import blogService from '../services/blogs'
const CreateBlog = ({ setNotice, setNewBlog, newBlog, blogCreateRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    blogCreateRef.current.toggleVisible()
    await blogService.create({ title, author, url })

    setNotice(`a new blog ${title} by ${author} added`)
    setTimeout(() => setNotice(null), 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
    setNewBlog(!newBlog)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>

        <div>
                    title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

    </div>
  )
}

export default CreateBlog

