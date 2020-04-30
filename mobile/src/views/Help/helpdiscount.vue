<template>
  <div class="c-helpDiscount">
    <p class="p-helpDiscount">{{$t('lang.helpDiscount.text1')}}</p>
    <div>
      <p>{{$t('lang.helpDiscount.text2')}}</p>
      <p>{{$t('lang.helpDiscount.text3')}}</p>
      <p>{{$t('lang.helpDiscount.text4')}}</p>
      <span class="c-span">{{$t('lang.helpDiscount.text5')}}</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.c-helpDiscount {
  img {
    width: 200px;
  }
  .p-helpDiscount {
    color: red;
    font-size: 25px;
  }
  .c-span {
    color: red;
    font-size: 20px;
  }
}
</style>
