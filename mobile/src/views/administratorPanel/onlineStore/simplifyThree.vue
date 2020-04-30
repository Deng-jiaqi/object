<template>
  <div>
    <header>
      <div class="header-box">
        <div class="mall-text">
          <p>Name</p>
        </div>
        <div class="header-content">
          <div class="menuCss" @click="drawer = true">
            <div class="menu-gang"></div>
            <p>{{$t('lang.templete.templeteFive.hint.text1')}}</p>
          </div>
          <div class="header-search">
            <div class="header-qieH" @click="LookCart">
              <p><span class="iconfont icongouwudai"></span>&nbsp;&nbsp;
                <span>{{$t('lang.templete.templeteFive.header.text3')}}</span>
                <span class="itemNum" v-if="shopNum>0">{{shopNum}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="main-header">
      <p>mall</p>
    </div>
    <router-view @getMessage="showMsg" @getIndex="routerClass" :searchVal="searchVal"></router-view>
    <footer>
      <el-row class="footer-box">
        <el-col :span="24">
          <p>{{$t('simplifyThree.footer.text1')}}</p>
        </el-col>
        <el-col :span="24">
          <p>{{$t('simplifyThree.footer.text2')}}</p>
          <p>{{$t('simplifyThree.footer.text3')}}</p>
        </el-col>
        <el-col :span="24">
          <p>{{$t('simplifyThree.footer.text4')}}</p>
        </el-col>
        <el-col :span="24">
          <p>{{$t('simplifyThree.footer.text5')}}</p>
          <p>{{$t('simplifyThree.footer.text6')}}</p>
        </el-col>
        <el-col :span="24" class="flexCss footer-btn">
          <el-input placeholder="Your email"></el-input>
          <el-button class="subscriber-btn">{{$t('simplifyThree.footer.text1')}}</el-button>
        </el-col>
      </el-row>
      <p>{{$t('simplifyThree.footer.text1')}}</p>
    </footer>
    <el-drawer
      :title="$t('lang.templete.templeteFive.hint.text1')"
      custom-class="menu-box"
      direction="ttb"
      size="40%"
      :visible.sync="drawer">
      <div class="menu-box-search">
        <el-input v-model="SerachInput"
                  @input="SerachShop"
                  suffix-icon="el-icon-search"
                  :placeholder="$t('lang.templete.templeteFive.header.text2')"/>
      </div>
      <ul class="header-ul">
        <router-link v-for="(item, index) in $t('simplifyThree.routerData')"
                     :key="index"
                     :to="item.href"
                     class="routerLinkCss"
                     :class="{'router-link-active':idx === index}"
        ><li @click="routerClass(index)">{{item.title}}</li>
        </router-link>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { getNum, serachShop } from '../../../common/api/api'
export default {
  name: 'simplifyThree',
  data () {
    return {
      drawer: false, // 菜单
      idx: '',
      searchInput: '',
      searchVal: '',
      shopNum: ''
    }
  },
  methods: {
    // 切换显示
    routerClass (index) {
      console.log(index)
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
                path: '/shopProductThree/page3',
                query: { id: 1, goodsname: this.searchInput }
              })
            }
            this.$message(resp.data.msg)
          })
        }, 900)
      }
    },
    LookCart () {
      this.$router.push({ path: '/shopTrolleyThree/page3' })
    }
  },
  created () {
    getNum({}).then(resp => {
      this.shopNum = resp.data.data
    })
  }
}
</script>
<style lang="less">
  .menu-box{
    height: 50%;
    background: #182e49;
    color: white;
    .el-drawer__header{
      color: white;
    }
  }
  .menu-box-search{
    padding: 0 16px;
    input{
      background: #182e49;
      color: white;
    }
  }
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  .header-Cart{
    cursor: pointer;
    .el-badge__content{
      border: none;
    }
  }
  header{
    background: black;
    color: white;
  }
  .xiuShi{
    width: 26px;
    height: 2px;
    background-color: white;
    border-radius: 2px;
    position: absolute;
    content: "";
  }
  .header-box{
    overflow: hidden;
    .header-search {
      height: 50px;
      .flexCss;
      > div:nth-child(1) {
        position: relative;
        > span {
          position: absolute;
          right: 20px;
          top: 14px;
          font-size: 20px;
        }
      }
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px 0 20px;
      >a{
        color: white;
      }
    }
    .menuCss {
      height: 50px;
      .flexCss;
      .menu-gang {
        .xiuShi;
        position: relative;
        margin-right: 10px;
      }
      .menu-gang:after{
        .xiuShi;
        top: 8px;
      }
      .menu-gang:before{
        .xiuShi;
        bottom: 8px;
      }
    }
    .mall-text{
      text-align: center;
      font-size: 26px;
      letter-spacing: 4px;
      padding: 0;
      p{
       margin: 12px auto;
      }
    }
  }
  .main-header{
    .flexCss;
    >p{
      font-size:32px;
      color: black;
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
  footer{
    background: black;
    color: white;
    padding: 42px 0 10px 0;
    .footer-box{
      .flexCss;
      text-align: center;
      flex-direction: column;
    }
    >p{
      text-align: center;
    }
    .subscriber-btn{
      border-left: 0;
      background: #D77E6A;
      color: whitesmoke;
      border-color: #D77E6A;
      -moz-border-radius-topleft: 0;
      -moz-border-radius-bottomleft: 0;
    }
  }
  .header-ul:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .header-ul {
    margin: 30px auto 0 auto;
    height: 50px;
    li{
      padding: 6px 16px;
      border-bottom: 1px solid #315e96;
    }
  }
  .routerLinkCss{
    color: white;
  }
  .itemNum {
    display: block;
    width: 20px;
    max-width: 30px;
    max-height: 30px;
    border-radius: 30px;
    background-color: #f56c6c;
    .flexCss;
    color: white;
    position: absolute;
    right: -12px;
    padding: 2px;
    font-size: 10px;
    top: 6px;
  }
  .footer-btn{
    width: 300px;
  }
</style>
