<template>
  <div>
    <p class="add-black" @click="backTop">
      <span class="el-icon-arrow-left"></span>
      <span>{{$t('userDetail.header.back')}}</span>
    </p>
    <div>
      <h2>{{headerTitle}}</h2>
    </div>
    <!--    // 账户信息-->
    <el-row class="addSet-box">
      <el-col :span="8">
        <h3>{{$t('userDetail.content.title')}}</h3>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-two-box">
        <div class="addSet-two-box-content">
          <h3>{{is_create === 1 ? $t('userDetail.content.text5') : $t('userDetail.content.text2')}}</h3>
          <div class="staffImg">
            <el-avatar
              :size="50"
              :src="ruleForm.head_img === ''
                              ? ruleForm.head_img = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                               :ruleForm.head_img"
              @error="errorHandler"
            ></el-avatar>
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
                    <el-input v-model="ruleForm.firstname">222222222222</el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('userDetail.content.label2')" prop="Lastname">
                    <el-input v-model="ruleForm.Lastname"></el-input>
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
        <div class="addSet-two-box-content">
          <el-form>
            <el-form-item>
              <h3>{{$t('userDetail.content2.title')}}</h3>
              <!-- 名字 -->
              <el-form-item :label="$t('userDetail.content2.label1')">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  :placeholder="$t('userDetail.content2.place1')"
                  v-model="ruleForm.profile"
                ></el-input>
              </el-form-item>
              <p class="userDetailText">{{$t('userDetail.content2.text2')}}</p>
            </el-form-item>
            <el-form-item :label="$t('userDetail.content2.label1')">
              <el-input v-model="ruleForm.website"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="addSet-two-box-content">
          <p>{{$t('userDetail.content2.text3')}}</p>
          <!-- <el-checkbox>{{$t('userDetail.content2.text4')}}</el-checkbox> -->
          <p>{{$t('userDetail.content2.text5')}}</p>
        </div>
        <div class="content-padding" v-if="userId === 'admin'">
          <p>{{$t('userDetail.content2.text6')}}</p>
          <p>{{$t('userDetail.content2.text7')}}</p>
          <el-button v-if="hidePwd" @click="hidePwd = false">{{$t('userDetail.content2.text8')}}</el-button>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-else>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('userDetail.content2.label2')" prop="pwd">
                  <el-input v-model="ruleForm.pwd" show-password></el-input>
                </el-form-item>
              </el-col>
              <!-- 修改密码 -->
              <el-col :span="12">
                <el-form-item :label="$t('userDetail.content2.label3')" prop="newpasswd">
                  <el-input v-model="ruleForm.newpasswd" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-else class="content-padding">
          <p>{{$t('userDetail.content2.text9')}}</p>
          <p>
            {{$t('userDetail.content2.text10')}}
            <span>{{oldEmail}}</span>
            {{$t('userDetail.content2.text11')}}
          </p>
          <el-button>{{$t('userDetail.content2.btn')}}</el-button>
        </div>
      </el-col>
    </el-row>
    <!--    // 语言设置-->
    <el-row class="addSet-box" v-if="userId === 'admin'">
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
    <!--    // 后台访问权限-->
    <el-row class="addSet-box" v-if="userId !== 'admin'">
      <el-col :span="8">
        <h3>{{$t('userDetail.content3.title')}}</h3>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-two-box">
        <el-row class="content-padding">
          <h3>{{$t('userDetail.content3.text1')}}</h3>
          <p>{{$t('userDetail.content3.text2')}}</p>
          <el-checkbox
            v-model="jurisdiction"
            @change="handleCheckAllChange"
          >{{$t('userDetail.content3.text3')}}</el-checkbox>
          <h3>{{$t('userDetail.content3.text4')}}</h3>
          <div>
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="Id"
              default-expand-all
              :highlight-current="true"
              ref="tree"
              :props="defaultProps"
            ></el-tree>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!--    // 删除员工账户或者暂停员工账户-->
    <el-row class="addSet-box" v-if="userId !== 'admin'">
      <el-col :span="8">
        <h3>{{$t('userDetail.content4.title')}}</h3>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="15" class="addSet-three-box">
        <el-row class="content-padding" v-if="status !== -1">
          <h3>{{judgePus === true ? textArea[0].text1 : textArea[1].text1}}</h3>
          <p>{{judgePus === true ? textArea[0].text2 : textArea[1].text2}}</p>
          <el-button @click="setPause">{{judgePus === true ? textArea[0].btn : textArea[1].btn}}</el-button>
        </el-row>
        <el-row class="content-padding rightControl">
          <h3>{{$t('userDetail.content4.text1')}} {{headerTitle}}</h3>
          <p>{{$t('userDetail.content4.text2')}}</p>
          <el-button type="danger" @click="dialogVisibleDelStaff = true">
            {{$t('userDetail.content4.text3')}}
            {{headerTitle}}
          </el-button>
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
    <!--    暂停员工-->
    <el-dialog
      :title="$t('userDetail.elDialogStaff.title')"
      :visible.sync="dialogVisiblePause"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="diaBox">
        <p>{{$t('userDetail.elDialogStaff.text1')}} {{headerTitle}} {{$t('userDetail.elDialogStaff.text2')}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePause = false">{{$t('userDetail.elDialogStaff.btn1')}}</el-button>
        <el-button
          type="primary"
          @click="savePause"
          v-preventReClick="2000"
        >{{$t('userDetail.elDialogStaff.btn2')}}</el-button>
      </span>
    </el-dialog>
    <!--    删除员工/撤销员工-->
    <el-dialog
      :title="$t('userDetail.elDialogDel.title')"
      :visible.sync="dialogVisibleDelStaff"
      :close-on-click-modal="false"
      width="40%"
    >
      <div class="diaBox">
        <p>
          {{$t('userDetail.elDialogDel.text1')}}
          <span>{{headerTitle}}</span>
          {{$t('userDetail.elDialogDel.text2')}}
        </p>
        <p>{{$t('userDetail.elDialogDel.text3')}}</p>
        <el-input v-model="passwd" show-password></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="offStaff">{{$t('userDetail.elDialogDel.btn1')}}</el-button>
        <el-button
          type="primary"
          @click="delStaff"
          v-preventReClick="2000"
        >{{$t('userDetail.elDialogDel.btn2')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { hexSha1 } from '../../../utils/encryption'
import { Ulookinfo, Uupdateinfo, Sshowprivilege, Uhandleaccess, Udeletestaff, loginOut } from '../../../common/api/api'
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
      options: [{
        value: 'zh-cn',
        label: '中文'
      }, {
        value: 'en-us',
        label: 'English'
      }],
      value: '',
      is_create: 1, //  用来判断是管理者还是员工  管理者1 员工0
      passwd: '', // 店铺密码
      textArea: [],
      judgePus: true, // 判断暂停员工还是激活
      status: -1, // 判断是否用邮箱注册过
      headerTitle: '',
      function_id: '', // 员工权限
      userId: '', // 判断跳转进来id是员工还是账户所有者
      hidePwd: true, // 重置密码btn
      newEmail: '', // 新邮箱
      oldEmail: '', // 旧邮箱
      dialogVisiblePwd: false, // 判断邮箱是否改变
      dialogVisiblePause: false, // 暂停员工
      dialogVisibleDelStaff: false, // 删除员工
      jurisdiction: false, // 权限
      ruleForm: {
        head_img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        firstname: '',
        Lastname: '',
        email: '',
        phone: '',
        profile: '',
        website: '',
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
        Lastname: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateChLname,
          trigger: 'blur'
        }] : [{ validator: validateChLname, trigger: 'blur' }],
        pwd: [{ validator: validatePass, trigger: 'blur' }],
        newpasswd: [{ validator: validatePass2, trigger: 'blur' }]

      },
      treeData: [], // 树形权限数据
      checkedKeys: [], // 获取
      defaultProps: { // 渲染数据格式
        children: 'child',
        label: 'fun_name'
      },
      GetSellerId: 1 // 获取当前id
    }
  },
  methods: {
    // 返回产品页面
    backTop () {
      this.$router.go(-1)
    },
    handleCheckAllChange (val) {
      if (this.jurisdiction) {
        this.$refs.tree.setCheckedNodes(this.treeData)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
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
    // 暂停员工账户or激活员工账户
    setPause () {
      if (this.judgePus === true) {
        this.dialogVisiblePause = true
      } else {
        Uhandleaccess({
          sellerid: this.$route.query.sellerid,
          type: 1
        }).then(resp => {
          if (resp.data.code === 1) {
            this.judgePus = true
            this.$message({
              type: 'success',
              message: resp.data.msg
            })
          }
        })
      }
    },
    // 确定暂停员工
    savePause () {
      Uhandleaccess({
        sellerid: this.$route.query.sellerid,
        type: 0
      }).then(resp => {
        if (resp.data.code === 1) {
          this.dialogVisiblePause = false
          this.judgePus = false
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
    },
    // 保存账户所有者修改的账户邮箱
    saveEmail () {
      let newpasswd
      let permission
      this.hidePwd === false ? newpasswd = hexSha1(this.ruleForm.newpasswd) : newpasswd = ''
      this.is_create === 1 ? permission = ['all'] : permission = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      Uupdateinfo({
        sellerid: this.$route.query.sellerid,
        before_email: this.oldEmail,
        after_email: this.ruleForm.email,
        lastname: this.ruleForm.Lastname,
        firstname: this.ruleForm.firstname,
        head_img: this.ruleForm.head_img,
        passwd: hexSha1(this.newEmail), // 修改邮箱验证密码
        phone: this.ruleForm.phone,
        profile: this.ruleForm.profile,
        newpasswd: newpasswd,
        permission: permission,
        website: this.ruleForm.website
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message({
            message: resp.data.msg,
            type: 'success'
          })
          this.dialogVisiblePwd = false
          if (newpasswd === '') {
            this.$router.push({
              path: '/settings/userControl'
            })
          } else {
            loginOut({}).then(resp => {
              this.$router.push({
                path: '/dashbord'
              })
            })
          }
          if (Number(this.GetSellerId) === Number(this.$cookies.get('sellerid'))) {
            let name = this.ruleForm.firstname + this.ruleForm.Lastname
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
    // 请求修改邮箱
    postEmail () {
      let funId = []
      if (this.userId === 'admin') {
        funId = ['all']
      } else if (this.function_id === ['all']) {
        funId = ['all']
      } else {
        funId = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      }
      Uupdateinfo({
        sellerid: this.$route.query.sellerid,
        before_email: this.ruleForm.email,
        after_email: this.newEmail,
        lastname: this.ruleForm.Lastname,
        firstname: this.ruleForm.firstname,
        head_img: this.ruleForm.head_img,
        phone: this.ruleForm.phone,
        profile: this.ruleForm.profile,
        newpasswd: this.ruleForm.newpasswd,
        permission: funId,
        website: this.ruleForm.website
      }).then(resp => {
        if (resp.data.code === 1) {
          this.$message.success(resp.data.msg)
          this.$router.push({
            path: '/settings/userControl'
          })
          if (Number(this.GetSellerId) === Number(this.$cookies.get('sellerid'))) {
            let name = this.ruleForm.firstname + this.ruleForm.Lastname
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
    },
    // 确定删除员工账户
    delStaff () {
      Udeletestaff({
        sellerid: this.$route.query.sellerid,
        passwd: hexSha1(this.passwd)
      }).then(resp => {
        if (resp.data.code === 0) {
          this.$message(resp.data.msg)
        } else {
          this.$message({
            type: 'success',
            message: resp.data.msg
          })
          this.$router.push({
            path: '/settings/userControl'
          })
          this.dialogVisibleDelStaff = false
        }
      })
    },
    // 取消密码
    offStaff () {
      this.dialogVisibleDelStaff = false
      this.passwd = ''
    }
  },
  created () {
    this.value = this.$i18n.locale
    this.textArea = this.$t('userDetail.textArea')
    this.userId = this.$route.query.id
    Ulookinfo({
      sellerid: this.$route.query.sellerid
    }).then(resp => {
      this.GetSellerId = resp.data.data.sellerid
      this.is_create = resp.data.data.is_create
      Sshowprivilege({}).then(data => {
        data.data.data.forEach(val => {
          this.$set(val, 'checked', false)
          this.treeData.push(val)
        })
        if (this.userId !== 'admin') {
          this.$i18n.locale === 'en-us' ? this.defaultProps.label = 'en_fun_name' : this.defaultProps.label = 'fun_name'
          this.function_id = resp.data.data.function_id
          if (this.function_id.length === 14 || this.function_id[0] === 'all') {
            this.jurisdiction = true
            this.$nextTick(function () {
              this.$refs.tree.setCheckedKeys(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'])
            })
          } else {
            this.$nextTick(function () {
              resp.data.data.function_id.forEach(item => {
                this.$refs.tree.setChecked(item, true)
              })
            })
          }
        }
      })
      this.ruleForm.Lastname = resp.data.data.lastname
      this.ruleForm.firstname = resp.data.data.firstname
      this.ruleForm.head_img = resp.data.data.head_img
      this.ruleForm.email = resp.data.data.email
      this.oldEmail = JSON.parse(JSON.stringify(resp.data.data.email))
      this.ruleForm.phone = resp.data.data.phone
      this.ruleForm.profile = resp.data.data.profile
      this.ruleForm.website = resp.data.data.website
      this.status = resp.data.data.status
      resp.data.data.type === 0 ? this.judgePus = true : this.judgePus = false // 判断员工激活状态
      this.headerTitle = JSON.parse(JSON.stringify(this.ruleForm.firstname)) + JSON.parse(JSON.stringify(this.ruleForm.Lastname))
    })
  }
}
</script>
<style lang="less">
@import "../../../common/css/elementCommon";
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.userVerify {
  border-top: 1px solid #e3e3e3;
  padding-top: 30px;
  > div {
    padding: 30px 20px 35px 44px;
    border: 1px solid #e3e3e3;
    background-color: white;
    border-radius: 4px;
  }
  > div:nth-child(2) {
    margin-top: 20px;
  }
  > div:hover {
    background-color: #eef9f9;
  }
}
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
.checkCol {
  display: flex;
  flex-direction: column;
  > label:nth-child(1) {
    margin-top: 0;
  }
  > label {
    margin-top: 30px;
  }
}
.userDetailText {
  margin: 0;
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
.addSet-three-box {
  > div {
    border: 1px solid #e3e3e3;
    background-color: white;
    border-radius: 4px;
  }
  .rightControl {
    margin-top: 30px;
  }
}
</style>
