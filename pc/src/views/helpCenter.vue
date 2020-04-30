<template>
  <div class="c-helpCenter">
    <div class="c-return" @click="toreturn">
      <span>&lt;&nbsp;{{$t('lang.helpCenter.text10')}}</span>
    </div>
    <el-container class="el-helpCenter">
      <el-aside width="300px">
        <div class="c-total">
          <i class="el-icon-question"></i>
          <span>{{$t('lang.helpCenter.text1')}}</span>
        </div>
        <el-menu
          default-active="3"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#303133"
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
      </el-aside>

      <!-- 右 -->
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'helpCenter',
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
    toreturn () {
      this.$router.push({
        path: '/dashbord'
      })
    }
  }
}
</script>

<style scoped lang="less">
.c-helpCenter {
  .c-return {
    font-size: 20px;
    margin: 40px 0 0 70px;
    cursor: pointer;
    color: rgb(66, 103, 178);
  }
  .c-total {
    margin-left: 25px;
  }
  .el-helpCenter {
    margin-left: 50px;
    margin-top: 100px;
  }
  .el-icon-question {
    margin-right: 10px;
  }
  .el-menu-vertical-demo {
    height: 800px;
  }
  .el-main {
    padding-left: 60px;
  }
}
</style>
