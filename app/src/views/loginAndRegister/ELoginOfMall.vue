<template>
  <div>
    <div class="content">
      <p class="to-admin">
        <router-link
          @click.native="toAdmin"
          :to="$t('lang.loginOfMall.text.href')"
        >{{$t('lang.loginOfMall.text.title')}}</router-link>
      </p>
      <p class="title">{{$t('lang.loginOfMall.text1')}}</p>
      <div class="c-myinput">
        <my-input
          :width="'17.1875rem'"
          :height="'0.9375rem'"
          v-model="storeName"
          :placeholder="$t('lang.loginOfMall.text2')"
        />
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-2.7rem'"
              :text="$t('lang.loginOfMall.text6')"
            />
          </div>
        </transition>
        <transition name="fade">
          <div class="c-mytooltip" v-if="forshowTip2">
            <my-tooltip
              :width="'7.07rem'"
              :height="'6.25rem'"
              :left="'calc(50% - 4.7625rem)'"
              :top="'-2.7rem'"
              :text="message"
            />
          </div>
        </transition>
      </div>
      <div class="c-other">
        <router-link :to="$t('lang.loginOfMall.text3.href')">{{$t('lang.loginOfMall.text3.title')}}</router-link>
        <router-link :to="$t('lang.loginOfMall.text4.href')">{{$t('lang.loginOfMall.text4.title')}}</router-link>
      </div>
      <div class="c-mybutton">
        <my-button
          v-on:click.native="login"
          :myclass="isLocked?'cantclick':''"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.loginOfMall.text5')"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { ELoginOfMall } from "../../common/api/api";
import { storeNameValidate } from "../../utils/validate";
export default {
  name: "ELoginOfMall",
  data() {
    return {
      //   临时变量
      isLocked: false,
      message: "",
      storeName: "",
      //   ui
      forshowTip: false, // 点击按钮之后的总提示
      forshowTip2: false // 后端返回的提示
    };
  },
  methods: {
    toAdmin() {
      if (this.$cookies.get("ALoginInfoSuccessList")) {
        this.$router.push({
          path: "/loginAndRegister/loginOfRecent",
          query: { isWho: "admin" }
        });
      } else {
        this.$router.push({ path: "/loginAndRegister/ALogin" });
      }
    },
    login() {
      if (this.isLocked) {
        return;
      }
      this.isLocked = true;
      // 登录
      if (!storeNameValidate(this.storeName)) {
        this.forshowTip = true;
        setTimeout(() => {
          this.forshowTip = false;
        }, 2000);
        this.isLocked = false;
        return;
      }
      ELoginOfMall({
        Shopname: this.storeName
      }).then(res => {
        this.isLocked = false;
        if (res.data.code === 0) {
          this.storeName = "";
          this.message = res.data.msg;
          this.forshowTip2 = true;
          setTimeout(() => {
            this.forshowTip2 = false;
          }, 2000);
        } else {
          if (res.data.code === 1) {
            let ELoginInfo = {};
            ELoginInfo.storeName = res.data.data.Shopname;
            this.$cookies.set(
              "ELoginInfo",
              JSON.stringify(ELoginInfo),
              60 * 60 * 24 * 7
            );
            this.$router.push({ path: "/loginAndRegister/ELoginOfEmail" });
          }
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.content {
  .to-admin {
    margin-top: 80px;
    margin-bottom: 40px;
    padding-right: 60px;
    text-align: right;
    a {
      color: rgba(253, 208, 127, 1);
      font-size: 24px;
    }
  }
  .title {
    color: rgba(51, 51, 51, 1);
    font-size: 46px;
    text-align: center;
    margin-top: 60px;
    margin-bottom: 112px;
    font-weight: bold;
  }
  .c-myinput {
    display: flex;
    justify-content: center;
    position: relative;
    .c-mytooltip {
      //   position: relative;
    }
  }
  .c-other {
    width: 500px;
    margin: auto;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    a {
      color: rgba(102, 102, 102, 1);
      font-weight: Regular;
      font-size: 22px;
    }
  }
  .c-mybutton {
    display: flex;
    justify-content: center;
    margin-top: 178px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
