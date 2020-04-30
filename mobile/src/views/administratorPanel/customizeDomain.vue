<template>
  <div class="c-customize-domain">
    <div class="c-content">
          <div class="c-text">
            <span @click="back" class="iconfont icon-fanhui1"></span>
            <span class="title">{{$t('lang.customizeDomain.text1')}}</span>
          </div>
          <div class="c-box">
            <p class="title">{{$t('lang.customizeDomain.text3')}}</p>
            <input
              type="text"
              :placeholder="$t('lang.customizeDomain.text4')"
              class="customize"
              v-model="customizeDomain"
            />
            <div class="c-btn">
              <el-button type='primary' @click="editDmain">{{$t('lang.customizeDomain.text5')}}</el-button>
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
  padding-top: 32px;
  .c-content {
    .c-text {
     margin-bottom: 24px;
      padding-right: 15px;
      .title {
        color: rgba(0, 0, 0, 1);
        font-size: 18px;
        font-weight: bold;
      }
      .icon-fanhui1 {
        font-size: 20px;
        margin-right: 15px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
    .c-box {
      padding: 20px 15px 20px 15px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(213, 213, 213, 1);
      border-left: none;
      border-right: none;
      box-shadow: 0px 8px 8px 1px rgba(0, 0, 0, 0.03);
      .title {
        font-size: 20px;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 18px;
      }
      .customize {
        width: calc(100% - 18px);
        height: 50px;
        outline: none;
        background: rgba(244, 244, 244, 1);
        border: 1px solid rgba(253, 194, 88, 1);
        border-radius: 4px;
        padding-left: 15px;
      }
      .c-btn {
        text-align: right;
        margin-top: 20px;
      }
    }
  }
}
p {
  margin:0;
}
</style>
