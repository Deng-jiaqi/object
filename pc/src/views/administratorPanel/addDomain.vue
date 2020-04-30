<template>
  <div class="c-add-domain">
    <div class="c-content">
      <div class="c-text">
        <span>{{$t('lang.addDomain.text1')}}</span>
        <span @click="back" class="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.addDomain.text2')}}
        </span>
      </div>
      <div class="c-box">
        <p class="title">{{$t('lang.addDomain.text3')}}</p>
        <input
          type="text"
          placeholder="e.g.example.com"
          class="add-domain-input"
          v-model="newDomain"
        />
        <div class="c-btn">
          <el-button type="primary" @click="editDmain">{{$t('lang.addDomain.text4')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { editDmain } from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
export default {
  name: 'addDomain',
  data () {
    return {
      //   变量
      newDomain: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async editDmain () {
      let regx = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      if (!regx.test(this.newDomain)) {
        this.$message.error(this.$t('lang.addDomain.text5'))
        return
      }
      let res = await editDmain({
        name: this.newDomain,
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

  }
}
</script>
<style scoped lang='less'>
.c-add-domain {
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
      .add-domain-input {
        // width: calc(100% - 15px);
        width: 50%;
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
</style>
