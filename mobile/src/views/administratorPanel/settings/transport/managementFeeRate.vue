<template>
  <div class="c-createTransportData" v-show="pageInitializationRequestEnd">
    <div class="c-top">
      <span @click="back" class="iconfont icon-fanhui1"></span>
      <span class="title">{{$t('lang.managementFeeRate.text1')}}</span>
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
    <div class="box-name" v-show="!isdefault">
      <p class="text1">{{$t('lang.managementFeeRate.text3')}}</p>
      <el-input :placeholder="$t('lang.managementFeeRate.text4')" v-model="nameOfTransportData"></el-input>
      <p class="text2">{{$t('lang.managementFeeRate.text5')}}</p>
    </div>
    <!-- 产品 -->
    <div class="box-product" v-show="isdefault">
      <div class="top">
        <p class="text1">{{$t('lang.managementFeeRate.text69')}}</p>
        <p class="text2">{{$t('lang.managementFeeRate.text70')}}</p>
        <p class="text3">{{$t('lang.managementFeeRate.text71')}}</p>
      </div>
      <ul class="c-product">
        <li class="product"></li>
      </ul>
      <div class="btm">
        {{$t('lang.managementFeeRate.text72')}}
        <router-link to>{{$t('lang.managementFeeRate.text73')}}</router-link>
        {{$t('lang.managementFeeRate.text74')}}
      </div>
    </div>
    <!-- 添加产品 -->
    <div class="box-addproduct" v-show="!isdefault">
      <p class="text1">{{$t('lang.managementFeeRate.text6')}}</p>
      <div class="c-search">
        <el-input
          v-model="transport_search_specificProducts"
          :placeholder="$t('lang.managementFeeRate.text7')"
        ></el-input>
        <button
          v-preventReClick
          @click="browseSpecificProduct('createTransportData')"
        >{{$t('lang.managementFeeRate.text8')}}</button>
      </div>
      <SpecificProduct
        v-show="cre_transportdata_selectedSpecificProducts"
        :data="cre_transportdata_selectedSpecificProducts"
      />
      <div class="none" v-show="!cre_transportdata_selectedSpecificProducts">
        <p class="text1">{{$t('lang.managementFeeRate.text9')}}</p>
        <p class="text2">{{$t('lang.managementFeeRate.text10')}}</p>
      </div>
    </div>
    <!-- 发货地址 -->
    <div class="box-shipping-adress">
      <div class="top">
        <p class="title">
          <span>{{$t('lang.managementFeeRate.text11')}}</span>
          <span
            class="addWarehouse"
            v-show="canAddWarehouse.length>0"
            @click="openAddWarehouseModal"
          >{{$t('lang.managementFeeRate.text12')}}</span>
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
            >{{$t('lang.managementFeeRate.text13')}}</div>
          </div>
          <p
            v-show="!deliveryWarehouse.length>0"
            class="none-deliveryWarehouse"
          >{{$t('lang.managementFeeRate.text14')}}</p>
        </div>
      </div>
      <div class="btm" v-show="deliveryWarehouse.length>0">
        <div class="text1">
          <span class="title">{{$t('lang.managementFeeRate.text15')}}</span>
          <span class="create" @click="openDistributionArea">{{$t('lang.managementFeeRate.text16')}}</span>
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
                  >{{$t('lang.managementFeeRate.text17')}}</li>
                  <li
                    @click="deleteDistributableArea(item,index)"
                  >{{$t('lang.managementFeeRate.text18')}}</li>
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
                  <th>{{$t('lang.managementFeeRate.text19')}}</th>
                  <th>{{$t('lang.managementFeeRate.text20')}}</th>
                  <th>{{$t('lang.managementFeeRate.text21')}}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itemTwo,indexTwo) in item.list" :key="indexTwo">
                  <td>{{itemTwo.rateName}}</td>
                  <td
                    v-show="itemTwo.type===1"
                  >{{itemTwo.minWeight}}{{$t('lang.managementFeeRate.text22')}} —— {{itemTwo.maxWeight}}{{$t('lang.managementFeeRate.text22')}}</td>
                  <td v-show="itemTwo.type===2">$ {{itemTwo.minPrice}} —— $ {{itemTwo.maxPrice}}</td>
                  <td v-show="!itemTwo.type">{{$t('lang.managementFeeRate.text23')}}</td>
                  <td v-show="itemTwo.cost">{{itemTwo.cost}}</td>
                  <td v-show="!itemTwo.cost">{{$t('lang.managementFeeRate.text24')}}</td>
                  <td>
                    <el-popover :ref="'ratePopover-' + index + indexTwo" placement="bottom">
                      <ul class="c-rate-operation">
                        <li
                          @click="openFixRate(itemTwo,indexTwo,index)"
                        >{{$t('lang.managementFeeRate.text25')}}</li>
                        <li
                          @click="deleteRate(itemTwo,index,indexTwo)"
                        >{{$t('lang.managementFeeRate.text26')}}</li>
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
            <p class="tip" v-show="!item.list.length>0">{{$t('lang.managementFeeRate.text27')}}</p>
            <div class="c-btn">
              <el-button
                plain
                @click="openAddFreight(index)"
              >{{$t('lang.managementFeeRate.text28')}}</el-button>
            </div>
          </li>
        </ul>
        <div class="none" v-show="!selectedDistributionArea.length>0">
          <p class="tip1">{{$t('lang.managementFeeRate.text29')}}</p>
          <p class="tip2">{{$t('lang.managementFeeRate.text30')}}</p>
        </div>
      </div>
    </div>
    <!-- 保存取消删除按钮 -->
    <div class="btn-save-cancel">
      <el-button
        v-show="!isdefault"
        class="btn-delete"
        type="danger"
        @click="deleteTransportVisible=true"
      >{{$t('lang.managementFeeRate.text68')}}</el-button>
      <el-button @click="cancel" plain>{{$t('lang.managementFeeRate.text31')}}</el-button>
      <el-button type="primary" @click="save">{{$t('lang.managementFeeRate.text32')}}</el-button>
    </div>
    <!-- 特定产品模态窗 -->
    <SpecificProductModalWindow ref="specificProductModalWindow" />
    <!-- 多属性编辑模态窗 -->
    <AttrModalWindow ref="attrModalWindow" />
    <!-- 移除特定仓库模态窗 -->
    <div class="modal modal-warehouse-management" v-if="inEditWarehouse">
      <el-dialog
        :title="$t('lang.managementFeeRate.text33')"
        :visible.sync="warehouseManagementVisible"
        width="100%"
      >
        <div class="content">
          <p class="title">{{$t('lang.managementFeeRate.text34')}}</p>
          <el-radio>{{$t('lang.managementFeeRate.text35')}} {{inEditWarehouse.city}} {{inEditWarehouse.address}} {{$t('lang.managementFeeRate.text36')}}</el-radio>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="warehouseManagementVisible=false"
          >{{$t('lang.managementFeeRate.text37')}}</el-button>
          <el-button type="primary" @click="removeWarehouse">{{$t('lang.managementFeeRate.text38')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 新增仓库模态窗 -->
    <div class="modal modal-warehouse-add">
      <el-dialog
        :title="$t('lang.managementFeeRate.text39')"
        :visible.sync="warehouseAddVisible"
        width="100%"
      >
        <div class="content">
          <p class="title">{{$t('lang.managementFeeRate.text40')}}</p>
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
            @click="warehouseAddVisible=false"
          >{{$t('lang.managementFeeRate.text41')}}</el-button>
          <el-button type="primary" @click="addWarehouse">{{$t('lang.managementFeeRate.text42')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 创建或修改可配送区域模态窗 -->
    <div class="modal modal-distribution-area">
      <el-dialog
        :title="status==='add'?$t('lang.managementFeeRate.text43'):$t('lang.managementFeeRate.text44')"
        :visible.sync="distributionAreaVisible"
        width="100%"
      >
        <div class="c-name">
          <p class="name">{{$t('lang.managementFeeRate.text45')}}</p>
          <el-input v-model="templateName"></el-input>
          <p class="tip">{{$t('lang.managementFeeRate.text46')}}</p>
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
                <span class="in-other" v-show="item.disable">{{$t('lang.managementFeeRate.text47')}}</span>
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
                >{{$t('lang.managementFeeRate.text48')}}</span>
              </div>
            </div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="distributionAreaVisible=false"
          >{{$t('lang.managementFeeRate.text49')}}</el-button>
          <el-button
            type="primary"
            @click="CreateFixDeliverableAreas"
          >{{$t('lang.managementFeeRate.text50')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加或者编辑运费模态窗 -->
    <div class="modal modal-add-freight">
      <el-dialog
        :title="this.status==='add'?$t('lang.createTransportData.text51'):$t('lang.createTransportData.text52')"
        :visible.sync="addFreightVisible"
        width="100%"
      >
        <el-form :model="freight" :rules="freightRule" ref="form_freight">
          <div class="type-choose">
            <div>
              <el-radio>{{$t('lang.managementFeeRate.text53')}}</el-radio>
            </div>
          </div>
          <div class="c-rate">
            <div class="name-and-cost">
              <el-form-item class="left" prop="rateName">
                <p class="lable">{{$t('lang.managementFeeRate.text54')}}</p>
                <el-input v-model="freight.rateName"></el-input>
              </el-form-item>
              <el-form-item class="right" prop="rateCost">
                <p class="lable">{{$t('lang.managementFeeRate.text55')}}</p>
                <div class="c-price-input">
                  <span class="dollor">$</span>
                  <el-input v-model="freight.rateCost"></el-input>
                </div>
              </el-form-item>
            </div>
            <p class="tip">{{$t('lang.managementFeeRate.text56')}}</p>
            <div
              class="condition"
              @click="addConditionVisible=true"
              v-show="!addConditionVisible"
            >{{$t('lang.managementFeeRate.text57')}}</div>
            <div
              class="condition"
              @click="addConditionVisible=false"
              v-show="addConditionVisible"
            >{{$t('lang.managementFeeRate.text58')}}</div>
            <div v-show="addConditionVisible">
              <div class="c-radio">
                <el-radio
                  v-model="typeofAddCondition"
                  :label="1"
                >{{$t('lang.managementFeeRate.text59')}}</el-radio>
              </div>
              <div class="c-radio c-radio-two">
                <el-radio
                  v-model="typeofAddCondition"
                  :label="2"
                >{{$t('lang.managementFeeRate.text60')}}</el-radio>
              </div>
              <div v-show="typeofAddCondition===1" class="maxweight-and-minWeight">
                <el-form-item class="left" prop="rateConditionMinWeight">
                  <p class="lable">{{$t('lang.managementFeeRate.text61')}}</p>
                  <div class="c-weight-input">
                    <span class="font">{{$t('lang.managementFeeRate.text63')}}</span>
                    <el-input v-model="freight.rateConditionMinWeight"></el-input>
                  </div>
                </el-form-item>
                <el-form-item class="right" prop="rateConditionMaxWeight">
                  <p class="lable">{{$t('lang.managementFeeRate.text62')}}</p>
                  <div class="c-weight-input">
                    <span class="font">{{$t('lang.managementFeeRate.text63')}}</span>
                    <el-input v-model="freight.rateConditionMaxWeight"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div v-show="typeofAddCondition===2" class="maxprice-and-minprice">
                <el-form-item class="left" prop="rateConditionMinPrice">
                  <p class="lable">{{$t('lang.managementFeeRate.text64')}}</p>
                  <div class="c-price-input">
                    <span class="dollor">$</span>
                    <el-input v-model="freight.rateConditionMinPrice"></el-input>
                  </div>
                </el-form-item>
                <el-form-item class="right" prop="rateConditionMaxPrice">
                  <p class="lable">{{$t('lang.managementFeeRate.text65')}}</p>
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
          <el-button plain @click="addFreightVisible=false">{{$t('lang.managementFeeRate.text66')}}</el-button>
          <el-button
            type="primary"
            @click="determineAddOrFixFreight"
          >{{$t('lang.managementFeeRate.text67')}}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除运输资料模态窗 -->
    <div class="modal modal-delete-data">
      <el-dialog
        :title="$t('lang.managementFeeRate.text75')"
        :visible.sync="deleteTransportVisible"
        width="100%"
      >
        <div class="tip">{{$t('lang.managementFeeRate.text76')}}</div>
        <span slot="footer" class="dialog-footer">
          <el-button
            plain
            @click="deleteTransportVisible = false"
          >{{$t('lang.managementFeeRate.text77')}}</el-button>
          <el-button
            type="danger"
            @click="determineDeleteTransport"
          >{{$t('lang.managementFeeRate.text78')}}</el-button>
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
  fixTransportInformation,
  deleteTransportInformation,
  getTransportInformation
} from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
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
          {
            required: true,
            message: this.$t('lang.managementFeeRate.text85'),
            trigger: 'blur'
          },
          {
            max: 20,
            message: this.$t('lang.managementFeeRate.text86'),
            trigger: 'blur'
          }
        ],
        rateCost: [{ validator: positiveNumberValidator, trigger: 'blur' }],
        rateConditionMinWeight: [
          { validator: validateWeight, trigger: 'blur' }
        ],
        rateConditionMaxWeight: [
          { validator: validateWeight, trigger: 'blur' }
        ],
        rateConditionMinPrice: [{ validator: validatePrice, trigger: 'blur' }],
        rateConditionMaxPrice: [{ validator: validatePrice, trigger: 'blur' }]
      },
      // 变量
      nameOfTransportData: null,
      inEditWarehouse: null, // 在编辑的仓库
      templateName: null,
      indexofinEditSelectedDistributionArea: null, // 正在编辑的资料的下标
      indexofRateList: null, // 费率列表的下标
      status: 'add', // 是在添加还是修改
      typeofAddCondition: 1,
      transport_search_specificProducts: null,
      isdefault: false,
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
      IdSelectedCountryArr: [], // 已经选中国家的id
      AllIdSelectedProviceArr: [], // 所有已经选中的省份包括选中国家时候
      // ui
      warehouseManagementVisible: false,
      warehouseAddVisible: false,
      distributionAreaVisible: false,
      proviceVisible: [], // 开关省份,
      addFreightVisible: false,
      addConditionVisible: false,
      deleteTransportVisible: false,
      pageInitializationRequestEnd: false,
      addressInfoVisible: false,
      areaTableVisible: false
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
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
      this.canAddWarehouseOne = this.$lodash.cloneDeep(this.canAddWarehouse)
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
      if (!this.defalut) {
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
      } else {
        // 默认运输资料的验证
        if (!this.deliveryWarehouse.length) {
          this.errorMessageList.push(this.$t('lang.managementFeeRate.text82'))
          errNumber += 1
        }
      }
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
      sendData.id = this.id
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
            if (item.id) {
              // 表示修改之前的
              area.pid = item.id
            }
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
                if (itemFour.id) {
                  // 表示修改之前的
                  rate.childId = itemFour.id
                }
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
      // 有产品时
      if (this.cre_transportdata_selectedSpecificProducts.length > 0) {
        let productIdArr = []
        let attrIdArr = []
        console.log(this.cre_transportdata_selectedSpecificProducts)
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
      let res = await fixTransportInformation(sendData)
      messageAlert(res)
      console.log(res)
    },
    back () {
      this.$router.push({
        path: '/administratorPanel/settings/transport/shipping'
      })
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
    },
    async openDistributionArea () {
      // 打开创建可配送区域
      this.templateName = ''
      this.distributionAreaVisible = true
      this.status = 'add'
      await this.getAreaData()
      this.addDisable()
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
            underSelectedCountryState: underSelectedCountryState.toString(), // 全选国家下面的省的id的集合
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
            // eslint-disable-next-line standard/computed-property-even-spacing
            id: this.selectedDistributionArea[
              this.indexofinEditSelectedDistributionArea
            ].id,
            name: this.templateName,
            zhCountryName: zhCountryName,
            enCountryName: enCountryName,
            country: SelectedCountryArr.toString(),
            underSelectedCountryState: underSelectedCountryState.toString(), // 全选国家下面的省的id的集合
            state: SelectedProviceArr.toString(),
            // eslint-disable-next-line standard/computed-property-even-spacing
            list: this.selectedDistributionArea[
              this.indexofinEditSelectedDistributionArea
            ].list
          }
          break
        default:
          break
      }
      console.log(this.selectedDistributionArea)
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
    async openEditDistributableArea (item, index) {
      // 打开编辑区域
      console.log(item)
      this.indexofinEditSelectedDistributionArea = index
      this.templateName = item.name
      this.status = 'fix'
      this.distributionAreaVisible = true
      await this.getAreaData()
      // 增加disable
      this.addDisable()
      this.itemCountryArr = item.country.split(',').map(Number) // 要编辑区域的所有国家id数组
      this.itemStateArr = item.state.split(',').map(Number) // 要编辑区域的所有省份id数组
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
    addDisable () {
      // 在其它资料中选中项加上disable属性
      // console.log(this.AllIdSelectedProviceArr)
      console.log(this.IdSelectedCountryArr)
      // console.log(this.distributionArea)
      this.distributionArea.forEach(item => {
        if (this.IdSelectedCountryArr.indexOf(item.id) !== -1) {
          // item.disable = true
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
    async getAreaData () {
      // 没有搜索条件时获取全部的国家省市
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
        this.originalDistributionArea = this.$lodash.cloneDeep(res.data.data)
        this.distributionArea.forEach(() => {
          this.proviceVisible.push(false)
        })
      } else {
        this.distributionArea = this.$lodash.cloneDeep(
          this.originalDistributionArea
        )
        console.log(this.distributionArea)
      }
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
      this.$refs['form_freight'].validate(valid => {
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
              obj.id = this.selectedDistributionArea[
                this.indexofinEditSelectedDistributionArea
              ].list[this.indexofRateList].id
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
          this.freight.addConditionVisible = false
          this.addFreightVisible = false
        }
      })
    },
    openFixRate (item, index, indexTwo) {
      // 打开编辑费率，index为在费率列表的下标，indexTwo是在可配送区域的下标
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
    deleteRate (itemTwo, index, indexTwo) {
      // 删除费率
      this.$refs[`ratePopover-` + index + indexTwo][0].doClose()
      this.selectedDistributionArea[index].list = this.removeOfIndex(
        this.selectedDistributionArea[index].list,
        indexTwo
      )
    },
    async determineDeleteTransport () {
      // 删除资料
      let res = await deleteTransportInformation({ id: this.id })
      messageAlert(res)
      if (res.data.code === 1) {
        setTimeout(() => {
          this.$router.push({
            path: '/administratorPanel/settings/transport/shipping'
          })
        }, 2000)
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
    ...mapMutations(['forSpecific_modal_search']),
    ...mapMutations(['forRightLoadingVisible'])
  },
  async created () {
    this.forRightLoadingVisible(true)
    this.addressInfoVisible = true
    // 运输资料详情
    let res = await getTransportInformation({ params: { id: this.id } })
    this.forRightLoadingVisible(false)
    this.pageInitializationRequestEnd = true
    console.log(res)
    let resData = res.data.data
    if (resData.default === 2) {
      this.isdefault = false
    } else if (resData.default === 1) {
      this.isdefault = true
    }
    this.nameOfTransportData = resData.disName
    this.selectedDistributionArea = resData.distributableArea // 已有的可配送区域
    resData.good.forEach(item => {
      item.type = 'createTransportData'
    })
    this.cre_transportdata_addSelectedSpecificProducts(resData.good) // 特定产品
    if (this.selectedDistributionArea.length > 0) {
      this.selectedDistributionArea.forEach(item => {
        this.IdSelectedCountryArr = this.IdSelectedCountryArr.concat(
          item.country.split(',').map(Number)
        ) // id放到已选中数组里面（disable时候用）
        this.AllIdSelectedProviceArr = this.AllIdSelectedProviceArr.concat(
          item.underSelectedCountryState.split(',').map(Number)
        ).concat(item.state.split(',').map(Number))
      })
    }
    let warehouseIdArr = resData.address.split(',')
    console.log(warehouseIdArr)
    // 请求仓库
    let SlocationRes = await Slocation()
    this.addressInfoVisible = false
    this.deliveryWarehouse = SlocationRes.data.data.use

    // 初始化仓库数据
    let newArr = []
    this.deliveryWarehouse.forEach(item => {
      if (warehouseIdArr.indexOf(item.Id.toString()) !== -1) {
        newArr.push(item)
      }
    })
    this.deliveryWarehouse = newArr
    this.originalDeliveryWarehouse = SlocationRes.data.data.use
  },
  destroyed () {
    this.cre_transportdata_addSelectedSpecificProducts(null)
  }
}
</script>
<style lang="less" scoped>
.c-createTransportData {
  padding-top: 32px;
  padding-bottom: 32px;
  .c-top {
    margin-bottom: 15px;
    padding-right: 15px;
    .icon-fanhui1 {
      font-size: 20px;
      margin-right: 15px;
      margin-left: 5px;
      cursor: pointer;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
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
    padding: 30px 15px 30px 15px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    border-left: none;
    border-right: none;
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
  .box-product {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    margin-bottom: 16px;
    .top {
      padding: 30px 15px 30px 15px;
      border-bottom: 1px solid rgba(220, 220, 220, 1);
      .text1 {
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 15px;
      }
      .text2 {
        font-size: 14px;
        color: rgba(137, 137, 137, 1);
        margin-bottom: 23px;
      }
      .text3 {
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 14px;
      }
    }
    .c-product {
      .product {
        border-bottom: 1px solid rgba(220, 220, 220, 1);
      }
    }
    .btm {
      padding: 30px 15px 30px 15px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      a {
        font-size: 14px;
        color: #4267b2;
      }
    }
  }
  .box-addproduct {
    padding: 29px 15px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    border-left: none;
    border-right: none;
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
        width: calc(100% - 68px);
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
    border-left: none;
    border-right: none;
    .top {
      padding-top: 30px;
      padding-bottom: 52px;
      border-bottom: 1px solid rgba(210, 210, 210, 1);
      .title {
        padding-left: 15px;
        margin-bottom: 17px;
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
        display: flex;
        justify-content: space-between;
        padding-right: 15px;
        .addWarehouse {
          cursor: pointer;
          font-size: 14px;
          color: #4267b2;
        }
      }
      .c-adress-infos {
        .c-adress-info {
          padding-left: 15px;
          padding-right: 15px;
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
          padding-left: 15px;
          padding-right: 15px;
        }
      }
    }
    .btm {
      padding: 30px 15px;
      .text1 {
        margin-bottom: 4px;
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
                text-align: center;
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
    padding-right: 15px;
    position: relative;
    .btn-delete {
      position: absolute;
      left: 15px;
      top: 0;
    }
  }
}
p {
  margin: 0;
}
// checkbox的样式修改
.el-checkbox {
  margin-right: 6px;
}
.modal {
  /deep/ .el-dialog {
    border-radius: 6px;
    margin-top: 25vh !important;
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
  }
}
.modal-distribution-area {
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
.modal-delete-data {
  .tip {
    // line-height: 60px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding: 22px 32px 19px 33px;
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
ul {
  margin: 0;
}
</style>
