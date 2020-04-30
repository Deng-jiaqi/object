<template>
  <div>
    <p class="header-title">{{$t('lang.templete.templeteSeven.header.text1')}}</p>
    <header class="header">
      <div class="header-content">
        <div class="menuCss" @click="drawer = true">
          <div class="menu-gang"></div>
          <p>{{$t('lang.templete.templeteFive.hint.text1')}}</p>
        </div>
        <div class="header-search">
          <div class="header-qieH" @click="shopCart">
            <p><span class="iconfont icongouwudai"></span>&nbsp;&nbsp;
              <span>{{$t('lang.templete.templeteFive.header.text3')}}-</span>
              <span class="itemNum" v-if="shopNum>0">{{shopNum}}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
    <router-view @getMessage="showMsg" :searchVal="searchVal"></router-view>
    <footer>
      <div class="footer-box">
        <div class="footer-content">
          <div>
            <p>{{$t('lang.templete.templeteSeven.footer.text1')}}</p>
            <p>{{$t('lang.templete.templeteSeven.footer.text2')}}</p>
          </div>
          <div>
            <p>{{$t('lang.templete.templeteSeven.footer.text3')}}</p>
            <p>{{$t('lang.templete.templeteSeven.footer.text4')}}</p>
          </div>
          <div>
            <p>{{$t('lang.templete.templeteSeven.footer.text5')}}</p>
            <div>
              <input type="text" :placeholder="$t('lang.templete.templeteSeven.footer.input')">
            </div>
            <button>{{$t('lang.templete.templeteSeven.footer.btn')}}</button>
          </div>
        </div>
        <div class="footer-content1">
          <p>{{$t('lang.templete.templeteSeven.footer.text7')}}</p>
          <p>{{$t('lang.templete.templeteSeven.footer.text8')}}</p>
          <p>{{$t('lang.templete.templeteSeven.footer.text9')}}</p>
        </div>
      </div>
    </footer>
    <el-drawer
      :title="$t('lang.templete.templeteFive.hint.text1')"
      custom-class="menu-box"
      direction="ttb"
      size="50%"
      :visible.sync="drawer">
      <div class="menu-box-search">
        <el-input v-model="SerachInput"
                  @input="SerachShop"
                  suffix-icon="el-icon-search"
                  :placeholder="$t('lang.templete.templeteFive.header.text2')"/>
      </div>
      <ul class="header-ul">
        <router-link v-for="(item, index) in $t('lang.templete.templeteSeven.header.text2')"
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
import { getNum } from '../../../common/api/api'
export default {
  name: 'templateSeven',
  data () {
    return {
      drawer: false, // 菜单
      bannerData: [], // 轮播数据
      shopData: [], // 产品数据
      featured: [], // 产品系列
      searchVal: '',
      cla: '',
      shopNum: '',
      imgIndex: 1
    }
  },
  methods: {
    showMsg (val) { // 获取购物车数量
      this.shopNum = val
    },
    routerClass (index) {
      this.cla = index
    },
    shopCart () {
      this.$router.push({ path: '/shopTrolleySeven/page7' })
    }
  },
  created () {
    getNum({
    }).then(resp => {
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
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
  }
  .daBox{
    padding: 20px;
    .flexBetween;
  }
  .swiper-container{
    height:522px;
  }
  .pCss {
    font-size: 24px;
    font-weight: bold;
  }
  .header-title {
    text-align: center;
    background: rgba(54, 58, 68, 1);
    color: white;
    margin: 0;
    height: 42px;
    line-height: 42px;
  }

  .header {
    overflow: hidden;
    .header-box {
      background: #e3e3e3;
      .flexBetween;
      color: black;
      > ul {
        display: flex;
      }
    }
  }
  footer {
    background-color: #f2f2f2;
    padding: 20px 16px;
    .footer-box {
      .footer-content {
        .flexBetween;
        flex-direction: column;
        div {
          p:nth-child(1) {
            font-weight: bold;
            color: black;
          }
          input {
            width: 164px;
            height: 12px;
            padding: 10px;
            background-color: #f2f2f2;
            border: 2px solid rgba(198, 199, 200, 1);
            border-style: none none solid none;
            outline: none;
          }
          button {
            width: 120px;
            height: 50px;
            background: rgba(198, 199, 200, 1);
            border: 0;
            color: white;
            margin-top: 16px;
            font-size: 13px;
          }
        }
      }
      .footer-content1 {
        .flexBetween;
        align-items: center;
        flex-direction: column;
        margin-top: 70px;
        p{margin: 6px auto}
        div {
          width: 2px;
          height: 16px;
          background: rgba(198, 199, 200, 1);
        }
      }
    }
  }
  .router-link-active:last-child{
    margin-left: 20px;
  }
  .router-link-active1{
    li{
      border-bottom: 3px solid #FDA506;
    }
  }
  .xiuShi{
    width: 26px;
    height: 2px;
    background-color: white;
    border-radius: 2px;
    position: absolute;
    content: "";
  }
  .header-content {
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px 0 20px;
    color: white;
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
</style>
