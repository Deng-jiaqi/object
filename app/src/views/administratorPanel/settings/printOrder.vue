<template>
  <div>
    <div class="addSet-header">
      <h1>{{$t('printOrder.title')}}</h1>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        <span>{{$t('addSet.header.back')}}</span></p>
    </div>
    <main id="printText">
      <el-row>
        <el-col :span="8">
          <p><span>{{$t('printOrder.text1')}}</span>&nbsp; <span>{{orderinfo.ordernum}}</span></p>
          <p><span>{{$t('printOrder.text2')}}</span>&nbsp; <span>{{orderinfo.name}}</span></p>
          <p><span>{{$t('printOrder.text3')}}</span>&nbsp; <span>{{orderinfo.address}}</span></p>
        </el-col>
        <el-col :span="8">
          <p><span>{{$t('printOrder.text4')}}</span>&nbsp; <span>{{orderinfo.createtime}}</span></p>
          <p><span>{{$t('printOrder.text5')}}</span>&nbsp; <span>{{orderinfo.phone}}</span></p>
        </el-col>
      </el-row>
      <div class="table-box">
        <table border="1" cellspacing="0" cellpadding="6" align="left">
          <tr>
            <th colspan="5">{{$t('printOrder.th1')}}</th>
            <th width="500">{{$t('printOrder.th2')}}</th>
            <th width="50">{{$t('printOrder.th3')}}</th>
            <th width="100">{{$t('printOrder.th4')}}</th>
          </tr>
          <tr style="height: 28px">
            <td colspan="5">1</td>
            <td width="500">{{goods.goodsname}}</td>
            <td width="50">{{goods.goods_number}}</td>
            <td width="100">{{goods.price}}</td>
          </tr>
          <tr style="height: 28px">
            <td colspan="5"></td>
            <td width="500"></td>
            <td width="50"></td>
            <td width="100"></td>
          </tr>
        </table>
        <table cellspacing="0" cellpadding="6" align="left" style="margin: 30px auto 30px auto">
          <tr style="height: 36px; margin-top: 30px">
            <td width="500">
              <span>{{$t('printOrder.td1')}}</span><span class="priceCss">{{money.totalprice}}</span> {{$t('printOrder.td4')}} +
              <span>{{$t('printOrder.td2')}}</span><span class="priceCss">{{money.shipping}}</span> + {{$t('printOrder.td3')}}
              <span>{{money.taxes}}</span> - {{$t('printOrder.td5')}} <span class="priceCss">{{money.discount_amount}}</span> {{$t('printOrder.td4')}}
            </td>
          </tr>
        </table>
        <p>{{$t('printOrder.sum')}} ￥<span>{{total.total}}</span></p>
      </div>
    </main>
    <footer>
      <el-button type="primary" v-print="'#printText'">{{$t('printOrder.btn1')}}</el-button>
    </footer>
  </div>
</template>

<script>
import { printerOrder } from '../../../common/api/api'
export default {
  name: 'printOrder',
  data () {
    return {
      goods: {},
      money: {},
      orderinfo: {},
      total: {}
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
        this.money = resp.data.data.money
        this.orderinfo = resp.data.data.orderinfo
        this.total = resp.data.data.total
      }
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../../common/css/common";
  .addSet-header {
    .flexBetween;
    height: 120px;
  }
  main{
    font-size: 18px;
  }
  .table-box{
    width: 800px;
    margin-bottom: 100px;
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
  }
</style>
