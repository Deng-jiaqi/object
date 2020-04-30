<template>
    <div class="content">
      <div class="c-img">
        <img src="../../assets/loginAndRegister/admin-login-image.png" alt />
      </div>
      <div class="c-right">
        <p class="title">{{$t('lang.ALoginOfshopPsw.text1')}}</p>
        <p class="store">{{$t('lang.ALoginOfshopPsw.text6')}} {{storeName}}</p>
        <div class="c-myinput">
           <Tooltip :text="message" :visible='toolTipVisible'/>
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
            :placeholder="$t('lang.ALoginOfshopPsw.text2')"
          />
        </div>
        <div class="c-other">
          <span @click='toForgetStorePassword'>{{$t('lang.ALoginOfshopPsw.text4')}}</span>
        </div>
        <div class="c-mybutton">
          <CircleButton @click.native="login" :width="'100%'" :text="$t('lang.ALoginOfshopPsw.text3')"/>
        </div>
      </div>
    </div>

</template>

<script>
import { ALoginOfshopPsw } from '@/common/api/api'
import { passwordValidate } from '@/utils/validate'
import { hexSha1 } from '@/utils/encryption'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Tooltip from '@/components/loginAndRegister/toolTip'
import Grayinput from '@/components/loginAndRegister/grayInput'
import { mapActions } from 'vuex'
export default {
  name: 'ALoginOfShopPsw',
  components: {
    CircleButton,
    Tooltip,
    Grayinput
  },
  data () {
    return {
      // 变量
      password: '',
      message: '',
      isPassword: true,
      email: '',
      storeName: '',
      passwordType: 'password',
      // ui
      toolTipVisible: false
    }
  },
  methods: {
    async login () {
      // 登录
      if (!passwordValidate(this.password)) {
        this.toolTipVisible = true
        this.message = this.$t('lang.ALoginOfshopPsw.text5')
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      let res = await ALoginOfshopPsw({
        Shopname: this.storeName,
        Email: this.email,
        Passwd: hexSha1(this.password)
      })
      if (res.data.code === 0) {
        this.password = ''
        this.message = res.data.msg
        this.toolTipVisible = true
        setTimeout(() => {
          this.toolTipVisible = false
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
          if (!this.$cookies.get('ALoginInfoSuccessList')) {
            this.$cookies.set(
              'ALoginInfoSuccessList',
              JSON.stringify([]),
              60 * 60 * 24 * 3
            )
          }
          let list = JSON.parse(this.$cookies.get('ALoginInfoSuccessList'))
          list.push(ALoginInfoSuccess)
          this.$cookies.set('ALoginInfoSuccessList', JSON.stringify(list)) // 最近登录列表
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
    toForgetStorePassword () {
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
    this.storeName = this.$route.query.storeName
    this.email = this.$route.query.email
    this.site = this.$route.query.site
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
.content {
  width: 26.28125rem;
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
  .c-right {
    height: 16.25rem;
    background-color: #fff;
    flex-grow: 1;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
    .title {
      text-align: center;
      margin-top: 3.96875rem;
      margin-bottom: 1.15625rem;
      font-size: 1.25rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .store {
      font-size: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.5625rem;
    }
    .c-myinput {
      position: relative;
      margin-bottom: 0.6rem;
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
      margin-bottom: 1.90625rem;
      text-align: right;
      span {
       color: #4267b2;
       cursor: pointer;
      }
    }
  }
}
</style>
