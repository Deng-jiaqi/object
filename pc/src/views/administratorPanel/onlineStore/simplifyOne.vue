<template>
  <div>
    <header>
      <el-row class="header-row">
        <el-col :span="6">
          <p>MALL</p>
          <span>LOGO</span>
        </el-col>
        <el-col :span="12">
          <ul class="header-ul">
            <router-link
              v-for="(item, index) in $t('simplifyOne').routerData"
              :key="index"
              :to="item.href"
              class="routerLinkCss"
              :class="{'router-link-active':cla === index}"
            >
              <li @click="routerClass(index)">{{item.title}}</li>
            </router-link>
          </ul>
        </el-col>
        <el-col :span="6">
          <el-input
            class="cartInput"
            prefix-icon="el-icon-search"
            @input="searchData"
            v-model="searchInput"
          ></el-input>
          <el-badge :value="shopNum" class="item cartCss">
            <i class="el-icon-goods" @click="LookCart"></i>
          </el-badge>
        </el-col>
      </el-row>
    </header>
    <router-view @getMessage="showMsg" @getIndex="routerClass" :searchVal="searchVal"></router-view>
    <footer>
      <el-row class="footer-row">
        <el-col :span="6">
          <p>{{$t('simplifyOne.footer.text1')}}</p>
          <p>{{$t('simplifyOne.footer.text2')}}</p>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="8">
          <p>{{$t('simplifyOne.footer.text3')}}</p>
          <p>{{$t('simplifyOne.footer.text4')}}</p>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="8">
          <p>{{$t('simplifyOne.footer.text5')}}</p>
          <el-input placeholder="Email address">
            <el-button slot="append" type="primary">{{$t('simplifyOne.footer.text6')}}</el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="footer-box">
        <p>©2019，Powered by wuji</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { getNum, serachShop } from '../../../common/api/api'
export default {
  name: 'simplifyOne',
  data () {
    return {
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
.el-icon-goods {
  font-size: 30px;
  cursor: pointer;
}
.header-row {
  .flexBetween;
  margin: 0.625rem auto;
  padding: 0 3.0625rem;
  > div:nth-child(1) {
    width: 9.375rem;
    height: 3.1875rem;
    background: rgba(247, 247, 247, 1);
    border: 1px solid rgba(102, 102, 102, 1);
    position: relative;
    text-align: center;
    font-size: 0.75rem;
    color: black;
    font-weight: bold;
    > span {
      position: absolute;
      bottom: 0.46875rem;
      font-size: 0.59375rem;
      left: 0.625rem;
    }
  }
  > div:nth-child(2) {
    ul {
      width: 5.125rem;
      margin: auto;
      .flexBetween;
      font-size: 0.65625rem;
      color: #333333;
    }
  }
  > div:nth-child(3) {
    .flexCss;
  }
}
footer {
  .footer-row {
    margin-top: 6.6875rem;
    display: flex;
    padding: 0 6.25rem;
    > div {
      > p:nth-child(1) {
        font-size: 21px;
        color: #333333;
        font-weight: bold;
      }
      > p:nth-child(2) {
        color: #999999;
      }
    }
  }
  .footer-box {
    margin-top: 4.375rem;
    padding: 0 6.25rem;
    border-top: 2px solid #cccccc;
    height: 3.25rem;
    line-height: 3.25rem;
    > p {
      color: #666666;
    }
  }
}
.header-ul {
  margin: 30px auto 0 auto;
  display: flex;
  height: 50px;
}
.router-link-active {
  li {
    position: relative;
  }
  li:after {
    position: absolute;
    content: "";
    bottom: -3px;
    height: 3px;
    left: 0;
    width: 100%;
    background: #fda506;
  }
}
.routerLinkCss {
  margin-left: 20px;
}
.routerLinkCss:nth-child(2) {
  margin-left: 20px;
}
.cartCss {
  margin-left: 20px;
}
.cartInput {
  width: 9.1875rem;
}
</style>
