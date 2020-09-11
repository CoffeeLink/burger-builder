import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-burger-de4bf.firebaseio.com/'
})

export default instance
