<template>
  <div>
    <header>
      <el-row class="header-row">
        <el-col :span="6">
          <p>MALL</p>
        </el-col>
        <el-col :span="12">
          <el-input  prefix-icon="el-icon-search" @input="searchData" v-model="searchInput"></el-input>
        </el-col>
        <el-col :span="6">
          <el-badge :value="shopNum" class="item">
            <i class="el-icon-goods" @click="LookCart"></i>
          </el-badge>
          <div class="menu-gang" @click="drawer = true"></div>
        </el-col>
      </el-row>
    </header>
    <router-view @getMessage="showMsg" @getIndex="routerClass" :searchVal="searchVal"></router-view>
    <footer>
      <el-row class="footer-row">
        <el-col :span="24">
          <p>{{$t('simplifyOne.footer.text1')}}</p>
          <p>{{$t('simplifyOne.footer.text2')}}</p>
        </el-col>
        <el-col :span="24">
          <p>{{$t('simplifyOne.footer.text3')}}</p>
          <p>{{$t('simplifyOne.footer.text4')}}</p>
        </el-col>
        <el-col :span="24" class="email-btn-box">
          <p>{{$t('simplifyOne.footer.text5')}}</p>
          <el-input placeholder="Email address">
          </el-input>
          <el-button type="primary">{{$t('simplifyOne.footer.text6')}}</el-button>
        </el-col>
      </el-row>
      <div class="footer-box">
        <p>©2019，Powered by wuji</p>
      </div>
    </footer>
    <el-drawer
      :title="$t('lang.templete.templeteFive.hint.text1')"
      custom-class="menu-box"
      direction="ttb"
      size="40%"
      :visible.sync="drawer">
      <div class="menu-box-search">
        <el-input v-model="searchInput"
                  @input="searchData"
                  suffix-icon="el-icon-search"
                  :placeholder="$t('lang.templete.templeteFive.header.text2')"/>
      </div>
      <ul class="header-ul">
        <router-link v-for="(item, index) in $t('simplifyOne').routerData"
                     :key="index"
                     :to="item.href"
                     class="routerLinkCss"
                     :class="{'router-link-active':cla === index}"
        ><li @click="routerClass(index)">{{item.title}}</li>
        </router-link>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { getNum, serachShop } from '../../../common/api/api'
export default {
  name: 'simplifyOne',
  data () {
    return {
      drawer: false, // 菜单
      searchVal: '',
      shopNum: '', // 购物车数量
      searchInput: '', // 搜索
      timer: '', // 定时器
      cla: '', //
      replace: [], // 替换数据
      index: '' // 下标切换样式
    }
  },
  methods: {
    // 切换显示
    routerClass (index) {
      console.log(index)
      // this.index = index
    },
    // 购物车数量
    showMsg (val) {
      this.shopNum = val
    },
    searchData () {
      if (this.searchInput !== '') {
        clearInterval(this.timer)
        this.timer = setTimeout(() => {
          serachShop({ goodsname: this.searchInput }).then(resp => {
            if (resp.data.data.length > 0) {
              this.searchVal = resp.data.data
              this.cla = 1
              this.$router.push({
                path: '/shopProductOne/page1',
                query: { id: 1, goodsname: this.searchInput }
              })
            }
            this.$message(resp.data.msg)
          })
        }, 900)
      }
    },
    LookCart () {
      this.$router.push({ path: '/shopTrolleyOne/page1' })
    }
  },
  created () {
    getNum({}).then(resp => {
      this.shopNum = resp.data.data
    })
  }
}
</script>

<style lang='less' scoped>
  @import "../../../common/css/common";
  .el-icon-goods{
    font-size: 30px;
    cursor: pointer;
  }
  .header-row{
    color: black;
    .flexBetween;
    >div:nth-child(1){
      text-align: center;
      font-size: 20px;
      color: black;
    }
    >div:nth-child(2){
      ul{
        margin: auto;
        .flexBetween;
        font-size: 0.65625rem;
        color: #333333;
      }
    }
    >div:nth-child(3){
      .flexCss;
    }
  }
  footer{
    text-align: center;
    .footer-row{
      .flexCss;
      flex-wrap: wrap;
      >div{
        >p:nth-child(1){
          font-size: 21px;
          color: #333333;
          font-weight: bold;
        }
        >p:nth-child(2){
          color: #999999;
        }
      }
    }
    .footer-box{
      margin-top: 4.375rem;
      border-top: 2px solid #CCCCCC;
      height: 3.25rem;
      line-height: 3.25rem;
      >p{
        color: #666666;
      }
    }
  }
  .header-ul {
    margin: 30px auto 0 auto;
    height: 50px;
    li{
      padding: 6px 16px;
      border-bottom: 1px solid #315e96;
    }
  }
  .router-link-active {
    li{
      position: relative;
    }
    li:after{
      position: absolute;
      content: "";
      bottom: -3px;
      height: 3px;
      left: 0;
      width: 100%;
      background: #FDA506;
    }
  }
  .routerLinkCss {
    margin-left: 20px;
    /*color: white;*/
  }
  .routerLinkCss:nth-child(2) {
    margin-left: 20px;
  }
  .xiuShi{
    width: 26px;
    height: 2px;
    background-color: black;
    border-radius: 4px;
    position: absolute;
    content: "";
  }
  .menu-gang {
    .xiuShi;
    position: relative;
    margin-left: 10px;
  }
  .menu-gang:after{
    .xiuShi;
    top: 8px;
  }
  .menu-gang:before{
    .xiuShi;
    bottom: 8px;
  }
  .email-btn-box{
    width: 80%;
    margin: auto;
    button{
      text-transform: uppercase;
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
