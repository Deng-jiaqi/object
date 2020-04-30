<template>
    <div>
        <div class="next-box">
            <p class="next-title">{{$t('lang.registerPwd.title')}}</p>
            <form class="form">
                <div class="input-box">
                    <input type="text" class="pwdInput" :placeholder="$t('lang.registerPwd.inputTishi')"
                           v-model="regEmail" ref="emailReg">
                </div>
                <transition name="fade">
                    <div class="tishi-box" v-if="regHide">
                        <div class="ts-box">
                            <p class="tishi-text" :v-model="hint">{{hint}}</p>
                        </div>
                    </div>
                </transition>
                <button class="nexBtn"
                        @click="nextStep($event)"
                        ref="nextBtn" v-preventReClick="2000"
                        :data-msg="$t('lang.registerPwd.hint.text1')"
                        :data-pwd6="$t('lang.registerPwd.hint.text2')"
                >{{$t('lang.registerPwd.btn')}}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { hexSha1 } from '../../utils/encryption'
import { NextPwd } from '../../common/api/api'
export default {
  name: 'AnextRegister',
  data () {
    return {
      hint: '', // 提示
      setInterName: null, // 定时器
      regEmail: '', // 输入店铺密码input
      Sellerid: '',
      Mailpwd: '',
      Email: '',
      Shopname: '',
      Passwd: '',
      regHide: false
    }
  },
  methods: {
    nextStep (e) {
      let msg = e.target.dataset.msg
      let pwd6 = e.target.dataset.pwd6
      let reg = /^[a-zA-Z]\w{5,17}$/
      if (this.regEmail === '') {
        this.regHide = true
        this.hint = msg
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
      } else if (!reg.test(this.$refs.emailReg.value)) {
        this.regHide = true
        this.hint = pwd6
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
      } else {
        NextPwd({
          Sellerid: this.Sellerid,
          Mailpwd: this.Mailpwd,
          Passwd: hexSha1(this.regEmail)
        }).then(resp => {
          if (resp.data.code === 1) {
            this.$router.push({
              name: '注册信息',
              params: {
                Passwd: hexSha1(this.regEmail),
                Mailpwd: this.Mailpwd,
                Email: this.Email,
                Shopname: this.Shopname
              }
            })
          }
          if (resp.data.code === 0) {
            this.regHide = true
            this.hint = resp.data.msg
            this.setInterName = setInterval(() => {
              this.regHide = false
              clearInterval(this.setInterName)
            }, 2000)
          }
          console.log(resp)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.setInterName)
  },
  created () {
    this.Shopname = this.$route.params.store
    this.Mailpwd = this.$route.params.password
    this.Email = this.$route.params.email
    console.log(this.$route.params)
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
        margin-top: 255px;
    }

    .input-box {
        width: 560px;
        height: 58px;
        margin-top: 100px;
        border: 2px solid rgba(240, 224, 196, 1);
        border-style: none none solid none;
    }

    .pwdInput {
        width: 530px;
        height: 25px;
        outline: none;
        border: none;
        font-size: 16px;
    }

    .next-title {
        font-size: 46px;
        color: black;
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
