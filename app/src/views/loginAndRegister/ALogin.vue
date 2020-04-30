<template>
  <div>
    <div class="content">
      <div class="c-toemployees">
        <router-link
          @click.native="toEmployees"
          :to="$t('lang.ALogin.text1.href')"
        >{{$t('lang.ALogin.text1.title')}}</router-link>
      </div>
      <p class="title">{{$t('lang.ALogin.text2')}}</p>
      <p class="text">{{$t('lang.ALogin.text3')}}</p>
      <div class="c-inputs">
        <div class="c-eamil">
          <my-input
            :width="'17.1875rem'"
            :height="'0.9375rem'"
            v-model="email"
            :placeholder="$t('lang.ALogin.text4')"
          />
        </div>
        <div class="c-password">
          <span v-if="!isPassword" class="iconfont icon-yanjing" @click="togglePasswordType"></span>
          <span v-if="isPassword" class="iconfont icon-icon-eye-close" @click="togglePasswordType"></span>
          <my-input
            :width="'17.1875rem'"
            :height="'0.9375rem'"
            v-model="password"
            :type="passwordType"
            :placeholder="$t('lang.ALogin.text5')"
          />
        </div>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-0rem'"
              :text="$i18n.locale === 'en-US'?judge1():judge2()"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip2">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-0rem'"
              :text="message"
            />
          </div>
        </transition>
      </div>
      <div class="c-mybutton">
        <my-button
          v-on:click.native="login"
          :myclass="isLocked?'cantclick':''"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.ALogin.text6')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ALogin } from '../../common/api/api'
import { hexSha1 } from '../../utils/encryption'
import { emailValidate, passwordValidate } from '../../utils/validate'
export default {
  name: 'ALogin',
  data () {
    return {
      //   变量
      email: '',
      password: '',
      message: '',
      passwordType: 'password',
      isLocked: false,
      // ui
      isPassword: true,
      forshowTip: false,
      forshowTip2: false
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
    judge1 () {
      // 判断错误位置
      if (emailValidate(this.email) === false) {
        return 'Incorrect mailbox format'
      }
      if (passwordValidate(this.password) === false) {
        return 'The password consists of 8-20 digits and letters'
      }
    },
    judge2 () {
      // 判断错误位置
      if (emailValidate(this.email) === false) {
        return '邮箱格式不正确'
      }
      if (passwordValidate(this.password) === false) {
        return '密码由8-20个数字和字母组成'
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
    login () {
      if (this.isLocked) {
        return
      }
      this.isLocked = true
      if (
        emailValidate(this.email) === false ||
        passwordValidate(this.password) === false
      ) {
        this.isLocked = false
        this.forshowTip = true
        setTimeout(() => {
          this.forshowTip = false
        }, 2000)
        return
      }
      if (emailValidate(this.email) && passwordValidate(this.password)) {
        ALogin({
          Email: this.email,
          Mailpwd: hexSha1(this.password)
        }).then(res => {
          console.log(res)
          this.isLocked = false
          if (res.data.code === 1) {
            console.log(res)
            let ALoginInfo = {}
            ALoginInfo.email = res.data.data.email
            ALoginInfo.shops = res.data.data.shops
            this.$cookies.set(
              'ALoginInfo',
              JSON.stringify(ALoginInfo),
              60 * 60 * 24 * 7
            ) // 存储登录信息
            this.$router.push({
              name: 'ALoginShops'
            })
          } else {
            this.message = res.data.msg
            this.forshowTip2 = true
            setTimeout(() => {
              this.forshowTip2 = false
            }, 2000)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
.content {
  .c-toemployees {
    margin-top: 40px;
    padding-right: 60px;
    text-align: right;
    a {
      color: rgba(253, 208, 127, 1);
      font-size: 22px;
    }
  }
  .title {
    margin-top: 60px;
    margin-bottom: 16px;
    text-align: center;
    font-size: 46px;
    font-weight: bold;
    color: black;
  }
  .text {
    color: rgba(102, 102, 102, 1);
    font-size: 28px;
    font-size: 28px;
    margin-bottom: 71px;
    text-align: center;
  }
  .c-inputs {
    position: relative;
    margin-bottom: 169px;
    .c-eamil {
      display: flex;
      justify-content: center;
      margin-bottom: 49px;
    }
    .c-password {
      position: relative;
      display: flex;
      justify-content: center;
      margin-bottom: 49px;
      .icon-yanjing {
        color: #a0afcb;
        font-size: 27px;
        position: absolute;
        right: 120px;
        z-index: 100;
        top: 0;
      }
      .icon-icon-eye-close {
        color: #a0afcb;
        font-size: 27px;
        position: absolute;
        right: 120px;
        z-index: 100;
        top: 0;
      }
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
