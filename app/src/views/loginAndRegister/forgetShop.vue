<template>
    <div>
        <div class="next-box">
            <p class="next-title">{{$t('lang.forShop.title')}}</p>
            <p class="next-tishi-title">{{$t('lang.forShop.text')}}</p>
            <form>
                <div class="input-box">
                    <input type="text" class="pwdInput" :placeholder="$t('lang.forShop.inputTishi')"
                           v-model="forgetEmail" ref="emailReg">
                </div>
                <transition name="fade">
                    <div class="tishi-box" v-if="regHide">
                        <div class="ts-box">
                            <p class="tishi-text" :v-model="hint">{{hint}}</p>
                        </div>
                    </div>
                </transition>
                <button
                        class="nexBtn"
                        v-preventReClick="2000"
                        @click="nextStep" ref="nextBtn"
                        :data-msg1="$t('lang.forShop.hint.text1')"
                        :data-msg2="$t('lang.forShop.hint.text2')"
                        :data-msg3="$t('lang.forShop.hint.text3')"
                        :data-msg4="$t('lang.forShop.hint.text4')"
                >{{$t('lang.forShop.btn')}}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { ForShop } from '../../common/api/api'
export default {
  name: 'ForgetShop',
  data () {
    return {
      hint: '', // 提示
      setInterName: null, // 定时器
      forgetEmail: '', // 忘记email
      regHide: false
    }
  },
  methods: {
    nextStep (e) {
      let msg1 = e.target.dataset.msg1
      let msg2 = e.target.dataset.msg2
      let msg3 = e.target.dataset.msg3
      // let msg4 = e.target.dataset.msg4
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.forgetEmail === '') {
        this.regHide = true
        this.hint = msg1
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
        // clearInterval(this.setInterName)
      } else if (!reg.test(this.$refs.emailReg.value)) {
        this.regHide = true
        this.hint = msg2
        this.setInterName = setInterval(() => {
          this.regHide = false
          clearInterval(this.setInterName)
        }, 2000)
      } else {
        ForShop({
          Email: this.forgetEmail
        }).then(resp => {
          console.log(resp)
          if (resp.data.code === 1) {
            this.regHide = true
            this.hint = msg3
            this.setInterName = setInterval(() => {
              clearInterval(this.setInterName)
              this.regHide = false
            }, 2000)
          }
          if (resp.data.code === 0) {
            this.regHide = true
            this.hint = resp.data.msg
            this.setInterName = setInterval(() => {
              clearInterval(this.setInterName)
              this.regHide = false
            }, 2000)
          }
        }).catch(err => {
          if (err) {
            this.$message.error('服务器错误')
          }
        })
      }
    }
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
    }

    .next-title {
        font-size: 46px;
        letter-spacing: 2px;
        color: black;
        margin: auto auto 4px auto;
    }

    .next-tishi-title {
        font-size: 28px;
        color: rgba(102, 102, 102, 1);
        margin: 8px auto auto auto;
    }

    .tishi-box {
        position: absolute;
        width: 300px;
        height: 160px;
        color: black;
        line-height: 160px;
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
