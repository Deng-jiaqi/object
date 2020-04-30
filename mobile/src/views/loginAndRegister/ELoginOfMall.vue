<template>
  <div class="c-content">
    <div class="c-ELoginOfMall">
      <p class="title">{{$t('lang.loginOfEmail.text1')}}</p>
      <span
        @click="toAdmin"
      >{{$t('lang.loginOfMall.text')}}</span>
    </div>
    <div class="c-myinput">
      <Grayinput v-model="storeName" :type="'text'" :placeholder="$t('lang.loginOfMall.text2')" />
      <Tooltip :text="message" :visible="toolTipVisible" />
    </div>
    <div class="c-other">
      <router-link :to="$t('lang.loginOfMall.text4.href')">{{$t('lang.loginOfMall.text4.title')}}</router-link>
    </div>
    <div class="c-mybutton">
      <CircleButton @click.native="login" :width="'100%'" :text="$t('lang.loginOfMall.text5')" />
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
  padding-left: 36px;
  padding-right: 36px;
  .c-ELoginOfMall {
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
    .title {
      margin-top: 20px;
      color: black;
      font-size: 1.25rem;
      margin-bottom: 20px;
      text-align: center;
      font-weight: bold;
    }
    span {
      color: rgba(66, 103, 178, 1);
      cursor: pointer;
      font-size: 0.6875rem;
    }
  }
  .c-myinput {
    position: relative;
  }
  .c-other {
    margin: auto;
    display: flex;
    margin-top: 0.625rem;
    margin-bottom: 30px;
    justify-content: flex-end;
    a {
      text-decoration: none;
      color: #4267b2;
      font-size: 0.5rem;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
  }
}
</style>
