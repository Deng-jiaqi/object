<template>
  <div class="c-indexOfDiscount">
    <div class="content-indexOfDiscount">
      <div class="title-top">
        <div>
          <span @click="back" class="iconfont icon-fanhui1"></span>
          <span class="title">{{$t('lang.indexOfDiscount.text1')}}</span>
        </div>
        <el-button
          @click="createDiscountVisible=true"
          type="primary"
        >{{$t('lang.indexOfDiscount.text2')}}</el-button>
      </div>
      <!-- 一级导航 -->
      <div class="c-primary-navigation">
        <span
          v-for="(item,index) in $t('lang.indexOfDiscount.text3')"
          :key="index"
          :class="{active:myRouter===item.forActive}"
          @click="primaryNavigation(item.href)"
        >{{item.title}}</span>
      </div>
      <!-- 折扣信息box -->
      <div class="box-discounts">
        <div>
          <div class="c-secondary-navigation">
            <span
              v-for="(item,index) in $t('lang.indexOfDiscount.text4')"
              :key="index"
              :class="{active:$route.query.status===item.status}"
              @click="secondaryNavigation(item.status)"
            >{{item.title}}</span>
            <span
              v-show="$route.query.searchVal"
              :class="{active:$route.query.searchVal}"
            >{{$t('lang.indexOfDiscount.text5')}}</span>
          </div>
        </div>

        <div class="c-operation">
          <el-input
            prefix-icon="iconfont icon-sousuo4"
            v-model="searchVal"
            :placeholder="$t('lang.indexOfDiscount.search')"
          />
          <el-popover :visible-arrow="false" placement="bottom" v-model="operationVisible">
            <div class="hide-one" v-show="operationVisible">
              <div @click="enableDiscountVisible=true">{{$t('lang.indexOfDiscount.text12')}}</div>
              <div @click="disableDiscountVisible=true">{{$t('lang.indexOfDiscount.text13')}}</div>
              <div @click="deleteDiscountVisible=true">{{$t('lang.indexOfDiscount.text14')}}</div>
            </div>
            <div class="operation" slot="reference" v-show="selectedRows.length>0">
              <span>{{$t('lang.indexOfDiscount.text15')}}(3)</span>
            </div>
          </el-popover>
        </div>
      </div>
      <!-- 创建折扣模态窗 -->
      <div class="c-create-discount-modal modal">
        <el-dialog
          :title="$t('lang.indexOfDiscount.text6')"
          :visible.sync="createDiscountVisible"
          width="100%"
        >
          <div class="list" @click="toCreateDiscountCode">
            <p class="title">{{$t('lang.indexOfDiscount.text7')}}</p>
            <p class="instructions">{{$t('lang.indexOfDiscount.text8')}}</p>
          </div>
          <div class="list" @click="toCreateAutomaticDiscount">
            <p class="title">{{$t('lang.indexOfDiscount.text9')}}</p>
            <p class="instructions">{{$t('lang.indexOfDiscount.text10')}}</p>
          </div>
          <div class="list special">
            <p class="instructions">{{$t('lang.indexOfDiscount.text11')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              plain
              @click="createDiscountVisible = false"
            >{{$t('lang.indexOfDiscount.text16')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 启用折扣模态窗 -->
      <div class="c-enable-discount-modal modal">
        <el-dialog
          :title="$t('lang.indexOfDiscount.text18')"
          :visible.sync="enableDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.indexOfDiscount.text19')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              plain
              @click="enableDiscountVisible = false"
            >{{$t('lang.indexOfDiscount.text16')}}</el-button>
            <el-button type="primary" @click="enableDiscount">{{$t('lang.indexOfDiscount.text17')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 禁用折扣模态窗 -->
      <div class="c-Disable-discount-modal modal">
        <el-dialog
          :title="$t('lang.indexOfDiscount.text20')"
          :visible.sync="disableDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.indexOfDiscount.text21')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              plain
              @click="disableDiscountVisible = false"
            >{{$t('lang.indexOfDiscount.text16')}}</el-button>
            <el-button type="primary" @click="disableDiscount">{{$t('lang.indexOfDiscount.text17')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 删除折扣模态窗 -->
      <div class="c-Delete-discount-modal modal">
        <el-dialog
          :title="$t('lang.indexOfDiscount.text22')"
          :visible.sync="deleteDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.indexOfDiscount.text23')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              plain
              @click="deleteDiscountVisible= false"
            >{{$t('lang.indexOfDiscount.text16')}}</el-button>
            <el-button type="danger" @click="deleteDiscount">{{$t('lang.indexOfDiscount.text17')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <router-view :key="key" />
    </div>
  </div>
</template>
<script>
import { discountOperation } from '@/common/api/api.js'
import { mapState, mapMutations } from 'vuex'
import messageAlert from '@/utils/messageAlert'
export default {
  data () {
    return {
      // 变量
      searchVal: '',
      timer: null,
      timer2: null,
      // ui
      operationVisible: false,
      createDiscountVisible: false,
      enableDiscountVisible: false,
      disableDiscountVisible: false,
      deleteDiscountVisible: false,
      // data
      list: []
    }
  },
  watch: {
    searchVal: {
      handler (val) {
        console.log('搜索值' + val)
        if (val) {
          this.$router.push({
            path: '/administratorPanel/indexOfDiscount/discountCode',
            query: {
              searchVal: this.searchVal
            }
          })
        } else {
          this.$router.push({
            path: '/administratorPanel/indexOfDiscount/discountCode',
            query: {
              status: 'all'
            }
          })
        }
      }
    },
    selectedRows: {
      handler (val) {
        if (val.length === 0) {
          this.operationVisible = false
        }
      }
    }
  },
  computed: {
    ...mapState(['selectedRows']),
    key () {
      return this.$route.name
    },
    myRouter () {
      let arr = this.$route.path.split('/')
      let lenth = arr.length
      return arr[lenth - 1].split('?')[0]
    }
  },
  methods: {
    ...mapMutations(['forAfterDiscountOperation']),
    back () {
      this.$router.go(-1)
    },
    primaryNavigation (href) {
      this.searchVal = ''
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // 一级导航
        this.$router.push({
          path: href,
          query: {
            status: 'all'
          }
        })
      }, 500)
    },
    secondaryNavigation (status) {
      this.searchVal = ''
      clearTimeout(this.timer2)
      this.timer2 = setTimeout(() => {
        // 二级导航
        this.$router.push({
          path: this.myRouter,
          query: {
            status: status
          }
        })
      }, 500)
    },
    toCreateDiscountCode () {
      this.$router.push({
        path: '/administratorPanel/discount/discountCode',
        query: {
          id: 'new'
        }
      })
    },
    toCreateAutomaticDiscount () {
      this.$router.push({
        path: '/administratorPanel/discount/automaticDiscount',
        query: {
          id: 'new'
        }
      })
    },
    enableDiscount () {
      let arr = []
      this.selectedRows.forEach(item => {
        arr.push(item.Id)
      })
      discountOperation({
        discount_id: arr,
        type: 0
      }).then(res => {
        console.log(res)
        messageAlert(res)
        this.enableDiscountVisible = false
        if (res.data.code === 1) {
          this.forAfterDiscountOperation(true)
          setTimeout(() => {
            this.forAfterDiscountOperation(false)
          }, 200)
        }
      })
    },
    disableDiscount () {
      let arr = []
      this.selectedRows.forEach(item => {
        arr.push(item.Id)
      })
      discountOperation({
        discount_id: arr,
        type: 1
      }).then(res => {
        console.log(res)
        messageAlert(res)
        this.disableDiscountVisible = false
        if (res.data.code === 1) {
          this.forAfterDiscountOperation(true)
          setTimeout(() => {
            this.forAfterDiscountOperation(false)
          }, 200)
        }
      })
    },
    deleteDiscount () {
      let arr = []
      this.selectedRows.forEach(item => {
        arr.push(item.Id)
      })
      discountOperation({
        discount_id: arr,
        type: 2
      }).then(res => {
        console.log(res)
        this.deleteDiscountVisible = false
        messageAlert(res)
        if (res.data.code === 1) {
          this.forAfterDiscountOperation(true)
          setTimeout(() => {
            this.forAfterDiscountOperation(false)
          }, 200)
        }
      })
    }
  },
  created () {
    if (this.$route.query.searchVal) {
      this.searchVal = this.$route.query.searchVal
    }
  }
}
</script>
<style lang="less" scoped>
.c-indexOfDiscount {
  padding-top: 32px;
  .content-indexOfDiscount {
    .title-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 26px;
      align-items: center;
      padding-right: 15px;
      .icon-fanhui1 {
        font-size: 20px;
        margin-right: 15px;
        margin-left: 5px;
        cursor: pointer;
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
      }
    }
    .c-primary-navigation {
      padding-left: 15px;
      padding-right: 15px;
      height: 67px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      border-radius: 4px;
      border-bottom: 1px solid rgba(191, 191, 191, 1);
      margin-bottom: 28px;
      display: flex;
      justify-content: space-around;
      span {
        font-size: 18px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 70px;
        height: 60px;
        cursor: pointer;
      }
    }
    .box-discounts {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      .c-secondary-navigation {
        padding-left: 25px;
        padding-right: 25px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border-bottom: 1px solid rgba(191, 191, 191, 1);
        display: flex;
        justify-content: space-between;
        span {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          height: 67px;
          cursor: pointer;
          line-height: 67px;
        }
      }
      .c-operation {
        height: 92px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /deep/ .el-input {
          width: 76.2%;
        }
        /deep/ .el-input__inner {
          height: 58px;
        }
        .operation {
          background: rgba(248, 248, 248, 1);
          border: 1px solid #dedede;
          border-left: none;
          float: left;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          position: relative;
          padding-left: 24px;
          padding-right: 34px;
          line-height: 58px;
          font-size: 14px;
          height: 56px;
          span:hover {
            cursor: pointer;
          }
        }
      }
    }
    .c-create-discount-modal {
    }
  }
}
.hide-one {
  div {
    padding-left: 15px;
    padding-right: 15px;
    transform: all 0.2s ease-in;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: rgba(79, 79, 79, 1);
  }
  div:hover {
    background-color: #5c6ac4;
    color: #fff;
  }
}
// 模态窗样式修改
.modal {
  /deep/ .el-dialog {
    border-radius: 6px;
    margin-top: 25vh !important;
  }
  .el-dialog__wrapper /deep/ .el-dialog__header {
    font-weight: 400;
    border-bottom: 2px solid rgba(238, 238, 238, 1);
    .el-dialog__title {
      font-size: 20px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .el-dialog__wrapper /deep/ .el-dialog__body {
    padding: 0;
    .list {
      padding: 22px 32px 19px 33px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      cursor: pointer;
    }
    .special {
      cursor: default !important;
    }
    .title {
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 13px;
    }
    .instructions {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .btn-cancel {
    margin-right: 10px;
  }
}
.clearfix:after {
  display: block;
  content: "";
  clear: both;
}
p {
  margin: 0;
}
ul {
  margin: 0;
}
.active {
  position: relative;
}
.active::after {
  display: "block";
  content: "";
  background: rgba(253, 165, 6, 1);
  width: 50px;
  height: 7px;
  position: absolute;
  top: 60px;
  left: calc(50% - 25px);
  transition: all 0.3s ease;
}
</style>
