<template>
  <div>
    <header>
      <div class="header-box">
        <div>
          <span class="iconfont icontongxunlusousuokuang_fangdajing">{{$t('lang.templete.templeteEight.header.text1')}}</span>
        </div>
        <p class="header-title">{{$t('lang.templete.templeteEight.header.text2')}}</p>
        <div class="header-gouwu">
          <p>{{$t('lang.templete.templeteEight.header.text3')}} <span class="iconfont iconjiantouarrow483"></span></p>
          <p class="iconfont icongouwudai"
             style="cursor: pointer"
             @click="shopCart"
          >{{$t('lang.templete.templeteEight.header.text4')}}
            <span>{{shopNum}}</span></p>
        </div>
      </div>
      <div class="header-box2">
        <div>
          <ul class="header-ul">
            <router-link v-for="(item, index) in $t('lang.templete.templeteEight.header.text5')"
                         :key="index"
                         :to="item.href"
                         class="router-link-active"
                         :class="{'router-link-active1':cla === index}"
            >
              <li @click="routerClass(index)">{{item.title}}</li>
            </router-link>
          </ul>
          <p>{{$t('lang.templete.templeteEight.header.text7')}}</p>
        </div>
        <div></div>
      </div>
    </header>
    <router-view @getMessage="showMsg" :searchVal="searchVal"></router-view>
    <footer>
      <div class="footer-box">
        <div>
          <p>{{$t('lang.templete.templeteEight.footer.text1')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text2')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text3')}}</p>
        </div>
        <div>
          <p>{{$t('lang.templete.templeteEight.footer.text4')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text5')}}</p>
        </div>
        <div>
          <p>{{$t('lang.templete.templeteEight.footer.text6')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text7')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text8')}}</p>
        </div>
        <div class="footer-Email">
          <p>{{$t('lang.templete.templeteEight.footer.text9')}}</p>
          <p>{{$t('lang.templete.templeteEight.footer.text10')}}</p>
          <div>
            <input type="text" :placeholder="$t('lang.templete.templeteEight.footer.input')">
          </div>
          <button>{{$t('lang.templete.templeteEight.footer.btn')}}</button>
        </div>
      </div>
      <p>{{$t('lang.templete.templeteEight.footer.text11')}}</p>
    </footer>
  </div>
</template>

<script>
import { getNum } from '../../../common/api/api'

export default {
  name: 'templateEight',
  data () {
    return {
      shopNum: '', // 购物车数量
      cla: '', // 目录
      searchVal: ''
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
      this.$router.push({ path: '/shopTrolleyEight/page8' })
    }
  },
  created () {
    getNum({
      storeid: 1
    }).then(resp => {
      this.shopNum = resp.data.data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="less">
  .btn {
    background: rgba(57, 60, 74, 1);
    border-radius: 4px;
    border: 0;
    color: white;
    outline: none;
  }
  .input {
    padding: 10px;
    border: 2px solid rgba(57, 60, 74, 1);
    border-radius: 4px;
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flexAround {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .pCss {
    font-size: 19px;
    font-weight: bold;
    color: black;
  }
  .header-ul {
    .flexCss;
    margin-left: 20px;
  }
  header {
    .header-box {
      .flexBetween;
      background-color: #28323C;
      color: white;
      padding: 0 20px;
      font-size: 18px;
    }
    .header-title {
      margin-left: 100px;
    }
    .header-box2 {
      height: 786px;
      border: 1px solid silver;
      > div:nth-child(1) {
        .flexBetween;
        width: 50%;
      }
    }
  }
  footer {
    position: relative;
    .footer-box {
      padding: 94px 220px 80px 220px;
      .flexBetween;
      align-items: end;
      .footer-Email {
        input {
          width: 346px;
          height: 20px;
          .input;
        }
        button {
          .btn;
          width: 164px;
          height: 46px;
          margin-top: 20px;
        }
      }
    }
    div {
      p:nth-child(1) {
        font-weight: bold;
        color: black;
      }
    }
    > p {
      text-align: center;
    }
  }
  .header-gouwu {
    .flexBetween;
    > p {
      margin-right: 20px;
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
</style>
