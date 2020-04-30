<template>
  <div class="addSet" v-loading="loading">
    <div class="addSet-header">
      <h1>{{headerTitle}}</h1>
      <p class="add-black" @click="backTop">
        <span class="el-icon-arrow-left"></span>
        <span>{{$t('addSet.header.back')}}</span>
      </p>
    </div>
    <el-row class="addSet-box">
      <el-col :span="8">
        <h3>{{$t('addSet.content.text1')}}</h3>
        <p>{{$t('addSet.content.text2')}}</p>
        <p>
          {{$t('addSet.content.text3')}}
          <el-link type="primary" :underline="false">{{$t('addSet.content.text4')}}</el-link>
        </p>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-two-box">
        <p>{{$t('addSet.content.text5')}}</p>
        <el-input v-model="ruleForm.name" :placeholder="$t('addSet.content.place1')" maxlength="30"></el-input>
        <div>
          <el-checkbox>{{$t('addSet.content.text6')}}</el-checkbox>
          <p>{{$t('addSet.content.text7')}}</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="set-twoBox">
      <el-col :span="8">
        <h3>{{$t('addSet.content.slot')}}</h3>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15">
        <div class="set-two-right">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
            <el-form-item :label="$t('addSet.label.text1')" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addSet.label.text2')" prop="detail_address">
              <el-input v-model="ruleForm.detail_address"></el-input>
            </el-form-item>
            <el-form-item :label="$t('addSet.label.text3')" prop="city">
              <el-input v-model="ruleForm.city"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('addSet.label.text4')" prop="country">
                    <el-select v-model="ruleForm.country">
                      <el-option
                        v-for="option in arr"
                        :value="option.name"
                        :key="option.value"
                        :disabled="option.disabled"
                      >{{option.name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('addSet.label.text5')" prop="Province">
                    <el-select v-model="ruleForm.province">
                      <el-option
                        v-for="option in cityArr"
                        :value="option.name"
                        :key="option.value"
                        :disabled="option.disabled"
                      >{{option.name}}</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('addSet.label.text6')" prop="postcode">
                    <el-input v-model="ruleForm.postcode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item :label="$t('addSet.content.label1')" prop="phone">
              <el-input
                :placeholder="$t('addSet.content.place2')"
                v-model="ruleForm.phone"
                class="input-with-select"
              >
                <div class="addSet-select" slot="append">
                  <el-select v-model="ruleForm.code" :placeholder="$t('addSet.content.place3')">
                    <template v-if="this.$i18n.locale === 'zh-cn'">
                      <el-option
                        v-for="(item,index) in ruleForm.areaCode"
                        :key="index"
                        :label="item.zh + '+' + item.code"
                        :value="item.code"
                      ></el-option>
                    </template>
                    <template v-else>
                      <el-option
                        v-for="(item,index) in ruleForm.areaCode"
                        :key="index"
                        :label="item.en + '+' + item.code"
                        :value="item.code"
                      ></el-option>
                    </template>
                  </el-select>
                </div>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div v-if="field !== 'addSet'">
      <el-row class="set-twoBox" v-if="len > 1 || is_use === 0">
        <el-col :span="8">
          <h2>{{is_use === 1 ? blockData.title : blockData1.title}}</h2>
          <p>{{is_use === 1 ? blockData.text1:blockData1.text1}}</p>
          <p>
            {{is_use === 1 ? blockData.text2: blockData1.text2}}
            <el-link
              type="primary"
              :underline="false"
            >{{is_use === 1 ? blockData.text3:blockData1.text3}}</el-link>
          </p>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="15">
          <div class="set-two-right">
            <p>{{is_use === 1 ? blockData.p1 : blockData1.p1}}</p>
            <el-button @click="OutSave">{{is_use === 1 ? blockData.btn : blockData1.btn}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="flexBetween set-twoBox">
      <div>
        <template v-if="field !== 'addSet'">
          <el-button
            type="danger"
            @click="delSite"
            v-if="is_use === 0"
          >{{$t('addSet.content.btn1')}}</el-button>
        </template>
      </div>
      <el-button type="primary" @click="saveSite('ruleForm')">{{$t('addSet.content.btn2')}}</el-button>
    </div>
    <!--    停用位置-->
    <el-dialog
      :title="$t('addSet.elDialogSite.title')"
      :visible.sync="dialogVisibleOut"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="diaBox" v-if="has_storage === false">
        <p>{{$t('addSet.elDialogSite.text1')}}</p>
      </div>
      <div class="dead-replace" v-else>
        <div>
          <p class="el-icon-info">
            {{$t('addSet.elDialogSite.text2')}}
            <span
              style="color: black;font-weight: bold"
            >{{headerTitle}}</span>
            {{$t('addSet.elDialogSite.text3')}}
          </p>
        </div>
        <div>
          <label>{{$t('addSet.elDialogSite.text4')}}</label>
          <br />
          <el-select v-model="selectVal">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleOut = false">{{$t('addSet.elDialogSite.btn1')}}</el-button>
        <el-button
          type="primary"
          @click="blockSave"
          v-loading="loading"
        >{{$t('addSet.elDialogSite.btn2')}}</el-button>
      </span>
    </el-dialog>
    <!--    删除位置-->
    <el-dialog
      :title="$t('addSet.elDialogDel.title')"
      :visible.sync="dialogVisibleDel"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="diaBox">
        <p>
          {{$t('addSet.elDialogDel.text1')}}
          <span>{{ruleForm.name}}</span>
          {{$t('addSet.elDialogDel.text2')}}
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDel = false">{{$t('addSet.elDialogDel.btn1')}}</el-button>
        <el-button type="danger" @click="delCosite">{{$t('addSet.elDialogDel.btn2')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import arrAll from '../../../common/cityData'
import enAll from '../../../common/enCityData'
import areaCode from '../../../common/areaCode'
import { Sshowdetail, Ssavedetail, Sadd, Shandele, Sdelete, Sshowreplace } from '../../../common/api/api'
import { validatetoNum, validatePhone } from '../../../common/validator'
import { EvalidatePhone, EvalidatetoNum } from '../../../common/enValidator'
export default {
  name: 'addSet',
  data () {
    return {
      blockData: {},
      blockData1: {},
      loading: true, // 页面加载数据等待
      headerTitle: '', // 头部标题文字
      dialogVisibleOut: false, // 停用位置模态框
      dialogVisibleDel: false, // 删除位置模态框
      select: '', // 下拉
      cityArr: [], // 城市数据
      ruleForm: { // 表单
        name: '',
        address: '', // 地址
        detail_address: '',
        city: '', // 城市
        country: '', // 所属国家/地区
        province: '', // 省份或者州
        postcode: '', // 邮政编码
        phone: '',
        select: '',
        location_name: '',
        options: [],
        code: 86,
        areaCode: areaCode
      },
      rules: {
        postcode: this.$i18n.locale === 'en-us' ? [{ validator: EvalidatetoNum, trigger: 'blur' }] : [{ validator: validatetoNum, trigger: 'blur' }],
        phone: this.$i18n.locale === 'en-us' ? [{ validator: EvalidatePhone, trigger: 'blur' }] : [{ validator: validatePhone, trigger: 'blur' }]
      },
      is_use: 0, // 位置使用状态 0为停止使用 1为使用中
      has_storage: true, // 判断仓库是否存有数量
      selectVal: 'off', // 替换仓库位置下拉
      options: [
        {
          value: 'off',
          label: this.$t('addSet.hint.text2'),
          disabled: true
        }
      ],
      len: this.$route.query.len, // 判断仓库位置长度
      field: this.$route.query.field
    }
  },
  methods: {
    // 返回产品页面
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
    },
    // 保存仓库修改
    saveSite (formName) {
      if (this.ruleForm.name === '') {
        this.$message(this.$t('addSet.hint.text1'))
        return false
      } else {
        if (this.$route.query.field === 'addSet') {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              Sadd(this.ruleForm).then(resp => { // 添加仓库位置
                if (resp.data.code === 1) {
                  this.$router.push({
                    path: '/settings/setDetail'
                  })
                  this.$message.success(resp.data.msg)
                } else {
                  this.$message(resp.data.msg)
                }
              })
            }
          })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.location_name = this.ruleForm.name
              Ssavedetail(this.ruleForm).then(resp => { // 编辑仓库位置
                this.$message.success(resp.data.msg)
                this.$router.push({
                  path: '/settings/setDetail'
                })
              })
            }
          })
        }
      }
    },
    // 打开删除位置模态框
    delSite () {
      this.dialogVisibleDel = true
    },
    // 确定删除位置
    delCosite () {
      Sdelete({
        Id: this.$route.query.Id
      }).then(resp => {
        this.$message(resp.data.msg)
        this.$router.go(-1)
      })
    },
    // 停用点击事件
    OutSave () {
      if (this.is_use === 1) {
        this.dialogVisibleOut = true
      } else {
        Shandele({
          Id: Number(this.$route.query.Id),
          type: 1
        }).then(resp => {
          if (resp.data.code === 1) {
            this.is_use = 1
            this.$message.success(resp.data.msg)
          } else {
            this.$message.error(resp.data.msg)
          }
        })
      }
    },
    // 位置停用或者激活请求
    postShandele () {
      Shandele({
        Id: this.$route.query.Id,
        type: 0,
        replace_id: this.selectVal
      }).then(resp => {
        this.dialogVisibleOut = false
        this.loading = false
        this.is_use = 0
        this.$message(resp.data.msg)
      })
    },
    // 停用确定
    blockSave () {
      if (this.has_storage === true) {
        if (this.selectVal !== 'off') {
          this.postShandele()
        } else {
          this.$message(this.$t('addSet.hint.text3'))
          return false
        }
      } else {
        this.postShandele()
      }
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
  created () {
    this.blockData = this.$t('addSet.blockData')
    this.blockData1 = this.$t('addSet.blockData1')
    if (this.$route.query.field === 'addSet') {
      this.headerTitle = this.$t('addSet.header.text1')
      this.loading = false
    } else {
      Sshowdetail({
        Id: this.$route.query.Id
      }).then(resp => {
        Number(resp.data.data.code)
        this.ruleForm = resp.data.data
        this.$set(this.ruleForm, 'areaCode', areaCode)
        this.headerTitle = JSON.parse(JSON.stringify(resp.data.data.name))
        this.is_use = Number(resp.data.data.is_use)
        this.loading = false
        this.has_storage = resp.data.data.has_storage
        Sshowreplace({ Id: this.$route.query.Id }).then(resp => {
          if (this.has_storage === true) {
            resp.data.data.forEach(val => {
              let obj = {
                value: val.Id,
                label: val.name
              }
              this.options.push(obj)
            })
          }
        })
      })
    }
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
@import "../../../common/css/elementCommon";
.addSet-select {
  .el-select .el-input {
    width: 100px;
  }
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.addSet {
  margin: auto;
  .addSet-header {
    .flexBetween;
    height: 120px;
  }
}
.addSet-box {
  .addSet-two-box {
    background-color: white;
    border: 1px solid #e3e3e3;
    padding: 30px;
    > div:nth-child(3) {
      margin-top: 20px;
    }
  }
}
.set-twoBox {
  border-top: 1px solid #e3e3e3;
  margin: 30px auto 50px auto;
  padding-top: 30px;
  .set-two-right {
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    .flexBetween;
    padding: 30px;
    background-color: white;
    .set-two-ul {
      > li {
        height: 30px;
      }
    }
  }
}
.addSet-save {
  margin: 30px auto auto auto;
}
.dead-replace {
  > div:nth-child(1) {
    background-color: #fdf7e3;
    height: 30px;
    padding: 20px;
  }
  > div:nth-child(2) {
    margin-top: 10px;
    border-top: 1px solid #e3e3e3;
    padding-top: 20px;
    > .el-select {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
