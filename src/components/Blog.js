import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, setNewBlog, newBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async () => {
    let newLike = { likes: blog.likes + 1 }
    let id = blog.id
    await blogService.put({ newLike, id })
    setNewBlog(!newBlog)
  }

  const handleRemove = async () => {
    let id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove({ id })
      setNewBlog(!newBlog)
    }
  }
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={() => setBlogVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div> {blog.title} <button onClick={() => setBlogVisible(false)}>hide</button></div>
        <div> {blog.url}</div>
        <div> likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div> {blog.author}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog