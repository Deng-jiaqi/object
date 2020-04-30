<template>
  <div>
    <div class="content">
      <p class="title">{{$t('lang.loginOfPassword.text1')}}</p>
      <p class="store-name">{{$t('lang.loginOfPassword.text2')}}&nbsp;&nbsp;{{storeName}}</p>
      <p class="email">{{email}}</p>
      <div class="c-myinput">
        <span v-if="!isPassword" class="iconfont icon-yanjing" @click="togglePasswordType"></span>
        <span v-if="isPassword" class="iconfont icon-icon-eye-close" @click="togglePasswordType"></span>
        <my-input
          :width="'17.1875rem'"
          :height="'0.9375rem'"
          v-model="password"
          :type="passwordType"
          :placeholder="$t('lang.loginOfPassword.text3')"
        />
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-2.7rem'"
              :text="$t('lang.loginOfPassword.text6')"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip2">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-2.7rem'"
              :text="message"
            />
          </div>
        </transition>
      </div>
      <div class="c-others">
        <p @click="toForgetPassword">{{$t('lang.loginOfPassword.text4.title')}}</p>
      </div>
      <div class="c-mybutton">
        <my-button
          v-on:click.native="login"
          :myclass="isLocked?'cantclick':''"
          :width="'17.5rem'"
          :height="'2.875rem'"
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
export default {
  name: 'ELoginOfPassword',
  data () {
    return {
      // 临时变量
      storeName: '',
      email: '',
      password: '',
      isLocked: false,
      message: '',
      passwordType: 'password',
      // ui
      forshowTip: false, // 点击按钮之后的总提示
      forshowTip2: false, // 后端返回的提示
      isPassword: true
    }
  },
  methods: {
    login () {
      if (this.isLocked) {
        return
      }
      this.isLocked = true
      // 登录
      if (!passwordValidate(this.password)) {
        this.forshowTip = true
        setTimeout(() => {
          this.forshowTip = false
        }, 2000)
        this.isLocked = false
        return
      }
      ELoginOfPassword({
        Shopname: this.storeName,
        Email: this.email,
        Passwd: hexSha1(this.password)
      }).then(res => {
        console.log(res)
        this.isLocked = false
        if (res.data.code === 0) {
          this.password = ''
          this.message = res.data.msg
          this.forshowTip2 = true
          setTimeout(() => {
            this.forshowTip2 = false
          }, 2000)
        } else {
          if (res.data.code === 1) {
            let ELoginInfoSuccess = this.$cookies.get('ELoginInfo')
            ELoginInfoSuccess.token = res.data.data.token
            ELoginInfoSuccess.sellerid = res.data.data.sellerid
            console.log(JSON.stringify(ELoginInfoSuccess))
            this.$cookies.set('ELoginInfoSuccess', JSON.stringify(ELoginInfoSuccess), 60 * 60 * 24 * 7)
            console.log('登录成功了')
          }
        }
      })
    },
    toForgetPassword () {
      this.$router.push({
        name: '忘记密码',
        params: {
          email: this.email,
          Shopname: this.storeName
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
    this.storeName = this.$cookies.get('ELoginInfo').storeName
    this.email = this.$cookies.get('ELoginInfo').email
  }
}
</script>

<style scoped lang='less'>
.content {
  .title {
    color: rgba(51, 51, 51, 1);
    font-size: 46px;
    text-align: center;
    margin-top: 100px;
    margin-bottom: 70px;
    font-weight: bold;
  }
  .store-name {
    color: rgba(153, 153, 153, 1);
    font-size: 24px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
  }
  .email {
    color: rgba(51, 51, 51, 1);
    font-size: 26px;
    text-align: center;
    margin-bottom: 80px;
  }
  .c-myinput {
    display: flex;
    justify-content: center;
    position: relative;
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
  .c-others {
    text-align: right;
    padding-right: 125px;
    font-size: 22px;
    margin-top: 40px;
    margin-bottom: 113px;
    p {
      display: inline-block;
      margin: 0;
      color: rgba(102, 102, 102, 1);
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
    margin-top: 113px;
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
