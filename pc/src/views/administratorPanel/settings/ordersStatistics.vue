<template>
  <div>
    <div class="addSet-header">
      <h1>{{$t('ordersStatistics.title')}}</h1>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        <span>{{$t('addSet.header.back')}}</span>
      </p>
    </div>
    <el-row class="orders-box">
      <el-col :span="8">
        <p>{{$t('ordersStatistics.text1')}}</p>
        <p>$ {{pay_amount}}</p>
      </el-col>
      <el-col :span="8">
        <p>{{$t('ordersStatistics.text2')}}</p>
        <p>$ 0.00</p>
      </el-col>
      <el-col :span="8">
        <p>{{$t('ordersStatistics.text3')}}</p>
        <p>$ {{pay_taxes}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ordercount } from '../../../common/api/api'
export default {
  name: 'ordersStatistics',
  data () {
    return {
      pay_amount: '', // 已支付总金额
      pay_taxes: ''// 已支付税费
    }
  },
  methods: {
    backTop () {
      this.$router.go(-1)
    }
  },
  created () {
    ordercount({
    }).then(resp => {
      this.pay_amount = resp.data.data.pay_amount
      this.pay_taxes = resp.data.data.pay_taxes
    })
  }
}
</script>

<style scoped lang="less">
@import "../../../common/css/common";
.addSet-header {
  .flexBetween;
  margin: 60px auto 20px auto;
  border-bottom: 1px solid #e3e3e3;
}
.orders-box {
  > div {
    border: 1px solid #e3e3e3;
    height: 110px;
    background: white;
    text-align: center;
    .flexCss;
    flex-direction: column;
    > p:nth-child(1) {
      color: black;
    }
    > p:nth-child(2) {
      color: #4267b2;
      font-size: 20px;
    }
    > p {
      margin: 6px;
    }
  }
  > div:nth-child(2) {
    border-style: solid none solid none;
  }
}
</style>
