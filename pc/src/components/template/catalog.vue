<template>
  <div class="shop-body">
    <div class="c-catalog animated" id="8">
      <h1 v-if="!collectionName">{{$t('shopProduct.title')}}</h1>
      <h1 v-if="collectionName">{{collectionName}}</h1>
      <div>
        <div class="Product-content" v-if="catalogInfo.WhetherToDisplayOrder">
          <div>
            <p class="sortby">{{$t('shopProduct.content.text1')}}</p>
            <el-select
              v-model="sortingWay"
              :placeholder="$t('shopProduct.content.place1')"
              @change="sortingWayChange"
            >
              <el-option
                v-for="item in $t('shopProduct.options')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <p style="margin-right: 20px">
            <span>{{totalMerchandiseQuantity}}</span>
            {{$t('shopProduct.content.text2')}}
          </p>
        </div>
        <!-- 商品列表 -->
        <div class="product-row">
          <div
            class="product"
            :class="ifNoMarginRight(catalogInfo.numberOfProductsPerRow,index)"
            :style="getIntervalStyle(catalogInfo.numberOfProductsPerRow)"
            v-for="(item,index) in catalogInfo.catalog"
            :key="index"
            @click="toProductDetails(item.Id)"
          >
            <div class="c-product-img">
              <el-image :src="item.imgsrc" :class="item.placeholder?'placeholder-img':''" lazy />
            </div>
            <div class="product-info">
              <p class="title">{{item.name}}</p>
              <p class="price" v-if="catalogInfo.WhetherToDisplayPrice">$ {{item.price}}</p>
            </div>
          </div>
        </div>
        <div class="no-search-data" v-show="noSearchData">{{$t('shopProduct.content.text3')}}</div>
        <!-- 分页 -->
        <div class="c-pagination" v-show='catalogInfo.catalog.length'>
          <el-pagination
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :page-count="pagenum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCatalogInfo } from '@/common/api/api'
export default {
  name: 'shopProduct',
  data () {
    return {
      // 变量
      collectionName: '',
      sortingWay: 'TA',
      numberOfProductsPerRow: '',
      numberOfRows: '',
      timer: null,
      noCatalogData: true,
      noSearchData: false,
      currentPage: 1,
      pagenum: 1,
      from: '', // 从搜索或者哪里进入页面
      // data
      catalogInfo: {
        WhetherToDisplayPrice: true,
        WhetherToDisplayOrder: true, // 是否展示排序
        WhetherToDisplayImage: true, // 是否展示产品系列图片
        numberOfProductsPerRow: '4',
        numberOfRows: '1',
        catalog: []
      }
    }
  },
  computed: {
    totalMerchandiseQuantity () {
      return this.catalogInfo.catalog.length
    },
    routerInfo () {
      return this.$route.path
    }
  },
  methods: {
    async handleCurrentChange () {
      // 分页
      if (this.from === 'search') {
        let res = await getCatalogInfo({
          goodsname: this.$route.query.goodsname,
          order: this.sortingWay,
          pagema: this.currentPage
        })
        this.handleCatalogRes(res)
      } else {
        let collectid = null
        if (this.$route.query.collectid) {
          collectid = this.$route.query.collectid
        }
        let res = await getCatalogInfo({
          collectid: collectid,
          numberOfProductsPerRow: this.numberOfProductsPerRow,
          numberOfRows: this.numberOfRows,
          order: this.sortingWay,
          pagema: this.currentPage
        })
        this.handleCatalogRes(res)
      }
    },
    handleCatalogRes (res) {
      this.catalogInfo = res.data.data
      this.pagenum = res.data.data.page.pagenum
      this.currentPage = res.data.data.page.currentpage
    },
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
        case 'modifyPriceDisplay_catalog':
          this.catalogInfo.WhetherToDisplayPrice =
            data.params.WhetherToDisplayPrice
          break
        case 'modifySortingWayDisplay_catalog':
          this.catalogInfo.WhetherToDisplayOrder =
            data.params.WhetherToDisplayOrder
          break
        case 'modifyProductArrangement_catalog': {
          if (this.noCatalogData) {
            // 没有商品
            this.catalogInfo.catalog = []
            let num =
              parseInt(data.params.numberOfProductsPerRow) *
              parseInt(data.params.numberOfRows)
            let catalog = []
            for (let i = 0; i < num; i++) {
              catalog.push({
                placeholder: true,
                imgsrc: require('@/assets/administratorPanel/templateImg/252.png'),
                name: this.$t('sampleProductTitle'),
                price: '19.99'
              })
            }
            this.catalogInfo.catalog = catalog
            this.catalogInfo.numberOfProductsPerRow =
              data.params.numberOfProductsPerRow
            this.catalogInfo.numberOfRows = data.params.numberOfRows
            this.forSortingNumberOfProductsPerRow =
              data.params.numberOfProductsPerRow
            this.forSortingNumberOfRows = data.params.numberOfRows
          } else {
            this.numberOfProductsPerRow = data.params.numberOfProductsPerRow
            this.numberOfRows = data.params.numberOfRows
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
              let res = await getCatalogInfo({
                numberOfProductsPerRow: this.numberOfProductsPerRow,
                numberOfRows: this.numberOfRows,
                pagema: this.currentPage,
                order: this.sortingWay
              })
              console.log(res)
              this.handleCatalogRes(res)
            }, 1000)
          }
          break
        }
        default:
          break
      }
    },
    getIntervalStyle (numberOfProductsPerRow) {
      // 根据每行排列个数获取样式
      return `width: calc(${100 / parseInt(numberOfProductsPerRow) +
        '%'} - ${(0.9375 * parseInt(numberOfProductsPerRow - 1)) /
        parseInt(numberOfProductsPerRow)}rem)`
    },
    ifNoMarginRight (numberOfProductsPerRow, index) {
      // 每排最后一个没有右边距
      if ((parseInt(index) + 1) % parseInt(numberOfProductsPerRow) === 0) {
        return 'no-margin-right'
      }
    },
    async sortingWayChange (value) {
      if (this.from === 'search') {
        if (this.catalogInfo.catalog.length > 1) {
          let res = await getCatalogInfo({
            goodsname: this.$route.query.goodsname,
            order: this.sortingWay,
            pagema: this.currentPage
          })
          this.handleCatalogRes(res)
        }
      } else {
        if (!this.noCatalogData && this.catalogInfo.catalog.length > 1) {
          let collectid = null
          if (this.$route.query.collectid) {
            collectid = this.$route.query.collectid
          }
          let res = await getCatalogInfo({
            collectid: collectid,
            numberOfProductsPerRow: this.numberOfProductsPerRow,
            numberOfRows: this.numberOfRows,
            order: this.sortingWay,
            pagema: this.currentPage
          })
          this.handleCatalogRes(res)
        }
      }
    },
    // 点击跳转到产品详情
    toProductDetails (Id) {
      this.$router.push({
        path: 'productDetails',
        query: {
          productid: Id
        }
      })
    }
  },
  watch: {
    '$route.query.goodsname': {
      // 在这个页面再次搜索
      async handler (val) {
        console.log(val)
        let res = await getCatalogInfo({
          goodsname: this.$route.query.goodsname,
          order: this.sortingWay,
          pagema: this.currentPage
        })
        this.handleCatalogRes(res)
        if (this.catalogInfo.catalog.length === 0) {
          this.noSearchData = true
        }
      }
    }
  },
  async created () {
    // 从搜索商品进入页面
    if (this.routerInfo === '/searchCatalog') {
      this.from = 'search'
      let res = await getCatalogInfo({
        goodsname: this.$route.query.goodsname,
        order: this.sortingWay,
        pagema: this.currentPage
      })
      this.handleCatalogRes(res)
      if (this.catalogInfo.catalog.length === 0) {
        this.noSearchData = true
      }
      return
    }
    // 其它方式
    this.collectionName = this.$route.query.collectionName
    let collectid = null
    if (this.$route.query.collectid) {
      collectid = this.$route.query.collectid
    }
    let res = await getCatalogInfo({
      collectid: collectid,
      order: this.sortingWay,
      pagema: this.currentPage
    })
    this.handleCatalogRes(res)
    if (this.catalogInfo.catalog.length === 0) {
      // 没有数据时候初始化数据
      let num =
        parseInt(this.catalogInfo.numberOfProductsPerRow) *
        parseInt(this.catalogInfo.numberOfRows)
      let catalog = []
      for (let i = 0; i < num; i++) {
        catalog.push({
          placeholder: true,
          imgsrc: require('@/assets/administratorPanel/templateImg/252.png'),
          name: this.$t('sampleProductTitle'),
          price: '19.99'
        })
      }
      this.catalogInfo.catalog = catalog
    } else {
      this.noCatalogData = false
    }
    this.forSortingNumberOfProductsPerRow = this.catalogInfo.numberOfProductsPerRow
    this.forSortingNumberOfRows = this.catalogInfo.numberOfRows
    console.log(this.catalogInfo)
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>
<style  lang="less" scoped>
.inedit-bg {
  background-color: red !important;
}
.flexCss {
  display: flex;
  justify-content: center;
  align-items: center;
}
.shop-body {
  .c-catalog {
    margin: auto;
    max-width: 1140px;
    padding: 30px 30px 100px 30px;
  }
}

.Product-content {
  height: 70px;
  background: #eeeeee;
  .flexCss;
  justify-content: space-between;
  div:nth-child(1) {
    .flexCss;
    justify-content: space-between;
    margin-left: 20px;
  }
  .sortby {
    margin-right: 10px;
  }
}
.Product-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .Product-box1 {
    cursor: pointer;
    margin: 20px 0 0 0;
    > p {
      text-align: center;
    }
    .Product-imgBox {
      transition: opacity 0.3s linear;
      width: 100%;
      height: 13.125rem;
      border: 1px solid #d7d7d7;
      .flexCss;
      img {
        max-height: 100%;
        max-width: 100%;
      }
    }
  }
}
.Product-box1:hover .Product-imgBox {
  opacity: 0.8;
}
.product-row {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  .product {
    transition: opacity 0.2s linear;
    cursor: pointer;
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
        word-wrap: break-word;
      }
      .price {
        margin-bottom: 0.46875rem;
      }
    }
  }
  .product:hover {
    opacity: 0.8;
  }
  .no-margin-right {
    margin-right: 0;
  }
}
.no-search-data {
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
