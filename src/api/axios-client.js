import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_TMBD_API_ENDPOINT,
  timeout: 1000,
  headers: {
    Authorization: 'Bearer ' + process.env.VUE_APP_TMBD_READ_TOKEN,
    'Content-Type': 'application/json;charset=utf-8'
  }
})

export default instance
