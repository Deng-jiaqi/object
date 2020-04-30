<template>
  <el-row>
    <el-col :span="24">
      <div class="allProducts" v-if="getLengths > 0" v-loading="loading">
        <div class="header">
          <h1 class="header-h1">{{$t('product.header.title')}}</h1>
          <el-button type="primary" style="background-color: #385CA5" @click="addChanPin">{{$t('product.header.btn')}}</el-button>
        </div>
        <!--    头部搜索-->
        <div class="header-search">
          <div class="allInventory">
            <p>{{$t('product.header.allText')}}</p>
            <div></div>
          </div>
          <div class="div-search">
            <input class="search" v-model="input" :placeholder="$t('product.header.search')" @input="souSuo" />
            <span class="iconfont icon-sousuo4"></span>
            <button v-if="getTotal.length>0" @click="editProCP" class="serBtn">{{$t('product.edit.text')}}({{getTotal.length}})</button>
            <el-popover
                placement="bottom"
                v-model="visibleBj"
                v-if="getTotal.length>0"
                trigger="click">
              <div class="btn1-bianJi">
                <ul>
                  <li v-for="(item,index) in $t('product.edit.text2.list')" :key="index" @click="clickmsg(item,index)">{{item.text}}</li>
                </ul>
              </div>
              <button slot="reference" class="serBtnTwo">{{$t('product.edit.text2.title')}}</button>
            </el-popover>
          </div>
        </div>
        <!--    表格-->
        <div class="inventory-table">
          <table v-if="judgeLength>0" v-loading="loading">
            <thead>
            <th width="20px">
              <input id="allPitch" type="checkBox" class="check_box tui-checkbox" @click="selectProduct(isSelectAll)"
                     v-bind:checked="isSelectAll" />
            </th>
            <th width="140px">{{$t('product.table.thead.th1')}}</th>
            <th width="110px">{{$t('product.table.thead.th2')}}</th>
            <th width="160px">{{$t('product.table.thead.th3')}}</th>
            <th width="140px">{{$t('product.table.thead.th4')}}</th>
            </thead>
            <tbody style="text-align: center">
            <tr v-for="(item, index) in allProducts" :key="index" @click="routerDetails(item)">
              <td><input type="checkBox" class="check_box tui-checkbox"
                         v-bind:checked="item.isSelect"
                         @click="item.isSelect=!item.isSelect"
                         @click.stop
              /></td>
              <td class="td-imgBox">
                <div>
                  <img :src=item.smimg alt="">
                </div>
                <div class="td-text-hide">
                  <p class="text-hide">{{item.goodsname}}</p>
                  <p>{{item.status}}</p>
                </div>
              </td>
              <td width="300px">
                <p>{{item.inventory}} <span><span>{{item.multinum}}</span> {{$t('product.table.tbody.text')}}</span></p>
              </td>
              <td style="color: #FFA400" width="30px"></td>
              <td><span>wuji</span></td>
            </tr>
            </tbody>
          </table>
          <div class="searchJudge" v-loading="loading" v-else>
            <el-row>
              <el-col class="searchJudgeBox">
                <div>
                  <img src="../../../assets/addShop/fangdajing.png" alt="">
                </div>
                <p>{{$t('product.searchHint.text1')}}</p>
                <p>{{$t('product.searchHint.text2')}}</p>
              </el-col>
            </el-row>
          </div>
          <div class="footerBox">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>
        <!--    添加产品系列和删除产品系列-->
        <el-dialog
            :title="hintTitle + getTotal.length + $t('product.elDialog.text1')"
            :visible.sync="dialogVisibleEdit"
            width="40%">
          <div class="mtl-box">
            <el-input :placeholder="$t('product.elDialog.place')" v-model="serchProducts" @input="searchCollection"></el-input>
            <div class="notFont" v-if="showData.length < 1">
              <p>{{$t('product.elDialog.text2')}}</p>
            </div>
            <ul>
              <li v-for="(item, index) in showData" :key="index" @click="addOrDelPro(item,index)"
                  @mouseover="overLi(item)"
                  @mouseout="outLi(item)"
                  :class="item.judge === false ? mtlLiCss[0] : mtlLiCss[1]">
            <span v-if="item.judge === true">
               <span @click="delXprp(item)" v-if="item.hideSpan === true" @click.stop style="font-size: 20px">×</span>
              <span v-else>√</span>
            </span>&nbsp;&nbsp;{{item.name}}
              </li>
            </ul>
          </div>
          <div v-show="judgeSite" v-if="titleData.length > 0">
            <div class="editWarehouse-box2">
              <p>{{hintTitleTwo}}</p>
              <p v-if="titleData.length > 0">{{titleData.join(',')}}</p>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEdit = false">{{$t('product.elDialog.btn1')}}</el-button>
          <el-button @click="savePros" type="primary">{{$t('product.elDialog.btn2')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <div v-else>
        <div class="allProducts-header">
          <h1 class="header-h1">{{$t('product.header.title')}}</h1>
        </div>
        <el-row :gutter="20" class="allProducts-content flexBetween">
          <el-col :span="12" class="flexCss">
            <img src="../../../assets/product/allproduct.png" alt="">
          </el-col>
          <el-col :span="12" class="allProducts-text">
            <p>{{$t('product.addHint.text1')}}</p>
            <p>{{$t('product.addHint.text2')}}</p>
            <el-button type="primary" @click="addChanPin">{{$t('product.addHint.btn')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { productlist, ProductShelves, Xshowcollect } from '../../../common/api/api'

export default {
  name: 'allProducts',
  // inject: ['reload'],
  data () {
    return {
      timer: '', // 定时器
      getLengths: 1,
      titleData: [], // 获取选中的产品系列名称
      serchProducts: '', // 搜索产品系列集合
      hideSpan: false, // 隐藏删除按钮
      mtlLiCss: ['mtlLiCssOne', 'mtlLiCssTwo'],
      hintTitle: '', // 提示语句
      hintTitleTwo: '', // 提示语句
      dialogVisibleEdit: false, // 添加产品系列或者删除模态框
      judgeSite: false,
      loading: true,
      show: false,
      visibleBj: false, // 控制产品框
      usableNum: '1', //  可用数量
      options: [],
      input: '',
      num: 1,
      multipleSelection: [],
      allProducts: [], // 表单数据
      judgeLength: 0, // 判断allProducts的长度
      timeout: null,
      type: Number,
      getPage: Number, // 获取页数
      pageSize: 1, // 每页条数
      currentPage: 1, // 当前页
      total: 3, // 页数
      showData: [] // 显示所有产品系列
    }
  },
  methods: {
    // 跳转到产品详情
    routerDetails (item) {
      sessionStorage.setItem('PrId', item.id)
      this.$router.push({ path: '/administratorPanel/productInventory/allProducts/productDetails' })
    },
    // 跳转到添加产品
    addChanPin () {
      this.$router.push({
        path: 'addShop',
        query: {}
      })
    },
    // 批量编辑产品
    editProCP () {
      let getProcdut = []
      this.getTotal.forEach(val => {
        getProcdut.push(val.id)
      })
      this.$router.push({
        path: '/bulkEdit',
        query: {
          id: getProcdut
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 请求表单列表
    search () {
      let arr = []
      this.loading = true
      productlist({}).then(resp => {
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          arr.push(res)
        })
        if (resp.data.data.data.length > 0) {
          this.allProducts = resp.data.data.data
          this.judgeLength = resp.data.data.data.length
        } else {
          this.judgeLength = resp.data.data.data.length
        }
        this.loading = false
      })
    },
    // 请求表单数据
    setSearch () {
      this.loading = true
      let arr = []
      if (this.input === '') {
        this.search()
        this.loading = false
      } else {
        productlist({
          goodsname: this.input
        }).then(resp => {
          this.loading = false
          this.currentPage = Number(resp.data.data.page.currentpage)
          this.total = Number(resp.data.data.page.pagenum)
          resp.data.data.data.forEach((res) => {
            this.$set(res, 'isSelect', false)
            arr.push(res)
          })
          if (resp.data.data.data.length > 0) {
            this.allProducts = resp.data.data.data
            this.judgeLength = resp.data.data.data.length
          } else {
            this.judgeLength = resp.data.data.data.length
          }
        })
      }
    },
    // 输入搜索
    souSuo () {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.setSearch()
      }, 500)
    },
    // 搜索集合
    searchCollection () {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.getShowcollect()
      }, 1000)
    },
    // 请求：编辑选项请求
    getProduct () {
      let getId = []
      let collectid = []
      this.getTotal.forEach(val => { getId.push(val.id) })
      if (this.type === 3 || this.type === 4) {
        this.showData.forEach(val => {
          if (val.judge === true) {
            collectid.push(val.Id)
          }
        })
      }
      ProductShelves({
        idarr: getId,
        type: this.type,
        collectid: collectid
      }).then(resp => {
        this.visibleBj = false
        this.search()
        this.$message({ type: 'success', message: resp.data.msg })
        // this.reload()
      })
    },
    // 请求: 搜索产品系列
    getShowcollect () {
      Xshowcollect({
        name: this.serchProducts
      }).then(resp => {
        this.showData = resp.data.data
        this.showData.forEach(val => {
          this.$set(val, 'judge', false)
          this.$set(val, 'hideSpan', false)
        })
      })
    },
    // 循环获取当前选中的产品系列
    getProS () {
      this.titleData = []
      this.showData.forEach(val => {
        if (val.judge === true) {
          this.titleData.push(val.name)
        }
      })
    },
    // 选中当前产品系列   添加或者删除产品系列
    addOrDelPro (item) {
      this.judgeSite = true
      item.judge = !item.judge
      this.getProS()
    },
    // 鼠标移入
    overLi (item) {
      item.hideSpan = true
    },
    // 鼠标移出
    outLi (item) {
      item.hideSpan = false
    },
    // 删除当前选中的产品系列
    delXprp (item) {
      item.judge = false
      this.getProS()
    },
    // 保存选中的产品系列
    savePros () {
      let getId = []
      this.getTotal.forEach(val => { getId.push(val.id) })
      this.dialogVisibleEdit = false
      this.getProduct()
    },
    // 事件委托，产品上架，下架，删除所选
    clickmsg (item, index) {
      this.type = index
      if (index === 0 || index === 1) {
        this.getProduct()
      } else if (index === 2) {
        this.$confirm(this.$t('product.hint.text1'), this.$t('product.hint.text2'), {
          confirmButtonText: this.$t('product.hint.text3'),
          cancelButtonText: this.$t('product.hint.text4'),
          type: 'warning'
        }).then(() => {
          this.getProduct()
        }).catch(() => { this.$message({ type: 'info', message: this.$t('product.hint.text5') }) })
      } else if (index === 3) {
        this.hintTitle = this.$t('product.hint.text6')
        this.hintTitleTwo = this.$t('product.hint.text7') + this.getTotal.length + this.$t('product.hint.text8')
        this.dialogVisibleEdit = true
        this.getShowcollect()
      } else {
        this.hintTitle = this.$t('product.hint.text9')
        this.hintTitleTwo = this.$t('product.hint.text10') + this.getTotal.length + this.$t('product.hint.text11')
        this.dialogVisibleEdit = true
        this.getShowcollect()
      }
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.allProducts.length; i++) {
        this.allProducts[i].isSelect = !isSelect
      }
    },
    getData () {
      let arr = []
      productlist({ page: this.getPage }).then(resp => {
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          arr.push(res)
        })
        this.allProducts = resp.data.data.data
      })
    },
    // 分页
    handleCurrentChange (val) {
      this.getPage = val
      this.getData()
    },
    handleSizeChange (val) {
      this.getPage = val
      this.getData()
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  computed: {
    // 检测是否全选
    isSelectAll () {
      // 如果productList中每一条数据的isSelect都为true，返回true，否则返回false;
      return this.allProducts.every(function (val) {
        return val.isSelect
      })
    },
    getTotal () {
      var prolist = this.allProducts.filter(function (val) {
        return val.isSelect
      })
      return prolist
    }
  },
  mounted: function () {
    var _this = this
    // 为productList添加select（是否选中）字段，初始值为true
    this.allProducts.map(function (item) {
      _this.$set(item, 'isSelect', false)
    })
  },
  created () {
    let arr = []
    productlist({}).then(resp => {
      this.loading = false
      this.currentPage = Number(resp.data.data.page.currentpage)
      this.total = Number(resp.data.data.page.pagenum)
      resp.data.data.data.forEach((res) => {
        this.$set(res, 'isSelect', false)
        arr.push(res)
      })
      if (resp.data.data.data.length > 0) {
        this.allProducts = resp.data.data.data
        this.getLengths = resp.data.data.data.length
        this.judgeLength = resp.data.data.data.length
      } else {
        this.getLengths = resp.data.data.data.length
        this.loading = false
        this.judgeLength = resp.data.data.data.length
      }
    }).catch(err => {
      this.loading = false
      this.$message(err)
    })
  }
}
</script>
<style lang="less">
  .el-popover {
    > .popper__arrow {
      display: none;
    }
  }
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  .btn1-bianJi {
    background-color: white;
    border-radius: 8px;
    ul {
      li {
        cursor: pointer;
        text-align: center;
        height: 40px;
        line-height: 40px;
      }
      >li:nth-child(3){
        border-bottom: 1px solid #D5D5D5;
      }
    }
    li:hover {
      background-color: #5c6ac4;
      color: white;
    }
  }
  .flexBetween{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .allProducts {
    font-size: 16px;
    background-color: #F5F6F8;
    margin: auto;
    padding: 0 20px;
    .header {
      .flexBetween;
      height: 120px;
    }
    .header-search {
      .allInventory {
        border: 1px solid #dedede;
        background-color: white;
        border-radius: 0.125rem;
        height: 60px;
        .flexBetween;
        .allInventory-choose {
          height: 64px;
          padding: 10px;
        }
        >p{
          margin-left: 24px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 7px solid #fda506;
          height: 34px;
          line-height: 30px;
          margin-bottom: 0;
        }
      }
      .div-search {
        border: 1px solid #dedede;
        border-radius: 0.125rem;
        background-color: white;
        padding: 18px 28px;
        position: relative;
        display: flex;
        align-items: center;
        .icon-sousuo4 {
          position: absolute;
          left: 40px;
          top: 29px;
          font-size: 20px;
        }
        .serBtn {
          height: 46px;
          width: 180px;
          background-color: #f8f8f8;
          border: 1px solid #dedede;
          border-style: solid solid solid none;
        }
        .serBtnTwo{
          .serBtn;
          width: 90px;
        }
        input {
          width: 100%;
          padding: 14px 14px 14px 36px;
          border: 1px solid #dedede;
          outline: none;
          transition: all 0.2s linear;
          border-radius: 2px;
        }
        input:focus{
          border: 1px solid #4267b2;
          border-radius: 2px;
        }
      }
    }
    .inventory-table {
      margin-top: 18px;
      table {
        width: 100%;
        border-collapse: collapse;
        tr{
          border-bottom: 1px solid #e5e5e5;
        }
        thead {
          background-color: #EEEEEE;
          th {
            padding: 18px;
            font-size: 16px;
          }
        }
        tbody {
          background-color: white;
          tr {
            transition: all 0.1s linear;
          }
          tr:hover {
            background-color: #f4f5fa;
          }
          td {
            padding: 12px 0;
          }
        }
      }
      .saveBtn {
        color: white;
        background-color: #6C8AC7;
        width: 105px;
        height: 47px;
      }
      .td-imgBox {
        text-align: left;
        .flexCss;
        justify-content: flex-start;
        > div:nth-child(1) {
          .flexCss;
          border-radius: 4px;
          width: 85px;
          height: 82px;
          background-color: #D6D6D6;
          justify-content: center;
          margin-right: 10px;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
  .footerBox{
    display: flex;
    justify-content: flex-end;
    margin: 40px 0 40px 0;
  }
  .flexCss{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .searchJudge{
    height: 500px;
    background-color: white;
    .flexCss;
    .searchJudgeBox{
      .flexCss;
      flex-direction: column;
      >div:nth-child(1){
        width: 60px;
        height: 60px;
        >img{
          max-width: 100%;
          max-height: 100%;
        }
      }
      >p:nth-child(2){
        font-size: 24px;
        font-weight: 400;
        line-height: 24px;
      }
      >p:nth-child(3){
        color: #637381;
        margin: 0 0 0.8rem;
      }
    }
  }
  .mtl-box{
    >ul{
      .mtlLiCssOne{
        line-height: 30px;
        cursor: pointer;
        height: 30px;
        padding-left: 30px;
        color: rgb(74,161,220);
      }
      .mtlLiCssTwo{
       .mtlLiCssOne;
        color: #BFBFBF;
      }
      >li:hover{
        background-color: rgb(0,120,189);
        color: white;
      }
    }
  }
  .editWarehouse-box2{
    background-color: #fffbe9;
    color: #635341;
    padding: 6px 20px;
  }
  .notFont{
    .flexCss;
    margin: 30px auto;
  }
  .allProducts-header{
    height: 120px;
    line-height: 120px;
    border-bottom: 1px solid #e3e3e3;
  }
  .allProducts-content{
    margin: 30px auto 80px auto;
    >div{
      >img{
        max-height: 100%;
        max-width: 100%;
      }
    }
    .allProducts-text{
      >p:nth-child(1){
        font-size: 26px;
        color: black;
        font-weight: 400;
      }
      >p:nth-child(2){
        font-size: 22px;
        color: #898989;
      }
    }
  }
</style>
