<template>
  <div class="c-helpCenter">
    <div class="c-toreturn">
      <span class="toreturn" @click="togt">&lt;&nbsp;{{$t('lang.helpCenter.text10')}}</span>
    </div>
    <el-container class="el-helpCenter">
      <el-aside width="125px">
        <div class="c-total">
          <i class="el-icon-question"></i>
          <span>{{$t('lang.helpCenter.text1')}}</span>
        </div>

        <el-row class="tac">
          <el-col>
            <el-menu
              default-active
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#409EFF"
            >
              <!-- 注册 -->
              <el-submenu index="/help/helpRegister">
                <template slot="title">
                  <i class="el-icon-s-check"></i>
                  <span slot="title">{{$t('lang.helpCenter.text2')}}</span>
                </template>
              </el-submenu>

              <!-- 登录 -->

              <el-submenu index="/help/helpLogin">
                <template slot="title">
                  <i class="el-icon-s-custom"></i>
                  <span>{{$t('lang.helpCenter.text3')}}</span>
                </template>
              </el-submenu>

              <!-- 主页 -->
              <el-submenu index="/help/helpHome">
                <template slot="title">
                  <i class="el-icon-s-home"></i>
                  <span>{{$t('lang.helpCenter.text4')}}</span>
                </template>
              </el-submenu>

              <!-- 订单 -->
              <el-submenu index="/help/helpOrder">
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>{{$t('lang.helpCenter.text5')}}</span>
                </template>
              </el-submenu>

              <!-- 产品 -->
              <el-submenu index="/help/helpProduct">
                <template slot="title">
                  <i class="el-icon-s-cooperation"></i>
                  <span>{{$t('lang.helpCenter.text6')}}</span>
                </template>
              </el-submenu>

              <!-- 折扣 -->
              <el-submenu index="/help/helpDiscount">
                <template slot="title">
                  <i class="el-icon-s-ticket"></i>
                  <span>{{$t('lang.helpCenter.text7')}}</span>
                </template>
              </el-submenu>

              <!-- 在线商城 -->
              <el-submenu index="/help/helpOnlineStore">
                <template slot="title">
                  <i class="el-icon-s-shop"></i>
                  <span>{{$t('lang.helpCenter.text8')}}</span>
                </template>
              </el-submenu>

              <!-- 设置 -->
              <el-submenu index="/help/helpSetting">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>{{$t('lang.helpCenter.text9')}}</span>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({
        path: '/helpCenter' + key
      })
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    togt () {
      this.$router.push({
        path: '/dashbord'
      })
    }
  }
}
</script>

<style scoped lang="less">
.c-helpCenter {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .c-toreturn {
    padding: 10px 0 10px 5px;
    .toreturn {
      font-size: 16px;
      color: rgba(36, 79, 165, 1);
    }
  }

  .el-helpCenter {
    margin-top: 10px;
    .el-icon-question {
      padding-right: 10px;
      padding-left: 10px;
    }
  }
  .el-main {
    margin-top: -20px;
  }
}
</style>
