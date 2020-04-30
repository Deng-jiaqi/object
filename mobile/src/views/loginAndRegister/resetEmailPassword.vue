<template>
  <div class="content">
      <h4>{{$t('lang.resetEmailPassword.text1')}}</h4>
      <form @submit.prevent="preventDefault">
        <div class="c-inputs">
          <Tooltip :text="message" :visible="tooltipVisible" />
          <label>{{$t('lang.resetEmailPassword.text2')}}</label>
          <div class="c-newpassword">
            <Grayinput v-model="newpassword" :type="passwordType" />
            <img
              src="../../assets/loginAndRegister/eyes@2x@2x.png"
              class="eyes"
              v-show="passwordType==='text'"
              @click="togglePasswordType('newpassword')"
            />
            <img
              src="../../assets/loginAndRegister/closeEyes@2x.png"
              class="eyes"
              v-show="passwordType==='password'"
              @click="togglePasswordType('newpassword')"
            />
          </div>
          <label>{{$t('lang.resetEmailPassword.text3')}}</label>
          <div class="c-confirm-newpassword">
            <Grayinput v-model="confirmNewpassword" :type="confirmPasswordType" />
            <img
              src="../../assets/loginAndRegister/eyes@2x@2x.png"
              class="eyes"
              v-show="confirmPasswordType==='text'"
              @click="togglePasswordType('confirmNewpassword')"
            />
            <img
              src="../../assets/loginAndRegister/closeEyes@2x.png"
              class="eyes"
              v-show="confirmPasswordType==='password'"
              @click="togglePasswordType('confirmNewpassword')"
            />
          </div>
        </div>
        <div class="c-button">
          <CircleButton @click.native="submit" :width="'100%'" :text="$t('lang.resetEmailPassword.text4')" />
        </div>
      </form>

  </div>
</template>
<script>
import CircleButton from '@/components/loginAndRegister/circleButton'
import Grayinput from '@/components/loginAndRegister/grayInput'
import Tooltip from '@/components/loginAndRegister/toolTip'
import { passwordValidate } from '@/utils/validate'
import { resetEmailpassword } from '@/common/api/api.js'
import { hexSha1 } from '@/utils/encryption'
import messageAlert from '@/utils/messageAlert.js'
export default {
  name: 'ResetEmailPassword',
  components: {
    CircleButton,
    Grayinput,
    Tooltip
  },
  data () {
    return {
      // 变量
      message: '',
      newpassword: '',
      confirmNewpassword: '',
      email: '',
      shopname: '',
      passwordType: 'password',
      confirmPasswordType: 'password',
      // data
      //   ui
      tooltipVisible: false
    }
  },
  methods: {
    togglePasswordType (toggleObject) {
      switch (toggleObject) {
        case 'newpassword':
          switch (this.passwordType) {
            case 'password':
              this.passwordType = 'text'
              break
            case 'text':
              this.passwordType = 'password'
              break
          }
          break
        case 'confirmNewpassword':
          switch (this.confirmPasswordType) {
            case 'password':
              this.confirmPasswordType = 'text'
              break
            case 'text':
              this.confirmPasswordType = 'password'
              break
          }
          break

        default:
          break
      }
    },
    preventDefault () {
      return false
    },
    async  submit () {
      if (!passwordValidate(this.newpassword)) {
        this.message = this.$t('lang.resetEmailPassword.text6')
        this.tooltipVisible = true
        setTimeout(() => {
          this.tooltipVisible = false
        }, 2000)
        return
      }
      if (this.newpassword !== this.confirmNewpassword) {
        this.message = this.$t('lang.resetEmailPassword.text5')
        this.tooltipVisible = true
        setTimeout(() => {
          this.tooltipVisible = false
        }, 2000)
        return
      }
      let res = await resetEmailpassword({
        Email: this.email,
        Shopname: this.shopname,
        Mailpwd: hexSha1(this.newpassword)
      })
      messageAlert(res)
      if (res.data.code === 1) {
        this.$router.push({
          path: '/loginAndRegister/ALogin'
        })
      }
    }
  },
  created () {
    this.email = this.$route.query.Email
    this.shopname = this.$route.query.Shopname
    document.onkeydown = () => {
      // 登陆键盘事件
      const key = window.event.keyCode
      if (key === 13) {
        this.submit()
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>
<style lang='less' scoped>
.content {
  padding-left: 36px;
  padding-right: 36px;
    h4 {
    margin-top: 0.625rem;
    margin-bottom: 0.625rem;
    font-size: 0.9375rem;
    font-weight: bold;
    text-align: center;
    word-spacing: 2px;
    letter-spacing: 3px;
    }
    .c-inputs {
      position: relative;
      label {
        margin-bottom: 0.25rem;
        display: inline-block;
      }
      .c-newpassword {
          position: relative;
        margin-bottom: 1.0625rem;
      }
      .c-confirm-newpassword {
           position: relative;
        margin-bottom: 1.0625rem;
      }
      .eyes {
        position: absolute;
        right: 0.5rem;
        top: 0.65625rem;
        width: 0.53125rem;
        height: 0.375rem;
        z-index: 10;
      }
      .eyes:hover {
        cursor: pointer;
      }
    }
    .c-button {
      margin-bottom: 1.0625rem;
    }

}
</style>
