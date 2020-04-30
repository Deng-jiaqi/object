<template>
  <div>
    <h2>{{$t('setting.header.title')}}</h2>
    <el-row class="setBox">
      <el-col
        :span="8"
        v-for="(item, index) in $t('setting.setData')"
        :key="index"
        class="set-oneBox"
        v-show="includePermission(currentPermissionList,item.permission)"
        @click.native="routerDetails(item)"
      >
        <div class="fontSize">
          <i :class="item.class"></i>
        </div>
        <div>
          <p>{{item.text1}}</p>
          <p>{{item.text2}}</p>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      width="33%"
      class="dialog"
      :showClose="showClo"
      large
    >
      <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs">
        <el-tab-pane :label="$t('setting.header.title5')" name="first">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <span class="el-span">{{$t('setting.header.title1')}}</span>
            <el-form-item class="input">
              <el-input v-model="rules.publish"></el-input>
            </el-form-item>
            <span class="el-span1">{{$t('setting.header.title2')}}</span>
            <el-form-item>
              <el-input v-model="rules.publishkey"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane :label="$t('setting.header.title6')" name="second"></el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{$t('setting.header.title3')}}</el-button>
        <el-button type="primary" @click="centerDialogVisibleBtn">{{$t('setting.header.title4')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { paysave, payShow } from '../../../common/api/api'
import includePermission from '@/utils/judgePermissions.js'

export default {
  name: 'set',
  inject: ['reload'],
  data () {
    return {
      activeName: 'first',
      labelPosition: 'top',
      centerDialogVisible: false,
      showClo: false,
      input1: '',
      input2: '',
      getId: '',
      getMethod: 1, // 获取当前支付方式 1为stripe 2为paypal
      rules: {
        publish: '', // 公钥
        publishkey: '' // 密码
      }

    }
  },
  computed: {
    ...mapState(['currentPermissionList'])
  },
  methods: {
    handleClick (tab, event) {
      this.getMethod = Number(tab.index) + 1
    },
    centerDialogVisibleBtn () {
      this.reload()
      paysave({
        Id: this.getId,
        method: this.getMethod,
        public_api_key: this.rules.publish,
        api_key: this.rules.publishkey
      }).then(resp => {
        if (resp.data.code === 1) {
          this.centerDialogVisible = false
        }
      })
    },
    postShow () { // 请求公匙和密码
      payShow({
        method: this.getMethod
      }).then(resp => {
        if (resp.data.code === 1) {
          if (resp.data.data.length < 1) {
          } else {
            this.getId = resp.data.data.Id
            this.rules.publish = resp.data.data.stripe_config.PUBLISH_API_KEY
            this.rules.publishkey = resp.data.data.stripe_config.API_KEY
          }
        }
      })
    },
    routerDetails (item) {
      if (item.href === '') {
        this.postShow()
        this.centerDialogVisible = true
      }
      this.$router.push({ path: item.href })
    },
    includePermission: includePermission

  },
  created () {
    this.postShow()
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
element.style {
  border: none;
}
.setBox {
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-right: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  > div {
    border-left: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
  }
  > div:nth-child(3) {
    border-bottom: 1px solid #e3e3e3;
  }
  > div:nth-child(5) {
    border-right: 1px solid #e3e3e3;
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
.fontSize {
  > i {
    font-size: 36px;
  }
}
.el-tabs {
  margin-top: -40px;
  .el-span {
    margin-bottom: 10px;
    display: inline-block;
    margin-top: 5px;
  }
  .el-span1 {
    margin-bottom: 10px;
    display: inline-block;
  }
  .input {
    margin-bottom: 10px;
  }
}
</style>
<style lang="less" scoped>
.el-dialog__header {
  border-bottom: none;
}
.el-dialog__footer {
  border-top: none;
}
/deep/ .el-dialog__body {
  padding-bottom: 0;
}
</style>
