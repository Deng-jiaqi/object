<template>
  <div class="c-addDomain">
    <p class="textdomain">{{$t('lang.addDomain.text1')}}</p>
    <div class="c-box">
      <p class="text title">{{$t('lang.addDomain.text3')}}</p>
      <p class="text domain">
        <span>{{$t('lang.addDomain.text4')}}</span>&nbsp;&nbsp;&nbsp;
        <span>xxxxxx</span>
      </p>
      <p class="text state">
        <span>{{$t('lang.addDomain.text5')}}</span>&nbsp;&nbsp;&nbsp;
        <span>xxxxx</span>
      </p>
      <p class="text time">
          <span>{{$t('lang.addDomain.text6')}}</span>&nbsp;&nbsp;&nbsp;
          <span>xxxxxx</span>
      </p>
    </div>
    <div class="c-mybutton">
        <my-button
          @click.native="custom"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.addDomain.text7')"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddDomain',
  methods: {
    custom () {
      this.$router.push({ path: '/administratorPanel/customizeDomain' })
    }
  }
}
</script>

<style scoped lang='less'>
.c-addDomain {
  .textdomain {
    margin-top: 61px;
    margin-left: 96px;
    margin-bottom: 81px;
    color: rgba(51, 51, 51, 1);
    font-size: 40px;
    font-weight: bold;
  }
  .c-box {
    width: 558px;
    height: 340px;
    margin: auto;
    margin-bottom: 360px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(239, 238, 238, 1);
    box-shadow: 0px 30px 60px 0px rgba(204, 204, 204, 0.65);
    border-radius: 10px;
    .text {
      padding-left: 22px;
    }
    .title {
      color: rgba(0, 0, 0, 1);
      font-size: 30px;
      padding-top: 22px;
      margin-bottom: 45px;
      font-weight: bold;
    }
    .domain {
      margin-bottom: 58px;
      span:first-child {
        font-size: 26px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
      span:nth-child(2) {
        color: rgba(102, 102, 102, 1);
        font-size: 24px;
      }
    }
    .state {
      margin-bottom: 58px;
      span:first-child {
        font-size: 26px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
      span:nth-child(2) {
        color: rgba(102, 102, 102, 1);
        font-size: 24px;
      }
    }
    .time {
       span:first-child {
        font-size: 26px;
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
       span:nth-child(2) {
        color: rgba(102, 102, 102, 1);
        font-size: 24px;
      }
    }
  }
  .c-mybutton {
      display: flex;
      justify-content: center;
  }
}
</style>
