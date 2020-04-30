<template>
  <div class="regMessage">
      <div class="regMessage-box">
        <div class="regMessage-header">
          <h1 class="reg-title">{{$t('lang.regMessage.title')}}</h1>
          <p class="reg-moren">{{$t('lang.regMessage.text')}}</p>
        </div>
        <div class="formBox">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="firstname" prop="Firstname" v-if="this.$i18n.locale === 'en-us'">
              <el-input type="text" v-model="ruleForm.Firstname" clearable />
            </el-form-item>
            <el-form-item label="lastname" prop="Lastname" v-if="this.$i18n.locale === 'en-us'">
              <el-input type="text" v-model="ruleForm.Lastname" clearable />
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label1')" prop="Name" v-if="this.$i18n.locale === 'zh-cn'">
              <el-input type="text" v-model="ruleForm.Name" clearable />
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label2')" prop="Address">
              <el-input type="text" v-model="ruleForm.Address" clearable />
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label3')">
              <el-input type="text" v-model="ruleForm.Detailaddress" clearable />
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label4')" prop="City">
              <el-input type="text" v-model="ruleForm.City" clearable />
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label5')" prop="Postcode">
              <el-input v-model="ruleForm.Postcode" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label6')">
              <el-select v-model="ruleForm.country" style="width: 100%">
                <el-option
                  v-for="option in arr"
                  :value="option.name"
                  :key="option.value"
                  :disabled="option.disabled"
                >{{ option.name }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label7')">
              <el-select v-model="ruleForm.province" style="width: 100%">
                <el-option
                  v-for="option in cityArr"
                  :value="option.name"
                  :key="option.value"
                  :disabled="option.disabled"
                >{{ option.name }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label8')" prop="Number">
              <el-input v-model="ruleForm.Number" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.regMessage.label9')">
              <el-input type="text" v-model="ruleForm.Website" :maxlength="200" show-word-limit clearable />
            </el-form-item>
            <transition name="fade">
              <div class="register-tishi" v-if="regHide">
                <p class="tishi-text" :v-model="hint">{{hint}}</p>
              </div>
            </transition>
          </el-form>
        </div>
        <div class="regMessage-footer">
          <el-button
            type="primary"
            v-preventReClick="3000"
            @click="submitForm('ruleForm')"
          >{{$t('lang.regMessage.btn')}}</el-button>
        </div>
        <p @click="backTop">
          {{$t('lang.regMessage.back')}}
          <span class="el-icon-arrow-right"></span>
        </p>
      </div>
  </div>
</template>

<script>
import arrAll from '../../common/cityData'
import enAll from '../../common/enCityData'
import { Fillmsg } from '../../common/api/api'
import {
  validatePhone, validateEMail, validateName,
  validatetoNum, validateValue, validateLength, validateSite,
  validateDiZhi, validateFname, validateLname
} from '../../common/validator'
import {
  EvalidatePhone, EvalidateEMail, EvalidateName,
  EvalidatetoNum, EvalidateValue, EvalidateLength, EvalidateSite,
  EvalidateDiZhi, EvalidateFname, EvalidateLname
} from '../../common/enValidator'
export default {
  name: 'AregMessage',
  data () {
    return {
      loading: true,
      ruleForm: {
        Name: '', // 中文的姓名
        Firstname: '', // 英文名称的名
        Lastname: '', // 英文名称的姓
        Address: '', // 卖家住址
        Detailaddress: '', // 卖家详细地址
        Postcode: '', // 邮编号码
        Number: '', // 电话号码
        Email: '', // 邮箱
        Website: '', // 个人/公司网址
        country: '', // 卖家所属国家/地区
        province: '', // 省份或者州
        City: '' // 城市
      },
      rules: {
        Name: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateName, trigger: 'blur' }] : [{ validator: validateName, trigger: 'blur' }],
        Firstname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateFname, trigger: 'blur' }] : [{ validator: validateFname, trigger: 'blur' }],
        Lastname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateLname, trigger: 'blur' }] : [{ validator: validateLname, trigger: 'blur' }],
        Detailaddress: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateValue, trigger: 'blur' }] : [{ validator: validateValue, trigger: 'blur' }],
        Address: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateDiZhi, trigger: 'blur' }] : [{ validator: validateDiZhi, trigger: 'blur' }],
        Number: this.$i18n.locale === 'en-us' ? [{ validator: EvalidatePhone, trigger: 'blur' }] : [{ validator: validatePhone, trigger: 'blur' }],
        Postcode: this.$i18n.locale === 'en-us' ? [{ validator: EvalidatetoNum, trigger: 'blur' }] : [{ validator: validatetoNum, trigger: 'blur' }],
        address: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateLength, trigger: 'blur' }] : [{ validator: validateLength, trigger: 'blur' }],
        country: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateSite, trigger: 'blur' }] : [{ validator: validateSite, trigger: 'blur' }],
        Email: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateEMail, trigger: 'blur' }] : [{ validator: validateEMail, trigger: 'blur' }]
      },
      hint: '', // 提示语句
      setInterName: '', // 定时
      regHide: false
    }
  },
  methods: {
    // 返回上一步
    backTop () {
      this.$router.go(-1)
    },
    updateCity: function () {
      for (var i in this.arr) {
        var obj = this.arr[i]
        if (obj.name === this.ruleForm.country) {
          this.cityArr = obj.sub
          break
        }
      }
      this.ruleForm.province = this.cityArr[1].name
    },
    updateDistrict: function () {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i]
        if (obj.name === this.ruleForm.province) {
          this.districtArr = obj.sub
          break
        }
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        this.ruleForm.city = this.districtArr[1].name
      } else {
        this.ruleForm.city = ''
      }
    },
    // 进入商店
    submitForm (formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ARR = [
            {
              Name: this.ruleForm.Name,
              Firstname: this.ruleForm.Firstname,
              Lastname: this.ruleForm.Lastname,
              Address: this.ruleForm.Address,
              Detailaddress: this.ruleForm.Detailaddress,
              Country: this.ruleForm.country,
              Province: this.ruleForm.province,
              City: this.ruleForm.City,
              Postcode: this.ruleForm.Postcode,
              Number: this.ruleForm.Number,
              Website: this.ruleForm.Website,
              Email: sessionStorage.getItem('Email'),
              Passwd: sessionStorage.getItem('Pwd'),
              Mailpwd: sessionStorage.getItem('Mailpwd'),
              Shopname: sessionStorage.getItem('Shopname')
            }
          ]
          Fillmsg({
            arr: ARR
          }).then(resp => {
            this.regHide = true
            this.hint = resp.data.msg
            if (resp.data.code === 1) {
              // 注册成功把商店加入最近登录的商店列表
              let ARegisterSuccess = {}
              ARegisterSuccess.token = resp.data.data.token
              ARegisterSuccess.site = 'xxx'
              ARegisterSuccess.email = this.$cookies.get('registerEmail')
              ARegisterSuccess.storeName = this.$cookies.get('registerStoreName')
              ARegisterSuccess.sellerid = resp.data.data.sellerid
              if (!this.$cookies.get('ALoginInfoSuccessList')) {
                this.$cookies.set(
                  'ALoginInfoSuccessList',
                  JSON.stringify([]),
                  60 * 60 * 24 * 3
                )
              }
              let list = JSON.parse(this.$cookies.get('ALoginInfoSuccessList'))
              list.push(ARegisterSuccess)
              console.log(list)
              this.$cookies.set('ALoginInfoSuccessList', JSON.stringify(list))
              this.$cookies.set('sellerid', resp.data.data.sellerid)
              this.$cookies.set('sellername', resp.data.data.sellername)
              this.$cookies.set('sellerimg', resp.data.data.seller_head)
              this.setInterName = setInterval(() => {
                this.loading = false
                this.regHide = false
                this.$router.push({ path: '/administratorPanel/home' })
                clearInterval(this.setInterName)
              }, 1000)
            }
          })
        } else {
          this.regHide = true
          this.hint = this.$t('temporary.regMessage.text1')
          this.setInterName = setInterval(() => {
            this.loading = false
            this.regHide = false
            clearInterval(this.setInterName)
          }, 2000)
          return false
        }
      })
    },
    // 返回输入店铺密码
    backPwd () {
      this.$router.go(-1)
    }
  },
  watch: {
    'ruleForm.country': function () {
      this.updateCity()
      this.updateDistrict()
    },
    'ruleForm.province': function () {
      this.updateDistrict()
    }
  },
  beforeMount: function () {
    this.updateCity()
    this.updateDistrict()
  },
  beforeDestroy () {
    // 离开页面销毁定时器
    clearInterval(this.setInterName)
  },
  // 页面加载时获取数据
  created () {
    this.loading = false
    if (this.$i18n.locale === 'zh-cn') {
      this.arr = arrAll
      this.ruleForm.country = '中国'
      this.ruleForm.province = '北京'
      this.ruleForm.city = ''
    } else if (this.$i18n.locale === 'en-us') {
      this.arr = enAll
      this.ruleForm.country = 'China'
      this.ruleForm.province = 'Beijing'
      this.ruleForm.city = ''
    }
  }
}
</script>
<style lang="less">
.formBox {
  .el-input__inner {
    height: 52px;
  }
  .el-input__inner:focus {
    border-color: #4267b2;
  }
}
</style>
<style lang="less" scoped>
  .regMessage {
    width: 100%;
    text-align: center;
    position: relative;
    overflow-x: hidden;
  }
  .formBox {
    background-color: white;
    border-radius: 0.15625rem;
    padding: 10px;
    margin: auto;
    text-align: left;
    position: relative;
  }
  .form div {
    margin-top: 0.625rem;
  }
  .regMessage-box {
    width: 90%;
    margin: auto;
  }
  .reg-title {
    font-size: 1.125rem;
  }
  .reg-moren {
    font-size: 0.6875rem;
  }
  .regMessage-footer {
    margin: auto;
    display: flex;
    justify-content: center;
    > button {
      width:182px;
      height:56px;
      background: #4267b2;
      border-radius: 26px;
      color: white;
    }
    > span {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .register-tishi {
    position: absolute;
    top: 400px;
    left: 236px;
    height: auto;
    background-color: rgba(0, 0, 0, 0.59);
    color: white;
    width: 240px;
    line-height: 26px;
    font-size: 14px;
    border-radius: 6px;
    letter-spacing: 2px;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
