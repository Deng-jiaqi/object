import router from './router'
import axios from 'axios'

const ajax = {
  get(url, config = {}) {
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
  post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          console.log('因为没有登录返回了')
          console.log(res)
          router.push({
            path: '/loginAndRegister/ALogin'
          })
          return
        }
        resolve(res)
      }).catch((err) => {
        console.log(err)
        console.log(err.response.status)
        reject(err)
      })
    })
  },
  put(url, data, config = {}) {
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
  delete(url, config = {}) {
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
