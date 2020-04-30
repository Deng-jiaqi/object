<template>
  <div class="c-home">
    <div class="content-home">
      <p class="title">{{$t('lang.home.text1')}}</p>
      <div class="c-home-img">
        <img src="../../assets/administratorPanel/home/empty_state_2x@2x.png" alt="">
      </div>
      <div class="box-content">
        <div class="btns">
          <div @click="changeActive(0)" :class="active===0?'active':''" class="btn">
            <img src="../../assets/administratorPanel/home/add_product_blue@2x.png" alt />
          </div>
          <div @click="changeActive(1)" :class="active===1?'active':''" class="btn">
            <img src="../../assets/administratorPanel/home/pen@2x.png" alt />
          </div>
          <div @click="changeActive(2)" :class="active===2?'active':''" class="btn">
            <img src="../../assets/administratorPanel/home/earth@2x.png" alt />
          </div>
        </div>
        <div class="btm-details" v-show="active===0">
          <p class="btm-details-title">{{$t('lang.home.text5')}}</p>
          <p class="explain">{{$t('lang.home.text6')}}</p>
          <el-button @click='toAddproduct' type="primary">{{$t('lang.home.text2')}}</el-button>
        </div>
        <div class="btm-details" v-show="active===1">
          <p class="btm-details-title">{{$t('lang.home.text7')}}</p>
          <p class="explain">{{$t('lang.home.text8')}}</p>
          <el-button type="primary">{{$t('lang.home.text3')}}</el-button>
        </div>
        <div class="btm-details" v-show="active===2">
          <p class="btm-details-title">{{$t('lang.home.text9')}}</p>
          <p class="explain">{{$t('lang.home.text10')}}</p>
          <el-button @click='toAddDomain' type="primary">{{$t('lang.home.text4')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  methods: {
    changeActive (x) {
      this.active = x
    },
    toAddproduct () {
      this.$router.push({
        path: '/administratorPanel/productInventory/addShop'
      })
    },
    toAddDomain () {
      this.$router.push({ path: '/administratorPanel/domainInfo' })
    }
  }
}
</script>
<style lang="less" scoped>
.c-home {
  padding-top: 32px;
  .content-home {
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(1, 1, 1, 1);
      margin-bottom: 32px;
      padding-left: 15px;
    }
    .c-home-img {
      img {
        width: 100%;
        height: 250px;
      }
    }
    .box-content {
      border-top: 1px solid rgba(213, 213, 213, 1);
      border-radius: 2px;
      padding-bottom: 40px;
      .btns {
        display: flex;
        justify-content: space-between;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 63px;
          background: rgba(245, 245, 245, 1);
          width: 33.33%;
          border: 1px solid #dfe3e8;
          position: relative;
          transition: background-color ease 0.3s;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .active::after {
          content: "";
          display: block;
          width: 100%;
          height: 6px;
          position: absolute;
          top: -1px;
          left: 0;
          background: #4267b2;
        }
        .active {
          background-color: #fff;
          border-left: none;
          border-bottom: none;
        }
      }
      .btm-details {
        padding-left: 15px;
        font-size: 15px;
        .btm-details-title {
          padding-right: 25px;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .explain {
          padding-right: 25px;
          margin-bottom: 15px;
        }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
