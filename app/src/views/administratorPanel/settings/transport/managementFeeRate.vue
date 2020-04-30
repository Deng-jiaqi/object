<template>
  <div class="c-createTransportData">
    <div class="c-top">
      <span class="title">编辑运输资料</span>
      <span class="back" @click="back">
        <span class="iconfont icon-fanhui1"></span>返回
      </span>
    </div>
    <!-- 名称 -->
    <div class="box-name" v-show="!isdefault">
      <p class="text1">名称</p>
      <el-input :placeholder="'易碎产品'" v-model="nameOfTransportData"></el-input>
      <p class="text2">客户不会看到此信息。</p>
    </div>
    <!-- 产品 -->
    <div class="box-product" v-show="isdefault">
      <div class="top">
        <p class="text1">产品</p>
        <p class="text2">未包含在其他资料中的所有产品</p>
        <p class="text3">新产品已添加到此资料。</p>
      </div>
      <ul class="c-product">
        <li class="product"></li>
      </ul>
      <div class="btm">
        若要仅对某些产品收取不同的费用，请在
        <router-link to>发货设置</router-link>中创建新资料。
      </div>
    </div>
    <!-- 添加产品 -->
    <div class="box-addproduct" v-show="!isdefault">
      <p class="text1">特定产品</p>
      <div class="c-search">
        <el-input v-model="transport_search_specificProducts" :placeholder="'搜索特定产品'"></el-input>
        <button v-preventReClick @click="browseSpecificProduct('createTransportData')">浏览</button>
      </div>
      <SpecificProduct
        v-show="cre_transportdata_selectedSpecificProducts.length>0"
        :data="cre_transportdata_selectedSpecificProducts"
      />
      <div class="none" v-show="!cre_transportdata_selectedSpecificProducts.length>0">
        <p class="text1">没有产品</p>
        <p class="text2">将产品从其他配置文件移到此处来设置单独的费率。</p>
      </div>
    </div>
    <!-- 发货地址 -->
    <div class="box-shipping-adress">
      <div class="top">
        <p class="title">
          <span>发货地址</span>
          <span
            class="addWarehouse"
            v-show="canAddWarehouse.length>0"
            @click="openAddWarehouseModal"
          >新增</span>
        </p>
        <div class="c-adress-info" v-for="(item,index) in deliveryWarehouse" :key="index">
          <div
            class="adress-info"
          >{{item.country}} {{item.province}} {{item.city}} {{item.address}} {{item.name}}</div>
          <div class="management" @click="openWarehouseManagementModal(item)">管理</div>
        </div>
        <p v-show="!deliveryWarehouse.length>0" class="none-deliveryWarehouse">添加仓库,可创建仓库可配送区域</p>
      </div>
      <div class="btm" v-show="deliveryWarehouse.length>0">
        <div class="text1">
          <span class="title">送到</span>
          <span class="create" @click="openDistributionArea">创建可配送区域</span>
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
              <el-popover placement="bottom" v-model="item.distributionAreaOperationVisible">
                <ul class="c-distribution-area-operation">
                  <li @click="openEditDistributableArea(item,index)">编辑区域</li>
                  <li @click="deleteDistributableArea(index)">删除</li>
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
                  <th>费率名称</th>
                  <th>条件</th>
                  <th>成本</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itemTwo,indexTwo) in item.list" :key="indexTwo">
                  <td>{{itemTwo.rateName}}</td>
                  <td v-show="itemTwo.condition">{{itemTwo.condition}}</td>
                  <td v-show="!itemTwo.condition">无</td>
                  <td v-show="itemTwo.cost">{{itemTwo.cost}}</td>
                  <td v-show="!itemTwo.cost">免费</td>
                  <td>
                    <el-popover placement="bottom" v-model="itemTwo.rateOperationVisible">
                      <ul class="c-rate-operation">
                        <li>编辑费率</li>
                        <li>删除</li>
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
            <p class="tip" v-show="!item.list.length>0">此区域的客户在结账时不会看到这些产品的费率</p>
            <div class="c-btn">
              <edg-button :type="'simple'" :text="'添加运费'" @click.native="openAddFreight(index)" />
            </div>
          </li>
        </ul>
        <div class="none" v-show="!selectedDistributionArea.length>0">
          <p class="tip1">没有区域或费率</p>
          <p class="tip2">添加区域来为想将货物发往的地方创建费率。</p>
        </div>
      </div>
    </div>
    <!-- 保存取消删除按钮 -->
    <div class="btn-save-cancel">
      <el-button class='btn-delete' type="danger" @click="deleteTransportVisible=true">删除</el-button>
       <el-button @click="cancel" plain>取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
    <!-- 特定产品模态窗 -->
    <SpecificProductModalWindow ref="specificProductModalWindow" />
    <!-- 多属性编辑模态窗 -->
    <AttrModalWindow ref="attrModalWindow" />
    <!-- 移除特定仓库模态窗 -->
    <div class="modal modal-warehouse-management" v-if="inEditWarehouse">
      <el-dialog :title="'管理仓库'" :visible.sync="warehouseManagementVisible" width="36%">
        <div class="content">
          <p class="title">删除运费</p>
          <el-radio />
          删除 {{inEditWarehouse.city}} {{inEditWarehouse.address}} 的运费
        </div>
        <span slot="footer" class="dialog-footer">
          <edg-button
            class="btn-cancel"
            @click.native="warehouseManagementVisible = false"
            :text="'取消'"
          ></edg-button>
          <edg-button :type="'primary'" @click.native="removeWarehouse" :text="'确定'"></edg-button>
        </span>
      </el-dialog>
    </div>
    <!-- 新增仓库模态窗 -->
    <div class="modal modal-warehouse-add">
      <el-dialog :title="'新增仓库'" :visible.sync="warehouseAddVisible" width="36%">
        <div class="content">
          <p class="title">新增仓库</p>
          <ul>
            <li class="warehouse" v-for="(item,index) in canAddWarehouseOne" :key="index">
              <el-checkbox v-model="item.isSelect" />
              {{item.province}} {{item.city}} {{item.address}}
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <edg-button class="btn-cancel" @click.native="warehouseAddVisible = false" :text="'取消'"></edg-button>
          <edg-button :type="'primary'" @click.native="addWarehouse" :text="'确定'"></edg-button>
        </span>
      </el-dialog>
    </div>
    <!-- 创建可配送区域模态窗 -->
    <div class="modal modal-distribution-area">
      <el-dialog :title="'创建区域'" :visible.sync="distributionAreaVisible" width="36%">
        <div class="c-name">
          <p class="name">运输模板名称</p>
          <el-input v-model="templateName"></el-input>
          <p class="tip">客户不会看到此消息</p>
        </div>
        <!-- <div class="c-search">
          <el-input :placeholder="'搜索国家和地区'"></el-input>
        </div>-->
        <ul class="c-area">
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
                <span class="in-other" v-show="item.disable">在另一个区域中</span>
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
                <span class="in-other" v-show="itemTwo.disable">在另一个区域中</span>
              </div>
            </div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
          <edg-button
            class="btn-cancel"
            @click.native="distributionAreaVisible = false"
            :text="'取消'"
          ></edg-button>
          <edg-button :type="'primary'" @click.native="CreateFixDeliverableAreas" :text="'确定'"></edg-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加运费模态窗 -->
    <div class="modal modal-add-freight">
      <el-dialog :title="'添加运费'" :visible.sync="addFreightVisible" width="36%">
        <div class="type-choose">
          <div>
            <el-radio />
            <span>设置您自己的运费</span>
          </div>
        </div>
        <div class="c-rate">
          <div class="name-and-cost">
            <div class="left">
              <p class="lable">费率名称</p>
              <el-input v-model="rateName"></el-input>
            </div>
            <div class="right">
              <p class="lable">成本</p>
              <div class="c-price-input">
                <span class="dollor">$</span>
                <el-input v-model="rateCost"></el-input>
              </div>
            </div>
          </div>
          <p class="tip">客户将在结账时看到此信息。</p>
          <div
            class="condition"
            @click="addConditionVisible=true"
            v-show="!addConditionVisible"
          >添加条件</div>
          <div
            class="condition"
            @click="addConditionVisible=false"
            v-show="addConditionVisible"
          >删除条件</div>
          <div v-show="addConditionVisible">
            <div class="c-radio">
              <el-radio v-model="typeofAddCondition" :label="1">基于产品重量</el-radio>
            </div>
            <div class="c-radio c-radio-two">
              <el-radio v-model="typeofAddCondition" :label="2">基于订单价格</el-radio>
            </div>
            <div v-show="typeofAddCondition===1" class="maxweight-and-minWeight">
              <div class="left">
                <p class="lable">最小重量</p>
                <div class="c-weight-input">
                  <span class="font">磅</span>
                  <el-input v-model="rateConditionMinWeight"></el-input>
                </div>
              </div>
              <div class="right">
                <p class="lable">最大重量</p>
                <div class="c-weight-input">
                  <span class="font">磅</span>
                  <el-input v-model="rateConditionMaxWeight"></el-input>
                </div>
              </div>
            </div>
            <div v-show="typeofAddCondition===2" class="maxprice-and-minprice">
              <div class="left">
                <p class="lable">最低价格</p>
                <div class="c-price-input">
                  <span class="dollor">$</span>
                  <el-input v-model="rateConditionMinPrice"></el-input>
                </div>
              </div>
              <div class="right">
                <p class="lable">最高价格</p>
                <div class="c-price-input">
                  <span class="dollor">$</span>
                  <el-input v-model="rateConditionMaxPrice"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <edg-button class="btn-cancel" @click.native="addFreightVisible = false" :text="'取消'"></edg-button>
          <edg-button :type="'primary'" @click.native="determineAddFreight" :text="'确定'"></edg-button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除运输资料模态窗 -->
    <div class="modal modal-delete-data">
      <el-dialog :title="'删除配置文件 ?'" :visible.sync="deleteTransportVisible" width="36%">
        <div class="tip">确定要删除此资料？</div>
        <span slot="footer" class="dialog-footer">
          <el-button plain @click="deleteTransportVisible = false">取消</el-button>
          <el-button type="danger" @click="determineDeleteTransport">确定</el-button>
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
import { Slocation, lookarea } from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
export default {
  components: {
    SpecificProductModalWindow,
    SpecificProduct,
    AttrModalWindow
  },
  data () {
    return {
      // 变量
      nameOfTransportData: null,
      inEditWarehouse: null, // 在编辑的仓库
      templateName: null,
      indexofinEditSelectedDistributionArea: null, // 正在编辑的资料的下标
      status: 'add', // 是在添加资料还是修改
      typeofAddCondition: 1,
      transport_search_specificProducts: null,
      isdefault: true,
      // 运费
      rateName: null,
      rateCost: null,
      rateConditionMinWeight: null,
      rateConditionMaxWeight: null,
      rateConditionMinPrice: null,
      rateConditionMaxPrice: null,
      // data
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
      deleteTransportVisible: true
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
    async save () {
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
                    rate.minWeight = itemFour.minWeight
                    rate.maxWeight = itemFour.maxWeight
                    break
                  case 2:
                    rate.type = 2
                    rate.minPrice = itemFour.minPrice
                    rate.maxPrice = itemFour.maxPrice
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
      let res = await this.ajax.post(
        'http://192.168.5.108/tp5.0/public/index.php/basic/Transport/edit',
        sendData
      )
      messageAlert(res)
      console.log(res)
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
    },
    async openDistributionArea () {
      // 打开创建可配送区域
      this.templateName = ''
      this.distributionAreaVisible = true
      this.status = 'add'
      this.distributionArea = this.$lodash.cloneDeep(
        this.originalDistributionArea
      )
      this.addDisable()
      console.log(this.distributionArea)
    },
    CreateFixDeliverableAreas () {
      // 增加或修改可配送区域
      let enCountryName = [] // 展示的国家名字（包括只选择了部分省份）
      let zhCountryName = []
      let SelectedCountryArr = [] // 当前项选中了的国家
      let underCountryProviceArr = [] // 选中了国家下的省的数组
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
              underCountryProviceArr.push(itemFive.id)
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
      switch (this.status) {
        case 'add':
          this.selectedDistributionArea.push({
            name: this.templateName,
            zhCountryName: zhCountryName,
            enCountryName: enCountryName,
            country: SelectedCountryArr.toString(),
            state: SelectedProviceArr.toString(),
            list: [],
            distributionAreaOperationVisible: false // 可配送区域操作ui
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
            state: SelectedProviceArr.toString(),
            list: [],
            distributionAreaOperationVisible: false // 可配送区域操作ui
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
      ).concat(underCountryProviceArr)
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
    openAddFreight (index) {
      // 打开添加运费模态窗
      this.addFreightVisible = true
      console.log(index)
      this.indexofinEditSelectedDistributionArea = index
    },
    determineAddFreight () {
      // 确定添加费率
      let obj = {} // 运费对象
      obj.rateName = this.rateName
      obj.cost = this.rateCost
      obj.rateOperationVisible = false
      if (this.addConditionVisible) {
        if (this.typeofAddCondition === 1) {
          obj.type = 1
          obj.minWeight = this.rateConditionMinWeight
          obj.maxWeight = this.rateConditionMaxWeight
        }
        if (this.typeofAddCondition === 2) {
          obj.type = 2
          obj.minPrice = this.rateConditionMinPrice
          obj.maxPrice = this.rateConditionMaxPrice
        }
      }
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.selectedDistributionArea[
        this.indexofinEditSelectedDistributionArea
      ].list.push(obj)
      console.log(this.selectedDistributionArea)
      this.addFreightVisible = false
    },
    openEditDistributableArea (item, index) {
      console.log(item)
      this.indexofinEditSelectedDistributionArea = index
      this.templateName = item.name
      this.status = 'fix'
      this.distributionAreaVisible = true
      this.distributionArea = this.$lodash.cloneDeep(
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
          item.isSelect = true
          item.disable = false
          if (item.child) {
            item.child.forEach(itemTwo => {
              itemTwo.isSelect = true
              itemTwo.disable = false
            })
          }
        }
        if (this.itemCountryArr.indexOf(item.id) === -1 && item.child) {
          // 国家没被选中，省呗选中了
          let disableLenth = 0
          item.child.forEach(itemThree => {
            if (this.itemStateArr.indexOf(itemThree.id) !== -1) {
              itemThree.isSelect = true
              itemThree.disable = false
            }
          })
          item.child.forEach(itemFour => {
            if (itemFour.disable) {
              disableLenth += 1
            }
          })
          if (this.itemStateArr.length + disableLenth === item.child.length) {
            item.isSelect = true
            item.disable = false
          }
        }
      })
      console.log(this.distributionArea)
    },
    addDisable () {
      // 在其它资料中选中项加上disable属性
      console.log(this.AllIdSelectedProviceArr)
      this.distributionArea.forEach(item => {
        if (this.IdSelectedCountryArr.indexOf(item.id) !== -1) {
          item.disable = true
        } else {
          item.disable = false
        }
        if (item.child) {
          let lenth = item.child.length
          let disableNum = 0
          item.child.forEach(itemTwo => {
            if (this.AllIdSelectedProviceArr.indexOf(itemTwo.id) !== -1) {
              itemTwo.disable = true
              disableNum += 1
            } else {
              itemTwo.disable = false
            }
          })
          if (
            lenth === disableNum &&
            this.IdSelectedCountryArr.indexOf(item.id) === -1
          ) {
            // 前2个资料选的省占满1个国家，第三个编辑时候国家置为disable
            item.disable = true
          }
        }
      })
    },
    async determineDeleteTransport () {
      // 删除资料
      let res = await this.ajax.post(
        'http://192.168.5.108/tp5.0/public/index.php/basic/Transport/del',
        { id: this.id }
      )
      messageAlert(res)
      if (res.data.code === 1) {
        setTimeout(() => {
          this.$router.push({
            path: '/administratorPanel/settings/transport/shipping'
          })
        }, 2000)
      }
    },
    cancelEditDistributableArea () {
      this.distributionAreaVisible = false
    },
    deleteDistributableArea (index) {},
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
    let resOne = await lookarea()
    console.log(resOne)
    resOne.data.data.forEach(item => {
      item.isSelect = false // 不先加false视图不更新
      if (item.child) {
        item.child.forEach(itemTwo => {
          itemTwo.isSelect = false
        })
      }
    })
    this.distributionArea = resOne.data.data
    this.originalDistributionArea = this.$lodash.cloneDeep(resOne.data.data)
    // 运输资料详情
    let res = await this.ajax.get(
      'http://192.168.5.108/tp5.0/public/basic/Transport/rateList',
      { params: { id: this.id } }
    )
    console.log(res)
    let resData = res.data.data
    if (resData.default === 2) {
      this.isdefault = false
    } else {
      this.isdefault = true
    }
    this.nameOfTransportData = resData.disName
    this.selectedDistributionArea = resData.distributableArea // 已有的可配送区域
    this.cre_transportdata_addSelectedSpecificProducts(resData.good) // 特定产品
    if (this.selectedDistributionArea.length > 0) {
      console.log(666)
      this.selectedDistributionArea.forEach(item => {
        this.IdSelectedCountryArr = this.IdSelectedCountryArr.concat(
          item.country.split(',').map(Number)
        ) // id放到已选中数组里面（disable时候用）
        this.AllIdSelectedProviceArr = this.AllIdSelectedProviceArr.concat(
          item.allState
        )
        item.distributionAreaOperationVisible = false // 操作框的ui
        if (item.list.length > 0) {
          // 费率3个点的操作的ui
          item.list.forEach(itemTwo => {
            itemTwo.rateOperationVisible = false
          })
        }
      })
    }
    let warehouseIdArr = resData.address.split(',')
    console.log(warehouseIdArr)
    // 请求仓库
    let SlocationRes = await Slocation()
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
      color: #385ca5;
      cursor: pointer;
      .icon-fanhui1 {
        font-size: 14px;
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
  .box-product {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    margin-bottom: 16px;
    .top {
      padding: 27px 0 18px 28px;
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
      padding: 35px 31px 38px 31px;
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      a {
        font-size: 14px;
        color: #4267b2;
      }
    }
  }
  .box-addproduct {
    padding-top: 27px;
    padding-bottom: 27px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(222, 222, 222, 1);
    .text1 {
      margin-bottom: 21px;
      padding-left: 27px;
      padding-right: 27px;
    }
    .c-search {
      padding-left: 27px;
      padding-right: 27px;
      margin-bottom: 23px;
      button {
        width: 68px;
        height: 45px;
        border: 1px solid rgba(109, 109, 109, 1);
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
        background: #fff;
        border: 1px solid rgba(149, 149, 149, 1);
        border-radius: 4px;
        outline: rgba(56, 92, 165, 1);
        padding-left: 37px;
        height: 45px;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
      /deep/ .el-input__inner:focus {
        border: 1px solid rgba(56, 92, 165, 1);
      }
      /deep/ .el-input__inner:hover {
        border-color: rgba(56, 92, 165, 1);
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
      .c-adress-info {
        padding-left: 29px;
        padding-right: 29px;
        display: flex;
        justify-content: space-between;
        .adress-info {
          font-size: 14px;
          color: rgba(137, 137, 137, 1);
          line-height: 40px;
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
    .btm {
      padding: 15px 29px 0 29px;
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
    position: relative;
    .btn-delete {
      position: absolute;
      left: 0;
      top: 0;
    }
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
    // radio 样式修改
    /deep/ .el-radio__input.is-checked .el-radio__inner {
      background-color: #fff;
      border-color: #385ca5;
    }
    /deep/ .el-radio__inner::after {
      background-color: #385ca5;
      width: 10px;
      height: 10px;
    }
    /deep/ .el-radio__inner {
      background-color: #fff;
      width: 20px;
      height: 20px;
    }
    /deep/ .el-radio__inner:hover {
      border-color: #385ca5;
    }
    /deep/ .el-radio__label {
      font-size: 16px;
      font-weight: 400;
      color: #333333;
    }
    /deep/ .el-radio__input.is-checked + .el-radio__label {
      color: #385ca5;
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
    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: rgba(56, 92, 165, 1);
    }
    /deep/ .el-checkbox__inner {
      background-color: rgba(238, 238, 238, 1);
    }
    /deep/ .el-checkbox__inner:hover {
      border-color: rgba(56, 92, 165, 1);
    }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #fff;
      border-color: rgba(56, 92, 165, 1);
    }
    /deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background: #fff;
      border-color: rgba(56, 92, 165, 1);
    }
    /deep/ .el-checkbox__inner::after {
      border-right: 2px solid rgba(56, 92, 165, 1);
      border-bottom: 2px solid rgba(56, 92, 165, 1);
      width: 5px;
      left: 6px;
      height: 10px;
    }
    /deep/ .el-checkbox__inner {
      width: 20px;
      height: 20px;
    }
    .el-checkbox {
      margin-right: 6px;
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
          top: 12px;
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
          top: 12px;
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
        top: 12px;
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
    }
    li:hover {
      background-color: #f9fafb;
    }
  }
}
// input 样式修改
/deep/ .el-input__inner {
  background: #fff;
  border: 1px solid rgba(149, 149, 149, 1);
  border-radius: 4px;
  outline: rgba(56, 92, 165, 1);
  padding-left: 17px;
}
/deep/ .el-input__inner:focus {
  border: 1px solid rgba(56, 92, 165, 1);
}
/deep/ .el-input__inner:hover {
  border-color: rgba(56, 92, 165, 1);
}
// checkbox的样式修改
/deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: rgba(56, 92, 165, 1);
}
/deep/ .el-checkbox__inner {
  background-color: rgba(238, 238, 238, 1);
}
/deep/ .el-checkbox__inner:hover {
  border-color: rgba(56, 92, 165, 1);
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fff;
  border-color: rgba(56, 92, 165, 1);
}
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #fff;
  border-color: rgba(56, 92, 165, 1);
}
/deep/ .el-checkbox__inner::after {
  border-right: 2px solid rgba(56, 92, 165, 1);
  border-bottom: 2px solid rgba(56, 92, 165, 1);
  width: 5px;
  left: 6px;
  height: 10px;
}
/deep/ .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.el-checkbox {
  margin-right: 6px;
}
// radio 样式修改
.el-radio {
  margin-right: 5px;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  background-color: #fff;
  border-color: #385ca5;
}
/deep/ .el-radio__inner::after {
  background-color: #385ca5;
  width: 10px;
  height: 10px;
}
/deep/ .el-radio__inner {
  background-color: #fff;
  width: 20px;
  height: 20px;
}
/deep/ .el-radio__inner:hover {
  border-color: #385ca5;
}
/deep/ .el-radio__label {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #385ca5;
  font-size: 14px;
}
ul {
  margin: 0;
}
</style>
