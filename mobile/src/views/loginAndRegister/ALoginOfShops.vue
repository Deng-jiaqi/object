<template>
  <div class="content">
    <p class="title">{{$t('lang.loginOfEmail.text1')}}</p>
    <div class="c-loginout">
      <router-link
        :to="$t('lang.ALoginOfShops.text1.href')"
      >{{$t('lang.ALoginOfShops.text1.title')}}</router-link>
    </div>
    <p class="email">{{email}}</p>
    <div class="c-shops">
      <ul>
        <li
          @click="toShop(item.name,item.site)"
          class="shop"
          v-for="(item,index) in shops"
          :key="index"
        >
          <p class="shopname">{{item.name}}</p>
          <p class="shopsite">{{item.site}}</p>
          <img src="../../assets/loginAndRegister/arrow@3x@2x.png" />
        </li>
      </ul>
    </div>
    <div class="c-other">
      <router-link
        @click.native="toAnotherAccount"
        :to="$t('lang.ALoginOfShops.text3.href')"
      >{{$t('lang.ALoginOfShops.text3.title')}}</router-link>
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
    toShop (shopName, shopSite) {
      this.$router.push({
        name: 'ALoginOfShopPsw',
        query: {
          email: this.email,
          storeName: shopName,
          site: shopSite
        }
      })
    },
    toAnotherAccount () {
      this.$cookies.remove('ALoginInfoSuccessList')
    }
  },
  created () {
    console.log(this.$cookies.get('ALoginInfo'))
    this.email = this.$cookies.get('ALoginInfo').email
    this.shops = this.$cookies.get('ALoginInfo').shops
  }
}
</script>

<style lang='less' scoped>
.content {
  padding-left: 36px;
  padding-right: 36px;
  .title {
    margin-top: 20px;
    color: black;
    font-size: 1.25rem;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }
  .c-loginout {
    text-align: right;
    margin-top: 20px;
    margin-bottom: 20px;
    a {
      color: rgba(66, 103, 178, 1);
      font-size: 0.5625rem;
    }
  }
  .email {
    color: rgba(51, 51, 51, 1);
    font-size: 0.5625rem;
    margin-top: 0;
    margin-bottom: 0.8125rem;
  }
  .c-shops {
    max-height: 6.65625rem;
    overflow-y: auto;
    margin: auto;
    margin-bottom: 0.75rem;
    border: 0px solid rgba(198, 198, 198, 1);
    box-shadow: 0rem 0.125rem 0.1875rem 0rem rgba(0, 0, 0, 0.09);
    border-radius: 0.125rem;
    ul {
      margin: 0;
      .shop {
        height: 2.1875rem;
        background: rgba(244, 244, 244, 1);
        position: relative;
        border-bottom: 0.03125rem solid rgba(213, 213, 213, 1);
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
        }
        img {
          position: absolute;
          width: 0.8125rem;
          height: 0.8125rem;
          right: 0.625rem;
          top: 0.71875rem;
        }
      }
      .shop:hover {
        cursor: pointer;
      }
    }
  }
  .c-other {
    text-align: right;
    a {
      color: rgba(66, 103, 178, 1);
      font-size: 0.5625rem;
    }
  }
}
</style>
