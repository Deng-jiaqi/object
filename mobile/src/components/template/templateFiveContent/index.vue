<template>
  <div>
    <main>
      <div class="swiper-container">
        <template>
          <swiper :options="swiperOption">
            <swiper-slide
              @click.native="toSlideImgLink(slide.imageLinks)"
              v-for="(slide, index) in slide_set.slideImgs"
              :key="index"
            >
              <img :src="slide.imgsrc" alt />
              <div class="banner-text" :style="slideFontPositionTwo">
                <h1
                  :style="{'fontSize':slideFontSize.h1,'textAlign':slideFontPositionOne}"
                >{{slide.title}}</h1>
                <h3
                  :style="{'fontSize':slideFontSize.h3,'textAlign':slideFontPositionOne}"
                >{{slide.subtitle}}</h3>
              </div>
            </swiper-slide>
            <div
              class="swiper-pagination"
              v-for="(slide, index) in slide_set.slideImgs"
              :key="index"
              slot="pagination"
            ></div>
          </swiper>
          <div class="swiper-button-prev" style="outline: none"></div>
          <div class="swiper-button-next" style="outline: none"></div>
        </template>
      </div>
      <div class="main-box">
        <div v-show="seriesOfProductList.length">
          <div class="flexBetween">
            <h3 class="content-title">{{$t('lang.templete.templeteFive.index.text1')}}</h3>
            <el-link
              :underline="false"
              @click.native="toAllSeriesOfProductList"
            >{{$t('lang.templete.templeteFive.index.text2')}}</el-link>
          </div>
          <!--产品系列列表 -->
          <div class="c-seriesOfProductList">
            <template v-for="(item, index) in seriesOfProductList">
              <div
                @click="toSeriesOfProductCatalog(item.Id,item.name)"
                class="c-seriesOfProduct"
                :class="item.placeholder?'c-seriesOfProduct-placeholder':''"
                :key="index"
              >
                <div class="c-seriesOfProduct-img">
                  <el-image
                    :src="item.imgsrc"
                    alt
                    :class="item.placeholder?'seriesOfProduct-img-placeholder':''"
                    class="seriesOfProduct-img"
                    lazy
                  />
                </div>
                <div class="seriesOfProduct-info" v-if="item.name">
                  <p class="name">{{item.name}}</p>
                </div>
                <div
                  class="placeholder-text"
                  v-if="item.placeholder"
                >{{$t('lang.templete.templeteFive.index.text4')}}</div>
              </div>
            </template>
          </div>
        </div>
        <div class="content-hr hr2"></div>
        <!--特色产品系列-->
        <div
          class="c-seriesProduct-featured animated"
          v-for="(item,index) in seriesProductList_featured"
          :key="index"
          :id="seriesOfProductListCompid[index]"
        >
          <div class="nameandlink">
            <span class="name">{{item.featured_title}}</span>
            <el-link
              :underline="false"
              @click.native="toSeriesOfProductCatalog(item.featuredSeriesOfProduct.Id,item.featuredSeriesOfProduct.name)"
            >{{$t('lang.templete.templeteFive.index.text3')}} ></el-link>
            <!-- 购物车 -->
          </div>
          <div class="product-row">
            <!-- 特色产品系列产品 -->
            <div
              class="product"
              v-for="(itemTwo,indexTwo) in item.featuredSeriesOfProduct.specificProducts"
              :key="indexTwo"
              @click="toProductDetails(itemTwo.Id)"
            >
              <div class="c-product-img">
                <el-image
                  :src="itemTwo.imgsrc"
                  :class="itemTwo.placeholder?'placeholder-img':''"
                  lazy
                />
              </div>
              <div class="product-info">
                <p class="title">{{itemTwo.name}}</p>
                <p class="price" v-if="item.WhetherToDisplayPrice">$ {{itemTwo.price}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getStoreFrontPageData } from '@/common/api/api'

export default {
  name: 'index',
  data () {
    return {
      slideFontSize: { h1: '2rem', h3: '1.5rem' },
      slideFontPositionOne: '', // 左中上时候
      slideFontPositionTwo: '', // 文字在其它其它地方的时候
      slide_set: {
        slideFontSize: 1,
        slideFontPosition: 1, // 左中上时候
        slideAutoPlay: true,
        slideAutoPlayTimeInterval: '3000',
        slideImgs: [
          {
            imgsrc: require('@/assets/administratorPanel/templateImg/48.png'),
            title: '',
            subtitle: '',
            imageLinks: ''
          },
          {
            imgsrc: require('@/assets/administratorPanel/templateImg/27rectangle.png'),
            title: '',
            subtitle: '',
            imageLinks: ''
          },
          {
            imgsrc: require('@/assets/administratorPanel/templateImg/48.png'),
            title: '',
            subtitle: '',
            imageLinks: ''
          }
        ]
      },
      swiperOption: {
        // 轮播图设置
        // slidesPerView: 'auto',
        // spaceBetween: 30,
        grabCursor: true, // 小掌抓取
        notNextTick: true,
        initialSlide: 0,
        observer: true, // 动态检查器
        pagination: {
          // 分页器
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        autoplay: true,
        autoplayDisableOnInteraction: true,
        speed: 1000, // 滑动速度
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      // data
      seriesOfProductList: [
        // 产品系列列表
      ],
      seriesOfProductListCompid: ['5', '6', '7'],
      seriesProductList_featured: [],
      // 变量
      noSeriesOfProductListData: true // 产品系列列表没有数据
    }
  },
  methods: {
    toSlideImgLink (link) {
      if (link) {
        window.open(link, '_blank')
      }
    },
    // 跳转到商品的详情页面
    toProductDetails (Id) {
      this.$router.push({
        path: 'productDetails',
        query: {
          productid: Id
        }
      })
    },
    // 跳转到特定产品系列目录
    toSeriesOfProductCatalog (Id, name) {
      this.$router.push({
        path: '/seriesOfCatalog',
        query: {
          collectid: Id,
          collectionName: name
        }
      })
    },
    // 跳转到所有产品系列列表
    toAllSeriesOfProductList () {
      this.$router.push({
        path: '/allSeriesOfProductList'
      })
    },
    getSlideFontSize (val) {
      // 根据数据初始化幻灯片字体大小
      switch (val) {
        case 1:
          this.slideFontSize = { h1: '1rem', h3: '0.75rem' }
          break
        case 2:
          this.slideFontSize = { h1: '1.5rem', h3: '1.125rem' }
          break
        default:
          break
      }
    },
    getSlideFontPosition (val) {
      // 根据数据初始化幻灯片字体位置
      switch (val) {
        case 1:
          this.slideFontPositionOne = 'left'
          this.slideFontPositionTwo = ''
          break
        case 2:
          this.slideFontPositionOne = 'center'
          this.slideFontPositionTwo = ''
          break
        case 3:
          this.slideFontPositionOne = 'right'
          this.slideFontPositionTwo = ''
          break
        case 4:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: center;alignItems: flex-start'
          break
        case 5:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: center;alignItems: center'
          break
        case 6:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: center;alignItems: flex-end'
          break
        case 7:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: flex-end;alignItems: flex-start'
          break
        case 8:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: flex-end;alignItems: center'
          break
        case 9:
          this.slideFontPositionOne = ''
          this.slideFontPositionTwo =
            'display: flex;flexDirection: column;justifyContent: flex-end;alignItems: flex-end'
          break

        default:
          break
      }
    }
  },
  async created () {
    let res = await getStoreFrontPageData()
    console.log(res)
    let resData = res.data.data
    this.$set(this.slide_set, 'slideImgs', resData.slide_set.slideImgs)
    this.getSlideFontSize(resData.slide_set.slideFontSize)
    this.getSlideFontPosition(resData.slide_set.slideFontPosition)
    this.seriesOfProductList = resData.seriesOfProductList
    // 如果是奇数 为了美观 length-1
    if (
      this.seriesOfProductList.length !== 1 &&
      this.seriesOfProductList.length % 2 !== 0
    ) {
      this.seriesOfProductList.pop()
    }
    if (!this.seriesOfProductList.length) {
      // 产品系列列表下面没有产品时数据初始化
      let arr = [
        {
          Id: null,
          name: null,
          placeholder: true,
          imgsrc: require('@/assets/administratorPanel/templateImg/198.png')
        },
        {
          Id: null,
          name: null,
          placeholder: true,
          imgsrc: require('@/assets/administratorPanel/templateImg/198.png')
        }
      ]
      this.seriesOfProductList = this.seriesOfProductList.concat(arr)
    } else {
      this.noSeriesOfProductListData = false
    }
    this.seriesProductList_featured = resData.featuredSeriesOfProduct
    // 如果是奇数 为了美观 length-1
    this.seriesProductList_featured.forEach((item, index) => {
      if (
        item.featuredSeriesOfProduct.specificProducts.length !== 1 &&
        item.featuredSeriesOfProduct.specificProducts.length % 2 !== 0
      ) {
        this.seriesProductList_featured[index].featuredSeriesOfProduct.specificProducts.pop()
      }
    })
    // 特色产品系列下面没有产品时数据初始化
    this.seriesProductList_featured.forEach((item, index) => {
      if (item.featuredSeriesOfProduct.specificProducts.length === 0) {
        let specificProducts = []
        let num =
          parseInt(item.numberOfProductsPerRow) * parseInt(item.numberOfRows)
        for (let i = 0; i < num; i++) {
          specificProducts.push({
            placeholder: true,
            imgsrc: require('@/assets/administratorPanel/templateImg/252.png'),
            name: this.$t('sampleProductTitle'),
            price: '19.99'
          })
        }
        this.seriesProductList_featured[index].featuredSeriesOfProduct.specificProducts = specificProducts
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "../../../common/css/common";
.main-box {
  padding: 0 16px;
  margin: auto;
}
.content-title {
  color: rgba(51, 51, 51, 1);
  font-size: 1.733em;
}
.swiper-button-prev {
  opacity: 0;
  transition: all 0.3s linear;
  color: #4267b2;
}
.swiper-button-next {
  opacity: 0;
  transition: all 0.3s linear;
  color: bisque;
}
.swiper-container:hover .swiper-button-prev {
  opacity: 1;
  margin-left: 20px;
}
.swiper-container:hover .swiper-button-next {
  opacity: 1;
  margin-right: 20px;
}
.swiper-slide {
  .flexCss;
  height: 0;
  padding-bottom: 50%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .banner-text {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 70%;
    height: 80%;
    margin: auto;
    color: white;
    h1 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    h3 {
      margin-bottom: 0;
      margin-top: 0.5rem;
    }
  }
}
.c-seriesOfProductList {
  // 产品系列列表
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .c-seriesOfProduct {
    width: 45%;
    .c-seriesOfProduct-img {
      height: 0;
      padding-bottom: 100%;
      position: relative;
      background: rgba(249, 250, 250, 1);
      border-radius: 1px;
      .seriesOfProduct-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .placeholder-img {
        padding: 0.9375rem;
        background-color: #e3e3e3;
        width: calc(100% - 1.875rem) !important;
        height: calc(100% - 1.875rem) !important;
      }
    }
    .seriesOfProduct-info {
      text-align: center;
      .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 25px;
        color: rgba(51, 51, 51, 1);
         font-weight: bold;
      }
    }
  }
}
// 特色产品系列
.c-seriesProduct-featured {
  padding-bottom: 1.25rem;
  border-bottom: 2px solid #f3f3f3;
  margin-bottom: 1.5625rem;
  cursor: pointer;
  .nameandlink {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.9375rem;
    .name {
      color: rgba(51, 51, 51, 1);
      font-size: 0.85rem;
      font-weight: bold;
    }
    .link {
      font-size: 0.4375rem;
      color: #606266;
      cursor: pointer;
    }
  }
  .product-row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .product {
      transition: opacity 0.2s linear;
      width: 45%;
      .c-product-img {
        height: 0;
        padding-bottom: 100%;
        position: relative;
        .el-image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .placeholder-img {
          padding: 0.9375rem;
          background-color: #e3e3e3;
          width: calc(100% - 1.875rem) !important;
          height: calc(100% - 1.875rem) !important;
        }
      }
      .product-info {
        text-align: center;
        font-size: 0.53125rem;
        .title {
          color: rgba(51, 51, 51, 1);
          margin-top: 0.46875rem;
          margin-bottom: 0.3125rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 25px;
           font-weight: bold;
        }
        .price {
          margin-bottom: 20px;
          color:rgba(51, 51, 51, 1);
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
    .no-margin-right {
      margin-right: 0;
    }
    .product:hover {
      opacity: 0.8;
    }
    .prompt {
      font-size: 0.8rem;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.content-hr {
  height: 2px;
  background: rgba(243, 243, 243, 1);
  margin: 30px auto 38px auto;
}
.hr2 {
  margin: 40px auto 40px auto;
}
.main-carousel {
  width: 100%;
  margin: 20px auto auto auto;
  background-color: #eeeeee;
}
</style>
