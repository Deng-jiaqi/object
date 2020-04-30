<template>
    <div>
        <div class="next-box">
            <p class="next-title">{{$t('lang.restPwd.title')}}</p>
            <form>
                <div class="input-box">
                    <input :type="pwdType" class="pwdInput" :placeholder="$t('lang.restPwd.text1')" v-model="restInput"
                           ref="newPassword">
                    <img :src="openeye" alt="" @click="changeType()" class="passwordImg">
                </div>
                <p class="pwd-tishi">{{$t('lang.restPwd.text2')}}</p>
                <div class="input-box">
                    <input :type="conPwdType" class="pwdInput" :placeholder="$t('lang.restPwd.text3')" v-model="regPwd"
                           ref="conPassword">
                    <img :src="conOpeneye" alt="" @click="confirmType()" class="passwordImg">
                </div>
                <transition name="fade">
                    <div class="tishi-box" v-if="regHide">
                        <div class="ts-box">
                            <p class="tishi-text" :v-model="hint">{{hint}}</p>
                        </div>
                    </div>
                </transition>
                <button class="nexBtn"
                        @click="resetPwd"
                        ref="nextBtn"
                        v-preventReClick="2000"
                        :data-msg1="$t('lang.restPwd.hint.text1')"
                        :data-msg2="$t('lang.restPwd.hint.text2')"
                        :data-msg3="$t('lang.restPwd.hint.text3')"
                        :data-msg4="$t('lang.restPwd.hint.text4')"
                        :data-msg5="$t('lang.restPwd.hint.text5')"
                >{{$t('lang.restPwd.btn')}}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { hexSha1 } from '../../utils/encryption'
import { ResetPwd } from '../../common/api/api'

export default {
  name: 'resetPassword',
  data () {
    return {
      openeye: require('../../assets/loginRegister/zhengyan.png'), // 图片地址
      conOpeneye: require('../../assets/loginRegister/zhengyan.png'),
      pwdType: 'text', // 密码类型
      conPwdType: 'text', // 确认密码的密码类型
      hint: '', // 提示
      setInterName: null, // 定时器
      restInput: '', // 新密码输入
      regPwd: '', // 确认密码
      Email: '',
      Shopname: '',
      regHide: false
    }
  },
  methods: {
    // 切换显示隐藏密码
    changeType () {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      this.openeye = this.openeye === require('../../assets/loginRegister/zhengyan.png') ? require('../../assets/loginRegister/biyan.png') : require('../../assets/loginRegister/zhengyan.png')
    },
    // 切换显示隐藏密码
    confirmType () {
      this.conPwdType = this.conPwdType === 'password' ? 'text' : 'password'
      this.conOpeneye = this.conOpeneye === require('../../assets/loginRegister/zhengyan.png') ? require('../../assets/loginRegister/biyan.png') : require('../../assets/loginRegister/zhengyan.png')
    },
    // 重置密码提交按钮
    resetPwd (e) {
      let msg1 = e.target.dataset.msg1
      let msg2 = e.target.dataset.msg2
      let msg3 = e.target.dataset.msg3
      let msg4 = e.target.dataset.msg4
      let msg5 = e.target.dataset.msg4
      let reg = /^[a-zA-Z]\w{5,17}$/
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
        }, 1500)
      } else if (this.$refs.newPassword.value !== this.$refs.conPassword.value) {
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
          console.log(resp)
          if (resp.data.code === 1) {
            this.regHide = true
            this.hint = msg4
            this.setInterName = setInterval(() => {
              this.$router.push({ path: '/loginAndRegister/ELoginOfPassword', query: { stage: '1123' } })
            }, 3000)
          }
          if (resp.data.code === 0) {
            this.regHide = true
            this.hint = msg5
            this.setInterName = setInterval(() => {
              this.regHide = false
              clearInterval(this.setInterName)
            }, 2000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  created () {
    this.Email = this.$route.query.Email
    this.Shopname = this.$route.query.Shopname
  }
}
</script>

<style scoped>
    .next-box {
        width: 80%;
        margin: 94px auto 250px auto;
        text-align: center;
        position: relative;
    }

    .nexBtn {
        width: 560px;
        height: 92px;
        background: rgba(253, 208, 127, 1);
        box-shadow: 0px 30px 60px 0px rgba(255, 204, 111, 0.65);
        border-radius: 46px;
        color: white;
        outline: none;
        border: 0;
        cursor: pointer;
        margin-top: 80px;
    }

    .pwdInput {
        width: 530px;
        height: 25px;
        outline: none;
        border: none;
        font-size: 16px;
    }

    .input-box {
        width: 560px;
        height: 58px;
        margin-top: 100px;
        border: 2px solid rgba(240, 224, 196, 1);
        border-style: none none solid none;
        position: relative;
    }

    .next-title {
        font-size: 46px;
        color: black;
    }

    .pwd-tishi {
        font-size: 16px;
        color: rgba(181, 180, 180, 1);
        text-align: left;
    }

    .passwordImg {
        position: absolute;
        right: 0;
        width: 27px;
        height: 19px;
        top: 15px;
    }

    .tishi-box {
        position: absolute;
        width: 300px;
        height: 160px;
        color: black;
        background: rgba(255, 255, 255, 1);
        border: 2px solid rgba(253, 208, 127, 1);
        border-radius: 6px;
        left: 0;
        top: -22%;
        bottom: 0;
        right: 0;
        opacity: 0.7;
        margin: auto;
    }

    .tishi-text {
        font-size: 18px;
        text-align: center;
    }

    .ts-box {
        width: 300px;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
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
