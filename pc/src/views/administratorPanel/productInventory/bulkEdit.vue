<template>
  <div class="bulkEdit">
    <div class="flexBetween" style="height: 120px">
      <h1 class="header-h1">{{$t('bulkEdit.header.title')}}</h1>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        {{$t('bulkEdit.header.back')}}
      </p>
    </div>
    <div class="bulkEdit-box">
      <p>{{$t('bulkEdit.content.text1')}}</p>
      <div class="addEdit">
        <ul class="addEdit-ul">
          <li v-for="(item, index) in ziDuanData" :key="index">
            <template v-for="(it, idx) in item.property">
              <div :key="idx" v-if="it.judge">
                {{it.text}}
                <span
                  class="el-icon-close"
                  @click="delAttr(it)"
                  v-if="getDelt.getDelNum > 1"
                ></span>
              </div>
            </template>
          </li>
        </ul>
        <div class="add-ziDuanBox">
          <el-popover placement="bottom" visible-arrow="false" v-model="hidemul" trigger="click">
            <el-button class="addZiDuan" slot="reference">{{$t('bulkEdit.content.btn1')}}</el-button>
            <ul class="add-ziDuan" style="min-width:410px;">
              <li class="add-ziDuan-li" v-for="(item, index) in ziDuanData" :key="index">
                <span>{{item.title}}</span>
                <div class="property">
                  <ul>
                    <li
                      v-for="(ite, idx) in item.property"
                      :key="idx"
                      :class="ite.judge === false ? 'liCss' : 'liProCss'"
                      @click="addPro(ite,idx)"
                    >{{ite.text}}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="bulkEdit-table">
      <el-table
        :data="tableData"
        style="width: 100%;"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        default-expand-all
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column width="40"></el-table-column>
        <el-table-column width="60">
          <template slot-scope="{row}">
            <div class="table-title">
              <div>
                <img :src="row.imgs === null ? missImage : row.imgs" alt />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          :label="$t('bulkEdit.content.lable1')"
          v-if="judgeGoodsName"
          min-width="90"
        >
          <template slot-scope="{row}">
            <p>{{row.goodsname}}</p>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('bulkEdit.content.lable2')"
          prop="price"
          width="120"
          v-if="judgePrice"
        >
          <template slot-scope="{row}">
            <!-- 价格 -->
            <el-input
              class="elInputCss"
              v-model="row.price"
              v-if="row.is_more_attribute!==1"
              step="0.01"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
            ></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="oldprice"
          :label="$t('bulkEdit.content.lable3')"
          v-if="judgeOldPrice"
          width="120"
        >
          <template slot-scope="{row}">
            <el-input
              class="elInputCss"
              v-model="row.oldprice"
              v-if="row.is_more_attribute!==1"
              step="0.01"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
            ></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="costprice"
          :label="$t('bulkEdit.content.lable4')"
          v-if="judgeCostPrice"
          width="120"
        >
          <template slot-scope="{row}">
            <el-input
              class="elInputCss"
              v-model="row.costprice"
              v-if="row.is_more_attribute!==1"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
            ></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="sku"
          :label="$t('bulkEdit.content.lable5')"
          v-if="judgeSku"
          width="160"
        >
          <template slot-scope="{row}">
            <el-input class="elInputCss" v-model="row.sku" v-if="row.is_more_attribute!==1"></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="sku"
          :label="$t('bulkEdit.content.lable6')"
          v-if="judgeItemCode"
          width="180"
        >
          <template slot-scope="{row}">
            <el-input class="elInputCss" v-model="row.itemcode" v-if="row.is_more_attribute!==1"></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="unitid" :label="$t('bulkEdit.content.lable7')" v-if="judgeUnitId">
          <template slot-scope="{row}">
            <el-input class="elInputCss" v-model="row.unitid" v-if="row.is_more_attribute!==1"></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="weight" :label="$t('bulkEdit.content.lable8')" v-if="judgeWeight">
          <template slot-scope="{row}">
            <el-input
              class="elInputCss"
              v-model="row.weight"
              v-if="row.is_more_attribute!==1"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
            ></el-input>
            <el-button class="elBtnCss" disabled v-else>-- --</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        class="saveAttrs"
        @click="saveAttrs"
        type="primary"
        v-preventReClick="2000"
      >{{$t('bulkEdit.save')}}</el-button>
    </div>
  </div>
</template>

<script>
import { listedit, listsave, attreditor } from '../../../common/api/api'

export default {
  name: 'bulkEdit',
  data () {
    return {
      missImage: require('../../../assets/addShop/tupian.png'),
      input: '',
      hidemul: false,
      judgeGoodsName: false,
      judgePrice: false,
      judgeCostPrice: false,
      judgeOldPrice: false,
      judgeSku: false,
      judgeUnitId: false,
      judgeWeight: false,
      judgeItemCode: false,
      editable: [],
      tableData: [],
      addZd: false,
      ziDuanData: [],
      hideAttrs: [],
      stateData: [],
      getItems: null
    }
  },
  watch: {
    'row.price': function (newval, oldval) {
      var reg = /^(\d{0,6})(\.(\d{0,2}))?$/g
      if (!reg.test(newval)) {
        if (newval === undefined) {
          this.row.price = undefined
          return
        }
        this.row.price = oldval
      } else {
        this.row.price = newval.replace(/^\./g, '')
      }
    }
  },

  methods: {
    backTop () {
      this.$router.go(-1)
    },
    // 调用显示和隐藏接口
    getShowHide () {
      let getId
      this.$route.query.ds === '1' ? getId = this.$route.query.idDs : getId = this.$route.query.id
      let fields = []
      this.ziDuanData.forEach(val => {
        val.property.forEach(item => {
          if (item.judge === true) {
            fields.push(item.fields)
          }
        })
      })
      if (this.$route.query.ds !== '1') {
        listedit({
          id: getId,
          fields: fields
        }).then(resp => {
          let id = 0
          let id2 = 50
          this.tableData = resp.data.data.info
          this.tableData.forEach(val => {
            this.$set(val, 'id', id2++)
            val.children.forEach(item => {
              this.$set(item, 'id', id++)
            })
          })
        })
      } else {
        let id2 = 50
        attreditor({
          attrpid: this.$route.query.idDs,
          fields: fields
        }).then(resp => {
          this.tableData = resp.data.data.info
          this.tableData.forEach(val => {
            this.$set(val, 'id', id2++)
          })
        })
      }
    },
    // 添加当前多属性，添加一列
    addPro (item, index) {
      this.hidemul = false
      if (item.judge === true) {
        return false
      } else {
        item.judge = !item.judge
        if (item.text === this.$t('bulkEdit.content.lable1')) {
          this.judgeGoodsName = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable2') || item.text === 'price') {
          this.judgePrice = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable3') || item.text === 'original') {
          this.judgeOldPrice = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable4') || item.text === 'costPrice') {
          this.judgeCostPrice = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable5') || item.text === 'SKU') {
          this.judgeSku = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable7') || item.text === 'weightUnit') {
          this.judgeUnitId = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable6') || item.text === 'Barcode') {
          this.judgeItemCode = item.judge
        } else if (item.text === this.$t('bulkEdit.content.lable8') || item.text === 'weight') {
          this.judgeWeight = item.judge
        }
        this.getShowHide()
      }
    },
    // 隐藏当前多属性
    delAttr (item) {
      item.judge = false
      this.getShowHide()
      if (item.text === this.$t('bulkEdit.content.lable1')) {
        this.judgeGoodsName = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable2') || item.text === 'price') {
        this.judgePrice = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable3') || item.text === 'original') {
        this.judgeOldPrice = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable4') || item.text === 'costPrice') {
        this.judgeCostPrice = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable5') || item.text === 'SKU') {
        this.judgeSku = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable7') || item.text === 'weightUnit') {
        this.judgeUnitId = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable6') || item.text === 'Barcode') {
        this.judgeItemCode = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable8') || item.text === 'weight') {
        this.judgeWeight = item.judge
      } else if (item.text === this.$t('bulkEdit.content.lable8') || item.text === 'weight') {
        this.judgeWeight = item.judge
      }
    },
    // 保存批量编辑
    saveAttrs () {
      let datalist = []
      let datalistTwo = []
      if (this.$route.query.ds === '1') {
        this.tableData.forEach((val, idx) => {
          datalistTwo.push(val)
        })
      } else {
        this.tableData.forEach((val, idx) => {
          if (val.children.length < 1) {
            datalistTwo.push(val)
          } else {
            for (let v of val.children) {
              datalist.push(v)
              datalist.forEach((item, index) => {
                if (datalist[index] === v) {
                  this.$set(item, 'productid', this.tableData[idx].productid)
                }
              })
            }
          }
        })
      }
      datalistTwo.forEach(val => {
        datalist.push(val)
      })
      listsave({
        datalist: datalist,
        productid: sessionStorage.getItem('PrId')
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message.success(resp.data.msg)
          this.$router.go(-1)
        } else {
          this.$message(resp.data.msg)
        }
      })
    }
  },
  computed: {
    getDelt () {
      let arr = []
      this.ziDuanData.forEach(val => {
        val.property.forEach(item => {
          if (item.judge === true) {
            arr.push(item.judge)
          }
        })
      })
      return {
        getDelNum: arr.length
      }
    }
  },
  created () {
    let id = 0
    let id2 = 50
    if (this.$route.query.ds === '1') { // 这里判断的就算从多属性编辑器过来获取的数据
      attreditor({
        attrpid: this.$route.query.idDs
      }).then(resp => {
        this.tableData = resp.data.data.info
        this.tableData.forEach(val => {
          this.$set(val, 'id', id2++)
        })
        let fieldsData = resp.data.data.fields
        fieldsData.map((val, index) => {
          val.property.forEach((item, i) => {
            console.log(item.title)
            if (item.text === 1) { item.text = this.$t('bulkEdit.content.lable1') }
            if (item.text === 2) { item.text = this.$t('bulkEdit.content.lable2') }
            if (item.text === 3) { item.text = this.$t('bulkEdit.content.lable3') }
            if (item.text === 4) { item.text = this.$t('bulkEdit.content.lable4') }
            if (item.text === 5) { item.text = this.$t('bulkEdit.content.lable5') }
            if (item.text === 6) { item.text = this.$t('bulkEdit.content.lable7') }
            if (item.text === 7) { item.text = this.$t('bulkEdit.content.lable6') }
            if (item.text === 8) { item.text = this.$t('bulkEdit.content.lable8') }
            if (item.text === this.$t('bulkEdit.content.lable1')) {
              this.judgeGoodsName = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable2') || item.text === 'price') {
              this.judgePrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable3') || item.text === 'original') {
              this.judgeOldPrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable4') || item.text === 'costPrice') {
              this.judgeCostPrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable5') || item.text === 'SKU') {
              this.judgeSku = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable7') || item.text === 'weightUnit') {
              this.judgeUnitId = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable6') || item.text === 'Barcode') {
              this.judgeItemCode = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable8') || item.text === 'weight') {
              this.judgeWeight = item.judge
            }
          })
        })
        this.ziDuanData = fieldsData
      })
    } else {
      listedit({
        id: this.$route.query.id
      }).then(resp => {
        this.tableData = resp.data.data.info
        this.tableData.forEach(val => {
          this.$set(val, 'id', id2++)
          val.children.forEach(item => {
            this.$set(item, 'id', id++)
          })
        })
        let fieldsData = resp.data.data.fields
        console.log(resp.data.data.fields)
        fieldsData.map((val, index) => {
          val.property.forEach((item, i) => {
            if (item.text === 1) { item.text = this.$t('bulkEdit.content.lable1') }
            if (item.text === 2) { item.text = this.$t('bulkEdit.content.lable2') }
            if (item.text === 3) { item.text = this.$t('bulkEdit.content.lable3') }
            if (item.text === 4) { item.text = this.$t('bulkEdit.content.lable4') }
            if (item.text === 5) { item.text = this.$t('bulkEdit.content.lable5') }
            if (item.text === 6) { item.text = this.$t('bulkEdit.content.lable7') }
            if (item.text === 7) { item.text = this.$t('bulkEdit.content.lable6') }
            if (item.text === 8) { item.text = this.$t('bulkEdit.content.lable8') }
            if (item.text === this.$t('bulkEdit.content.lable1')) {
              this.judgeGoodsName = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable2') || item.text === 'price') {
              this.judgePrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable3') || item.text === 'original') {
              this.judgeOldPrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable4') || item.text === 'costPrice') {
              this.judgeCostPrice = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable5') || item.text === 'SKU') {
              this.judgeSku = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable7') || item.text === 'weightUnit') {
              this.judgeUnitId = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable6') || item.text === 'Barcode') {
              this.judgeItemCode = item.judge
            } else if (item.text === this.$t('bulkEdit.content.lable8') || item.text === 'weight') {
              this.judgeWeight = item.judge
            }
          })
        })
        this.ziDuanData = fieldsData
      })
    }
  }
}
</script>
<style lang="less">
.elInputCss {
  > input {
    border: 0;
  }
  > input:focus {
    border: 1px solid #5d6bc5;
  }
}
.disabledT {
  button {
    width: 100%;
    border: 0;
  }
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-table th > .cell {
  text-align: center;
}
.rgb196 {
  background: rgb(196, 196, 196);
}
.bacColor317eb0 {
  background: #317eb0;
}
.bacColorf4984e {
  background: #f4984e;
}
</style>
<style scoped lang="less">
@import "../../../common/css/common";

.elBtnCss {
  width: 100%;
  border: 0;
}
.table-dian {
  .flexCss;
  > span {
    font-size: 40px;
    color: black;
  }
}
.liCss {
  padding: 12px;
  height: 30px;
  background-color: #dfe3e8;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
}
.liProCss {
  .liCss;
  cursor: default;
  background-color: #eff1f4;
  color: #b8babd;
}
.bulkEdit {
  background-color: #f5f6f8;
  width: 80%;
  margin: auto;
  > h1 {
    height: 120px;
    line-height: 120px;
  }
  .bulkEdit-box {
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    > p {
      margin: 20px 0 0 0;
    }
  }
  .addEdit {
    display: flex;
    align-items: center;
    .addEdit-ul {
      display: flex;
      li {
        display: flex;
        > div {
          .liCss;
        }
      }
    }
    .addZiDuan {
      height: 60px;
    }
  }
}
.saveAttrs {
  float: right;
  margin: 40px auto;
}
.add-ziDuan {
  .add-ziDuan-li {
    display: flex;
    align-items: center;
    padding: 20px;
    .property {
      > ul {
        display: flex;
        margin-left: 40px;
      }
    }
  }
}
.table-title {
  .flexCss;
  > div {
    background-color: #d5d5d5;
    border: 1px solid #d5d5d5;
    .flexCss;
    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.add-black {
  color: #4267b2;
  font-size: 18px;
  cursor: pointer;
}
</style>
