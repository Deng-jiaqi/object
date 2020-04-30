<template>
  <div>
    <header>
      <div class="header-div">
        <p>{{$t('simplifyThree.header.text1')}}</p>
        <el-row :gutter="20">
          <el-col :span="8" class="header-Cart">
            <el-badge :value="shopNum" class="item">
              <i class="el-icon-goods" @click="LookCart">&nbsp;{{$t('simplifyThree.header.text2')}}</i>
            </el-badge>
          </el-col>
          <el-col :span="16">
            <el-input
              placeholder="Search"
              v-model="searchInput"
              @input="searchData"
              prefix-icon="el-icon-search"
            ></el-input>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="main-header">
      <p>mall</p>
      <ul class="header-ul">
        <router-link
          v-for="(item, index) in $t('simplifyThree.routerData')"
          :key="index"
          :to="item.href"
          class="routerLinkCss"
          :class="{'router-link-active':idx === index}"
        >
          <li @click="routerClass(index)">{{item.title}}</li>
        </router-link>
      </ul>
    </div>
    <router-view @getMessage="showMsg" @getIndex="routerClass" :searchVal="searchVal"></router-view>
    <footer>
      <el-row class="footer-box">
        <el-col>
          <p>{{$t('simplifyThree.footer.text1')}}</p>
        </el-col>
        <el-col>
          <p>{{$t('simplifyThree.footer.text2')}}</p>
          <p>{{$t('simplifyThree.footer.text3')}}</p>
        </el-col>
        <el-col>
          <p>{{$t('simplifyThree.footer.text4')}}</p>
        </el-col>
        <el-col>
          <p>{{$t('simplifyThree.footer.text5')}}</p>
          <p>{{$t('simplifyThree.footer.text6')}}</p>
          <el-input placeholder="Your email"></el-input>
          <el-button class="subscriber-btn">{{$t('simplifyThree.footer.text1')}}</el-button>
        </el-col>
      </el-row>
      <p>{{$t('simplifyThree.footer.text1')}}</p>
    </footer>
  </div>
</template>

<script>
import { getNum, serachShop } from '../../../common/api/api'
export default {
  name: 'simplifyThree',
  data () {
    return {
      idx: '',
      searchInput: '',
      searchVal: '',
      shopNum: ''
    }
  },
  methods: {
    // 切换显示
    routerClass (index) {
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

<style scoped lang="less">
@import "../../../common/css/common";
.header-Cart {
  cursor: pointer;
  .el-badge__content {
    border: none;
  }
}
header {
  background: black;
  color: white;
  .header-div {
    width: 41rem;
    margin: auto;
    .flexBetween;
    > div {
      .flexBetween;
    }
  }
}
.main-header {
  .flexBetween;
  width: 41rem;
  margin: 0.5625rem auto 1.125rem auto;
  > p {
    font-size: 32px;
    color: black;
  }
  > ul {
    display: flex;
    li {
      border: none;
      margin-left: 60px;
      color: black;
      font-size: 18px;
    }
  }
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
footer {
  background: black;
  color: white;
  padding: 42px 0 10px 0;
  .footer-box {
    width: 41rem;
    margin: auto;
    display: flex;
    align-items: end;
  }
  > p {
    text-align: center;
  }
  .subscriber-btn {
    margin-top: 20px;
    background: #d77e6a;
    color: whitesmoke;
    border-color: #d77e6a;
  }
}
.el-icon-goods {
  font-size: 18px;
}
</style>
