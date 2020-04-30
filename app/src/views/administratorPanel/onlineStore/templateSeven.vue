<template>
  <div>
    <header class="header">
      <p>{{$t('lang.templete.templeteSeven.header.text1')}}</p>
      <div>
        <div class="header-box">
          <div class="menu">
            <div class="menu-gang"></div>
          </div>
          <p>{{$t('lang.templete.templeteSeven.header.text2')}}</p>
          <div>
            <div>u</div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="main-box1">
        <div class="box1-content">
          <p class="box1-text1">{{$t('lang.templete.templeteSeven.main.content2.text1')}}</p>
          <p class="box1-text2">{{$t('lang.templete.templeteSeven.main.content2.text2')}}</p>
        </div>
        <p class="box1-text3">{{$t('lang.templete.templeteSeven.main.content1.text1')}}</p>
        <p class="box1-text4">{{$t('lang.templete.templeteSeven.main.content1.text2')}}</p>
        <div class="box1-imgBox">
          <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
        </div>
        <div class="box1-textBox">
          <p class="box1-text1">{{$t('lang.templete.templeteSeven.main.content1.text3')}}</p>
          <p>{{$t('lang.templete.templeteSeven.main.content1.text4')}}</p>
        </div>
        <div class="box1-content3Box">
          <div class="box1-content3" v-for="(item, index) in $t('lang.templete.templeteSeven.main.imgData')" :key="index">
            <div>
              <img :src=item.src alt="">
            </div>
            <p>{{item.text1}}</p>
            <p>{{item.price}}</p>
          </div>
        </div>
      </div>
      <div class="main-box2">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
      </div>
      <div class="box1-content">
        <p class="box1-text1">{{$t('lang.templete.templeteSeven.main.content2.text1')}}</p>
        <p class="box1-text2">{{$t('lang.templete.templeteSeven.main.content2.text2')}}</p>
      </div>
      <p class="FormText">{{$t('lang.templete.templeteSeven.main.content2.text3')}}</p>
      <div class="lunBox">
        <swiper :options="swiperOption">
          <swiper-slide  v-for="(item, index) in $t('lang.templete.templeteSeven.main.mainBox3')" :key="index">
            <p>{{item.text1}}</p>
            <p>{{item.text2}}</p>
            <p>{{item.text3}}</p>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
      <div class="main-box4">
        <p>As seen in</p>
        <div class="box4-content">
          <div class="box4-imgBox" v-for="(item,index) in $t('lang.templete.templeteSeven.main.bo4Logo')" :key="index">
            <img :src=item.src alt="">
          </div>
        </div>
      </div>
      <div class="main-box5">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
      </div>
      <div class="main-box6">
        <p>{{$t('lang.templete.templeteSeven.main.content2.text1')}}</p>
        <p>{{$t('lang.templete.templeteSeven.main.content2.text2')}}</p>
      </div>
      <div class="main-box7">
        <p>{{$t('lang.templete.templeteSeven.main.content3.text1')}}</p>
        <div class="box7-content">
          <div v-for="(item, index) in $t('lang.templete.templeteSeven.main.box6Img')" :key="index">
            <img :src=item.src alt="">
          </div>
        </div>
        <div class="box7-content2">
          <div>
            <swiper :options="swiperOption1">
              <swiper-slide  v-for="(item, index) in $t('lang.templete.templeteSeven.main.box7Text')" :key="index">
                <p>{{item.text1}}</p>
                <p>{{item.text2}}</p>
              </swiper-slide>
            </swiper>
            <div class="swiper-pagination1"></div>
          </div>
        </div>
      </div>
      <div class="main-box8">
        <p>{{$t('lang.templete.templeteSeven.main.content3.text8')}}</p>
        <div>
          <input type="text" :placeholder="$t('lang.templete.templeteSeven.main.content3.input')">
          <span>确定</span>
        </div>
      </div>
    </main>
    <footer>
      <p class="ColorSize">{{$t('lang.templete.templeteSeven.footer.text1')}}</p>
      <p>{{$t('lang.templete.templeteSeven.footer.text2')}}</p>
      <div class="footer-hr"></div>
      <p class="ColorSize">{{$t('lang.templete.templeteSeven.footer.text3')}}</p>
      <p>{{$t('lang.templete.templeteSeven.footer.text4')}}</p>
      <div class="footer-hr"></div>
      <p class="ColorSize">{{$t('lang.templete.templeteSeven.footer.text5')}}</p>
      <div class="footer-inputBox">
        <input type="text" :placeholder="$t('lang.templete.templeteSeven.footer.input')">
        <button>{{$t('lang.templete.templeteSeven.footer.btn')}}</button>
      </div>
      <div class="footer-text">
        <p>{{$t('lang.templete.templeteSeven.footer.text7')}}</p>
        <p>{{$t('lang.templete.templeteSeven.footer.text8')}}</p>
        <p>{{$t('lang.templete.templeteSeven.footer.text9')}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'templateSeven',
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          renderBullet: function (index, className) {
            return '<li class="' + className + '" style="list-style: none;width: 20px;height: 20px;' +
              'background-color: #C6C7C8;border-radius: 20px;margin-left: 20px;color: white;"></li>'
          },
          clickable: true,
          bulletClass: 'Myli', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active'
        },
        autoplay: 3000, // 轮播间隔时间
        loop: true, // 无线循环
        grabCursor: true
      },
      swiperOption1: {
        pagination: {
          el: '.swiper-pagination1',
          renderBullet: function (index, className) {
            return '<li class="' + className + '" style="list-style: none;width: 20px;height: 20px;' +
              'background-color: #C6C7C8;border-radius: 20px;color: white;"></li>'
          },
          clickable: true,
          bulletClass: 'Myli1', // 需设置.my-bullet样式
          bulletActiveClass: 'my-bullet-active1'
        },
        autoplay: 3000, // 轮播间隔时间
        loop: true, // 无线循环
        grabCursor: true
      }
    }
  }
}
</script>

<style scoped lang="less">
  .lunBox{
    padding: 46px;
  }
  .my-bullet-active{
    background: #ff6600;
    opacity: 1;
  }
  .className{
    background-color: #0086b3;
  }
  .Myli{
    margin-left: 20px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: #C6C7C8;
    list-style: none;
  }
  .swiper-pagination{
    position: relative;
    .flexCss;
    width: 100%;
    height: 100px;
    margin: auto;
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ColorSize{
    color: black;
    font-weight: bold;
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .xiuShi {
    width: 34px;
    height: 3px;
    background-color: white;
    position: absolute;
    content: "";
  }
  .divBox {
    .flexCss;
    background-color: #F0F1F1;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .fontCss {
    color: black;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 4px;
    text-align: center;
    width: 440px;
    margin: auto;
  }
  .header {
    overflow: hidden;
    > p {
      width: 100%;
      text-align: center;
      color: white;
      height: 108px;
      line-height: 108px;
      margin: 0;
      background: rgba(54, 58, 68, 1);
    }

    > div {
      width: 100%;
      height: 392px;
      background: #F1F2F3;
      overflow: hidden;
      background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
      background-size: 100%;

      .header-box {
        color: white;
        padding: 73px 32px 50px 32px;
        .flexBetween;

        .menu {
          .flexCss;

          .menu-gang {
            .xiuShi;
            position: relative;
            margin-right: 20px;
          }

          .menu-gang:after {
            .xiuShi;
            top: 14px;
          }

          .menu-gang:before {
            .xiuShi;
            bottom: 14px;
          }
        }
      }
    }
  }
  .box1-text2 {
    width: 450px;
    text-align: center;
    margin: 26px auto auto auto;
    line-height: 50px;
  }
  .main-box1 {
    padding: 32px;
  }
  .box1-content {
    width: 600px;
    margin: 90px auto 218px auto;
  }
  .box1-text1 {
    .fontCss;
  }
  .box1-text3 {
    .fontCss;
    width: 100%;
  }
  .box1-text4 {
    .box1-text2;
    margin: 62px auto 180px auto;
    width: 100%;
  }
  .box1-imgBox {
    .divBox;
    margin-bottom: 66px;
    width: 686px;
    height: 314px;
  }
  .box1-textBox {
    .divBox;
    flex-direction: column;
    text-align: center;
    width: 686px;
    height: 504px;

    > p:nth-child(1) {
      margin: 70px auto 30px auto;
      line-height: 60px;
    }

    > p:nth-child(2) {
      width: 620px;
      line-height: 39px;
    }
  }
  .box1-content3Box {
    .flexBetween;
    flex-wrap: wrap;
    .box1-content3 {
      margin-top: 106px;
      > div {
        .divBox;
        width: 292px;
        height: 292px;
        padding: 20px;
      }
      p {
        text-align: center;
      }
      p:nth-child(3) {
        font-weight: bold;
        color: black;
      }
    }
  }
  .main-box2 {
    .divBox;
    width: 750px;
    height: 314px;
  }
  .FormText {
    .fontCss;
    margin-bottom: 134px;
  }
  .main-box3 {
    overflow: hidden;
    width: 100%;
    height: 580px;
    position: relative;

    .box3-content {
      margin: auto 40px;
      border: 1px solid red;
    }

    > div {
      position: absolute;
    }

    > div:nth-child(1) {
      left: 900px;
    }

    > div:nth-child(2) {
      left: 0;
    }

    > div:nth-child(3) {
      left: 800px;
    }
  }
  .anniu {
    .flexBetween;
    width: 60%;
    margin: auto;
  }
  .main-box4{
    width: 100%;
    height: 1720px;
    background-color: #242424;
    overflow: hidden;
    >p{
      text-align: center;
      font-size:53px;
      font-weight: bold;
      color: white;
      margin-top: 126px;
    }
    .box4-content{
      width: 315px;
      margin: auto;
      >div{
        margin-top: 40px;
        width:314px;
        height:314px;
        .divBox;
        background-color: #2C2D2E;
      }
    }
  }
  .main-box5{
    .divBox;
    width:750px;
    height:286px;
  }
  .main-box6{
    width: 100%;
    height: 304px;
    >p:nth-child(1){
      .fontCss;
      margin-top: 80px;
      line-height: 80px;
    }
    >p:nth-child(2){
      text-align: center;
    }
  }
  .main-box7{
    background-color: #333333;
    overflow: hidden;
    color: white;
    >p{
      .fontCss;
      color: white;
      margin: 128px auto 50px auto;
      text-align: center;
    }
    .box7-content{
      .flexCss;
      flex-wrap: wrap;
      >div{
        .divBox;
        width:370px;
        height:370px;
        background-color: #2C2D2E;
        border: 1px solid #3D3E41;
      }
    }
    .box7-content2{
      width: 100%;
      height: 440px;
      .flexCss;
      >div{
        width: 390px;
        text-align: center;
        .swiper-pagination1{
          .flexBetween;
          width: 40%;
          margin: auto;
        }
      }
    }
  }
  .main-box8{
    height: 280px;
    width: 100%;
    p{
      .fontCss;
      margin: 60px auto 44px auto;
      width: 100%;
      font-size: 37px;
    }
    >div{
      width: 100%;
      text-align: center;
      input{
        width:354px;
        height:58px;
        border:2px solid rgba(204,204,204,1);
        padding: 10px;
        outline: none;
      }
    }
  }
  footer{
    background-color: #F2F2F2;
    padding: 113px 34px 60px 34px;
    .footer-inputBox{
      input{
        width: 100%;
        height: 70px;
        padding: 10px;
        outline: none;
        border:2px solid rgba(153,153,153,1);
        background-color: #F2F2F2;
      }
      button{
        width:204px;
        height:82px;
        background:rgba(99,99,99,1);
        color: white;
        outline: none;
        border: 0;
        margin-top: 32px;
      }
    }
    .footer-text{
      width: 400px;
      margin: 190px auto auto auto;
      text-align: center;
    }
    .footer-hr{
      width: 100%;
      height: 2px;
      background-color: #C6C7C8;
      margin: 87px auto 70px auto;
    }
  }
</style>
