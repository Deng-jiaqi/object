<template>
  <div>
    <header>
      <p>{{$t('lang.templete.templeteSix.header.text1')}}</p>
      <div>
        <div class="header-nav">
          <span>{{$t('lang.templete.templeteSix.header.text2')}}</span>
          <span>{{$t('lang.templete.templeteSix.header.text3')}}</span>
          <span>{{$t('lang.templete.templeteSix.header.text4')}}</span>
        </div>
        <div class="header-img-box">
          <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
        </div>
        <div>
          <span @click="Tbottom">点击下去</span>
        </div>
      </div>
    </header>
    <main>
      <div class="main-box1" id="mainBox1">
        <p>{{$t('lang.templete.templeteSix.main.content1.text1')}}</p>
        <div class="box1-content">
          <div>
            <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
          </div>
          <div>
            <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
          </div>
        </div>
      </div>
      <p class="main-text">
        {{$t('lang.templete.templeteSix.main.content1.text2')}}
      </p>
      <div class="main-box2">
        <div class="box2-content" v-for="(item, index) in $t('lang.templete.templeteSix.imgData')" :key="index">
          <div>
            <img :src=item.src alt="">
          </div>
          <p>{{item.text1}}</p>
          <p>{{item.text2}}</p>
        </div>
      </div>
      <p @click="QhImg" class="Right">点击滑动</p>
      <div class="main-box3">
        <p>{{$t('lang.templete.templeteSix.main.content3.text1')}}</p>
        <div class="box3-content">
          <div>
            <div>
              <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
            </div>
            <p>{{$t('lang.templete.templeteSix.main.content3.text2')}}</p>
            <p>{{$t('lang.templete.templeteSix.main.content3.price')}}</p>
          </div>
          <div>
            <div>
              <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
            </div>
            <p>{{$t('lang.templete.templeteSix.main.content3.text2')}}</p>
            <p>{{$t('lang.templete.templeteSix.main.content3.price')}}</p>
          </div>
        </div>
      </div>
      <div class="main-box4">
        <p class="box4-title">{{$t('lang.templete.templeteSix.main.content4.text1')}}</p>
        <p>{{$t('lang.templete.templeteSix.main.content4.text2')}}</p>
        <p>{{$t('lang.templete.templeteSix.main.content4.text3')}}</p>
        <div class="box4-content">
          <div class="box4-shop" v-for="(item, index) in $t('lang.templete.templeteSix.imgData')" :key="index">
            <div>
              <img :src=item.src alt="">
            </div>
            <p>{{item.text1}}</p>
            <p>{{item.text2}}</p>
          </div>
        </div>
        <p @click="QhImg2" class="Right">点击滑动</p>
      </div>
    </main>
    <div class="content-shop">
      <p class="box4-title">{{$t('lang.templete.templeteSix.main.content5.text1')}}</p>
      <div class="shop-box">
        <div>
          <img src="../../../assets/administratorPanel/templateImg/252.png" alt="">
        </div>
        <div>
          <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
        </div>
      </div>
      <p class="main-text">{{$t('lang.templete.templeteSix.main.content5.text2')}}</p>
      <div class="imgBoxCss1">
        <img src="../../../assets/administratorPanel/templateImg/198.png" alt="">
      </div>
      <p class="shop-text">{{$t('lang.templete.templeteSix.main.content5.text3')}}</p>
      <p class="shop-text">Title</p>
      <div class="btn-box">
        <button class="addBtn">{{$t('lang.templete.templeteSix.main.content5.btn')}}</button>
      </div>
    </div>
    <footer>
      <p class="footer-text">{{$t('lang.templete.templeteSix.footer.content1.text1')}}</p>
      <p class="footer-text2">{{$t('lang.templete.templeteSix.footer.content1.text3')}}</p>
        <div class="footer-box1">
        <input type="text" :placeholder="$t('lang.templete.templeteSix.footer.content1.input')">
        <button>{{$t('lang.templete.templeteSix.footer.content1.btn')}} </button>
      </div>
      <p class="footer-text">{{$t('lang.templete.templeteSix.footer.content2.text1')}}</p>
      <p class="footer-text2">{{$t('lang.templete.templeteSix.footer.content2.text2')}}</p>
      <div class="footer-shop">
        <div v-for="(item, index) in $t('lang.templete.templeteSix.footer.imgSrc')" :key="index">
          <img :src=item.src alt="">
        </div>
      </div>
      <p>点击滑动</p>
      <p class="footer-text">{{$t('lang.templete.templeteSix.footer.content3.text1')}}</p>
      <div class="footer-text4">
        <p>{{$t('lang.templete.templeteSix.footer.content3.text2')}}</p>
        <p>{{$t('lang.templete.templeteSix.footer.content3.text3')}}</p>
      </div>
      <div class="footer-text5">
        <p>{{$t('lang.templete.templeteSix.footer.content3.text4')}}</p>
        <p>{{$t('lang.templete.templeteSix.footer.content3.text5')}}</p>
        <p>{{$t('lang.templete.templeteSix.footer.content3.text6')}}</p>
      </div>
      <p>{{$t('lang.templete.templeteSix.footer.content3.text7')}}</p>
      <div class="footer-imgBox">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
      </div>
      <p class="footer-text6">{{$t('lang.templete.templeteSix.footer.content4.text1')}}</p>
      <p class="footer-text7">{{$t('lang.templete.templeteSix.footer.content4.text2')}}
        <span>{{$t('lang.templete.templeteSix.footer.content4.text3')}}</span>
      </p>
      <div class="footer-text8">
        <ul>
          <li>{{$t('lang.templete.templeteSix.footer.content4.text4')}}</li>
          <li>{{$t('lang.templete.templeteSix.footer.content4.text5')}}</li>
        </ul>
        <p>{{$t('lang.templete.templeteSix.footer.content4.text6')}}</p>
      </div>
      <p class="footer-text9">{{$t('lang.templete.templeteSix.footer.content4.text7')}}</p>
      <div class="footer-box1">
        <input type="text" :placeholder="$t('lang.templete.templeteSix.footer.content4.input')">
        <button>{{$t('lang.templete.templeteSix.footer.content4.btn')}}</button>
      </div>
      <p class="footer-text10">{{$t('lang.templete.templeteSix.footer.content5.text1')}}</p>
      <p>{{$t('lang.templete.templeteSix.footer.content5.text2')}}</p>
      <p>{{$t('lang.templete.templeteSix.footer.content5.text3')}}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'templateSix',
  methods: {
    Tbottom () {
      document.getElementById('mainBox1').scrollIntoView({ behavior: 'smooth' })
    },
    QhImg () {
      let lunbo = document.getElementsByClassName('main-box2')[0]
      let imgLength = document.getElementsByClassName('box2-content')
      lunbo.appendChild(imgLength[0])
    },
    QhImg2 () {
      let lunbo = document.getElementsByClassName('box4-content')[0]
      let imgLength = document.getElementsByClassName('box4-shop')
      lunbo.appendChild(imgLength[0])
    }
  }
}
</script>

<style scoped lang="less">
  .flexCss{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn{
    background:rgba(51,51,51,1);
    outline: none;
    border: 0;
    color: white;
  }
  .flexBetween{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .imgCss{
    max-height: 100%;
    max-width: 100%;
  }
  .fontSize53{
    color: black;
    font-size: 53px;
  }
  .fontColor{
    color: black;
  }
  .imgBoxCss{
    background-color: #E5E5E5;
    .flexCss;
    img{
      .imgCss;
    }
  }
  header{
    transition: all 0.5s linear;
    >p{
      text-align: center;
    }
    >div{
      padding: 80px 36px;
      background-color: #DCE3DA;
      .header-nav{
        .flexBetween;
      }
      .header-img-box{
        width: 680px;
        height: 252px;
        margin: 200px auto 200px auto;
        img{
          .imgCss;
        }
      }
      >div:nth-child(3){
        width: 200px;
        margin: auto;
        text-align: center;
      }
    }
  }
  main{
    background-color: #F4FBF2;
    .main-box1{
      padding: 42px;
      transition: all .5s linear;
      >p{
        margin: 150px auto 120px auto;
        text-align: center;
        .fontSize53;
        width: 346px;
        line-height: 60px;
      }
      .box1-content{
        display: flex;
        justify-content: space-between;
        div{
          .imgBoxCss;
        }
        >div:nth-child(1){
          width:306px;
          height:206px;
        }
        >div:nth-child(2){
          width:306px;
          height:410px;
          margin-top: 126px;
        }
      }
    }
    .main-box2{
      .flexBetween;
      height: 500px;
      width: 100%;
      overflow: hidden;
      position: relative;
      >div{
        width: 516px;
        height: 500px;
        transition: all .5s linear;
        margin-left: 50px;
        position: absolute;
        left: 900px;
        >div{
          width:516px;
          height:236px;
          transition:all .5s linear;
          .imgBoxCss;
        }
        >p:nth-child(2){
          .fontSize53;
          width: 390px;
        }
      }
      >div:nth-child(1){
        left: -600px;
      }
      >div:nth-child(2){
        left: 0;
      }
      >div:nth-child(3){
        left: 600px;
      }
    }
    .Right{
      text-align: right;
      padding: 20px;
    }
    .main-box3{
      padding: 44px;
      .box3-content{
        display: flex;
        justify-content: space-between;
        div:nth-child(1){
          margin-top: 116px;
        }
        >div{
          width: 268px;
          >div{
            height: 360px;
            .imgBoxCss;
          }
        }
        >div:nth-child(2){
          >div{
            height: 180px;
          }
        }
      }
    }
    .main-box4{
      >p{
        margin-left: 40px;
      }
      .box4-content{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .box4-shop{
          margin-left: 40px;
          div{
            width:476px;
            height:318px;
            .imgBoxCss;
          }
        }
        >div:nth-child(1){
          >div{
            width:476px;
            height:318px;
          }
        }
        >div:nth-child(2){
          >div{
            width:800px;
            height:636px;
          }
        }
      }
    }
  }
  .main-text{
    width: 484px;
    margin: 138px auto 240px auto;
  }
  .box4-title{
    color: black;
    font-size: 61px;
    margin: 0 0 0 40px;
  }
  .shop-box{
    display: flex;
    justify-content: space-between;
    padding: 44px;
    div{
      .imgBoxCss;
    }
    >div:nth-child(1){
      width:306px;
      height:204px;
    }
    >div:nth-child(2){
      width:306px;
      height:410px;
      margin-top: 126px;
    }
  }
  .imgBoxCss1{
    .imgBoxCss;
    width:466px;
    height:630px;
    margin: auto auto 98px auto;
  }
  .shop-text{
    .fontColor;
    font-size: 48px;
    width:466px;
    margin: auto auto 35px auto;
  }
  .btn-box{
    .addBtn{
      .btn;
      width:468px;
      height:94px;
    }
    width: 468px;
    margin: 116px auto 168px auto;
  }
  footer{
    padding: 192px 44px;
    background-color: #F4FBF2;
  }
  .footer-text{
    .fontSize53;
    margin: 0;
    width: 422px;
    line-height: 70px;
    letter-spacing: 4px;
  }
  .footer-text2{
    width: 586px;
    line-height: 40px;
  }
  .footer-box1{
    .flexBetween;
    margin: 126px auto 340px auto;
    input{
      width:370px;
      height:58px;
      padding: 10px;
      background:rgba(244,251,242,1);
      border:2px solid rgba(51,51,51,1);
      border-radius:2px;
      outline: none;
    }
    button{
      .btn;
      width:242px;
      height:78px;
    }
  }
  .footer-shop{
    display: -webkit-box;
    width: 100%;
    overflow: hidden;
    >div{
      margin-left: 20px;
      width:476px;
      height:490px;
      background:rgba(219,226,217,1);
      .flexCss;
    }
  }
  .footer-imgBox{
    .imgBoxCss;
    width:664px;
    height:268px;
    margin: 84px auto 350px auto;
  }
  .footer-text4{
    margin: 77px auto 56px auto;
    p{
      margin: 16px auto auto auto;
    }
  }
  .footer-text5{
    margin-bottom: 94px;
    p{
      margin: 16px auto auto auto;
    }
  }
  .footer-text6{
    .fontColor;
    font-size: 37px;
  }
  .footer-text7{
    width: 500px;
    line-height: 50px;
  }
  .footer-text8{
    .flexBetween;
    align-items: flex-end;
    width: 60%;
    ul{
      li:nth-child(2){
        margin-top: 50px;
      }
    }
  }
  .footer-text9{
    line-height: 50px;
  }
  .footer-text10{
    font-size: 32px;
    font-weight: bold;
    color: black;
  }
</style>
