<template>
  <div class="forgetShop-box">
    <div class="forgetShop-form">
      <p class="forgetShop-title">{{$t('lang.restPwd.title')}}</p>
      <form @submit.prevent="onSubmit" class="Form">
        <div class="confirmPass">
          <label for="newPass">{{$t('lang.restPwd.text1')}}</label>
          <br />
          <input
            id="newPass"
            :type="pwdType"
            ref="newPassword"
            class="forgetShop-input"
            maxlength="20"
            v-model="restInput"
          />
          <img :src="openeye" alt @click="changeType()" class="passwordImg" />
        </div>
        <div class="confirmPass">
          <label for="confirmPassword">{{$t('lang.restPwd.text3')}}</label>
          <br />
          <input
            id="confirmPassword"
            :type="conPwdType"
            v-model="regPwd"
            class="forgetShop-input"
            maxlength="20"
            ref="conPassword"
          />
          <img :src="conOpeneye" alt @click="confirmType()" class="passwordImg" />
          <br />
        </div>
        <br />
        <button
          class="forgetShop-btn"
          type="submit"
          @click="resetPwd"
          ref="nextBtn"
          v-preventReClick="2000"
          :data-msg1="$t('lang.restPwd.hint.text1')"
          :data-msg2="$t('lang.restPwd.hint.text2')"
          :data-msg3="$t('lang.restPwd.hint.text3')"
          :data-msg4="$t('lang.restPwd.hint.text4')"
          :data-msg5="$t('lang.restPwd.hint.text5')"
        >{{$t('lang.restPwd.btn')}}</button>
      </form>
      <transition name="fade">
        <div class="forgetShop-tishi" v-if="regHide">
          <div class="forTishi">
            <p class="tishi-text" :v-model="hint">{{hint}}</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="resImg-box">
      <img class="forImg" src="../../assets/loginAndRegister/forImg.png" alt />
    </div>
  </div>
</template>

<script>
import { hexSha1 } from '../../utils/encryption'
import { ResetPwd } from '../../common/api/api'

export default {
  name: 'index',
  data () {
    return {
      pwdType: 'password', // 密码类型
      openeye: require('../../assets/loginAndRegister/closeEyes@2x.png'), // 图片地址
      conPwdType: 'password', // 确认密码的密码类型
      conOpeneye: require('../../assets/loginAndRegister/closeEyes@2x.png'),
      restInput: '', // 新密码输入
      hint: '', // 提示
      setInterName: null, // 定时器
      Email: '',
      Shopname: '',
      regPwd: '',
      regHide: false
    }
  },
  methods: {
    // 切换显示隐藏密码
    changeType () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      this.openeye =
        this.openeye ===
        require('../../assets/loginAndRegister/closeEyes@2x.png')
          ? require('../../assets/loginAndRegister/eyes@2x@2x.png')
          : require('../../assets/loginAndRegister/closeEyes@2x.png')
    },
    // 切换显示隐藏密码
    confirmType () {
      this.conPwdType = this.conPwdType === 'password' ? 'text' : 'password'
      this.conOpeneye =
        this.conOpeneye ===
        require('../../assets/loginAndRegister/closeEyes@2x.png')
          ? require('../../assets/loginAndRegister/eyes@2x@2x.png')
          : require('../../assets/loginAndRegister/closeEyes@2x.png')
    },
    // 重置密码的but方法
    onSubmit () {
      return false
    },
    // 重置密码提交按钮
    resetPwd (e) {
      let msg1 = e.target.dataset.msg1
      let msg2 = e.target.dataset.msg2
      let msg3 = e.target.dataset.msg3
      let msg4 = e.target.dataset.msg4
      // let msg5 = e.target.dataset.msg4
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (this.restInput === '') {
        this.regHide = true
        this.hint = msg1
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
      } else if (!reg.test(this.$refs.newPassword.value)) {
        this.regHide = true
        this.hint = msg2
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
      } else if (
        this.$refs.newPassword.value !== this.$refs.conPassword.value
      ) {
        this.regHide = true
        this.hint = msg3
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 1500)
      } else {
        ResetPwd({
          Email: this.Email,
          Shopname: this.Shopname,
          Passwd: hexSha1(this.regPwd)
        }).then(resp => {
          if (resp.data.code === 1) {
            this.regHide = true
            this.hint = msg4
            setTimeout(() => {
              this.regHide = false
              this.$router.push({
                path: '/loginAndRegister/ALogin'
              })
            }, 3000)
          }
          if (resp.data.code === 0) {
            this.regHide = true
            this.hint = resp.data.msg
            this.setInterName = setInterval(() => {
              this.regHide = false
              clearInterval(this.setInterName)
            }, 2000)
          }
        })
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.setInterName)
  },
  created () {
    this.Email = this.$route.query.Email
    this.Shopname = this.$route.query.Shopname
  }
}
</script>

<style scoped>
.forgetShop-box {
  width: 25.65625rem;
  height: 16.25rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}

.forgetShop-form {
  width: 13.5rem;
  height: 16.1875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.forgetShop-title {
  font-size: 0.9375rem;
  color: black;
  text-align: center;
  margin-bottom: 1.40625rem;
}

.forgetShop-input {
  width: 10.3125rem;
  height: 0.9375rem;
  padding: 0.3125rem;
  background-color: #f4f4f4;
  border: 1px solid #dcdcdc;
  margin: 0.1875rem auto 0.1875rem auto;
  outline: none;
}

.forgetShop-btn {
  width: 10.9375rem;
  height: 1.6875rem;
  background: #4267b2;
  border-radius: 26px;
  border: none;
  color: white;
  outline: none;
  cursor: pointer;
  margin: auto auto 0.625rem auto;
}

.passTishi {
  font-size: 12px;
}

.confirmPass {
  margin-bottom: 0.625rem;
  position: relative;
  width: 10.625rem;
}

.passwordImg {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 1.4625rem;
  width: 0.625rem;
  height: 0.5rem;
}

.forgetShop-tishi {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.66);
  color: white;
  width: 7.5rem;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.4s linear;
  letter-spacing: 2px;
  height: auto;
  overflow: hidden;
  line-height: 0.8125rem;
}
.forTishi {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tishi-text {
  padding: 8px;
  text-align: center;
}

.forImg {
  width: 100%;
  height: 100%;
}

.resImg-box {
  width: 12.15625rem;
  height: 16.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
