<template>
  <div class="c-customizeDomain">
    <p class="text1">{{$t('lang.customizeDomain.text1')}}</p>
    <div class="c-box">
      <p class="title">{{$t('lang.customizeDomain.text3')}}</p>
      <input
        type="text"
        :placeholder="$t('lang.customizeDomain.text4')"
        class="customize"
        v-model="customizeDomain"
      />
    </div>
        <div class="c-mybutton">
        <my-button
          v-on:click.native="determine"
          :width="'17.5rem'"
          :height="'2.875rem'"
          :text="$t('lang.customizeDomain.text5')"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'customizeDomain',
  data () {
    return {
      //   变量
      customizeDomain: ''
    }
  },
  methods: {
    determine () {
      console.log(1111)
    }
  }
}
</script>

<style scoped lang='less'>
.c-customizeDomain {
  .text1 {
    font-size: 40px;
    color: rgba(51, 51, 51, 1);
    padding-left: 96px;
    margin-top: 61px;
    font-weight: bold;
    margin-bottom: 102px;
  }
  .c-box {
    width: 558px;
    height: 186px;
    margin: auto;
    margin-bottom: 360px;
    background: rgba(255, 255, 255, 1);
    border: 0px solid rgba(239, 238, 238, 1);
    box-shadow: 0px 30px 60px 0px rgba(204, 204, 204, 0.65);
    border-radius: 10px;
    .title {
      padding-left: 22px;
      padding-top: 22px;
      font-weight: bold;
      margin-bottom: 23px;
      font-size: 30px;
      color: rgba(51, 51, 51, 1);
    }
    .customize {
      width: calc(100% - 80px);
      height: 70px;
      outline: none;
      background: rgba(244, 244, 244, 1);
      border: 1px solid rgba(253, 194, 88, 1);
      border-radius: 4px;
      margin-left: 22px;
      padding-left: 22px;
    }
  }
  .c-mybutton {
      display: flex;
      justify-content: center;
  }
}
</style>
