<template>
  <div class="bulkEdit">
    <div class="flexBetween" style="height: 120px">
      <h1 class="header-h1">{{$t('bulkEdit.header.title')}}</h1>
      <p class="add-black"  @click="backTop"><span class="el-icon-arrow-left"></span>{{$t('bulkEdit.header.back')}}</p>
    </div>
    <div class="bulkEdit-box">
      <p>{{$t('bulkEdit.content.text1')}}</p>
      <div class="addEdit">
        <ul class="addEdit-ul">
          <li v-for="(item, index) in $t('bulkEdit.ziDuanData')" :key="index">
            <div v-for="(it, idx) in item.property" :key="idx" v-show="it.judge">{{it.text}}
              <span class="el-icon-close"
                    @click="delAttr(it)">
              </span>
            </div>
          </li>
        </ul>
        <div class="add-ziDuanBox">
          <el-popover
              placement="bottom"
              visible-arrow="false"
              v-model="hidemul"
              trigger="click">
            <el-button class="addZiDuan" slot="reference">{{$t('bulkEdit.content.btn1')}}</el-button>
            <ul class="add-ziDuan">
              <li class="add-ziDuan-li" v-for="(item, index) in ziDuanData" :key="index">
                <span>{{item.title}}</span>
                <div class="property">
                  <ul>
                    <li v-for="(ite, idx) in item.property"
                        :key="idx"
                        :class="ite.judge === false ? 'liCss' : 'liProCss'"
                        @click="addPro(ite,idx)"
                    >{{ite.text}}
                    </li>
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
          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column width="40"></el-table-column>
          <el-table-column width="60">
            <template slot-scope="{row}">
              <div class="table-title">
                <div>
                  <img :src="row.imgs" alt="">
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100" :label="$t('bulkEdit.content.lable1')" v-if="judgeGoodsName" min-width="90">
            <template slot-scope="{row}">
              <p>{{row.goodsname}}</p>
            </template>
          </el-table-column>
          <el-table-column :label="$t('bulkEdit.content.lable2')" prop="price" width="120" v-if="judgePrice">
            <template slot-scope="{row}">
              <el-input class="elInputCss" v-model="row.price" v-if="row.is_more_attribute!==1"></el-input>
              <el-button class="elBtnCss" disabled v-else>-- --</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="oldprice" :label="$t('bulkEdit.content.lable3')" v-if="judgeOldPrice" width="120">
            <template slot-scope="{row}">
              <el-input class="elInputCss" v-model="row.oldprice" v-if="row.is_more_attribute!==1"></el-input>
              <el-button class="elBtnCss" disabled v-else>-- --</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="costprice" :label="$t('bulkEdit.content.lable4')" v-if="judgeCostPrice" width="120">
            <template slot-scope="{row}">
              <el-input class="elInputCss" v-model="row.costprice" v-if="row.is_more_attribute!==1"></el-input>
              <el-button class="elBtnCss" disabled v-else>-- --</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sku" :label="$t('bulkEdit.content.lable5')" v-if="judgeSku" width="160">
            <template slot-scope="{row}">
              <el-input class="elInputCss" v-model="row.sku" v-if="row.is_more_attribute!==1"></el-input>
              <el-button class="elBtnCss" disabled v-else>-- --</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sku" :label="$t('bulkEdit.content.lable6')" v-if="judgeItemCode" width="180">
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
              <el-input class="elInputCss" v-model="row.weight" v-if="row.is_more_attribute!==1"></el-input>
              <el-button class="elBtnCss" disabled v-else>-- --</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-button class="saveAttrs" @click="saveAttrs" type="primary" v-preventReClick="2000">{{$t('bulkEdit.save')}}</el-button>
    </div>
  </div>
</template>

<script>
import { listedit, listsave, attreditor } from '../../../common/api/api'

export default {
  name: 'bulkEdit',
  data () {
    return {
      input: '',
      hidemul: false,
      judgeGoodsName: true,
      judgePrice: true,
      judgeCostPrice: false,
      judgeOldPrice: false,
      judgeSku: true,
      judgeUnitId: false,
      judgeWeight: false,
      judgeItemCode: false,
      editable: [],
      tableData: [],
      addZd: false,
      ziDuanData: [],
      hideAttrs: []
    }
  },
  methods: {
    // 返回所有产品页面/ 返回上一层
    backTop () {
      this.$router.go(-1)
    },
    // 添加当前多属性，添加一列
    addPro (item, index) {
      this.hidemul = false
      let fields = []
      if (item.judge === true) {
        return false
      } else {
        item.judge = !item.judge
        if (item.text === '标题') {
          this.judgeGoodsName = item.judge
        } else if (item.text === '价格' || item.text === 'price') {
          this.judgePrice = item.judge
        } else if (item.text === '原价' || item.text === 'original') {
          this.judgeOldPrice = item.judge
        } else if (item.text === '成本价' || item.text === 'costPrice') {
          this.judgeCostPrice = item.judge
        } else if (item.text === 'SKU' || item.text === 'SKU') {
          this.judgeSku = item.judge
        } else if (item.text === '重量单位' || item.text === 'weightUnit') {
          this.judgeUnitId = item.judge
        } else if (item.text === '条码' || item.text === 'Barcode') {
          this.judgeItemCode = item.judge
        } else if (item.text === '重量' || item.text === 'weight') {
          this.judgeWeight = item.judge
        }
        this.ziDuanData.forEach(val => {
          val.property.forEach(item => {
            if (item.judge === true) {
              fields.push(item.fields)
            }
          })
        })
        listedit({
          id: this.$route.query.id,
          fields: fields
        }).then(resp => {
          let id = 0
          let id2 = 50
          this.tableData = resp.data.data
          this.tableData.forEach(val => {
            this.$set(val, 'id', id2++)
            val.children.forEach(item => {
              this.$set(item, 'id', id++)
            })
          })
        })
      }
    },
    // 隐藏当前多属性
    delAttr (item) {
      let fields = []
      item.judge = false
      this.ziDuanData.forEach(val => {
        val.property.forEach(item => {
          if (item.judge === true) {
            fields.push(item.fields)
          }
        })
      })
      listedit({
        id: this.$route.query.id,
        fields: fields
      }).then(resp => {
        let id = 0
        let id2 = 50
        this.tableData = resp.data.data
        this.tableData.forEach(val => {
          this.$set(val, 'id', id2++)
          val.children.forEach(item => {
            this.$set(item, 'id', id++)
          })
        })
      })
      if (item.text === '标题') {
        this.judgeGoodsName = item.judge
      } else if (item.text === '价格' || item.text === 'price') {
        this.judgePrice = item.judge
      } else if (item.text === '原价' || item.text === 'original') {
        this.judgeOldPrice = item.judge
      } else if (item.text === '成本价' || item.text === 'costPrice') {
        this.judgeCostPrice = item.judge
      } else if (item.text === 'SKU' || item.text === 'SKU') {
        this.judgeSku = item.judge
      } else if (item.text === '重量单位' || item.text === 'weightUnit') {
        this.judgeUnitId = item.judge
      } else if (item.text === '条码' || item.text === 'Barcode') {
        this.judgeItemCode = item.judge
      } else if (item.text === '重量' || item.text === 'weight') {
        this.judgeWeight = item.judge
      }
    },
    // 保存批量编辑
    saveAttrs () {
      let datalist = []
      this.tableData.forEach((val, idx) => {
        if (val.children === '') {
          datalist.push(val)
        }
        for (let v of val.children) {
          datalist.push(v)
          datalist.forEach((item, index) => {
            if (datalist[index] === v) {
              this.$set(item, 'productid', this.tableData[idx].productid)
            }
          })
        }
      })
      listsave({
        datalist: datalist
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message({
            message: resp.data.msg,
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$message(resp.data.msg)
        }
      })
    }
  },
  created () {
    this.ziDuanData = this.$t('bulkEdit.ziDuanData')
    let id = 0
    let id2 = 50
    console.log(this.ziDuanData)
    this.ziDuanData.forEach(val => {
      val.property.forEach(item => {
        this.hideAttrs.push(item)
      })
    })
    if (this.$route.query.ds === '1') {
      attreditor({
        attrpid: this.$route.query.idDs
      }).then(resp => {
        console.log(resp)
        this.tableData = resp.data.data
        this.tableData.forEach(val => {
          this.$set(val, 'id', id2++)
        })
      })
    } else {
      listedit({
        id: this.$route.query.id
      }).then(resp => {
        this.tableData = resp.data.data
        this.tableData.forEach(val => {
          this.$set(val, 'id', id2++)
          val.children.forEach(item => {
            this.$set(item, 'id', id++)
          })
        })
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
  .el-table th>.cell{
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
  @import '../../../common/css/common';
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
    background-color: #F5F6F8;
    width: 80%;
    margin: auto;
    >h1{
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
  .saveAttrs{
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
      background-color: #D5D5D5;
      border: 1px solid #D5D5D5;
      .flexCss;
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  .add-black {
    color: #4267B2;
    font-size: 18px;
    cursor: pointer;
  }
</style>
