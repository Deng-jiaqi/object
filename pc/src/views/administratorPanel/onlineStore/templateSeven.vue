<template>
  <div>
    <p class="header-title">{{$t('lang.templete.templeteSeven.header.text1')}}</p>
    <header class="header">
      <div class="header-box">
        <ul class="header-ul">
          <router-link
            v-for="(item, index) in $t('lang.templete.templeteSeven.header.text2')"
            :key="index"
            :to="item.href"
            class="router-link-active"
            :class="{'router-link-active1':cla === index}"
          >
            <li @click="routerClass(index)">{{item.title}}</li>
          </router-link>
        </ul>
        <p>{{$t('lang.templete.templeteSeven.header.text4')}}</p>
        <ul class="header-ul">
          <li>
            <span class="el-icon-search">{{$t('lang.templete.templeteSeven.header.text6')}}</span>
          </li>
          <li @click="shopCart">
            {{$t('lang.templete.templeteSeven.header.text7')}}
            <span>{{shopNum}}</span>
          </li>
        </ul>
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
              <input type="text" :placeholder="$t('lang.templete.templeteSeven.footer.input')" />
            </div>
            <button>{{$t('lang.templete.templeteSeven.footer.btn')}}</button>
          </div>
        </div>
        <div class="footer-content1">
          <p>{{$t('lang.templete.templeteSeven.footer.text7')}}</p>
          <div></div>
          <p>{{$t('lang.templete.templeteSeven.footer.text8')}}</p>
          <div></div>
          <p>{{$t('lang.templete.templeteSeven.footer.text9')}}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getNum } from '../../../common/api/api'
export default {
  name: 'templateSeven',
  data () {
    return {
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
.daBox {
  padding: 20px;
  .flexBetween;
}
.swiper-container {
  height: 522px;
}
.daHezi {
  div {
    margin-left: 40px;
  }
}
.xiaoBox {
  background-color: #eeeeee;
  overflow: hidden;
  width: 1319px;
  .flexCss;
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
    .flexBetween;
    color: black;
    padding: 32px 88px;
    > ul {
      display: flex;
      li {
        margin-left: 40px;
      }
    }
  }
}
footer {
  background-color: #f2f2f2;
  padding: 1.0625rem 10.1875rem;
  .footer-box {
    .footer-content {
      .flexBetween;
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
      width: 50%;
      p {
        margin: 0;
      }
      div {
        width: 2px;
        height: 16px;
        background: rgba(198, 199, 200, 1);
      }
    }
  }
}
.router-link-active:last-child {
  margin-left: 20px;
}
.router-link-active1 {
  li {
    border-bottom: 3px solid #fda506;
  }
}
</style>
