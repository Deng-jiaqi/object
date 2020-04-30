<template>
  <el-dialog
    :show-close="true"
    :title="title"
    :visible.sync="addressModalWindowVisible"
    class="adress-window"
    width="37%"
  >
    <div class="form-content">
      <el-form :model="addressInfo" :rules="rule" ref='form_adress'>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left" prop="firstname">
            <p>{{$t('lang.orderDetails.text45')}}</p>
            <el-input v-model="addressInfo.firstname" />
          </el-form-item>
          <el-form-item class="form-item-right" prop="lastname">
            <p>{{$t('lang.orderDetails.text46')}}</p>
            <el-input v-model="addressInfo.lastname" />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix" >
          <el-form-item class="form-item-left" prop="company">
            <p>{{$t('lang.orderDetails.text47')}}</p>
            <el-input v-model="addressInfo.company" />
          </el-form-item>
          <el-form-item class="form-item-right" prop="phone">
            <p>{{$t('lang.orderDetails.text48')}}</p>
            <el-input v-model="addressInfo.phone" />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left c-select">
            <p>{{$t('lang.orderDetails.text51')}}</p>
            <el-select @change="chooseCountry" v-model="addressInfo.country" :placeholder="''">
              <el-option
                v-for="item in countries"
                :key="item.id"
                :label="$i18n.locale==='zh-cn'?item.area:item.en_area"
                :value="$i18n.locale==='zh-cn'?item.area:item.en_area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-item-right c-select">
            <p>{{$t('lang.orderDetails.text52')}}</p>
            <el-select v-model="addressInfo.province" :placeholder="''">
              <el-option
                v-for="item in provinces"
                :key="item.id"
                :label="$i18n.locale==='zh-cn'?item.area:item.en_area"
                :value="$i18n.locale==='zh-cn'?item.area:item.en_area"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left" prop='city'>
            <p>{{$t('lang.orderDetails.text53')}}</p>
            <el-input v-model="addressInfo.city" />
          </el-form-item>
          <el-form-item class="form-item-right" prop='zipcode'>
            <p>{{$t('lang.orderDetails.text54')}}</p>
            <el-input v-model="addressInfo.zipcode" />
          </el-form-item>
        </el-form-item>
        <el-form-item class="form-item clearfix">
          <el-form-item class="form-item-left" prop='address'>
            <p>{{$t('lang.orderDetails.text49')}}</p>
            <el-input v-model="addressInfo.address" />
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button plain @click="addressModalWindowVisible=false">{{$t('lang.orderDetails.text55')}}</el-button>
      <el-button type="primary" @click="submitModifyAdress">{{$t('lang.orderDetails.text56')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import messageAlert from '@/utils/messageAlert'
import { modifyDeliveryAdress, lookarea } from '../../common/api/api'
import { validateChFname, validateChLname, companyValidator, phoneNumberValidator, cityNameValidator, zipcodeValidator, validateDiZhi } from '@/common/validator'
import { cloneDeep } from 'lodash'
export default {
  name: 'AddressModalWindow',
  components: {},
  props: {
    title: {
      type: String
    },
    orderid: null,
    addressData: {}
  },
  computed: {
  },
  methods: {
    chooseCountry (selectedValue) {
      // 选择国家,省份变化
      this.countries.forEach((item, index) => {
        if (selectedValue === item.area || selectedValue === item.en_area) {
          this.indexOfCountry = index
          console.log(this.indexOfCountry)
        }
      })
      this.provinces = this.countries[this.indexOfCountry].child
      switch (this.$i18n.locale) {
        case 'zh-cn':
          this.addressInfo.province = this.provinces[0].area
          break
        case 'en-us':
          this.addressInfo.province = this.provinces[0].en_area
          break
        default:
          break
      }
    },
    submitModifyAdress () {
      this.$refs['form_adress'].validate((valid) => {
        if (valid) {
          modifyDeliveryAdress({
            orderid: this.orderid,
            firstname: this.addressInfo.firstname,
            lastname: this.addressInfo.lastname,
            company: this.addressInfo.company,
            phone: this.addressInfo.phone,
            address: this.addressInfo.address,
            country: this.addressInfo.country,
            province: this.addressInfo.province,
            city: this.addressInfo.city,
            zipcode: this.addressInfo.zipcode
          }).then(res => {
            messageAlert(res)
            if (res.data.code === 1) {
              this.addressModalWindowVisible = false
              this.$emit('addressEdit', res.data.data)
            }
          })
        }
      })
    }
  },
  data () {
    return {
      rule: {
        firstname: [
          {
            validator: validateChFname,
            trigger: 'blur'
          }
        ],
        lastname: [
          {
            validator: validateChLname,
            trigger: 'blur'
          }
        ],
        company: [
          {
            validator: companyValidator,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            validator: phoneNumberValidator,
            trigger: 'blur'
          }
        ],
        city: [
          {
            validator: cityNameValidator,
            trigger: 'blur'
          }
        ],
        zipcode: [
          {
            validator: zipcodeValidator,
            trigger: 'blur'
          }
        ],
        address: [
          {
            validator: validateDiZhi,
            trigger: 'blur'
          }
        ]
      },
      // 变量
      indexOfCountry: 0, // 选中的国家在数组中的下标
      // ui
      addressModalWindowVisible: false,
      // data
      addressInfo: null,
      countries: null,
      provinces: null
    }
  },
  async created () {
    this.addressInfo = cloneDeep(this.addressData)
    let res = await lookarea()
    this.countries = res.data.data
    this.chooseCountry(this.addressInfo.country)
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
    height: 48px;
  }
  .c-select {
    // select框样式修改
    .el-select {
      width: 279px;
    }
    /deep/ .el-input__inner {
      height: 48px;
    }
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
  border-bottom: 1px solid rgba(229, 229, 229, 1);
  font-size: 20px;
  font-weight: bold;
  color: rgba(1, 1, 1, 1);
  padding-top: 36px;
  padding-bottom: 27px;
}
</style>
