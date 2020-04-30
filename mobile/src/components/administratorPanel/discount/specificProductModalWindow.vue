<template>
  <el-dialog
    :show-close="true"
    :title="$t('lang.discountcode.text80')"
    :visible.sync="modalWindowVisible"
    class="adress-window"
    width="100%"
  >
    <div class="c-search">
      <el-input v-model="mySearch" :placeholder="$t('lang.discountcode.text81')"></el-input>
    </div>
    <div class="c-products" v-loading="loading">
      <!-- 非搜索界面的数据 -->
      <ul v-show="!inSearch&&tableData.length">
        <li v-for="(item,index) in tableData" :key="index">
          <div class="product-info">
            <div class="left">
              <el-checkbox v-model="item.isSelect" @change="overallChange(index,'tableData')" />
              <img :src="item.img" alt />
              <span class="goodname">{{item.goodsname}}</span>
            </div>
            <div class="mid" v-show="!item.attr">{{item.storage}}{{$t('lang.discountcode.text82')}}</div>
            <div class="right" v-show="!item.attr">${{item.price}}</div>
          </div>
          <div class="c-attrs">
            <div class="attr" v-for="(itemTwo,indexTwo) in item.attr" :key="indexTwo">
              <div class="left">
                <el-checkbox v-model="itemTwo.isSelect" @change="attrChange(index,'tableData')" />
                <span class="name">{{itemTwo.attr_value}}</span>
              </div>
              <div class="mid">{{itemTwo.storage}}{{$t('lang.discountcode.text82')}}</div>
              <div class="right">${{itemTwo.price}}</div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 搜索界面的数据 -->
      <ul v-show="inSearch&&searchedtableData.length" >
        <li v-for="(item,index) in searchedtableData" :key="index">
          <div class="product-info">
            <div class="left">
              <el-checkbox v-model="item.isSelect" @change="overallChange(index,'searchedtableData')" />
              <img :src="item.img" alt />
              <span class="goodname">{{item.goodsname}}</span>
            </div>
            <div class="mid" v-show="!item.attr">{{item.storage}}{{$t('lang.discountcode.text82')}}</div>
            <div class="right" v-show="!item.attr">${{item.price}}</div>
          </div>
          <div class="c-attrs">
            <div class="attr" v-for="(itemTwo,indexTwo) in item.attr" :key="indexTwo">
              <div class="left">
                <el-checkbox v-model="itemTwo.isSelect" @change="attrChange(index,'searchedtableData')" />
                <span class="name">{{itemTwo.attr_value}}</span>
              </div>
              <div class="mid">{{itemTwo.storage}} {{$t('lang.discountcode.text82')}}</div>
              <div class="right">${{itemTwo.price}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div
        class="none"
        v-show="!tableData.length&&!searchedtableData.length"
      >{{$t('lang.discountcode.text83')}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="selected-num" v-show='selectedNum'>{{$t('lang.discountcode.text124')}}&nbsp;&nbsp;{{selectedNum}}</div>
      <el-button plain v-show='!inSearch' @click="modalWindowVisible=false">{{$t('lang.discountcode.text84')}}</el-button>
      <el-button type="primary" v-show='!inSearch' @click="save">{{$t('lang.discountcode.text85')}}</el-button>
      <el-button plain v-show='inSearch' @click="inSearch=false">{{$t('lang.discountcode.text84')}}</el-button>
      <el-button type="primary" v-show='inSearch' @click="saveSearchTerms">{{$t('lang.discountcode.text123')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getProductSpecificInformation } from '@/common/api/api.js'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SpecificProductModalWindow',
  components: {},
  data () {
    return {
      // 变量
      timer: null,
      inSearch: false,
      selectedNum: 0, // 选中的商品数量
      // data
      tableData: [],
      searchedtableData: [],
      // ui
      modalWindowVisible: false,
      loading: false
    }
  },
  computed: {
    ...mapState(['clickTime']),
    ...mapState(['specific_modal_search']),
    ...mapState(['percent_selectedSpecificProducts']),
    ...mapState(['fixed_selectedSpecificProducts']),
    ...mapState(['buy_selectedSpecificProducts']),
    ...mapState(['get_selectedSpecificProducts']),
    ...mapState(['auto_percent_selectedSpecificProducts']),
    ...mapState(['auto_fixed_selectedSpecificProducts']),
    ...mapState(['auto_buy_selectedSpecificProducts']),
    ...mapState(['auto_get_selectedSpecificProducts']),
    ...mapState(['cre_transportdata_selectedSpecificProducts']),
    // v-model绑定vuex的值
    mySearch: {
      get () {
        return this.$store.state.specific_modal_search
      },
      set (newval) {
        this.$store.commit('forSpecific_modal_search', newval)
      }
    }
  },
  watch: {
    specific_modal_search: {
      handler (val) {
        console.log(111)
        clearTimeout(this.timer)
        this.loading = true
        this.inSearch = true
        this.searchedtableData = []
        this.timer = setTimeout(async () => {
          if (!this.tableData.length) {
            let res1 = await getProductSpecificInformation()
            console.log(res1)
            this.tableData = res1.data.data
            this.initializeTableData(this.tableData)
          }
          let res2 = await getProductSpecificInformation({ goodsname: val })
          console.log(res2)
          this.loading = false
          this.searchedtableData = res2.data.data
          this.initializeTableData(this.searchedtableData)
        }, 1000)
      }
    },
    modalWindowVisible: {
      async handler (val) {
        this.loading = true
        this.tableData = []
        if (val && !this.specific_modal_search) {
          console.log(666)
          let res = await getProductSpecificInformation()
          this.loading = false
          console.log(res)
          this.tableData = res.data.data
          this.initializeTableData(this.tableData)
        }
        if (!val) {
          this.forSpecific_modal_search(null)
        }
      }
    }
  },
  methods: {
    // 初始化tableData
    initializeTableData (initializeTarget) {
      switch (this.clickTime) {
        case 'percent':
          if (this.percent_selectedSpecificProducts) {
            // 把之前选中的 赋值到 tableData
            this.estoreSelectedItem(
              this.percent_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'fixed':
          if (this.fixed_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.fixed_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'buy':
          if (this.buy_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.buy_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'get':
          if (this.get_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.get_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_percent':
          if (this.auto_percent_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_percent_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_fixed':
          if (!this.auto_fixed_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_fixed_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_buy':
          if (this.auto_buy_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_buy_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'auto_get':
          if (this.auto_get_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.auto_get_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        case 'createTransportData':
          if (this.cre_transportdata_selectedSpecificProducts) {
            this.estoreSelectedItem(
              this.cre_transportdata_selectedSpecificProducts,
              initializeTarget
            )
          }
          break
        default:
          break
      }
    },
    // 还原选中项
    estoreSelectedItem (selectedArr, theTotalArr) {
      console.log(selectedArr)
      selectedArr.forEach(item => {
        if (item.attrpid === '0') {
          // 没有多属性
          theTotalArr.forEach(itemTwo => {
            if (item.productid === itemTwo.productid) {
              itemTwo.isSelect = true
            }
          })
        } else {
          let attrArr = item.attrpid.split(',') // 选中了的多属性的数组
          let attrLenth = attrArr.length
          theTotalArr.forEach(itemThree => {
            if (item.productid === itemThree.productid) {
              // 找到对应的产品
              if (itemThree.attr.length === attrLenth) {
                // 属性全选了
                itemThree.isSelect = true
                itemThree.attr.forEach(itemFour => {
                  itemFour.isSelect = true
                })
              } else {
                // 属性没有全选
                attrArr.forEach(itemFive => {
                  itemThree.attr.forEach(itemSix => {
                    if (parseInt(itemFive, 0) === itemSix.attrpid) {
                      itemSix.isSelect = true
                    }
                  })
                })
              }
            }
          })
        }
      })
    },
    overallChange (index, dataName) {
      let item
      switch (dataName) {
        case 'tableData':
          item = this.tableData[index]
          break
        case 'searchedtableData':
          item = this.searchedtableData[index]
          break
        default:
          break
      }
      // 有attr的选择时候全选与取消全选
      if (item.attr && item.isSelect) {
        item.attr.forEach(itemTwo => {
          itemTwo.isSelect = true
        })
      }
      if (item.attr && !item.isSelect) {
        item.attr.forEach(itemThree => {
          itemThree.isSelect = false
        })
      }
      this.getSelectedNum()
    },
    attrChange (index, dataName) {
      let item
      switch (dataName) {
        case 'tableData':
          item = this.tableData[index]
          break
        case 'searchedtableData':
          item = this.searchedtableData[index]
          break
        default:
          break
      }
      // attr的选项变化时,全选状态还是否存在
      if (item.attr) {
        let lenth = item.attr.length
        let number = 0
        item.attr.forEach(itemTwo => {
          if (itemTwo.isSelect) {
            number += 1
          }
        })
        if (!item.isSelect && number === lenth) {
          item.isSelect = true
        }
        if (item.isSelect && number < lenth) {
          item.isSelect = false
        }
      }
      this.getSelectedNum()
    },
    getSelectedNum () {
      this.selectedNum = 0
      this.tableData.forEach(item => {
        if (item.attr && item.isSelect) {
          this.selectedNum += item.attr.length
        }
        if (!item.attr && item.isSelect) {
          this.selectedNum += 1
        }
      })
    },
    ...mapMutations(['forSpecific_modal_search']),
    ...mapMutations(['percent_addSpecificProducts']),
    ...mapMutations(['fixed_addSpecificProducts']),
    ...mapMutations(['buy_addSpecificProducts']),
    ...mapMutations(['get_addSpecificProducts']),
    ...mapMutations(['auto_percent_addSpecificProducts']),
    ...mapMutations(['auto_fixed_addSpecificProducts']),
    ...mapMutations(['auto_buy_addSpecificProducts']),
    ...mapMutations(['auto_get_addSpecificProducts']),
    ...mapMutations(['cre_transportdata_addSelectedSpecificProducts']),
    saveSearchTerms () {
      // 将搜索选中的值加到原来的tableData
      console.log(this.searchedtableData)
      console.log(this.tableData)
      this.searchedtableData.forEach(item => {
        if (item.isSelect) {
          // 产品被选中了
          // 找出被选中的是现在tableData中的第几项
          let index
          this.tableData.forEach((itemTwo, indexTwo) => {
            if (item.productid === itemTwo.productid) {
              index = indexTwo
            }
          })
          this.$set(this.tableData, index, item)
        }
        if (!item.isSelect && item.attr) {
          // 产品没有被选中但是有多属性的情况
          let haveSelectedItem = item.attr.some(currentValue => {
            return currentValue.isSelect === true
          })
          if (haveSelectedItem) {
            // 其中的多属性有被选中
            let index
            this.tableData.forEach((itemThree, indexThree) => {
              if (item.productid === itemThree.productid) {
                index = indexThree
              }
              this.$set(this.tableData, index, item)
            })
          }
        }
      })
      this.inSearch = false
    },
    save () {
      let arr = [] // 选中项
      this.tableData.forEach((item, index) => {
        // 判断是哪部分的已选择数据，增加一个type属性辨别，删除时候用
        // console.log(index)
        switch (this.clickTime) {
          case 'percent':
            item.type = 'percent'
            break
          case 'fixed':
            item.type = 'fixed'
            break
          case 'buy':
            item.type = 'buy'
            break
          case 'get':
            item.type = 'get'
            break
          case 'auto_percent':
            item.type = 'auto_percent'
            break
          case 'auto_fixed':
            item.type = 'auto_fixed'
            break
          case 'auto_buy':
            item.type = 'auto_buy'
            break
          case 'auto_get':
            item.type = 'auto_get'
            break
          case 'createTransportData':
            item.type = 'createTransportData'
            break
          default:
            break
        }
        if (item.isSelect) {
          if (item.attr) {
            let attrArr = []
            item.desc = `(${this.$t('lang.discountcode.text90')} ${
              item.attr.length
            }/${item.attr.length} ${this.$t('lang.discountcode.text91')})`
            item.attr.forEach((itemTwo, indexTwo) => {
              attrArr.push(itemTwo.attrpid)
            })
            item.attrpid = attrArr.toString()
            arr.push(item)
          } else {
            item.attrpid = '0' // 没有多属性时候为0
            arr.push(item)
          }
        }
        if (item.attr && !item.isSelect) {
          // 把选中的赋值到vuex
          let number = 0 // 选中的属性的个数
          let attrLenth = item.attr.length
          let newAttrArr = []
          console.log(item.attr)
          item.attr.forEach((itemTwo, indexTwo) => {
            if (itemTwo.isSelect) {
              newAttrArr.push(itemTwo.attrpid)
              number = number + 1
            }
          })
          if (number > 0) {
            item.desc = `(${this.$t(
              'lang.discountcode.text98'
            )} ${number}/${attrLenth} ${this.$t('lang.discountcode.text99')})`
            item.attrpid = newAttrArr.toString()
            arr.push(item)
          }
        }
      })
      switch (this.clickTime) {
        case 'percent':
          this.percent_addSpecificProducts(arr)
          break
        case 'fixed':
          this.fixed_addSpecificProducts(arr)
          break
        case 'buy':
          this.buy_addSpecificProducts(arr)
          break
        case 'get':
          this.get_addSpecificProducts(arr)
          break
        case 'auto_percent':
          this.auto_percent_addSpecificProducts(arr)
          break
        case 'auto_fixed':
          this.auto_fixed_addSpecificProducts(arr)
          break
        case 'auto_buy':
          this.auto_buy_addSpecificProducts(arr)
          break
        case 'auto_get':
          this.auto_get_addSpecificProducts(arr)
          break
        case 'createTransportData':
          this.cre_transportdata_addSelectedSpecificProducts(arr)
          console.log(arr)
          break
        default:
          break
      }
      console.log(arr)
      this.modalWindowVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.c-search {
  padding: 20px;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.c-products {
  height: 436px;
  overflow-y: auto;
  li:first-child {
    border-top: 1px solid rgba(229, 229, 229, 1);
  }
  li {
    .product-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-left: 19px;
      padding-right: 19px;
      padding-top: 20px;
      padding-bottom: 20px;
      img {
        width: 49px;
        height: 49px;
        margin-left: 20px;
        margin-right: 20px;
      }
      .left {
        display: flex;
        align-items: center;
        width: 48%;
        flex-shrink: 0;
        margin-right: 2%;
        .goodname {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        img {
          flex-shrink: 0;
        }
      }
      .mid {
        flex-shrink: 0;
        width: 20%;
        text-align: center;
      }
      .right {
        flex-shrink: 0;
        width: 20%;
      }
    }
  }
  .product-info:hover {
    cursor: pointer;
    background-color: #f4f6f8;
  }
  .c-attrs {
    .attr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-right: 19px;
      .left {
        flex-shrink: 0;
        width: 40%;
        display: flex;
        justify-content: flex-start;
        .name {
          margin-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .mid {
        flex-shrink: 0;
        width: 27%;
        text-align: center;
      }
      .right {
        flex-shrink: 0;
        width: 22%;
      }
    }
    .attr:hover {
      cursor: pointer;
      background-color: #f4f6f8;
    }
  }
  .none {
    text-align: center;
    height: 57px;
    font-size: 16px;
    line-height: 57px;
    border-bottom: 1px solid #e5e5e5;
  }
}
// dialog样式修改
.selected-num {
  float: left;
  line-height: 40px;
  font-weight: bold;
  font-size: 16px;
}
/deep/ .el-dialog {
  border-radius: 6px;
}
/deep/ .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  font-size: 20px;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  padding-top: 36px;
  padding-bottom: 27px;
}
/deep/ .el-dialog__body {
  padding: 0;
  font-size: 15px;
  color: rgb(51, 51, 51);
}
ul {
  margin: 0;
}
p {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
