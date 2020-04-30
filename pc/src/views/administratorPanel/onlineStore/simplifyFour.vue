<template>
  <div>
    <header>
      <div class="header-box">
        <ul>
          <li>
            <el-input placeholder="搜索"></el-input>
          </li>
          <li>
            <p>mall</p>
          </li>
          <li>
            <p>
              购物车(0)
              <i class="el-icon-goods"></i>
            </p>
          </li>
        </ul>
      </div>
      <ul class="header-ul">
        <router-link
          v-for="(item, index) in routerData"
          :key="index"
          :to="item.href"
          class="routerLinkCss"
          :class="{'router-link-active':idx === index}"
        >
          <li @click="routerClass(index)">{{item.title}}</li>
        </router-link>
      </ul>
    </header>
    <router-view></router-view>
    <footer>
      <div class="footer-boxOne">
        <p>注册我们的通讯</p>
        <el-input placeholder="Email Address"></el-input>
      </div>
      <div class="footer-boxTwo">
        <ul>
          <li>
            <p class="el-icon-truck"></p>
            <p>免费邮寄！</p>
          </li>
          <li>
            <p class="el-icon-location-outline"></p>
            <p>离你最近的商店</p>
          </li>
          <li>
            <p class="el-icon-present"></p>
            <p>礼品卡</p>
          </li>
          <li>
            <p class="el-icon-truck"></p>
            <p>学生折扣</p>
          </li>
        </ul>
      </div>
      <div class="footer-boxThree">
        <p>搜索</p>
      </div>
      <div class="footer-boxFour">
        <p>©2019mall。通过主题清洁主题。由无际提供支持</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'simplifyFour',
  data () {
    return {
      idx: '',
      routerData: [
        {
          title: '主页',
          href: '/simplifyFourContent'
        },
        {
          title: '目录',
          href: '/shopProductFour/page4'
        }
      ]
    }
  },
  methods: {
    // 切换显示
    routerClass (index) {
      this.idx = index
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../common/css/common";
header {
  overflow: hidden;
  background: #f2f2f2;
  border-bottom: 1px solid #cccccc;
  .header-box {
    padding: 10px 46px;
    border-bottom: 1px solid #cccccc;
    > ul {
      .flexBetween;
      li {
        width: 200px;
        text-align: center;
      }
    }
  }
  > ul {
    .flexCss;
    width: 200px;
    margin: 22px auto;
    li {
      text-align: center;
      margin-left: 10px;
    }
  }
}
footer {
  .footer-boxOne {
    width: 500px;
    margin: 80px auto;
    text-align: center;
    > p {
      font-size: 24px;
      color: black;
    }
  }
  .footer-boxTwo {
    background: #1c223f;
    color: white;
    > ul {
      width: 70%;
      padding: 16px 0;
      .flexBetween;
      margin: auto;
      text-align: center;
      > li {
        p {
          margin: 6px;
        }
        > p:nth-child(1) {
          font-size: 24px;
        }
      }
    }
  }
  .footer-boxThree {
    text-align: center;
    color: black;
    border-bottom: 1px solid black;
    > p {
      height: 40px;
      line-height: 40px;
    }
  }
  .footer-boxFour {
    text-align: center;
    > p {
      margin: 70px auto;
      color: #999999;
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
</style>
