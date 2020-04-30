<template>
  <div>
    <div class="content">
      <p class="title">{{$t('lang.loginOfRecent.text1')}}</p>
      <p class="email">{{email}}</p>
      <div class="c-shops">
        <ul>
          <li
            class="shop"
            @click="toShop(item.token,item.sellerid)"
            v-for="(item,index) in shops"
            :key="index"
          >
            <p class="storeName">{{item.storeName}}</p>
            <p class="website">{{item.site}}</p>
            <span class="iconfont icon-icon02"></span>
          </li>
        </ul>
      </div>
      <div class="c-to-other">
        <span class="iconfont icon-tianjia"></span>
        <router-link
          :to="$route.query.isWho==='admin'?$t('lang.loginOfRecent.text2.href2'):$t('lang.loginOfRecent.text2.href1')"
        >{{$t('lang.loginOfRecent.text2.title')}}</router-link>
      </div>
      <!-- <div class="c-cancel">
        <router-link
          @click.native="cancellation"
          :to="$t('lang.loginOfRecent.text3.href')"
        >{{$t('lang.loginOfRecent.text3.title')}}</router-link>
      </div> -->
              <div class="c-cancel">
          <p @click="cancellation">{{$t('lang.loginOfRecent.text3')}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { recentLogin } from '../../common/api/api'
export default {
  name: 'loginOfRecent',
  data () {
    return {
      //   临时变量
      email: '',
      shops: []
    }
  },
  methods: {
    cancellation () {
      console.log(window.location.href)
      if (window.location.href.split('=')[1] === 'admin') {
        this.$cookies.remove('ALoginInfoSuccessList')
      }
      if (window.location.href.split('=')[1] === 'employees') {
        console.log('wqwq')
        this.$cookies.remove('ELoginInfoSuccess')
      }
      this.$router.push({ path: '/dashbord' })
    },
    toShop (x, y) {
      recentLogin({ token: x, sellerid: y }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.$cookies.set('sellerid', res.data.data.sellerid)
          this.$router.push({
            path: '/administratorPanel/home'
          })
        }
        if (res.data.code === 0) {
          if (this.$route.query.isWho === 'admin') {
            this.$cookies.remove('ALoginInfoSuccessList')
            this.$router.push({ path: '/loginAndRegister/Alogin' })
          }
          if (this.$route.query.isWho === 'employees') {
            this.$cookies.remove('ELoginInfoSuccess')
            this.$router.push({ path: '/loginAndRegister/EloginOfMall' })
          }
        }
      })
    }
  },
  created () {
    if (this.$route.query.isWho === 'admin') {
      this.shops = JSON.parse(this.$cookies.get('ALoginInfoSuccessList'))
      this.email = this.shops[0].email
    }
    if (this.$route.query.isWho === 'employees') {
      this.shops.push(this.$cookies.get('ELoginInfoSuccess'))
      this.email = this.shops.email
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  .title {
    color: rgba(51, 51, 51, 1);
    text-align: center;
    font-size: 46px;
    font-weight: bold;
    margin-top: 99px;
    margin-bottom: 113px;
  }
  .email {
    color: rgba(153, 153, 153, 1);
    font-size: 24px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 35px;
  }
  .c-shops {
    width: 560px;
    max-height: 440px;
    margin: auto;
    overflow-y: auto;
    margin-bottom: 40px;
    ul {
      margin: 0;
      .shop {
        width: 560px;
        height: 120px;
        background: rgba(253, 194, 88, 1);
        box-shadow: 0px 30px 60px 0px rgba(255, 204, 111, 0.5);
        border-radius: 16px;
        margin: auto;
        margin-bottom: 40px;
        position: relative;
        .icon-icon02{
          font-size: 50px;
          color: #fff;
          position: absolute;
          right: 40px;
          top: 35px;
        }
        .storeName {
          padding-top: 30px;
          margin-top: 0;
          margin-bottom: 16px;
          padding-left: 40px;
          font-size: 22px;
          color: rgba(255, 255, 255, 1);
        }
        .website {
          margin: 0;
          padding-left: 40px;
          font-size: 22px;
          color: rgba(255, 255, 255, 1);
        }
      }
      .shop:last-child {
        margin-bottom: 0;
      }
    }
  }
  .c-to-other {
    width: 560px;
    height: 120px;
    background: rgba(253, 194, 88, 0.3);
    position: relative;
    border-radius: 16px;
    margin: auto;
    display: flex;
    align-items: center;
    .icon-tianjia {
      font-size: 50px;
      color: rgba(255, 255, 255, 0.8);
      position: absolute;
      right: 40px;
      top: 30px;
    }
    a {
      display: block;
      padding-left: 40px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(253, 208, 127, 1);
    }
  }
  .c-cancel {
    text-align: center;
    margin-top: 187px;
    margin-bottom: 100px;
    p {
      margin-top: 0;
      margin-bottom: 0;
      font-size: 20px;
      font-weight: 400;
      color: rgba(253, 208, 127, 1);
    }
  }
}
</style>
