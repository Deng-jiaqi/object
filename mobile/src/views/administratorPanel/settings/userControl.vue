<template>
  <div class="userControl">
    <div class="addSet-header">
      <h1>{{$t('userControl.header.title')}}</h1>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        <span>{{$t('userControl.header.back')}}</span>
      </p>
    </div>
    <el-row class="addSet-box">
      <el-col :span="24">
        <h3>{{$t('userControl.content.text1')}}</h3>
        <p>
          {{$t('userControl.content.text2')}}
          <el-link type="primary" :underline="false">{{$t('userControl.content.text3')}}</el-link>
          {{$t('userControl.content.text4')}}
          <el-link type="primary" :underline="false">{{$t('userControl.content.text5')}}</el-link>
          {{$t('userControl.content.text6')}}
          <el-link type="primary" :underline="false">{{$t('userControl.content.text7')}}</el-link>
          {{$t('userControl.content.text8')}}
        </p>
      </el-col>
      <el-col :span="24" class="addSet-two-box">
        <div>
          <h3>{{$t('userControl.content.text9')}}</h3>
          <p>
            <span>{{join_time}}</span>
          </p>
        </div>
        <div>
          <h3>{{$t('userControl.content.text10')}}</h3>
          <p>{{$t('userControl.content.text11')}}</p>
        </div>
        <div>
          <h3>{{$t('userControl.content.text12')}}</h3>
          <p>{{$t('userControl.content.text13')}}</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="set-twoBox">
      <el-col :span="24">
        <h3>{{$t('userControl.content.text14')}}</h3>
      </el-col>
      <el-col :span="24">
        <!--        // 账户所有者-->
        <div class="set-two-right">
          <div>
            <h3>{{$t('userControl.content.text15')}}</h3>
            <div class="userContent">
              <div class="block">
                <el-avatar :size="50" :src="head_img"></el-avatar>
              </div>
              <div class="user-margin">
                <p class="Username-change">
                  <el-link type="primary" :underline="false" @click="adminDetail">{{name}}</el-link>
                </p>
                <p>
                  {{$t('userControl.content.text16')}}
                  <span>{{last_login}}</span>
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <!--        // 员工账户-->
        <div class="set-staff-right">
          <div class="set-staff-box">
            <h3 style="width: 70%">
              {{$t('userControl.content.text17')}}
              <span>{{staffLength}}</span>
              {{$t('userControl.content.text18')}}
            </h3>
            <p>
              <el-link
                type="primary"
                :underline="false"
                @click="addUser"
                v-if="staffLength < 2"
              >{{$t('userControl.content.btn1')}}</el-link>
            </p>
          </div>
          <ul class="setUl">
            <li class="setUl-li" v-for="(item, index) in use" :key="index">
              <div class="userContent">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="item.head_img === null
                              ? item.head_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                               : item.head_img"
                    @error="errorHandler"
                  >
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                  </el-avatar>
                </div>
                <div class="user-margin">
                  <p class="Useremployeesname-change">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="routerUserDetail(item)"
                    >{{item.firstname + item.lastname}}</el-link>
                  </p>
                  <p>
                    <span v-if="item.status === -1">{{$t('userControl.content.li1')}}</span>
                    <span v-else-if="item.last_login === null">{{$t('userControl.content.li2')}}</span>
                    <span
                      v-else-if="item.status === 1"
                    >{{$t('userControl.content.li3')}}{{item.last_login}}</span>
                  </p>
                </div>
              </div>
              <p>{{item.privilege === 1 ? staffLv[0] : staffLv[1]}}</p>
            </li>
            <li class="setUl-li" v-for="(item, index) in staff.wait" :key="'k1' + index">
              <div class="userContent">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="item.head_img === null
                   ? item.head_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                    : item.head_img"
                    @error="errorHandler"
                  >
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                  </el-avatar>
                </div>
                <div class="user-margin">
                  <p class="Useremployeesname-change">
                    <el-link
                      type="primary"
                      :underline="false"
                      @click="routerUserDetail(item)"
                    >{{item.firstname + item.lastname}}</el-link>
                  </p>
                  <p>
                    <span v-if="item.status === -1">{{$t('userControl.content.li1')}}</span>
                    <span v-else-if="item.last_login === null">{{$t('userControl.content.li2')}}</span>
                    <span
                      v-else-if="item.status === 1"
                    >{{$t('userControl.content.li3')}}{{item.last_login}}</span>
                  </p>
                </div>
              </div>
              <p>{{item.privilege === 1 ? staffLv[0] : staffLv[1]}}</p>
            </li>
            <template v-if="unuse.length > 0">
              <li class="setUl-li2" v-if="hideClick">
                <p style="margin-left: 20px;color: black">{{$t('userControl.content.li5')}}</p>
                <div class="userContent-li" v-for="(item, index) in unuse" :key="'k2'+ index">
                  <div class="userContent">
                    <div class="block">
                      <el-avatar
                        :size="50"
                        :src="item.head_img === null
                       ? item.head_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                        : item.head_img"
                        @error="errorHandler"
                      >
                        <img
                          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                        />
                      </el-avatar>
                    </div>
                    <div>
                      <p class="Useremployeesname-change">
                        <el-link
                          type="primary"
                          :underline="false"
                          @click="routerUserDetail(item)"
                        >{{item.firstname + item.lastname}}</el-link>
                      </p>
                      <p>
                        <span v-if="item.status === -1">{{$t('userControl.content.li1')}}</span>
                        <span v-else-if="item.last_login === null">{{$t('userControl.content.li2')}}</span>
                        <span
                          v-else-if="item.status === 1"
                        >{{$t('userControl.content.li3')}}{{item.last_login}}</span>
                      </p>
                    </div>
                  </div>
                  <p>{{item.privilege === 1 ? staffLv[0] : staffLv[1]}}</p>
                </div>
              </li>
              <li class="setUl-li-hide">
                <el-row>
                  <el-col :span="12">&nbsp;</el-col>
                  <el-col :span="12">
                    <p class="showClickText">
                      <el-link
                        type="primary"
                        @click="hideClick = !hideClick"
                        :underline="false"
                      >{{hideClick === false ? $t('userControl.content.li6') : $t('userControl.content.li7')}}</el-link>
                    </p>
                  </el-col>
                </el-row>
              </li>
            </template>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Uaccount } from '../../../common/api/api'
export default {
  name: 'userControl',
  data () {
    return {
      hideClick: false, // 显示隐藏暂停的员工
      head_img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 账户所有者头像
      last_login: '', // 账户所有者上次登录时间
      join_time: '', // 加入时间
      sellerid: '', // 账户管理者id
      name: '', // 账户所有者名字
      staff: {}, // 员工账户所有数据
      unuse: [], // 员工暂停
      use: [], // 员工正常使用
      wait: [], // 员工等待
      staffLength: 0,
      staffLv: ['Full access', 'Limited  access'] // 员工全部权限为1， 部分为0
    }
  },
  methods: {
    errorHandler () {
      return true
    },
    // 返回产品页面
    backTop () {
      this.$router.push({ path: '/administratorPanel/settings/set' })
    },
    // 添加员工
    addUser () {
      this.$router.push({
        path: '/settings/addUser'
      })
    },
    // 账户所有者跳转
    adminDetail () {
      this.$router.push({
        path: '/settings/userDetail',
        query: { sellerid: this.sellerid, id: 'admin' }
      })
    },
    // 跳转用户详情
    routerUserDetail (item) {
      this.$router.push({
        query: { sellerid: item.sellerid, id: 'staff' },
        path: '/settings/userDetail'
      })
    }
  },
  created () {
    Uaccount({}).then(resp => {
      this.head_img = resp.data.data.head_img
      this.last_login = resp.data.data.last_login
      this.join_time = resp.data.data.join_time
      this.name = resp.data.data.name
      this.staff = resp.data.data.staff
      this.staffLength = Number(this.staff.unuse.length) + Number(this.staff.wait.length) + Number(this.staff.use.length)
      this.unuse = resp.data.data.staff.unuse
      this.use = resp.data.data.staff.use
      this.sellerid = resp.data.data.sellerid
    })
  }
}
</script>

<style scoped lang="less">
@import "../../../common/css/common";
.Username-change {
  // width: 80%;
  word-wrap: break-word;
  word-break: break-all;
}
.Useremployeesname-change {
  // width: 80%;
  word-wrap: break-word;
  word-break: break-all;
}
.addSet-header {
  .flexBetween;
  height: 120px;
}
.userControl {
  padding: 30px;
}
.setUl {
  margin: 0;
  border-radius: 4px;
  > .setUl-li {
    border-bottom: 1px solid #e3e3e3;
    background-color: white;
    .flexBetween;
    padding: 10px 20px 20px 10px;
  }
  .setUl-li2 {
    background-color: #f5f6f8;
    > .userContent-li {
      .setUl-li;
      background-color: #f5f6f8;
    }
    > p {
      margin-top: 0;
      padding-top: 16px;
    }
  }
}
.addSet-box {
  .addSet-two-box {
    .flexBetween;
    background-color: white;
    border: 1px solid #e3e3e3;
    padding: 20px;
  }
}
.set-twoBox {
  border-top: 1px solid #e3e3e3;
  margin: 30px auto 50px auto;
  padding-top: 20px;
  > div:nth-child(1) {
    margin-top: 0;
  }
  .set-two-right {
    .flexBetween;
    align-items: end;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    padding: 20px;
    background-color: white;
    margin-top: 20px;
  }
  .set-staff-right {
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    background-color: white;
    margin-top: 20px;
    > div:nth-child(1) {
      padding: 20px;
    }
    .set-staff-box {
      .flexBetween;
      > h3 {
        font-size: 16px;
      }
    }
  }
}
.userContent {
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
  }
}
.setUl-li-hide {
  padding: 10px 0;
}
.user-margin {
  p {
    margin: 6px auto;
  }
}
.showClickText {
  text-align: right;
  padding-right: 18px;
}
</style>
