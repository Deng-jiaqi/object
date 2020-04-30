<template>
  <div class="container">
    <header class="myheader">
      <span @click="drawerVisible=true" class="iconfont icon-gengduo1"></span>
      <span>{{$t('lang.administratorPanelLayout.text1')}}</span>
        <el-popover popper-class='administratorPanel-layout-el-popover' placement="bottom" trigger="click" v-model="userOperationVisible">
          <ul class="hide" v-show="userOperationVisible">
            <li @click="loginOut">{{$t('lang.administratorPanelLayout.text2')}}</li>
          </ul>
          <div ref="cUser" class="c-user" slot="reference">
            <div class="c-img" v-show="sellerimg">
              <img :src="this.$store.state.headerImg" alt :onerror="defaultimg" />
            </div>
            <div class="c-img" v-show="!sellerimg">
              <img src="../../assets/administratorPanel/home/defaulthead.png" />
            </div>
          </div>
        </el-popover>
    </header>
    <el-drawer
      :show-close="false"
      :direction="'ltr'"
      size="10rem"
      :visible.sync="drawerVisible"
      v-loading="!currentPermissionList.length>0"
    >
      <div slot="title" class="drawer-header">{{sellername}}</div>
      <div class="c-navs">
        <el-menu
          background-color="#fff"
          text-color="rgb(0,0,0)"
          active-text-color="#fff"
          :default-active="activeIndex"
          :router="true"
          @select="menuToActive"
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
    </el-drawer>
    <div class="c-content" v-loading.lock="rightLoadingVisible">
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
  data () {
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
      loadingVisble: true,
      drawerVisible: false
    }
  },
  computed: {
    ...mapState(['currentPermissionList']),
    ...mapState(['rightLoadingVisible']),
    // 当前激活菜单的 index
    activeIndex () {
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
    menuToActive () {
      this.drawerVisible = false
    },
    loginOut () {
      loginOut().then(res => {
        if (res.data.code === 1) {
          this.$router.push({ path: '/dashbord' })
        }
      })
    }
  },
  created () {
    upDateHeadImg({
      sellerid: this.$cookies.get('sellerid')
    }).then(resp => {
      let name = resp.data.data.firstname + resp.data.data.lastname
      this.$store.commit('setHeaderImg', resp.data.data.head_img)
      this.$store.commit('setHeaderName', name)
      this.sellerimg = this.$store.state.headerImg
      this.sellername = name
    })
  }
}
</script>
<style lang='less'>
.administratorPanel-layout-el-popover {
    min-width: 100px;
}
</style>
<style scoped lang='less'>
.container {
  height: 100vh;
  .myheader {
    line-height: 60px;
    background: rgba(66, 103, 178, 1);
    box-shadow: 0px 2px 3px 1px rgba(95, 95, 95, 0.18);
    padding-left: 20px;
    padding-right: 20px;
    color: rgba(255, 255, 255, 1);
    line-height: 60px;
    font-size: 15px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    .icon-gengduo1 {
      font-size: 30px;
    }
    .c-user {
      cursor: pointer;
      font-size: 8px;
      height: 100%;
      padding-left: 5px;
      padding-right: 5px;
      .c-img {
        display: flex;
        align-items: center;
        height: 100%;
        img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .c-content {
    background-color: #f5f6f8;
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}
.hide {
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

ul {
  margin: 0;
}
.drawer-header {
  height: 25px;
  line-height: 25px;
  font-size: 17px;
}
.c-navs {
  height: 100%;
  .iconfont {
    font-size: 24px;
    margin-right: 15px;
    display: inline-block;
  }
}

/deep/ .el-menu {
  border-right: none;
}
/deep/ .el-submenu__title {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}
/deep/ .el-menu-item {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}
/deep/ .el-menu-item.is-active {
  background-color: rgba(66, 103, 178, 1) !important;
  color: #fff;
}
/deep/ .el-menu-item:hover {
  background-color: rgba(66, 103, 178, 1) !important;
}
/deep/ .el-submenu__title:hover {
  background-color: rgba(66, 103, 178, 1) !important;
}
/deep/ #el-drawer__title {
  text-align: center;
}
</style>
