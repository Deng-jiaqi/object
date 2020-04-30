<template>
  <div class="productDetails">
    <el-backtop :bottom="60"></el-backtop>
    <div class="productDetails-header">
      <h1 class="header-h1">{{$t('addProductLine.header.title')}}</h1>
      <p class="add-black" @click="backTop"><span class="el-icon-arrow-left"></span>{{$t('addProductLine.header.back')}}</p>
    </div>
    <div class="productDetails-form">
      <el-form :model="ruleForm" :rules="rules" validate-on-rule-change ref="ruleForm" class="add-form">
        <!--        产品名称-->
        <el-form-item prop="goodsname" :error="errorMsg">
          <div class="add-name" id="addGoodsName">
            <p class="productDetails-text">{{$t('addProductLine.content.text1')}}</p>
            <el-input type="text" class="product-input" v-model="ruleForm.goodsname"/>
          </div>
        </el-form-item>
        <!--        产品描述，富文本编辑-->
        <el-form-item>
          <p class="productDetails-text">{{$t('addProductLine.content.text2')}}</p>
          <div class="edit_container">
            <!--富文本编辑器组件-->
            <quill-editor
              v-model="content"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)">
            </quill-editor>
            <span class="SizeTiShi">{{ TiLength}}/800</span>
          </div>
        </el-form-item>
        <!--        产品图片上传-->
        <el-form-item>
          <div class="add-img">
            <div class="addUp-box">
              <p class="productDetails-text">{{$t('addProductLine.content.title1')}}</p>
            </div>
            <div class="imgBox">
              <div class="img-files" style="text-align: center" v-if="imgs.length < 1">
                <div>
                  <img src="../../../assets/addShop/imgdiushi.png" alt="">
                </div>
                <div class="img-file">
                  <input type="file" id='files' @change='fileChange($event, 1)'
                         ref="FileValue">
                  <label for="files" style="color: #4267B2;cursor: pointer">{{$t('addProductLine.content.text3')}}</label>
                </div>
              </div>
              <div class="upImgBox" v-else>
                <el-popover
                  visible-arrow="false"
                  placement="bottom"
                  trigger="click">
                  <ul class="locationlistCss">
                    <li>
                      <input type="file" @change='fileChange($event, 2)'>
                      <span>{{$t('addProductLine.content.text4')}}</span>
                    </li>
                    <li @click="bjImg">{{$t('addProductLine.content.text5')}}</li>
                    <li @click="delImgs">{{$t('addProductLine.content.text6')}}</li>
                  </ul>
                  <span slot="reference" class="bjCss">{{$t('addProductLine.content.text7')}}</span>
                </el-popover>
                <div class="upImg" @click="dialogVisibleEditImg = true">
                  <img :src="imgs[0].data" alt="">
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <!--        产品自动和手动选择-->
        <el-form-item>
          <p class="productDetails-text">{{$t('addProductLine.content.span1')}}</p>
          <div class="add-type">
            <el-form-item>
              <el-radio v-model="radio" label="0" class="radioCss">{{$t('addProductLine.content.span2')}}</el-radio>
              <p class="proCaoZuo">{{$t('addProductLine.content.span3')}}
                <el-link>{{$t('addProductLine.content.span4')}}</el-link>
              </p>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="radio" label="1" class="radioCss">{{$t('addProductLine.content.span5')}}</el-radio>
              <p class="proCaoZuo">{{$t('addProductLine.content.span6')}}
                <el-link>{{$t('addProductLine.content.span7')}}</el-link>
              </p>
            </el-form-item>
          </div>
          <div v-if="radio !== '0'">
            <p class="productDetails-text">{{$t('addProductLine.content.span8')}}</p>
            <p>{{$t('addProductLine.content.span9')}}
              <el-radio v-model="radioTwo" label="0" class="radioCss">{{$t('addProductLine.content.span10')}}</el-radio>
              <el-radio v-model="radioTwo" label="1" class="radioCss">{{$t('addProductLine.content.span11')}}</el-radio>
            </p>
            <div class="addIf">
              <div class="addIfBox" v-for="(item, index) in ifData" :key="index">
                <div class="addIf-box">
                  <div>
                    <el-select v-model="item.mulTitle" @change="getmulTitle($event, item.judgemenToptions, item)"
                               :placeholder="$t('addProductLine.content.place1')">
                      <el-option
                        v-for="data in item.titleOptions"
                        :key="data.value"
                        :label="data.label"
                        :value="data.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-select v-model="item.mulJudgement" @change="getJudgement($event, item)" placeholder="请选择">
                      <el-option
                        v-for="val in item.judgemenToptions"
                        :key="val.value"
                        :label="val.label"
                        :disabled="val.disabled"
                        :value="val.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-input v-model="item.mulValue" @blur="blurValue(item)"></el-input>
                  </div>
                  <div v-if="ifData.length>1" @click="delIf(index)">
                    <i class="el-icon-delete" style="font-size: 20px"></i>
                  </div>
                </div>
                <div v-if="item.hintTitle" class="tiShiCss">
                  <p><i class="el-icon-warning"></i>
                    {{$t('addProductLine.content.span12')}}
                    <span>{{item.TitleTiShi}}</span><span>{{item.JudgeTiShi}}</span>
                    {{$t('addProductLine.content.span13')}}
                  </p>
                </div>
              </div>
              <div class="addIf-btn">
                <el-button @click="addOtherIf">{{$t('addProductLine.content.btn1')}}</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="btnCss">
        <el-button @click="saveForm('ruleForm')" v-preventReClick="2000">{{$t('addProductLine.content.btn2')}}</el-button>
      </div>
    </div>
    <!--    编辑图片替换文字-->
    <el-dialog
      :title="$t('addProductLine.elDialogImg.title')"
      :visible.sync="dialogVisibleEditImg"
      width="40%">
      <el-row>
        <el-col :span="11">
          <div class="editImgCss" v-if="imgs.length > 0">
            <input type="file" @change="fileChange($event, 2)">
            <img :src=imgs[0].data alt="">
          </div>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <p>{{$t('addProductLine.elDialogImg.text1')}}</p>
          <el-input v-model="imgTitle"></el-input>
          <p>$t('addProductLine.elDialogImg.text2')</p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleEditImg = false">{{$t('addProductLine.elDialogImg.btn1')}}</el-button>
    <el-button class="blueBtn"
               @click="dialogVisibleEditImg = false"
               v-preventReClick="2000">{{$t('addProductLine.elDialogImg.btn2')}}</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { Xadd } from '../../../common/api/api'
import { validateValue } from '../../../common/validator'
import { EvalidateValue } from '../../../common/enValidator'
export default {
  name: 'addProductLine',
  inject: ['reload'],
  data () {
    return {
      errorMsg: '',
      ifData: [], // 条件数据
      radio: '0', // 手动 or 自动 单选
      radioTwo: '0', // 所有条件 or 任何条件 单选
      imgTitle: '', // 图片替换文字input值
      dialogVisibleEditImg: false, // 编辑图片替换文字模态框状态
      goodsGetName: '', // 产品的名称
      ruleForm: {
        goodsname: '' // 产品名称
      }, // form表单数据
      content: ``, // 富文本内容
      editorOption: { theme: 'snow' }, // 富文本框样式
      rules: {
        goodsname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateValue, trigger: 'blur' }] : [{ validator: validateValue, trigger: 'blur' }]
      },
      TiLength: 0, // 显示富文本输入数量
      imgfiles: [], // 图片原文件，上传到后台的数据
      imgs: [], // 图片预览地址
      getNowOptions: null // 获取当前judgemenToptions的状态
    }
  },
  methods: {
    // 返回所有产品页面/ 返回上一层
    backTop () {
      this.$router.go(-1)
    },
    // 循环改变选中状态
    forData () {
      this.getNowOptions.forEach(val => {
        val.disabled = false
      })
    },
    // 获取当前选择的标签值
    getmulTitle (e, item, data) {
      this.getNowOptions = item
      data.hintTitle = false
      if (e === '1') {
        this.forData()
        data.mulJudgement = '7'
        item[2].disabled = true
        item[3].disabled = true
      } else if (e === '4') {
        this.forData()
        data.mulJudgement = '3'
        item[4].disabled = true
        item[5].disabled = true
        item[6].disabled = true
        item[7].disabled = true
      } else if (e === '6') {
        this.forData()
        data.mulJudgement = '3'
        item[4].disabled = true
        item[5].disabled = true
        item[6].disabled = true
        item[7].disabled = true
      } else if (e === '7') {
        this.forData()
        data.mulJudgement = '3'
        item[4].disabled = true
        item[5].disabled = true
        item[6].disabled = true
        item[7].disabled = true
      } else if (e === '8') {
        this.forData()
        data.mulJudgement = '3'
        item[1].disabled = true
        item[4].disabled = true
        item[5].disabled = true
        item[6].disabled = true
        item[7].disabled = true
      } else {
        this.forData()
        data.mulJudgement = '7'
        item[2].disabled = true
        item[3].disabled = true
      }
    },
    // 获取当前选择的判断值
    getJudgement (e, item) {
      item.hintTitle = false
    },
    // 条件的input失焦事件
    blurValue (item) {
      if (item.mulValue === '') {
        item.titleOptions.forEach(val => {
          if (item.mulTitle === val.value) {
            item.TitleTiShi = val.label
          }
        })
        item.judgemenToptions.forEach(val => {
          if (item.mulJudgement === val.value) {
            item.JudgeTiShi = val.label
          }
        })
        item.hintTitle = true
      } else {
        item.hintTitle = false
      }
    },
    // 添加其它条件
    addOtherIf () {
      let obj = JSON.parse(JSON.stringify(this.$t('addProductLine.ifData[0]')))
      this.ifData.push(obj)
    },
    // 删除条件
    delIf (index) {
      this.ifData.splice(index, 1)
    },
    // 富文本内容改变事件
    onEditorChange (event) {
      event.quill.deleteText(800, 4)
      if (this.content === '') {
        this.TiLength = 0
      } else {
        this.TiLength = event.quill.getLength() - 1
      }
    },
    // 加入图片
    fileChange (e, num) {
      var _this = this
      var file = e.target.files
      var leng = file.length
      for (let i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        _this.imgfiles.push(file[i])
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          if (num === 1) {
            let obj = { data: e.target.result }
            _this.imgs.push(obj)
          } else {
            _this.imgs = []
            let obj = { data: e.target.result }
            _this.imgs.push(obj)
          }
        }
      }
    },
    // 编辑图片添加文字信息
    bjImg () {
      this.dialogVisibleEditImg = true
    },
    // 删除当前产品系列图片
    delImgs () {
      this.imgs = []
    },
    // 保存
    saveForm (formName) {
      let Arr = []
      let condition
      let judge = true // 判断是否输入完整
      for (let v of this.ifData) {
        if (v.mulValue === '') {
          judge = false
          break
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) { // 判断是否输入产品系列名称
          if (judge === true || this.radio === '0') { // 判断是否将自动条件输入完整
            if (this.radio === '1') {
              this.ifData.forEach(item => {
                let arr = [item.mulTitle + '-' + item.mulJudgement + '-' + item.mulValue]
                Arr.push(arr)
              })
              condition = Arr.join(',').split(',')
            } else {
              condition = []
            }
            let img
            this.imgs[0] ? img = this.imgs[0].data : img = ''
            Xadd({
              name: this.ruleForm.goodsname, // 产品系列名称
              content: this.content, // 产品系列描述
              image: img, // 产品系列图片
              type: this.radio, // 产品系列类型(0.手动,1.自动)
              auto_type: this.radioTwo, // 自动产品系列对应的条件(0.所有条件,1.任何条件)
              condition: condition // 自动产品系列对应的条件(包含多个条件)
            }).then(resp => {
              if (resp.data.code === 1) {
                this.$message.success(resp.data.msg)
                this.$router.push({
                  path: '/administratorPanel/productInventory/productLine'
                })
              } else {
                if (resp.data.msg === '该名称已存在' || resp.data.msg === 'The name already exists') {
                  this.errorMsg = resp.data.msg
                  this.$message(resp.data.msg)
                  document.getElementById('addGoodsName').scrollIntoView()
                } else {
                  this.$message.error(resp.data.msg)
                }
              }
            })
          } else {
            this.$message.error(this.$t('addProductLine.hint.text2'))
          }
        } else {
          this.$message.error(this.$t('addProductLine.hint.text1'))
        }
      })
    }
  },
  created () {
    this.ifData = JSON.parse(JSON.stringify(this.$t('addProductLine.ifData')))
  }
}
</script>
<style lang="less">
  .add-type {
    .el-form-item__content {
      line-height: 22px;
    }
  }
  .product-input {
    .el-input__inner {
      height: 50px;
      background: rgba(251, 250, 250, 1);
      border: 1px solid rgb(227, 227, 227);
      border-radius: 4px;
    }
    .el-input__inner:focus {
      border: 2px solid #4267B2;
      outline: none;
      border-radius: 4px;
    }
  }
  .radioCss {
    > span:nth-child(2) {
      color: black;
    }
  }
  .quill-editor {
    > .ql-container {
      outline: none;
      border-radius: 4px;
    }
    .ql-container {
      height: 330px;
      border: 1px solid #e3e3e3;
    }
    .ql-snow {
      border: 1px solid #e3e3e3;
    }
  }
  .selectOption {
    width: 100%;
    > div {
      > input {
        color: black;
      }
    }
  }
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  #files {
    display: none;
  }
  input[type=file] {
    cursor: pointer;
  }
  .edit_container {
    position: relative;
    background-color: rgba(251, 250, 250, 1);
  }
  .flexBetween {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flexCss {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .productDetails {
    background-color: #f5f6f8;
    margin: auto;
    .productDetails-header {
      .flexBetween;
      padding: 0 8px;
      height: 120px;
    }
  }
  .productDetails-form {
    border-radius: 8px;
    .add-form {
      background-color: white;
      padding: 10px 8px;
      border-radius: 8px;
      overflow: hidden;
    }
    .productDetails-text {
      font-size: 18px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 14px;
    }
    .add-img {
      position: relative;
    }
  }
  .SizeTiShi {
    position: absolute;
    right: 20px;
    bottom: 10px;
  }
  .imgBox {
    position: relative;
    height: 266px;
    background: rgba(251, 250, 250, 1);
    border: 1px solid #e3e3e3;
    .flexCss;
  }
  .imgBoxCss {
    .flexCss;
    width: 60px;
    height: 40px;
    background: rosybrown;
    > img {
      height: 100%;
      width: 100%;
    }
  }
  .btnCss {
    margin: 50px auto 50px auto;
    width: 140px;
    > button {
      width: 90px;
      height: 46px;
      background: rgba(66, 103, 178, 1);
      border-radius: 4px;
      color: white;
    }
  }
  .proCaoZuo {
    margin-left: 24px;
    > a {
      line-height: 1;
    }
  }
  .addIf {
    .addIfBox {
      padding-bottom: 12px;
      margin-top: 14px;
      border-bottom: 1px solid #ededed;
    }
    .addIf-box {
      .flexBetween;
      > div:nth-child(2) {
        margin: 0 20px;
      }
    }
    .addIf-btn {
      margin-top: 20px;
    }
  }
  .tiShiCss {
    color: red;
    > p {
      margin: 0;
    }
  }
  .upImg {
    cursor: pointer;
    .imgBoxCss;
    width: 240px;
    height: 240px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(210, 210, 210, 1);
  }
  .upImgBox {
    .bjCss {
      position: absolute;
      right: 20px;
      top: 10px;
      color: rgba(81, 123, 194, 1);
      cursor: pointer;
    }
  }
  .locationlistCss {
    > li:nth-child(1) {
      position: relative;
      > input {
        position: absolute;
        width: 150px;
        top: 4px;
        opacity: 0;
        left: 0;
      }
    }
    > li {
      text-align: center;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
    }
    > li:last-child {
      color: red;
    }
    li:hover {
      background-color: #5c6ac4;
      color: white;
    }
  }
  .editImgCss {
    .upImg;
    width: 140px;
    height: 140px;
    position: relative;
    > input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .add-black {
    color: #4267B2;
    font-size: 18px;
    cursor: pointer;
  }
  .blueBtn {
    background-color: #4267B2;
    color: white;
  }
</style>
