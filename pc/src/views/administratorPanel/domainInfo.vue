<template>
  <div class="c-add-domain">
    <div class="c-content">
      <div class="c-text">
        <span>{{$t('lang.domainInfo.text1')}}</span>
        <span @click="back" class="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.domainInfo.text2')}}
        </span>
      </div>
      <div class="c-boxs" v-loading="loadingVisible">
        <div class="c-box" v-for="(item,index) in domainInfoList" :key="index">
          <!-- 添加域名按钮 -->
          <router-link
            class="add-domain"
            v-if="index===0"
            to="addDomain"
          >{{$t('lang.domainInfo.text11')}}</router-link>
          <p class="text title" v-if="index===0">{{$t('lang.domainInfo.text3')}}</p>
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
            <div class="left">
              <span>{{$t('lang.domainInfo.text6')}}</span>&nbsp;&nbsp;&nbsp;
              <span>{{item.create_time}}</span>
            </div>
            <router-link
              :to="{path:$t('lang.domainInfo.text7.href'),query:{id:item.id,default:item.default}}"
            >{{$t('lang.domainInfo.text7.title')}}</router-link>
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
  data() {
    return {
      domainInfoList: null,
      // ui
      loadingVisible: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  async created() {
    let res = await showDmain()
    this.loadingVisible = false
    this.domainInfoList = res.data.data
    console.log(this.domainInfoList)
    this.domainInfoList.forEach(item => {
      let date = new Date(item.create_time * 1000)
      item.create_time = getDateFormat(date)
      let mydate = item.create_time.split(':')[0].split(' ')[0]
      let hour = item.create_time.split(':')[0].split(' ')[1]
      let mins = item.create_time.split(':')[1]
      let seconds = item.create_time.split(':')[2]
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
  .c-content {
    max-width: 850px;
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
    .c-boxs {
      min-height: 260px;
      .add-domain {
        position: absolute;
        right: 28px;
        top: 45px;
        font-size: 18px;
        color: #4267b2;
        cursor: pointer;
      }
      .c-box {
        padding-bottom: 20px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(213, 213, 213, 1);
        box-shadow: 0px 8px 8px 1px rgba(0, 0, 0, 0.03);
        border-radius: 8px;
        position: relative;
        .text {
          padding-left: 37px;
        }
        .title {
          color: rgba(0, 0, 0, 1);
          font-size: 26px;
          margin-top: 37px;
          margin-bottom: 35px;
        }
        .domain {
          margin-bottom: 35px;
          span:first-child {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
          }
          span:nth-child(2) {
            color: rgba(102, 102, 102, 1);
            font-size: 18px;
          }
        }
        .state {
          margin-bottom: 35px;
          font-size: 20px;
          span:first-child {
            color: rgba(51, 51, 51, 1);
          }
          span:nth-child(2) {
            color: rgba(102, 102, 102, 1);
          }
        }
        .time {
          display: flex;
          justify-content: space-between;
          padding-right: 28px;
          .left span:first-child {
            font-size: 20px;
            color: rgba(51, 51, 51, 1);
          }
          .left span:nth-child(2) {
            color: rgba(102, 102, 102, 1);
            font-size: 18px;
          }
          a {
            font-size: 18px;
            color: #4267b2;
          }
        }
      }
    }
  }
}
</style>
