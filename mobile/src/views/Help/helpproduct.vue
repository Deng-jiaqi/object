<template>
  <div class="c-helpProduct">
    <p class="p-helpProduct">{{$t('lang.helpProduct.text1')}}</p>

    <div>
      <p class="p-one">{{$t('lang.helpProduct.text2')}}</p>
      <div>
        <p>{{$t('lang.helpProduct.text3')}}</p>
        <p>{{$t('lang.helpProduct.text4')}}</p>
        <span class="c-span">{{$t('lang.helpProduct.text5')}}</span>
        <p>{{$t('lang.helpProduct.text6')}}</p>
        <img src="../../assets/helpcenter/26.png" alt />
        <p>{{$t('lang.helpProduct.text6')}}</p>
      </div>
    </div>
    <br />

    <div>
      <p class="p-one">{{$t('lang.helpProduct.text7')}}</p>
      <div>
        <p>{{$t('lang.helpProduct.text8')}}</p>

        <p>{{$t('lang.helpProduct.text9')}}</p>

        <p>{{$t('lang.helpProduct.text10')}}</p>
        <img src="../../assets/helpcenter/27.png" alt />

        <p>{{$t('lang.helpProduct.text11')}}</p>
        <div>
          <img src="../../assets/helpcenter/28.1.png" alt />
          <img src="../../assets/helpcenter/28.2.png" alt />
        </div>
      </div>
    </div>
    <br />

    <div>
      <p class="p-one">{{$t('lang.helpProduct.text12')}}</p>
      <div>
        <p>{{$t('lang.helpProduct.text13')}}</p>
        <p>{{$t('lang.helpProduct.text14')}}</p>
        <p>{{$t('lang.helpProduct.text15')}}</p>
        <img src="../../assets/helpcenter/29.png" alt />

        <p>{{$t('lang.helpProduct.text16')}}</p>
        <div>
          <p>{{$t('lang.helpProduct.text17')}}</p>
          <p>{{$t('lang.helpProduct.text18')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.c-helpProduct {
  .p-helpProduct {
    color: red;
    font-size: 25px;
  }
  .p-one {
    font-size: 20px;
  }
  .c-span {
    color: red;
    font-size: 20px;
  }
}
</style>
