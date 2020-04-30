<template>
  <div>
    <div class="addSet-header">
      <h2>{{$t('printOrder.title')}}</h2>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        <span>{{$t('addSet.header.back')}}</span></p>
    </div>
    <main id="printText">
      <div class="printText-content2">
        <p>{{$t('printOrder.text2')}}  <span>{{orderinfo.name}}</span></p>
        <p>{{$t('printOrder.text1')}}  <span>{{orderinfo.ordernum}}</span></p>
        <p>{{$t('printOrder.text4')}}  <span>{{orderinfo.createtime}}</span></p>
        <p>{{$t('printOrder.text5')}}  <span>{{orderinfo.phone}}</span></p>
        <p>{{$t('printOrder.text3')}}  <span>{{orderinfo.address}}</span></p>
      </div>
      <div class="printText-content1">
        <div class="table-box">
          <table border="1" cellspacing="0" cellpadding="6" align="left">
            <tr>
              <th colspan="5">{{$t('printOrder.th1')}}</th>
              <th width="500">{{$t('printOrder.th2')}}</th>
              <th width="50">{{$t('printOrder.th3')}}</th>
              <th width="100">{{$t('printOrder.th4')}}</th>
            </tr>
            <tr v-for="(item, index) in goods" :key="index">
              <td colspan="5">{{index + 1}}</td>
              <td width="500">
                <p class="trCss">{{item.goodsname}}</p>
              </td>
              <td width="50">{{item.goods_number}}</td>
              <td width="100">{{item.price}}</td>
            </tr>
            <tr style="height: 28px">
              <td colspan="5"></td>
              <td width="500"></td>
              <td width="50"></td>
              <td width="100"></td>
            </tr>
          </table>
        </div>
        <div>
          <p><span>{{$t('printOrder.td5')}}</span> <span class="blackColorTwo">${{money.discount_amount}}</span></p>
          <p><span>{{$t('printOrder.td3')}}</span> <span class="blackColorTwo">${{money.taxes}}</span></p>
          <p><span>{{$t('printOrder.td2')}}</span> <span class="blackColorTwo">${{money.shipping}}</span></p>
          <p><span>{{$t('printOrder.td1')}}</span> <span class="blackColorThree">${{total.total}}</span></p>
        </div>
      </div>
    </main>
    <footer>
      <el-button type="primary" v-print="'#printText'">{{$t('printOrder.btn1')}}</el-button>
    </footer>
  </div>
</template>

<script>
import { printerOrder } from '@/common/api/api'
export default {
  name: 'printOrder',
  data () {
    return {
      goods: [],
      money: {},
      orderinfo: {},
      total: {},
      getTolPrice: 0 // 获取所有商品价钱
    }
  },
  methods: {
    // 返回产品页面
    backTop () {
      this.$router.go(-1)
    }
  },
  created () {
    printerOrder({
      id: this.$route.query.id
    }).then(resp => {
      if (resp.data.code === 1) {
        this.goods = resp.data.data.goods
        this.goods.forEach(val => {
          this.getTolPrice += Number(val.price)
        })
        this.money = resp.data.data.money
        this.orderinfo = resp.data.data.orderinfo
        this.total = resp.data.data.total
      }
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../../../common/css/common";
  .addSet-header {
    padding: 0 12px;
    .flexBetween;
    height: 70px;
    background: white;
    border-bottom: 1px solid #e3e3e3;
  }
  main{
    font-size: 18px;
  }
  .table-box{
    height: auto;
    table{
      width: 100%;
      th{
        text-align: left;
      }
    }
    >p{
      padding-top: 30px;
      text-align: right;
    }
    .priceCss{
      color: black;
    }
  }
  footer{
    margin-bottom: 100px;
    .flexCss;
    margin-top: 10px;
  }
  .printText-content1{
    margin-top: 14px;
    background: white;
    padding: 14px;
    display: flex;
    flex-direction: column;
    p{.flexBetween;}
    >p:nth-child(1){
      margin-top: 0;
    }
  }
  .blackColorThree{
    color: #4267b2;
  }
  .printText-content2{
    background: white;
    padding: 14px;
    p:nth-child(1){
    }
    span{
      .blackColorTwo;
    }
  }
</style>
