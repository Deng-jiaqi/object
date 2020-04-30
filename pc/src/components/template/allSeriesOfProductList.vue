<template>
  <div class="c-allSeriesOfProductList animated" id="10">
    <h1>{{$t('allSeriesOfProductList.text1')}}</h1>
    <div class="c-sortingWay">
      <p class="sortingWay-text">{{$t('allSeriesOfProductList.text2')}}</p>
      <el-select v-model="sortingWay" @change="sortingWayChange">
        <el-option
          v-for="item in $t('allSeriesOfProductList.options')"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="c-seriesOfProductList">
      <template v-for="(item, index) in pageInfo.collectionlist">
        <div
          @click="toSeriesOfProductCatalog(item.Id)"
          class="c-seriesOfProduct"
          :key="index"
          :class="ifNoMarginRightAndIfPlaceholder(pageInfo.numberOfProductsPerRow,item.placeholder,index)"
          :style="getIntervalStyle(pageInfo.numberOfProductsPerRow)"
        >
          <div class="c-seriesOfProduct-img">
            <el-image
              :src="item.img"
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
          >{{$t('allSeriesOfProductList.text3')}}</div>
        </div>
      </template>
    </div>
    <!-- 分页 -->
    <div class="c-pagination">
      <el-pagination
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :page-count="pagenum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllSeriesOfProductListData } from '@/common/api/api'
export default {
  name: 'AllSeriesOfProductList',
  data () {
    return {
      // data
      pageInfo: {
        collectionlist: [],
        numberOfProductsPerRow: 4,
        numberOfRows: 1
      },
      //   变量
      sortingWay: 'TA',
      noCollectionlist: true,
      numberOfProductsPerRow: '',
      numberOfRows: '',
      timer: null,
      currentPage: 1,
      pagenum: 1
    }
  },
  computed: {
    queryData () {
      return {
        numberOfProductsPerRow: this.numberOfProductsPerRow,
        numberOfRows: this.numberOfRows,
        order: this.sortingWay,
        pagema: this.currentPage
      }
    }
  },
  methods: {
    async handleCurrentChange () {
      // 分页
      let res = await getAllSeriesOfProductListData(this.queryData)
      console.log(res)
      this.handleProductListRes(res)
    },
    handleProductListRes (res) {
      this.pageInfo = res.data.data
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
        case 'modifyProductArrangement_allSeriesOfProductList':
          console.log(this.noCollectionlist)
          if (this.noCollectionlist) {
            // 没有产品系列
            this.pageInfo.collectionlist = []
            let num =
              parseInt(data.params.numberOfProductsPerRow) *
              parseInt(data.params.numberOfRows)
            let collectionlist = []
            for (let i = 0; i < num; i++) {
              collectionlist.push({
                Id: null,
                name: null,
                placeholder: true,
                img: require('@/assets/administratorPanel/templateImg/198.png')
              })
            }
            this.pageInfo.collectionlist = collectionlist
            this.pageInfo.numberOfProductsPerRow =
              data.params.numberOfProductsPerRow
            this.pageInfo.numberOfRows = data.params.numberOfRows
            this.forSortingNumberOfProductsPerRow =
              data.params.numberOfProductsPerRow
            this.forSortingNumberOfRows = data.params.numberOfRows
          } else {
            this.numberOfProductsPerRow = data.params.numberOfProductsPerRow
            this.numberOfRows = data.params.numberOfRows
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
              let res = await getAllSeriesOfProductListData(this.queryData)
              console.log(res)
              this.handleProductListRes(res)
            }, 1000)
          }
          break

        default:
          break
      }
    },
    async sortingWayChange (value) {
      if (!this.noCollectionlist && this.pageInfo.collectionlist.length > 1) {
        let res = await getAllSeriesOfProductListData({
          order: this.sortingWay,
          pagema: this.currentPage
        })
        console.log(res)
        this.pageInfo = res.data.data
        this.pagenum = res.data.data.page.pagenum
        this.currentPage = res.data.data.page.currentpage
        this.pageInfo.numberOfProductsPerRow = this.forSortingNumberOfProductsPerRow
        this.pageInfo.numberOfRows = this.forSortingNumberOfRows
        // this.determineTheLengthOfTheDisplayItemArray(
        //   this.pageInfo.collectionlist,
        //   this.pageInfo.numberOfProductsPerRow,
        //   this.pageInfo.numberOfRows
        // )
      }
    },
    getIntervalStyle (numberOfProductsPerRow) {
      // 根据每行排列个数获取样式
      return `width: calc(${100 / parseInt(numberOfProductsPerRow) +
        '%'} - ${(0.9375 * parseInt(numberOfProductsPerRow - 1)) /
        parseInt(numberOfProductsPerRow)}rem)`
    },
    ifNoMarginRightAndIfPlaceholder (
      numberOfProductsPerRow,
      placeholder,
      index
    ) {
      // 每排最后一个没有右边距
      if ((parseInt(index) + 1) % parseInt(numberOfProductsPerRow) === 0) {
        if (placeholder) {
          return 'no-margin-right c-seriesOfProduct-placeholder'
        } else {
          return 'no-margin-right'
        }
      } else {
        if (placeholder) {
          return 'c-seriesOfProduct-placeholder'
        }
      }
    },
    toSeriesOfProductCatalog (Id) {
      this.$router.push({
        path: '/seriesOfCatalog',
        query: {
          collectid: Id
        }
      })
    }
  },
  async created () {
    let res = await getAllSeriesOfProductListData(this.queryData)
    this.handleProductListRes(res)
    if (!this.pageInfo.collectionlist.length) {
      // 商店还没有产品系列时候页面初始化
      let num =
        parseInt(this.pageInfo.numberOfProductsPerRow) *
        parseInt(this.pageInfo.numberOfRows)
      let collectionlist = []
      for (let i = 0; i < num; i++) {
        collectionlist.push({
          Id: null,
          name: null,
          placeholder: true,
          img: require('@/assets/administratorPanel/templateImg/198.png')
        })
      }
      this.pageInfo.collectionlist = collectionlist
    } else {
      this.noCollectionlist = false
      this.completeCollectionlist = this.pageInfo.collectionlist
    }
  },
  mounted () {
    window.addEventListener('message', this.handleMessage)
  }
}
</script>
<style lang="less" scoped>
.inedit-bg {
  background-color: red !important;
}
.c-allSeriesOfProductList {
  padding: 0 30px 30px 30px;
  max-width: 1140px;
  margin: auto;
  h1 {
    text-align: center;
  }
  .c-sortingWay {
    height: 70px;
    background: #eeeeee;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 20px;
    .sortingWay-text {
      margin-right: 20px;
    }
  }
  .c-seriesOfProductList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .c-seriesOfProduct {
      margin-right: 0.9375rem;
      cursor: pointer;
      transition: opacity 0.2s linear;
      margin-bottom: 20px;
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
    .no-margin-right {
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
  .c-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
