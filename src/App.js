import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notifi from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(true)
  const [notice, setNotice] = useState(null)
  const blogCreateRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blog =>
      setBlogs(blog))
  }, [newBlog])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notifi message={notice} />
        <Login setUser={setUser} setNotice={setNotice} />
      </div>
    )
  }
  return (
    <div>
      <h2> blogs </h2>
      <Notifi message={notice} />
      <p>
        {`${user.username} logged in`}
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <div>
        <Togglable buttonLabel="Create blog" ref={blogCreateRef}>
          <CreateBlog setNotice={setNotice} setNewBlog={setNewBlog} newBlog={newBlog} blogCreateRef={blogCreateRef} />
        </Togglable>
      </div>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} newBlog={newBlog} setNewBlog={setNewBlog} />
        )}
      </div>
    </div>
  )
}

export default App