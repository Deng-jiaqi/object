<template>
  <div class="c-abandoned-orders">
    <p class="title">{{$t('lang.indexofAbandonOrder.text1')}}</p>
    <div class="nav clearfix">
      <router-link
        v-for="(item,index) in $t('lang.indexofAbandonOrder.text11')"
        :key="index"
        :to="item.href"
        :class="{active:myRoute===item.forActive}"
      >{{item.title}}</router-link>
    </div>
    <div class="c-operation clearfix">
      <el-input :placeholder=" $t('lang.indexofAbandonOrder.text2')" />
      <div
        class="operation"
        @mouseenter="filterConditionsVisible= true"
        @mouseleave="filterConditionsVisible= false"
      >
        <span>{{$t('lang.indexofAbandonOrder.text3')}}</span>
        <el-collapse-transition>
          <div class="hide-one" v-show="filterConditionsVisible">
            <div
              class="level-one state-restore"
              @mouseenter="restoreStateVisible= true"
              @mouseleave="restoreStateVisible= false"
            >
              {{$t('lang.indexofAbandonOrder.text4')}}
              <el-collapse-transition>
                <div v-show="restoreStateVisible" class="level-two">
                  <div>
                    <el-checkbox class="screening-checkbox" />
                    <span>{{$t('lang.indexofAbandonOrder.text5')}}</span>
                  </div>
                  <div>
                    <el-checkbox class="screening-checkbox" />
                    <span>{{$t('lang.indexofAbandonOrder.text6')}}</span>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
            <div
              class="level-one state-email"
              @mouseenter="emailStateVisible= true"
              @mouseleave="emailStateVisible= false"
            >
              {{$t('lang.indexofAbandonOrder.text7')}}
              <el-collapse-transition>
                <div v-show="emailStateVisible" class="level-two">
                  <div>
                    <el-checkbox class="screening-checkbox" />
                    <span>{{$t('lang.indexofAbandonOrder.text8')}}</span>
                  </div>
                  <div>
                    <el-checkbox class="screening-checkbox" />
                    <span>{{$t('lang.indexofAbandonOrder.text9')}}</span>
                  </div>
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!-- <Table :tableData='abandonedOrders'/> -->
    <router-view />
  </div>
</template>
<script>
export default {
  components: {

  },
  data () {
    return {
      // data
      abandonedOrders: [
        {
          serialNumber: '123456789',
          date: '2018',
          customerName: 'May',
          totalMoney: 5000,
          emailStatus: 0,
          restoreStatus: 0,
          note: ''
        },
        {
          serialNumber: '9846516',
          date: '2018',
          customerName: 'May',
          totalMoney: 5000,
          emailStatus: 1,
          restoreStatus: 0,
          note: ''
        },
        {
          serialNumber: '31223424',
          date: '2018',
          customerName: 'May',
          totalMoney: 5000,
          emailStatus: 2,
          restoreStatus: 0,
          note: ''
        }
      ],
      // ui
      filterConditionsVisible: false,
      restoreStateVisible: false,
      emailStateVisible: false
    }
  },
  computed: {
    myRoute () {
      // eslint-disable-next-line standard/computed-property-even-spacing
      return this.$route.path.split('/')[
        this.$route.path.split('/').length - 1
      ]
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.c-abandoned-orders {
  padding-top: 75px;
  padding-bottom: 75px;
  .title {
    font-size: 30px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 16px;
  }
  .nav {
    padding-left: 36px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    border-radius: 4px;
    a {
      font-size: 18px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 70px;
      height: 67px;
      display: block;
      float: left;
      margin-right: 80px;
    }
  }
  .c-operation {
    height: 92px;
    border: 1px solid rgba(222, 222, 222, 1);
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    padding-left: 27px;
    display: flex;
    align-items: center;
    /deep/ .el-input {
      width: 52.6%;
      min-width: 450px;
    }
    /deep/ .el-input__inner {
      border-radius: 2px;
      height: 58px;
      border: 1px solid #dedede;
      padding-left: 37px;
    }
    /deep/ .el-input__inner:focus {
      border-color: #385ca5;
    }
    .operation {
      background: rgba(248, 248, 248, 1);
      border: 1px solid #dedede;
      border-left: none;
      float: left;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      position: relative;
      padding-left: 24px;
      padding-right: 34px;
      line-height: 58px;
      font-size: 14px;
      height: 56px;
      span:hover {
        cursor: pointer;
      }
      .hide-one {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        top: 57px;
        left: 0px;
        z-index: 10;
        .level-one {
          text-align: center;
          height: 50px;
          line-height: 50px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
          position: relative;
        }
        .level-one:hover {
          cursor: pointer;
        }
        .level-two {
          position: absolute;
          left: 100%;
          top: 0;
          z-index: 10;
          width: 100%;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(235, 235, 235, 1);
          box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
          div {
            background-color: #fff;
            width: 100%;
            line-height: 35px;
          }
          .screening-checkbox {
            margin-right: 5px;
          }
        }
      }
    }
    .payment-status {
      border-left: none;
      span:hover {
        cursor: pointer;
      }
      .hide-two {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        top: 57px;
        left: 0px;
        z-index: 10;
        div {
          text-align: center;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
      }
    }
    .delivery-status {
      border-left: none;
      span:hover {
        cursor: pointer;
      }
      .hide-three {
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        width: 100%;
        top: 57px;
        left: 0px;
        z-index: 10;
        div {
          text-align: center;
          height: 50px;
          line-height: 50px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
      }
    }
  }
}
p {
  margin: 0;
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
.active {
  position: relative;
}
.active::after {
  display: "block";
  content: "";
  background: rgba(253, 165, 6, 1);
  width: 50px;
  height: 7px;
  position: absolute;
  top: 60px;
  left: calc(50% - 25px);
}
</style>
