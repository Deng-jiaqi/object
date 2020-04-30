<template>
  <el-dialog
    :title="$t('lang.discountcode.text86')"
    :visible.sync="attrModalWindowVisible"
    class="adress-window"
    width="100%"
  >
    <div class="c-attrs" v-loading="loading">
      <div v-for="(item,index) in tableData" :key="index">
        <div class="attr" v-for="(itemTwo,indexTwo) in item.attr" :key="indexTwo">
          <div class="left">
            <el-checkbox v-model="itemTwo.isSelect" />
            <span class="name">{{itemTwo.attr_value}}</span>
          </div>
          <div class="right">
            <span class="number">{{itemTwo.storage}} {{$t('lang.discountcode.text87')}}</span>
            <span class="price">${{itemTwo.price}}</span>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button plain @click="close">{{$t('lang.discountcode.text88')}}</el-button>
      <el-button type="primary" @click="save">{{$t('lang.discountcode.text89')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getProductSpecificInformation } from '@/common/api/api.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'AttrModalWindow',
  computed: {
    modalVisible: {
      get () {
        return this.attrModalWindowVisible
      },
      set (newval) {
        this.forAttrModalWindowVisible(newval)
      }
    },
    ...mapState(['clickTime']),
    ...mapState(['attrModalWindowVisible']),
    ...mapState(['inEditorAttr']),
    ...mapState(['percent_selectedSpecificProducts']),
    ...mapState(['fixed_selectedSpecificProducts']),
    ...mapState(['buy_selectedSpecificProducts']),
    ...mapState(['get_selectedSpecificProducts']),
    ...mapState(['auto_percent_selectedSpecificProducts']),
    ...mapState(['auto_fixed_selectedSpecificProducts']),
    ...mapState(['auto_buy_selectedSpecificProducts']),
    ...mapState(['auto_get_selectedSpecificProducts']),
    ...mapState(['cre_transportdata_selectedSpecificProducts'])
  },
  data () {
    return {
      // data
      tableData: null,
      loading: false
    }
  },
  watch: {
    attrModalWindowVisible: {
      handler (val) {
        if (val) {
          //  inEditorAttr 正在编辑多属性的已选中项
          console.log(this.clickTime)
          console.log(this.inEditorAttr)
          this.loading = true
          getProductSpecificInformation({
            productid: this.inEditorAttr.productid,
            attrpid: this.inEditorAttr.attrpid
          }).then(res => {
            this.loading = false
            console.log(res)
            this.tableData = res.data.data
          })
        }
      }
    }
  },
  methods: {
    remove (arr, index) {
      let newArr = []
      arr.forEach((item, idx) => {
        if (index !== idx) {
          newArr.push(item)
          console.log(6666)
        }
      })
      if (newArr.length > 0) {
        return newArr
      } else {
        return null
      }
    },
    close () {
      this.forAttrModalWindowVisible(false)
    },
    forSelectedData (aimSelected, changeAimSelected) {
      let id = this.tableData[0].productid
      let attrpid = []
      let lenth = this.tableData[0].attr.length
      let selectedLenth = 0
      let arr = this.$lodash.cloneDeep(aimSelected)
      this.tableData[0].attr.forEach(item => {
        if (item.isSelect) {
          selectedLenth += 1
          attrpid.push(item.attrpid)
        }
      })
      if (selectedLenth === 0) {
        // 没有选中的多属性时删除
        arr.forEach((itemTwo, index) => {
          if (itemTwo.productid === id) {
            arr = this.remove(arr, index)
          }
        })
      } else {
        arr.forEach((itemThree, indexThree) => {
          if (itemThree.productid === id) {
            itemThree.attrpid = attrpid.toString()
            itemThree.desc = `(${this.$t('lang.discountcode.text98')} ${selectedLenth}/${lenth} ${this.$t('lang.discountcode.text99')})`
          }
        })
      }
      changeAimSelected(arr)
    },
    save () {
      switch (this.clickTime) {
        case 'percent':
          this.forSelectedData(
            this.percent_selectedSpecificProducts,
            this.percent_addSpecificProducts
          )
          break
        case 'fixed':
          this.forSelectedData(
            this.fixed_selectedSpecificProducts,
            this.fixed_addSpecificProducts
          )
          break
        case 'buy':
          this.forSelectedData(
            this.buy_selectedSpecificProducts,
            this.buy_addSpecificProducts
          )
          break
        case 'get':
          this.forSelectedData(
            this.get_selectedSpecificProducts,
            this.get_addSpecificProducts
          )
          break
        case 'auto_percent':
          this.forSelectedData(
            this.auto_percent_selectedSpecificProducts,
            this.auto_percent_addSpecificProducts
          )
          break
        case 'auto_fixed':
          this.forSelectedData(
            this.auto_fixed_selectedSpecificProducts,
            this.auto_fixed_addSpecificProducts
          )
          break
        case 'auto_buy':
          this.forSelectedData(
            this.auto_buy_selectedSpecificProducts,
            this.auto_buy_addSpecificProducts
          )
          break
        case 'auto_get':
          this.forSelectedData(
            this.auto_get_selectedSpecificProducts,
            this.auto_get_addSpecificProducts
          )
          break
        case 'createTransportData':
          this.forSelectedData(
            this.cre_transportdata_selectedSpecificProducts,
            this.cre_transportdata_addSelectedSpecificProducts
          )
          break
        default:
          break
      }
      this.close()
    },
    ...mapMutations(['forAttrModalWindowVisible']),
    ...mapMutations(['percent_addSpecificProducts']),
    ...mapMutations(['fixed_addSpecificProducts']),
    ...mapMutations(['buy_addSpecificProducts']),
    ...mapMutations(['get_addSpecificProducts']),
    ...mapMutations(['auto_percent_addSpecificProducts']),
    ...mapMutations(['auto_fixed_addSpecificProducts']),
    ...mapMutations(['auto_buy_addSpecificProducts']),
    ...mapMutations(['auto_get_addSpecificProducts']),
    ...mapMutations(['cre_transportdata_addSelectedSpecificProducts'])
  }
}
</script>
<style lang="less" scoped>
.c-attrs {
  height: 436px;
  overflow-y: auto;
  .attr {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
    height: 86px;
    line-height: 86px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding-right: 19px;
    .left {
      .name {
        margin-left: 20px;
      }
    }
    .right {
      .number {
        margin-right: 80px;
      }
    }
  }
  .attr:hover {
    cursor: pointer;
    background-color: #f4f6f8;
  }
}
.dialog-footer {
}
// dialog样式修改
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
  padding-left: 0;
  padding-right: 0;
  font-size: 15px;
  color: rgb(51, 51, 51);
  padding-top: 0;
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
