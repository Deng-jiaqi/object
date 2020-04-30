<template>
  <div class="c-createTransportData">
    <div class="c-top">
      <span class="title">{{$t('lang.createTransportData.text1')}}</span>
      <span class="back" @click="back">
        <span class="iconfont icon-fanhui1"></span>
        {{$t('lang.createTransportData.text2')}}
      </span>
    </div>
    <!-- 错误提示框 -->
    <div class="c-error-messagebox" id="errorbox">
      <div class="error-messagebox" v-show="errorMessageList.length>0">
        <p class="error-messagebox-title">{{$t('lang.managementFeeRate.text79')}}</p>
        <ul>
          <li class="error-messagebox-error" v-for="(item,index) in errorMessageList" :key="index">
            <span class="error-messagebox-circle"></span>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 名称 -->
    <div class="box-name">
      <p class="text1">{{$t('lang.createTransportData.text3')}}</p>
      <el-input :placeholder="$t('lang.createTransportData.text4')" v-model="nameOfTransportData"></el-input>
      <p class="text2">{{$t('lang.createTransportData.text5')}}</p>
    </div>
    <!-- 添加产品 -->
    <div class="box-addproduct">
      <p class="text1">{{$t('lang.createTransportData.text6')}}</p>
      <div class="c-search">
        <el-input
          v-model="transport_search_specificProducts"
          :placeholder="$t('lang.createTransportData.text7')"
        ></el-input>
        <button
          v-preventReClick
          @click="browseSpecificProduct('createTransportData')"
        >{{$t('lang.createTransportData.text8')}}</button>
      </div>
      <SpecificProduct :data="cre_transportdata_selectedSpecificProducts" />
      <div class="none" v-show="!cre_transportdata_selectedSpecificProducts">
        <p class="text1">{{$t('lang.createTransportData.text9')}}</p>
        <p class="text2">{{$t('lang.createTransportData.text10')}}</p>
      </div>
    </div>
    <!-- 发货地址 -->
    <div class="box-shipping-adress">
      <div class="top">
        <p class="title">
          <span>{{$t('lang.createTransportData.text11')}}</span>
          <span
            class="addWarehouse"
            v-show="canAddWarehouse.length>0"
            @click="openAddWarehouseModal"
          >{{$t('lang.createTransportData.text12')}}</span>
        </p>
        <div
          :style="addressInfoVisible?{'minHeight':'100px'}:''"
          class="c-adress-infos"
          v-loading="addressInfoVisible"
        >
          <div class="c-adress-info" v-for="(item,index) in deliveryWarehouse" :key="index">
            <div
              class="adress-info"
            >{{item.country}} {{item.province}} {{item.city}} {{item.address}} {{item.name}}</div>
            <div
              class="management"
              @click="openWarehouseManagementModal(item)"
            >{{$t('lang.createTransportData.text13')}}</div>
          </div>
          <p
            v-show="!deliveryWarehouse.length>0"
            class="none-deliveryWarehouse"
          >{{$t('lang.createTransportData.text14')}}</p>
        </div>
      </div>
      <div class="btm" v-show="deliveryWarehouse.length>0">
        <div class="text1">
          <span class="title">{{$t('lang.createTransportData.text15')}}</span>
          <span
            class="create"
            @click="openDistributionArea"
          >{{$t('lang.createTransportData.text16')}}</span>
        </div>
        <!-- 配送区域 -->
        <ul class="distributionAreaList">
          <li
            class="c-distributionArea"
            v-for="(item,index) in selectedDistributionArea"
            :key="index"
          >
            <div class="line"></div>
            <div class="distribution-area">
              <div class="left">
                <img
                  class="area-img"
                  src="../../../../assets/administratorPanel/setting/area.svg"
                  alt
                />
                <div class="distribution-area-text">
                  <p class="name">{{item.name}}</p>
                  <p class="area" v-show="$i18n.locale==='zh-cn'">
                    <span v-for="(itemTwo,indexTwo) in item.zhCountryName" :key="indexTwo">
                      <span>{{itemTwo}}</span>&nbsp;&nbsp;
                    </span>
                  </p>
                  <p class="area" v-show="$i18n.locale==='en-us'">
                    <span v-for="(itemThree,indexThree) in item.enCountryName" :key="indexThree">
                      <span>{{itemThree}}</span>&nbsp;&nbsp;
                    </span>
                  </p>
                </div>
              </div>
              <el-popover :ref="'distributionAreaPopover-'+index" placement="bottom">
                <ul class="c-distribution-area-operation">
                  <li
                    @click="openEditDistributableArea(item,index)"
                  >{{$t('lang.createTransportData.text17')}}</li>
                  <li
                    @click="deleteDistributableArea(item,index)"
                  >{{$t('lang.createTransportData.text18')}}</li>
                </ul>
                <div class="right" slot="reference">
                  <span class="circle"></span>
                  <span class="circle"></span>
                  <span class="circle"></span>
                </div>
              </el-popover>
            </div>
            <!-- 税费表格 -->
            <table class="rate-table" v-show="item.list.length>0">
              <thead>
                <tr>
                  <th>{{$t('lang.createTransportData.text19')}}</th>
                  <th>{{$t('lang.createTransportData.text20')}}</th>
                  <th>{{$t('lang.createTransportData.text21')}}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itemTwo,indexTwo) in item.list" :key="indexTwo">
                  <td>{{itemTwo.rateName}}</td>
                  <td
                    v-show="itemTwo.type===1"
                  >{{itemTwo.minWeight}}{{$t('lang.createTransportData.text22')}} —— {{itemTwo.maxWeight}}{{$t('lang.createTransportData.text22')}}</td>
                  <td v-show="itemTwo.type===2">$ {{itemTwo.minPrice}} —— $ {{itemTwo.maxPrice}}</td>
                  <td v-show="!itemTwo.type">{{$t('lang.createTransportData.text23')}}</td>
                  <td v-show="itemTwo.cost">{{itemTwo.cost}}</td>
                  <td v-show="!itemTwo.cost">{{$t('lang.createTransportData.text24')}}</td>
                  <td>
                    <el-popover :ref="'ratePopover-' + index + indexTwo" placement="bottom">
                      <ul class="c-rate-operation">
                        <li
                          @click="openFixRate(itemTwo,indexTwo,index)"
                        >{{$t('lang.createTransportData.text25')}}</li>
                        <li
                          @click="deleteRate(itemTwo,index,indexTwo)"
                        >{{$t('lang.createTransportData.text26')}}</li>
                      </ul>
                      <div class="c-circle" slot="reference">
                        <span class="circle"></span>
                        <span class="circle"></span>
                        <span class="circle"></span>
                      </div>
                    </el-popover>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="tip" v-show="!item.list.length>0">{{$t('lang.createTransportData.text27')}}</p>
            <div class="c-btn">
              <el-button
                plain
                @click="openAddFreight(index)"
              >{{$t('lang.createTransportData.text28')}}</el-button>
            </div>
          </li>
        </ul>
        <div class="none" v-show="!selectedDistributionArea.length>0">
          <p class="tip1">{{$t('lang.createTransportData.text29')}}</p>
          <p class="tip2">{{$t('lang.createTransportData.text30')}}</p>
        </div>
      </div>
    </div>
    <!-- 保存取消按钮 -->
    <div class="btn-save-cancel">
      <el-button plain @click="cancel">{{$t('lang.createTransportData.text31')}}</el-button>
      <el-button type="primary" @click="save">{{$t('lang.createTransportData.text32')}}</el-button>
    </div>
    <!-- 特定产品模态窗 -->
    <SpecificProductModalWindow ref="specificProductModalWindow" />
    <!-- 多属性编辑模态窗 -->
    <AttrModalWindow ref="attrModalWindow" />
    <!-- 移除特定仓库模态窗 -->
    <div class="modal modal-warehouse-management" v-if="inEditWarehouse">
      <el-dialog
        :title="$t('lang.createTransportData.text33')"
        :visible.sync="warehouseManagementVisible"
        width="36%"
      >
        <div class="content">
          <p class="title">{{$t('lang.createTransportData.text34')}}</p>
          <el-radio>{{$t('lang.createTransportData.text35')}} {{inEditWarehouse.city}} {{inEditWarehouse.address}} {{$t('lang.createTransportData.text36')}}</el-radio>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="warehouseManagementVisible = false"
          >{{$t('lang.createTransportData.text37')}}</el-button>
          <el-button
            type="primary"
            @click="removeWarehouse"
          >{{$t('lang.createTransportData.text38')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 新增仓库模态窗 -->
    <div class="modal modal-warehouse-add">
      <el-dialog
        :title="$t('lang.createTransportData.text39')"
        :visible.sync="warehouseAddVisible"
        width="36%"
      >
        <div class="content">
          <p class="title">{{$t('lang.createTransportData.text40')}}</p>
          <ul>
            <li class="warehouse" v-for="(item,index) in canAddWarehouseOne" :key="index">
              <el-checkbox v-model="item.isSelect" />
              {{item.province}} {{item.city}} {{item.address}}
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="warehouseAddVisible = false"
          >{{$t('lang.createTransportData.text41')}}</el-button>
          <el-button type="primary" @click="addWarehouse">{{$t('lang.createTransportData.text42')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 创建或修改可配送区域模态窗 -->
    <div class="modal modal-distribution-area">
      <el-dialog
        :show-close="false"
        :title="status==='add'?$t('lang.createTransportData.text43'):$t('lang.createTransportData.text44')"
        :visible.sync="distributionAreaVisible"
        width="36%"
      >
        <div class="c-name">
          <p class="name">{{$t('lang.createTransportData.text45')}}</p>
          <el-input v-model="templateName"></el-input>
          <p class="tip">{{$t('lang.createTransportData.text46')}}</p>
        </div>
        <!-- <div class="c-search">
          <el-input :placeholder="'搜索国家和地区'"></el-input>
        </div>-->
        <ul class="c-area" v-loading="areaTableVisible">
          <li v-for="(item,index) in distributionArea" :key="index">
            <div class="country">
              <div class="left">
                <el-checkbox
                  :disabled="item.disable"
                  v-model="item.isSelect"
                  @change="countrySelectChange(index)"
                />
                <span class="country-name" v-show="$i18n.locale==='zh-cn'">{{item.area}}</span>
                <span class="country-name" v-show="$i18n.locale==='en-us'">{{item.en_area}}</span>
                <span
                  class="in-other"
                  v-show="item.disable"
                >{{$t('lang.createTransportData.text47')}}</span>
              </div>
              <div class="right" @click="showProvice(index)">
                <span class="iconfont icon-jiantouarrow483"></span>
              </div>
            </div>
            <div v-if="proviceVisible[index]">
              <div class="provice" v-for="(itemTwo,indexTwo) in item.child" :key="indexTwo">
                <el-checkbox
                  :disabled="itemTwo.disable"
                  v-model="itemTwo.isSelect"
                  @change="proviceSelectChange(index)"
                />
                <span class="provice-name" v-show="$i18n.locale==='zh-cn'">{{itemTwo.area}}</span>
                <span class="provice-name" v-show="$i18n.locale==='en-us'">{{itemTwo.en_area}}</span>
                <span
                  class="in-other"
                  v-show="itemTwo.disable"
                >{{$t('lang.createTransportData.text48')}}</span>
              </div>
            </div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="distributionAreaVisible = false"
          >{{$t('lang.createTransportData.text49')}}</el-button>
          <el-button
            type="primary"
            @click="CreateFixDeliverableAreas"
          >{{$t('lang.createTransportData.text50')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加或者修改运费模态窗 -->
    <div class="modal modal-add-freight">
      <el-dialog
        :title="this.status==='add'?$t('lang.createTransportData.text51'):$t('lang.createTransportData.text52')"
        :visible.sync="addFreightVisible"
        width="36%"
      >
        <el-form :model="freight" :rules="freightRule" ref="form_freight">
          <div class="type-choose">
            <div>
              <el-radio>{{$t('lang.createTransportData.text53')}}</el-radio>
            </div>
          </div>
          <div class="c-rate">
            <div class="name-and-cost">
              <el-form-item class="left" prop="rateName">
                <p class="lable">{{$t('lang.createTransportData.text54')}}</p>
                <el-input v-model="freight.rateName"></el-input>
              </el-form-item>
              <el-form-item class="right" prop="rateCost">
                <p class="lable">{{$t('lang.createTransportData.text55')}}</p>
                <div class="c-price-input">
                  <span class="dollor">$</span>
                  <el-input v-model="freight.rateCost"></el-input>
                </div>
              </el-form-item>
            </div>
            <p class="tip">{{$t('lang.createTransportData.text56')}}</p>
            <div
              class="condition"
              @click="addConditionVisible=true"
              v-show="!addConditionVisible"
            >{{$t('lang.createTransportData.text57')}}</div>
            <div
              class="condition"
              @click="addConditionVisible=false"
              v-show="addConditionVisible"
            >{{$t('lang.createTransportData.text58')}}</div>
            <div v-show="addConditionVisible">
              <div class="c-radio">
                <el-radio
                  v-model="typeofAddCondition"
                  :label="1"
                >{{$t('lang.createTransportData.text59')}}</el-radio>
              </div>
              <div class="c-radio c-radio-two">
                <el-radio
                  v-model="typeofAddCondition"
                  :label="2"
                >{{$t('lang.createTransportData.text60')}}</el-radio>
              </div>
              <div v-show="typeofAddCondition===1" class="maxweight-and-minWeight">
                <el-form-item class="left" prop="rateConditionMinWeight">
                  <p class="lable">{{$t('lang.createTransportData.text61')}}</p>
                  <div class="c-weight-input">
                    <span class="font">{{$t('lang.createTransportData.text63')}}</span>
                    <el-input v-model="freight.rateConditionMinWeight"></el-input>
                  </div>
                </el-form-item>
                <el-form-item class="right" prop="rateConditionMaxWeight">
                  <p class="lable">{{$t('lang.createTransportData.text62')}}</p>
                  <div class="c-weight-input">
                    <span class="font">{{$t('lang.createTransportData.text63')}}</span>
                    <el-input v-model="freight.rateConditionMaxWeight"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div v-show="typeofAddCondition===2" class="maxprice-and-minprice">
                <el-form-item class="left" prop="rateConditionMinPrice">
                  <p class="lable">{{$t('lang.createTransportData.text64')}}</p>
                  <div class="c-price-input">
                    <span class="dollor">$</span>
                    <el-input v-model="freight.rateConditionMinPrice"></el-input>
                  </div>
                </el-form-item>
                <el-form-item class="left" prop="rateConditionMaxPrice">
                  <p class="lable">{{$t('lang.createTransportData.text65')}}</p>
                  <div class="c-price-input">
                    <span class="dollor">$</span>
                    <el-input v-model="freight.rateConditionMaxPrice"></el-input>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="addFreightVisible = false"
          >{{$t('lang.createTransportData.text66')}}</el-button>
          <el-button
            type="primary"
            @click="determineAddOrFixFreight"
          >{{$t('lang.createTransportData.text67')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import SpecificProductModalWindow from '@/components/administratorPanel/discount/specificProductModalWindow'
import SpecificProduct from '@/components/administratorPanel/discount/specificProduct'
import AttrModalWindow from '@/components/administratorPanel/discount/attrModalWindow'
import { positiveNumberValidator } from '@/common/validator.js'
import {
  Slocation,
  lookarea,
  createTransportInformation
} from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
import { cloneDeep, isEqual } from 'lodash'
export default {
  components: {
    SpecificProductModalWindow,
    SpecificProduct,
    AttrModalWindow
  },
  data () {
    var validateWeight = (rule, value, callback) => {
      if (this.addConditionVisible) {
        if (this.typeofAddCondition === 1) {
          const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
          if (!reg.test(value)) {
            callback(new Error(this.$t('lang.validate.text11')))
          } else {
            callback()
          }
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validatePrice = (rule, value, callback) => {
      if (this.addConditionVisible) {
        if (this.typeofAddCondition === 2) {
          const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
          if (!reg.test(value)) {
            callback(new Error(this.$t('lang.validate.text11')))
          } else {
            callback()
          }
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      freightRule: {
        rateName: [
          { required: true, message: this.$t('lang.managementFeeRate.text85'), trigger: 'blur' },
          { max: 20, message: this.$t('lang.managementFeeRate.text86'), trigger: 'blur' }
        ],
        rateCost: [
          { validator: positiveNumberValidator, trigger: 'blur' }
        ],
        rateConditionMinWeight: [
          { validator: validateWeight, trigger: 'blur' }
        ],
        rateConditionMaxWeight: [
          { validator: validateWeight, trigger: 'blur' }
        ],
        rateConditionMinPrice: [
          { validator: validatePrice, trigger: 'blur' }
        ],
        rateConditionMaxPrice: [
          { validator: validatePrice, trigger: 'blur' }
        ]
      },
      // 变量
      isdefault: false,
      nameOfTransportData: null,
      inEditWarehouse: null, // 在编辑的仓库
      templateName: null,
      indexofinEditSelectedDistributionArea: null, // 正在编辑的资料的下标
      indexofRateList: null, // 费率列表的下标
      status: 'add', // 是在添加还是修改
      typeofAddCondition: 1,
      transport_search_specificProducts: null,
      // 运费
      freight: {
        rateName: null,
        rateCost: null,
        rateConditionMinWeight: null,
        rateConditionMaxWeight: null,
        rateConditionMinPrice: null,
        rateConditionMaxPrice: null
      },
      // data
      errorMessageList: [],
      deliveryWarehouse: [], // 显示的仓库
      originalDeliveryWarehouse: [], // 所有的仓库
      canAddWarehouseOne: null, // 可新增的仓库  computed的v-model不能用,
      originalDistributionArea: null,
      distributionArea: null, // 国家省份
      selectedDistributionArea: [],
      IdSelectedCountryArr: [], // 已经选中国家的id   (disable时候使用)
      AllIdSelectedProviceArr: [], // 所有已经选中的省份包括选中国家时候  (disable时候使用)
      itemCountryArr: null, // 要编辑区域的所有国家id数组
      itemStateArr: null, // 要编辑区域的所有省份id数组
      itemStateArr_clone: null,
      // ui
      warehouseManagementVisible: false,
      warehouseAddVisible: false,
      distributionAreaVisible: false,
      proviceVisible: [], // 开关省份,
      addFreightVisible: false,
      addConditionVisible: false,
      addressInfoVisible: false,
      areaTableVisible: false
    }
  },
  computed: {
    // 可新增的仓库
    canAddWarehouse () {
      let arr = [] // 显示的仓库的id的数组
      this.deliveryWarehouse.forEach(item => {
        arr.push(item.Id)
      })
      let arr2 = [] // 已经删除了的
      this.originalDeliveryWarehouse.forEach(itemTwo => {
        if (arr.indexOf(itemTwo.Id) === -1) {
          itemTwo.isSelect = true
          arr2.push(itemTwo)
        }
      })
      return arr2
    },
    ...mapState(['cre_transportdata_selectedSpecificProducts'])
  },
  watch: {
    canAddWarehouse () {
      console.log(12345)
      this.canAddWarehouseOne = cloneDeep(this.canAddWarehouse)
    },
    transport_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.transport_search_specificProducts)
          this.transport_search_specificProducts = ''
          this.forClickTime('createTransportData')
        }
      }
    }
  },
  methods: {
    saveValidate () {
      let errNumber = 0
      // 非默认运输资料时候的验证
      if (!this.nameOfTransportData) {
        this.errorMessageList.push(this.$t('lang.managementFeeRate.text80'))
        errNumber += 1
      }
      if (!this.cre_transportdata_selectedSpecificProducts) {
        this.errorMessageList.push(this.$t('lang.managementFeeRate.text81'))
        errNumber += 1
      }
      if (!this.deliveryWarehouse.length) {
        this.errorMessageList.push(this.$t('lang.managementFeeRate.text82'))
        errNumber += 1
      }
      return errNumber
    },
    async save () {
      this.errorMessageList = []
      let errNumber = this.saveValidate()
      if (errNumber) {
        document
          .getElementById('errorbox')
          .scrollIntoView({ block: 'start', behavior: 'smooth' })
        return
      }
      let sendData = {}
      sendData.disName = this.nameOfTransportData
      sendData.defalut = 2 // ????????/
      sendData.type = 1 // 设置自己的运费
      // 有仓库的时候
      if (this.deliveryWarehouse.length > 0) {
        let warehouseId = []
        this.deliveryWarehouse.forEach(item => {
          warehouseId.push(item.Id)
        })
        sendData.address = warehouseId.toString()
        // 有仓库才可以创建可配送区域
        if (this.selectedDistributionArea.length > 0) {
          console.log(this.selectedDistributionArea)
          sendData.distributableArea = []
          this.selectedDistributionArea.forEach(item => {
            let area = {} // 可配送区域
            area.name = item.name
            area.area = '' // 市（暂时没有）
            // 国家
            if (item.country) {
              area.country = item.country
            }

            // 省份
            if (item.state) {
              area.state = item.state
            }
            // 有费率的时候
            if (item.list.length > 0) {
              area.list = []

              item.list.forEach(itemFour => {
                let rate = {}
                rate.rateName = itemFour.rateName
                rate.cost = itemFour.cost
                switch (itemFour.type) {
                  case 1:
                    rate.type = 1
                    rate.minWeight = parseFloat(itemFour.minWeight)
                    rate.maxWeight = parseFloat(itemFour.maxWeight)
                    break
                  case 2:
                    rate.type = 2
                    rate.minPrice = parseFloat(itemFour.minPrice)
                    rate.maxPrice = parseFloat(itemFour.maxPrice)
                    break
                  default:
                    break
                }
                area.list.push(rate)
              })
            }
            sendData.distributableArea.push(area)
          })
        }
      }
      if (this.cre_transportdata_selectedSpecificProducts.length > 0) {
        // 有产品时
        let productIdArr = []
        let attrIdArr = []
        this.cre_transportdata_selectedSpecificProducts.forEach(item => {
          productIdArr.push(item.productid)
          if (item.attrpid !== '0') {
            attrIdArr = attrIdArr.concat(item.attrpid.split(','))
          }
        })
        sendData.productid = productIdArr.toString()
        if (attrIdArr.length > 0) {
          sendData.attrpid = attrIdArr.toString()
        }
      }
      console.log(sendData)
      let res = await createTransportInformation(sendData)
      messageAlert(res)
      // let res = await addTransport(sendData)
      console.log(res)
      if (res.data.code === 1) {
        setTimeout(() => {
          this.$router.push({
            path: '/administratorPanel/settings/transport/managementFeeRate',
            query: {
              id: res.data.data.id,
              isdefault: res.data.data.default === 1
            }
          })
        }, 2000)
      }
    },
    back () {
      this.$router.go(-1)
    },
    openWarehouseManagementModal (item) {
      // 打开仓库管理
      console.log(item)
      this.inEditWarehouse = item
      this.warehouseManagementVisible = true
    },
    openAddWarehouseModal () {
      // 打开新增仓库
      this.warehouseAddVisible = true
      console.log(this.canAddWarehouse)
    },
    browseSpecificProduct (info) {
      // 查看特定产品
      console.log(info)
      this.forClickTime(info)
      this.$refs.specificProductModalWindow.modalWindowVisible = true
    },
    removeWarehouse () {
      // 移除仓库
      let newArr = []
      this.deliveryWarehouse.forEach(item => {
        if (item.Id !== this.inEditWarehouse.Id) {
          newArr.push(item)
        }
      })
      this.deliveryWarehouse = newArr
      this.warehouseManagementVisible = false
    },
    addWarehouse () {
      // 增加仓库
      this.canAddWarehouseOne.forEach(item => {
        if (item.isSelect === true) {
          this.deliveryWarehouse.push(item)
        }
      })
      this.warehouseAddVisible = false
    },
    showProvice (idx) {
      // 省份折叠面板
      this.$set(this.proviceVisible, idx, !this.proviceVisible[idx])
      console.log(this.proviceVisible)
    },
    async openDistributionArea () {
      // 打开创建可配送区域
      this.templateName = ''
      this.distributionAreaVisible = true
      this.status = 'add'
      if (!this.originalDistributionArea) {
        this.areaTableVisible = true
        let res = await lookarea()
        this.areaTableVisible = false
        console.log(res)
        res.data.data.forEach(item => {
          item.isSelect = false // 不先加false视图不更新
          if (item.child) {
            item.child.forEach(itemTwo => {
              itemTwo.isSelect = false
            })
          }
        })
        this.distributionArea = res.data.data
        this.originalDistributionArea = cloneDeep(res.data.data)
        this.distributionArea.forEach(() => {
          this.proviceVisible.push(false)
        })
      } else {
        this.distributionArea = cloneDeep(
          this.originalDistributionArea
        )
        this.addDisable()
        console.log(this.distributionArea)
      }
    },
    CreateFixDeliverableAreas () {
      if (!this.templateName) {
        this.$message.error(this.$t('lang.managementFeeRate.text83'))
        return
      }
      // 确定增加或修改可配送区域
      let enCountryName = [] // 展示的国家名字（包括只选择了部分省份）
      let zhCountryName = []
      let SelectedCountryArr = [] // 当前项选中了的国家
      let underSelectedCountryState = [] // 选中了国家下的省的数组
      let SelectedProviceArr = [] // 当前项选中了的省份
      this.distributionArea.forEach(item => {
        if (item.isSelect && !item.child) {
          // 国家被选中了，并且没有省份
          zhCountryName.push(item.area)
          enCountryName.push(item.en_area)
          SelectedCountryArr.push(item.id)
        }
        if (item.isSelect && item.child) {
          // 国家被选中了，并且有有省份
          let all = true // 是否选中了这个国家下的所有省份
          let lenth = item.child.length
          let selectedNum = 0
          item.child.forEach(itemThree => {
            if (itemThree.isSelect) {
              selectedNum += 1
            }
          })
          if (lenth !== selectedNum) {
            all = false
          }
          if (all) {
            // 选中了国家并且省份被选完了
            zhCountryName.push(item.area)
            enCountryName.push(item.en_area)
            SelectedCountryArr.push(item.id)
            item.child.forEach(itemFive => {
              underSelectedCountryState.push(itemFive.id)
            })
          } else {
            // 选中了国家但是因为之前有省份是disable,省份没有被选完
            zhCountryName.push(item.area)
            enCountryName.push(item.en_area)
            item.child.forEach(itemSix => {
              if (itemSix.isSelect) {
                SelectedProviceArr.push(itemSix.id)
              }
            })
          }
        }
        if (!item.isSelect && item.child) {
          let exist = false
          item.child.forEach(itemTwo => {
            if (itemTwo.isSelect) {
              exist = true
              SelectedProviceArr.push(itemTwo.id)
            }
          })
          if (exist) {
            // 国家没选中但是省份有选中的push到 展示的国家数组里面
            zhCountryName.push(item.area)
            enCountryName.push(item.en_area)
          }
        }
      })
      if (!SelectedCountryArr.length && !SelectedProviceArr.length) {
        this.$message.error(this.$t('lang.managementFeeRate.text84'))
        return
      }
      switch (this.status) {
        case 'add':
          this.selectedDistributionArea.push({
            name: this.templateName,
            zhCountryName: zhCountryName,
            enCountryName: enCountryName,
            country: SelectedCountryArr.toString(),
            underSelectedCountryState: underSelectedCountryState.toString(),
            state: SelectedProviceArr.toString(),
            list: []
          })
          break
        case 'fix':
          this.IdSelectedCountryArr = []
          this.AllIdSelectedProviceArr = []
          this.distributionArea.forEach(item => {
            if (item.disable) {
              this.IdSelectedCountryArr.push(item.id)
            }
            if (item.child) {
              item.child.forEach(itemTwo => {
                if (itemTwo.disable) {
                  this.AllIdSelectedProviceArr.push(itemTwo.id)
                }
              })
            }
          })
          // eslint-disable-next-line standard/computed-property-even-spacing
          this.selectedDistributionArea[
            this.indexofinEditSelectedDistributionArea
          ] = {
            name: this.templateName,
            zhCountryName: zhCountryName,
            enCountryName: enCountryName,
            country: SelectedCountryArr.toString(),
            underSelectedCountryState: underSelectedCountryState.toString(), // 全选国家下面的省的id的集合
            state: SelectedProviceArr.toString(),
            list: []
          }
          break
        default:
          break
      }
      this.IdSelectedCountryArr = this.IdSelectedCountryArr.concat(
        SelectedCountryArr
      )
      this.AllIdSelectedProviceArr = this.AllIdSelectedProviceArr.concat(
        SelectedProviceArr
      ).concat(underSelectedCountryState)
      this.distributionAreaVisible = false
    },
    countrySelectChange (index) {
      // 有child的选择时候全选与取消全选
      let item = this.distributionArea[index]
      console.log(item)
      if (item.child && item.isSelect) {
        item.child.forEach(itemTwo => {
          if (!itemTwo.disable) {
            itemTwo.isSelect = true
          }
        })
      }
      if (item.child && !item.isSelect) {
        item.child.forEach(itemThree => {
          itemThree.isSelect = false
        })
      }
    },
    proviceSelectChange (index) {
      // child的选项变化时,全选状态还是否存在
      console.log(index)
      let item = this.distributionArea[index]
      if (item.child) {
        let lenth = 0
        let number = 0
        item.child.forEach(itemTwo => {
          if (itemTwo.isSelect) {
            number += 1
          }
          if (!itemTwo.disable) {
            lenth += 1
          }
        })
        if (!item.isSelect && number === lenth) {
          item.isSelect = true
        }
        if (item.isSelect && number < lenth) {
          item.isSelect = false
        }
      }
    },
    openEditDistributableArea (item, index) {
      // 打开编辑区域
      console.log(item)
      this.indexofinEditSelectedDistributionArea = index
      this.templateName = item.name
      this.status = 'fix'
      this.distributionAreaVisible = true
      this.distributionArea = cloneDeep(
        this.originalDistributionArea
      )
      this.itemCountryArr = item.country.split(',').map(Number) // 要编辑区域的所有国家id数组
      this.itemStateArr = item.state.split(',').map(Number) // 要编辑区域的所有省份id数组

      // 增加disable
      this.addDisable()
      // 还原选中项
      console.log(this.itemStateArr)
      this.distributionArea.forEach(item => {
        if (this.itemCountryArr.indexOf(item.id) !== -1) {
          // 国家被选中了
          this.$set(item, 'isSelect', true)
          this.$set(item, 'disable', false)
          if (item.child) {
            item.child.forEach(itemTwo => {
              this.$set(itemTwo, 'isSelect', true)
              this.$set(itemTwo, 'disable', false)
            })
          }
        }
        if (this.itemCountryArr.indexOf(item.id) === -1 && item.child) {
          // 国家没被选中，省呗选中了
          let disableLenth = 0
          item.child.forEach(itemThree => {
            if (this.itemStateArr.indexOf(itemThree.id) !== -1) {
              this.$set(itemThree, 'isSelect', true)
              this.$set(itemThree, 'disable', false)
            }
          })
          item.child.forEach(itemFour => {
            if (itemFour.disable) {
              disableLenth += 1
            }
          })
          if (this.itemStateArr.length + disableLenth === item.child.length) {
            this.$set(item, 'isSelect', true)
            this.$set(item, 'disable', false)
          }
        }
      })
      console.log(this.distributionArea)
    },
    addDisable () {
      // 在其它资料中选中项加上disable属性
      // console.log(this.AllIdSelectedProviceArr)
      // console.log(this.IdSelectedCountryArr)
      this.distributionArea.forEach(item => {
        if (this.IdSelectedCountryArr.indexOf(item.id) !== -1) {
          this.$set(item, 'disable', true)
        } else {
          this.$set(item, 'disable', false)
        }
        if (item.child) {
          let lenth = item.child.length
          let disableNum = 0
          item.child.forEach(itemTwo => {
            if (this.AllIdSelectedProviceArr.indexOf(itemTwo.id) !== -1) {
              this.$set(itemTwo, 'disable', true)
              disableNum += 1
            } else {
              this.$set(itemTwo, 'disable', false)
            }
          })
          if (
            lenth === disableNum &&
            this.IdSelectedCountryArr.indexOf(item.id) === -1
          ) {
            // 前2个资料选的省占满1个国家，第三个编辑时候国家置为disable
            this.$set(item, 'disable', true)
          }
        }
      })
    },
    deleteDistributableArea (item, index) {
      // 删除可配送区域
      this.$refs[`distributionAreaPopover-` + index][0].doClose()
      let itemSelectedCountryArr = item.country.split(',').map(Number)
      let itemSelectedProviceArr = item.state
        .split(',')
        .map(Number)
        .concat(item.underSelectedCountryState.split(',').map(Number)) // 包括选择了国家下面的省份
      this.selectedDistributionArea = this.removeOfIndex(
        this.selectedDistributionArea,
        index
      )
      this.IdSelectedCountryArr = this.removeOfSame(
        this.IdSelectedCountryArr,
        itemSelectedCountryArr
      )
      this.AllIdSelectedProviceArr = this.removeOfSame(
        this.AllIdSelectedProviceArr,
        itemSelectedProviceArr
      )
    },
    openAddFreight (index) {
      // 打开添加费率模态窗
      this.status = 'add'
      this.freight.rateName = null
      this.freight.rateCost = null
      this.addConditionVisible = false
      this.typeofAddCondition = 1
      this.freight.rateConditionMinWeight = null
      this.freight.rateConditionMaxWeight = null
      this.freight.rateConditionMinPrice = null
      this.freight.rateConditionMaxPrice = null
      this.addFreightVisible = true
      console.log(index)
      this.indexofinEditSelectedDistributionArea = index
    },
    determineAddOrFixFreight () {
      this.$refs['form_freight'].validate((valid) => {
        if (valid) {
          // 确定添加或者修改费率
          let obj = {} // 运费对象
          obj.rateName = this.freight.rateName
          obj.cost = this.freight.rateCost
          if (this.addConditionVisible) {
            if (this.typeofAddCondition === 1) {
              obj.type = 1
              obj.minWeight = this.freight.rateConditionMinWeight
              obj.maxWeight = this.freight.rateConditionMaxWeight
            }
            if (this.typeofAddCondition === 2) {
              obj.type = 2
              obj.minPrice = this.freight.rateConditionMinPrice
              obj.maxPrice = this.freight.rateConditionMaxPrice
            }
          }
          switch (this.status) {
            case 'add':
              // eslint-disable-next-line standard/computed-property-even-spacing
              this.selectedDistributionArea[
                this.indexofinEditSelectedDistributionArea
              ].list.push(obj)
              break
            case 'fix':
              // eslint-disable-next-line standard/computed-property-even-spacing
              this.$set(
                // eslint-disable-next-line standard/computed-property-even-spacing
                this.selectedDistributionArea[
                  this.indexofinEditSelectedDistributionArea
                ].list,
                this.indexofRateList,
                obj
              )
              break
            default:
              break
          }
          console.log(this.selectedDistributionArea)
          // 还原数据
          this.freight.rateName = null
          this.freight.rateCost = null
          this.freight.rateConditionMinWeight = null
          this.freight.rateConditionMaxWeight = null
          this.freight.rateConditionMinPrice = null
          this.freight.rateConditionMaxPrice = null
          this.addConditionVisible = false
          this.addFreightVisible = false
        }
      })
    },
    deleteRate (itemTwo, index, indexTwo) {
      // 删除费率
      this.$refs[`ratePopover-` + index + indexTwo][0].doClose()
      this.selectedDistributionArea[index].list = this.removeOfIndex(
        this.selectedDistributionArea[index].list,
        indexTwo
      )
    },
    openFixRate (item, index, indexTwo) {
      // 打开编辑费率 index为在费率列表的下标，indexTwo是在可配送区域的下标
      console.log(item)
      this.status = 'fix'
      this.indexofinEditSelectedDistributionArea = indexTwo
      this.indexofRateList = index
      this.addFreightVisible = true
      this.freight.rateName = item.rateName
      this.freight.rateCost = item.cost
      if (item.type) {
        this.addConditionVisible = true
        this.typeofAddCondition = item.type
        switch (item.type) {
          case 1:
            this.freight.rateConditionMinWeight = item.minWeight
            this.freight.rateConditionMaxWeight = item.maxWeight
            break
          case 2:
            this.freight.rateConditionMinPrice = item.minPrice
            this.freight.rateConditionMaxPrice = item.maxPrice
            break
          default:
            break
        }
      }
    },
    removeOfIndex (arr, index) {
      // 根据下标删除数组的某一项
      let newArr = []
      arr.forEach((item, idx) => {
        if (index !== idx) {
          newArr.push(item)
        }
      })
      return newArr
    },
    removeOfSame (arr1, arr2) {
      // 取2个数组的不同的项
      let newArr = []
      arr1.forEach(item => {
        if (arr2.indexOf(item) === -1) {
          newArr.push(item)
        }
      })
      arr2.forEach(item => {
        if (arr1.indexOf(item) === -1) {
          newArr.push(item)
        }
      })
      return newArr
    },
    cancel () {
      this.$router.push({
        path: '/administratorPanel/settings/transport/shipping'
      })
    },
    ...mapMutations(['forClickTime']),
    ...mapMutations(['cre_transportdata_addSelectedSpecificProducts']),
    ...mapMutations(['forSpecific_modal_search'])
  },
  async created () {
    this.addressInfoVisible = true
    let res = await Slocation()
    this.addressInfoVisible = false
    console.log(res)
    this.deliveryWarehouse = res.data.data.use
    this.originalDeliveryWarehouse = res.data.data.use
    console.log(
      isEqual(
        this.deliveryWarehouse,
        this.originalDeliveryWarehouse
      )
    )
  },
  destroyed () {
    this.cre_transportdata_addSelectedSpecificProducts(null)
  }
}
</script>
<style lang="less" scoped>
.c-createTransportData {
  padding-top: 75px;
  padding-bottom: 75px;
  max-width: 729px;
  margin: auto;
  .c-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 31px;
    padding-right: 12px;
    .title {
      font-size: 30px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
    .back {
      font-size: 18px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      display: flex;
      align-items: center;
      cursor: pointer;
      .icon-fanhui1 {
        font-size: 14px;
      }
    }
  }
  .error-messagebox {
    padding: 19px;
    background: #fdf3f0;
    margin-bottom: 20px;
    border-top: 4px solid #de3618;
    .error-messagebox-title {
      font-weight: bold;
      font-size: 16px;
    }
    .error-messagebox-error {
      font-weight: bold;
      margin-top: 15px;
      display: flex;
      align-items: center;
      .error-messagebox-circle {
        display: inline-block;
        margin-right: 15px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: black;
      }
    }
  }
  .box-name {
    padding: 27px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    .text1 {
      margin-bottom: 21px;
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
    }
    .text2 {
      margin-top: 16px;
      font-size: 14px;
      color: rgba(107, 107, 107, 1);
    }
    /deep/ .el-input {
      width: 100%;
    }
    /deep/ .el-input__inner {
      height: 45px;
    }
  }
  .box-addproduct {
    padding: 29px 27px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    .text1 {
      margin-bottom: 21px;
    }
    .c-search {
      margin-bottom: 23px;
      button {
        width: 68px;
        height: 45px;
        border: 1px solid #dcdfe6;
        border-radius: 0px 4px 4px 0px;
        background: #fff;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-left: 0;
      }
      button:hover {
        background: linear-gradient(180deg, #f9fafb, #f4f6f8);
        border-color: #c4cdd5;
      }
      /deep/ .el-input {
        width: 78%;
      }
      /deep/ .el-input__inner {
        height: 45px;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }
    .none {
      background: rgba(245, 246, 248, 1);
      font-size: 14px;
      text-align: center;
      color: rgba(51, 51, 51, 1);
      padding-top: 24px;
      padding-bottom: 24px;
      .text1 {
        line-height: 30px;
      }
      .text2 {
        line-height: 30px;
      }
    }
  }
  .box-shipping-adress {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    .top {
      padding-top: 30px;
      padding-bottom: 52px;
      border-bottom: 1px solid rgba(210, 210, 210, 1);
      .title {
        padding-left: 29px;
        margin-bottom: 17px;
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
        display: flex;
        justify-content: space-between;
        padding-right: 29px;
        .addWarehouse {
          cursor: pointer;
          font-size: 14px;
          color: #4267b2;
        }
      }
      .c-adress-infos {
        .c-adress-info {
          padding-left: 29px;
          padding-right: 29px;
          display: flex;
          justify-content: space-between;
          .adress-info {
            font-size: 14px;
            color: rgba(137, 137, 137, 1);
            line-height: 40px;
            max-width: 80%;
          }
          .management {
            cursor: pointer;
            font-size: 14px;
            color: rgba(66, 103, 178, 1);
            line-height: 40px;
          }
        }
        .none-deliveryWarehouse {
          padding-left: 29px;
          padding-right: 29px;
        }
      }
    }
    .btm {
      padding: 15px 30px;
      .text1 {
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 16px;
          color: rgba(0, 0, 0, 1);
        }
        .create {
          font-size: 14px;
          cursor: pointer;
          color: rgba(66, 103, 178, 1);
        }
      }
      .distributionAreaList {
        .c-distributionArea {
          padding-bottom: 20px;
          position: relative;
          .line {
            position: absolute;
            bottom: 0;
            right: -29px;
            width: calc(100% + 58px);
            height: 1px;
            background-color: rgba(222, 222, 222, 1);
          }
          .distribution-area {
            display: flex;
            justify-content: space-between;
            height: 67px;
            align-items: center;
            padding-top: 20px;
            .left {
              position: relative;
              display: flex;
              align-items: center;
              img {
                width: 28.8px;
                height: 28.8px;
                margin-right: 10px;
              }
              .distribution-area-text {
                display: inline-block;
                .name {
                  margin-bottom: 5px;
                }
                .area {
                  max-width: 500px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
            }
            .right {
              cursor: pointer;
              .circle {
                width: 5px;
                height: 5px;
                background: rgba(149, 149, 149, 1);
                border-radius: 50%;
                display: inline-block;
                margin-left: 4px;
              }
            }
          }
          .rate-table {
            width: 100%;
            margin-top: 46px;
            border-collapse: collapse;
            thead {
              tr {
                height: 40px;
                th {
                  font-size: 14px;
                  color: rgba(0, 0, 0, 1);
                  border-bottom: 1px solid rgba(222, 222, 222, 1);
                }
                th:nth-child(1) {
                  width: 31.5%;
                  text-align: left;
                }
                th:nth-child(2) {
                  width: 32.3%;
                  text-align: left;
                }
                th:nth-child(3) {
                  width: 15.8%;
                  text-align: left;
                }
                th:nth-child(4) {
                  width: 14.3%;
                }
              }
            }
            tbody {
              tr {
                height: 70px;
                transition: background-color 0.25s ease;
              }
              tr:hover {
                background: #f9fafb;
              }
              .c-circle {
                cursor: pointer;
                .circle {
                  width: 5px;
                  height: 5px;
                  background: rgba(149, 149, 149, 1);
                  border-radius: 50%;
                  display: inline-block;
                  margin-left: 4px;
                }
              }
              td:nth-child(4) {
                padding-right: 20px;
              }
              td:last-child {
                text-align: center;
              }
            }
          }
          .tip {
            color: #8a6116;
            font-size: 14px;
            padding-left: 20px;
          }
          .c-btn {
            margin-top: 20px;
          }
        }
      }
      .none {
        background: rgba(245, 246, 248, 1);
        font-size: 14px;
        text-align: center;
        color: rgba(51, 51, 51, 1);
        padding-top: 24px;
        padding-bottom: 24px;
        .tip1 {
          line-height: 30px;
        }
        .tip2 {
          line-height: 30px;
        }
      }
    }
  }
  .btn-save-cancel {
    margin-top: 30px;
    text-align: right;
  }
}
p {
  margin: 0;
}
.modal {
  /deep/ .el-dialog {
    border-radius: 6px;
    margin-top: 25vh !important;
    min-width: 550px;
  }
  .el-dialog__wrapper /deep/ .el-dialog__header {
    font-weight: 400;
    border-bottom: 2px solid rgba(238, 238, 238, 1);
    .el-dialog__title {
      font-size: 20px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .el-dialog__wrapper /deep/ .el-dialog__body {
    padding: 0;
  }
  .btn-cancel {
    margin-right: 10px;
  }
}
.modal-warehouse-management {
  .content {
    padding: 22px 32px 19px 33px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 20px;
    .title {
      margin-bottom: 15px;
    }
  }
}
.modal-warehouse-add {
  .content {
    padding: 22px 32px 19px 33px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 20px;
    .title {
      margin-bottom: 15px;
    }
    .warehouse {
      margin-bottom: 15px;
    }
    // checkbox的样式修改
    .el-checkbox {
      margin-right: 6px;
    }
  }
}
.modal-distribution-area {
  /deep/ .el-dialog {
    margin-top: 10vh !important;
  }
  .c-name {
    padding: 22px 32px 19px 33px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 20px;
    .name {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 16px;
    }
    .tip {
      font-size: 14px;
      color: rgba(137, 137, 137, 1);
      margin-top: 16px;
    }
  }
  .c-search {
    padding: 22px 32px 19px 33px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 20px;
  }
  .c-area {
    height: 436px;
    overflow-y: auto;
    .country {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-left: 19px;
      padding-right: 33px;
      height: 86px;
      transition: background-color 0.25s ease;
      position: relative;
      .in-other {
        position: absolute;
        color: #637381;
        right: 54px;
      }
      .right {
        .icon-jiantouarrow483 {
          position: relative;
          top: -3px;
        }
      }
    }
    .country:hover {
      cursor: pointer;
      background-color: #f4f6f8;
    }
    .provice {
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      padding-left: 45px;
      padding-right: 39px;
      height: 40px;
      transition: background-color 0.25s ease;
      position: relative;
      .in-other {
        position: absolute;
        color: #637381;
        right: 54px;
      }
    }
    .provice:hover {
      cursor: pointer;
      background-color: #f4f6f8;
    }
  }
}
.modal-add-freight {
  color: rgba(51, 51, 51, 1);
  .type-choose {
    padding: 35px 25px 35px 25px;
    border-bottom: 1px solid rgba(210, 210, 210, 1);
  }
  .c-rate {
    padding: 30px 25px 30px 25px;
    .name-and-cost {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .maxweight-and-minWeight {
      display: flex;
      justify-content: space-between;
      .c-weight-input {
        position: relative;
        .font {
          position: absolute;
          right: 8px;
          top: 0px;
          z-index: 20;
        }
      }
    }
    .maxprice-and-minprice {
      display: flex;
      justify-content: space-between;
      .c-weight-input {
        position: relative;
        .font {
          position: absolute;
          right: 8px;
          top: 0px;
          z-index: 20;
        }
      }
    }
    .lable {
      margin-bottom: 10px;
    }
    .tip {
      margin-bottom: 15px;
    }
    .condition {
      cursor: pointer;
      color: #006fbb;
      margin-bottom: 20px;
    }
    .c-radio {
      margin-top: 10px;
    }
    .c-radio-two {
      margin-bottom: 10px;
    }
    .left {
      width: 45%;
    }
    .right {
      width: 45%;
    }
    .c-price-input {
      position: relative;
      .dollor {
        position: absolute;
        left: 10px;
        top: 0px;
        z-index: 20;
      }
      /deep/ .el-input__inner {
        padding-left: 25px;
      }
    }
  }
}
//
.el-popper {
  .c-distribution-area-operation {
    li {
      cursor: pointer;
      transition: background-color 0.25s ease;
      padding: 10px;
      text-align: center;
      line-height: 40px;
    }
    li:hover {
      background-color: #f9fafb;
    }
  }
}
.el-popper {
  .c-rate-operation {
    li {
      cursor: pointer;
      transition: background-color 0.25s ease;
      padding: 10px;
      text-align: center;
      line-height: 40px;
    }
    li:hover {
      background-color: #f9fafb;
    }
  }
}
.el-checkbox {
  margin-right: 6px;
}
ul {
  margin: 0;
}
</style>
