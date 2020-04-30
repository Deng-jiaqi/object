<template>
  <div>
    <p class="add-black" @click="backTop">
      <span class="el-icon-arrow-left"></span>
      <span>{{$t('userDetail.header.back')}}</span>
    </p>
    <!--    // 账户信息-->
    <el-row class="addSet-box">
      <el-col :span="8">
        <h3>{{$t('staffDetail.title')}}</h3>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-two-box">
        <div class="addSet-two-box-content">
          <h3>{{$t('staffDetail.text1')}}</h3>
          <div class="staffImg">
            <el-avatar :size="50" :src="ruleForm.head_img"></el-avatar>
            <div class="userUpImg">
              <label for="fileS">{{$t('userDetail.content.text3')}}</label>
              <el-button type="primary">{{$t('userDetail.content.text3')}}</el-button>
              <input type="file" ref="uploader" id="fileS" @change="fileChange($event)" />
            </div>
            <el-button type="danger" @click="delUpImg">{{$t('userDetail.content.text4')}}</el-button>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item>
              <el-row :gutter="20" style="margin-bottom: 20px">
                <el-col :span="12">
                  <el-form-item :label="$t('userDetail.content.label1')" prop="firstname">
                    <el-input v-model="ruleForm.firstname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('userDetail.content.label2')" prop="lastname">
                    <el-input v-model="ruleForm.lastname"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item :label="$t('userDetail.content.label3')" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('userDetail.content.label4')" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-padding">
          <p>{{$t('userDetail.content2.text6')}}</p>
          <el-button v-if="hidePwd" @click="hidePwd = false">{{$t('userDetail.content2.text8')}}</el-button>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-else>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('userDetail.content2.label2')" prop="pwd">
                  <el-input v-model="ruleForm.pwd" show-password></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('userDetail.content2.label3')" prop="newpasswd">
                  <el-input v-model="ruleForm.newpasswd" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <!--    // 语言设置-->
    <el-row class="addSet-box">
      <el-col :span="8">
        <h3>{{$t('staffDetail.text2')}}</h3>
        <p>{{$t('staffDetail.text3')}}</p>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-two-box">
        <el-row class="content-padding">
          <h3>{{$t('staffDetail.text4')}}</h3>
          <el-select v-model="value" :placeholder="$t('staffDetail.place')" style="width: 100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
    <div class="flexBetween set-twoBox">
      <div></div>
      <el-button
        type="primary"
        v-preventReClick="2000"
        @click="saveAddUser('ruleForm')"
      >{{$t('userDetail.content4.text4')}}</el-button>
    </div>
    <!--    更改邮箱验证账户密码-->
    <el-dialog
      :title="$t('userDetail.elDialogPwd.title')"
      :visible.sync="dialogVisiblePwd"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="diaBox">
        <p>{{$t('userDetail.elDialogPwd.text1')}}</p>
        <el-input v-model="newEmail" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePwd = false">{{$t('userDetail.elDialogPwd.btn1')}}</el-button>
        <el-button
          type="primary"
          @click="saveEmail"
          v-preventReClick="2000"
        >{{$t('userDetail.elDialogPwd.btn2')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { hexSha1 } from '../../../utils/encryption'
import { Ulookinfo, Uupdateinfo, loginOut } from '../../../common/api/api'
import { validateEMail, validateChFname, validateChLname } from '../../../common/validator'
import { EvalidateEMail, EvalidateChLname, EvalidateChFname } from '../../../common/enValidator'

export default {
  name: 'uesrDetail',
  data () {
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '') {
        callback(new Error(this.$t('validator.vaIsPwd.err1')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('validator.vaIsPwd.err2')))
      } else {
        if (this.ruleForm.newpasswd !== '') {
          this.$refs.ruleForm.validateField('newpasswd')
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
      newEmail: '', // 新邮箱
      oldEmail: '', // 旧邮箱
      dialogVisiblePwd: false, // 判断邮箱是否改变
      hidePwd: true,
      options: [{
        value: 'zh-cn',
        label: '中文'
      }, {
        value: 'en-us',
        label: 'English'
      }],
      value: '',
      ruleForm: {
        head_img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        newpasswd: '',
        pwd: ''
      },
      rules: {
        email: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateEMail,
          trigger: 'blur'
        }] : [{ validator: validateEMail, trigger: 'blur' }],
        firstname: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateChFname,
          trigger: 'blur'
        }] : [{ validator: validateChFname, trigger: 'blur' }],
        lastname: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateChLname,
          trigger: 'blur'
        }] : [{ validator: validateChLname, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        newpasswd: [{ validator: validatePass2, trigger: 'blur' }]
      },
      GetSellerId: 1 // 获取当前id
    }
  },
  methods: {
    // 返回产品页面
    backTop () {
      this.$router.go(-1)
    },
    // 上传员工头像
    fileChange (e) {
      var _this = this
      var file = e.target.files
      var leng = file.length
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          _this.ruleForm.head_img = e.target.result
        }
      }
    },
    // 删除员工头像
    delUpImg () {
      this.ruleForm.head_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    // 请求修改邮箱
    postEmail () {
      Uupdateinfo({
        sellerid: this.$cookies.get('sellerid'),
        before_email: this.ruleForm.email,
        after_email: this.newEmail,
        lastname: this.ruleForm.lastname,
        firstname: this.ruleForm.firstname,
        head_img: this.ruleForm.head_img,
        phone: this.ruleForm.phone,
        newpasswd: this.ruleForm.newpasswd
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message({
            message: resp.data.msg,
            type: 'success'
          })
          this.$router.push({
            path: '/administratorPanel/settings/set'
          })
          if (Number(this.GetSellerId) === Number(this.$cookies.get('sellerid'))) {
            let name = this.ruleForm.firstname + this.ruleForm.lastname
            this.$store.commit('setHeaderName', name)
            this.$store.commit('setHeaderImg', this.ruleForm.head_img)
          }
          this.$cookies.set('think_var', this.value)
          this.$i18n.locale = this.value
        } else {
          this.$message(resp.data.msg)
        }
      })
    },
    // 保存账户所有者修改的账户邮箱
    saveEmail () {
      let newpasswd
      this.hidePwd === false ? newpasswd = hexSha1(this.ruleForm.newpasswd) : newpasswd = ''
      Uupdateinfo({
        sellerid: this.$cookies.get('sellerid'),
        before_email: this.oldEmail,
        after_email: this.ruleForm.email,
        lastname: this.ruleForm.lastname,
        firstname: this.ruleForm.firstname,
        head_img: this.ruleForm.head_img,
        passwd: hexSha1(this.newEmail), // 修改邮箱验证密码
        phone: this.ruleForm.phone,
        newpasswd: newpasswd
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message({
            message: resp.data.msg,
            type: 'success'
          })
          this.dialogVisiblePwd = false
          if (newpasswd === '') {
            this.$router.push({
              path: '/administratorPanel/settings/set'
            })
          } else {
            loginOut({}).then(resp => {
              this.$router.push({
                path: '/dashbord'
              })
            })
          }
          if (Number(this.GetSellerId) === Number(this.$cookies.get('sellerid'))) {
            let name = this.ruleForm.firstname + this.ruleForm.lastname
            this.$store.commit('setHeaderName', name)
            this.$store.commit('setHeaderImg', this.ruleForm.head_img)
          }
          this.$cookies.set('think_var', this.value)
          this.$i18n.locale = this.value
        } else {
          this.$message(resp.data.msg)
        }
      })
    },
    // 保存
    saveAddUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.email !== this.oldEmail) {
            this.dialogVisiblePwd = true
          } else if (this.hidePwd === false) {
            this.dialogVisiblePwd = true
          } else {
            this.postEmail()
          }
        } else {
          this.$message(this.$t('userDetail.hint.text1'))
        }
      })
    }
  },
  created () {
    this.value = this.$i18n.locale
    Ulookinfo({
      sellerid: this.$cookies.get('sellerid')
    }).then(resp => {
      this.GetSellerId = resp.data.data.sellerid
      this.ruleForm = resp.data.data
      this.oldEmail = JSON.parse(JSON.stringify(resp.data.data.email))
    })
  }
}
</script>
<style lang="less">
@import "../../../common/css/elementCommon";
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.addSet-box {
  margin-top: 20px;
  border-top: 1px solid #e3e3e3;
  padding-top: 20px;
  .addSet-two-box {
    background-color: white;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
  }
}
.addSet-two-box-content {
  padding: 20px;
  border-bottom: 1px solid #e3e3e3;
}
.staffImg {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.userUpImg {
  margin: auto 20px;
  position: relative;
  > input {
    display: none;
  }
  > label {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
.content-padding {
  padding: 20px;
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
  }
}
</style>
