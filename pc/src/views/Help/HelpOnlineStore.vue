<template>
  <div class="c-helpOnlineStore">
    <p class="p-helpOnlineStore">{{$t('lang.helpOnlineStore.text1')}}</p>
    <div>
      <div>
        <p>{{$t('lang.helpOnlineStore.text2')}}</p>
        <img src="../../assets/helpcenter/30.png" alt />

        <p>{{$t('lang.helpOnlineStore.text3')}}</p>
        <img src="../../assets/helpcenter/31.png" alt />
      </div>
      <span class="c-span">{{$t('lang.helpOnlineStore.text4')}}</span>
      <p>{{$t('lang.helpOnlineStore.text5')}}</p>
      <div>
        <p>{{$t('lang.helpOnlineStore.text6')}}</p>
        <p>{{$t('lang.helpOnlineStore.text7')}}</p>
      </div>

      <p>{{$t('lang.helpOnlineStore.text8')}}</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.c-helpOnlineStore {
  .p-helpOnlineStore {
    color: red;
    font-size: 30px;
  }
  .c-span {
    color: red;
    font-size: 20px;
  }
}
</style>
