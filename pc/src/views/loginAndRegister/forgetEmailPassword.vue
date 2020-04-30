<template>
  <div class="content">
    <div class="c-left">
      <h4>{{$t('lang.forgetEmailPassword.text1')}}</h4>
      <form @submit.prevent="preventDefault">
        <div class="c-inputs">
          <Tooltip :text="message" :visible="tooltipVisible" />
          <label>{{$t('lang.forgetEmailPassword.text2')}}</label>
          <div class="c-email">
            <Grayinput v-model="email"/>
          </div>
          <label>{{$t('lang.forgetEmailPassword.text3')}}</label>
          <div class="c-shopname">
            <Grayinput v-model="shopname"/>
          </div>
        </div>
        <div class="c-button">
          <CircleButton @click.native="submit" :width="'100%'" :text="$t('lang.forgetEmailPassword.text5')" />
        </div>
      </form>
      <div class="c-back">
        <span class="back" @click="back">
          {{$t('lang.forgetEmailPassword.text4')}}
          <span class="iconfont el-icon-arrow-right"></span>
        </span>
      </div>
    </div>
    <div class="c-img">
      <img :src="bgImg" alt />
    </div>
  </div>
</template>
<script>
import CircleButton from '@/components/loginAndRegister/circleButton'
import Grayinput from '@/components/loginAndRegister/grayInput'
import Tooltip from '@/components/loginAndRegister/toolTip'
import { storeNameValidate, emailValidate } from '@/utils/validate'
import { forgetEmailpassword } from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert.js'
export default {
  name: 'ForgetEmailPassword',
  components: {
    CircleButton,
    Grayinput,
    Tooltip
  },
  data () {
    return {
      // 变量
      message: '',
      email: '',
      shopname: '',
      // ui
      tooltipVisible: false,
      // data
      bgImg: require('@/assets/loginAndRegister/forImg.png')
    }
  },
  methods: {
    preventDefault () {
      return false
    },
    async submit () {
      if (this.email === '') {
        this.message = this.$t('lang.validate.text2')
        this.tooltipVisible = true
        setTimeout(() => {
          this.tooltipVisible = false
        }, 2000)
        return
      }
      if (!emailValidate(this.email)) {
        this.message = this.$t('lang.validate.text3')
        this.tooltipVisible = true
        setTimeout(() => {
          this.tooltipVisible = false
        }, 2000)
        return
      }
      if (!storeNameValidate(this.shopname)) {
        this.message = this.$t('lang.validate.text16')
        this.tooltipVisible = true
        setTimeout(() => {
          this.tooltipVisible = false
        }, 2000)
        return
      }
      let res = await forgetEmailpassword({ Email: this.email, Shopname: this.shopname })
      messageAlert(res)
    },
    back () {
      this.$router.push({
        path: '/loginAndRegister/ALogin'
      })
    }
  },
  created () {
    document.onkeydown = () => {
      // 登陆键盘事件
      const key = window.event.keyCode
      if (key === 13) {
        this.submit()
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 25.65625rem;
  height: 16.25rem;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  left: calc(50% - 12.8125rem);
  top: 20vh;
  .c-img {
    width: 12.15rem;
    height: 16.25rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .c-left {
    height: 16.25rem;
    background-color: #fff;
    flex-grow: 1;
    padding: 0 1.25rem;
    h4 {
      margin-top: 2.375rem;
      font-size: 0.9375rem;
      text-align: center;
      font-weight: 400;
      word-spacing: 2px;
      letter-spacing: 3px;
    }
    .c-inputs {
      position: relative;
      label {
        margin-bottom: 0.25rem;
        display: inline-block;
      }
      .c-email {
        margin-bottom: 1.0625rem;
      }
      .c-shopname {
        margin-bottom: 1.0625rem;
      }
    }
    .c-button {
      margin-bottom: 1.0625rem;
    }
    .c-back {
      text-align: right;
      font-size: 0.6875rem;
      cursor: pointer;
      color: #4267b2;
      .back {
        .el-icon-arrow-right {
          font-size: 0.8rem;
          position: relative;
          top: 0.05rem;
        }
      }
    }
  }
}
</style>
