<template>
  <ul class="c-specific-product">
    <li v-for="(item,index) in data" :key="index">
      <div class="content">
        <div class="left">
          <img :src="item.img" alt />
          <div class="info">
            <p class="name">{{item.goodsname}}</p>
            <p class="desc">{{item.desc}}</p>
          </div>
        </div>
        <div class="right">
          <span
            @click="attrEditor(item)"
            class="editor"
            v-show="item.attrpid!=='0'"
          >{{$t('lang.discountcode.text74')}}</span>
          <span @click="deleteSelected(item,index)" class="iconfont icon-guanbi"></span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'SpecificProduct',
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    ...mapState(['clickTime']),
    ...mapState(['attrModalWindowVisible'])
  },
  methods: {
    attrEditor (item) {
      this.forAttrModalWindowVisible(true)
      this.forInEditorAttr(item)
      console.log(item)
      this.forClickTime(item.type)
    },
    // 根据下标删除数组的某个元素
    remove (arr, index) {
      let newArr = []
      arr.forEach((item, idx) => {
        if (index !== idx) {
          newArr.push(item)
        }
      })
      if (newArr.length > 0) {
        return newArr
      } else {
        return null
      }
    },
    deleteSelected (item, index) {
      console.log(item, index)
      console.log(this.data)
      switch (item.type) {
        case 'percent':
          let arr1 = this.remove(this.data, index)
          this.percent_addSpecificProducts(arr1)
          break
        case 'fixed':
          let arr2 = this.remove(this.data, index)
          this.fixed_addSpecificProducts(arr2)
          break
        case 'buy':
          let arr3 = this.remove(this.data, index)
          this.buy_addSpecificProducts(arr3)
          break
        case 'get':
          let arr4 = this.remove(this.data, index)
          this.get_addSpecificProducts(arr4)
          break
        case 'auto_percent':
          let arr5 = this.remove(this.data, index)
          this.auto_percent_addSpecificProducts(arr5)
          break
        case 'auto_fixed':
          let arr6 = this.remove(this.data, index)
          this.auto_fixed_addSpecificProducts(arr6)
          break
        case 'auto_buy':
          let arr7 = this.remove(this.data, index)
          this.auto_buy_addSpecificProducts(arr7)
          break
        case 'auto_get':
          let arr8 = this.remove(this.data, index)
          this.auto_get_addSpecificProducts(arr8)
          break
        case 'createTransportData':
          let arr9 = this.remove(this.data, index)
          this.cre_transportdata_addSelectedSpecificProducts(arr9)
          break
        default:
          break
      }
    },
    ...mapMutations(['forClickTime']),
    ...mapMutations(['forAttrModalWindowVisible']),
    ...mapMutations(['forInEditorAttr']),
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
.c-specific-product {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  li {
    transition: background-color 0.25s ease;
    border-bottom: 1px solid #dfe3e8;
    padding: 10px 28px 10px 23px;
    .content {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      position: relative;
      .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 48px;
          height: 48px;
          margin-right: 20px;
        }
        .info {
          display: inline-block;
          .name {
            margin-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 400px;
          }
          .desc {
            margin-top: 10px;
            color: #637381;
          }
        }
      }
    }
    .right {
      line-height: 48px;
      .icon-guanbi {
        font-size: 16px;
      }
      .editor {
        color: #006fbb;
        margin-right: 25px;
        cursor: pointer;
      }
    }
  }
  li:first-child {
    border-top: 1px solid #dfe3e8;
  }
  li:hover {
    background-color: #f9fafb;
  }
}
ul {
  margin: 0;
}
</style>
