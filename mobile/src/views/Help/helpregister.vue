<template>
  <div class="c-helpRegister">
    <p class="p-helpRegister">{{$t('lang.helpRegister.text1')}}</p>

    <div class="c-one">
      <p>{{$t('lang.helpRegister.text2')}}</p>
      <img src="../../assets/helpcenter/1.png" alt />
      <p>{{$t('lang.helpRegister.text3')}}</p>
      <img src="../../assets/helpcenter/2.png" alt />
      <p>{{$t('lang.helpRegister.text4')}}</p>
      <img src="../../assets/helpcenter/3.png" alt />
      <p>{{$t('lang.helpRegister.text5')}}</p>
      <img src="../../assets/helpcenter/4.png" alt />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.c-helpRegister {
  .p-helpRegister {
    color: red;
    font-size: 25px;
  }
  .c-one {
    font-size: 15px;
  }
}
</style>
