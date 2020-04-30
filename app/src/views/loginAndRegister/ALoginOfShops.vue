<template>
  <div>
    <div class="content">
      <!-- <div class="cancellation">
        <router-link
        @click.native = 'cancellation'
        :to="$t('lang.ALoginOfShops.text3.href')">
          {{$t('lang.ALoginOfShops.text3.title')}}
        </router-link>
      </div> -->
      <p class="title">{{$t('lang.ALoginOfShops.text1')}}</p>
      <p class="email">{{email}}</p>
      <div class="c-shops">
        <ul>
          <li class="shop" @click="toShop(item.name,item.site)" v-for="(item,index) in shops" :key="index">
            <p class="storeName">{{item.name}}</p>
            <p class="website">{{item.site}}</p>
            <span class="iconfont icon-icon02"></span>
          </li>
        </ul>
      </div>
      <div class="c-to-other">
        <span class="iconfont icon-tianjia"></span>
        <router-link
        @click.native='toAnotherAccount'
          :to="$t('lang.ALoginOfShops.text2.href')"
        >{{$t('lang.ALoginOfShops.text2.title')}}</router-link>
      </div>
      <div class="c-cancellation">
        <router-link
          :to="$t('lang.ALoginOfShops.text3.href')"
        >{{$t('lang.ALoginOfShops.text3.title')}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ALoginOfShops',
  data () {
    return {
      // 变量
      email: '',
      shops: []
    }
  },
  methods: {
    toShop (x, y) {
      this.$router.push({
        name: 'ALoginOfShopPsw',
        query: {
          email: this.email,
          storeName: x,
          site: y
        }
      })
    },
    toAnotherAccount () {
      this.$cookies.remove('ALoginInfoSuccessList')
    }
  },
  created () {
    this.email = this.$cookies.get('ALoginInfo').email
    this.shops = this.$cookies.get('ALoginInfo').shops
  }
}
</script>

<style scoped lang='less'>
.content {
  .cancellation {
        text-align: right;
        padding-right: 100px;
        margin-top: 40px;
    a {
      font-size: 20px;
      color: #fdd07f;
    }
  }
  .title {
    margin-top: 99px;
    margin-bottom: 113px;
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
    font-size: 46px;
    text-align: center;
  }
  .email {
    margin-top: 0;
    margin-bottom: 35px;
    text-align: center;
    color: rgba(153, 153, 153, 1);
    font-size: 24px;
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
        .icon-icon02 {
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
    margin-bottom: 188px;
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
  .c-cancellation {
      text-align: center;
      margin-bottom: 100px;
      a {
          font-size: 20px;
          color: rgba(253, 208, 127, 1);
      }
  }
}
</style>
