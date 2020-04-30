<template>
  <div class="productDetails">
    <el-backtop :bottom="60"></el-backtop>
    <div class="productDetails-header">
      <h1 class="header-h1">{{detailTitle}}</h1>
      <p class="add-black" @click="backTop"><span class="el-icon-arrow-left"></span>{{$t('productLineDetail.header.back')}}</p>
    </div>
    <div class="productDetails-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="add-form">
        <!--        产品名称-->
        <el-form-item prop="goodsname">
          <div class="add-name">
            <p class="productDetails-text">{{$t('productLineDetail.content.text1')}}</p>
            <el-input type="text" class="product-input" v-model="ruleForm.goodsname" />
          </div>
        </el-form-item>
        <!--        产品描述，富文本编辑-->
        <el-form-item>
          <p class="productDetails-text">{{$t('productLineDetail.content.text2')}}</p>
          <div class="edit_container">
            <el-upload
                class="avatar-uploader"
                :action="serverUrl"
                name="img"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError">
            </el-upload>
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
              <p class="productDetails-text">{{$t('productLineDetail.content.title1')}}</p>
            </div>
            <div class="imgBox">
              <div class="img-files" style="text-align: center" v-if="imgs.length < 1">
                <div>
                  <img src="../../../assets/addShop/imgdiushi.png" alt="">
                </div>
                <div class="img-file">
                  <input type="file" id='files' @change='fileChange($event, 1)'
                         ref="FileValue">
                  <label for="files" style="color: #4267B2;cursor: pointer">{{$t('productLineDetail.content.text3')}}</label>
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
                      <span>{{$t('productLineDetail.content.text4')}}</span>
                    </li>
                    <li @click="bjImg">{{$t('productLineDetail.content.text5')}}</li>
                    <li @click="delImgs">{{$t('productLineDetail.content.text6')}}</li>
                  </ul>
                  <span slot="reference" class="bjCss">{{$t('productLineDetail.content.text7')}}</span>
                </el-popover>
                <div class="upImg" @click="dialogVisibleEditImg = true">
                  <img :src="imgs[0].data" alt="">
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <!--        产品搜索和排序-->
        <el-form-item>
          <p class="productDetails-text">{{$t('productLineDetail.content.text8')}}</p>
          <el-row>
            <el-col :span="12">
              <el-input class="liuLanInput" :placeholder="$t('productLineDetail.content.place1')" @input="seacherPro" v-model="seachProOne">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <el-button slot="append" @click="ClickLiuLan">{{$t('productLineDetail.content.btn1')}}</el-button>
              </el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-select v-model="value" :placeholder="$t('productLineDetail.content.place2')" class="selectOption" @change="selectOrder($event)">
                <el-option
                    v-for="item in $t('productLineDetail.options')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="proList-box" v-if="goodsData.length > 0">
            <ul class="proList-box-ul">
              <li v-for="(item, index) in goodsData" :key="index">
                <div>
                  <span>{{item.num}}. &nbsp;&nbsp;</span>
                  <div>
                    <img :src="item.imgs" alt="">
                  </div>
                  <p>&nbsp;&nbsp;{{item.goodsname}}</p>
                </div>
                <div><span class="el-icon-close" style="font-size: 24px; cursor: pointer" @click="delGoods(index)"></span></div>
              </li>
            </ul>
          </div>
          <div class="flexCss" v-else>
            <div class="tiShiCss">
              <img src="../../../assets/addShop/noPro.png" alt="">
              <p>{{$t('productLineDetail.content.text9')}}</p>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="btnCss">
        <el-button type="danger" @click="delProX">{{$t('productLineDetail.content.text10')}}</el-button>
        <el-button @click="saveGoods('ruleForm')" v-preventReClick="2000">{{$t('productLineDetail.content.text11')}}</el-button>
      </div>
    </div>
    <!--    产品浏览-->
    <el-dialog
        :title="$t('productLineDetail.elDialogPro.title')"
        :visible.sync="dialogVisible"
        width="40%">
      <div>
        <el-input :placeholder="$t('productLineDetail.elDialogPro.place')" v-model="seachProTwo">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="liuLan-box" v-if="liuLanData.length > 0">
        <ul>
          <li v-for="(item, index) in liuLanData" :key="index"  @click="checkClick(item)">
            <el-checkbox v-model="item.select" @click.stop.native></el-checkbox>
            &nbsp;&nbsp;
            <div>
              <img :src="item.imgs" alt="">
            </div>
            <p>&nbsp;&nbsp;{{item.goodsname}}</p>
          </li>
        </ul>
      </div>
      <p v-if="liuLanData.length < 1">
        {{$t('productLineDetail.elDialogPro.text1')}}
        {{seachProTwo}}{{$t('productLineDetail.elDialogPro.text2')}}</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">{{$t('productLineDetail.elDialogPro.btn1')}}</el-button>
    <el-button class="blueBtn" @click="saveEdit">{{$t('productLineDetail.elDialogPro.btn2')}}</el-button>
    </span>
    </el-dialog>
    <!--    编辑图片替换文字-->
    <el-dialog
        :title="$t('productLineDetail.elDialogImg.title')"
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
          <p>{{$t('productLineDetail.elDialogImg.text1')}}</p>
          <el-input type="text" v-model="imgTitle"></el-input>
          <p>{{$t('productLineDetail.elDialogImg.text2')}}</p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="offImg">{{$t('productLineDetail.elDialogImg.btn1')}}</el-button>
    <el-button class="blueBtn" @click="dialogVisibleEditImg = false" v-preventReClick="2000">{{$t('productLineDetail.elDialogImg.btn2')}}</el-button>
    </span>
    </el-dialog>
    <!--    删除位置-->
    <el-dialog
        :title="$t('productLineDetail.elDialogDel.title1') + detailTitle + $t('productLineDetail.elDialogDel.title2')"
        :visible.sync="dialogVisibleDel"
        :close-on-click-modal="false"
        width="40%">
      <div class="diaBox">
        <p>{{$t('productLineDetail.elDialogDel.text1')}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleDel = false">{{$t('productLineDetail.elDialogDel.btn1')}}</el-button>
      <el-button type="danger" @click="delCosite">{{$t('productLineDetail.elDialogDel.btn2')}}</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { Xshowdetail, Xsavedetail, Xgoodsorder, Xdetaildelete } from '../../../common/api/api'
import { validateValue } from '../../../common/validator'
import { EvalidateValue } from '../../../common/enValidator'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['link', 'image'],
  ['clean']
]
export default {
  name: 'productLineDetail',
  data () {
    return {
      serverUrl: '/Shop/public/index.php/Product/Goods/uploadeditimg', // 这里写你要上传的图片服务器地址
      timer: '', // 定时器
      detailTitle: '', // 头部标题
      seachProOne: '', // 搜索产品系列下面的产品
      seachProTwo: '', // 搜索产品系列下面的产品
      goodsData: [], // 显示产品系列  列表已有的
      liuLanData: [], // 浏览显示所有产品的信息
      checkValue: false, // 浏览产品checkbox选中状态
      dialogVisible: false, // 浏览产品模态框状态
      dialogVisibleEditImg: false, // 编辑图片替换文字模态框状态
      dialogVisibleDel: false, // 删除产品系列
      imgTitle: '', // 图片替换文字input值
      options: [],
      value: 'LA',
      goodsGetName: '', // 产品的名称
      ruleForm: {
        goodsname: '' // 产品名称
      },
      content: ``, // 富文本内容
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      rules: {
        goodsname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateValue, trigger: 'blur' }] : [{ validator: validateValue, trigger: 'blur' }]
      },
      TiLength: 0, // 显示富文本输入数量
      imgfiles: [], // 图片原文件，上传到后台的数据
      imgs: [], // 图片预览地址
      num: 1
    }
  },
  methods: {
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      if (res.code === 1) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 富文本图片上传失败
    uploadError () {
      this.$message.error('图片插入失败')
    },
    // 返回所有产品页面/ 返回上一层
    backTop () {
      this.$router.go(-1)
    },
    // 取消图片替换文字
    offImg () {
      this.dialogVisibleEditImg = false
    },
    // 排序
    selectOrder (value) {
      this.num = 1
      if (this.goodsData.length > 0) {
        let arrid = []
        this.goodsData.forEach(val => {
          arrid.push(val.Id)
        })
        Xgoodsorder({
          productids: arrid,
          collectid: this.$route.query.id,
          order: value
        }).then(resp => {
          this.goodsData = resp.data.data
          this.goodsData.forEach(val => {
            this.$set(val, 'num', this.num++)
          })
        })
      }
    },
    // 请求页面数据
    getData () {
      this.num = 1
      Xshowdetail({ collectid: this.$route.query.id, goodsname: this.seachProTwo }).then(resp => {
        this.content = resp.data.data.content
        this.ruleForm.goodsname = resp.data.data.name
        this.detailTitle = JSON.parse(JSON.stringify(resp.data.data.name))
        if (resp.data.data.img === '') {
          this.imgs = []
        } else {
          let obj = { data: resp.data.data.img }
          this.imgs[0] = obj
        }
        this.goodsData = resp.data.data.select_goods
        this.goodsData.forEach(val => {
          this.$set(val, 'num', this.num++)
        })
        this.liuLanData = resp.data.data.all_goods
      })
    },
    // 搜索产品系列里面的产品
    seacherPro () {
      this.dialogVisible = true
      // this.$set()
      this.seachProTwo = this.seachProOne
      this.seachProOne = ''
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
    bjImg () {
      this.dialogVisibleEditImg = true
    },
    // 删除当前产品系列图片
    delImgs () {
      this.imgs = []
    },
    // 点击浏览
    ClickLiuLan () {
      this.dialogVisible = true
    },
    // 保存浏览的信息
    saveEdit () {
      let arr = []
      let num = 1
      this.liuLanData.forEach(val => {
        if (val.select === true) {
          arr.push(val)
        }
      })
      this.goodsData = arr
      this.goodsData.forEach(val => {
        this.$set(val, 'num', num++)
      })
      this.dialogVisible = false
    },
    // 删除此产品系列中的产品
    delGoods (index) {
      this.goodsData.splice(index, 1)
    },
    // 浏览下面的check点击选中
    checkClick (item) {
      item.select = !item.select
    },
    // 保存产品系列更改
    saveGoods (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let proId = []
          this.goodsData.forEach(val => {
            proId.push(val.Id)
          })
          let img
          if (this.imgs[0]) {
            img = this.imgs[0].data
          } else { img = '' }
          Xsavedetail({
            collectid: this.$route.query.id,
            name: this.ruleForm.goodsname,
            content: this.content,
            productids: proId,
            image: {
              image: img,
              placeholder: this.imgTitle
            }
          }).then(resp => {
            if (resp.data.code === 1) {
              this.$message({
                message: resp.data.msg,
                type: 'success'
              })
              this.$router.push({
                path: '/administratorPanel/productInventory/productLine'
              })
            } else {
              this.$message(resp.data.msg)
            }
          }).catch(err => {
            this.$message(err)
          })
        } else {
          this.$message({
            message: this.$t('productLineDetail.hint.text1'),
            type: 'warning'
          })
        }
      })
    },
    // 删除产品系列
    delProX () {
      this.dialogVisibleDel = true
    },
    // 确定删除产品系列
    delCosite () {
      Xdetaildelete({
        collectid: this.$route.query.id
      }).then(resp => {
        this.$router.go(-1)
        this.$message(resp.data.msg)
      })
    }
  },
  watch: {
    seachProTwo () {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.getData()
      }, 500)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  created () {
    this.options = this.$t('productLineDetail.options')
    this.getData()
  }
}
</script>
<style lang="less">
  .el-dialog__header{
    border-bottom: 1px solid #D5D5D5;
  }
  .weight-input {
    >input{
      width: 180px;
      height: 48px;
    }
  }
  .product-input {
    .el-input__inner {
      height: 50px;
      background: rgba(251, 250, 250, 1);
      border: 1px solid rgb(227, 227, 227);
      border-radius: 4px;
    }
  }
  .liuLanInput{
    .el-input-group__append{
      >button{
        background-color: white;
        color: black;
      }
    }
  }
  .selectOption{
    width: 100%;
    >div{
      >input{
        color: black;
      }
      >input:focus{
        border-color: #4267B2;
      }
    }
  }
  @import '../../../common/css/elementCommon';
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  #files{
    display: none;
  }
  .upImg{
    cursor: pointer;
    .imgBoxCss;
    width:241px;
    height:241px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(210,210,210,1);
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
    width:809px;
    margin: auto;
    .productDetails-header {
      .flexBetween;
      height: 120px;
    }
  }
  .productDetails-form {
    border-radius: 8px;
    .add-form {
      background-color: white;
      padding: 10px 40px 40px 40px;
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
    background: #DCDCDC;
    > img {
      max-height: 100%;
      max-width: 100%;
    }
  }
  .proList-box{
    margin-top: 20px;
    border-top: 1px solid #D5D5D5;
    .flexCss;
    >.proList-box-ul{
      width: 86%;
      >li{
        padding: 0 10px;
        border-top: 1px solid #D5D5D5;
        .flexBetween;
        >div{.flexBetween;}
        >div{
          >div:nth-child(2){
            .imgBoxCss;
          }
        }
      }
      >li:first-child{border: 0;}
      >li:hover{background-color: rgba(213, 213, 213, 0.44);}
    }
  }
  .btnCss {
    .flexBetween;
    > button {
      margin: 40px 0 40px 0;
      height: 47px;
      color: white;
      border-radius: 4px;
    }
    > button:nth-child(2) {
      background-color: #4D6BAC;
    }
  }
  .liuLan-box{
    >ul{
      border-bottom: 1px solid #f4f4f4;
      >li{
        border-top: 1px solid #f4f4f4;
        display: flex;
        align-items: center;
        padding: 4px 10px;
        >div{
          .imgBoxCss;
        }
      }
      >li:first-child{border: 0;}
      >li:hover{background-color: rgba(213, 213, 213, 0.44);}
    }
  }
  .upImgBox{
    .bjCss{
      position: absolute;
      right: 20px;
      top: 10px;
      color:rgba(81,123,194,1);
      cursor: pointer;
    }
  }
  .locationlistCss {
    >li:nth-child(1){
      position: relative;
      >input{
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
    >li:last-child{
      color: red;
    }
    li:hover {
      background-color: #5c6ac4;
      color: white;
    }
  }
  .editImgCss{
    .upImg;
    position: relative;
    >input{
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .tiShiCss{
    .flexCss;
    flex-direction: column;
    margin-top: 40px;
  }
  .add-black {
    color: #4267B2;
    font-size: 18px;
    cursor: pointer;
  }
  .blueBtn{
    background-color: #4267B2;
    color: white;
  }
  .avatar-uploader{
    height: 0;
  }
</style>
