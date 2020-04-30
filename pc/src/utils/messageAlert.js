import {
  Message
} from 'element-ui'

const messageAlert = (res) => {
  switch (res.data.code) {
    case 1:
      Message.success({
        message: `${res.data.msg}`,
        type: 'success'
      })
      break
    case 0:
      Message.error({
        message: `${res.data.msg}`,
        type: 'success'
      })
      break
    default:
      break
  }
}
export default messageAlert
