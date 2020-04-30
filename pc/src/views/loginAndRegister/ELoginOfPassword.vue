<template>
  <div class="c-content">
    <div class="c-img">
      <img src="../../assets/loginAndRegister/logo_image.png" alt />
    </div>
    <div class="c-form">
      <p class="title">{{$t('lang.loginOfPassword.text1')}}</p>
      <p class="storeName">{{$t('lang.loginOfPassword.text2')}}{{storeName}}</p>
      <p class="email">{{email}}</p>
      <div class="c-myinput">
        <Tooltip :text="message" :visible="toolTipVisible" />

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
        <Grayinput
          v-model="password"
          :type="passwordType"
          :placeholder="$t('lang.loginOfPassword.text3')"
          :width="'9.78125rem'"
          :height="'1.5rem'"
        />
      </div>
      <div class="c-other">
        <p @click="toForgetPassword">{{$t('lang.loginOfPassword.text4.title')}}</p>
      </div>
      <div class="c-mybutton">
        <CircleButton
          @click.native="login"
          :width="'100%'"
          :text="$t('lang.loginOfPassword.text5')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ELoginOfPassword } from '../../common/api/api'
import { hexSha1 } from '../../utils/encryption'
import { passwordValidate } from '../../utils/validate'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Tooltip from '@/components/loginAndRegister/toolTip'
import Grayinput from '@/components/loginAndRegister/grayInput'
import { mapActions } from 'vuex'
export default {
  name: 'ELoginOfPassword',
  components: {
    CircleButton,
    Tooltip,
    Grayinput
  },
  data () {
    return {
      // 临时变量
      storeName: '',
      email: '',
      password: '',
      message: '',
      passwordType: 'password',
      // ui
      toolTipVisible: false,
      isPassword: true
    }
  },
  methods: {
    async login () {
      // 登录
      if (!passwordValidate(this.password)) {
        this.message = this.$t('lang.loginOfPassword.text6')
        this.toolTipVisible = true
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      let res = await ELoginOfPassword({
        Shopname: this.storeName,
        Email: this.email,
        Passwd: hexSha1(this.password)
      })
      console.log(res)
      if (res.data.code === 0) {
        this.password = ''
        this.message = res.data.msg
        this.toolTipVisible = true
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
      } else {
        if (res.data.code === 1) {
          let ELoginInfoSuccess = {}
          ELoginInfoSuccess.storeName = this.storeName
          ELoginInfoSuccess.email = this.email
          ELoginInfoSuccess.token = res.data.data.token
          ELoginInfoSuccess.sellerid = res.data.data.sellerid
          ELoginInfoSuccess.site = res.data.data.site
          console.log(ELoginInfoSuccess)
          this.$cookies.set(
            'ELoginInfoSuccess',
            JSON.stringify(ELoginInfoSuccess),
            60 * 60 * 24 * 3
          )
          this.$cookies.set('creater', res.data.data.is_creater)
          this.$cookies.set('sellerid', res.data.data.sellerid)
          this.$cookies.set('sellername', res.data.data.sellername)
          this.$cookies.set('sellerimg', res.data.data.seller_head)
          await this.getPermissionListForLoginSuccess()
          this.$router.push({
            path: '/administratorPanel/home'
          })
        }
      }
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
    },
    toForgetPassword () {
      this.$router.push({
        path: '/loginAndRegister/forgetPassword',
        query: {
          email: this.email,
          Shopname: this.storeName
        }
      })
    },
    ...mapActions(['getPermissionListForLoginSuccess'])
  },
  created () {
    this.storeName = this.$route.query.Shopname
    this.email = this.$route.query.email
    document.onkeydown = () => {
      // 登陆键盘事件
      const key = window.event.keyCode
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

<style scoped lang="less">
.c-content {
  width: 25.65625rem;
  height: 16.25rem;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: calc(50% - 12.8125rem);
  top: 20vh;
  .c-img {
    width: 11.4375rem;
    height: 16.25rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .c-form {
    height: 100%;
    background-color: #fff;
    flex-grow: 1;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
    .title {
      margin-top: 2.34375rem;
      color: black;
      font-size: 1.25rem;
      margin-bottom: 1.625rem;
      text-align: center;
      font-weight: bold;
    }
    .storeName {
      color: rgba(153, 153, 153, 1);
      font-size: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.65625rem;
    }
    .email {
      color: rgba(51, 51, 51, 1);
      font-size: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.65625rem;
    }
    .c-myinput {
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
    .c-other {
      margin-top: 0.4375rem;
      margin-bottom: 0.9375rem;
      text-align: right;
      p {
        display: inline-block;
        margin: 0;
        color: rgba(102, 102, 102, 1);
        font-size: 0.5rem;
      }
      p:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
