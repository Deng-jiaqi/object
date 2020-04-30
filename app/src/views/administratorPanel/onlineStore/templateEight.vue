<template>
  <div>
    <header class="header">
      <p>{{$t('lang.templete.templeteEight.header.text1')}}</p>
      <div>
        <div class="header-box">
          <div class="menu">
            <div class="menu-gang"></div>
          </div>
          <p>{{$t('lang.templete.templeteEight.header.text2')}}</p>
          <div>
            <div>{{$t('lang.templete.templeteEight.header.text3')}}</div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="main-box1">
        <div v-for="(item, index) in $t('lang.templete.templeteEight.main.box1Data')" :key="index">
          <img :src=item.src alt="">
        </div>
      </div>
      <div class="main-box2">
        <div class="box2-title">
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
          <p>{{$t('lang.templete.templeteEight.main.text1')}}</p>
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
        </div>
        <div class="box2-content">
          <div v-for="(item, index) in $t('lang.templete.templeteEight.main.box1Content3')" :key="index">
            <div>
              <img :src="item.src" alt="">
            </div>
            <p>{{item.text1}}</p>
            <p>{{item.text2}}</p>
          </div>
        </div>
      </div>
      <div class="main-box3">
        <p>{{$t('lang.templete.templeteEight.main.imgText')}}</p>
      </div>
      <div class="main-box4">
        <div class="box2-title">
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
          <p>{{$t('lang.templete.templeteEight.main.text2')}}</p>
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
        </div>
        <div class="divBox">
          <img src="../../../assets/administratorPanel/templateImg/50.png" alt="">
        </div>
        <P class="box4-text1">{{$t('lang.templete.templeteEight.main.text3')}}</P>
        <P class="box4-text2">{{$t('lang.templete.templeteEight.main.text4')}}</P>
        <P class="box4-text3"><span>{{$t('lang.templete.templeteEight.main.text5')}}</span>
          &nbsp;&nbsp;&nbsp;<span>{{$t('lang.templete.templeteEight.main.text6')}}</span></P>
        <button>{{$t('lang.templete.templeteEight.main.btn')}}</button>
      </div>
      <div class="main-box5">
        <p class="box4-text1">{{$t('lang.templete.templeteEight.main.text7')}}</p>
        <p class="box4-text2">{{$t('lang.templete.templeteEight.main.text8')}}
        </p>
        <input type="text" :placeholder="$t('lang.templete.templeteEight.main.input')">
        <button>{{$t('lang.templete.templeteEight.main.btn2')}}</button>
      </div>
      <div class="main-box6">
        <div class="box2-title">
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
          <p>{{$t('lang.templete.templeteEight.main.text9')}}</p>
          <img src="../../../assets/administratorPanel/templateImg/bolangYD.png" alt="">
        </div>
        <div>
          <div class="divBox" v-for="(item, index) in $t('lang.templete.templeteEight.main.box5Content')" :key="index">
            <img :src=item.src alt="">
          </div>
        </div>
      </div>
      <div class="main-box7">
        <p>{{$t('lang.templete.templeteEight.main.text10')}}</p>
      </div>
    </main>
    <footer>
      <div>
        <h4>{{$t('lang.templete.templeteEight.footer.text1')}}</h4>
        <p class="about-text">{{$t('lang.templete.templeteEight.footer.text2')}}<span>{{$t('lang.templete.templeteEight.footer.text3')}}</span></p>
      </div>
      <div>
        <h4>{{$t('lang.templete.templeteEight.footer.text4')}}</h4>
        <p>{{$t('lang.templete.templeteEight.footer.text5')}}</p>
      </div>
      <div>
        <h4>{{$t('lang.templete.templeteEight.footer.text6')}}</h4>
        <p>{{$t('lang.templete.templeteEight.footer.text7')}}</p>
        <p>{{$t('lang.templete.templeteEight.footer.text8')}}</p>
      </div>
      <div>
        <h4>{{$t('lang.templete.templeteEight.footer.text9')}}</h4>
        <p>{{$t('lang.templete.templeteEight.footer.text10')}}</p>
      </div>
      <div>
        <input type="text" :placeholder="$t('lang.templete.templeteEight.footer.input')">
        <button>{{$t('lang.templete.templeteEight.footer.btn')}}</button>
      </div>
      <p>{{$t('lang.templete.templeteEight.footer.text11')}}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'templateEight'
}
</script>

<style scoped lang="less">
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .xiuShi {
    width: 34px;
    height: 3px;
    background-color: black;
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
  .fontCss{
    font-size:37px;
    color: black;
  }
  .btnCss{
    color: white;
    border-radius: 6px;
    outline: none;
    background-color: #393C4A;
    border: 0;
  }
  button:hover{
    background-color: #73788e;
  }
  .box4-text1{
    .fontCss;
  }
  .box4-text2{
    color: #999999;
  }
  .box4-text3{
    text-align: center;
    color: #999999;
    >span:nth-child(2){
      text-decoration:line-through;
    }
  }
  .inputCss{
    padding: 10px;
    width: 100%;
    border:2px solid rgba(0,0,0,1);
    border-radius: 6px;
  }
  .header {
    overflow: hidden;
    > p {
      width: 100%;
      text-align: center;
      height: 108px;
      line-height: 108px;
      margin: 0;
    }
    > div {
      width: 100%;
      height: 392px;
      overflow: hidden;
      background-size: 100%;
      .header-box {
        padding: 0 32px 50px 32px;
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
  .main-box1{
    padding: 31px;
    >div{
      margin-top: 22px;
      width:676px;
      height:676px;
      .divBox;
    }
  }
  .main-box2{
    padding: 30px;
    .box2-content{
      .flexBetween;
      flex-wrap: wrap;
      >div{
        >div{
          .divBox;
          width:318px;
          height:326px;
        }
        >p:nth-child(3){
          color: black;
          font-weight: bold;
        }
      }
    }
  }
  .box2-title{
    .flexBetween;
    >img{
      height: 20px;
      width: 98px;
    }
    >p{
      .fontCss;
      text-align: center;
    }
  }
  .main-box3{
    width: 100%;
    height: 870px;
    background-color: #EEEEEE;
    overflow: hidden;
    background-image: url("../../../assets/administratorPanel/templateImg/27rectangle.png");
    background-size: cover;
    .flexCss;
    >p{
      font-weight:bold;
      font-size: 53px;
      color: white;
    }
  }
  .main-box4{
    padding: 32px;
    >div:nth-child(2){
      width:674px;
      height:682px;
    }
    >button{
      width:674px;
      height:92px;
      .btnCss;
    }
  }
  .main-box5{
    background-color: #EDE8D7;
    padding: 35px;
    text-align: center;
    >p:nth-child(1){
      margin: 80px auto 88px auto;
    }
    p:nth-child(2){
      line-height: 44px;
      margin-bottom: 88px;
    }
    >input{
      .inputCss;
      height: 72px;
      background-color: #EDE8D7;
    }
    button{
      width:335px;
      height:92px;
      .btnCss;
      margin-top: 40px;
      margin-bottom: 220px;
    }
  }
  .main-box6{
    padding: 32px;
    >div:nth-child(2){
      .flexBetween;
      flex-wrap: wrap;
      >div{
        width:214px;
        height:224px;
        margin-top: 30px;
      }
    }
  }
  .main-box7{
    width: 100%;
    height: 146px;
    background-color: #28323C;
    color: white;
    .flexCss;
    >p{
      width: 600px;
      text-align: center;
      font-size: 27px;
    }
  }
  footer{
    padding: 36px;
    text-align: center;
    h4{
      margin-top: 102px;
    }
    p{
      color: #999999;
      font-size: 29px;
    }
    input{
      .inputCss;
      height: 72px;
      text-align: center;
      font-size: 29px;
    }
    button{
      .btnCss;
      width: 100%;
      height:92px;
      margin: 22px auto 196px auto;
    }
    >p:last-child{
      line-height: 40px;
    }
  }
  .about-text{
    width: 580px;
    margin: auto;
  }
</style>
