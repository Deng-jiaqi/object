<template>
  <div>
    <div class="content">
      <p class="title">{{$t('lang.registerOfIndex.text1')}}</p>
      <div class="c-inputs">
        <div class="c-eamil">
          <my-input
            :width="'17.1875rem'"
            :height="'0.9375rem'"
            v-model="email"
            :placeholder="$t('lang.registerOfIndex.text2')"
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
            :placeholder="$t('lang.registerOfIndex.text3')"
          />
        </div>
        <div class="c-storeName">
          <my-input
            :width="'17.1875rem'"
            :height="'0.9375rem'"
            v-model="storeName"
            :placeholder="$t('lang.registerOfIndex.text4')"
          />
        </div>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'10.9375rem'"
              :height="'4.5rem'"
              :left="'calc(50% - 6.468rem)'"
              :top="'1rem'"
              :text="$i18n.locale === 'en-US'?judge1():judge2()"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip2">
            <my-tooltip
              :width="'10.9375rem'"
              :left="'calc(50% - 6.468rem)'"
              :top="'-1rem'"
              :text="message"
            />
          </div>
        </transition>
      </div>
      <div class="c-mybutton">
        <my-button
          v-on:click.native="register"
          :myclass="isLocked?'cantclick':''"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.registerOfIndex.text5')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ARegisterOfIndex } from '../../common/api/api'
import { hexSha1 } from '../../utils/encryption'
import {
  emailValidate,
  passwordValidate,
  storeNameValidate
} from '../../utils/validate'
export default {
  name: 'ARegisterOfIndex',
  data () {
    return {
      //   变量
      email: '',
      password: '',
      storeName: '',
      passwordType: 'password',
      isLocked: false,
      userid: '',
      message: '',
      //   ui
      forshowTip: false,
      forshowTip2: false,
      isPassword: true
    }
  },
  methods: {
    judge1 () {
      // 判断错误位置
      if (emailValidate(this.email) === false) {
        return 'Incorrect mailbox format'
      }
      if (passwordValidate(this.password) === false) {
        return 'The password consists of 8-20 digits and letters'
      }
      if (storeNameValidate(this.storeName) === false) {
        return 'The store name cannot be empty'
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
      if (storeNameValidate(this.storeName) === false) {
        return '商店名不能为空'
      }
    },
    register () {
      if (this.isLocked) {
        return
      }
      this.isLocked = true
      if (
        emailValidate(this.email) === false ||
        passwordValidate(this.password) === false ||
        storeNameValidate(this.storeName) === false
      ) {
        this.isLocked = false
        this.forshowTip = true
        setTimeout(() => {
          this.forshowTip = false
        }, 2000)
        return
      }
      if (
        emailValidate(this.email) &&
        passwordValidate(this.password) &&
        storeNameValidate(this.storeName)
      ) {
        ARegisterOfIndex({
          Email: this.email,
          Mailpwd: hexSha1(this.password),
          Shopname: this.storeName
        }).then(res => {
          this.isLocked = false
          if (res.data.code === 1) {
            this.userid = res.data.data.Sellerid
            this.$router.push({
              name: '注册输入店铺密码',
              params: {
                id: this.userid,
                email: this.email,
                password: hexSha1(this.password),
                store: this.storeName
              }
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
  }
}
</script>

<style scoped lang='less'>
.content {
  .title {
    color: rgba(51, 51, 51, 1);
    text-align: center;
    font-size: 46px;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 60px;
  }
  .c-inputs {
    position: relative;
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
    .c-storeName {
      display: flex;
      justify-content: center;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
    margin-top: 126px;
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
