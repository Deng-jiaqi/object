<template>
  <div>
    <div class="content">
      <p class="title">{{$t('lang.ALoginOfShopPsw.text1')}}</p>
      <div class="c-myinput">
        <span v-if="!isPassword" class="iconfont icon-yanjing" @click="togglePasswordType"></span>
        <span v-if="isPassword" class="iconfont icon-icon-eye-close" @click="togglePasswordType"></span>
        <my-input
          :width="'17.1875rem'"
          :height="'0.9375rem'"
          v-model="password"
          :type="passwordType"
          :placeholder="$t('lang.ALoginOfShopPsw.text2')"
        />
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-1.7rem'"
              :text="$t('lang.ALoginOfShopPsw.text4')"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip2">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-1.7rem'"
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
import { ALoginOfshopPsw } from '../../common/api/api'
import { hexSha1 } from '../../utils/encryption'
import { passwordValidate } from '../../utils/validate'
export default {
  name: 'ALoginOfShopPsw',
  data () {
    return {
      //   变量
      password: '',
      isLocked: false,
      storeName: '',
      email: '',
      passwordType: 'password',
      // ui
      forshowTip: false,
      forshowTip2: false,
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
      ALoginOfshopPsw({
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
            console.log(res)
            let ALoginInfoSuccess = {}
            ALoginInfoSuccess.email = this.email
            ALoginInfoSuccess.site = this.site
            ALoginInfoSuccess.storeName = this.storeName
            ALoginInfoSuccess.token = res.data.data.token
            ALoginInfoSuccess.sellerid = res.data.data.sellerid
            if (this.$cookies.get('ALoginInfoSuccessList')) {} else {
              this.$cookies.set('ALoginInfoSuccessList', JSON.stringify([]), 60 * 60 * 24 * 7)
            }
            let list = JSON.parse(this.$cookies.get('ALoginInfoSuccessList'))
            list.push(ALoginInfoSuccess) // 最近登录列表
            this.$cookies.set('ALoginInfoSuccessList', JSON.stringify(list))
            console.log('登录成功了')
            this.$router.push({
              path: '/administratorPanel/home'
            })
          } else {
            this.message = res.data.msg
            this.forshowTip2 = true
            setTimeout(() => {
              this.forshowTip2 = false
            }, 2000)
          }
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
    this.storeName = this.$route.query.storeName
    this.email = this.$route.query.email
    this.site = this.$route.query.site
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
    margin-bottom: 112px;
    font-weight: bold;
  }
  .c-myinput {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 258px;
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
