<template>
  <div id="MultiattributeDetail" v-loading="loading">
    <el-backtop :bottom="60"></el-backtop>
    <div class="multiple-header">
      <div>
        <h1 class="header-h1">{{proName}}</h1>
        <p class="add-black" @click="backTop">
          <span class="el-icon-arrow-left"></span>
          {{$t('mulAttrDetails.header.back')}}
        </p>
      </div>
      <div class="multiple-form">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <!--          表单头部展示图片和属性-->
          <el-form-item prop="goodsname">
            <div class="multiple-box box1Mul">
              <p class="header-title-mul">{{$t('mulAttrDetails.content.text1')}}</p>
              <el-row>
                <el-col :span="24">
                  <div class="duoShuXing">
                    <div>
                      <ul>
                        <li
                          v-for="(item, index) in multiData"
                          class="qieHuanLi"
                          :key="index"
                          @click="qieHuanMul(item,index)"
                          :class="{'activeClass':activeClass===index}"
                        >
                          <div>
                            <div>
                              <img :src="item.attr_img === null ? missImage : item.attr_img" alt />
                            </div>
                            <p>{{item.attr_value}}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="itemBox1">
                    <div class="multiple-box-Box1">
                      <img :src="img === null ? missImage : img" alt />
                    </div>
                    <div>
                      <p>{{ruleForm.goodsname}}</p>
                      <p class="sizeCss">
                        <span>{{multiData.length}}</span>
                        {{$t('mulAttrDetails.content.text2')}}
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <!--          选项多属性和编辑上传图片-->
          <el-form-item>
            <div class="multiple-box mulBox2">
              <p class="name-title">{{$t('mulAttrDetails.content.text3')}}</p>
              <el-row>
                <el-col :span="24">
                  <div class="priceBox" v-for="(item,index) in attr" :key="index">
                    <label>{{item.attr_name}}</label>
                    <el-input type="text" v-model="item.attr_value" class="product-input" />
                  </div>
                </el-col>
                <el-col :span="24">
                  <div class="changeImg">
                    <div @click="nowImg">
                      <template v-if="goodImg!==null">
                        <img :src="goodImg" alt />
                      </template>
                      <p v-else>{{$t('mulAttrDetails.content.text4')}}</p>
                    </div>
                    <p>
                      <el-link
                        type="primary"
                        c
                        @click="nowImg"
                      >{{$t('mulAttrDetails.content.text5')}}</el-link>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <!--          定价-->
          <div class="multiple-box">
            <p class="name-title">{{$t('mulAttrDetails.content.text6')}}</p>
            <el-row>
              <el-col :span="11">
                <el-form-item prop="price">
                  <div class="priceBox">
                    <p>{{$t('mulAttrDetails.content.text7')}}</p>
                    <el-input
                      type="text"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      class="product-input"
                      placeholder="$0.00"
                      v-model="ruleForm.price"
                      @blur="moneyFormat($event)"
                    />
                  </div>
                  <template>
                    <p
                      style="margin-bottom: 0"
                      v-if="ruleForm.price > 0 && ruleForm.costprice !==''"
                    >{{$t('mulAttrDetails.content.text10')}}{{profit.priceTwo}}%</p>
                  </template>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item prop="oldprice">
                  <div class="priceBox">
                    <p>{{$t('mulAttrDetails.content.text8')}}</p>
                    <el-input
                      type="text"
                      oninput="value=value.replace(/[^0-9.]/g,'')"
                      class="product-input"
                      placeholder="$0.00"
                      v-model="ruleForm.oldprice"
                      @blur="moneyFormat($event)"
                    />
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item prop="costprice">
              <div>
                <p style="margin-top: 0">{{$t('mulAttrDetails.content.text9')}}</p>
                <el-input
                  type="text"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
                  class="product-input"
                  placeholder="$0.00"
                  v-model="ruleForm.costprice"
                  @blur="moneyFormat($event)"
                />
              </div>
            </el-form-item>
            <p class="genZongNum">
              <el-checkbox v-model="collect">{{$t('mulAttrDetails.content.text11')}}</el-checkbox>
            </p>
          </div>
          <!--          跟踪数量和位置名称-->
          <div class="multiple-box box4Mul">
            <div>
              <p class="name-title">{{$t('mulAttrDetails.content.siteNum.text1')}}</p>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="sku">
                    <div class="priceBox">
                      <p>{{$t('mulAttrDetails.content.siteNum.text2')}}</p>
                      <el-input type="text" class="product-input" v-model="ruleForm.sku" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="barCode">
                    <div class="priceBox">
                      <p>{{$t('mulAttrDetails.content.siteNum.text3')}}</p>
                      <el-input type="text" class="product-input" v-model="ruleForm.barCode" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="genZongNum">
              <el-checkbox v-model="gzCheckbox">{{$t('mulAttrDetails.content.siteNum.text4')}}</el-checkbox>
              <br />
              <el-checkbox v-if="gzCheckbox === true">{{$t('mulAttrDetails.content.siteNum.text5')}}</el-checkbox>
            </div>
            <div class="mulBox4">
              <p>{{$t('mulAttrDetails.content.siteNum.slot')}}</p>
              <div>
                <span>{{$t('mulAttrDetails.content.siteNum.text6')}}</span>
                <span
                  class="orangeColor"
                  @click="bjSite"
                >{{$t('mulAttrDetails.content.siteNum.text7')}}</span>
              </div>
            </div>
            <div class="mulBox4">
              <p>{{$t('mulAttrDetails.content.siteNum.text8')}}</p>
              <div>
                <span>{{$t('mulAttrDetails.content.siteNum.text9')}}</span>
                <span>{{$t('mulAttrDetails.content.siteNum.text10')}}</span>
              </div>
            </div>
            <div class="mulBox4" v-for="(item, index) in warehouseData" :key="index">
              <p class="mulBox4-text">{{item.name}}</p>
              <div>
                <el-popover placement="bottom" v-model="item.visibleEditSet" trigger="click">
                  <ul class="flexCss">
                    <li
                      v-for="(item,index) in $t('mulAttrDetails.editSetNum')"
                      class="editSetNum"
                      :key="index"
                      :class="{'editSetNumCss':editSetNumActive===index}"
                      @click="editSetStyle(item,index)"
                    >{{item.text}}</li>
                  </ul>
                  <div v-if="editSetNumActive === 0">
                    <div class="editeBoxCss">
                      <p>{{$t('mulAttrDetails.content.siteNum.text11')}}</p>
                      <el-input-number
                        v-model="item.SetNum"
                        :min="0"
                        onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
                      ></el-input-number>
                      <p>{{$t('mulAttrDetails.content.siteNum.text12')}}</p>
                      <span v-if="item.SetNum === 0">{{item.newNum = item.num}}</span>
                      <span v-else-if="isNaN(item.SetNum)">{{item.newNum = 0}}</span>
                      <span v-else>{{item.newNum = Number(item.SetNum) + Number(item.num)}}</span>
                    </div>
                  </div>
                  <div class="setCsCss" v-else>
                    <div>
                      <div>
                        <p>{{$t('mulAttrDetails.content.siteNum.text13')}}</p>
                        <span>{{item.num}}</span>
                      </div>
                      <div style="width: 130px">
                        <p>{{$t('mulAttrDetails.content.siteNum.text14')}}</p>
                        <el-input
                          v-model="SetnewNum"
                          onkeypress="return(/[\d]/.test(String.fromCharCode(event.keyCode)))"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="editeCaoZuo">
                    <el-button
                      @click="item.visibleEditSet = false"
                    >{{$t('mulAttrDetails.content.siteNum.btn1')}}</el-button>
                    <el-button
                      @click="saveNewNum(item)"
                      class="blueBtn"
                    >{{$t('mulAttrDetails.content.siteNum.btn2')}}</el-button>
                  </div>
                  <span slot="reference" class="orangeColor">
                    <el-link :underline="false" style="color: #FFA400">{{item.num}}</el-link>
                  </span>
                </el-popover>
              </div>
            </div>
            <div class="mulBox4" v-if="warehouseData.length>1">
              <p>{{$t('mulAttrDetails.content.siteNum.slot2')}}</p>
              <div>
                <span
                  class="orangeColor"
                  v-if="this.$route.query.attrpid === undefined"
                >{{profit.proNum}}</span>
                <span class="orangeColor" v-else>{{getNum.getZongShu}}</span>
              </div>
            </div>
          </div>
          <!--          发货-->
          <div class="multiple-box box4Mul">
            <div>
              <p class="name-title">{{$t('mulAttrDetails.content.siteNum.text15')}}</p>
              <div class="genZongNum">
                <el-checkbox v-model="carriageCheck">{{$t('mulAttrDetails.content.siteNum.text16')}}</el-checkbox>
              </div>
            </div>
            <div v-if="carriageCheck === true">
              <div class="weightBox">
                <p>{{$t('mulAttrDetails.content.siteNum.text17')}}</p>
                <p class="sizeCss">{{$t('mulAttrDetails.content.siteNum.text18')}}</p>
                <div class="weight-box">
                  <input
                    type="text"
                    class="weight-input"
                    v-model="weightNum"
                    onkeyup="value=value.replace(/[^\d.]/g,'')"
                  />
                  <ul class="unit-ul">
                    <li
                      v-for="(item,index) in unit"
                      class="unit"
                      :key="index"
                      :class="{'unitBgcolor':active===index}"
                      @click="selectStyle(item,index)"
                    >{{item.monad}}</li>
                  </ul>
                </div>
              </div>
              <!--              <div class="regionBox">-->
              <!--                <p>海关信息</p>-->
              <!--                <p class="sizeCss">用于目的国/地区海关计算关税。该信息将显示报关单上。</p>-->
              <!--                <p>原产地</p>-->
              <!--                <select>-->
              <!--                  <option>选择国家/地区</option>-->
              <!--                </select>-->
              <!--                <p class="sizeCss">商品生产国/地区或者发货仓库所在国家/地区。</p>-->
              <!--              </div>-->
            </div>
            <div class="weightBox" v-else>
              <p>{{$t('mulAttrDetails.content.siteNum.text19')}}</p>
            </div>
          </div>
          <el-form-item>
            <div class="saveMul">
              <el-button
                @click="saveMul"
                v-preventReClick="2000"
              >{{$t('mulAttrDetails.content.siteNum.btn2')}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!--    编辑上传多属性图片-->
      <el-dialog
        :title="$t('mulAttrDetails.elDialogImg.title')"
        :visible.sync="dialogVisibleImg"
        width="100%"
      >
        <div class="editImgCss" v-loading="Btnloading">
          <div
            v-for="(item, index) in imgs"
            :key="index"
            @click="pitchImg(item, index)"
            class="editImgCss-box"
            :class="{'pichImgCss':activeImg===index}"
          >
            <img :src="item.data" alt />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div class="flexBetween">
            <div>
              <el-button
                type="danger"
                v-if="goodImg !== null"
                @click="delImg"
              >{{$t('mulAttrDetails.elDialogImg.text1')}}</el-button>
            </div>
            <div v-if="hideBtn">
              <el-button
                class="editAddImg"
                @click="uploadHint"
                v-if="uploadHintBtn || imgs.length < maxCount"
              >
                {{$t('mulAttrDetails.elDialogImg.btn')}}
                <template v-if="imgs.length < maxCount">
                  <input
                    type="file"
                    id="filesEdit"
                    @change="fileChange($event)"
                    multiple="multiple"
                    ref="FileValue"
                  />
                </template>
              </el-button>
              <el-button
                class="blueBtn"
                style="background-color: #4267B2"
                @click="saveCompleted"
              >{{$t('mulAttrDetails.elDialogImg.btn2')}}</el-button>
            </div>
          </div>
        </span>
      </el-dialog>
      <!--    编辑位置-->
      <el-dialog
        :title="$t('mulAttrDetails.elDialogSite.title')"
        :visible.sync="dialogVisibleSite"
        width="100%"
      >
        <div class="editWarehouse-box2" v-show="judgeSite">
          <p>
            <span class="el-icon-warning"></span>
            {{$t('mulAttrDetails.elDialogSite.text1')}}
          </p>
        </div>
        <span>{{$t('mulAttrDetails.elDialogSite.text2')}}</span>
        <ul>
          <li v-for="(item, index) in checkedEdit" :key="index" class="genZongNum">
            <el-checkbox v-model="item.checked" :label="item.name" @change="getCheck(item)"></el-checkbox>
            <p v-if="item.checked === false">
              <span v-if="item.num !==0">
                {{$t('mulAttrDetails.elDialogSite.text3')}}
                {{item.num}} {{$t('mulAttrDetails.elDialogSite.text4')}}
              </span>
            </p>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleSite = false">{{$t('mulAttrDetails.elDialogSite.btn1')}}</el-button>
          <el-button
            type="primary"
            @click="addWarehouse"
            ref="BtnCss"
            v-preventReClick="2000"
          >{{$t('mulAttrDetails.elDialogSite.btn2')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formatMoney } from '../../../common/validator'
import {  showmultity,
  saveaddattr,
  showaddattr,
  editattrimg,
  saveattrupload,
  deletelocate, editmultlocation, savemultity} from '../../../common/api/api'

export default {
  name: 'MultiattributeDetail',
  inject: ['reload'],
  data () {
    return {
      missImage: require('../../../assets/addShop/tupian.png'),
      loading: true,
      Btnloading: true,
      hideBtn: true,
      uploadHintBtn: false,
      collect: true, // 税收
      editSetNumActive: 0,
      SetNum: 0,
      newNum: 0,
      SetnewNum: '',
      proName: '', // 进来的产品名称
      gzCheckbox: true, // 跟踪勾选
      dialogVisibleImg: false, // 编辑图片模态框
      dialogVisibleSite: false, // 编辑仓库位置
      judgeSite: false, // 判断位置
      carriageCheck: true,
      activeClass: '',
      attr: [],
      weightNum: '0.0', // 重量
      active: 0, // 默认选中的索引值
      unit: [
        { monad: 'lb' },
        { monad: 'oz' },
        { monad: 'kg' }
      ], // 存放重量单位
      unitid: 'lb',
      ruleForm: {
        goodsname: '', // 产品名称
        content: ``, // 产品描述
        price: '', // 价格
        oldprice: '', // 原价
        costprice: '', // 成本价
        sku: '', // sku货号
        barCode: '', // 条码
        carriageType: '', // 运输类型
        carriagePrice: '' // 运输价钱
      },
      rules: {},
      img: '',
      imgs: [], // 产品的所有图片
      imgfiles: [], // 图片原文件，上传到后台的数据
      multiData: [],
      maxCount: 9, // 限制上传数量
      activeImg: '',
      attrImg: '',
      getImg: '',
      attrpid: this.$route.query.attrpid, // 获取传进来的多属性ID
      productid: this.$route.query.productid,
      goodImg: null,
      sum: '',
      checkedEdit: [], // 仓库选中
      warehouseData: [], // 仓库数据
      getBeiFen: [] // 仓库备份数据
    }
  },
  methods: {
    // 返回所有产品页面/ 返回上一层
    backTop () {
      this.$router.go(-1)
    },
    // 保存设置数量和调整数量
    saveNewNum (item) {
      if (this.editSetNumActive === 0) {
        item.num = item.newNum
        item.SetNum = ''
      } else {
        if (this.SetnewNum === '') {
          item.visibleEditSet = false
        } else {
          item.num = this.SetnewNum
          this.SetnewNum = ''
        }
      }
      item.visibleEditSet = false
    },
    // 切换设置数量和调整数量
    editSetStyle (item, index) {
      this.editSetNumActive = index
      this.newNum = 0
    },
    // 编辑位置
    bjSite () {
      this.dialogVisibleSite = true
      if (this.$route.query.attrpid === undefined) {
        this.checkedEdit = this.getBeiFen
      } else {
        editmultlocation({
          attrpid: this.$route.query.attrpid,
          productid: this.$route.query.productid
        }).then(resp => {
          this.checkedEdit = resp.data.data
        })
      }
    },
    // 获取勾选的仓库值
    getCheck () {
      let c = false
      this.checkedEdit.forEach((data, index) => {
        if (data.checked) {
          c = true
          this.judgeSite = false
        }
      })
      if (!c) {
        this.judgeSite = true
        return false
      }
    },
    // 仓库勾选点击确定
    addWarehouse () {
      if (this.$route.query.attrpid === undefined) {
        if (this.judgeSite === false) {
          this.getBeiFen = this.checkedEdit
          this.warehouseData = []
          this.checkedEdit.forEach((data, index) => {
            if (data.checked === true) {
              this.$set(data, 'visibleEditSet', false)
              this.$set(data, 'SetNum', 0)
              this.$set(data, 'newNum', 0)
              this.warehouseData.push(data)
            }
          })
          this.dialogVisibleSite = false
        } else {
          return false
        }
      } else {
        if (this.judgeSite === false) {
          let a = this.$route.query.attrpid
          if (a === undefined) {
            a = 0
          }
          deletelocate({
            attrpid: a,
            productid: this.$route.query.productid,
            locategid: this.checkedEdit
          }).then(resp => {
            this.warehouseData = []
            this.checkedEdit.forEach((data, index) => {
              if (data.checked === true) {
                this.$set(data, 'visibleEditSet', false)
                this.$set(data, 'SetNum', 0)
                this.$set(data, 'newNum', 0)
                this.warehouseData.push(data)
              }
            })
            this.dialogVisibleSite = false
          })
        } else {
          return false
        }
      }
    },
    // 金钱格式
    moneyFormat (e) {
      e.target.value = formatMoney(e.target.value)
    },
    // 点击切换重量单位
    selectStyle (item, index) {
      this.active = index
      this.unitid = item.monad
    },
    // 请求多属性数据
    postShowmultity () {
      showmultity({
        attrpid: this.attrpid
      }).then(resp => {
        let a = resp.data.data
        a.costprice === '0.00' ? a.costprice = '' : this.ruleForm.costprice = a.costprice
        a.price === '0.00' ? a.price = '' : this.ruleForm.price = a.price
        a.oldprice === '0.00' ? a.oldprice = '' : this.ruleForm.oldprice = a.oldprice
        this.proName = resp.data.data.goodsname
        let data = resp.data.data
        data.is_tax === 1 ? this.collect = true : this.collect = false
        data.is_transport === 1 ? this.carriageCheck = true : this.carriageCheck = false
        this.multiData = data.attrs
        this.ruleForm.costprice = data.costprice
        this.ruleForm.oldprice = data.oldprice
        this.ruleForm.price = data.price
        this.weightNum = data.weight
        this.attr = data.attr
        this.img = data.img
        this.ruleForm.goodsname = data.goodsname
        this.goodImg = data.attr_img
        this.ruleForm.sku = data.sku
        this.ruleForm.barCode = data.itemcode
        this.sum = data.location.info
        this.unit.forEach((val, index) => { // 循环重量赋值
          if (data.unitid === val.monad) {
            this.active = index
            this.unitid = this.unit[index].monad
          }
        })
        let mul = []
        data.attr.forEach(val => {
          mul.push(val.attr_value)
        })
        data.attrs.forEach((val, index) => {
          if (mul.join('-') === data.attrs[index].attr_value) {
            this.activeClass = index
            this.proName = val.attr_value
          }
        })
      })
    },
    // 切换多属性
    qieHuanMul (item, index) {
      this.attrpid = item.id
      this.proName = item.attr_value
      this.activeClass = index
      this.postShowmultity()
    },
    // 打开图片模态框编辑内容
    nowImg () {
      this.dialogVisibleImg = true
      this.Btnloading = true
      this.hideBtn = false
      this.uploadHintBtn = false
      editattrimg({
        productid: this.$route.query.productid
      }).then(resp => {
        this.imgs = resp.data.data
        this.imgs.forEach((val, index) => {
          if (this.goodImg === this.imgs[index].data) {
            this.activeImg = index
          } else if (this.img === this.upImg) {
            this.activeImg = ''
          }
        })
        if (this.imgs.length < this.maxCount) {
          this.uploadHintBtn = true
        } else {
          this.uploadHintBtn = false
        }
        this.Btnloading = false
        this.hideBtn = true
      })
    },
    // 点击选中多属性图片
    pitchImg (item, index) {
      this.activeImg = index
      this.getImg = item.data
    },
    // 加入图片
    fileChange (e) {
      let addImg = []
      var _this = this
      var file = e.target.files
      var leng = file.length
      if (leng + _this.imgs.length >= _this.maxCount) {
        this.uploadHintBtn = false
        alert(_this.$t('productDetails.hint.text9') + _this.maxCount + _this.$t('productDetails.hint.text10'))
        return
      } else {
        this.uploadHintBtn = true
      }
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        _this.imgfiles.push(file[i])
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          addImg = []
          let obj = { data: e.target.result }
          addImg.push(obj)
          _this.imgs.push(obj) // base64 图片地址形成预览
          saveattrupload({
            image: addImg,
            productid: _this.productid
          }).then(resp => {
            _this.imgs = resp.data.data
          })
        }
      }
      _this.$refs.FileValue.value = ''
    },
    // 判断图片上传限制置灰
    uploadHint () {
      if (this.imgs.length > 9) {
        alert('最多上传9张图片！')
        // return false
        this.$refs.BtnCss.style.backgroundColor = '#5563c1'
      }
    },
    // 改变当前图片
    saveCompleted () {
      this.dialogVisibleImg = false
      this.goodImg = this.getImg
    },
    // 删除当前多属性的图片
    delImg () {
      this.dialogVisibleImg = false
      this.goodImg = null
      this.activeImg = ''
    },
    // 请求保存添加多属性
    postAddMul () {
      let judge = true
      let tax
      let transport
      this.collect === true ? tax = 1 : tax = 0
      this.carriageCheck === true ? transport = 1 : transport = 0
      this.attr.forEach(val => {
        if (val.attr_value === '') {
          judge = false
        } else {
          judge = true
        }
      })
      if (judge === true) {
        saveaddattr({
          is_tax: tax,
          is_transport: transport,
          attr: this.attr,
          location: this.warehouseData,
          price: this.ruleForm.price,
          oldprice: this.ruleForm.oldprice,
          costprice: this.ruleForm.costprice,
          sku: this.ruleForm.sku,
          itemcode: this.ruleForm.barCode,
          weight: this.weightNum,
          unitid: this.unitid,
          productid: this.$route.query.productid,
          img: this.goodImg
        }).then(resp => {
          if (resp.data.code === 0) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'warning'
            })
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
          }
        })
      } else {
        this.$message({
          message: '请将选项值填写完整',
          type: 'warning'
        })
      }
    },
    // 请求多属性保存
    postSaveMul () {
      let judge = false
      let tax
      let transport
      this.collect === true ? tax = 1 : tax = 0
      this.carriageCheck === true ? transport = 1 : transport = 0
      this.attr.forEach(val => {
        if (val.attr_value === '') {
          judge = true
        }
      })
      if (judge === false) {
        savemultity({
          is_tax: tax,
          is_transport: transport,
          attr: this.attr,
          location: this.checkedEdit,
          price: this.ruleForm.price,
          oldprice: this.ruleForm.oldprice,
          costprice: this.ruleForm.costprice,
          sku: this.ruleForm.sku,
          itemcode: this.ruleForm.barCode,
          weight: this.weightNum,
          unitid: this.unitid,
          productid: this.$route.query.productid,
          attrpid: this.attrpid,
          image: this.goodImg
        }).then(resp => {
          if (resp.data.code === 0) {
            this.$message({
              message: resp.data.msg,
              type: 'warning'
            })
          } else {
            this.$message({
              message: resp.data.msg,
              type: 'success'
            })
            this.$router.go(-1)
          }
        })
      } else {
        this.$message('请将选项值添加完善')
      }
    },
    // 保存当前多属性详情
    saveMul () {
      if (this.$route.query.attrpid === undefined) { // 添加多属性保存
        if (this.activeClass === '') {
          this.postAddMul()
        } else {
          this.postSaveMul()
        }
      } else { // 多属性详情查看
        this.postSaveMul()
      }
    }
  },
  computed: {
    profit: function () {
      var priceTwo
      var proNum = 0
      var proNum2 = 0
      if (this.$route.query.attrpid === undefined) {
        this.warehouseData.forEach(val => {
          proNum += Number(val.num)
        })
        priceTwo = (this.ruleForm.price - this.ruleForm.costprice) / this.ruleForm.price * 100
        return { priceTwo: parseFloat(priceTwo).toFixed(1), proNum: proNum }
      } else {
        for (let v of this.sum) {
          proNum2 += Number(v.storage)
        }
        priceTwo = (this.ruleForm.price - this.ruleForm.costprice) / this.ruleForm.price * 100
        return { priceTwo: parseFloat(priceTwo).toFixed(1), proNum: proNum2 }
      }
    },
    getNum: function () {
      var getZongShu = 0
      this.warehouseData.forEach(val => {
        getZongShu += Number(val.num)
      })
      return { getZongShu: getZongShu }
    }
  },
  created () {
    document.documentElement.scrollTop = 380
    this.attrpid = this.$route.query.attrpid
    if (this.$route.query.attrpid === undefined) { // 判断如果没有attrpid那么就是传过来的是添加多属性
      showaddattr({
        productid: this.$route.query.productid
      }).then(resp => {
        this.loading = false
        this.proName = '添加多属性'
        let data = resp.data.data
        data.is_tax === 1 ? this.collect = true : this.collect = false
        data.is_tax === 1 ? this.carriageCheck = true : this.carriageCheck = false
        this.multiData = data.attrs
        this.attr = data.attr
        this.img = data.img
        this.ruleForm.goodsname = data.goodsname
        this.goodImg = null
        for (let v of data.location) {
          this.$set(v, 'checked', true)
          this.$set(data, 'visibleEditSet', false)
          this.$set(data, 'SetNum', 0)
          this.$set(data, 'newNum', 0)
          this.warehouseData.push(v)
          this.getBeiFen.push(v)
        }
        this.activeClass = ''
      })
    } else {
      this.postShowmultity()
      this.loading = false
    }
    editmultlocation({ // 请求仓库数据
      attrpid: this.$route.query.attrpid,
      productid: this.$route.query.productid
    }).then(resp => {
      this.loading = false
      this.checkedEdit = resp.data.data
      this.checkedEdit.forEach((data, index) => {
        if (data.checked === true) {
          this.$set(data, 'visibleEditSet', false)
          this.$set(data, 'SetNum', 0)
          this.$set(data, 'newNum', 0)
          this.warehouseData.push(data)
        }
      })
    })
  }
}
</script>
<style lang="less">
@import "../../../common/css/elementCommon";
.product-input {
  .el-input__inner {
    height: 50px;
    background: rgba(251, 250, 250, 1);
    border: 1px solid rgb(227, 227, 227);
    border-radius: 4px;
  }
}
.genZongNum {
  > label {
    margin-bottom: 4px;
    .el-checkbox__inner {
      width: 22px;
      height: 22px;
    }
    .el-checkbox__inner::after {
      left: 7px;
      top: 4px;
    }
  }
  margin: 20px 0 10px 0;
}
.el-input__inner:focus {
  border: 2px solid #4267b2;
  outline: none;
  border-radius: 4px;
}
</style>
<style scoped lang="less">
@import "../../../common/css/common";
.editWarehouse-box2 {
  height: 40px;
  padding: 20px;
  background-color: #fdf7e3;
  border-top: 4px solid #eec200;
  margin-bottom: 30px;
}
.confirmBtn {
  padding: 10px;
  height: 39px;
  background: rgba(66, 103, 178, 1);
  border: 1px solid rgba(66, 103, 178, 1);
  border-radius: 4px;
  color: white;
  margin-left: 30px;
  cursor: pointer;
}
.sizeCss {
  color: #999999;
}
.inputCss {
  height: 36px;
  width: 330px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(149, 149, 149, 1);
  border-radius: 4px;
  padding: 10px;
}
.orangeColor {
  color: #ffa400;
  cursor: pointer;
}
.activeClass {
  background-color: #4267b2;
  color: white;
  cursor: pointer;
}
.price-box {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 30px;
  div {
    input {
      .inputCss;
    }
  }
}
.weight-box {
  display: flex;
  align-items: center;
  .unit-ul {
    display: flex;
  }
  .unitBgcolor {
    background-color: #4267b2;
    color: white;
  }
  .unit {
    width: 51px;
    height: 46px;
    cursor: pointer;
    text-align: center;
    line-height: 46px;
    border: 1px solid rgb(219, 219, 219);
    margin-left: 20px;
  }
}
.weight-input {
  width: 105px;
  height: 26px;
  padding: 10px;
  border: 1px solid rgba(183, 183, 183, 1);
  border-radius: 4px;
  outline: none;
  transition: all 0.2s linear;
}
.weight-input:focus {
  border: 1px solid #4267b2;
}
.changeImg {
  margin-top: 10px;
  > div {
    margin: auto;
    .flexCss;
    width: 222px;
    height: 222px;
    border: 1px solid #d5d5d5;
    cursor: pointer;
    border-radius: 4px;
    > img {
      height: 100%;
      width: 100%;
    }
  }
  > p {
    text-align: center;
  }
}
.editImgCss {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.editImgCss-box {
  .flexCss;
  width: 60px;
  height: 60px;
  border: 1px solid silver;
  margin-left: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  > img {
    height: 100%;
    width: 100%;
  }
}
.pichImgCss {
  border: 1px solid #202e78;
  transition: all linear 0.3s;
  width: 58px;
  height: 58px;
}
.editAddImg {
  position: relative;
  > span {
    > input {
      left: 0;
      top: 0;
      position: absolute;
      width: 108px;
      height: 36px;
      opacity: 0;
    }
  }
}
.multiple-header {
  margin: auto;
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    padding: 0 8px;
  }
}
.multiple-box {
  background: rgba(255, 255, 255, 1);
  border: 0px solid rgba(112, 70, 16, 1);
  box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
  border-radius: 10px;
  padding: 10px 8px;
  margin: 10px auto;
}
.box1Mul {
  padding: 4px 8px 40px 8px;
}
.box4Mul {
  margin-top: 30px;
  padding-bottom: 30px;
}
.itemBox1 {
  display: flex;
  padding: 10px 0 10px 30px;
  > div:nth-child(2) {
    margin-left: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .multiple-box-Box1 {
    width: 156px;
    height: 148px;
    background: #e5e5e5;
    .flexCss;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.mulBox4 {
  .flexCss;
  justify-content: space-between;
  border-top: 1px solid #f4f4f4;
  > div:nth-child(2) {
    width: 240px;
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
}
.mulBox4-text {
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header-h1 {
  .mulBox4-text;
  max-width: 180px;
}
.weightBox {
  border-top: 1px solid #eeeeee;
  margin: 14px auto;
}
.regionBox {
  border-top: 1px solid #eeeeee;
  select {
    width: 485px;
    height: 50px;
    border-radius: 4px;
    padding: 10px;
  }
}
.duoShuXing {
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  cursor: pointer;
  max-height: 270px;
  overflow-x: hidden;
  h2 {
    margin-left: 30px;
  }
  > div:nth-child(2) {
    border-top: 1px solid #eeeeee;
  }
  ul {
    .qieHuanLi {
      > div {
        height: 80px;
        display: flex;
        align-items: center;
        margin-left: 30px;
        div {
          width: 61px;
          height: 56px;
          background-color: #d5d5d5;
          .flexCss;
          img {
            height: 100%;
            width: 100%;
          }
        }
        p {
          margin-left: 20px;
        }
      }
    }
    .qieHuanLi:hover {
      opacity: 0.8;
    }
  }
}
.saveMul {
  display: flex;
  justify-content: flex-end;
  margin: auto;
  > button {
    width: 76px;
    margin-bottom: 40px;
    margin-top: 20px;
    background: rgba(56, 92, 165, 1);
    border-radius: 4px;
    color: white;
  }
}
.add-black {
  color: #4267b2;
  font-size: 18px;
  cursor: pointer;
}
.editSetNum {
  color: black;
  padding: 6px;
  border-bottom: 1px solid #d5d5d5;
  cursor: pointer;
}
.editSetNumCss {
  border-bottom: 2px solid #4267b2;
}
.editeBoxCss {
  padding: 10px;
}
.editeCaoZuo {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #d5d5d5;
  margin: 0 10px 10px 0;
  padding-top: 10px;
}
.setCsCss {
  > div:nth-child(1) {
    .flexCss;
    align-items: end;
    padding: 10px;
    > div:nth-child(1) {
      width: 42%;
    }
    margin-bottom: 20px;
  }
}
.blueBtn {
  background-color: #4267b2;
  color: white;
}
.name-title {
  font-size: 18px;
  margin-bottom: 0;
  color: black;
}
.header-title-mul {
  font-size: 18px;
  color: black;
}
.mulBox2 {
  padding-bottom: 36px;
}
</style>
