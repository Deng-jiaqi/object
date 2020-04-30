<template>
  <div>
    <div class="trolley" v-if="goodsinfo.length>0">
      <div class="trolley-header" v-if="savedAddressInformation.length<1">
        <el-button
          class="add-diZhi"
          type="text"
          @click="openMoTai"
        >{{$t('submitOrderFive.setSite.text1')}}</el-button>
      </div>
      <div class="c-savedAddressInformation" v-if="savedAddressInformation.length>0">
        <h3 class="order-h3">
          <span>{{$t('submitOrderFive.header.title')}}</span>
          <!-- <el-button
            @click="openMoTai(Num)"
            class="el-icon-plus"
            style="cursor: pointer"
            v-if="savedAddressInformation.length > 1"
          >{{$t('submitOrderFive.setSite.text1')}}</el-button>-->
        </h3>
        <!-- 添加地址成功后的box -->
        <div class="savedAddressInformation-box">
          <span class="iconfont icon-dizhi"></span>
          <p class="list-one">
            <span>收货人: {{savedAddressInformation[0].name}}</span>
            <span>{{savedAddressInformation[0].phone}}</span>
          </p>
          <p class="list-two">
            <span>收货地址: {{savedAddressInformation[0].country}}{{savedAddressInformation[0].province}}{{savedAddressInformation[0].city}}{{savedAddressInformation[0].address}}</span>
          </p>
          <div class="list-three">
            <span
              class="siteSpan"
              @click="editAdressDialogVisible = true"
            >{{$t('submitOrderFive.setSite.text2')}}</span>
            <span @click="delSite">{{$t('submitOrderFive.site.text5')}}</span>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="trolley-table">
        <el-table
          :empty-text="$t('lang.indexofEffectiveOrders.table.text8')"
          :data="goodsinfo"
          class="shopping-cart-table"
          ref="orderTable"
          :show-header="false"
        >
          <el-table-column :label="$t('shopTrolley.table.thead.th2')">
            <template slot-scope="scope">
              <div class="goods-information">
                <img :src="scope.row.img" alt />
                <div class="goods-information-right">
                  <p class="goods-name">{{scope.row.goodsname}}</p>
                  <!-- <div>
                    <p
                      class="attr"
                      v-for="(item,index) in scope.row.attr"
                      :key="index"
                    >{{item.name}}: {{item.value}}</p>
                  </div>-->
                  <div class="num-and-price">
                    <span class="price">$ {{scope.row.price}}</span>
                    <span class="num">x {{scope.row.buynum}}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="sub-footer">
          <p v-show="savedAddressInformation.length">
            <span>{{$t('submitOrderFive.discount.text3')}}</span>
            <span>+ {{tax}}$</span>
          </p>
          <p v-show="savedAddressInformation.length">
            <span>{{$t('submitOrderFive.discount.text2')}}</span>
            <span>+ {{shipping}}$</span>
          </p>
          <p v-if="autoDiscount">
            <span>{{$t('submitOrderFive.discount.text4')}} {{autoDiscount}}</span>
            <span>- ${{auto_discount_amount}}</span>
          </p>
          <p v-show="discountAddedSuccessfully">
            <span>{{$t('submitOrderFive.discount.text4')}} {{addedSuccessfullyDiscountCode}}</span>
            <span>- ${{discount_amount}}</span>
          </p>
          <p>
            <span>{{$t('submitOrderFive.discount.text1')}}</span>
            <span>${{netTotalPrice}}</span>
          </p>
        </div>
        <div class="c-discount-operation">
          <template v-if="!autoDiscount">
            <!-- 折扣 -->
            <el-input :placeholder="$t('submitOrderFive.discount.text4')" v-model="discountCode"></el-input>
            <el-button
              v-show="!discountAddedSuccessfully"
              @click="addDiscountCode"
            >{{$t('submitOrderFive.discount.btn1')}}</el-button>
            <el-button
              @click="deleteDiscountCode"
              type="danger"
              v-if="discountAddedSuccessfully"
              v-preventReClick="2000"
            >{{$t('submitOrderFive.discount.btn3')}}</el-button>
          </template>
        </div>
        <div class="bottom-operation">
          <div class="right">
            <span>
              {{totalGoodsNum}} {{$t('submitOrderFive.discount.span1')}}&nbsp;&nbsp;
              <span
                class="sumPrice"
              >{{netTotalPrice.toFixed(2)}}</span>
            </span>
            &nbsp;&nbsp;
            <el-button type="primary" @click="submitOrders">{{$t('submitOrderFive.discount.btn2')}}</el-button>
          </div>
        </div>
      </div>
      <!--       添加修改地址模态窗-->
      <div class="adress-modal">
        <el-dialog
          :title="savedAddressInformation.length?$t('submitOrderFive.title.text2'):$t('submitOrderFive.title.text1')"
          :visible.sync="editAdressDialogVisible"
          width="100%"
        >
          <div class="body-loading" v-show="adressLoading" v-loading="adressLoading"></div>
          <div class="site-box" v-show="!adressLoading">
            <el-form
              :model="editAdressForm"
              :rules="editAdressRules"
              ref="editAdressForm"
              label-width="3.125rem"
            >
              <el-form-item label="firstname：" prop="firstname" v-if="$i18n.locale === 'en-us'">
                <el-input type="text" v-model="editAdressForm.firstname" />
              </el-form-item>
              <el-form-item label="lastname：" prop="lastname" v-if="$i18n.locale === 'en-us'">
                <el-input type="text" v-model="editAdressForm.lastname" />
              </el-form-item>
              <el-form-item
                :label="$t('submitOrderFive.elDialog.label1')"
                prop="name"
                v-if="$i18n.locale === 'zh-cn'"
              >
                <el-input
                  type="text"
                  v-model="editAdressForm.name"
                  :placeholder="$t('submitOrderFive.elDialog.place1')"
                  maxlength="25"
                />
              </el-form-item>
              <el-form-item :label="$t('submitOrderFive.elDialog.label2')" prop="zipcode">
                <el-input
                  type="text"
                  v-model="editAdressForm.zipcode"
                  :placeholder="$t('submitOrderFive.elDialog.place2')"
                />
              </el-form-item>
              <el-form-item :label="$t('submitOrderFive.elDialog.label3')" prop="country">
                <!-- 国家 -->
                <template>
                  <el-select
                    v-model="editAdressForm.country"
                    style="width: 100%"
                    :placeholder="$t('submitOrderFive.hint.place')"
                    :no-match-text="$t('submitOrderFive.nodata')"
                    :no-data-text="$t('submitOrderFive.nodata')"
                  >
                    <el-option
                      v-for="option in optionalAddressInformation"
                      :label="$i18n.locale === 'en-us'?option.en_area:option.area"
                      :value="option.id"
                      :key="option.id"
                    ></el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-row class="adress-div" :gutter="10">
                <el-col :span="12">
                  <!-- 省 -->
                  <template>
                    <el-select
                      v-model="editAdressForm.province"
                      style="width: 100%"
                      :placeholder="$t('submitOrderFive.hint.place')"
                      :no-match-text="$t('submitOrderFive.nodata')"
                      :no-data-text="$t('submitOrderFive.nodata')"
                    >
                      <el-option
                        v-for="option in provinceArr"
                        :label="$i18n.locale === 'en-us'?option.en_area:option.area"
                        :value="option.id"
                        :key="option.id"
                      ></el-option>
                    </el-select>
                  </template>
                </el-col>
                <el-col :span="12">
                  <!-- 城市 -->
                  <template>
                    <el-select
                      v-model="editAdressForm.city"
                      style="width: 100%"
                      :placeholder="$t('submitOrderFive.hint.place')"
                      :no-match-text="$t('submitOrderFive.nodata')"
                      :no-data-text="$t('submitOrderFive.nodata')"
                    >
                      <el-option
                        v-for="option in cityArr"
                        :label="$i18n.locale === 'en-us'?option.en_area:option.area"
                        :value="option.id"
                        :key="option.id"
                      ></el-option>
                    </el-select>
                  </template>
                </el-col>
              </el-row>
              <el-form-item :label="$t('submitOrderFive.elDialog.label4')" prop="address">
                <el-input
                  type="textarea"
                  v-model="editAdressForm.address"
                  ref="tareaLength"
                  :placeholder="$t('submitOrderFive.elDialog.place3')"
                  maxlength="60"
                />
              </el-form-item>
              <el-form-item :label="$t('submitOrderFive.elDialog.label5')" prop="phone">
                <el-col :span="8">
                  <template v-if="$i18n.locale === 'en-us'">
                    <el-select
                      v-model="editAdressForm.code"
                      :no-match-text="$t('submitOrderFive.nodata')"
                      :no-data-text="$t('submitOrderFive.nodata')"
                    >
                      <el-option
                        v-for="(item, index) in editAdressForm.NumPhone"
                        :key="index"
                        :label="item.en + '+' + item.code"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <el-select
                      v-model="editAdressForm.code"
                      :no-match-text="$t('submitOrderFive.nodata')"
                      :no-data-text="$t('submitOrderFive.nodata')"
                    >
                      <el-option
                        v-for="(item, index) in editAdressForm.NumPhone"
                        :key="index"
                        :label="item.zh + '+' + item.code"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </template>
                </el-col>
                <el-col class="line" :span="2">&nbsp;</el-col>
                <el-col :span="14">
                  <el-input type="text" v-model="editAdressForm.phone" />
                </el-col>
              </el-form-item>
              <el-form-item :label="$t('submitOrderFive.elDialog.label6')" prop="email">
                <el-input
                  type="text"
                  :placeholder="$t('submitOrderFive.elDialog.place4')"
                  v-model="editAdressForm.email"
                />
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              type="primary"
              v-loading="addressOperationBtnLoading"
              v-preventReClick="2000"
              @click="saveAdressInfo('editAdressForm')"
              v-text="savedAddressInformation.length?$t('submitOrderFive.saveOrSet.text2'):$t('submitOrderFive.saveOrSet.text1')"
            ></el-button>
          </span>
        </el-dialog>
      </div>
      <!--   strip支付-->
      <div class="pay-Dialog">
        <el-dialog
          :close-on-click-modal="false"
          :title="$t('submitOrderFive.elDialogMoney.title')"
          :visible.sync="MuldialogVisibleCode"
          :before-close="handleClose"
          width="90%"
        >
          <div style="position: relative">
            <form action="/charge" method="post" id="payment-form">
              <div class="form-row">
                <label for="card-element" class="flexBetween">
                  <p>{{$t('submitOrderFive.elDialogMoney.text1')}}</p>
                  <p>
                    {{$t('submitOrderFive.elDialogMoney.text2')}}
                    <span>{{netTotalPrice}}</span>
                  </p>
                </label>
                <div id="card-element">
                  <p>
                    <span class="el-icon-loading"></span>
                    {{$t('submitOrderFive.hint.loading')}}
                  </p>
                  <!-- A Stripe Element will be inserted here. -->
                </div>
                <!-- Used to display Element errors. -->
                <!-- <div id="card-errors" role="alert"></div> -->
              </div>
              <br />
              <button
                :disabled="disabled"
                class="confirmMoney"
                :class="{confirmMoney2: this.$i18n.locale === 'en-us'}"
              >{{$t('submitOrderFive.elDialogMoney.btn2')}}</button>
            </form>
            <div class="register-tishi" v-if="regHide">
              <p class="tishi-text">{{$t('submitOrderFive.elDialogMoney.text3')}}</p>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary">{{$t('submitOrderFive.elDialogMoney.btn2')}}</el-button>
          </div>
        </el-dialog>
      </div>

      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        :showClose="showClo"
        size="47%"
      >
        <p class="el-p">{{$t('submitOrderFive.elDialogMoney.car4')}}</p>
        <p class="pbtn">
          <button
            class="button4"
            v-preventReClick="2000"
            @click="tiaozhuan(1)"
          >{{$t('submitOrderFive.elDialogMoney.car1')}}</button>
        </p>
        <p class="pbtn">
          <button class="button1" @click="tiaozhuan(2)">{{$t('submitOrderFive.elDialogMoney.car2')}}</button>
        </p>
        <p class="pbtn">
          <button
            class="button2"
            @click="tiaozhuan(3)"
            v-preventReClick="2000"
          >{{$t('submitOrderFive.elDialogMoney.car5')}}</button>
        </p>
        <p class="pbtn1">
          <button class="button3" @click="drawer = false">{{$t('submitOrderFive.hint.text8')}}</button>
        </p>
      </el-drawer>
    </div>
    <div class="noOrder" v-else>
      <div>
        <img src="../../assets/product/NoOrder2.png" alt />
      </div>
      <p>{{$t('submitOrderFive.nodata')}}</p>
    </div>
  </div>
</template>

<script>
import {
  selectorder,
  paymoney,
  lookarea,
  // setdefault,
  purchase,
  submitorder,
  applydiscount,
  countship,
  showpaypalmoney
} from '@/common/api/api'
import areaCode from '@/common/areaCode'
import {
  validatePhone,
  validateEMail,
  validateName,
  zipcodeValidator,
  validateLength,
  validateFname,
  validateLname
} from '../../common/validator'
import messageAlert from '@/utils/messageAlert'
export default {
  name: 'submitOrder',
  data () {
    return {
      // 编辑地址表单数据
      editAdressForm: {
        name: '', // 收货人姓名
        firstname: '', // 英文名
        lastname: '', // 英文姓
        zipcode: '', // 邮编号码
        address: '', // 地址详情
        phone: '', // 电话号码
        email: '', // 邮箱
        NumPhone: areaCode, // 区号
        code: 86,
        country: '', // 国家
        province: '', // 省/州
        city: '' // 城市
      },
      // 编辑地址验证规则
      editAdressRules: {
        firstname: [{ validator: validateFname, trigger: 'blur' }],
        lastname: [{ validator: validateLname, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        zipcode: [{ validator: zipcodeValidator, trigger: 'blur' }],
        address: [{ validator: validateLength, trigger: 'blur' }],
        country: [
          {
            required: true,
            message: this.$t('lang.validate.text21'),
            trigger: 'blur'
          }
        ],
        email: [{ validator: validateEMail, trigger: 'blur' }]
      },
      // 变量
      autoDiscount: '', // 自动折扣名称
      auto_discount_amount: 0, // 使用自动折扣减少的费用
      discountCode: '', // 折扣码
      addedSuccessfullyDiscountCode: '', // 添加成功的折扣码
      discount_amount: 0, // 使用折扣码减少的费用
      shipping: 0, // 运费
      tax: 0, // 税费
      // data
      goodsinfo: [], // 页面商品信息
      savedAddressInformation: [], // 保存的地址信息数据
      optionalAddressInformation: [], // 所有的地区数据
      provinceArr: [],
      cityArr: [],
      // ui
      editAdressDialogVisible: false, // 编辑地址模态窗visible
      adressLoading: true,
      discountAddedSuccessfully: false, // 折扣添加成功
      addressOperationBtnLoading: false,
      regHide: false, // 判断（正在支付中）
      disabled: false,

      showClo: false,
      direction: 'btt',
      judgeClose: false,
      stripe_api_key: '', // 获取后台key
      MuldialogVisibleCode: false,
      drawer: false, // 选择模态框

      getObj: {}, // 获取税费\运费\价钱\生成的支付token
      Num: '',
      paymethod: 1
    }
  },
  methods: {
    deleteDiscountCode () {
      // 删除折扣码
      let goodsinfo = []
      this.goodsinfo.forEach(val => {
        let data = {
          productid: val.productid, // 产品id
          attrpid: val.attrpid, // 多属性id
          price: val.price, // 产品价钱
          weight: val.weight, // 产品重量
          buynum: val.buynum
        }
        goodsinfo.push(data)
      })
      countship({
        goodsinfo: goodsinfo,
        country: this.editAdressForm.country,
        state: this.editAdressForm.province,
        city: this.editAdressForm.city,
        discount_amount: '', // 折扣价钱
        code: ''
      }).then(resp => {
        console.log(resp)
        messageAlert(resp)
        if (resp.data.code === 1) {
          this.shipping = resp.data.data.shipping
          this.tax = resp.data.data.tax
          this.discountAddedSuccessfully = false
          this.discountCode = ''
        }
      })
    },
    // 输入折扣
    async addDiscountCode () {
      let arr = []
      this.goodsinfo.forEach(val => {
        let obj = {
          buynum: val.buynum,
          mixid: val.mixid,
          price: val.price
        }
        arr.push(obj)
      })
      if (this.savedAddressInformation.length > 0) {
        if (!this.discountCode) {
          return
        }
        // 判断有没添加地址
        let res = await applydiscount({
          code: this.discountCode,
          goods: arr,
          email: this.editAdressForm.email,
          shipping: this.shipping,
          country: this.editAdressForm.country
        })
        messageAlert(res)
        if (res.data.code === 1) {
          this.discountAddedSuccessfully = true
          this.discount_amount = res.data.data
          this.addedSuccessfullyDiscountCode = this.discountCode
          let goodsinfo = []
          this.goodsinfo.forEach(val => {
            let data = {
              productid: val.productid, // 产品id
              attrpid: val.attrpid, // 多属性id
              price: val.price, // 产品价钱
              weight: val.weight, // 产品重量
              buynum: val.buynum
            }
            goodsinfo.push(data)
          })
          let res2 = await countship({
            goodsinfo: goodsinfo,
            country: this.editAdressForm.country,
            state: this.editAdressForm.province,
            city: this.editAdressForm.city,
            discount_amount: this.auto_discount_amount, // 折扣价钱
            code: this.discountCode
          })
          this.shipping = res2.data.data.shipping
          this.tax = res2.data.data.tax
        }
      } else {
        this.$message(this.$t('submitOrderFive.indexContent.text4'))
      }
    },
    // 打开模态框 收货地址
    openMoTai () {
      this.editAdressDialogVisible = true
      this.editAdressForm = {
        name: '', // 收货人姓名
        lastname: '', // 英文姓
        firstname: '', // 英文名
        zipcode: '', // 邮编号码
        address: '', // 地址详情
        phone: '', // 电话号码
        email: '', // 邮箱
        NumPhone: areaCode, // 区号
        code: 86,
        country: '', // 国家
        province: '', // 省/州
        city: '' // 城市
      }
    },
    // 手动点击提交
    handleClose () {
      if (this.judgeClose === false) {
        this.MuldialogVisibleCode = false
      } else {
        this.$message(this.$t('submitOrderFive.hint.text1'))
        this.MuldialogVisibleCode = true
      }
    },
    // 保存地址信息
    saveAdressInfo (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.addressOperationBtnLoading = true
          let goodsinfo = []
          this.goodsinfo.forEach(val => {
            let data = {
              productid: val.productid, // 产品id
              attrpid: val.attrpid, // 多属性id
              price: val.price, // 产品价钱
              weight: val.weight, // 产品重量
              buynum: val.buynum
            }
            goodsinfo.push(data)
          })
          let res = await countship({
            goodsinfo: goodsinfo,
            country: this.editAdressForm.country,
            state: this.editAdressForm.province,
            city: this.editAdressForm.city,
            discount_amount: this.auto_discount_amount, // 折扣价钱
            code: this.discountCode // 输入的折扣码
          })
          if (res.data.code === 1) {
            this.shipping = res.data.data.shipping
            this.tax = res.data.data.tax
            this.savedAddressInformation[0] = this.editAdressForm
            this.editAdressDialogVisible = false
            this.$message.success(this.$t('submitOrderFive.hint.text12'))
            this.addressOperationBtnLoading = false
          } else {
            this.$message(res.data.msg)
          }
        }
      })
    },
    // stripe支付
    createCrad () {
      var that = this
      var stripe = Stripe(that.stripe_api_key)
      var elements = stripe.elements()
      var style = {
        base: {
          fontSize: '16px',
          color: '#32325d'
        }
      }
      // Create an instance of the card Element.
      var card = elements.create('card', { style: style })
      // Add an instance of the card Element into the `card-element` <div>.
      card.mount('#card-element')
      var form = document.getElementById('payment-form')
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        stripe.createToken(card).then(function (result) {
          if (result.error) {
            var errorElement = document.getElementById('card-errors')
            errorElement.textContent = result.error.message
          } else {
            that.judgeClose = true
            that.regHide = true
            stripeTokenHandler(result.token)
          }
        })
      })

      function stripeTokenHandler (token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form')
        var hiddenInput = document.createElement('input')
        hiddenInput.setAttribute('type', 'hidden')
        hiddenInput.setAttribute('name', 'stripeToken')
        hiddenInput.setAttribute('value', token.id)
        form.appendChild(hiddenInput)
        let obj = {
          stripeToken: token.id,
          tax: that.tax,
          shipping: that.shipping,
          money: that.netTotalPrice
        }
        that.getObj = obj
        if (that.$route.query.shopCartGoods === undefined) {
          // console.log('直接购买')
          that.postOutright()
        } else {
          // console.log('购物车购买')
          that.postMoney()
        }
      }
    },
    // stripe付款界面
    postShowpay () {
      let Arr = []
      this.goodsinfo.forEach(item => {
        Arr.push(item.mixid)
      })
      submitorder({
        mixid: Arr
      })
        .then(resp => {
          if (resp.data.code === 1) {
            this.stripe_api_key = resp.data.data.stripe_api_key
            this.MuldialogVisibleCode = true
            clearInterval(this.timer)
            this.timer = setTimeout(() => {
              this.createCrad()
            }, 500)
          } else {
            this.$message(resp.data.msg)
            return false
          }
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 支付请求
    postMoney () {
      let Arr = []
      this.goodsinfo.forEach(item => {
        Arr.push(item.mixid)
      })
      if (this.paymethod === 3) {
        this.getObj = {
          stripeToken: 0,
          tax: this.tax,
          shipping: this.shipping,
          money: this.netTotalPrice
        }
      }
      paymoney({
        mixid: Arr,
        buytype: '',
        paymethod: this.paymethod, // 选择支付方式 paymethod值为1表示paypal支付,2为stripe支付,3为线下支付
        data: this.savedAddressInformation[0],
        obj: this.getObj,
        discount_amount: this.auto_discount_amount,
        discount_code: this.discountCode
      })
        .then(resp => {
          if (resp.data.code === 1) {
            this.$emit('getMessage', resp.data.data.cartnum)
            this.$router.push({
              path: '/subSuccessfullyFive/page5',
              query: {
                orderid: resp.data.data.orderid
              }
            })
            this.$message.success(resp.data.msg)
            this.judgeClose = false
            this.regHide = false
          } else {
            this.judgeClose = false
            this.regHide = false
            this.$message(resp.data.msg)
          }
        })
        .catch(err => {
          this.$message.error(err)
          this.judgeClose = false
          this.regHide = false
        })
    },
    // 直接购买请求
    postOutright () {
      this.loading = true
      let Arr = []
      this.goodsinfo.forEach(item => {
        Arr.push(item.mixid)
      })
      if (this.paymethod === 3) {
        this.getObj = {
          stripeToken: 0,
          tax: this.tax,
          shipping: this.shipping,
          money: this.netTotalPrice
        }
      }
      paymoney({
        mixid: Arr,
        buytype: 1,
        paymethod: this.paymethod, //
        data: this.savedAddressInformation[0],
        obj: this.getObj,
        discount_amount: this.auto_discount_amount,
        discount_code: this.discountCode
      })
        .then(resp => {
          if (resp.data.code === 1) {
            this.$emit('getMessage', resp.data.data.cartnum)
            this.$message.success(resp.data.msg)
            this.$router.push({
              path: '/subSuccessfullyFive/page5',
              query: {
                orderid: resp.data.data.orderid
              }
            })
            this.judgeClose = false
          } else {
            this.$message(resp.data.msg)
            this.judgeClose = false
          }
        })
        .catch(err => {
          this.$message.error(err)
          this.judgeClose = false
        })
    },
    // paypal支付
    paypalMoney () {
      let Arr = []
      this.goodsinfo.forEach(item => {
        Arr.push(item.mixid)
      })
      if (this.paymethod === 1) {
        this.getObj = {
          stripeToken: 0,
          tax: this.tax,
          shipping: this.shipping,
          money: this.netTotalPrice
        }
      }
      let buyType = 1
      if (this.$route.query.shopCartGoods === undefined) {
        buyType = 1
      } else {
        buyType = ''
      }
      showpaypalmoney({
        mixid: Arr,
        buytype: buyType,
        paymethod: this.paymethod, // 选择支付方式 paymethod值为1表示paypal支付,2为stripe支付,3为线下支付
        data: this.savedAddressInformation[0],
        obj: this.getObj,
        discount_amount: this.auto_discount_amount,
        discount_code: this.discountCode
      }).then(resp => {
        window.location.href = resp.data.data
      })
    },
    // 点击支付跳转
    tiaozhuan (num) {
      if (num === 1) {
        this.paymethod = 1
        this.paypalMoney()
      } else if (num === 2) {
        this.paymethod = 2
        this.postShowpay()
      } else {
        this.paymethod = 3
        if (this.$route.query.shopCartGoods === undefined) {
          this.postOutright()
        } else {
          this.postMoney()
        }
      }
      // this.MuldialogVisibleCode = true
    },
    // 提交订单
    submitOrders () {
      // 判断是否勾选
      if (this.savedAddressInformation.length > 0) {
        // 判断有没添加地址
        if (this.$route.query.buynow) {
          // 判断是否是立即购买
          this.drawer = true
        } else {
          this.drawer = true
        }
      } else {
        this.$message(this.$t('submitOrderFive.hint.text2'))
      }
    },
    // 删除当前地址
    delSite () {
      this.$confirm(
        this.$t('submitOrderFive.hint.text5'),
        this.$t('submitOrderFive.hint.text6'),
        {
          confirmButtonText: this.$t('submitOrderFive.hint.text7'),
          cancelButtonText: this.$t('submitOrderFive.hint.text8'),
          type: 'warning'
        }
      ).then(() => {
        this.savedAddressInformation = []
        this.$message.success(this.$t('submitOrderFive.hint.text9'))
      })
    }
    // 设置为默认地址
    // SetDefault (item) {
    //   setdefault({
    //     index: item.index
    //   }).then(resp => {
    //     this.savedAddressInformation = resp.data.data
    //     this.$message.success(resp.data.msg)
    //   })
    // },
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  watch: {
    editAdressDialogVisible: {
      async handler (val) {
        if (val && !this.optionalAddressInformation.length) {
          let res = await lookarea()
          console.log(res)
          this.optionalAddressInformation = res.data.data
          this.adressLoading = false
        }
      }
    },
    'editAdressForm.country': function () {
      this.optionalAddressInformation.forEach((item, index) => {
        if (this.editAdressForm.country === item.id) {
          this.provinceArr = this.optionalAddressInformation[index].child
          this.editAdressForm.province = this.optionalAddressInformation[index].child[0].id
        }
      })
    },
    'editAdressForm.province': function () {
      this.provinceArr.forEach((item, index) => {
        if (this.editAdressForm.province === item.id) {
          this.cityArr = this.provinceArr[index].child
          this.editAdressForm.city = this.provinceArr[index].child[0].id
        }
      })
    }
  },
  computed: {
    totalGoodsNum () {
      let num = 0
      this.goodsinfo.forEach(item => {
        console.log(item.buynum)
        num += parseInt(item.buynum)
      })
      return num
    },
    netTotalPrice () {
      let totalPrice = 0
      this.goodsinfo.forEach(item => {
        totalPrice += parseFloat(item.price) * parseInt(item.buynum)
      })
      let net
      if (this.auto_discount_amount) {
        net = totalPrice - this.tax - this.shipping - this.auto_discount_amount
      } else if (this.discountAddedSuccessfully) {
        net = totalPrice - this.tax - this.shipping - this.discount_amount
      } else {
        net = totalPrice - this.tax - this.shipping
      }

      return net
    }
  },
  mounted: function () {
    const oScript = document.createElement('script')
    oScript.type = 'text/javascript'
    oScript.src = 'https://js.stripe.com/v3/'
    document.body.appendChild(oScript)
  },
  async created () {
    if (this.$route.query.buynow) {
      // 从商品详情
      let res = await purchase(JSON.parse(this.$route.query.buynow))

      this.goodsinfo = res.data.data.goodsinfo
      console.log(res)
      this.auto_discount_amount = parseFloat(res.data.data.auto_discount)
      this.autoDiscount = res.data.data.discount_name
    }
    if (this.$route.query.shopCartGoods) {
      // 从购物车进入页面
      let res = await selectorder({
        mixid: JSON.parse(this.$route.query.shopCartGoods)
      })
      this.goodsinfo = res.data.data.goodsinfo
      console.log(res)
      this.auto_discount_amount = parseFloat(res.data.data.auto_discount)
      this.autoDiscount = res.data.data.discount_name
    }
  }
}
</script>
<style lang="less">
@import "../../common/css/elementCommon";
.el-col-8 {
  width: 70%;
}
.el-col-14 {
  width: 100%;
  margin-top: 20px;
}
.box {
  width: 100%;
  height: 4rem;
  background-color: aquamarine;
  position: absolute;
  bottom: 0;
}
.pay-Dialog {
  .el-dialog__body {
    overflow: inherit;
  }
  .buttonxianxia2 {
    border: none;
    width: 80px;
    height: 35px;
    margin-top: 20px;
    background-color: rgb(66, 103, 178);
    color: #ffffff;
    border-radius: 5px;
  }
  .buttonxianxia3 {
    border: none;
    width: 130px;
    height: 35px;
    margin-top: 20px;
    background-color: rgb(66, 103, 178);
    color: #ffffff;
    border-radius: 5px;
  }
}
</style>
<style scoped lang="less">
@import "../../common/css/common";
.el-p {
  text-align: center;
  color: red;
  margin-top: -28px;
  font-size: 18px;
}
.pbtn {
  text-align: center;
  border-top: 1px solid #cccccc;
  padding-top: 20px;
  padding-bottom: 5px;
  .button1 {
    border: none;
    background-color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 18px;
  }
  .button1:hover {
    border: none;
    background-color: transparent;
    outline: none;
  }
  .button2 {
    border: none;
    background-color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 18px;
  }
  .button2:hover {
    border: none;
    background-color: transparent;
    outline: none;
  }
  .button4 {
    border: none;
    background-color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 18px;
  }
  .button4:hover {
    border: none;
    background-color: transparent;
    outline: none;
  }
}
.pbtn1 {
  text-align: center;
  border-top: 5px solid #cccccc;
  padding-top: 20px;
  .button3:hover {
    border: none;
    background-color: transparent;
    outline: none;
  }
  .button3 {
    border: none;
    background-color: #ffffff;
    text-align: center;
    display: inline-block;
    font-size: 18px;
  }
}
.trolley {
  margin: 0 auto 70px auto;
  .trolley-header {
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
  }
  .c-savedAddressInformation {
    margin-bottom: 25px;
    .order-h3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      height: 40px;
      margin: 0 0 0 12px;
      span:nth-child(1) {
        color: #4267b2;
      }
    }
    .savedAddressInformation-box {
      position: relative;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 25px 0px rgba(204, 204, 204, 0.65);
      border-radius: 6px;
      padding: 12px;
      padding-left: 50px;
      .icon-dizhi {
        font-size: 20px;
        position: absolute;
        top: 25px;
        left: 15px;
      }
      .list-one {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .list-two {
        line-height: 20px;
      }
      .list-three {
        color: #6699ff;
        text-align: right;
        .siteSpan {
          margin-right: 15px;
        }
      }
    }
  }
  .trolley-table {
    position: relative;
    .shopping-cart-table {
      /deep/ td {
        text-align: center;
      }
      th:nth-child(6) {
        color: #fda506;
      }
      .goods-information {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          border: 1px solid #d5d5d5;
          flex-shrink: 0;
        }
        .goods-information-right {
          padding: 0 15px;
          flex-grow: 1;
          text-align: left;
          .goods-name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .num-and-price {
            display: flex;
            justify-content: space-between;
            .price {
              padding-left: 20px;
            }
          }
        }
      }
    }
    .sub-footer {
      margin: 10px 0;
      width: 100%;
      background-color: #f8f8f8;
      padding: 8px 0;
      p {
        .flexCss;
        justify-content: space-between;
        padding: 6px 20px;
      }
    }
    .c-discount-operation {
      padding-right: 20px;
      text-align: right;
      /deep/ .el-input {
        width: 150px;
        margin-right: 20px;
      }
    }
    .bottom-operation {
      box-shadow: 0px -1px 2px 0px rgba(87, 85, 82, 0.1);
      position: fixed;
      z-index: 1000;
      width: calc(100%- 25px);
      bottom: 0;
      background: rgba(255, 255, 255, 1);
      padding-left: 25px;
      height: 49px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .right {
        height: 100%;
        .el-button {
          height: 100%;
          border-radius: 0px;
        }
        .sumPrice {
          color: #4267b2;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  // 编辑地址模态窗
  .adress-modal {
    /deep/ .el-dialog {
      margin-top: 5vh !important;
    }
    .body-loading {
      height: 400px;
      overflow: hidden;
    }
    .site-box {
      .el-form {
        .el-form-item {
          margin-bottom: 40px;
        }
        .adress-div {
          margin-bottom: 40px;
          margin-top: -20px;
          padding-left: 100px;
        }
      }
    }
  }
}
.noOrder {
  .flexCss;
  flex-direction: column;
  margin: 100px auto;
  p {
    font-size: 18px;
    letter-spacing: 2px;
    color: black;
  }
}
.register-tishi {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.59);
  color: white;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 6.875rem;
  font-size: 16px;
  border-radius: 6px;
  text-align: center;
  height: 50px;
}
#payment-form {
  position: relative;
  .confirmMoney {
    position: absolute;
    right: 20px;
    bottom: -90px;
    height: 40px;
    width: 98px;
    opacity: 0;
    cursor: pointer;
    background: #4267b2;
    border: none;
    border-radius: 4px;
    color: white;
  }
  .confirmMoney2 {
    .confirmMoney;
    width: 176px;
  }
}
.flexCss {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sumNum {
  font-size: 20px;
  color: black;
}

.add-diZhi {
  color: #4267b2;
  cursor: pointer;
  font-size: 22px;
  text-decoration: underline;
}
.order-li {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 16px;
  padding: 10px 20px;
  margin-top: 6px;
  > div {
    padding: 6px 0;
    .flexBetween;
    > span {
      cursor: pointer;
    }
  }
}
.order-li:hover .morenSpan {
  opacity: 1;
}
</style>
