<template>
  <div class="container">
    <header class="myheader">
      <span>{{$t('lang.administratorPanelLayout.text1')}}</span>
      <el-popover placement="bottom" trigger="click" v-model="userOperationVisible">
        <ul class="hide" v-show="userOperationVisible">
          <li @click="loginOut">{{$t('lang.administratorPanelLayout.text2')}}</li>
        </ul>
        <div ref="cUser" class="c-user" slot="reference">
          <!-- <div class="c-img" v-if="sellerimg"> -->
          <img v-if="sellerimg" :src="this.$store.state.headerImg" alt :onerror="defaultimg" />
          <!-- </div> -->
          <!-- <div class="c-img" v-if="!sellerimg"> -->
          <img v-if="!sellerimg" src="../../assets/administratorPanel/home/defaulthead.png" />
          <!-- </div> -->
          <span class="c-name">{{this.$store.state.headerName}}</span>
        </div>
      </el-popover>
    </header>
    <div class="content" v-loading="!currentPermissionList.length>0">
      <el-menu
        class="nav"
        background-color="#fff"
        text-color="rgb(0,0,0)"
        active-text-color="#fff"
        :default-active="activeIndex"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- 主页 -->
        <el-menu-item
          index="1"
          :route="$t('lang.administratorPanelLayout.one.href')"
          v-show="includePermission(currentPermissionList,['1'])"
        >
          <span class="iconfont icon-shouye layout-icon"></span>
          <span slot="title">{{$t('lang.administratorPanelLayout.one.title')}}</span>
        </el-menu-item>
        <!-- 订单管理 -->
        <el-submenu index="2" v-show="includePermission(currentPermissionList,['2'])">
          <template slot="title">
            <span class="iconfont icon-dingdan layout-icon"></span>
            <span>{{$t('lang.administratorPanelLayout.two.title')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-show="includePermission(currentPermissionList,['3'])"
              index="2-1"
              :route="$t('lang.administratorPanelLayout.two.child.one.href')"
            >
              <span>{{$t('lang.administratorPanelLayout.two.child.one.title')}}</span>
            </el-menu-item>
            <!-- <el-menu-item
              index="2-2"
              :route="$t('lang.administratorPanelLayout.two.child.two.href')"
            >
              <span>{{$t('lang.administratorPanelLayout.two.child.two.title')}}</span>
            </el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
        <!-- 产品 -->
        <el-submenu index="3" v-show="includePermission(currentPermissionList,['4'])">
          <template slot="title">
            <span class="iconfont icon-fenlei layout-icon"></span>
            <span>{{$t('lang.administratorPanelLayout.three.title')}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="3-1"
              v-show="includePermission(currentPermissionList,['5'])"
              :route="$t('lang.administratorPanelLayout.three.child.one.href')"
            >{{$t('lang.administratorPanelLayout.three.child.one.title')}}</el-menu-item>
            <el-menu-item
              index="3-2"
              v-show="includePermission(currentPermissionList,['6'])"
              :route="$t('lang.administratorPanelLayout.three.child.two.href')"
            >{{$t('lang.administratorPanelLayout.three.child.two.title')}}</el-menu-item>
            <el-menu-item
              index="3-3"
              v-show="includePermission(currentPermissionList,['7'])"
              :route="$t('lang.administratorPanelLayout.three.child.three.href')"
            >{{$t('lang.administratorPanelLayout.three.child.three.title')}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 折扣 -->
        <el-menu-item
          index="4"
          v-show="includePermission(currentPermissionList,['8'])"
          :route="{path:`${$t('lang.administratorPanelLayout.four.href')}`,query: {status:'all'}}"
        >
          <span class="iconfont icon-biaoqian layout-icon"></span>
          <span slot="title">{{$t('lang.administratorPanelLayout.four.title')}}</span>
        </el-menu-item>
        <!-- 在线商店 -->
        <el-menu-item
          index="5"
          v-show="includePermission(currentPermissionList,['9'])"
          :route="$t('lang.administratorPanelLayout.five.href')"
        >
          <!-- <el-menu-item index="5" v-show="includePermission(currentPermissionList,['9'])"> -->
          <span class="iconfont icon-dianpu layout-icon"></span>
          <span slot="title">{{$t('lang.administratorPanelLayout.five.title')}}</span>
        </el-menu-item>
        <!-- 设置 -->
        <el-menu-item
          index="6"
          v-show="includePermission(currentPermissionList,['10'])"
          :route="$t('lang.administratorPanelLayout.six.href')"
        >
          <span class="iconfont icon-shezhi layout-icon"></span>
          <span slot="title">{{$t('lang.administratorPanelLayout.six.title')}}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="c-right" v-loading.lock="rightLoadingVisible">
      <transition
        mode="out-in"
        enter-active-class="fadeIn faster"
        leave-active-class="fadeOut faster"
      >
        <router-view class="animated" />
      </transition>
    </div>
  </div>
</template>

<script>
import { loginOut, upDateHeadImg } from '@/common/api/api.js'
import { mapState } from 'vuex'
import includePermission from '@/utils/judgePermissions.js'
export default {
  name: 'AdministratorPanelLayout',
  data() {
    return {
      // 变量
      sellername: null,
      sellerimg: null,
      defaultimg:
        'this.src="' +
        require('../../assets/administratorPanel/home/defaulthead.png') +
        '"',
      // ui
      userOperationVisible: false,
      loadingVisble: true
    }
  },
  computed: {
    ...mapState(['currentPermissionList']),
    ...mapState(['rightLoadingVisible']),
    // 当前激活菜单的 index
    activeIndex() {
      // return this.$route.path
      let path = this.$route.path.split('/')
      switch (path[2]) {
        case 'home': // home
          return '1'
        case 'orderManagement': // 订单管理
          switch (path[3]) {
            case 'effectiveOrders':
              return '2-1'
            case 'abandonedOrders':
              return '2-2'
            default:
              break
          }
          break
        case 'productInventory': // 产品
          switch (path[3]) {
            case 'allProducts':
              return '3-1'
            case 'inventory':
              return '3-2'
            case 'productLine':
              return '3-3'
          }
          break
        case 'indexOfDiscount': // 折扣
          return '4'
        case 'settings': // 折扣
          return '6'
        default:
          return ''
      }
      return ''
    }
  },
  methods: {
    includePermission: includePermission,
    handleOpen() {
      // console.log(666)
    },
    handleClose() {
      // console.log(666)
    },
    loginOut() {
      loginOut().then(res => {
        if (res.data.code === 1) {
          this.$router.push({
            path: '/loginAndRegister/loginOfRecent',
            query: { isWho: 'admin' }
          })
        }
      })
    }
  },
  created() {
    upDateHeadImg({
      sellerid: this.$cookies.get('sellerid')
    }).then(res => {
      console.log(res)
      let name = res.data.data.firstname + res.data.data.lastname
      this.$store.commit('setHeaderImg', res.data.data.head_img)
      this.$store.commit('setHeaderName', name)
      this.sellerimg = this.$store.state.headerImg
      this.sellername = name
    })
  }
}
</script>

<style scoped lang='less'>
.container {
  .myheader {
    height: 70px;
    background: rgba(66, 103, 178, 1);
    box-shadow: 0px 4px 7px 1px rgba(95, 95, 95, 0.18);
    padding-left: 52px;
    color: rgba(255, 255, 255, 1);
    line-height: 70px;
    font-size: 20px;
    font-weight: bold;
    min-width: 940px;
    display: flex;
    justify-content: space-between;
    padding-right: 52px;
    .c-user {
      cursor: pointer;
      font-size: 16px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .c-name {
        height: 70px;
        width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      }
    }
    .c-user:hover {
      background-color: hsla(0, 0%, 100%, 0.08);
    }
  }
  .content {
    position: absolute;
    left: 0;
    width: 244px;
    top: 70px;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
    z-index: 100;
    .nav {
      // padding-top: 20px;
    }
    .c-title {
      margin: 0;
      margin-left: 27px;
      margin-top: 30px;
      display: flex;
      align-items: center;
      margin-bottom: 45px;
      img {
        width: 47px;
        height: 47px;
        margin-right: 18px;
      }
      span {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .el-menu {
      border-right: none;
      .layout-icon {
        margin-right: 6px;
      }
    }
    .el-menu-item.is-active {
      background-color: rgba(66, 103, 178, 1) !important;
    }
    .el-menu-item:hover {
      background-color: rgba(66, 103, 178, 1) !important;
    }
  }
  .c-right {
    position: absolute;
    top: 70px;
    left: 244px;
    right: 0;
    bottom: 0;
    background-color: #f5f6f8;
    min-width: 720px;
    overflow-y: auto;
    padding-left: 40px;
    padding-right: 40px;
  }
}
.hide {
  width: 100%;
  background-color: #fff;
  border: 1px solid #ebebeb;
  box-shadow: 0px 8px 25px 2px rgba(0, 0, 0, 0.05);
  li {
    height: 40px;
    bottom: 1px solid #ebebeb;
    color: #303133;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
}
.content /deep/ .el-submenu__title:hover {
  background-color: rgba(66, 103, 178, 1) !important;
}
.el-popover {
  min-width: 0;
}
ul {
  margin: 0;
}
</style>
