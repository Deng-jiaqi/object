import axios from 'axios'
import router from './router'
const ajax = {
  get (url, config = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          router.push({
            path: '/dashbord'
          })
          return
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  post (url, data, config = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          console.log(res)
          router.push({
            path: '/dashbord'
          })
          return
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  put (url, data, config = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          router.push({
            path: '/dashbord'
          })
          return
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  delete (url, config = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          router.push({
            path: '/dashbord'
          })
          return
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export default ajax
