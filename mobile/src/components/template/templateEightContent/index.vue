<template>
  <main>
    <div class="main-box1">
      <div class="box1-content1">
        <div class="box1-imgBox" v-for="(item,index) in $t('lang.templete.templeteEight.main.box1Data')" :key="index">
          <img :src=item.src alt="">
        </div>
      </div>
      <div class="box1-content2">
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
        <p>{{$t('lang.templete.templeteEight.main.text1')}}</p>
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
      </div>
      <el-row :gutter="10" class="box1-content3" style="flex-wrap: wrap">
        <el-col :span="6" class="box1-content3-imgBox" v-for="(item, index) in shopData" :key="index">
          <div><img :src=item.imgs alt=""  @click="particulars(item,index)"></div>
          <p>{{item.goodsname}}</p>
          <p>{{item.price}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="main-box2">
      <p>{{$t('lang.templete.templeteEight.main.imgText')}}</p>
      <div class="box2-content1">
        <img src="../../../assets/administratorPanel/templateImg/27rectangle.png" alt="">
      </div>
    </div>
    <div class="main-box3">
      <div class="box3-content1">
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
        <p>{{$t('lang.templete.templeteEight.main.text2')}}</p>
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
      </div>
      <div class="box3-content2">
        <div>
          <img src="../../../assets/administratorPanel/templateImg/50.png" alt="">
        </div>
        <div>
          <p>{{$t('lang.templete.templeteEight.main.text3')}}</p>
          <p>{{$t('lang.templete.templeteEight.main.text4')}}</p>
        </div>
        <div>
          <p><span>{{$t('lang.templete.templeteEight.main.text5')}}</span>&nbsp;<span>{{$t('lang.templete.templeteEight.main.text6')}}</span>
          </p>
          <button>{{$t('lang.templete.templeteEight.main.btn')}}</button>
        </div>
      </div>
    </div>
    <div class="main-box4">
      <div class="box4-content">
        <p>{{$t('lang.templete.templeteEight.main.text7')}}</p>
        <p>{{$t('lang.templete.templeteEight.main.text8')}}</p>
        <div>
          <input type="text" :placeholder="$t('lang.templete.templeteEight.main.input')">
          <button>{{$t('lang.templete.templeteEight.main.btn2')}}</button>
        </div>
      </div>
    </div>
    <div class="main-box5">
      <div class="box5-content1">
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
        <p>{{$t('lang.templete.templeteEight.main.text9')}}</p>
        <img src="../../../assets/administratorPanel/templateImg/bolang.png" alt="">
      </div>
      <div class="box5-content2">
        <div v-for="(item, index) in $t('lang.templete.templeteEight.main.box5Content')" :key="index">
          <img :src=item.src alt="">
        </div>
      </div>
    </div>
    <div class="main-box6">
      <span>{{$t('lang.templete.templeteEight.main.text10')}}</span>
    </div>
  </main>
</template>

<script>
import { ShopExhibition } from '../../../common/api/api'
export default {
  name: 'index',
  data () {
    return {
      setInterName: null,
      shopData: []
    }
  },
  methods: {
    // 跳转到商品的详情页面
    particulars (item) {
      this.$router.push({
        path: 'shopDetailsEight/page8',
        query: {
          storeid: 1,
          productid: item.id
        }
      })
    }
  },
  created () {
    ShopExhibition({
      storeid: 1
    }).then(resp => {
      this.shopData = resp.data.data
    })
  }
}
</script>

<style scoped lang="less">
  .btn {
    background: rgba(57, 60, 74, 1);
    border-radius: 4px;
    border: 0;
    color: white;
    outline: none;
  }
  .input {
    padding: 10px;
    border: 2px solid rgba(57, 60, 74, 1);
    border-radius: 4px;
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexBetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flexAround {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .pCss {
    font-size: 19px;
    font-weight: bold;
    color: black;
  }
  main {
    .main-box1 {
      padding: 1.75rem 6.875rem;
      .box1-content1 {
        .flexBetween;
        .box1-imgBox {
          width: 14.75rem;
          height: 14.875rem;
          background-color: #EEEEEE;
          .flexCss;
        }
      }
      .box1-content2 {
        margin: auto;
        .flexCss;
        p {
          .pCss;
          margin: 40px;
        }
      }
      .box1-content3 {
        .box1-content3-imgBox {
          cursor: pointer;
          > div {
            width: 100%;
            height: 11.3125rem;
            background: #EEEEEE;
            img{
              height: 100%;
              width: 100%;
            }
            .flexCss;
          }
        }
      }
    }
    .box1-content3-imgBox:hover >div{
      opacity: 0.8;
    }
    .main-box2 {
      background-color: #EEEEEE;
      height: 13.1875rem;
      position: relative;
      .flexCss;
      > p {
        position: absolute;
        color: white;
        font-size: 27px;
        font-weight: bold;
      }
      .box2-content1 {
        width: 36.6875rem;
        height: 12.625rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .main-box3 {
      .box3-content1 {
        margin: auto;
        .flexCss;
        p {
          .pCss;
          margin: 1.25rem;
        }
      }
      .box3-content2 {
        padding: 1.25rem 6.875rem;
        .flexBetween;
        align-items: end;
        > div:nth-child(1) {
          width: 18.625rem;
          height: 18.75rem;
          background-color: #EEEEEE;
          .flexCss;
        }
        > div:nth-child(2) {
          width: 18.1875rem;
        }
        > div:nth-child(3) {
          p {
            span:nth-child(2) {
              text-decoration: line-through;
            }
          }
          button {
            width: 5.125rem;
            height: 1.4375rem;
            .btn;
          }
        }
      }
    }
    .main-box4 {
      background-color: #EDE8D7;
      height: 9.5rem;
      .flexCss;
      .box4-content {
        text-align: center;
        > p:nth-child(1) {
          font-size: 19px;
          color: black;
          margin-bottom: 1.3125rem;
        }
        > div {
          margin-top: 1.3125rem;
          input {
            width: 424px;
            height: 20px;
            background-color: #EDE8D7;
            .input;
          }
          button {
            .btn;
            width: 184px;
            height: 46px;
          }
        }
      }
    }
    .main-box5 {
      padding: 1.25rem 6.875rem;
      .box5-content1 {
        .flexCss;
        p {
          .pCss;
          margin: 1.25rem;
        }
      }
      .box5-content2 {
        margin-top: 1rem;
        .flexBetween;
        > div {
          width: 6.875rem;
          height: 6.875rem;
          background-color: #EEEEEE;
          .flexCss;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .main-box6 {
      height: 1.875rem;
      background-color: #28323C;
      line-height: 1.875rem;
      color: white;
      text-align: center;
    }
  }
</style>
