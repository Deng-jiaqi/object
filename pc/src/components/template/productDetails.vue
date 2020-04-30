<template>
  <div>
    <div class="c-productDetails animated" id="9">
      <div class="c-product">
        <div class="c-product-img">
          <videoPlayer v-show='videoVisible'  :playsinline="true" class="video-player-box" ref="videoPlayer" :options="playerOptions"></videoPlayer>
          <span v-show='pageInfo.video_url&&!videoVisible' class="iconfont icon-bofang" @click='videoVisible=true'></span>
          <span class="iconfont icon-close" @click='videoVisible=false' v-show='videoVisible'></span>
          <vue-photo-zoom-pro
            :out-zoomer="true"
            :width="233.5"
            :height="233.5"
            :url="thePictureShown"
          ></vue-photo-zoom-pro>
        </div>
        <div class="c-product-img-small-list">
          <template v-for="(item,index) in pageInfo.imgs">
            <img @click="switchThePictureShown(item)" :key="index" :src="item" alt />
          </template>
        </div>
      </div>
      <div class="productOperation">
        <h1>{{pageInfo.goodsname}}</h1>
        <p class="product-price">
          <span v-text="'$'+pageInfo.price"></span>&nbsp;&nbsp;&nbsp;
          <span
            v-if="pageInfo.WhetherToDisplayOriginalPrice"
          >${{pageInfo.oldprice}}</span>
        </p>
        <div class="c-attr">
          <template v-for="(item,index) in pageInfo.attr">
            <div class="select-attr" :key="index" v-if="pageInfo.attr.length">
              <label>{{item.attribute}}</label>
              <div class="c-select-attr">
                <el-select class="select-box" @change="attrChange" v-model="item.value">
                  <el-option
                    v-for="itemTwo in item.options"
                    :label="itemTwo.label"
                    :key="itemTwo.value"
                    :value="itemTwo.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </template>
          <div class="c-select-number" v-if="pageInfo.WhetherToDisplayTheNumberOfChoices">
            <label>{{$t('lang.templete.templeteFive.productDetails.text1')}}</label>
            <el-input-number
              :min="1"
              :max="pageInfo.storage"
              v-model.number="numberOfProductsPurchased"
              :step='1' :step-strictly='true'
              class="select-box"
            ></el-input-number>
          </div>
        </div>
        <button
          v-if="pageInfo.WhetherToDisplayAddToCart"
          class="btn btn-addto-cart"
          :style="{'borderColor':headerBackgroundColor,'color':headerBackgroundColor}"
          @click="addToCart"
          v-preventReClick="2000"
        >{{$t('lang.templete.templeteFive.btn1')}}</button>
        <button
          class="btn btn-buynow"
          :style="{'backgroundColor':headerBackgroundColor}"
          @click="buyNow"
          v-preventReClick="2000"
        >{{$t('lang.templete.templeteFive.btn2')}}</button>
      </div>
    </div>
    <div ref="product-desc" class="product-desc" v-html="pageInfo.content"></div>
  </div>
</template>

<script>
import {
  addCart,
  getPrice,
  productDetails,
  purchase
} from '../../common/api/api'
import messageAlert from '@/utils/messageAlert'
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
export default {
  name: 'productDetails',
  components: {
    videoPlayer
  },
  data () {
    return {
      // data
      playerOptions: {
        // videojs options
        width: '467',
        height: '467',
        muted: true,
        autoplay: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src:
              ''
          }
        ],
        poster: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg'
      },
      pageInfo: {
        WhetherToDisplayOriginalPrice: true,
        WhetherToDisplayAddToCart: true,
        WhetherToDisplayTheNumberOfChoices: true,
        attr: [],
        content: '<p>产品描述</p>',
        goodsname: '产品名称',
        oldprice: 888,
        price: 888,
        productid: null,
        imgs: [
          require('@/assets/administratorPanel/templateImg/198.png'),
          require('@/assets/administratorPanel/templateImg/198.png'),
          require('@/assets/administratorPanel/templateImg/198.png'),
          require('@/assets/administratorPanel/templateImg/198.png')
        ],
        storage: 100
      },
      // 变量
      timer: null,
      WhetherToDisplayTheNumberOfChoices: true,
      numberOfProductsPurchased: 1,
      goodsExist: false, // 商品是否存在 (多属性组合选择时候可能没有)
      thePictureShown: require('@/assets/administratorPanel/templateImg/198.png'), // 展示的图片
      headerBackgroundColor: 'rgb(24, 46, 73)',
      // ui
      videoVisible: false
    }
  },
  computed: {
    productid () {
      return this.$route.query.productid
    },
    queryData () {
      // 接口请求需要的数据
      let attrid = []
      this.pageInfo.attr.forEach(item => {
        attrid.push(item.value)
      })
      return {
        productid: this.pageInfo.productid,
        attrid: attrid,
        buynum: this.numberOfProductsPurchased
      }
    }
  },
  methods: {
    handleMessage () {
      const data = event.data
      switch (data.cmd) {
        case 'anchorPointJump': {
          location.href = `#${data.params.anchorPoint}`
          document
            .getElementById(data.params.anchorPoint)
            .classList.add('pulse', 'inedit-bg')
          setTimeout(() => {
            document
              .getElementById(data.params.anchorPoint)
              .classList.remove('pulse', 'inedit-bg')
          }, 1000)
          break
        }
        case 'modifyPriceDisplay_productDetails':
          this.$set(
            this.pageInfo,
            'WhetherToDisplayOriginalPrice',
            data.params.WhetherToDisplayOriginalPrice
          )
          break
        case 'modifyAddToCartDisplay_productDetails':
          this.$set(
            this.pageInfo,
            'WhetherToDisplayAddToCart',
            data.params.WhetherToDisplayAddToCart
          )
          break
        case 'modifyTheNumberOfChoices_productDetails':
          this.$set(
            this.pageInfo,
            'WhetherToDisplayTheNumberOfChoices',
            data.params.WhetherToDisplayTheNumberOfChoices
          )
          break
        case 'passingDefaultData_productDetails':
          this.$set(
            this.pageInfo,
            'WhetherToDisplayOriginalPrice',
            data.params.defaultSet.WhetherToDisplayOriginalPrice
          )
          this.$set(
            this.pageInfo,
            'WhetherToDisplayAddToCart',
            data.params.defaultSet.WhetherToDisplayAddToCart
          )
          this.$set(
            this.pageInfo,
            'WhetherToDisplayTheNumberOfChoices',
            data.params.defaultSet.WhetherToDisplayTheNumberOfChoices
          )
          break
      }
    },
    switchThePictureShown (imgsrc) {
      // 切换图片
      this.thePictureShown = imgsrc
      console.log(this.thePictureShown)
      this.videoVisible = false
    },
    async addToCart () {
      // 添加商品到购物车
      if (this.pageInfo.productid && this.goodsExist && this.numberOfProductsPurchased) {
        let res = await addCart(this.queryData)
        messageAlert(res)
        console.log(res)
        this.$emit('getMessage', res.data.data)
      }
    },
    async buyNow () {
      if (this.pageInfo.productid && this.goodsExist && this.numberOfProductsPurchased) {
        let res = await purchase(this.queryData)
        if (res.data.code === 1) {
          // 立即购买
          this.$router.push({
            path: '/submitOrder',
            query: {
              buynow: JSON.stringify(this.queryData)
            }
          })
        } else {
          messageAlert(res)
        }
      }
    },
    // 获取选中属性的价钱和图片
    attrChange () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        let res = await getPrice(this.queryData)
        console.log(res)
        if (res.data.code === 1) {
          this.$set(this.pageInfo, 'oldprice', res.data.data.oldprice)
          this.$set(this.pageInfo, 'price', res.data.data.price)
          this.$set(this.pageInfo, 'storage', res.data.data.storage)
          if (res.data.data.attr_img) {
            this.thePictureShown = res.data.data.attr_img
          }
        } else {
          this.goodsExist = false
          this.$set(this.pageInfo, 'oldprice', 0)
          this.$set(this.pageInfo, 'price', 0)
          this.$set(this.pageInfo, 'storage', 0)
          messageAlert(res)
        }
      }, 1000)
    }
  },
  async created () {
    if (this.productid) {
      let res = await productDetails({
        productid: this.productid
      })
      console.log(res)
      this.pageInfo = res.data.data
      this.playerOptions.sources[0].src = this.pageInfo.video_url
      this.thePictureShown = this.pageInfo.imgs[0]
      this.goodsExist = true
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>
<style lang="less" scoped>
</style>
<style scoped lang="less">
.inedit-bg {
  background-color: red !important;
}
.c-productDetails {
  padding: 46px 30px 30px 30px;
  max-width: 1140px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  .c-product {
    max-width: 606px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-shrink: 0;
    .c-product-img {
      width: 467px;
      height: 467px;
      flex-shrink: 0;
      position: relative;
      .video-player-box {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        /deep/ .vjs-big-play-button {
          top: 50%;
          left: 50%;
          margin-left: -1.5em;
          margin-top: -1em !important;
        }
      }
      .icon-bofang {
        position: absolute;
        bottom: 5px;
        left: 5px;
        color: #fff;
        z-index: 100;
        cursor: pointer;
        font-size: 40px;
      }
      .icon-close {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        font-size: 30px;
        z-index: 100;
        color: #fff;
      }
      /deep/ .photo-zoom-pro {
        height: 100%;
      }
      /deep/ .img-out-show {
        background: #fff;
        z-index: 100;
      }
    }
    .c-product-img-small-list {
      max-height: 467px;
      overflow: auto;
      margin-left: 12px;
      img {
        width: 110px;
        height: 112px;
        margin-bottom: 6px;
        display: block;
      }
      img:last-child {
        margin-bottom: 0;
      }
    }
  }
  .productOperation {
    margin-left: 54px;
    width: 516px;
    .select-box {
      width: 100%;
      margin-top: 12px;
    }
    h1 {
      margin-top: 0;
      color: black;
      font-size: 30px;
      word-wrap: break-word;
    }
    .product-price {
      span:nth-child(1) {
        font-size: 20px;
        font-weight: bold;
        color: black;
      }
      span:nth-child(2) {
        font-size: 16px;
        color: #999999;
        text-decoration: line-through;
      }
    }
    .c-attr {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .select-attr {
        margin-top: 24px;
        display: inline-block;
        width: 40%;
        .c-select-attr {
          width: 100%;
        }
      }
      .c-select-number {
        margin-top: 24px;
        width: 40%;
      }
    }
    .btn-addto-cart {
      background-color: white;
      border: 1px solid;
    }
    .btn-addto-cart:hover {
      background-color: rgba(242, 242, 242, 0.25);
    }
    .btn-buynow {
      border: 0;
      color: white;
    }
    .btn-buynow:hover {
      opacity: 0.8;
    }
    .btn {
      width: 100%;
      height: 55px;
      outline: none;
      border-radius: 2px;
      font-size: 17px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
}
.product-desc {
  max-width: 1200px;
  margin: auto;
  font-size: 16px;
  color: black;
  margin-top: 5px;
  text-align: center;
  padding-bottom: 30px;
  p {
    width: 100%;
    img {
      width: 100%;
      height: 900px;
    }
  }
}
/deep/ .product-desc {
  p {
    img {
      width: 100%;
      height: 900px;
    }
  }
}
</style>
