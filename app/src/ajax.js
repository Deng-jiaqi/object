import axios from 'axios'
const ajax = {
  get (url, config = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, config).then((res) => {
        config.withCredentials = true
        if (+res.data.code === -1) {
          window.location.href = '/#/login'
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
          window.location.href = '/#/login'
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
          window.location.href = '/#/login'
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
          window.location.href = '/#/login'
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
