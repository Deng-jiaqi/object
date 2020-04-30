<template>
  <el-dialog
    :show-close="true"
    :title="title"
    :visible.sync="addressModalWindowVisible"
    class="adress-window"
    width="94%"
  >
    <div class="form-content">
      <el-form :model="addressInfo" :rules="rule">
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left" prop="firstname">
            <p>名字</p>
            <el-input v-model="addressInfo.firstname" />
          </el-form-item>
          <el-form-item class="form-item-right">
            <p>姓氏</p>
            <el-input v-model="addressInfo.lastname" />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left">
            <p>公司</p>
            <el-input v-model="addressInfo.company" />
          </el-form-item>
          <el-form-item class="form-item-right">
            <p>电话号码</p>
            <el-input v-model="addressInfo.phone" />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left">
            <p>地址</p>
            <el-input v-model="addressInfo.adress" />
          </el-form-item>
          <el-form-item class="form-item-right">
            <p>单元、套房等(可选)</p>
            <el-input />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left c-select">
            <p>国家/地区</p>
            <el-select @change="chooseCountry" v-model="addressInfo.country" :placeholder="''">
              <el-option
                v-for="item in countriesAndProvinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-right c-select">
            <p>省份（州）</p>
            <el-select v-model="addressInfo.province" :placeholder="''">
              <el-option
                v-for="item in countriesAndProvinces[indexOfCountry].cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left">
            <p>城市</p>
            <!-- <el-select v-model="addressInfo.city" :placeholder="''">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
            <el-input v-model="addressInfo.city" />
          </el-form-item>
          <el-form-item class="form-item-right">
            <p>邮编/邮政编码</p>
            <el-input v-model="addressInfo.zipcode" />
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <edgButton class="btn-cancel" @click.native="addressModalWindowVisible=false" :text="'取消'" />
      <edgButton @click.native="submitModifyAdress" :text="'保存'" :type="'primary'" />
    </span>
  </el-dialog>
</template>
<script>
import { mapMutations } from 'vuex'
import edgButton from '@/components/administratorPanel/edgButton'
import { modifyDeliveryAdress } from '../../common/api/api'
export default {
  name: 'AddressModalWindow',
  components: { edgButton },
  props: {
    title: {
      type: String
    },
    orderid: null
  },
  methods: {
    ...mapMutations(['forEditReceivingAndShippingInformation']),
    chooseCountry (x) {
      console.log(x)
      this.countriesAndProvinces.forEach((item, index) => {
        if (x === item.value) {
          this.indexOfCountry = index
          console.log(index)
        }
      })
    },
    submitModifyAdress () {
      modifyDeliveryAdress({
        orderid: this.orderid,
        firstname: this.addressInfo.firstname,
        lastname: this.addressInfo.lastname,
        company: this.addressInfo.company,
        phone: this.addressInfo.phone,
        adress: this.addressInfo.adress,
        country: this.addressInfo.country,
        province: this.addressInfo.province,
        city: this.addressInfo.city,
        zipcode: this.addressInfo.zipcode
      }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
          this.addressModalWindowVisible = false
          this.forEditReceivingAndShippingInformation(1)
        }
      })
    }
  },
  data () {
    return {
      rule: {
        firstname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 变量
      indexOfCountry: 0, // 选中的国家在数组中的下标
      // ui
      addressModalWindowVisible: false,
      // data
      addressInfo: {
        firstname: '',
        lastname: '',
        company: '',
        phone: '',
        adress: '',
        country: '',
        province: '',
        city: '',
        zipcode: ''
      },
      countriesAndProvinces: [
        {
          value: '中国',
          label: '中国',
          cities: [
            {
              value: 'a',
              label: 'a'
            },
            {
              value: 'b',
              label: 'b'
            }
          ]
        },
        {
          value: '美国',
          label: '美国',
          cities: [
            {
              value: 'c',
              label: 'c'
            },
            {
              value: 'd',
              label: 'd'
            }
          ]
        },
        {
          value: '英国',
          label: '英国',
          cities: [
            {
              value: 'e',
              label: 'e'
            },
            {
              value: 'f',
              label: 'f'
            }
          ]
        },
        {
          value: '加拿大',
          label: '加拿大',
          cities: [
            {
              value: 'g',
              label: 'g'
            },
            {
              value: 'h',
              label: 'h'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
 /deep/ .el-dialog {
  min-width: 620px;
}
.form-content {
  .form-item {
    margin-bottom: 25px;
    .form-item-left {
      float: left;
    }
    .form-item-right {
      float: right;
    }
    p {
      margin: 0;
      margin-bottom: 9px;
      font-size: 15px;
      line-height: 30px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  // input框样式修改
  /deep/ .el-input {
    width: 279px;
  }
  /deep/ .el-input__inner {
    background: #fff;
    border: 1px solid rgba(149, 149, 149, 1);
    border-radius: 4px;
    // outline: rgba(56, 92, 165, 1);
    padding-left: 17px;
    height: 48px;
  }
  /deep/ .el-input__inner:focus {
    border: 1px solid rgba(0, 159, 255, 1);
  }
  /deep/ .el-input__inner:hover {
    border-color: rgba(0, 159, 255, 1);
  }
  .c-select {
    // select框样式修改
    .el-select {
      width: 279px;
    }
    /deep/ .el-input__suffix {
      display: none;
    }
    /deep/ .el-input::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top: 6px solid rgba(109, 109, 109, 1);
      right: 10px;
      top: calc(50% - 4px);
      transition: all 0.3s;
      cursor: pointer;
    }
    /deep/ .el-select .el-input.is-focus .el-input__inner {
      border-color:  rgba(0, 159, 255, 1);
    }
    /deep/ .el-select .el-input__inner:focus {
      border-color:  rgba(0, 159, 255, 1);
    }
    /deep/ .el-select .el-input__inner:hover {
      border-color:  rgba(0, 159, 255, 1);
    }
    .el-select-dropdown__item.selected {
      color:  rgba(0, 159, 255, 1);
    }
    /deep/ .el-input__inner {
      height: 48px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(137, 137, 137, 1);
      border: 1px solid #959595;
      border-radius: 4px;
    }
  }
}
.dialog-footer {
  .btn-cancel {
    margin-right: 10px;
  }
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
// dialog样式修改
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
</style>
