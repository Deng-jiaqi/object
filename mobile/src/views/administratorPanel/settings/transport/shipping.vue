<template>
  <div class="c-transport-shipping">
    <div class="c-top">
      <span @click='back' class="iconfont icon-fanhui1"></span>
      <span class="title">{{$t('lang.transportOfShipping.text1')}}</span>
    </div>
    <div class="c-tip">{{$t('lang.transportOfShipping.text3')}}</div>
    <div class="c-btm">
      <div class="left">
        <p class="text1">{{$t('lang.transportOfShipping.text4')}}</p>
        <p class="text2">{{$t('lang.transportOfShipping.text5')}}</p>
      </div>
      <div class="right">
        <div class="sp-between title-transportation-information">
          <span>{{$t('lang.transportOfShipping.text6')}}</span>
          <router-link
            :to="{path:'/administratorPanel/settings/transport/createTransportData'}"
          >{{$t('lang.transportOfShipping.text7')}}</router-link>
        </div>
        <div class="c-informations" v-loading="TransportListVisible">
          <div class="information" v-for="(item,index) in TransportList" :key="index">
            <div class="first-line sp-between">
              <span>
                {{item.disName}}
                <span
                  v-show="item.default===1"
                  class="default-tip"
                >{{$t('lang.transportOfShipping.text8')}}</span>
              </span>
              <router-link
                :to="{path:'/administratorPanel/settings/transport/managementFeeRate',query:{id:item.id}}"
              >{{$t('lang.transportOfShipping.text9')}}</router-link>
            </div>
            <div class="second-line">
              <span v-show="item.default===1">{{$t('lang.transportOfShipping.text10')}}</span>
              <span
                v-show="item.default!==1"
              >{{item.productCount}} {{item.productCount>1?$t('lang.transportOfShipping.text12'):$t('lang.transportOfShipping.text11')}}</span>
            </div>
            <div class="three-line">{{$t('lang.transportOfShipping.text13')}}</div>
            <ul v-show="item.rateName.length>0" class="four-line">
              <li v-for="(itemTwo,indexTwo) in item.rateName" :key="indexTwo">
                <img src="../../../../assets/administratorPanel/setting/area.svg" alt />
                <span>{{itemTwo}}</span>
              </li>
            </ul>
            <div
              v-show="!item.rateName.length>0"
              class="five-line"
            >{{$t('lang.transportOfShipping.text14')}}</div>
          </div>
          <div
            class="information-none"
            v-show="!TransportList.length>0"
          >{{$t('lang.transportOfShipping.text15')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTransportInformationList } from '@/common/api/api.js'
export default {
  data () {
    return {
      TransportList: [],
      // ui
      TransportListVisible: false
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  async created () {
    this.TransportListVisible = true
    let res = await getTransportInformationList()
    console.log(res)
    this.TransportListVisible = false
    this.TransportList = res.data.data
  }
}
</script>
<style lang="less" scoped>
.c-transport-shipping {
  padding-top: 32px;
  padding-bottom: 32px;
  .c-top {
    margin-bottom: 15px;
    padding-right: 15px;
    .icon-fanhui1 {
      font-size: 20px;
      margin-right: 15px;
      margin-left: 5px;
      cursor: pointer;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }
  .c-tip {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    padding: 30px 15px 30px 15px;
  }
  .c-btm {
    .left {
      padding-left: 15px;
      padding-right: 15px;
      margin-top: 20px;
      margin-bottom: 20px;
      .text1 {
        word-spacing: 1px;
        font-size: 18px;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 17px;
        word-spacing: 1px;
        letter-spacing: 1px;
      }
      .text2 {
        font-size: 16px;
        color: rgba(137, 137, 137, 1);
        word-spacing: 1px;
        letter-spacing: 1px;
      }
    }
    .right {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      border-left: none;
      border-right: none;
      a {
        font-size: 16px;
        color: rgba(66, 103, 178, 1);
      }
      .sp-between {
        display: flex;
        justify-content: space-between;
      }
      .title-transportation-information {
        padding: 30px 15px 30px 15px;
        padding-bottom: 10px;
        span {
          font-size: 18px;
          color: rgba(0, 0, 0, 1);
        }
      }
      .c-informations {
        min-height: 87px;
        .information-none {
          color: #333333;
          height: 87px;
          display: flex;
          text-align: center;
          justify-content: center;
          align-items: center;
          background-color: #f5f6f8;
          margin: auto;
          width: calc(100% - 59px);
        }
        .information {
          border-bottom: 1px solid rgba(220, 220, 220, 1);
          padding: 30px 15px 30px 15px;
          padding-top: 20px;
          .first-line {
            margin-bottom: 16px;
            span {
              font-size: 16px;
              color: rgba(0, 0, 0, 1);
              position: relative;
            }
            .default-tip {
              background-color: #dfe3e8;
              color: #454f5b;
              display: inline-block;
              margin-left: 10px;
              padding: 5px 15px 5px 15px;
              border-radius: 40%;
              font-size: 14px;
            }
          }
          .second-line {
            margin-bottom: 28px;
            font-size: 16px;
            color: rgba(137, 137, 137, 1);
          }
          .three-line {
            font-size: 16px;
            margin-bottom: 17px;
            color: rgba(0, 0, 0, 1);
          }
          .four-line {
            font-size: 16px;
            color: rgba(137, 137, 137, 1);
            margin-bottom: 30px;
            img {
              width: 19px;
              height: 19px;
              margin-right: 5px;
            }
            li {
              display: flex;
              align-items: center;
              margin-top: 10px;
            }
          }
          .five-line {
            font-size: 16px;
            margin-bottom: 22px;
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
