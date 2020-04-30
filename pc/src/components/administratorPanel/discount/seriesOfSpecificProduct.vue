<template>
  <ul class="c-particular-series">
    <li v-for="(item,index) in data" :key="index">
      <div class="content">
        <div class="left">
          <img :src="item.img" alt />
          <p class="name">{{item.name}}</p>
        </div>
        <div class="right">
          <span @click="deleteSelected(item,index)" class="iconfont icon-guanbi"></span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SeriesOfSpecificProduct',
  props: {
    data: {
      type: Array
    }
  },
  methods: {
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
      switch (item.type) {
        case 'percent':
          let arr1 = this.remove(this.data, index)
          this.percent_addSeriesOfSpecificProducts(arr1)
          break
        case 'fixed':
          let arr2 = this.remove(this.data, index)
          this.fixed_addSeriesOfSpecificProducts(arr2)
          break
        case 'buy':
          let arr3 = this.remove(this.data, index)
          this.buy_addSeriesOfSpecificProducts(arr3)
          break
        case 'get':
          let arr4 = this.remove(this.data, index)
          this.get_addSeriesOfSpecificProducts(arr4)
          break
        case 'auto_percent':
          let arr5 = this.remove(this.data, index)
          this.auto_percent_addSeriesOfSpecificProducts(arr5)
          break
        case 'auto_fixed':
          let arr6 = this.remove(this.data, index)
          this.auto_fixed_addSeriesOfSpecificProducts(arr6)
          break
        case 'auto_buy':
          let arr7 = this.remove(this.data, index)
          this.auto_buy_addSeriesOfSpecificProducts(arr7)
          break
        case 'auto_get':
          let arr8 = this.remove(this.data, index)
          this.auto_get_addSeriesOfSpecificProducts(arr8)
          break
        default:
          break
      }
    },
    ...mapMutations(['percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['get_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_get_addSeriesOfSpecificProducts'])
  }
}
</script>
<style lang="less" scoped>
.c-particular-series {
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
        .name {
          margin-top: 5px;
                      overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 400px;
        }
        img {
          width: 48px;
          height: 48px;
          margin-right: 20px;
        }
      }
      .right {
        line-height: 48px;
        .icon-guanbi {
        font-size: 16px;
      }
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
