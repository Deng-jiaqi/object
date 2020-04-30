<template>
  <div class="c-Alogin">
    <div class="c-employees">
      <p class="title">{{$t('lang.loginOfEmail.text1')}}</p>
      <span
        @click="toEmployees"
      >{{$t('lang.ALogin.text6')}}</span>
    </div>
    <div class="c-inputs">
      <div class="c-email">
        <Grayinput v-model="email" :type="'text'" :placeholder="$t('lang.ALogin.text3')" />
      </div>
      <div class="c-password">
        <Grayinput v-model="password" :type="passwordType" :placeholder="$t('lang.ALogin.text4')" />
        <img
          src="../../assets/loginAndRegister/eyes@2x@2x.png"
          class="eyes"
          v-if="!isPassword"
          @click="togglePasswordType"
        />
        <img
          src="../../assets/loginAndRegister/closeEyes@2x.png"
          class="eyes"
          v-if="isPassword"
          @click="togglePasswordType"
        />
      </div>
      <Tooltip class="Tooltip" :text="message" :visible="tooltipVisible" />
    </div>
    <div class="other">
      <router-link :to="$t('lang.loginOfMall.text7.href')">{{$t('lang.loginOfMall.text7.title')}}</router-link>
      <router-link :to="$t('lang.loginOfMall.text3.href')">{{$t('lang.loginOfMall.text3.title')}}</router-link>
    </div>
    <div class="c-mybutton">
      <CircleButton @click.native="login" :width="'100%'" :text="$t('lang.ALogin.text5')" />
    </div>
  </div>
</template>

<script>
import { ALogin } from '../../common/api/api'
import { hexSha1 } from '../../utils/encryption'
import { emailValidate, passwordValidate } from '../../utils/validate'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Grayinput from '@/components/loginAndRegister/grayInput'
import Tooltip from '@/components/loginAndRegister/toolTip'
export default {
  name: 'ALogin',
  components: {
    CircleButton,
    Grayinput,
    Tooltip
  },
  data () {
    return {
      // 变量
      email: '',
      password: '',
      passwordType: 'password',
      message: '',
      // ui
      tooltipVisible: false,
      isPassword: true
    }
  },
  methods: {
    toEmployees () {
      if (this.$cookies.get('ELoginInfoSuccess')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'employees' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ELoginOfMall' })
      }
    },
    login () {
      if (
        // 判断提示语
        !emailValidate(this.email) ||
        !passwordValidate(this.password)
      ) {
        if (!emailValidate(this.email)) {
          this.message = this.$t('lang.ALogin.text7')
          this.tooltipVisible = true
          setTimeout(() => {
            this.tooltipVisible = false
          }, 2000)
          return
        }
        if (!passwordValidate(this.password)) {
          this.message = this.$t('lang.ALogin.text8')
          this.tooltipVisible = true
          setTimeout(() => {
            this.tooltipVisible = false
          }, 2000)
          return
        }
      }
      ALogin({
        Email: this.email,
        Mailpwd: hexSha1(this.password)
      }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          let ALoginInfo = {}
          ALoginInfo.email = res.data.data.email
          ALoginInfo.shops = res.data.data.shops
          this.$cookies.set(
            'ALoginInfo',
            JSON.stringify(ALoginInfo),
            60 * 60 * 24 * 3
          ) // 存储登录信息
          this.$router.push({
            name: 'ALoginShops'
          })
        } else {
          this.message = res.data.msg
          this.tooltipVisible = true
          setTimeout(() => {
            this.tooltipVisible = false
          }, 2000)
        }
      })
    },
    togglePasswordType () {
      this.isPassword = !this.isPassword
      switch (this.passwordType) {
        case 'password':
          this.passwordType = 'text'
          break
        case 'text':
          this.passwordType = 'password'
          break
      }
    }
  },
  created () {
    document.onkeydown = () => {
      const key = window.event.keyCode // 注册键盘事件
      if (key === 13) {
        this.login()
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>

<style lang='less' scoped>
.c-Alogin {
  padding-left: 36px;
  padding-right: 36px;
  .c-employees {
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
    .title {
      margin-top: 20px;
      color: black;
      font-size: 1.25rem;
      margin-bottom: 20px;
      text-align: center;
      font-weight: bold;
    }
    span {
      color: #4267b2;
      cursor: pointer;
      font-size: 0.6875rem;
    }
  }
  .c-inputs {
    position: relative;
    .c-email {
      margin-bottom: 1.0625rem;
    }
    .c-password {
      margin-bottom: 0.6rem;
      position: relative;
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
  }
  .other {
    margin-top: 0.625rem;
    margin-bottom: 0.9375rem;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      color: #4267b2;
      font-size: 0.5rem;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
  }
}
</style>
