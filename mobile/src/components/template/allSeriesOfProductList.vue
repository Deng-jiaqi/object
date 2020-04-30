<template>
  <div class="c-allSeriesOfProductList">
    <h1>{{$t('allSeriesOfProductList.text1')}}</h1>
    <div class="c-sortingWay">
      <span class="sortingWay-text">{{$t('allSeriesOfProductList.text2')}}</span>
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
import { cloneDeep } from 'lodash'
export default {
  name: 'AllSeriesOfProductList',
  data () {
    return {
      // data
      completeCollectionlist: [],
      pageInfo: {
        collectionlist: [],
        numberOfProductsPerRow: 4,
        numberOfRows: 1
      },
      //   变量
      sortingWay: 'TA',
      noCollectionlist: true,
      forSortingNumberOfProductsPerRow: null, // 侧边栏实时得每行和行数数据
      forSortingNumberOfRows: null,
      currentPage: 1,
      pagenum: 1
    }
  },
  methods: {
    async handleCurrentChange () {
      // 分页
      let res = await getAllSeriesOfProductListData({
        order: this.sortingWay,
        pagema: this.currentPage
      })
      console.log(res)
      this.pageInfo = res.data.data
      this.pagenum = res.data.data.page.pagenum
      this.currentPage = res.data.data.page.currentpage
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
    let res = await getAllSeriesOfProductListData({
      order: this.sortingWay,
      pagema: this.currentPage
    })
    console.log(this.currentPage)
    console.log(typeof this.currentPage)
    console.log(res)
    this.pageInfo = res.data.data
    this.pagenum = res.data.data.page.pagenum
    this.currentPage = res.data.data.page.currentpage
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
    padding: 10px;
    background: #eeeeee;

    margin-bottom: 20px;
    .sortingWay-text {
      margin-right: 10px;
    }
  }
  .c-seriesOfProductList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .c-seriesOfProduct {
      width: 45%;
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
        color: rgba(51, 51, 51, 1);
        .name {
          margin-top: 0.5rem;
          display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 25px;
        font-weight: bold;
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
    justify-content: center;
  }
}
</style>
