<template>
  <div>
    <main>
      <div class="main-box">
        <div class="main-carousel">
          <div class="swiper-container animated" id='3'>
            <template>
              <swiper :options="swiperOption">
                <swiper-slide
                  @click.native="toSlideImgLink(slide.imageLinks)"
                  v-for="(slide, index) in slide_set.slideImgs"
                  :key="index"
                >
                  <img  :src='slide.imgsrc' alt/>
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
        </div>
        <div class="content-hr"></div>
        <div v-show='seriesOfProductList.length'>
          <div class="flexBetween">
            <h3 class="content-title">{{$t('lang.templete.templeteFive.index.text1')}}</h3>
            <el-link
              :underline="false"
              @click.native="toAllSeriesOfProductList"
            >{{$t('lang.templete.templeteFive.index.text2')}}</el-link>
          </div>
          <!--产品系列列表 -->
          <div class="c-seriesOfProductList animated" id='4'>
            <template v-for="(item, index) in seriesOfProductList">
              <div
                @click="toSeriesOfProductCatalog(item.Id,item.name)"
                class="c-seriesOfProduct"
                :class="item.placeholder?'c-seriesOfProduct-placeholder':''"
                :key="index"
              >
                <div class="c-seriesOfProduct-img">
                  <el-image :src="item.imgsrc" alt :class="item.placeholder?'seriesOfProduct-img-placeholder':''" class="seriesOfProduct-img"  lazy/>
                </div>
                <div class="seriesOfProduct-info" v-if='item.name'>
                  <p class="name">{{item.name}}</p>
                </div>
                <div class="placeholder-text" v-if='item.placeholder'>{{$t('lang.templete.templeteFive.index.text4')}}</div>
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
          :id='seriesOfProductListCompid[index]'
        >
          <div class="nameandlink">
            <span class="name">{{item.featured_title}}</span>
            <el-link
              :underline="false"
              @click.native="toSeriesOfProductCatalog(item.featuredSeriesOfProduct.Id,item.featuredSeriesOfProduct.name)"
            >{{$t('lang.templete.templeteFive.index.text3')}} ></el-link>
          </div>
          <div class="product-row">
            <!-- 特色产品系列产品 -->
            <div
              class="product"
              :class="ifNoMarginRight(item.numberOfProductsPerRow,indexTwo)"
              :style="getIntervalStyle(item.numberOfProductsPerRow,indexTwo)"
              v-for="(itemTwo,indexTwo) in item.featuredSeriesOfProduct.specificProducts"
              :key="indexTwo"
              @click="toProductDetails(itemTwo.Id)"
            >
              <div class="c-product-img">
                <el-image :src="itemTwo.imgsrc" :class="itemTwo.placeholder?'placeholder-img':''" lazy/>
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
import { remove } from 'lodash'
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
    handleMessage () {
      const data = event.data
      switch (data.cmd) {
        case 'anchorPointJump' : {
          location.href = `#${data.params.anchorPoint}`
          document.getElementById(data.params.anchorPoint).classList.add('pulse', 'inedit-bg')
          setTimeout(() => {
            document.getElementById(data.params.anchorPoint).classList.remove('pulse', 'inedit-bg')
          }, 1000)
          break
        }
        // ----------轮播图设置--------------//
        case 'setSlideFontSize': {
          // 轮播文字大小
          this.getSlideFontSize(data.params.slideFontSize)
          break
        }
        case 'setSlideFontPosition': {
          // 轮播文字位置
          this.getSlideFontPosition(data.params.slideFontPosition)
          break
        }
        case 'setSlideAutoPlay': {
          // 轮播是否自动播放
          break
        }
        case 'setSlideAutoPlayTimeInterval': {
          // 轮播时间
          break
        }
        case 'modifySlideImg': {
          // 修改轮播图片
          if (!data.params.imgsrc) {
            data.params.imgsrc = require('@/assets/administratorPanel/templateImg/48.png')
          }
          this.$set(
            this.slide_set.slideImgs[data.params.index],
            'imgsrc',
            data.params.imgsrc
          )
          break
        }
        case 'modifySlideItemTitle': {
          this.$set(
            this.slide_set.slideImgs[data.params.index],
            'title',
            data.params.title
          )
          break
        }
        case 'modifySlideItemSubtitle': {
          this.$set(
            this.slide_set.slideImgs[data.params.index],
            'subtitle',
            data.params.subtitle
          )
          break
        }
        case 'modifySlideItemImageLinks': {
          this.$set(
            this.slide_set.slideImgs[data.params.index],
            'imageLinks',
            data.params.imageLinks
          )
          break
        }
        case 'deleteSlideImgItem': {
          // 删除轮播图片
          this.slide_set.slideImgs = remove(
            this.slide_set.slideImgs,
            (value, idx) => {
              return idx !== data.params.index
            }
          )
          break
        }
        case 'addSlideImgItem': {
          // 增加轮播图片
          this.slide_set.slideImgs.push({
            imgsrc: require('@/assets/administratorPanel/templateImg/48.png'),
            title: '',
            subtitle: '',
            imageLinks: ''
          })
          break
        }
        // ----------产品系列列表设置--------------//
        case 'modifySeriesOfProductList': {
          // 修改产品系列列表
          if (this.noSeriesOfProductListData) {
            this.seriesOfProductList = []
          }
          this.$set(
            this.seriesOfProductList,
            data.params.index,
            data.params.choosedSeriesOfProduct
          )
          for (let i = 0; i < this.seriesOfProductList.length; i++) {
            if (!this.seriesOfProductList[i]) {
              this.seriesOfProductList[i] = {
                Id: null,
                imgsrc: '',
                name: ''
              }
            }
          }
          this.noSeriesOfProductListData = false
          console.log(this.seriesOfProductList)
          break
        }
        case 'cutSeriesOfProductList': {
          // 缩短产品系列列表（删除）
          this.seriesOfProductList = remove(
            this.seriesOfProductList,
            (value, idx) => {
              return idx !== data.params.index
            }
          )
          break
        }
        // ----------特色产品系列设置--------------//
        case 'modifyFeatureTitle': {
          this.$set(
            this.seriesProductList_featured[data.params.index],
            'featured_title',
            data.params.featured_title
          )
          break
        }
        case 'modifyProductArrangement': {
          let num = parseInt(data.params.numberOfProductsPerRow) * parseInt(data.params.numberOfRows)
          if (!this.seriesProductList_featured[data.params.index].featuredSeriesOfProduct.Id) {
            // 没有实际数据这个特色产品系列
            let specificProducts = []
            for (let i = 0; i < num; i++) {
              specificProducts.push({
                placeholder: true,
                imgsrc: require('@/assets/administratorPanel/templateImg/252.png'),
                name: this.$t('sampleProductTitle'),
                price: '19.99'
              })
            }
            this.seriesProductList_featured[data.params.index].featuredSeriesOfProduct.specificProducts = specificProducts
            this.seriesProductList_featured[data.params.index].numberOfProductsPerRow = data.params.numberOfProductsPerRow
            this.seriesProductList_featured[data.params.index].numberOfRows = data.params.numberOfRows
          } else {
            // 已经有实际的产品了
            this.seriesProductList_featured[data.params.index].featuredSeriesOfProduct.specificProducts = data.params.featuredSeriesOfProduct.specificProducts
            this.seriesProductList_featured[data.params.index].numberOfProductsPerRow = data.params.numberOfProductsPerRow
            this.seriesProductList_featured[data.params.index].numberOfRows = data.params.numberOfRows
            // 产品显示不完的处理
            if (num < data.params.featuredSeriesOfProduct.specificProducts.length) {
              this.seriesProductList_featured[data.params.index].featuredSeriesOfProduct.specificProducts.length = num
            }
          }
          break
        }
        case 'modifyFeaturedSeriesOfProduct': {
          // 更改了特色产品系列
          this.$set(this.seriesProductList_featured, data.params.index, data.params.set)
          break
        }
        case 'modifyPriceDisplay': {
          this.$set(
            this.seriesProductList_featured[data.params.index],
            'WhetherToDisplayPrice',
            data.params.WhetherToDisplayPrice
          )

          break
        }
        default:
          break
      }
    },
    getIntervalStyle (numberOfProductsPerRow, indexTwo) { // 根据每行排列个数获取样式
      return `width: calc(${100 / parseInt(numberOfProductsPerRow) +
        '%'} - ${(0.9375 * parseInt(numberOfProductsPerRow - 1)) /
        parseInt(numberOfProductsPerRow)}rem)`
    },
    ifNoMarginRight (numberOfProductsPerRow, index) { // 每排最后一个没有右边距
      if ((parseInt(index) + 1) % parseInt(numberOfProductsPerRow) === 0) {
        return 'no-margin-right'
      }
    },
    getSlideFontSize (val) {
      // 根据数据初始化幻灯片字体大小
      switch (val) {
        case 1:
          this.slideFontSize = { h1: '2rem', h3: '1.5rem' }
          break
        case 2:
          this.slideFontSize = { h1: '3rem', h3: '2.25rem' }
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
    if (!this.seriesOfProductList.length) { // 产品系列列表下面没有产品时数据初始化
      let arr = [
        { Id: null,
          name: null,
          placeholder: true,
          imgsrc: require('@/assets/administratorPanel/templateImg/198.png')
        },
        { Id: null,
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
    // 特色产品系列下面没有产品时数据初始化
    this.seriesProductList_featured.forEach((item, index) => {
      if (item.featuredSeriesOfProduct.specificProducts.length === 0) {
        let specificProducts = []
        let num = parseInt(item.numberOfProductsPerRow) * parseInt(item.numberOfRows)
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
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>

<style lang="less" scoped>
@import "../../../../common/css/common.less";
.inedit-bg {
  background-color: red !important;
}
.content-title {
  color: black;
  font-size: 0.85rem;
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
.content-hr {
  height: 2px;
  background: rgba(243, 243, 243, 1);
  margin: 30px auto 38px auto;
}
.hr2 {
  margin: 40px auto 40px auto;
}
.main-box {
  padding: 0 30px;
  max-width: 1140px;
  margin: auto;
  .main-carousel {
    width: 100%;
    margin: 20px auto auto auto;
    background-color: #eeeeee;
  }
}
.c-seriesOfProductList {
  display: flex;
  justify-content: space-between;
  .c-seriesOfProduct {
    flex-basis: 0;
    margin-right: 0.9375rem;
    flex-grow: 1;
    cursor: pointer;
    transition: opacity 0.2s linear;
    .c-seriesOfProduct-img {
      height: 0;
      padding-bottom: 100%;
      position: relative;
      .seriesOfProduct-img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .seriesOfProduct-info {
      text-align: center;
      .name {
        color: #6699cc;
        margin-top: 0.5rem;
      }
    }
  }
  .c-seriesOfProduct-placeholder {
    background-color: #eee;
    text-align: center;
    .seriesOfProduct-img-placeholder {
      background-color: #e3e3e3;
      padding: 0.9375rem;
      width: calc(100% - 1.875rem) !important;
      height: calc(100% - 1.875rem) !important;
    }
  }
  .c-seriesOfProduct:last-child {
    margin-right: 0;
  }
  .c-seriesOfProduct:hover {
    opacity: 0.8;
  }
  .placeholder-text {
    text-align: center;
    padding-top: 0.46875rem;
    padding-bottom: 0.46875rem;
    color: #858585;
    font-weight: 700;
    font-size: 0.65rem;
  }
}
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
      color: black;
      font-size: 0.85rem;
    }
    .link {
      font-size: 0.4375rem;
      color: #606266;
      cursor: pointer;
    }
  }
  .product-row {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .product {
      transition: opacity 0.2s linear;
      margin-right: 0.9375rem;
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
          color: #6699cc;
          margin-top: 0.46875rem;
          margin-bottom: 0.3125rem;
        }
        .price {
          margin-bottom: 0.46875rem;
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
      color: black;
    }
  }
}
.c-seriesProduct-featured:last-child {
  border-bottom: none;
}
</style>
