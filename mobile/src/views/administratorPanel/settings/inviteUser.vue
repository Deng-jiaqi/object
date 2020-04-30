<template>
  <div class="inviteUser">
    <div class="inviteUser-box">
      <h1>{{$t('inviteUser.header.title')}}</h1>
      <p>{{$t('inviteUser.header.text1')}}</p>
      <div class="inviteUser-form">
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm">
          <el-form-item :label="$t('inviteUser.content.label1')" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('inviteUser.content.label2')" prop="Firstname">
                  <el-input v-model="ruleForm.Firstname"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('inviteUser.content.label3')" prop="Lastname">
                  <el-input v-model="ruleForm.Lastname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item :label="$t('inviteUser.content.label4')" v-if="visiblePwd" prop="pwd">
            <div>
              <el-input type="password" v-model="ruleForm.pwd" :placeholder="$t('inviteUser.content.place1')">
                <i slot="suffix" :title="$t('inviteUser.content.title1')" @click="changePass('show')" style="cursor:pointer;"
                   class="iconfont iconyanjingdingge"></i>
              </el-input>
              <div class='input_span'>
                <label>{{$t('inviteUser.content.label5')}}</label>
                <span class="one" ref="oneColor"></span>
                <span class="two" ref="twoColor"></span>
                <span class="three" ref="threeColor"></span>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-else :label="$t('inviteUser.content.label4')" prop="pwd">
            <div>
              <el-input type="text" v-model="ruleForm.pwd" :placeholder="$t('inviteUser.content.place1')">
                <i slot="suffix" :title="$t('inviteUser.content.title2')" @click="changePass('hide')" style="cursor:pointer;"
                   class="iconfont iconyanjing"></i>
              </el-input>
              <div class='input_span'>
                <label>{{$t('inviteUser.content.label5')}}</label>
                <span class="one" ref="oneColor"></span>
                <span class="two" ref="twoColor"></span>
                <span class="three" ref="threeColor"></span>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="visible" :label="$t('inviteUser.content.label6')" prop="confirmPassword">
            <el-input type="password" v-model="ruleForm.confirmPassword" :placeholder="$t('inviteUser.content.place1')">
              <i slot="suffix" :title="$t('inviteUser.content.title1')" @click="changeConfirmPass('show')" style="cursor:pointer;"
                 class="iconfont iconyanjingdingge"></i>
            </el-input>
          </el-form-item>
          <el-form-item v-else :label="$t('inviteUser.content.label6')" prop="confirmPassword">
            <el-input type="text" v-model="ruleForm.confirmPassword" :placeholder="$t('inviteUser.content.place1')">
              <i slot="suffix" :title="$t('inviteUser.content.title2')" @click="changeConfirmPass('hide')" style="cursor:pointer;"
                 class="iconfont iconyanjing"></i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="inviteUser-footer">
        <div></div>
        <el-button type="primary" v-preventReClick="2000" @click="submitForm('ruleForm')">{{$t('inviteUser.save')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkStrong, validateEMail, validateChFname, validateChLname } from '../../../common/validator'
import { EvalidateEMail, EvalidateChFname, EvalidateChLname } from '../../../common/enValidator'
import { Uconfirminvite } from '../../../common/api/api'
import { hexSha1 } from '../../../utils/encryption'
export default {
  name: 'inviteUser',
  data () {
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '') {
        callback(new Error(this.$t('validator.vaIsPwd.err1')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('validator.vaIsPwd.err2')))
      } else {
        if (this.ruleForm.confirmPassword !== '') {
          this.$refs.ruleForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('validator.vaIsPwd.err3')))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error(this.$t('validator.vaIsPwd.err4')))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '', // 邮箱
        Firstname: '', // 名字
        Lastname: '', // 姓氏
        pwd: '', // 密码
        confirmPassword: '' // 确认密码
      },
      rules: {
        email: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateEMail, trigger: 'blur' }] : [{ validator: validateEMail, trigger: 'blur' }],
        Firstname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateChFname, trigger: 'blur' }] : [{ validator: validateChFname, trigger: 'blur' }],
        Lastname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateChLname, trigger: 'blur' }] : [{ validator: validateChLname, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      msgText: '',
      visible: true,
      visiblePwd: true
    }
  },
  methods: {
    changePass (value) {
      this.visiblePwd = !(value === 'show')
    },
    changeConfirmPass (value) {
      this.visible = !(value === 'show')
    },
    getColor () {
      if (this.msgText > 1 || this.msgText === 1) {
        this.$refs.oneColor.style.background = 'red'
      } else {
        this.$refs.oneColor.style.background = '#eee'
      }
      if (this.msgText > 2 || this.msgText === 2) {
        this.$refs.twoColor.style.background = 'orange'
      } else {
        this.$refs.twoColor.style.background = '#eee'
      }
      if (this.msgText === 4) {
        this.$refs.threeColor.style.background = '#00D1B2'
      } else {
        this.$refs.threeColor.style.background = '#eee'
      }
    },
    // 进入商店
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Uconfirminvite({
            firstname: this.ruleForm.Firstname,
            lastname: this.ruleForm.Lastname,
            email: this.ruleForm.email,
            passwd: hexSha1(this.ruleForm.pwd),
            receive: this.$route.query.receive,
            insertid: this.$route.query.insertid,
            storeid: this.$route.query.storeid
          }).then(resp => {
            if (resp.data.code === 1) {
              this.$message({
                type: 'success',
                message: resp.data.msg
              })
            } else {
              this.$message({
                type: 'danger',
                message: resp.data.msg
              })
            }
          })
        }
      })
    }
  },
  watch: {
    'ruleForm.pwd': function (newname, oldname) {
      this.msgText = checkStrong(newname)
      this.getColor()
    }
  },
  created () {
  }
}
</script>

<style scoped lang="less">
  .inviteUser {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f6f8;
    .inviteUser-box {
      width: 600px;
      margin: 100px auto;
      .inviteUser-form {
        background-color: white;
        padding: 20px;
      }
      .inviteUser-footer {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  #inputValue {
    width: 240px;
    margin-left: 20px;
    padding-left: 10px;
    border-radius: 3px;
  }
  .input_span span {
    display: inline-block;
    width: 85px;
    height: 10px;
    background: #eee;
    line-height: 20px;
  }

  .one {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: 0px solid;
    margin-left: 20px;
    margin-right: 3px;
  }

  .two {
    border-left: 0px solid;
    border-right: 0px solid;
    margin-left: -5px;
    margin-right: 3px;
  }

  .three {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-left: 0px solid;
    margin-left: -5px;
  }
  #font span:nth-child(1) {
    color: red;
    margin-left: 80px;
  }
  #font span:nth-child(2) {
    color: orange;
    margin: 0 60px;
  }
  #font span:nth-child(3) {
    color: #00d1b2;
  }
</style>
