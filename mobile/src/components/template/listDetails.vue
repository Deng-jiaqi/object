<template>
  <div>
    <div class="listDetails-banner flexCss" :style="{backgroundImage: 'url(' + this.bannerImg + ')'}">
      <p  style="color: white;font-size: 30px">{{listName}}</p>
    </div>
    <div class="listDetails">
      <p v-html="content" class="listDetails-describe"></p>
      <div class="listDetails-content1">
        <h2>{{listName}}</h2>
        <div>
          <span>{{$t('submitOrderFive.listDetails.text1')}}</span>
          <el-select v-model="value" :placeholder="$t('shopProduct.content.place1')" @change="sortSearch($event)">
            <el-option
                v-for="item in $t('shopProduct.options')"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-row :gutter="20" class="elRowCss">
        <el-col :span="12" v-for="(item, index) in listData" :key="index">
          <div class="elRowCss-box" @click="routerDetails(item)">
            <div class="img-box">
              <img :src="item.imgs" alt="">
            </div>
            <p>{{item.goodsname}}</p>
            <h2>${{item.price}}</h2>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { lookcollect, catalogShop } from '../../common/api/api'
export default {
  name: 'listDetails',
  data () {
    return {
      options: [],
      value: 'TA',
      listName: '',
      listData: [],
      bannerImg: '',
      content: '',
      skip: ''
    }
  },
  methods: {
    // 跳转到购买页面
    routerDetails (item) {
      this.$router.push({
        path: this.skip,
        query: {
          productid: item.id
        }
      })
    },
    // 排序搜索
    sortSearch (value) {
      catalogShop({
        order: value,
        collectid: this.$route.query.collectid
      }).then(resp => {
        this.listData = resp.data.data
      })
    }
  },
  created () {
    this.skip = this.$route.params.id
    if (this.skip === 'page5') {
      this.skip = '/shopDetailsFive/page5'
    } else if (this.skip === 'page6') {
      this.skip = '/shopDetailsSix/page6'
    } else if (this.skip === 'page7') {
      this.skip = '/shopDetailsSeven/page7'
    } else if (this.skip === 'page8') {
      this.skip = '/shopDetailsEight/page8'
    } else if (this.skip === 'page1') {
      this.skip = '/shopDetailsOne/page1'
    } else if (this.skip === 'page4') {
      this.skip = '/shopDetailsFour/page4'
    } else if (this.skip === 'page3') {
      this.skip = '/shopDetailsThree/page3'
    }
    lookcollect({
      collectid: this.$route.query.collectid
    }).then(resp => {
      this.listName = resp.data.data.name
      this.listData = resp.data.data.goodsinfo
      this.bannerImg = resp.data.data.collectimg
      this.content = resp.data.data.content
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../common/css/common";
  .listDetails-banner{
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    /*height: 12.1875rem;*/
    width: 100%;
    margin: auto;
    .flexCss;
    flex-direction: column;
  }
  .listDetails-describe{
    font-size: 20px;
    margin: 50px auto;
  }
  .listDetails{
    padding: 0 30px 30px 30px;
    margin: auto;
    .listDetails-content1{
      background-color: #EEEEEE;
      padding: 10px 20px;
      flex-direction: column;
      h2{margin: 6px auto; text-align: left}
      >div{
        .flexCss;
      }
    }
    .img-box{
      width: 100%;
      height: 100%;
      .flexCss;
      border: 1px solid #e3e3e3;
      margin-top: 20px;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .elRowCss{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .elRowCss-box{
        margin-bottom: 20px;
        >div{
          height:150px;
        }
        p{
          margin: 6px auto;
        }
        h2{ margin: 6px auto;}
      }
      .elRowCss-box:hover{
        cursor: pointer;
      }
      .elRowCss-box:hover div{
        opacity: 0.8;
      }
    }
  }
</style>
