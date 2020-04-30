<template>
  <el-row>
    <el-col :span="24">
      <div class="allProducts" v-if="judgeNum > 0" v-loading="loading">
        <div class="header">
          <h1 class="header-h1">{{$t('productLine.header.title')}}</h1>
          <router-link to="/administratorPanel/productInventory/addProductLine">
            <el-button type="primary">{{$t('productLine.header.btn1')}}</el-button>
          </router-link>
        </div>
        <!--    头部搜索-->
        <div class="header-search">
          <div class="allInventory">
            <p>{{$t('productLine.header.text1')}}</p>
            <div></div>
          </div>
          <div class="div-search">
            <input
              class="search"
              v-model="search"
              :placeholder="$t('productLine.header.search')"
              @input="souSuo"
            />
            <!-- <span class="iconfont icon-sousuo4"></span> -->
            <img class="icon-img" src="../../../assets/addShop/search_01.png" alt />
            <el-popover
              v-if="getTotal.length>0"
              placement="bottom"
              v-model="hideEdit"
              trigger="click"
            >
              <div class="btn1-bianJi">
                <ul>
                  <li
                    v-for="(item,index) in $t('productLine.list')"
                    :key="index"
                    @click="clickmsg(item, index)"
                  >{{item.text}}</li>
                </ul>
              </div>
              <button slot="reference" class="serBtn">{{$t('productLine.header.btn2')}}</button>
            </el-popover>
          </div>
        </div>
        <!--    表格-->
        <div class="inventory-table" v-loading="loading">
          <table v-if="judgeLength > 0">
            <thead>
              <th width="50px">
                <input
                  type="checkBox"
                  class="check_box tui-checkbox"
                  @click="selectProduct(isSelectAll)"
                  v-bind:checked="isSelectAll"
                />
              </th>
              <th class="input-th1">{{$t('productLine.table.thead.th1')}}</th>
              <th>{{$t('productLine.table.thead.th2')}}</th>
              <th>{{$t('productLine.hint.text5')}}</th>
            </thead>
            <tbody style="text-align: center">
              <tr v-for="(item, index) in products" :key="index" @click="routerDetail(item)">
                <td>
                  <input
                    type="checkbox"
                    v-bind:checked="item.isSelect"
                    @click="item.isSelect=!item.isSelect"
                    class="check_box tui-checkbox"
                    @click.stop
                  />
                </td>
                <td width="200px">
                  <div class="title-Box">
                    <div>
                      <img :src="item.img" alt />
                    </div>
                    <div class="text-hideTwo">
                      <el-link
                        @click="hideClick = !hideClick"
                        type="primary"
                        :underline="false"
                      >{{item.name}}</el-link>
                      <p v-if="item.status === 0">{{$t('productLine.table.tbody.text')}}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p v-if="item.type === 0">一</p>
                  <div class="condition-text" v-else>
                    <p
                      class="text-hide"
                      v-for="(item, index) in item.condition"
                      :key="index"
                    >{{item}}</p>
                  </div>
                </td>
                <td>
                  <!-- <p class="inviteCode" id="inviteCode" v-text="item.share_address"></p> -->
                  <el-button
                    type="primary"
                    v-clipboard:copy="item.share_address"
                    v-clipboard:success="onCopyUrl"
                    v-clipboard:error="onErrorUrl"
                    @click.stop
                  >{{$t('productLine.hint.text4')}}</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="searchJudge" v-else v-loading="loading">
            <el-row>
              <el-col class="searchJudgeBox">
                <div>
                  <img src="../../../assets/addShop/fangdajing.png" alt />
                </div>
                <p>{{$t('productLine.searchHint.text1')}}</p>
                <p>{{$t('productLine.searchHint.text2')}}</p>
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
      </div>
      <div v-else>
        <div class="allProducts-header">
          <h1 class="header-h1">{{$t('productLine.addHint.title')}}</h1>
        </div>
        <el-row :gutter="20" type="flex" justify="center" class="allProducts-content">
          <el-col :span="12" class="flexCss">
            <img src="../../../assets/product/productLine.png" alt />
          </el-col>
          <el-col :span="12" class="allProducts-text">
            <p>{{$t('productLine.addHint.text1')}}</p>
            <p>{{$t('productLine.addHint.text2')}}</p>
            <router-link to="/administratorPanel/productInventory/addProductLine">
              <el-button type="primary">{{$t('productLine.addHint.btn')}}</el-button>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { Xcollection, Xhandle } from '../../../common/api/api'

export default {
  name: 'productLine',
  inject: ['reload'],
  data () {
    return {
      loading: true,
      judgeNum: 1,
      timer: '', // 定时器
      judgeLength: 0, // 判断judgeLength的长度
      search: '',
      hideTishi: false,
      hideClick: false,
      products: [], // 产品系列数据
      judge: false,
      hideEdit: false,
      trData: [],
      getPage: Number, // 获取页数
      pageSize: 1, // 每页条数
      currentPage: 1, // 当前页
      total: 3, // 页数
      idarr: [], // 产品系列id
      getType: Number // (0.使用产品系列,1.暂停使用产品系列,2.删除产品系列)
    }
  },
  methods: {
    // CopyUrl () { // 复制链接
    //   var Url2 = document.getElementById('inviteCode').innerText
    //   var oInput = document.createElement('input')
    //   oInput.value = Url2
    //   document.body.appendChild(oInput)
    //   oInput.select() // 选择对象
    //   document.execCommand('Copy') // 执行浏览器复制命令
    //   oInput.className = 'oInput'
    //   oInput.style.display = 'none'
    //   this.$message({
    //     message: this.$t('productLine.hint.text6'),
    //     type: 'success'
    //   })
    // },
    onCopyUrl (e) {
      this.$message.success(this.$t('productLine.hint.text6'))
    },
    onErrorUrl (e) {
      this.$message.error(this.$t('productLine.hint.text7'))
    },
    // 请求 页面数据
    getallData () {
      Xcollection({ page: this.getPage }).then(resp => {
        this.loading = false
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach(val => {
          this.$set(val, 'isSelect', false)
        })
        this.products = resp.data.data.data
        this.judgeLength = resp.data.data.data.length
        this.judgeNum = resp.data.data.data.length
      }).catch(err => {
        this.loading = false
        this.$message(err)
      })
    },
    // 请求表单数据
    setSearch () {
      this.loading = true
      Xcollection({
        name: this.search
      }).then(resp => {
        this.currentPage = Number(resp.data.data.page.currentpage)
        this.total = Number(resp.data.data.page.pagenum)
        resp.data.data.data.forEach(val => {
          this.$set(val, 'isSelect', false)
        })
        if (resp.data.data.data.length > 0) {
          this.products = resp.data.data.data
          this.judgeLength = resp.data.data.data.length
        } else {
          this.judgeLength = resp.data.data.data.length
        }
        this.loading = false
      })
    },
    // 头部搜索
    souSuo () {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.setSearch()
      }, 500)
    },
    // 分页
    getData () {
      this.getallData()
    },
    handleCurrentChange (val) {
      this.getPage = val
      this.getData()
    },
    handleSizeChange (val) {
      this.getPage = val
      this.getData()
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].isSelect = !isSelect
      }
    },
    // 请求编辑接口
    getEdit () {
      this.idarr = []
      this.getTotal.forEach(val => {
        this.idarr.push(val.Id)
      })
      Xhandle({
        idarr: this.idarr,
        type: this.getType
      }).then(resp => {
        this.reload()
        this.hideEdit = false
      })
    },
    // 产品系列列表编辑
    clickmsg (item, index) {
      this.getType = index
      if (index === 2) {
        this.$confirm(this.$t('productLine.hint.text1'), this.$t('productLine.hint.text2') + this.getTotal.length + this.$t('productLine.hint.text3'), {
          confirmButtonText: this.$t('productLine.hint.btn1'),
          cancelButtonText: this.$t('productLine.hint.btn2'),
          type: 'warning'
        }).then(() => {
          this.getEdit()
          this.$message({
            type: 'success',
            message: this.$t('productLine.hint.btn3')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('productLine.hint.btn4')
          })
        })
      } else {
        this.getEdit()
      }
    },
    // 跳转当前选中的产品系列详情
    routerDetail (item) {
      this.$router.push({
        query: { id: item.Id },
        path: '/administratorPanel/productInventory/productLineDetail'
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  computed: {
    // 检测是否全选
    isSelectAll () {
      // 如果productList中每一条数据的isSelect都为true，返回true，否则返回false;
      return this.products.every(function (val) {
        return val.isSelect
      })
    },
    getTotal () {
      var prolist = this.products.filter(function (val) {
        return val.isSelect
      })
      return prolist
    }
  },
  mounted: function () {
    var _this = this
    // 为productList添加select（是否选中）字段，初始值为true
    this.products.map(function (item) {
      _this.$set(item, 'isSelect', false)
    })
  },
  created () {
    this.getallData()
  }
}
</script>
<style lang="less">
.el-popover {
  padding: 0;
}
.btn1-bianJi {
  border-radius: 8px;
  padding: 0;
  ul {
    li {
      cursor: pointer;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
    }
  }
  li:hover {
    background-color: #5c6ac4;
    color: white;
  }
}
</style>
<style lang="less" scoped>
@import "../../../common/css/common";
.flexBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flexCss {
  display: flex;
  align-items: center;
  justify-content: center;
}
.allProducts {
  background-color: #f5f6f8;
  margin: auto;
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
        width: 80px;
        background-color: #f8f8f8;
        border: 1px solid #dedede;
        border-style: solid solid solid none;
      }
      .serBtnTwo {
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
      input:focus {
        border: 1px solid #4267b2;
        border-radius: 2px;
      }
    }
  }
  .inventory-table {
    margin-top: 18px;
    table {
      tr {
        border-bottom: 1px solid #e5e5e5;
      }
      width: 100%;
      border-collapse: collapse;
      thead {
        background-color: #eeeeee;
        th {
          padding: 18px;
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
      background-color: #6c8ac7;
      width: 105px;
      height: 47px;
    }
    .td-imgBox {
      .header;
      justify-content: flex-start;
      > div:nth-child(1) {
        .header;
        width: 85px;
        height: 82px;
        background-color: #d6d6d6;
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
        max-width: 100%;
        max-height: 100%;
      }
    }
    > p:nth-child(2) {
      font-size: 24px;
      font-weight: 400;
      line-height: 24px;
    }
    > p:nth-child(3) {
      color: #637381;
      margin: 0 0 0.8rem;
    }
  }
}
.title-Box {
  display: flex;
  align-items: center;
  overflow: hidden;
  > div:nth-child(1) {
    border-radius: 4px;
    width: 69px;
    height: 70px;
    background: #dcdcdc;
    margin-right: 10px;
    .flexCss;
    > img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  > div:nth-child(2) {
    text-align: left;
  }
}
.footerBox {
  display: flex;
  justify-content: flex-end;
  margin: 40px 0 40px 0;
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
      max-height: 100%;
      max-width: 100%;
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
.inviteCode {
  height: 0;
  width: 0;
  overflow: hidden;
  margin: 0;
}
.condition-text {
  font-size: 14px;
  color: #637381;
  margin: 8px auto;
}
.input-th1 {
  text-align: left;
  text-indent: 30px;
}
</style>
