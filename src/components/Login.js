import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({ setUser, setNotice }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            console.log(user)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            setNotice('wrong username or password')
            setTimeout(() => setNotice(null), 5000)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Passqord"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}
export default Login