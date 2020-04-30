<template>
  <div class="c-content">
    <div class="c-cancel">
      <p @click="cancellation">{{$t('lang.loginOfRecent.text1')}}</p>
    </div>
    <p class="title">{{$t('lang.loginOfRecent.text2')}}</p>
    <!-- <p class="email">{{email}}</p> -->
    <div class="c-shops">
      <ul>
        <li
          @click="toShop(item.token,item.sellerid)"
          class="shop"
          v-for="(item,index) in shops"
          :key="index"
        >
          <p class="shopname">{{item.storeName}}</p>
          <p class="email">{{item.email}}</p>
          <p class="shopsite">{{item.site}}</p>
          <img src="../../assets/loginAndRegister/arrow@3x@2x.png" />
        </li>
      </ul>
    </div>
    <div class="to-other">
      <router-link
        :to="$route.query.isWho==='admin'?$t('lang.loginOfRecent.text3.href2'):$t('lang.loginOfRecent.text3.href1')"
      >{{$t('lang.loginOfRecent.text3.title')}}</router-link>
    </div>
  </div>
</template>

<script>
import { recentLogin } from '../../common/api/api'
import { mapActions } from 'vuex'
import { pullAt } from 'lodash'
export default {
  name: 'ELoginOfRecent',
  data () {
    return {
      //   临时变量
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
      this.$router.push({ path: '/loginAndRegister/ALogin' })
    },
    async toShop (x, y) {
      let res = await recentLogin({ token: x, sellerid: y })
      console.log(res)
      if (res.data.code === 1) {
        this.$cookies.set('creater', res.data.data.is_creater)
        this.$cookies.set('sellerid', res.data.data.sellerid)
        this.$cookies.set('sellername', res.data.data.sellername)
        this.$cookies.set('sellerimg', res.data.data.seller_head)
        await this.getPermissionListForLoginSuccess()
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
    },
    ...mapActions(['getPermissionListForLoginSuccess'])
  },
  created () {
    console.log(window.location.href.split('='))
    if (this.$route.query.isWho === 'admin') {
      this.shops = JSON.parse(this.$cookies.get('ALoginInfoSuccessList'))
      console.log(this.shops)
    }
    if (this.$route.query.isWho === 'employees') {
      this.shops.push(this.$cookies.get('ELoginInfoSuccess'))
    }
    // 去重 (登录成功返回后再登录多个相同的最近访问商店)
    let deleteIndexArr = []
    let lenth = this.shops.length
    for (let i = 0; i < lenth - 1; i++) {
      for (let k = i + 1; k <= lenth - 1; k++) {
        if (
          this.shops[i].sellerid === this.shops[k].sellerid
        ) {
          deleteIndexArr.push(i) // 因为都是push新的最近登录，所以前面的是旧的
          break
        }
      }
    }
    console.log(deleteIndexArr)
    pullAt(this.shops, deleteIndexArr)
    console.log(this.shops)
  }
}
</script>

<style scoped lang="less">
.c-content {
  padding-left: 36px;
  padding-right: 36px;
  .c-cancel {
    p {
      color: rgba(66, 103, 178, 1);
      font-size: 0.5625rem;
      text-align: right;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    p:hover {
      cursor: pointer;
    }
  }
  .title {
    text-align: left;
    color: rgba(0, 0, 0, 1);
    font-size: 20px;
    font-weight: Bold;
    margin-top: 0;
    margin-bottom: 20px;
  }
  .c-shops {
    max-height: 6.455rem;
    overflow-y: auto;
    margin: auto;
    margin-bottom: 0.75rem;
    border: 0px solid rgba(198, 198, 198, 1);
    box-shadow: 0rem 0.125rem 0.1875rem 0rem rgba(0, 0, 0, 0.09);
    border-radius: 0.125rem;
    ul {
      margin: 0;
      .shop {
        background: rgba(244, 244, 244, 1);
        position: relative;
        border-bottom: 0.0625rem solid rgba(213, 213, 213, 1);
        .shopname {
          padding-left: 0.75rem;
          color: rgba(0, 0, 0, 1);
          font-size: 0.5625rem;
          margin: 0;
          padding-top: 0.375rem;
          margin-bottom: 0.375rem;
        }
        .shopsite {
          font-size: 0.5rem;
          color: rgba(102, 102, 102, 1);
          margin: 0;
          padding-left: 0.75rem;
          margin-bottom: 0.3rem;
        }
        .email {
          font-size: 0.5625rem;
          padding-left: 0.75rem;
          margin-bottom: 0.3rem;
        }
        img {
          position: absolute;
          width: 0.8125rem;
          height: 0.8125rem;
          right: 0.625rem;
          top: 1.35rem;
        }
      }
      .shop:hover {
        cursor: pointer;
      }
    }
  }
  .c-store-info:hover {
    cursor: pointer;
  }
  .to-other {
    a {
      color: rgba(66, 103, 178, 1);
      font-size: 0.5625rem;
      text-decoration: none;
    }
  }
}
p {
  margin: 0;
}
</style>
