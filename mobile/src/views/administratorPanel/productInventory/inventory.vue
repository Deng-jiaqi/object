<template>
  <el-row>
    <el-col :span="24">
      <div class="inventory" v-if="judgeNum !== 0" v-loading="loading">
        <div class="header">
          <h2 class="header-h1">{{$t('inventory.header.title')}}</h2>
          <el-button type="primary" @click="routerChanPin">{{$t('inventory.header.btn')}}</el-button>
        </div>
        <!--    头部搜索-->
        <div class="header-search">
          <div class="allInventory">
            <p>{{$t('inventory.header.allText')}}</p>
            <div class="allInventory-choose" v-if="options.length > 0">
              <el-select
                v-model="value"
                v-loading="loading"
                :placeholder="$t('inventory.header.select.placeholder')"
                @change="getDataAttr($event)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.locateid"
                  :label="item.name"
                  :value="item.locateid"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="div-search">
            <input
              class="search"
              v-model="searchData"
              @input="search"
              :placeholder="$t('inventory.header.search')"
            />
            <!-- <span class="iconfont icon-sousuo4"></span> -->
            <img class="icon-img" src="../../../assets/addShop/search_01.png" alt />
            <button
              v-if="getTotal.length>0"
              @click="editProCP"
              class="serBtn"
            >{{$t('inventory.edit.text')}}({{getTotal.length}})</button>
            <el-popover
              v-if="getTotal.length>0"
              placement="bottom"
              v-model="visibleBj"
              trigger="click"
            >
              <div class="btn1-bianJi">
                <ul>
                  <li
                    v-for="(item,index) in $t('inventory.edit.text2.list')"
                    :key="index"
                    :data-index="index"
                    @click="clickmsg(item)"
                  >{{item}}</li>
                </ul>
              </div>
              <button slot="reference" class="serBtnTwo">{{$t('inventory.edit.text2.title')}}</button>
            </el-popover>
          </div>
        </div>
        <!--    表格-->
        <div class="inventory-table">
          <table v-loading="loading" v-if="trData.length > 0">
            <thead>
              <th>
                <input
                  type="checkBox"
                  class="check_box tui-checkbox"
                  @click="selectProduct(isSelectAll)"
                  v-bind:checked="isSelectAll"
                />
              </th>
              <th class="input-th1">{{$t('inventory.table.thead.th1')}}</th>
              <th width="20">{{$t('inventory.table.thead.th2')}}</th>
              <!--            <th>{{$t('inventory.table.thead.th3')}}</th>-->
              <th>{{$t('inventory.table.thead.th4')}}</th>
            </thead>
            <tbody style="text-align: center">
              <tr v-for="(item, index) in trData" :key="index">
                <td>
                  <input
                    type="checkbox"
                    class="check_box tui-checkbox"
                    v-bind:checked="item.isSelect"
                    @click="item.isSelect=!item.isSelect"
                  />
                </td>
                <td class="td-imgBox">
                  <div @click="productDes(item)">
                    <img :src="item.img === null ? missImage : item.img" alt />
                  </div>
                  <div class="td-imgBox-text">
                    <p
                      class="text-hide"
                      @click="item.attrpid !== 0 ? productDetails(item) : productDes(item)"
                    >
                      <el-link type="primary">{{item.goodsname}}</el-link>
                    </p>
                    <p
                      class="text-hide"
                      @click="item.attrpid !== 0 ? productDetails(item) : productDes(item)"
                    >
                      <el-link type="primary">{{item.attr_value}}</el-link>
                    </p>
                  </div>
                </td>
                <td>
                  <span style="color: #FFA400">{{item.storage}}</span>
                  <span v-if="item.num !==0 && item.num !==''">></span>
                  <span v-if="item.num !==0">
                    <span
                      v-if="item.addNum === true"
                    >{{ item.num !== undefined ? newSetNum = Number(item.num)+ Number(item.storage) : newSetNum = Number(item.num = 0)+ Number(item.storage)}}</span>
                    <span v-else-if="item.setNum === true">{{ newSetNum = trData[index].num }}</span>
                  </span>
                </td>
                <td>
                  <div class="compileNum">
                    <el-button-group style="display: flex;">
                      <el-button
                        v-model="item.addNum"
                        @click="addNumFun(item)"
                        :class="[item.addNum === true ? sxColor[0] : sxColor[1]]"
                      >{{$t('inventory.table.tbody.btn1')}}</el-button>
                      <el-button
                        v-model="item.setNum"
                        @click="setNumFun(item)"
                        :class="[item.setNum === true ? sxColor[0] : sxColor[1]]"
                      >{{$t('inventory.table.tbody.btn2')}}</el-button>
                    </el-button-group>
                    <el-input-number
                      style="margin: 4px 0"
                      @change="setMinNum(item.num)"
                      v-model="item.num"
                      :min="0"
                      :max="999999"
                      :label="$t('inventory.table.tbody.label1')"
                    ></el-input-number>
                    <el-button
                      class="saveBtn"
                      @click="saveEditNum(item)"
                    >{{$t('inventory.table.tbody.btn3')}}</el-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="searchJudge" v-loading="loading" v-else>
            <el-row>
              <el-col class="searchJudgeBox">
                <div>
                  <img src="../../../assets/addShop/fangdajing.png" alt />
                </div>
                <p>{{$t('inventory.searchHint.text1')}}</p>
                <p>{{$t('inventory.searchHint.text2')}}</p>
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
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <!--    更新库存数量-->
        <el-dialog
          :title="$t('inventory.elDialog.title')"
          :visible.sync="dialogVisibleNum"
          width="80%"
        >
          <div class="updateNum">
            <el-button-group>
              <el-button
                v-for="(item, index) in this.$t('inventory.btnSet')"
                :key="index"
                :class="{ 'compileBtn': active === index }"
                @click="qieHuanClass(index)"
              >{{item.text}}</el-button>
              <el-input-number
                v-model="setNum"
                :min="0"
                :max="999999"
                :label="$t('inventory.elDialog.label')"
              ></el-input-number>
            </el-button-group>
          </div>
          <div class="updateNum-box">
            <p>
              {{getAttrs.length}}
              <span>{{$t('inventory.elDialog.text1')}}</span>
            </p>
            <ul>
              <li v-for="(item, index) in getAttrs" :key="index">
                <p>
                  <span>{{item.goodsname}}</span>-
                  <span>{{item.attr}}</span>
                </p>
                <p>
                  {{item.storage}}
                  <span v-if="setNum !== 0">></span>
                  <span v-if="setNum !== 0" class="spanCss">
                    <span v-if="active === 1">{{item.num = setNum}}</span>
                    <span v-else>{{item.num = Number(setNum) + Number(item.storage)}}</span>
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleNum = false">{{$t('inventory.elDialog.btn1')}}</el-button>
            <el-button
              type="primary"
              @click="saveSetNum"
              v-model="saveSetNum"
            >{{$t('inventory.elDialog.btn2')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="inventory-two" v-else>
        <div class="allProducts-header">
          <h1 class="header-h1">{{$t('inventory.header.title')}}</h1>
        </div>
        <el-row class="allProducts-content">
          <el-col :span="24">
            <img src="../../../assets/product/kucun.png" alt />
          </el-col>
          <el-col :span="24" class="allProducts-text">
            <p>{{$t('inventory.addHint.text1')}}</p>
            <p>{{$t('inventory.addHint.text2')}}</p>
            <el-button type="primary" @click="routerChanPin">{{$t('inventory.addHint.btn1')}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { inventoryMsg, updatenum, showlocation, showupdatenum } from '../../../common/api/api'

export default {
  name: 'inventory',
  inject: ['reload'],
  data () {
    return {
      missImage: require('../../../assets/addShop/tupian.png'),
      timer: '', // 定时器
      newSetNum: '',
      judgeNum: 1,
      loadingOptions: true,
      loading: true,
      searchData: '', // 搜索
      trData: [],
      getAttrs: [],
      setNum: 0,
      getLength: false,
      dialogVisibleNum: false, // 更新数量模态框状态
      active: 0,
      sxColor: [
        'compileBtn',
        'compileBtn1'
      ],
      visibleBj: false,
      usableNum: '1', //  可用数量
      options: [],
      value: 1,
      input: '',
      num: 1,
      multipleSelection: [],
      judgeIndex: 0, // 判断设置或者添加的下标
      getPage: Number, // 获取页数
      pageSize: 1, // 每页条数
      currentPage: 1, // 当前页
      total: 3, // 页数
      judgeLength: 0, // 判断trData的长度
      getId: null // 获取仓库id
    }
  },
  methods: {
    setMinNum (item) {
      if (item === undefined) {
        item = 0
      }
    },
    // 请求表单数据
    setSearch () {
      this.loading = true
      inventoryMsg({
        goodsname: this.searchData,
        location_id: this.value
      }).then(resp => {
        this.loading = false
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          this.$set(res, 'addNum', true)
          this.$set(res, 'setNum', false)
          this.$set(res, 'num', 0)
        })
        this.trData = resp.data.data.data
      })
    },
    // 搜索
    search () {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.setSearch()
      }, 500)
    },
    // 批量编辑产品
    editProCP () {
      let getProcdut = []
      this.getTotal.forEach(val => {
        getProcdut.push(val.productid)
      })
      this.$router.push({
        path: '/bulkEdit',
        query: {
          id: getProcdut
        }
      })
    },
    // 更新库存数量
    clickmsg () {
      let arr = []
      this.dialogVisibleNum = true
      this.getTotal.forEach(val => {
        arr.push(val.locategid)
      })
      showupdatenum({
        locategid: arr
      }).then(resp => {
        this.getAttrs = []
        resp.data.data.forEach(val => {
          this.$set(val, 'num', 0)
          this.getAttrs.push(val)
        })
      })
    },
    // 保存更新数量
    saveSetNum () {
      let attr = []
      this.getAttrs.forEach(val => {
        attr.push(val.locategid + '-' + val.num)
      })
      updatenum({
        attr: attr
      }).then(resp => {
        this.$message(resp.data.msg)
        this.dialogVisibleNum = false
        this.reload()
      })
    },
    // 切换设置和添加
    qieHuanClass (index) {
      this.active = index
    },
    // 查看产品
    routerChanPin () {
      this.$router.push({
        path: '/administratorPanel/productInventory/allProducts',
        query: {}
      })
    },
    // 点击当前产品名称跳转属性详情
    productDetails (item) {
      this.$router.push({
        path: '/administratorPanel/productInventory/inventory/multiattributeDetail',
        query: {
          attrpid: item.attrpid,
          productid: item.productid
        }
      })
    },
    // 点击当前图片跳转详情
    productDes (item) {
      console.log(item)
      sessionStorage.setItem('PrId', item.productid)
      this.$router.push({
        path: '/administratorPanel/productInventory/inventory/productDetails'
      })
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.trData.length; i++) {
        this.trData[i].isSelect = !isSelect
      }
    },
    // 添加数量
    addNumFun (item) {
      item.addNum = true
      item.setNum = false
    },
    // 设置数量
    setNumFun (item) {
      item.addNum = false
      item.setNum = true
    },
    // 保存当前修改数量
    saveEditNum (item) {
      let arr = [item.locategid + '-' + this.newSetNum]
      updatenum({
        attr: arr
      }).then(resp => {
        item.num = 0
        item.storage = this.newSetNum
        this.$message({
          showClose: true,
          message: resp.data.msg,
          type: 'success'
        })
      })
    },
    // 切换仓库
    getDataAttr (value) {
      this.loading = true
      this.getId = value
      inventoryMsg({
        location_id: value
      }).then(resp => {
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          this.$set(res, 'addNum', true)
          this.$set(res, 'setNum', false)
          this.$set(res, 'num', 0)
        })
        this.trData = resp.data.data.data
        this.loading = false
      })
    },
    getData () {
      this.loading = true
      inventoryMsg({ location_id: this.getId, page: this.getPage, goodsname: this.searchData }).then(resp => {
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          this.$set(res, 'addNum', true)
          this.$set(res, 'setNum', false)
          this.$set(res, 'num', 0)
        })
        this.trData = resp.data.data.data
        this.loading = false
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
  beforeDestroy () { // 退出页面消除定时器
    clearTimeout(this.timer)
  },
  computed: {
    // 检测是否全选
    isSelectAll () {
      // 如果productList中每一条数据的isSelect都为true，返回true，否则返回false;
      return this.trData.every(function (val) {
        return val.isSelect
      })
    },
    getTotal () {
      var prolist = this.trData.filter(function (val) {
        return val.isSelect
      })
      return prolist
    }
  },
  mounted: function () {
    var _this = this
    // 为productList添加select（是否选中）字段，初始值为true
    this.trData.map(function (item) {
      _this.$set(item, 'isSelect', false)
    })
  },
  created () {
    showlocation({}).then(resp => {
      resp.data.data.forEach(val => {
        this.options.push(val)
      })
      if (resp.data.data[0]) {
        this.getId = resp.data.data[0].locateid
        this.value = this.options[0].locateid
      }
      inventoryMsg({ location_id: this.getId }).then(resp => {
        this.loading = false
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach((res) => {
          this.$set(res, 'isSelect', false)
          this.$set(res, 'addNum', true)
          this.$set(res, 'setNum', false)
          this.$set(res, 'num', 0)
        })
        this.trData = resp.data.data.data
        if (Array.isArray(resp.data.data.page)) {
          this.judgeNum = 0
        } else {
          this.judgeNum = 1
        }
      })
    }).catch(err => {
      this.loading = false
      this.$message(err)
    })
  }
}
</script>
<style lang="less">
.btn1-bianJi {
  border-radius: 8px;
  padding: 0;
  ul {
    li {
      cursor: pointer;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
  }
  li:hover {
    background-color: #5c6ac4;
    color: white;
  }
}
.allInventory-choose {
  width: 120px;
  height: 99%;
  text-align: center;
  border: none;
  > div {
    > div {
      outline: none;
      > input {
        border-style: none solid none solid;
        height: 58px;
        width: 100%;
        outline: none;
      }
    }
  }
}
</style>
<style scoped lang="less">
@import "../../../common/css/elementCommon";
@import "../../../common/css/common";
.btnCss {
  background-color: white;
}
.el-input-number {
  width: auto;
}
.compileBtn {
  width: 60px;
  .flexCss;
  background-color: #d5d5d5;
}
.compileBtn1 {
  width: 60px;
  .flexCss;
  background-color: white;
}
.compileBtnCss {
  width: 60px;
  .flexCss;
  background-color: white;
}
.inventory {
  background-color: #f5f6f8;
  /*padding: 0 20px;*/
  margin: auto;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 8px;
  }
  .header-search {
    .allInventory {
      border: 1px solid #dedede;
      background-color: white;
      border-radius: 0.125rem;
      height: 60px;
      .flexBetween;
      > p {
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
      flex-wrap: wrap;
      align-items: center;
      .icon-img {
        position: absolute;
        left: 40px;
        top: 29px;
        width: 22px;
        height: 25px;
        font-size: 20px;
        opacity: 0.5;
      }
      .serBtn {
        height: 46px;
        background-color: #f8f8f8;
        border: 1px solid #dedede;
      }
      .serBtnTwo {
        .serBtn;
        border-left: 0;
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
      input:focus {
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
      tr {
        border-bottom: 1px solid #e5e5e5;
      }
      thead {
        background-color: #eeeeee;
        th {
          padding: 8px;
          font-size: 16px;
        }
      }
      tbody {
        background-color: white;
        tr {
          transition: all 0.1s linear;
          td {
            padding: 8px 0;
          }
        }
        tr:hover {
          background-color: #f4f5fa;
        }
      }
    }
    .saveBtn {
      color: white;
      background-color: #6c8ac7;
      width: 100%;
      height: 42px;
      .flexCss;
    }
    .td-imgBox {
      .td-imgBox-text {
        margin: 4px;
        p {
          margin: 4px;
          a {
            font-size: 10px;
          }
        }
      }
      > div:nth-child(1) {
        .flexCss;
        cursor: pointer;
        width: 60px;
        height: 60px;
        background-color: #d6d6d6;
        justify-content: center;
        margin: 10px 10px;
        border-radius: 4px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      > div:nth-child(2) {
        text-align: left;
      }
    }
  }
}
.compileNum {
  width: 120px;
  display: flex;
  flex-direction: column;
  button {
    font-size: 13px;
  }
}
.updateNum {
  margin: 0 0 30px 24px;
}
.updateNum-box {
  background-color: #f4f6f8;
  overflow: hidden;
  padding: 0 24px;
  border: 1px solid #d5d5d5;
  border-style: solid none solid none;
  > p:nth-child(1) {
    margin-top: 20px;
  }
  > ul {
    margin: 0;
    li {
      .flexCss;
      justify-content: space-between;
      padding: 2px 0;
      border-bottom: 1px solid #d5d5d5;
    }
    li:last-child {
      border-bottom: 0;
    }
  }
}
.spanCss {
  background-color: #fdc258;
}
.footerBox {
  display: flex;
  justify-content: flex-end;
  margin: 40px 0 40px 0;
}
.searchJudge {
  height: 500px;
  background-color: white;
  .flexCss;
  .searchJudgeBox {
    .flexCss;
    flex-direction: column;
    > div:nth-child(1) {
      width: 60px;
      height: 60px;
      > img {
        height: 100%;
        width: 100%;
      }
    }
    > p:nth-child(2) {
      font-size: 24px;
      font-weight: 400;
      line-height: 24px;
    }
    > p:nth-child(3) {
      color: #637381;
      /*margin: 0 0 0.8rem;*/
    }
  }
}
.allProducts-header {
  height: 120px;
  line-height: 120px;
  border-bottom: 1px solid #e3e3e3;
}
.allProducts-content {
  margin: 30px auto 80px auto;
  > div {
    > img {
      height: 100%;
      width: 100%;
    }
  }
  .allProducts-text {
    > p:nth-child(1) {
      font-size: 26px;
      color: black;
      font-weight: 400;
    }
    > p:nth-child(2) {
      font-size: 22px;
      color: #898989;
    }
  }
}
.inventory-two {
  padding: 0 10px;
}
.input-th1 {
  text-align: left;
  text-indent: 20px;
}
</style>
