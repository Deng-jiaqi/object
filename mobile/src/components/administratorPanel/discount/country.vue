<template>
  <ul class="c-country">
    <li v-for="(item,index) in selectedCountries" :key="index">
      <div class="left">
        <!-- <img :src="item.img" alt /> -->
        <p class="name" v-show="$i18n.locale==='zh-cn'">{{item.area}}</p>
        <p class="name" v-show="$i18n.locale==='en-us'">{{item.en_area}}</p>
      </div>
      <div class="right">
        <span @click="deleteSelected(item,index)" class="iconfont icon-guanbi"></span>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Country',
  computed: {
    ...mapState(['selectedCountries'])
  },
  methods: {
    ...mapMutations(['forSelectedCountries']),
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
      let arr = this.remove(this.selectedCountries, index)
      this.forSelectedCountries(arr)
    }
  }
}
</script>
<style lang="less" scoped>
.c-country {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    width: 86%;
    position: relative;
    transition: background-color .25s ease;
    .left {
      display: flex;
      justify-content: space-between;
      .name {
        margin-top: 5px;
      }
    }
    .right {
      line-height: 48px;
          .icon-guanbi {
        font-size: 16px;
      }
    }
  }
  li:hover {
    background-color: #f9fafb;
  }
}
ul {
  margin: 0;
}
</style>
