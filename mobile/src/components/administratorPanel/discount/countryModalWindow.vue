<template>
  <el-dialog
    :show-close="true"
    :title="$t('lang.discountcode.text93')"
    :visible.sync="modalWindowVisible"
    class="country-window"
    width="100%"
  >
    <div class="c-search">
      <el-input v-model="mySearch" :placeholder="$t('lang.discountcode.text94')"></el-input>
    </div>
    <div class="c-countrys">
      <ul v-show="tableData.length">
        <li v-for="(item,index) in tableData" :key="index">
          <div class="country-info">
            <div class="left">
              <el-checkbox v-model="item.isSelect" />
              <span class="country-name" v-show="$i18n.locale==='zh-cn'">{{item.area}}</span>
              <span class="country-name" v-show="$i18n.locale==='en-us'">{{item.en_area}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="none" v-show="!tableData.length">{{$t('lang.discountcode.text95')}}</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button plain @click="modalWindowVisible=false">{{$t('lang.discountcode.text96')}}</el-button>
      <el-button type="primary" @click="save">{{$t('lang.discountcode.text97')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getCountryInfo } from '@/common/api/api.js'
export default {
  name: 'CountryModalWindow',
  data () {
    return {
      // 变量
      timer: null,
      // data
      tableData: [],
      // ui
      modalWindowVisible: false
    }
  },
  computed: {
    ...mapState(['country_modal_search']),
    ...mapState(['selectedCountries']),
    mySearch: {
      get () {
        return this.$store.state.country_modal_search
      },
      set (newval) {
        this.$store.commit('forCountry_modal_search', newval)
      }
    }
  },
  watch: {
    country_modal_search: {
      handler (val) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          getCountryInfo({ name: this.country_modal_search }).then(res => {
            console.log(res)
            this.tableData = res.data.data
            this.forTableData()
          })
        }, 1000)
      }
    },
    modalWindowVisible: {
      handler (val) {
        if (val && !this.country_modal_search) {
          getCountryInfo().then(res => {
            console.log(res)
            if (res.data.code === 1) {
              this.tableData = res.data.data
              this.forTableData()
            }
          })
        }
        if (!val) {
          console.log(1234)
          this.forCountry_modal_search(null)
          console.log(this.country_modal_search)
        }
      }
    }
  },
  methods: {
    ...mapMutations(['forCountry_modal_search']),
    ...mapMutations(['forSelectedCountries']),
    save () {
      // console.log(this.tableData)
      // console.log(this.selectedCountries)
      let arr = []
      this.tableData.forEach(item => {
        if (item.isSelect) {
          arr.push(item)
        }
      })
      this.forSelectedCountries(arr)
      this.modalWindowVisible = false
    },
    forTableData () {
      // 初始化tableData
      if (this.selectedCountries.length > 0) {
        this.estoreSelectedItem()
      }
    },
    estoreSelectedItem () {
      // 还原选中项
      this.selectedCountries.forEach(item => {
        this.tableData.forEach(itemTwo => {
          if (parseInt(item.id, 0) === itemTwo.id) {
            itemTwo.isSelect = true
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.c-search {
  padding: 20px;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.c-countrys {
  height: 436px;
  overflow-y: auto;
  li:first-child {
    border-top: 1px solid rgba(229, 229, 229, 1);
  }
  li {
    .country-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 86px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-left: 19px;
      padding-right: 19px;
      .left {
        display: flex;
        align-items: center;
        .country-name {
          margin-left: 20px;
        }
      }
      .right {
        .number {
          margin-right: 80px;
        }
      }
    }
  }
  .product-info:hover {
    cursor: pointer;
    background-color: #f4f6f8;
  }
  .none {
    text-align: center;
    height: 57px;
    font-size: 16px;
    line-height: 57px;
    border-bottom: 1px solid #e5e5e5;
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
  font-size: 16px;
  font-weight: 400;
  color: rgba(2, 2, 2, 1);
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
