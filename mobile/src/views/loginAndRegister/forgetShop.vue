<template>
      <div class="forgetShop-box">
         <div class="forgetShop-form">
            <p class="forgetShop-title">{{$t('lang.forShop.title')}}</p>
            <form @submit.prevent="onSubmit">
              <div>
                <label for="business">{{$t('lang.forShop.text')}}</label>
                <br>
                <input id="business" type="text" :placeholder="$t('lang.forShop.inputTishi')" ref="emailReg"
                       class="forgetShop-input" v-model="forgetEmail" />
              </div>
               <button class="forgetShop-btn"
                       v-preventReClick="2000"
                       @click="nextStep"
                       ref="nextBtn"
                       :data-msg1="$t('lang.forShop.hint.text1')"
                       :data-msg2="$t('lang.forShop.hint.text2')"
                       :data-msg3="$t('lang.forShop.hint.text3')"
                       :data-msg4="$t('lang.forShop.hint.text4')"
               >{{$t('lang.forShop.btn')}}
               </button>
            </form>
            <p class="forgetShop-black" @click="getBack">
              <span class="el-icon-arrow-left"></span>
              {{$t('lang.forShop.back')}}
            </p>
            <transition name="fade">
               <div class="register-tishi" v-if="regHide">
                  <p class="tishi-text" :v-model="hint">{{hint}}</p>
               </div>
            </transition>
         </div>
      </div>
</template>

<script>
import { ForShop } from '../../common/api/api'

export default {
  name: 'forgetShop',
  data () {
    return {
      hint: '', // 提示
      forgetEmail: '',
      setInterName: '', // 定时器
      regHide: false
    }
  },
  methods: {
    onSubmit () {
      return false
    },
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
          if (resp.data.code === 1) {
            this.$refs.nextBtn.style.backgroundColor = '#6F8CC5'
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
    },
    getBack () {
      this.$router.push({ path: '/loginAndRegister/Alogin', query: { stage: '1123' } })
    }
  }
}
</script>

<style scoped lang="less">
  .forgetShop-box {
    padding: 0 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .forgetShop-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    form{
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
  .forgetShop-title {
    font-size: 0.9375rem;
    text-align: center;
    margin: 70px auto 50px auto;
  }
  .forgetShop-input {
    width: 280px;
    height: 20px;
    padding: 0.3125rem;
    background-color: #f4f4f4;
    border: 1px solid #dcdcdc;
    margin:  0.25rem auto auto auto;
    outline: none;
  }
  .forgetShop-btn {
    width: 280px;
    height: 46px;
    background: #4267b2;
    border-radius: 0.8125rem;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    margin: 56px auto 0.625rem auto;
  }
  .forgetShop-black {
    text-align: center;
    color: #4267B2;
    font-size: 0.6875rem;
    cursor: pointer;
  }
  .register-tishi {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.59);
    color: white;
    width: 6.875rem;
    font-size: 0.4375rem;
    border-radius: 0.1875rem;
    letter-spacing: 0.0625rem;
    text-align: center;
    height: auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .forImg {
    width: 100%;
    height: 100%;
  }
  .forImg-box {
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
