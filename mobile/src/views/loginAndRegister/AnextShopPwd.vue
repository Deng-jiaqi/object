<template>
  <div class="content">
    <p class="title">{{$t('lang.registerPwd.title')}}</p>
    <div class="c-myinput">
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
      <Grayinput
        v-model="shopPassword"
        :type="passwordType"
        :placeholder="$t('lang.registerPwd.inputTishi')"
      />
      <Tooltip :text="message" :visible="toolTipVisible" />
    </div>
    <div class="c-mybutton">
      <CircleButton
        @click.native.prevent="nextStep"
        :width="'100%'"
        :text="$t('lang.registerPwd.btn')"
      />
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
  name: 'AnextShopPwd',
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
.content {
  padding-left: 36px;
  padding-right: 36px;
  .title {
    margin-top: 20px;
    color: black;
    font-size: 1rem;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }
  .c-myinput {
    position: relative;
    margin-bottom: 1.90625rem;
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
    .c-mytoolTip {
      width: 6.125rem;
      height: 2.53125rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      z-index: 30;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
  }
}
p {
  margin: 0;
}
</style>
