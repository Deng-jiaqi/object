<template>
  <div class="c-add-domain">
    <div class="c-content">
      <div class="c-text">
        <span @click="back" class="iconfont icon-fanhui1"></span>
        <span class="title">{{$t('lang.domainInfo.text1')}}</span>
      </div>
      <div class="c-boxs" v-loading="loadingVisible">
        <div class="c-box" v-for="(item,index) in domainInfoList" :key="index">
          <!-- 添加域名按钮 -->
          <p class="text title">
            <span class="left">{{$t('lang.domainInfo.text3')}}</span>
            <span class="right">
              <router-link
                class="add-domain"
                v-if="index===0"
                to="addDomain"
              >{{$t('lang.domainInfo.text11')}}</router-link>
              <router-link
                :to="{path:$t('lang.domainInfo.text7.href'),query:{id:item.id}}"
              >{{$t('lang.domainInfo.text7.title')}}</router-link>
            </span>
          </p>
          <p class="text domain">
            <span>{{$t('lang.domainInfo.text4')}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{item.name}}</span>
          </p>
          <p class="text state">
            <span>{{$t('lang.domainInfo.text5')}}</span>&nbsp;&nbsp;&nbsp;
            <span v-show="item.status===-1">{{$t('lang.domainInfo.text8')}}</span>
            <span v-show="item.status===0">{{$t('lang.domainInfo.text9')}}</span>
            <span v-show="item.status===1">{{$t('lang.domainInfo.text10')}}</span>
          </p>
          <div class="text time">
            <span>{{$t('lang.domainInfo.text6')}}</span>&nbsp;&nbsp;&nbsp;
            <span>{{item.create_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showDmain } from '@/common/api/api.js'
import { getDateFormat } from '@/utils/timeTransformation.js'
export default {
  name: 'DomainInfo',
  data () {
    return {
      domainInfoList: null,
      // ui
      loadingVisible: true
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  async created () {
    let res = await showDmain()
    this.loadingVisible = false
    console.log(res)
    this.domainInfoList = res.data.data
    this.domainInfoList.forEach(item => {
      let date = new Date(item.create_time * 1000)
      item.create_time = getDateFormat(date)
      console.log(item.create_time.split(':')[0].split(' '))
      let mydate = item.create_time.split(':')[0].split(' ')[0]
      let hour = item.create_time.split(':')[0].split(' ')[1]
      let mins = item.create_time.split(':')[1]
      let seconds = item.create_time.split(':')[2]
      console.log(mydate, hour, mins, seconds)
      if (hour.length === 1) {
        hour = '0' + hour
      }
      if (mins.length === 1) {
        mins = '0' + mins
      }
      if (seconds.length === 1) {
        seconds = '0' + seconds
      }
      item.create_time = mydate + ' ' + hour + ':' + mins + ':' + seconds
    })
  }
}
</script>

<style scoped lang='less'>
.c-add-domain {
  padding-top: 32px;
  .c-content {
    margin: auto;
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
    .c-boxs {
      min-height: 260px;
      .add-domain {
        font-size: 18px;
        color: #4267b2;
        cursor: pointer;
        margin-right: 15px;
      }
      .c-box {
        position: relative;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(213, 213, 213, 1);
        border-left: none;
        border-right: none;
        box-shadow: 0px 8px 8px 1px rgba(0, 0, 0, 0.03);
        padding-top: 20px;
        padding-bottom: 20px;
        .text {
          padding-left: 15px;
          padding-right: 15px;
        }
        .title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .left {
            color: rgba(0, 0, 0, 1);
            font-size: 18px;
          }
          a {
            font-size: 18px;
            color: #4267b2;
          }
        }
        .domain {
          margin-bottom: 20px;
          span:first-child {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
          }
          span:nth-child(2) {
            color: rgba(102, 102, 102, 1);
            font-size: 18px;
          }
        }
        .state {
          margin-bottom: 20px;
          font-size: 18px;
          span:first-child {
            color: rgba(51, 51, 51, 1);
          }
          span:nth-child(2) {
            color: rgba(102, 102, 102, 1);
          }
        }
        .time {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
