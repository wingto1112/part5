import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.post(baseUrl, newBlog, config)

}

const put = async ({ newLike, id }) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `/api/blogs/${id}`
  await axios.put(url, newLike, config)
}

const remove = async ({ id }) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `/api/blogs/${id}`
  await axios.delete(url, config)
}

export default { getAll, setToken, create, put, remove }