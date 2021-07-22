import axios from 'axios'
const baseUrl = '/api/login'

const login = async creden => {
    const res = await axios.post(baseUrl, creden)
    return res.data
}

export default { login }