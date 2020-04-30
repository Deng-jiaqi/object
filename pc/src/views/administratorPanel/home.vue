<template>
  <div class="c-home">
    <div class="content-home">
      <p class="title">{{$t('lang.home.text1')}}</p>
      <div class="box-content">
        <div class="top">
          <div class="top-left">
            <div
              class="operation-btn"
              :class="active===1?'active':'normal'"
              @click="changeActive(1)"
            >
              <span :class="lang==='en-us'?'foren1':''" class="inner-text">{{$t('lang.home.text2')}}</span>
              <img
                src="../../assets/administratorPanel/home/add_product@2x.png"
                class="inner-icon"
                v-show="active===1"
                :class="lang==='en-us'?'icon-foren':''"
              />
              <img
                src="../../assets/administratorPanel/home/add_product_blue@2x.png"
                class="inner-icon"
                v-show="active!==1"
                :class="lang==='en-us'?'icon-foren':''"
              />
            </div>
            <div
              class="operation-btn"
              :class="active===2?'active':'normal'"
              @click="changeActive(2)"
            >
              <span :class="lang==='en-us'?'foren2':''" class="inner-text">{{$t('lang.home.text3')}}</span>
              <img
                v-show="active!==2"
                src="../../assets/administratorPanel/home/pen@2x.png"
                alt
                class="inner-icon"
                :class="lang==='en-us'?'icon-foren':''"
              />
              <img
                v-show="active===2"
                src="../../assets/administratorPanel/home/white@2x.png"
                alt
                class="inner-icon"
                :class="lang==='en-us'?'icon-foren':''"
              />
            </div>
            <div
              class="operation-btn"
              :class="active===3?'active':'normal'"
              @click="changeActive(3)"
            >
              <span :class="lang==='en-us'?'foren3':''" class="inner-text">{{$t('lang.home.text4')}}</span>
              <img
                v-show="active!==3"
                src="../../assets/administratorPanel/home/earth@2x.png"
                alt
                class="inner-icon"
                :class="lang==='en-us'?'icon-foren':''"
              />
              <img
                v-show="active===3"
                src="../../assets/administratorPanel/home/domain_white.png"
                alt
                class="inner-icon"
                :class="lang==='en-us'?'icon-foren':''"
              />
            </div>
          </div>
          <div class="top-right">
            <img src="../../assets/administratorPanel/home/empty_state_2x@2x.png" alt />
          </div>
        </div>
        <div class="btm" v-show="active===1">
          <div class="btm-left">
            <p class="text1">{{$t('lang.home.text5')}}</p>
            <p class="text2">{{$t('lang.home.text6')}}</p>
          </div>
          <div class="btm-right">
            <el-button @click="toAddproduct" type="primary">{{$t('lang.home.text2')}}</el-button>
          </div>
        </div>
        <div class="btm" v-show="active===2">
          <div class="btm-left">
            <p class="text1">{{$t('lang.home.text7')}}</p>
            <p class="text2">{{$t('lang.home.text8')}}</p>
          </div>
          <div class="btm-right">
            <el-button type="primary" @click="toCustomtemplete">{{$t('lang.home.text3')}}</el-button>
          </div>
        </div>
        <div class="btm" v-show="active===3">
          <div class="btm-left">
            <p class="text1">{{$t('lang.home.text9')}}</p>
            <p class="text2">{{$t('lang.home.text10')}}</p>
          </div>
          <div class="btm-right">
            <el-button @click="toAddDomain" type="primary">{{$t('lang.home.text4')}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 1
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
    toCustomtemplete () {
      console.log(6666)
      this.$router.push({
        path: '/administratorPanel/themes'
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
  padding-top: 85px;
  padding-bottom: 114px;
  .content-home {
    margin: auto;
    max-width: 841px;
    .title {
      font-size: 30px;
      font-weight: bold;
      color: rgba(1, 1, 1, 1);
      margin-bottom: 31px;
    }
    .box-content {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(213, 213, 213, 1);
      border-radius: 4px;
      .top {
        padding: 42px 38px 59px 42px;
        display: flex;
        justify-content: space-between;
        // @media (max-width: 1120px) {
        //   padding-right: 20px;
        // }
        .top-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: 30px;
          padding-bottom: 30px;
          .operation-btn {
            width: 226px;
            height: 75px;
            border: 1px solid rgba(220, 220, 220, 1);
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            border-bottom: none;
            line-height: 75px;
            position: relative;
            cursor: pointer;
            transition: background-color ease 0.3s;
            .inner-icon {
              position: absolute;
              top: 17px;
              left: 16px;
            }
            .icon-foren {
              left: 8px;
            }
            .inner-text {
              display: inline-block;
              width: 100%;
              height: 100%;
              text-align: center;
              border-bottom: 1px solid rgba(220, 220, 220, 1);
            }
            .foren1 {
              margin-left: -10px;
            }
            .foren2 {
              margin-left: 8px;
            }
            .foren3 {
              margin-left: 20px;
            }
          }
          .active {
            background-color: rgba(66, 103, 178, 1);
          }
          .normal {
            background-color: rgba(245, 245, 245, 1);
            color: rgba(1, 1, 1, 1);
          }
        }
        .top-right {
          img {
            width: 450px;
            height: 344px;
          }
          // @media (max-width: 1120px) {
          //   img {
          //     width: 400px;
          //     height: 305px;
          //   }
          // }
        }
      }
      .btm {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(210, 210, 210, 1);
        padding: 34px 23px 30px 34px;
        align-items: center;
        .btm-left {
          .text1 {
            font-size: 18px;
            color: rgba(1, 1, 1, 1);
            margin-bottom: 17px;
          }
          .text2 {
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
  }
}
p {
  margin: 0;
}
</style>
