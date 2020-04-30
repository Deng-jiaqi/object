<template>
  <div>
    <el-row class="fullyBox">
      <h1>{{orderData.buyername}}</h1>
      <el-col :span="12">
        <div class="fullyBox-content1">
          <div class="fullyBox-imgbox">
            <img src="../../assets/product/chenggong.png" alt />
          </div>
          <div>
            <p class="flexCss">
              <span>{{$t('subSuccessfully.title')}}</span>&nbsp;
              <span>{{orderData.ordernum}}</span>
            </p>
            <h3>{{orderData.buyername}}</h3>
          </div>
        </div>
        <div class="fullyBox-content2">
          <div>
            <p>{{$t('subSuccessfully.text1')}}</p>
          </div>
        </div>
        <div class="fullyBox-content3">
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>{{$t('subSuccessfully.text2')}}</h3>
              <p class="sixText">{{orderData.email}}</p>
            </el-col>
            <el-col :span="12">
              <h3>{{$t('subSuccessfully.text3')}}</h3>
              <p class="sixText">{{PayName}}</p>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <h3>{{$t('subSuccessfully.text4')}}</h3>
              <p class="sixText">{{orderData.address}}</p>
              <p class="sixText">{{orderData.country + orderData.province}}</p>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </div>
        <div class="footerBtn">
          <router-link :to="blackShop">
            <el-button type="primary">{{$t('subSuccessfully.btn1')}}</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="9">
        <div class="fullyBox-main1">
          <div
            class="fullyBox-main1-content1"
            v-for="(item, index) in goodsinfo"
            :key="index"
            @click="routerShop(item)"
          >
            <div>
              <img :src="item.img" alt />
            </div>
            <div>
              <p>{{item.goodsname}}</p>
              <p class="blackTextTwo">
                $ {{item.price}}&nbsp;
                <span v-if="item.buynum > 0">x {{item.buynum}}</span>
              </p>
            </div>
          </div>
          <p></p>
        </div>
        <div class="fullyBox-main2">
          <div>
            <p class="graynessText">{{$t('subSuccessfully.text5')}}</p>
            <p class="blackText">${{orderData.subtotal}}</p>
          </div>
          <div>
            <p class="graynessText">{{$t('subSuccessfully.text6')}}</p>
            <p class="blackText">${{orderData.discount_amount}}</p>
          </div>
          <div>
            <p class="graynessText">{{$t('subSuccessfully.text7')}}</p>
            <p class="blackText">${{orderData.shipping}}</p>
          </div>
          <div>
            <p class="graynessText">{{$t('subSuccessfully.text8')}}</p>
            <p class="blackText">${{orderData.taxes}}</p>
          </div>
        </div>
        <div class="flexBetween footer-text">
          <p>{{$t('subSuccessfully.text9')}}</p>
          <p>${{orderData.totalprice}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { showorder } from '../../common/api/api'
export default {
  name: 'subSuccessfully',
  data () {
    return {
      PayName: '', // 支付方式名字
      orderData: {},
      goodsinfo: [],
      attr: ['1', '2'],
      attrPrice: '',
      attrValue: '',
      attrImg: '',
      attrName: '',
      skip: '', // 路由地址
      blackShop: '' // 返回主页
    }
  },
  methods: {
    routerShop (item) {
      this.$router.push({
        path: this.skip,
        query: {
          productid: item.productid
        }
      })
    }
  },
  created () {
    this.skip = this.$route.params.id
    if (this.skip === 'page5') {
      this.skip = '/shopDetailsFive/' + 'page5'
      this.blackShop = '/templateFiveContent'
    } else if (this.skip === 'page6') {
      this.skip = '/shopDetailsSix/' + 'page6'
      this.blackShop = '/templateSixContent'
    } else if (this.skip === 'page7') {
      this.skip = '/shopDetailsSeven/' + 'page7'
      this.blackShop = '/templateSevenContent'
    } else if (this.skip === 'page8') {
      this.skip = '/shopDetailsEight/' + 'page8'
      this.blackShop = '/templateEightContent'
    } else if (this.skip === 'page1') {
      this.skip = '/shopDetailsOne/page1'
      this.blackShop = '/simplifyOneContent'
    } else if (this.skip === 'page4') {
      this.skip = '/shopDetailsFour/page4'
      this.blackShop = '/simplifyFourContent'
    } else if (this.skip === 'page3') {
      this.skip = '/shopDetailsThree/page3'
      this.blackShop = '/simplifyThreeContent'
    }
    showorder({
      orderid: this.$route.query.orderid
    }).then(resp => {
      // console.log(resp.data.data)
      this.orderData = resp.data.data
      this.attrPrice = resp.data.data.goodsinfo[0].price
      this.goodsinfo = this.orderData.goodsinfo
      this.attrImg = this.orderData.goodsinfo[0].img
      this.attrName = this.orderData.goodsinfo[0].goodsname
      this.attr = this.goodsinfo[0].attr
      let paynum = Number(this.orderData.paymethod)
      if (paynum === 1) {
        // palpay支付
        this.PayName = this.$t('subSuccessfully.text10')
      } else if (paynum === 2) {
        // 线上支付 stripe支付
        this.PayName = this.$t('subSuccessfully.text11')
      } else {
        // 线下支付
        this.PayName = this.$t('subSuccessfully.text12')
      }
      // this.attrValue = this.attr[0].attr_value
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../common/css/common";
.fullyBox {
  padding: 40px 50px;
  width: 900px;
  border-radius: 4px;
  margin: 40px auto;
  background: white;
  border: 1px solid #e3e3e3;
  box-shadow: 2px 2px 2px #f4f4f4;
  .fullyBox-content1 {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .fullyBox-imgbox {
      width: 58px;
      height: 58px;
      margin-right: 20px;
      > img {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
  .fullyBox-content2 {
    width: 100%;
    background: white;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 6px;
    > div {
      > p {
        padding: 0 16px;
      }
    }
  }
  .fullyBox-content3 {
    width: 100%;
    margin-top: 16px;
    background: white;
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 6px;
    > div {
      padding: 0 22px;
    }
  }
  .fullyBox-main1 {
    .flexBetween;
    max-height: 240px;
    overflow-x: hidden;
    flex-wrap: wrap;
    .fullyBox-main1-content1 {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      width: 100%;
      cursor: pointer;
      p {
        margin: 10px auto;
      }
      > div:nth-child(1) {
        .flexCss;
        width: 70px;
        height: 70px;
        border-radius: 6px;
        margin-right: 20px;
        border: 1px solid #f4f4f4;
        > img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  .fullyBox-main2 {
    border-top: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    margin: 30px auto 10px auto;
    > div {
      .flexBetween;
    }
  }
  .footerBtn {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
.footer-text {
  > p:nth-child(1) {
    font-weight: bold;
    font-size: 18px;
    color: #898989;
  }
  > p:nth-child(2) {
    color: black;
    font-weight: bold;
    font-size: 18px;
  }
}
.blackText {
  color: black;
}
.blackTextTwo {
  color: black;
  font-weight: bold;
}
.graynessText {
  color: #898989;
}
.sixText {
  color: #666666;
}
</style>
