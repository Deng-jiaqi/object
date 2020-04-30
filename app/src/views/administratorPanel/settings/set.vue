<template>
  <div>
    <h2>{{$t('setting.header.title')}}</h2>
    <el-row class="setBox">
      <el-col :span="8"
              v-for="(item, index) in $t('setting.setData')"
              :key="index"
              class="set-oneBox"
              v-show="includePermission(currentPermissionList,item.permission)"
              @click.native="routerDetails(item)">
        <div class="fontSize">
          <i :class="item.class"></i>
        </div>
        <div>
          <p>{{item.text1}}</p>
          <p>{{item.text2}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import includePermission from '@/utils/judgePermissions.js'

export default {
  name: 'set',
  computed: {
    ...mapState(['currentPermissionList'])
  },
  methods: {
    routerDetails (item) {
      this.$router.push({ path: item.href })
    },
    includePermission: includePermission
  },
  created () {
    if (Number(this.$cookies.get('creater')) === 1) {
      this.$t('setting.setData[1]').href = '/settings/userControl'
    } else {
      this.$t('setting.setData[1]').href = '/settings/staffDetail'
      this.$t('setting.setData[1]').text2 = this.$t('staffDetail.text5')
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../../common/css/common";
  .setBox {
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    >div{
      border-left: 1px solid #e3e3e3;
      border-top: 1px solid #e3e3e3;
    }
    > .set-oneBox {
      cursor: pointer;
      background-color: white;
      height: 140px;
      display: flex;
      align-items: center;
      padding: 14px;
      > div:nth-child(1) {
        font-size: 40px;
        margin: auto 12px auto 12px;
      }
    }
    > .set-oneBox:hover {
      background-color: #e3e3e3;
    }
  }
  .fontSize{
    >i{
      font-size: 36px;
    }
  }
</style>
