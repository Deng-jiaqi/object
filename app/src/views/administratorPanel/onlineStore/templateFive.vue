<template>
  <div class="templateFive">
    <header>
      <div class="header-box">
        <div class="menu">
          <div class="menu-gang"></div>
          <p>{{$t('lang.templete.templeteFive.header.text1')}}</p>
        </div>
        <div>
          <div><span>u</span></div>
          <p>{{$t('lang.templete.templeteFive.header.text2')}}</p>
        </div>
      </div>
      <p>{{$t('lang.templete.templeteFive.header.text3')}}</p>
    </header>
    <main>
      <div class="main-box1">
        <div class="main-carousel">
          <el-carousel indicator-position="outside" height="460px">
            <el-carousel-item v-for="(item,index) in $t('lang.templete.templeteFive.main.imgs')" :key="index">
              <img :src="item.src" alt="" style="max-width: 100%;max-height: 100%">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="hr"></div>
      <div class="main-box2">
        <p class="ShopColor">{{$t('lang.templete.templeteFive.main.content1.text1')}}</p>
        <p class="moreColor">{{$t('lang.templete.templeteFive.main.content1.text2')}}</p>
        <div class="shopFor-box">
          <div class="shopFor-box1" v-for="(item, index) in $t('lang.templete.templeteFive.main.shopFor')" :key="index">
            <div>
              <img :src=item.src alt="" class="shopFor-img">
            </div>
            <p class="shopFor-text">{{item.text}}</p>
          </div>
        </div>
      </div>
      <div class="hr" id="hr1"></div>
      <div class="main-box3">
        <div v-for="(item, index) in $t('lang.templete.templeteFive.main.featured')" :key="index">
          <div class="content-text">
            <span class="ShopColor">{{item.title}}</span>
            <p class="moreColor">{{item.text1}}</p>
          </div>
          <div class="featured-box">
            <div  v-for="(item1, idx) in item.featuredBox" :key="idx">
              <div class="featured-box2">
                <img :src=item1.src alt="" class="shopFor-img">
              </div>
              <p class="content-text1"><span class="moreColor">{{item1.text}} </span><span class="content-price">{{item1.price}}</span></p>
            </div>
          </div>
          <div class="hr" v-if="index!==2"></div>
        </div>
      </div>
    </main>
    <footer>
      <p class="footer-Size">{{$t('lang.templete.templeteFive.footer.content1.text1')}}</p>
      <p>{{$t('lang.templete.templeteFive.footer.content1.text2')}}
        <span class="footer-Size">{{$t('lang.templete.templeteFive.footer.content1.text3')}}</span>
      </p>
      <p class="footer-Size">{{$t('lang.templete.templeteFive.footer.content2.text1')}}</p>
      <p>{{$t('lang.templete.templeteFive.footer.content2.text2')}}</p>
      <p class="footer-Size">{{$t('lang.templete.templeteFive.footer.content3.text1')}}</p>
      <p>{{$t('lang.templete.templeteFive.footer.content2.text2')}}</p>
      <div class="footer-Email">
        <input type="text" :placeholder="$t('lang.templete.templeteFive.footer.content3.input')">
        <button>{{$t('lang.templete.templeteFive.footer.content3.btn')}}</button>
      </div>
      <p class="footer-last">
        <span>{{$t('lang.templete.templeteFive.footer.content4.text1')}}</span>
        <span>{{$t('lang.templete.templeteFive.footer.content4.text2')}}</span>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'templateFive'
}
</script>

<style scoped lang="less">
  .moreColor{
    color: #6699CC;
  }
  .ShopColor{
    font-weight: bold;
    font-size: 40px;
    color: black;
    letter-spacing: 4px;
  }
  .templateFive {
    font-size: 27px;
  }
  .footer-Size{
    font-weight:bold;
    color: black;
  }
  .xiuShi{
    width: 34px;
    height: 3px;
    background-color: white;
    position: absolute;
    content: "";
  }
  #hr1{
    margin-top: 132px;
  }
  .flexCss{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hrCss{
    height: 2px;
    width: 100%;
    background-color: #E2E2E2;
  }
  .imgBoxCss{
    border:2px solid rgba(182,182,182,1);
    background-color: #E9E9E9;
    .flexCss;
  }
  header {
    background-color: #182E49;
    height: 358px;
    color: white;
    .header-box {
      padding: 73px 32px 50px 32px;
      .flexBetween;
      .menu {
        .flexCss;
        .menu-gang {
          .xiuShi;
          position: relative;
          margin-right: 20px;
        }
        .menu-gang:after{
          .xiuShi;
          top: 14px;
        }
        .menu-gang:before{
          .xiuShi;
          bottom: 14px;
        }
      }
      >div:nth-child(2){
        .flexCss;
        div{
          width:28px;
          height:28px;
          line-height: 28px;
          text-align: center;
          border: 2px solid white;
        }
      }
    }
    >p{
      text-align: center;
      font-size: 40px;
      font-weight: bold;
    }
  }
  main{
    padding: 36px 36px;
    .main-box1{
      .main-carousel{
        width: 100%;
        margin: 20px auto auto auto;
        .el-carousel__item{
          background-color: #eeeeee;
          .flexCss
        }
      }
    }
    .hr{
      .hrCss;
      margin-top: 40px;
    }
    .main-box2{
      .shopFor-box{
        .flexBetween;
        .shopFor-box1{
          .flexCss;
          flex-direction: column;
          width: 300px;
          height: 370px;
          background-color: #FAFAFA;
          >div{
            .imgBoxCss;
            width:246px;
            height:244px;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
      }
    }
    .main-box3{
      >div{
        .content-text{
          display: flex;
          flex-direction: column;
          margin-top: 80px;
        }
        .featured-box{
          .flexBetween;
          flex-wrap: wrap;
        }
      }
    }
  }
  footer{
    background-color: #F2F2F2;
    padding: 36px;
    text-align: center;
    p{
      line-height: 36px;
    }
    .footer-Email{
      display: flex;
      input{
        width:500px;
        height:64px;
        padding: 10px;
        background:rgba(226,226,226,1);
        border:2px solid rgba(155,155,155,1);
        border-radius:4px;
      }
      button{
        width:164px;
        height:88px;
        background:rgba(226,226,226,1);
        border-radius:0px 4px 4px 0px;
      }
    }
    .footer-last{
      .flexBetween;
      justify-content: space-around;
      margin-top: 138px;
    }
  }
  .featured-box2{
    width:306px;
    height:308px;
    .imgBoxCss;
  }
  .content-text1{
    .flexCss;
    flex-direction: column;
  }
</style>
