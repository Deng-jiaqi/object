<template>
    <div class="c-content">
      <div class="c-form">
        <p class="title">{{$t('lang.loginOfEmail.text1')}}</p>
        <p class="store">{{$t('lang.loginOfEmail.text6')}}{{storeName}}</p>
        <div class="c-myinput">
          <Grayinput
            v-model="email"
            :type="'text'"
            :placeholder="$t('lang.loginOfEmail.text2')"
          />
          <Tooltip :text="message" :visible='toolTipVisible'/>
        </div>
        <div class="c-other">
          <router-link
            :to="$t('lang.loginOfEmail.text3.href')"
          >{{$t('lang.loginOfEmail.text3.title')}}</router-link>
        </div>
        <div class="c-mybutton">
          <CircleButton @click.native="login" :width="'100%'" :text="$t('lang.loginOfEmail.text4')"/>
        </div>
      </div>
    </div>
</template>

<script>
import { ELoginOfEmail } from '../../common/api/api'
import { emailValidate } from '../../utils/validate'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Tooltip from '@/components/loginAndRegister/toolTip'
import Grayinput from '@/components/loginAndRegister/grayInput'
export default {
  name: 'ELoginOfEmail',
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
      message: '',
      // ui
      toolTipVisible: false
    }
  },
  methods: {
    login () {
      // 登录
      if (!emailValidate(this.email)) {
        this.message = this.$t('lang.loginOfEmail.text5')
        this.toolTipVisible = true
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      ELoginOfEmail({
        Shopname: this.storeName,
        Email: this.email
      }).then(res => {
        if (res.data.code === 0) {
          this.email = ''
          this.message = res.data.msg
          this.toolTipVisible = true
          setTimeout(() => {
            this.toolTipVisible = false
          }, 2000)
        } else {
          if (res.data.code === 1) {
            this.$router.push({
              path: '/loginAndRegister/ELoginOfPassword',
              query: {
                Shopname: this.storeName,
                email: this.email
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.storeName = this.$route.query.Shopname // 获取店铺名
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
  padding-left: 36px;
  padding-right: 36px;
  .c-form {
    height: 16.25rem;
    background-color: #fff;
    flex-grow: 1;
    .title {
      margin-top: 20px;
      color: black;
      font-size: 1.25rem;
      margin-bottom: 20px;
      text-align: center;
      font-weight: bold;
    }
    .store {
      color: #4267b2;
      font-size: 0.5rem;
      margin-top: 0;
      margin-bottom: 0.5625rem;
    }
    .c-myinput {
      position: relative;
    }
    .c-other {
      margin: auto;
      display: flex;
      margin-top: 0.625rem;
      margin-bottom: 1.53125rem;
      justify-content: flex-end;
      a {
        text-decoration: none;
        color: rgba(102, 102, 102, 1);
        font-size: 0.5rem;
      }
    }
    .c-mybutton {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
