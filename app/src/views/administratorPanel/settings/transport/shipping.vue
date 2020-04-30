<template>
  <div class="c-transport-shipping">
    <div class="c-top">
      <span class="title">发货</span>
      <span class="back" @click="back">
        <span class="iconfont icon-fanhui1"></span>返回
      </span>
    </div>
    <div class="c-tip">发货设置已更新，可在结账时支持管理运费的新方式。 了解详细信息或提供反馈。</div>
    <div class="c-btm">
      <div class="left">
        <p class="text1">结账时的费率</p>
        <p class="text2">在结账时选择发货位置和收取的运费。 若要对某些产品收取不同的费用，请创建运输资料。</p>
      </div>
      <div class="right">
        <div class="sp-between title-transportation-information">
          <span>运输资料</span>
          <router-link :to="{path:'/administratorPanel/settings/transport/createTransportData',query:{isdefault:
            TransportList.length>0?false:true  }}">创建新资料</router-link>
        </div>
        <div class="information" v-for="(item,index) in TransportList" :key='index'>
          <div class="first-line sp-between">
            <span>{{item.disName}}
               <span v-show='item.default===1' class="default-tip">默认</span>
            </span>
            <router-link :to="{path:'/administratorPanel/settings/transport/managementFeeRate',query:{id:item.id,isdefault:item.default===1?true:false}}">管理费率</router-link>
          </div>
          <div class="second-line">
            <span v-show='item.default===1'>未包含在其他资料中的所有产品</span>
            <span v-show='item.default!==1'>{{item.productCount}} 个产品</span>
          </div>
          <div class="three-line">以下项的费率</div>
          <ul v-show='item.rateName' class="four-line">
            <li v-for="(itemTwo,indexTwo) in item.rateName" :key='indexTwo'>
              <img src="../../../../assets/administratorPanel/setting/area.svg" alt="">
              <span>{{itemTwo}}</span>
            </li>
          </ul>
          <div v-show='!item.rateName' class="five-line">没有费率。在添加费率之前，客户将无法对此资料中的产品完成结帐。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      TransportList: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  async created () {
    let res = await this.ajax.get('http://192.168.5.108/tp5.0/public/basic/Transport/totalRateList')
    console.log(res)
    this.TransportList = res.data.data
  }
}
</script>
<style lang="less" scoped>
.c-transport-shipping {
  padding-top: 75px;
  padding-bottom: 75px;
  max-width: 1236px;
  margin: auto;
  .c-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 31px;
    padding-right: 12px;
    .title {
      font-size: 30px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .back {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      color: #385ca5;
      cursor: pointer;
      .icon-fanhui1 {
        font-size: 14px;
      }
    }
  }
  .c-tip {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    padding: 44px 50px 37px 50px;
  }
  .c-btm {
    margin-top: 49px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 31%;
      margin-top: 71px;
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
      width: 66%;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      a {
        font-size: 16px;
        color: rgba(66, 103, 178, 1);
      }
      .sp-between {
        display: flex;
        justify-content: space-between;
      }
      .title-transportation-information {
                padding: 30px;
                padding-bottom: 10px;
        span {
          font-size: 18px;
          color: rgba(0, 0, 0, 1);
        }
      }
      .information {
          border-bottom: 1px solid rgba(220,220,220,1);
                padding: 30px;
                padding-top: 20px;
        .first-line {
          margin-bottom: 16px;
          span {
            font-size: 16px;
            color: rgba(0, 0, 0, 1);
            position: relative;
          }
          .default-tip {
            background-color: #DFE3E8;
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
            height: 19px;;
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
p {
  margin: 0;
}
</style>
