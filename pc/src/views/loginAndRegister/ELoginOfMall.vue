<template>
  <div class="c-content">
    <div class="c-img">
      <img src="../../assets/loginAndRegister/logo_image.png" alt />
    </div>
    <div class="c-form">
      <div class="c-admin">
        <span
          @click="toAdmin"
        >{{$t('lang.loginOfMall.text')}}</span>
      </div>
      <p class="title">{{$t('lang.loginOfMall.text1')}}</p>
      <div class="c-myinput">
        <Tooltip :text="message" :visible="toolTipVisible" />
        <Grayinput
          v-model="storeName"
          :type="'text'"
          :placeholder="$t('lang.loginOfMall.text2')"
        />
      </div>
      <div class="c-other">
        <router-link :to="$t('lang.loginOfMall.text4.href')">{{$t('lang.loginOfMall.text4.title')}}</router-link>
      </div>
      <div class="c-mybutton">
        <CircleButton
          @click.native="login"
          :width="'100%'"
          :text="$t('lang.loginOfMall.text5')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ELoginOfMall } from '../../common/api/api'
import { storeNameValidate } from '../../utils/validate'
import CircleButton from '@/components/loginAndRegister/circleButton'
import Tooltip from '@/components/loginAndRegister/toolTip'
import Grayinput from '@/components/loginAndRegister/grayInput'
export default {
  name: 'ELoginOfMall',
  components: {
    CircleButton,
    Tooltip,
    Grayinput
  },
  data () {
    return {
      // 临时变量
      storeName: '',
      message: '',
      // ui
      toolTipVisible: false
    }
  },
  methods: {
    toAdmin () {
      if (this.$cookies.get('ALoginInfoSuccessList')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'admin' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ALogin' })
      }
    },
    login () {
      // 登录
      if (!storeNameValidate(this.storeName)) {
        this.toolTipVisible = true
        this.message = this.$t('lang.loginOfMall.text6')
        setTimeout(() => {
          this.toolTipVisible = false
        }, 2000)
        return
      }
      ELoginOfMall({ Shopname: this.storeName }).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.storeName = ''
          this.message = res.data.msg
          this.toolTipVisible = true
          setTimeout(() => {
            this.toolTipVisible = false
          }, 2000)
        } else {
          if (res.data.code === 1) {
            this.$router.push(
              {
                path: '/loginAndRegister/ELoginOfEmail',
                query: {
                  Shopname: this.storeName
                }
              })
          }
        }
      })
    }
  },
  created () {
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
  width: 25.65625rem;
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
  .c-form {
    height: 16.25rem;
    background-color: #fff;
    flex-grow: 1;
    padding-left: 1.875rem;
    padding-right: 1.875rem;
    .c-admin {
      position: relative;
      margin-top: 1.5625rem;
      text-align: right;
      span {
        color: rgba(66, 103, 178, 1);
        font-size: 0.6875rem;
        cursor: pointer;
      }
    }
    .title {
      margin-top: 1.625rem;
      color: black;
      font-size: 1.25rem;
      margin-bottom: 1.34375rem;
      text-align: center;
      font-weight: bold;
    }
    .c-myinput {
      position: relative;
    }
    .c-other {
      text-align: right;
      margin-top: 0.625rem;
      margin-bottom: 1.33125rem;

      a {
        text-decoration: none;
        color: #4267b2;
        font-size: 0.5rem;
      }
    }
  }
}
</style>
