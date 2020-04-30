<template>
  <div class="c-content">
    <div class="c-img">
      <img src="../../assets/loginAndRegister/regImg.png" />
    </div>
    <div class="c-right">
      <p class="title">{{$t('lang.registerOfIndex.text1')}}</p>
      <div class="c-inputs">
        <Tooltip :text="message" :visible="toolTipVisible" />
        <div class="c-email">
          <Grayinput v-model="email" :placeholder="$t('lang.registerOfIndex.text2')" />
        </div>

        <div class="c-password">
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
            :placeholder="$t('lang.registerOfIndex.text3')"
          />
        </div>
        <div class="c-store">
          <Grayinput v-model="storeName" :placeholder="$t('lang.registerOfIndex.text4')" />
        </div>
      </div>

      <div class="c-mybutton">
        <div class="wait" v-show="inwait"></div>
        <CircleButton
          v-show="!inwait"
          @click.native="register"
          v-preventReClick="4000"
          :width="'100%'"
          :text="$t('lang.registerOfIndex.text5')"
        />
        <CircleButton v-show="inwait" v-preventReClick="4000" :width="'100%'" :text="number+'s'" />
      </div>
      <div class="back">
        <span @click="back">{{$t('lang.registerOfIndex.text6')}}</span>
        <!-- <img src="../../assets/loginAndRegister/back——orange@2x.png" alt /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ARegisterOfIndex } from '../../common/api/api'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Tooltip from '@/components/loginAndRegister/toolTip'
import Grayinput from '@/components/loginAndRegister/grayInput'
import {
  emailValidate,
  passwordValidate,
  storeNameValidate
} from '../../utils/validate'
import { hexSha1 } from '../../utils/encryption'
export default {
  name: 'ARegisterOfIndex',
  components: {
    CircleButton,
    Tooltip,
    Grayinput
  },
  data () {
    return {
      // 临时变量
      inwait: false,
      number: 30,
      email: '',
      password: '', // 邮箱密码
      storeName: '',
      message: '',
      userid: '',
      passwordType: 'password',
      // ui
      toolTipVisible: false,
      isPassword: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async register () {
      if (
        !emailValidate(this.email) ||
        !passwordValidate(this.password) ||
        !storeNameValidate(this.storeName)
      ) {
        if (!emailValidate(this.email)) {
          this.message = this.$t('lang.registerOfIndex.text8')
          this.toolTipVisible = true
          setTimeout(() => {
            this.toolTipVisible = false
          }, 2000)
          return
        }
        if (!passwordValidate(this.password)) {
          this.message = this.$t('lang.registerOfIndex.text9')
          this.toolTipVisible = true
          setTimeout(() => {
            this.toolTipVisible = false
          }, 2000)
          return
        }
        if (!storeNameValidate(this.storeName)) {
          this.message = this.$t('lang.registerOfIndex.text10')
          this.toolTipVisible = true
          setTimeout(() => {
            this.toolTipVisible = false
          }, 2000)
          return
        }
      }
      if (
        emailValidate(this.email) &&
        passwordValidate(this.password) &&
        storeNameValidate(this.storeName)
      ) {
        let res = await ARegisterOfIndex({
          Email: this.email,
          Mailpwd: hexSha1(this.password),
          Shopname: this.storeName
        })
        console.log(res)
        if (res.data.code === 1) {
          this.$cookies.set('registerEmail', this.email)
          this.$cookies.set('registerStoreName', this.storeName)
          console.log(this.$cookies.get('registerEmail'))
          console.log(this.$cookies.get('registerStoreName'))
          this.userid = res.data.data.Sellerid
          this.$message({
            message: `${res.data.msg}`,
            type: 'success'
          })
          if (!this.inwait) {
            this.inwait = true
            console.log(this.$refs.btn)
            let timer = setInterval(() => {
              this.number -= 1
              if (this.number === 0) {
                clearTimeout(timer)
                this.inwait = false
                this.number = 30
              }
            }, 1000)
            // setTimeout(() => {
            //   this.inwait = false
            // }, 30000)
          }
        } else {
          if (res.data.code === 0) {
            this.message = res.data.msg
            this.toolTipVisible = true
            setTimeout(() => {
              this.toolTipVisible = false
            }, 2000)
          }
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
    }
  },
  created () {
    document.onkeydown = () => {
      const key = window.event.keyCode // 注册键盘事件
      if (key === 13) {
        this.register()
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>

<style  scoped lang="less">
.c-content {
  background-color: #fff;
  width: 26.28125rem;
  height: 16.59375rem;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: calc(50% - 12.8125rem);
  top: calc(50% - 8.28125rem);
  .c-img {
    position: relative;
    width: 13.15625rem;
    height: 16.59375rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .c-right {
    flex-grow: 1;
    position: relative;
    padding-right: 0.875rem;
    padding-left: 0.875rem;
    .title {
      color: rgba(1, 1, 1, 1);
      font-size: 1rem;
      font-weight: Bold;
      margin-top: 1.5625rem;
      margin-bottom: 1.40625rem;
    }
    .c-inputs {
      position: relative;
      .c-email {
        position: relative;
        margin-bottom: 1rem;
        height: 1.5rem;
      }
      .c-password {
        position: relative;
        margin-bottom: 1rem;
        height: 1.5rem;
        .eyes {
          position: absolute;
          right: 0.6875rem;
          top: 0.65625rem;
          width: 0.53125rem;
          height: 0.375rem;
          z-index: 10;
        }
        .eyes:hover {
          cursor: pointer;
        }
      }
      .c-store {
        position: relative;
        margin-bottom: 1.15625rem;
        height: 1.5rem;
      }
    }

    .c-mybutton {
      margin-bottom: 1.125rem;
      position: relative;
      .wait {
        position: absolute;
        background-color: hsla(0, 0%, 100%, 0.35);
        height: 1.6875rem;
        width: 100%;
      }
    }
    .back {
      text-align: right;
      position: relative;
      span {
        cursor: pointer;
        color: rgba(66, 103, 178, 1);
        font-size: 0.6875rem;
      }
    }
  }
}
</style>
