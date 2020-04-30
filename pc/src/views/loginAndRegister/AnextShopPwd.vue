<template>
  <div class="c-content">
    <div class="c-img">
      <img src="../../assets/loginAndRegister/regImg.png" alt />
    </div>
    <div class="c-right">
      <p class="register-title">{{$t('lang.registerPwd.title')}}</p>
      <form class="register-form">
        <div class="c-shop-password">
          <Tooltip :text="message" :visible="toolTipVisible" />
          <Grayinput
            v-model="shopPassword"
            :type="passwordType"
            :placeholder="$t('lang.registerPwd.inputTishi')"
          />
          <img
            src="../../assets/loginAndRegister/eyes@2x@2x.png"
            class="eyes"
            v-if="passwordType==='text'"
            @click="togglePasswordType"
          />
          <img
            src="../../assets/loginAndRegister/closeEyes@2x.png"
            class="eyes"
            v-if="passwordType==='password'"
            @click="togglePasswordType"
          />
        </div>
        <div class="c-my-button">
          <CircleButton
            @click.native.prevent="nextStep"
            :width="'100%'"
            :text="$t('lang.registerPwd.btn')"
          />
        </div>
      </form>
      <div class="back">
        <span @click="back">{{$t('lang.registerOfIndex.text6')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { hexSha1 } from '@/utils/encryption'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Grayinput from '@/components/loginAndRegister/grayInput'
import Tooltip from '@/components/loginAndRegister/toolTip'
import { passwordValidate } from '@/utils/validate'
export default {
  name: 'register',
  components: {
    CircleButton,
    Grayinput,
    Tooltip
  },
  data () {
    return {
      // 变量
      message: '',
      passwordType: 'password',
      shopPassword: '', // 输入店铺密码input
      // ui
      toolTipVisible: false,
      //
      Mailpwd: '',
      Passwd: '',
      Email: '',
      Shopname: ''
    }
  },
  methods: {
    // 切换显示隐藏密码
    togglePasswordType () {
      switch (this.passwordType) {
        case 'password':
          this.passwordType = 'text'
          break
        case 'text':
          this.passwordType = 'password'
          break
      }
    },
    nextStep () {
      if (!passwordValidate(this.shopPassword)) {
        this.toolTipVisible = true
        this.message = this.$t('lang.ALoginOfshopPsw.text5')
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      let Base64 = require('js-base64').Base64
      if (
        Base64.decode(this.$route.query.mailpwd) === hexSha1(this.shopPassword)
      ) {
        this.toolTipVisible = true
        this.message = this.$t('temporary.nextShopPwd.text2')
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      sessionStorage.setItem('Pwd', hexSha1(this.shopPassword))
      sessionStorage.setItem(
        'Mailpwd',
        Base64.decode(this.$route.query.mailpwd)
      )
      sessionStorage.setItem('Email', this.$route.query.email)
      sessionStorage.setItem('Shopname', this.$route.query.shopname)
      this.$router.push({
        path: '/loginAndRegister/AregMessage'
      })
    },
    // 返回注册页面
    back () {
      this.$router.push({ path: '/loginAndRegister/ARegisterOfIndex' })
    }
  },
  created () {
    this.Shopname = this.$route.query.store
    this.Mailpwd = this.$route.query.password
    this.Email = this.$route.query.email
    this.$message({
      message: this.$t('temporary.nextShopPwd.text1'),
      type: 'success'
    })
  }
}
</script>

<style scoped lang="less">
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
    .register-title {
      color: rgba(1, 1, 1, 1);
      font-size: 1.2rem;
      font-weight: Bold;
      margin-top: 5rem;
      margin-bottom: 1.40625rem;
      text-align: center;
    }
    .register-form {
      .c-shop-password {
        position: relative;
        margin-bottom: 1.15625rem;
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
      .c-my-button {
        margin-bottom: 1.125rem;
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
