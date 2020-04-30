<template>
  <div class="c-customize-domain">
    <div class="c-content">
      <div class="c-text">
        <span>{{$t('lang.customizeDomain.text1')}}</span>
        <span @click="back" class="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.customizeDomain.text2')}}
        </span>
      </div>
      <div class="c-box">
        <p class="title">{{$t('lang.customizeDomain.text3')}}</p>
        <input
          type="text"
          :placeholder="$t('lang.customizeDomain.text4')"
          class="customize"
          v-model="customizeDomain"
        />
        <span class="customize-span" v-show='+$route.query.default===1'>.edgelessstore.com</span>
        <div class="c-btn">
          <el-button type="primary" @click="editDmain">{{$t('lang.customizeDomain.text5')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { editDmain } from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
export default {
  name: 'customizeDomain',
  data () {
    return {
      //   变量
      id: null,
      customizeDomain: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async editDmain () {
      let domain
      let regx = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      if (+this.$route.query.isdefault === 1) {
        domain = this.customizeDomain + '.edgelessstore.com'
        if (!regx.test(domain)) {
          this.$message.error(this.$t('lang.customizeDomain.text5'))
          return
        }
      } else {
        domain = this.customizeDomain
        if (!regx.test(domain)) {
          this.$message.error(this.$t('lang.customizeDomain.text6'))
          return
        }
      }
      let res = await editDmain({
        id: this.id,
        name: this.customizeDomain,
        status: 1
      })
      console.log(res)
      messageAlert(res)
      if (res.data.code === 1) {
        setTimeout(() => {
          this.$router.push({ path: '/administratorPanel/domainInfo' })
        }, 2000)
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    console.log(this.id)
  }
}
</script>

<style scoped lang='less'>
.c-customize-domain {
  .c-content {
    max-width: 814px;
    margin: auto;
    .c-text {
      margin-top: 97px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      span {
        color: rgba(0, 0, 0, 1);
        font-size: 28px;
      }
      .back {
        color: #4267b2;
        font-size: 18px;
        line-height: 32px;
        cursor: pointer;
        .icon-fanhui1 {
          font-size: 14px;
          color: #4267b2;
        }
      }
    }
    .c-box {
      padding-bottom: 20px;
      padding-left: 84px;
      padding-right: 84px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(213, 213, 213, 1);
      box-shadow: 0px 8px 8px 1px rgba(0, 0, 0, 0.03);
      border-radius: 8px;
      .title {
        margin-top: 40px;
        font-size: 24px;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 18px;
      }
      .customize {
        // width: calc(100% - 15px);
        width: 50%;
        height: 50px;
        outline: none;
        background: rgba(244, 244, 244, 1);
        border: 1px solid rgba(253, 194, 88, 1);
        border-radius: 4px;
        padding-left: 15px;
      }
      .customize-span {
        font-size: 20px;
        margin-left: 20px;
      }
      .c-btn {
        text-align: right;
        margin-top: 20px;
      }
    }
  }
}
</style>
