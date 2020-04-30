<template>
  <div>
    <p class="header-title">{{$t('lang.templete.templeteSix.header.text1')}}</p>
    <header class="header">
      <div class="header-box">
        <ul class="header-ul">
          <router-link v-for="(item, index) in $t('lang.templete.templeteSix.header.text2')"
                       :key="index"
                       :to="item.href"
                       class="router-link-active"
                       :class="{'router-link-active1':cla === index}"
          ><li @click="routerClass(index)">{{item.title}}</li></router-link>
        </ul>
        <ul class="header-ul">
          <li>{{$t('lang.templete.templeteSix.header.text5')}}</li>
          <li @click="shopCart" style="cursor: pointer">{{$t('lang.templete.templeteSix.header.text6')}}<span>({{shopNum}})</span></li>
        </ul>
      </div>
      <div class="header-img-box">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
      </div>
    </header>
    <router-view @getMessage="showMsg" :searchVal="searchVal"></router-view>
    <footer id="footer">
      <div class="footer-box">
        <div class="footer-box1">
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content1.text1')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content1.text2')}}</p>
          </div>
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content1.text3')}}</p>
            <input type="text" :placeholder="$t('lang.templete.templeteSix.footer.content1.input')">
            <button>{{$t('lang.templete.templeteSix.footer.content1.btn')}}</button>
          </div>
        </div>
        <div class="footer-box2">
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content2.text1')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content2.text2')}}</p>
          </div>
          <div class="footer-box2-box">
            <div>
              <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
            </div>
            <div>
              <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
            </div>
            <div>
              <img src="../../../assets/administratorPanel/templateImg/27.png" alt="">
            </div>
          </div>
        </div>
        <div class="footer-box3">
          <div>
            <h2>{{$t('lang.templete.templeteSix.footer.content3.text1')}}</h2>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text2')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text3')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text4')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text5')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text6')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content3.text7')}}</p>
          </div>
          <div>
            <img src="../../../assets/administratorPanel/templateImg/48.png" alt="">
          </div>
        </div>
        <div class="footer-box4">
          <p>{{$t('lang.templete.templeteSix.footer.content4.text1')}}</p>
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content4.text2')}} </p>
            <p>{{$t('lang.templete.templeteSix.footer.content4.text3')}}</p>
          </div>
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content4.text4')}}</p>
            <p>{{$t('lang.templete.templeteSix.footer.content4.text5')}}</p>
          </div>
          <p>{{$t('lang.templete.templeteSix.footer.content4.text6')}}</p>
          <div>
            <p>{{$t('lang.templete.templeteSix.footer.content4.text7')}}</p>
            <input type="text" :placeholder="$t('lang.templete.templeteSix.footer.content4.input')">
            <button>{{$t('lang.templete.templeteSix.footer.content4.btn')}}</button>
          </div>
        </div>
        <div class="footer-box5">
          <p>{{$t('lang.templete.templeteSix.footer.content5.text1')}}</p>
          <p>{{$t('lang.templete.templeteSix.footer.content5.text2')}}</p>
          <p>{{$t('lang.templete.templeteSix.footer.content5.text3')}}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { getNum } from '../../../common/api/api'
export default {
  name: 'templateSix',
  data () {
    return {
      searchVal: null,
      cla: '',
      shopNum: ''
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
      this.$router.push({ path: '/shopTrolleySix/page6' })
    }
  },
  created () {
    getNum({}).then(resp => {
      this.shopNum = resp.data.data
    }).catch(err => {
      console.log(err)
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
    align-items: center;
  }
  .header {
    background: rgba(220, 226, 218, 1);
    overflow: hidden;
  }
  .header-title {
    text-align: center;
  }
  .header-box {
    width: 80%;
    margin: 54px auto auto auto;
    font-size: 19px;
    .flexBetween;
  }
  .header-img-box {
    width: 53.125rem;
    height: 18.375rem;
    margin: 2.75rem auto auto auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-ul {
    display: flex;
    li {
      margin-left: 40px;
    }
  }
  #footer {
    background-color: #f4fbf2;
    .footer-box {
      padding: 3.6875rem 2.4375rem;
      .footer-box1 {
        display: flex;
        justify-content: space-between;
        div:nth-child(1) {
          p {
            font-size: 32px;
            color: black;
            margin: 0;
          }
        }
        div:nth-child(2) {
          display: flex;
          justify-content: center;
          input {
            width: 22.25rem;
            height: 0.625rem;
            padding: 0.3125rem;
            border: 2px solid rgba(102, 102, 102, 1);
            border-radius: 2px;
          }
          button {
            width: 3.6875rem;
            height: 1.34375rem;
            background: rgba(51, 51, 51, 1);
            outline: none;
            border: 0;
            color: white;
            margin-left: 0.9375rem;
          }
          p {
            width: 9.875rem;
            margin: 0 3.125rem 0 auto;
            line-height: 0.9375rem;
          }
        }
      }
      .footer-box2 {
        .flexBetween;
        align-items: end;
        margin-top: 8.25rem;
        div:nth-child(1) {
          p:nth-child(1) {
            font-size: 32px;
            color: black;
            margin: 0 auto 1.1875rem auto;
          }
          p:nth-child(2) {
            width: 11.25rem;
          }
        }
        div:nth-child(2) {
          width: 40.9375rem;
          .flexBetween;
          div {
            width: 11.9375rem;
            height: 12.125rem;
            background: rgba(219, 226, 217, 1);
            .flexCss;
          }
        }
      }
      .footer-box3 {
        margin-top: 7.5rem;
        .flexBetween;
        align-items: end;
        div:nth-child(2) {
          width: 40.9375rem;
          height: 15.75rem;
          background: rgba(219, 226, 217, 1);
          .flexCss;
          img {
            width: 80%;
            height: 80%;
          }
        }
      }
      .footer-box4 {
        .flexBetween;
        margin-top: 7.625rem;
        align-items: end;
        > p:nth-child(1) {
          font-size: 22px;
          color: black;
          margin-top: 13px;
        }
        > div:nth-child(5) {
          input {
            width: 322px;
            height: 20px;
            padding: 10px;
            background: rgba(244, 251, 242, 1);
            border: 2px solid rgba(51, 51, 51, 1);
            outline: none;
          }
          button {
            width: 108px;
            height: 45px;
            background: rgba(51, 51, 51, 1);
            border: 1px solid rgba(51, 51, 51, 1);
            color: white;
            margin: 0 auto 1px 20px;
          }
        }
      }
      .footer-box5 {
        margin: 3.4375rem 0 3.125rem 0;
        > p:nth-child(1) {
          font-size: 18px;
          color: black;
        }
        > p:nth-child(2) {
          margin-top: 26px;
        }
      }
    }
  }
  .router-link-active1{
    li{
      border-bottom: 3px solid #FDA506;
    }
  }
</style>
