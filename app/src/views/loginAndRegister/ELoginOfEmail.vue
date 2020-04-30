<template>
  <div>
    <div class="content">
      <p class="title">{{$t('lang.loginOfEmail.text1')}}</p>
      <p class="storeName">{{$t('lang.loginOfEmail.text2')}}{{storeName}}</p>
      <div class="c-myinput">
        <my-input
          :width="'17.1875rem'"
          :height="'0.9375rem'"
          v-model="email"
          :placeholder="$t('lang.loginOfEmail.text3')"
        />
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-2.7rem'"
              :text="$t('lang.loginOfEmail.text6')"
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
      <div class="c-other">
        <router-link
          :to="$t('lang.loginOfEmail.text4.href')"
        >{{$t('lang.loginOfEmail.text4.title')}}</router-link>
      </div>
      <div class="c-mybutton">
        <my-button
          v-on:click.native="login"
          :myclass="isLocked?'cantclick':''"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.loginOfEmail.text5')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ELoginOfEmail } from '../../common/api/api'
import { emailValidate } from '../../utils/validate'
export default {
  name: 'ELoginOfEmail',
  data () {
    return {
      //   临时变量
      email: '',
      storeName: '',
      isLocked: false,
      message: '',
      //   ui
      forshowTip: false, // 点击按钮之后的总提示
      forshowTip2: false // 后端返回的提示
    }
  },
  methods: {
    login () {
      if (this.isLocked) {
        return
      }
      this.isLocked = true
      // 登录
      if (!emailValidate(this.email)) {
        this.forshowTip = true
        setTimeout(() => {
          this.forshowTip = false
        }, 2000)
        this.isLocked = false
        return
      }
      ELoginOfEmail({
        Shopname: this.storeName,
        Email: this.email
      }).then(res => {
        this.isLocked = false
        if (res.data.code === 0) {
          this.email = ''
          this.message = res.data.msg
          this.forshowTip2 = true
          setTimeout(() => {
            this.forshowTip2 = false
          }, 2000)
        } else {
          if (res.data.code === 1) {
            let ELoginInfo = this.$cookies.get('ELoginInfo')
            ELoginInfo.email = res.data.data.email
            this.$cookies.set('ELoginInfo', JSON.stringify(ELoginInfo), 60 * 60 * 24 * 7)
            this.$router.push({ path: '/loginAndRegister/ELoginOfPassword' })
          }
        }
      })
    }
  },
  created () {
    this.storeName = this.$cookies.get('ELoginInfo').storeName // 获取店铺名
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
  .storeName {
    text-align: center;
    margin-top: 0;
    margin-bottom: 60px;
    color: rgba(102, 102, 102, 1);
    font-size: 24px;
  }
  .c-myinput {
    display: flex;
    justify-content: center;
    position: relative;
    .c-mytooltip {
      //   position: relative;
    }
  }
  .c-other {
    width: 500px;
    margin: auto;
    margin-top: 40px;
    text-align: right;
    padding-right: 30px;
    a {
      color: rgba(102, 102, 102, 1);
      font-weight: Regular;
      font-size: 22px;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
    margin-top: 157px;
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
