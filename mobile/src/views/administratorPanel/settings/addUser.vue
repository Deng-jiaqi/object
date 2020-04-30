<template>
  <div>
    <p class="add-black add-text-box" @click="backTop"><span class="el-icon-arrow-left"></span>
      <span>{{$t('addUser.header.back')}}</span></p>
    <div class="flexBetween">
      <h2 class="add-text-box">{{$t('addUser.header.title')}}</h2>
      <div></div>
    </div>
    <el-row class="addSet-box">
      <el-col :span="24">
        <div class="add-text-box">
          <h3>{{$t('addUser.content.text1')}}</h3>
          <p>{{$t('addUser.content.text2')}}</p>
        </div>
      </el-col>
      <el-col :span="24" class="addSet-two-box">
        <div class="set-two-right">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item :label="$t('addUser.content.label1')" prop="firstName">
                    <el-input v-model="ruleForm.firstName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$t('addUser.content.label2')" prop="lastName">
                    <el-input v-model="ruleForm.lastName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item :label="$t('addUser.content.label3')" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-form>
          <div class="add-footer">
            <el-checkbox v-model="jurisdiction" @change="handleCheckAllChange">{{$t('addUser.content.text3')}}
            </el-checkbox>
            <div>
              <h3>{{$t('addUser.content.text4')}}</h3>
              <div>
                <el-tree
                    :data="treeData"
                    show-checkbox
                    default-expand-all
                    node-key="Id"
                    ref="tree"
                    :props="defaultProps">
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="flexBetween set-twoBox">
      <div></div>
      <el-button type="primary" @click="SaveAddUser('ruleForm')" v-preventReClick="2000" v-loading="loading">
        {{$t('addUser.header.btn')}}
      </el-button>
    </div>
  </div>
</template>

<script>
import { Sshowprivilege, Sinvite } from '../../../common/api/api'
import { validateEMail, validateChLname, validateChFname } from '../../../common/validator'
import { EvalidateEMail, EvalidateChLname, EvalidateChFname } from '../../../common/enValidator'

export default {
  name: 'addUser',
  data () {
    return {
      jurisdiction: false, // 用户权限
      loading: false,
      ruleForm: {
        lastName: '', // 姓氏
        firstName: '', // 名字
        email: ''
      },
      rules: {
        email: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateEMail,
          trigger: 'blur'
        }] : [{ validator: validateEMail, trigger: 'blur' }],
        lastName: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateChLname,
          trigger: 'blur'
        }] : [{ validator: validateChLname, trigger: 'blur' }],
        firstName: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateChFname,
          trigger: 'blur'
        }] : [{ validator: validateChFname, trigger: 'blur' }]
      },
      treeData: [],
      defaultProps: {
        children: 'child',
        label: 'fun_name'
      }
    }
  },
  methods: {
    // 返回产品页面
    backTop () {
      this.$router.go(-1)
    },
    // 权限
    handleCheckAllChange (val) {
      if (this.jurisdiction) {
        this.$refs.tree.setCheckedNodes(this.treeData)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
    },
    // 发送邀请
    SaveAddUser (formName) {
      let judgeData
      if (this.jurisdiction === true) {
        judgeData = ['all']
      } else {
        judgeData = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          Sinvite({
            email: this.ruleForm.email,
            firstname: this.ruleForm.firstName,
            lastname: this.ruleForm.lastName,
            permission: judgeData
          }).then(resp => {
            this.loading = false
            if (resp.data.code === 1) {
              this.$message.success(resp.data.msg)
              this.$router.push({
                path: '/settings/userControl'
              })
            } else {
              this.loading = false
              this.$message(resp.data.msg)
            }
          }).catch(err => {
            this.$message(err)
          })
        }
      })
    }
  },
  created () {
    Sshowprivilege({}).then(resp => {
      this.$i18n.locale === 'en-us' ? this.defaultProps.label = 'en_fun_name' : this.defaultProps.label = 'fun_name'
      resp.data.data.forEach(val => {
        this.$set(val, 'checked', false)
        this.treeData.push(val)
      })
    })
  }
}
</script>

<style scoped lang="less">
  @import "../../../common/css/common";
  .addSet-box {
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid #e3e3e3;
    .addSet-two-box {
      background-color: white;
      border: 1px solid #e3e3e3;
      padding: 30px;
    }
  }
  .set-twoBox {
    border-top: 1px solid #e3e3e3;
    margin: 30px auto 50px auto;
    padding-top: 30px;
    padding-right: 10px;
    .set-two-right {
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      .flexBetween;
      padding: 30px;
      background-color: white;
    }
  }
  .add-footer {
    margin-top: 20px;
    padding-top: 30px;
    border-top: 1px solid #e3e3e3;
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
  .add-text-box{
    padding: 0 12px;
  }
</style>
