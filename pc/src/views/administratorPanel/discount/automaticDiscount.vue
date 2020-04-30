<template>
  <div class="c-createAutomaticDiscount" v-show="pageInitializationRequestEnd">
    <div class="content-createAutomaticDiscount">
      <!-- top -->
      <div class="top">
        <div class="left">
          <span class="title" v-show="discountId==='new'">{{$t('lang.autoDiscountcode.text1')}}</span>
          <!-- <span class="title" v-show="discountId ==='new'">{{pageInfo.code}}</span> -->
        </div>
        <div class="right" @click="back">
          <span class="iconfont icon-fanhui1"></span>
          {{$t('lang.autoDiscountcode.text2')}}
        </div>
      </div>
      <span class="title-sapn" v-show="discountId ==='new'">{{pageInfo.code}}</span>
      <div class="c-disableOrEnable" v-show="discountId!=='new'">
        <div class="disable">
          <span
            @click="openOperationModal(0)"
            v-show="!pageInfo.status"
          >{{$t('lang.autoDiscountcode.text3')}}</span>
        </div>
        <div class="enable">
          <span
            @click="openOperationModal(1)"
            v-show="pageInfo.status"
          >{{$t('lang.autoDiscountcode.text4')}}</span>
        </div>
      </div>
      <!-- 错误提示框 -->
      <div class="c-error-messagebox" id="errorbox">
        <div class="error-messagebox" v-show="errorMessageList.length>0">
          <p class="error-messagebox-title">此折扣码的错误：</p>
          <ul>
            <li
              class="error-messagebox-error"
              v-for="(item,index) in errorMessageList"
              :key="index"
            >
              <span class="error-messagebox-circle"></span>
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 自动折扣标题 -->
      <div class="box box-autoDiscount-title">
        <div class="c-box-autoDiscount-title-top">
          <span class="text1">{{$t('lang.autoDiscountcode.text5')}}</span>
        </div>
        <el-input v-model="pageInfo.code"></el-input>
        <p class="tip">{{$t('lang.autoDiscountcode.text6')}}</p>
      </div>
      <!-- 类型选择框 -->
      <div class="box box-type">
        <p class="title">{{$t('lang.autoDiscountcode.text7')}}</p>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="0">{{$t('lang.autoDiscountcode.text8')}}</el-radio>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="1">{{$t('lang.autoDiscountcode.text9')}}</el-radio>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="3">{{$t('lang.autoDiscountcode.text10')}}</el-radio>
        </div>
      </div>
      <!-- 客户购买/消费框 -->
      <div class="box box-customer-buy" v-show="pageInfo.type===3">
        <p class="title" v-show="pageInfo.min_require==2">{{$t('lang.autoDiscountcode.text11')}}</p>
        <p class="title" v-show="pageInfo.min_require==1">{{$t('lang.autoDiscountcode.text12')}}</p>
        <div class="c-check">
          <div class="c-type-check">
            <el-radio
              v-model="pageInfo.min_require"
              :label="2"
            >{{$t('lang.autoDiscountcode.text13')}}</el-radio>
          </div>
          <div class="c-type-check">
            <el-radio
              v-model="pageInfo.min_require"
              :label="1"
            >{{$t('lang.autoDiscountcode.text14')}}</el-radio>
          </div>
        </div>
        <div class="box-customer-buy-top clearfix">
          <div class="c-input-customer-buy-number">
            <div v-show="pageInfo.min_require===2">
              <p class="text">{{$t('lang.autoDiscountcode.text15')}}</p>
              <el-input v-model="pageInfo.min_goods_num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </div>
            <div class="input-money" v-show="pageInfo.min_require===1">
              <p class="text">{{$t('lang.autoDiscountcode.text16')}}</p>
              <el-input v-model="pageInfo.min_money" @input.native="oninput"></el-input>
              <div class="dollar-sign">$</div>
            </div>
          </div>
          <div class="select c-select-customer-buy">
            <p class="text">{{$t('lang.autoDiscountcode.text17')}}</p>
            <el-select
              v-model="pageInfo.buy_type"
              :placeholder="$t('lang.autoDiscountcode.text18')"
            >
              <el-option
                v-for="item in $i18n.locale==='zh-cn'?optionsZh:optionsEn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="c-search" v-show="pageInfo.buy_type===1">
            <el-input
              v-model="buy_search_specificProducts"
              :placeholder="$t('lang.autoDiscountcode.text19')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSpecificProduct('auto_buy')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <div class="c-search" v-show="pageInfo.buy_type===0">
            <el-input
              v-model="buy_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.autoDiscountcode.text20')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSeriesOfSpecificProduct('auto_buy')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <!-- 特定产品 -->
          <SpecificProduct
            v-show="pageInfo.buy_type===1&&auto_buy_selectedSpecificProducts"
            :data="auto_buy_selectedSpecificProducts"
          />
          <!-- 特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.buy_type===0&&auto_buy_selectedSeriesOfSpecificProducts"
            :data="auto_buy_selectedSeriesOfSpecificProducts"
          />
        </div>
      </div>
      <!-- 客户获得框 -->
      <div class="box box-customer-get" v-show="pageInfo.type===3">
        <div class="box-customer-get-top">
          <p class="title">{{$t('lang.autoDiscountcode.text22')}}</p>
          <p class="tip">{{$t('lang.autoDiscountcode.text23')}}</p>
          <div class="c-input-customer-get-number">
            <p class="text">{{$t('lang.autoDiscountcode.text24')}}</p>
            <el-input v-model="pageInfo.get_num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
          <div class="select c-select-customer-get">
            <p class="text">{{$t('lang.autoDiscountcode.text25')}}</p>
            <el-select
              v-model="pageInfo.get_type"
              :placeholder="$t('lang.autoDiscountcode.text26')"
            >
              <el-option
                v-for="item in $i18n.locale==='zh-cn'?optionsZh:optionsEn"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="c-search" v-show="pageInfo.get_type===1">
            <el-input
              v-model="get_search_specificProducts"
              :placeholder="$t('lang.autoDiscountcode.text19')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSpecificProduct('auto_get')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <div class="c-search" v-show="pageInfo.get_type===0">
            <el-input
              v-model="get_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.autoDiscountcode.text20')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSeriesOfSpecificProduct('auto_get')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <!-- 特定产品 -->
          <SpecificProduct
            v-show="pageInfo.get_type===1&&auto_get_selectedSpecificProducts"
            :data="auto_get_selectedSpecificProducts"
          />
          <!-- 特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.get_type===0&&auto_get_selectedSeriesOfSpecificProducts"
            :data="auto_get_selectedSeriesOfSpecificProducts"
          />
          <p class="text">{{$t('lang.autoDiscountcode.text27')}}</p>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount" :label="0">{{$t('lang.autoDiscountcode.text28')}}</el-radio>
            <div class="c-discount-input" v-show="pageInfo.discount===0">
              <el-input v-model="pageInfo.discount_percent" @input.native="oninput"></el-input>
              <span class="percent">%</span>
            </div>
          </div>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount" :label="1">{{$t('lang.autoDiscountcode.text29')}}</el-radio>
          </div>
        </div>
        <div class="box-customer-get-btm">
          <div class="c-type-check">
            <el-checkbox v-model="pageInfo.single_use_num.status" />
            <span>{{$t('lang.autoDiscountcode.text30')}}</span>
            &nbsp;&nbsp;&nbsp;
            <el-input
              v-show="pageInfo.single_use_num.status"
              v-model="pageInfo.single_use_num.number"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 适用于/折扣额框 -->
      <div class="box box-discounts-scope" v-show="pageInfo.type===0||pageInfo.type===1">
        <div class="box-discounts-scope-top">
          <p class="title">{{$t('lang.autoDiscountcode.text50')}}</p>
          <p class="text2">{{$t('lang.autoDiscountcode.text51')}}</p>
          <div class="c-discount-input-percentage" v-show="pageInfo.type===0">
            <el-input v-model="pageInfo.discount_amount" @input.native="oninput"></el-input>
            <span class="percent">%</span>
          </div>
          <div class="c-discount-input-fixed-amount" v-show="pageInfo.type===1">
            <el-input v-model="pageInfo.discount_amount" @input.native="oninput"></el-input>
            <span class="dollar">$</span>
          </div>
        </div>
        <div class="box-discounts-scope-btm">
          <p class="text1">{{$t('lang.autoDiscountcode.text31')}}</p>
          <div class="c-radio">
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="0"
              >{{$t('lang.autoDiscountcode.text32')}}</el-radio>
            </div>
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="1"
              >{{$t('lang.autoDiscountcode.text33')}}</el-radio>
            </div>
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="2"
              >{{$t('lang.autoDiscountcode.text34')}}</el-radio>
            </div>
          </div>
          <!-- 百分比时的搜索框 -->
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===0&&pageInfo.suitable_for===1"
          >
            <el-input
              v-model="percent_search_specificProducts"
              :placeholder="$t('lang.autoDiscountcode.text19')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSpecificProduct('auto_percent')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSpecificProduct('auto_fixed')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===0&&pageInfo.suitable_for===2"
          >
            <el-input
              v-model="percent_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.autoDiscountcode.text20')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSeriesOfSpecificProduct('auto_percent')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSeriesOfSpecificProduct('auto_fixed')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <!-- 固定金额时的搜索框 -->
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===1&&pageInfo.suitable_for===1"
          >
            <el-input
              v-model="fixed_search_specificProducts"
              :placeholder="$t('lang.autoDiscountcode.text19')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSpecificProduct('auto_percent')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSpecificProduct('auto_fixed')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===1&&pageInfo.suitable_for===2"
          >
            <el-input
              v-model="fixed_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.autoDiscountcode.text20')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSeriesOfSpecificProduct('auto_percent')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSeriesOfSpecificProduct('auto_fixed')"
            >{{$t('lang.autoDiscountcode.text21')}}</button>
          </div>
          <!-- 百分比时特定产品 -->
          <SpecificProduct
            v-show="pageInfo.type===0&&pageInfo.suitable_for===1&&auto_percent_selectedSpecificProducts"
            :data="auto_percent_selectedSpecificProducts"
          />
          <!-- 百分比时特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.type===0&&pageInfo.suitable_for===2&&auto_percent_selectedSeriesOfSpecificProducts"
            :data="auto_percent_selectedSeriesOfSpecificProducts"
          />
          <!-- 固定金额时特定产品 -->
          <SpecificProduct
            v-show="pageInfo.type===1&&pageInfo.suitable_for===1&&auto_fixed_selectedSpecificProducts"
            :data="auto_fixed_selectedSpecificProducts"
          />
          <!-- 固定金额时特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.type===1&&pageInfo.suitable_for===2&&auto_fixed_selectedSeriesOfSpecificProducts"
            :data="auto_fixed_selectedSeriesOfSpecificProducts"
          />
          <div class="c-type-check special" v-show="pageInfo.type===1&&pageInfo.suitable_for!==0">
            <el-checkbox v-model="pageInfo.is_single" />
            <span>{{$t('lang.autoDiscountcode.text35')}}</span>
            <p class="tip">{{$t('lang.autoDiscountcode.text36')}}</p>
          </div>
        </div>
      </div>
      <!-- 生效日期 -->
      <div class="box box-effective-date clearfix">
        <p class="title">{{$t('lang.autoDiscountcode.text42')}}</p>
        <div class="c-date-and-time-pick">
          <div class="clearfix">
            <div class="c-date-pick">
              <p class="text">{{$t('lang.autoDiscountcode.text43')}}</p>
              <el-date-picker
                :picker-options="pickerOptionsStart"
                v-model="takeEffectDate"
                type="date"
                :placeholder="$t('lang.autoDiscountcode.text46')"
              ></el-date-picker>
            </div>
            <div class="c-time-pick">
              <p class="text">{{$t('lang.autoDiscountcode.text44')}}</p>
              <el-time-select
                v-model="takeEffectTime"
                :picker-options="{start: '00:00',step: '00:15', end: '24:00'}"
                :placeholder="$t('lang.autoDiscountcode.text47')"
              ></el-time-select>
            </div>
          </div>
          <div class="c-type-check">
            <el-checkbox v-model="pageInfo.end_time.status" />
            <span>{{$t('lang.autoDiscountcode.text45')}}</span>
          </div>
          <!-- 结束日期 -->
          <div class="clearfix" v-show="pageInfo.end_time.status">
            <div class="c-date-pick">
              <p class="text">{{$t('lang.autoDiscountcode.text77')}}</p>
              <el-date-picker
               :picker-options="pickerOptionsEnd"
                v-model="endDate"
                type="date"
                :placeholder="$t('lang.autoDiscountcode.text46')"
              ></el-date-picker>
            </div>
            <div class="c-time-pick">
              <p class="text">{{$t('lang.autoDiscountcode.text78')}}</p>
              <el-time-select
                v-model="endTime"
                :picker-options="{start: '00:00',step: '00:15', end: '23:59',minTime: takeEffectTime}"
                :placeholder="$t('lang.autoDiscountcode.text47')"
              ></el-time-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 说明 -->
      <div class="box box-explain">
        <p class="title">{{$t('lang.autoDiscountcode.text48')}}</p>
        <p class="tip">{{$t('lang.autoDiscountcode.text49')}}</p>
      </div>
      <!-- 按钮 -->
      <div class="c-button">
        <el-button
          class="btn-delete"
          v-show="discountId!=='new'"
          @click="deleteDiscountVisible=true"
          type="danger"
        >{{$t('lang.autoDiscountcode.text52')}}</el-button>
        <el-button @click="cancel" plain>{{$t('lang.autoDiscountcode.text53')}}</el-button>
        <el-button
          :disabled="pageInfo.code===''"
          @click="save"
          type="primary"
        >{{$t('lang.autoDiscountcode.text54')}}</el-button>
      </div>
      <!-- 禁用折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.autoDiscountcode.text55')} ${pageInfo.code} ？`"
          :visible.sync="disableDiscountVisible"
          width="36%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.autoDiscountcode.text56')}}</p>
          </div>
          <span slot="footer">
            <el-button
              plain
              @click="disableDiscountVisible=false"
            >{{$t('lang.autoDiscountcode.text57')}}</el-button>
            <el-button
              type="primary"
              @click="disableDiscount"
            >{{$t('lang.autoDiscountcode.text58')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 启用折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.autoDiscountcode.text59')} ${pageInfo.code} ？`"
          :visible.sync="enableDiscountVisible"
          width="36%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.autoDiscountcode.text60')}}</p>
          </div>
          <span slot="footer">
            <el-button
              plain
              @click="enableDiscountVisible=false"
            >{{$t('lang.autoDiscountcode.text61')}}</el-button>
            <el-button type="primary" @click="enableDiscount">{{$t('lang.autoDiscountcode.text62')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 删除折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.autoDiscountcode.text63')} ${pageInfo.code}`"
          :visible.sync="deleteDiscountVisible"
          width="36%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.autoDiscountcode.text64')}}</p>
          </div>
          <span slot="footer">
            <el-button
              plain
              @click="deleteDiscountVisible=false"
            >{{$t('lang.autoDiscountcode.text65')}}</el-button>
            <el-button type="danger" @click="deleteDiscount">{{$t('lang.autoDiscountcode.text66')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 特定产品模态窗 -->
      <SpecificProductModalWindow ref="specificProductModalWindow" />
      <!-- 特定产品系列模态窗 -->
      <SeriesOfSpecificProductModalWindow ref="seriesOfSpecificProductModalWindow" />
      <!-- 多属性编辑窗口 -->
      <AttrModalWindow ref="attrModalWindow" />
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import SpecificProductModalWindow from '@/components/administratorPanel/discount/specificProductModalWindow'
import SeriesOfSpecificProductModalWindow from '@/components/administratorPanel/discount/seriesOfSpecificProductModalWindow'
import AttrModalWindow from '@/components/administratorPanel/discount/attrModalWindow'
import SpecificProduct from '@/components/administratorPanel/discount/specificProduct'
import SeriesOfSpecificProduct from '@/components/administratorPanel/discount/seriesOfSpecificProduct'
import { getTime } from '@/utils/timeTransformation'
import {
  getDiscountDetail,
  addDiscountOrAutodiscount,
  discountOperation,
  savediscountAutodiscount
} from '@/common/api/api.js'
import messageAlert from '@/utils/messageAlert'
import { cloneDeep } from 'lodash'
export default {
  components: {
    SpecificProduct,
    SeriesOfSpecificProduct,
    SpecificProductModalWindow,
    AttrModalWindow,
    SeriesOfSpecificProductModalWindow
  },
  data () {
    return {
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          return time.getTime() < this.takeEffectDate
        }
      },
      // data
      pageInfo: {
        total_type: 1,
        code: '',
        type: 0,
        status: 0,
        end_time: {
          status: false
        },
        // 最低需求   （买x送y时没有0---即为无时候的情况）
        min_require: 2,
        min_money: null,
        min_goods_num: null,
        // 固定金额/百分比时特有
        discount_amount: null, // 百分比/固定金额
        suitable_for: 0, // 适用于
        attrpid: ['1-1'],
        collection_id: '1',
        // 固定金额折扣特有的 （当不选择适用于整个订单时的可选项）
        is_single: true,
        // 买X送Y特有的参数
        buy_type: 0,
        buy_attrpid: ['1-1'],
        buy_collectid: '1',
        get_num: null,
        get_type: 0,
        get_attrpid: ['1-1'],
        get_collectid: '1',
        discount: 0,
        discount_percent: null,
        single_use_num: {
          status: false,
          number: null
        }
      },
      errorMessageList: [],
      // 变量
      takeEffectDate: null,
      takeEffectTime: null,
      endDate: null,
      endTime: null,
      one: null,
      two: null,
      specific_modal_search: '',
      seriesOf_modal_search: '',
      percent_search_specificProducts: '',
      percent_search_SeriesOfSpecificProduct: '',
      fixed_search_specificProducts: '',
      fixed_search_SeriesOfSpecificProduct: '',
      buy_search_specificProducts: '',
      buy_search_SeriesOfSpecificProduct: '',
      get_search_specificProducts: '',
      get_search_SeriesOfSpecificProduct: '',
      optionsZh: [
        {
          value: 0,
          label: '特定产品系列'
        },
        {
          value: 1,
          label: '特定产品'
        }
      ],
      optionsEn: [
        {
          value: 0,
          label: 'seriesOfSpecificProduct'
        },
        {
          value: 1,
          label: 'specificProduct'
        }
      ],
      // ui
      disableDiscountVisible: false,
      enableDiscountVisible: false,
      deleteDiscountVisible: false,
      pageInitializationRequestEnd: true
    }
  },
  computed: {
    startTimeStamp () {
      return (
        Date.parse(new Date(this.takeEffectDate)) +
        parseInt(this.takeEffectTime.split(':')[0], 0) * 3600000 +
        parseInt(this.takeEffectTime.split(':')[1], 0) * 60 * 1000
      )
    },
    endTimeStamp () {
      return (
        Date.parse(new Date(this.endDate)) +
        parseInt(this.endTime.split(':')[0], 0) * 3600000 +
        parseInt(this.endTime.split(':')[1], 0) * 60 * 1000
      )
    },
    discountId () {
      return this.$route.query.id
    },
    ...mapState(['clickTime']),
    ...mapState(['auto_percent_selectedSpecificProducts']),
    ...mapState(['auto_percent_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_fixed_selectedSpecificProducts']),
    ...mapState(['auto_fixed_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_buy_selectedSpecificProducts']),
    ...mapState(['auto_buy_selectedSeriesOfSpecificProducts']),
    ...mapState(['auto_get_selectedSpecificProducts']),
    ...mapState(['auto_get_selectedSeriesOfSpecificProducts'])
  },
  watch: {
    takeEffectDate: {
      handler (val) {
        if (this.endDate.getTime() < val.getTime()) {
          this.endDate = cloneDeep(val)
        }
      }
    },
    takeEffectTime: {
      handler (val) {
        if (val.split(':')[1].length === 1) {
          let hour = val.split(':')[0]
          let minute = val.split(':')[1]
          this.takeEffectTime = `${hour}:0${minute}`
        }
      }
    },
    percent_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.percent_search_specificProducts)
          this.percent_search_specificProducts = ''
          this.forClickTime('auto_percent')
        }
      }
    },
    percent_search_SeriesOfSpecificProduct: {
      handler (val) {
        if (val) {
          this.$refs.seriesOfSpecificProductModalWindow.modalWindowVisible = true
          this.forSeriesOfSpecific_modal_search(
            this.percent_search_SeriesOfSpecificProduct
          )
          this.percent_search_SeriesOfSpecificProduct = ''
          this.forClickTime('auto_percent')
        }
      }
    },
    fixed_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.fixed_search_specificProducts)
          this.fixed_search_specificProducts = ''
          this.forClickTime('auto_fixed')
        }
      }
    },
    fixed_search_SeriesOfSpecificProduct: {
      handler (val) {
        if (val) {
          this.$refs.seriesOfSpecificProductModalWindow.modalWindowVisible = true
          this.forSeriesOfSpecific_modal_search(
            this.fixed_search_SeriesOfSpecificProduct
          )
          this.fixed_search_SeriesOfSpecificProduct = ''
          this.forClickTime('auto_fixed')
        }
      }
    },
    buy_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.buy_search_specificProducts)
          this.buy_search_specificProducts = ''
          this.forClickTime('auto_buy')
        }
      }
    },
    buy_search_SeriesOfSpecificProduct: {
      handler (val) {
        if (val) {
          this.$refs.seriesOfSpecificProductModalWindow.modalWindowVisible = true
          this.forSeriesOfSpecific_modal_search(
            this.buy_search_SeriesOfSpecificProduct
          )
          this.buy_search_SeriesOfSpecificProduct = ''
          this.forClickTime('auto_buy')
        }
      }
    },
    get_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.get_search_specificProducts)
          this.get_search_specificProducts = ''
          this.forClickTime('auto_get')
        }
      }
    },
    get_search_SeriesOfSpecificProduct: {
      handler (val) {
        if (val) {
          this.$refs.seriesOfSpecificProductModalWindow.modalWindowVisible = true
          this.forSeriesOfSpecific_modal_search(
            this.get_search_SeriesOfSpecificProduct
          )
          this.get_search_SeriesOfSpecificProduct = ''
          this.forClickTime('auto_get')
        }
      }
    }
  },
  methods: {
    openOperationModal (x) {
      switch (x) {
        case 0:
          this.enableDiscountVisible = true
          break
        case 1:
          this.disableDiscountVisible = true
          break
        default:
          break
      }
    },
    disableDiscount () {
      discountOperation({ discount_id: [this.discountId], type: 1 }).then(
        res => {
          console.log(res)
          if (res.data.code === 1) {
            this.pageInfo.status = 0
          } else {
            messageAlert(res)
          }
          this.disableDiscountVisible = false
        }
      )
    },
    enableDiscount () {
      discountOperation({ discount_id: [this.discountId], type: 0 }).then(
        res => {
          console.log(res)
          if (res.data.code === 1) {
            this.pageInfo.status = 1
          } else {
            messageAlert(res)
          }
          this.enableDiscountVisible = false
        }
      )
    },
    browseSpecificProduct (info) {
      console.log(info)
      this.forClickTime(info)
      this.$refs.specificProductModalWindow.modalWindowVisible = true
    },
    browseSeriesOfSpecificProduct (info) {
      console.log(info)
      this.forClickTime(info)
      this.$refs.seriesOfSpecificProductModalWindow.modalWindowVisible = true
    },
    back () {
      this.$router.go(-1)
    },
    // 特定产品的数据拼接
    dataForSpecificProducts (data) {
      let arr = []
      data.forEach(item => {
        if (item.attrpid === '0') {
          arr.push(`${item.productid}-0`)
        } else {
          item.attrpid.split(',').forEach(itemTwo => {
            arr.push(`${item.productid}-${itemTwo}`)
          })
        }
      })
      return arr
    },
    // 特定产品系列的数据拼接
    dataForSeriesOfSpecificProducts (data) {
      let arr = []
      data.forEach(item => {
        arr.push(item.Id)
      })
      return arr.toString()
    },
    cancel () {
      this.$router.push({
        path: '/administratorPanel/indexOfDiscount/discountCode?status=all',
        query: { status: 'all' }
      })
    },
    oninput (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    },
    submitValidate () { // 提交时候验证页面数据是否提交完整
      let errNumber = 0
      // 公共部分
      if (this.pageInfo.code === '') {
        this.errorMessageList.push(this.$t('lang.autoDiscountcode.text67'))
        errNumber += 1
      }
      switch (this.pageInfo.type) {
        case 0: case 1: // 类型是百分比或者固定金额时
          if (!this.pageInfo.discount_amount) {
            this.errorMessageList.push(this.$t('lang.autoDiscountcode.text79'))
            errNumber += 1
          }
          if (this.pageInfo.suitable_for === 1) { // 适用于特定产品时候
            if (!this.auto_percent_selectedSpecificProducts && this.pageInfo.type === 0) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text80'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 2 && this.pageInfo.type === 0) { // 适用于特定产品系列时候
            if (!this.auto_percent_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text81'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 1) { // 适用于特定产品时候
            if (!this.auto_fixed_selectedSpecificProducts && this.pageInfo.type === 1) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text80'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 2 && this.pageInfo.type === 1) { // 适用于特定产品系列时候
            if (!this.auto_fixed_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text81'))
              errNumber += 1
            }
          }
          break
        case 3:
          if (this.pageInfo.min_require === 2) {
            if (!this.pageInfo.min_goods_num) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text68'))
              errNumber += 1
            }
          }
          if (this.pageInfo.min_require === 1) {
            if (!this.pageInfo.min_money) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text69'))
              errNumber += 1
            }
          }
          if (this.pageInfo.buy_type === 0) {
            if (!this.auto_buy_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text70'))
              errNumber += 1
            }
          }
          if (this.pageInfo.buy_type === 1) {
            if (!this.auto_buy_selectedSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text71'))
              errNumber += 1
            }
          }
          if (!this.pageInfo.get_num) {
            this.errorMessageList.push(this.$t('lang.autoDiscountcode.text72'))
            errNumber += 1
          }
          if (this.pageInfo.get_type === 0) {
            if (!this.auto_get_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text73'))
              errNumber += 1
            }
          }
          if (this.pageInfo.get_type === 1) {
            if (!this.auto_get_selectedSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text74'))
              errNumber += 1
            }
          }
          if (this.pageInfo.discount === 0) {
            if (!this.pageInfo.discount_percent) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text75'))
              errNumber += 1
            }
          }
          if (this.pageInfo.single_use_num.status) {
            if (!this.pageInfo.single_use_num.number) {
              this.errorMessageList.push(this.$t('lang.autoDiscountcode.text76'))
              errNumber += 1
            }
          }
          break
        default:
          break
      }
      return errNumber
    },
    setTheDateToStart (date) { // 设置时间对象到当天0点
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
    },
    save () {
      this.errorMessageList = []
      let errNumber = this.submitValidate()
      console.log(this.errorMessageList)
      if (errNumber) {
        document.getElementById('errorbox').scrollIntoView({ block: 'start', behavior: 'smooth' })
        return
      }
      let sendData
      // 公共相同部分
      sendData = {
        total_type: 1,
        code: this.pageInfo.code,
        type: this.pageInfo.type,
        start_time: this.startTimeStamp / 1000,
        min_require: this.pageInfo.min_require
      }
      if (this.pageInfo.end_time.status) {
        sendData.end_time = this.endTimeStamp / 1000
      }
      // 最低购买金额,最低商品数量被选择时传值
      switch (this.pageInfo.min_require) {
        case 1:
          sendData.min_money = parseFloat(this.pageInfo.min_money)
          break
        case 2:
          sendData.min_goods_num = this.pageInfo.min_goods_num
          break
        default:
          break
      }

      switch (this.pageInfo.type) {
        // 折扣类型是百分比/固定金额时的传值
        case 0:
        case 1:
          console.log(123)
          sendData.discount_amount = parseFloat(
            parseFloat(this.pageInfo.discount_amount).toFixed(2)
          )
          sendData.suitable_for = this.pageInfo.suitable_for
          // 选择特定产品时或者是特定产品系列时的传值
          switch (this.pageInfo.suitable_for) {
            case 1:
              if (this.pageInfo.type === 0) {
                sendData.attrpid = this.dataForSpecificProducts(
                  this.auto_percent_selectedSpecificProducts
                )
              }
              if (this.pageInfo.type === 1) {
                sendData.attrpid = this.dataForSpecificProducts(
                  this.auto_fixed_selectedSpecificProducts
                )
                if (this.pageInfo.is_single) {
                  sendData.is_single = 1
                } else {
                  sendData.is_single = 0
                }
              }
              break
            case 2:
              if (this.pageInfo.type === 0) {
                sendData.collection_id = this.dataForSeriesOfSpecificProducts(
                  this.auto_percent_selectedSeriesOfSpecificProducts
                )
              }
              if (this.pageInfo.type === 1) {
                sendData.collection_id = this.dataForSeriesOfSpecificProducts(
                  this.auto_fixed_selectedSeriesOfSpecificProducts
                )
                if (this.pageInfo.is_single) {
                  sendData.is_single = 1
                } else {
                  sendData.is_single = 0
                }
              }
              break
            default:
              break
          }
          break

        case 3:
          // 客户购买选择特定产品或者系列
          switch (this.pageInfo.buy_type) {
            case 1:
              sendData.buy_type = this.pageInfo.buy_type
              sendData.buy_attrpid = this.dataForSpecificProducts(
                this.auto_buy_selectedSpecificProducts
              )
              break
            case 0: // 系列
              sendData.buy_type = this.pageInfo.buy_type
              sendData.buy_collectid = this.dataForSeriesOfSpecificProducts(
                this.auto_buy_selectedSeriesOfSpecificProducts
              )
              break

            default:
              break
          }

          sendData.get_num = parseInt(this.pageInfo.get_num, 0)

          // 客户获得选择特定产品或者系列
          switch (this.pageInfo.get_type) {
            case 1:
              sendData.get_type = this.pageInfo.get_type
              sendData.get_attrpid = this.dataForSpecificProducts(
                this.auto_get_selectedSpecificProducts
              )
              break
            case 0:
              sendData.get_type = this.pageInfo.get_type
              sendData.get_collectid = this.dataForSeriesOfSpecificProducts(
                this.auto_get_selectedSeriesOfSpecificProducts
              )
              break

            default:
              break
          }
          // 折扣选择类型
          sendData.discount = this.pageInfo.discount
          switch (this.pageInfo.discount) {
            case 0:
              sendData.discount_percent = this.pageInfo.discount_percent
              break
            default:
              break
          }
          // 设置每个订单的最大使用次数
          if (this.pageInfo.single_use_num.status) {
            sendData.single_use_num = this.pageInfo.single_use_num.number
          } else {
            sendData.single_use_num = ''
          }
          break
        default:
          break
      }
      if (this.discountId !== 'new') {
        sendData.discount_id = this.discountId
        savediscountAutodiscount(sendData).then(res => {
          console.log(res)
          messageAlert(res)
          if (res.data.code === 1) {
            setTimeout(() => {
              this.$router.push({
                path: '/administratorPanel/discount/automaticDiscount',
                query: { status: 'all' }
              })
            }, 2000)
          }
        })
      }
      if (this.discountId === 'new') {
        addDiscountOrAutodiscount(sendData).then(res => {
          console.log(res)
          messageAlert(res)
          if (res.data.code === 1) {
            setTimeout(() => {
              this.$router.push({
                path: '/administratorPanel/discount/automaticDiscount',
                query: { status: 'all' }
              })
            }, 2000)
          }
        })
      }
      console.log(sendData)
    },
    ...mapMutations(['forClickTime']),
    ...mapMutations(['forSpecific_modal_search']),
    ...mapMutations(['forSeriesOfSpecific_modal_search']),
    ...mapMutations(['auto_percent_addSpecificProducts']),
    ...mapMutations(['auto_percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_fixed_addSpecificProducts']),
    ...mapMutations(['auto_fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_buy_addSpecificProducts']),
    ...mapMutations(['auto_buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['auto_get_addSpecificProducts']),
    ...mapMutations(['auto_get_addSeriesOfSpecificProducts']),
    ...mapMutations(['forRightLoadingVisible'])
  },
  created () {
    if (this.discountId === 'new') {
      // 时间初始化
      let date = new Date()
      this.setTheDateToStart(date)
      this.takeEffectDate = date
      this.takeEffectTime = getTime(new Date())
      this.endDate = date
      this.endTime = '23:59'
    }
    if (this.discountId !== 'new') {
      this.pageInitializationRequestEnd = false
      this.forRightLoadingVisible(true)
      // 初始化页面的值
      getDiscountDetail({ discount_id: this.discountId }).then(res => {
        this.forRightLoadingVisible(false)
        this.pageInitializationRequestEnd = true
        console.log(res)
        let resData = res.data.data
        // ****公共部分****** //
        this.pageInfo.code = resData.code
        this.pageInfo.type = resData.type
        this.pageInfo.status = resData.status
        // 时间转换
        let startDate = new Date(resData.start_time)
        this.setTheDateToStart(startDate)
        this.takeEffectDate = startDate
        this.takeEffectTime = getTime(resData.start_time)
        if (resData.end_time) {
          let endDate = new Date(resData.end_time)
          this.setTheDateToStart(endDate)
          this.endDate = endDate
          this.pageInfo.end_time.status = true
          this.endTime = getTime(resData.end_time)
        } else {
          this.endDate = this.takeEffectDate
          this.endTime = '23:59'
        }
        this.pageInfo.min_require = resData.min_require
        switch (resData.min_require) {
          case 1:
            this.pageInfo.min_money = resData.min_money
            break

          case 2:
            this.pageInfo.min_goods_num = resData.min_goods_num
            break
          default:
            break
        }
        // ********** //
        switch (res.data.data.type) {
          case 0: // 百分比时候
            this.pageInfo.discount_amount = resData.discount_amount
            this.pageInfo.suitable_for = resData.suitable_for
            switch (resData.suitable_for) {
              case 1:
                resData.special_product.forEach(item => {
                  item.type = 'auto_percent'
                })
                this.auto_percent_addSpecificProducts(resData.special_product)
                break
              case 2:
                resData.resData.special_collection.forEach(item => {
                  item.type = 'auto_percent'
                })
                this.auto_percent_addSeriesOfSpecificProducts(
                  resData.special_collection
                )
                break
              default:
                break
            }
            break
          case 1: // 固定金额时候
            this.pageInfo.discount_amount = resData.discount_amount
            this.pageInfo.suitable_for = resData.suitable_for
            switch (resData.suitable_for) {
              case 1:
                resData.special_product.forEach(item => {
                  item.type = 'auto_fixed'
                })
                this.auto_fixed_addSpecificProducts(resData.special_product)
                if (resData.is_single) {
                  this.pageInfo.is_single = true
                } else {
                  this.pageInfo.is_single = false
                }
                break
              case 2:
                resData.special_collection.forEach(item => {
                  item.type = 'auto_fixed'
                })
                this.auto_fixed_addSeriesOfSpecificProducts(
                  resData.special_collection
                )
                if (resData.is_single) {
                  this.pageInfo.is_single = true
                } else {
                  this.pageInfo.is_single = false
                }
                break
              default:
                break
            }
            break
          case 3:
            this.pageInfo.buy_type = resData.buy_type
            switch (resData.buy_type) {
              case 0:
                resData.buy_collection.forEach(item => {
                  item.type = 'auto_buy'
                })
                this.auto_buy_addSeriesOfSpecificProducts(
                  resData.buy_collection
                )
                break
              case 1:
                resData.buy_product.forEach(item => {
                  item.type = 'auto_buy'
                })
                this.auto_buy_addSpecificProducts(resData.buy_product)
                break
              default:
                break
            }
            this.pageInfo.get_num = resData.get_num
            this.pageInfo.get_type = resData.get_type
            switch (resData.get_type) {
              case 0:
                resData.get_collection.forEach(item => {
                  item.type = 'auto_get'
                })
                this.auto_get_addSeriesOfSpecificProducts(
                  resData.get_collection
                )
                break
              case 1:
                resData.get_product.forEach(item => {
                  item.type = 'auto_get'
                })
                this.auto_get_addSpecificProducts(resData.get_product)
                break
              default:
                break
            }
            this.pageInfo.discount = resData.discount
            if (resData.discount === 0) {
              this.pageInfo.discount_percent = resData.discount_percent
            }
            if (resData.single_use_num) {
              this.pageInfo.single_use_num.status = true
              this.pageInfo.single_use_num.number = resData.single_use_num
            }
            break
          default:
            break
        }
      })
    }
  },
  destroyed () {
    this.auto_percent_addSpecificProducts(null)
    this.auto_percent_addSeriesOfSpecificProducts(null)
    this.auto_fixed_addSpecificProducts(null)
    this.auto_fixed_addSeriesOfSpecificProducts(null)
    this.auto_buy_addSpecificProducts(null)
    this.auto_buy_addSeriesOfSpecificProducts(null)
    this.auto_get_addSpecificProducts(null)
    this.auto_get_addSeriesOfSpecificProducts(null)
  }
}
</script>
<style lang="less" scoped>
.c-createAutomaticDiscount {
  max-width: 772px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 275px;
  .content-createAutomaticDiscount {
    .top {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      .left {
        .title {
          font-size: 30px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-right: 16px;
        }
        .order-number {
          font-size: 22px;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          margin-right: 12px;
        }
      }
      .right {
        font-size: 18px;
        padding-right: 20px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 18px;
        display: flex;
        align-items: center;
        color: #4267b2;
        .icon-fanhui1 {
          font-size: 14px;
        }
      }
      .right:hover {
        cursor: pointer;
      }
    }
    .title-sapn {
      color: rgba(0, 0, 0, 1);
      font-size: 20px;
    }
    .c-disableOrEnable {
      font-size: 18px;
      color: #4267b2;
      margin-top: 23px;
      margin-bottom: 12px;
      span {
        cursor: pointer;
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
    .box {
      background: rgba(255, 255, 255, 1);
      border: 0px solid rgba(112, 70, 16, 1);
      box-shadow: 0px 11px 32px 3px rgba(95, 95, 95, 0.13);
      border-radius: 10px;
      margin-bottom: 17px;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 24px;
      }
      .c-type-check {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 29px;
      }
      .c-type-check:last-child {
        margin-bottom: 0;
      }
      .c-search {
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
          padding-left: 37px;
          height: 45px;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
      }
    }
    .box-autoDiscount-title {
      padding: 41px 36px 37px 36px;
      .c-box-autoDiscount-title-top {
        margin-bottom: 15px;
        .text1 {
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
      }
      /deep/ .el-input {
        width: 100%;
      }
      /deep/ .el-input__inner {
        height: 58px;
      }
      .tip {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-top: 17px;
      }
    }
    .box-type {
      padding: 32px 0 37px 30px;
    }
    .box-customer-buy {
      .c-check {
        padding: 0 55px 0 44px;
      }
      .title {
        padding-left: 44px;
        padding-top: 29px;
      }
      .box-customer-buy-top {
        padding: 29px 55px 20px 44px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        .c-input-customer-buy-number {
          float: left;
          margin-bottom: 30px;
          width: 27%;
          .text {
            font-size: 14px;
            margin-bottom: 7px;
          }
          /deep/ .el-input {
            width: 100%;
          }
          /deep/ .el-input__inner {
            height: 45px;
          }
          .input-money {
            position: relative;
            /deep/ .el-input {
              width: calc(100% - 30px);
            }
            /deep/ .el-input__inner {
              padding-left: 30px;
              height: 45px;
            }
            .dollar-sign {
              position: absolute;
              bottom: 15px;
              left: 10px;
            }
          }
        }
        .c-select-customer-buy {
          float: right;
          margin-bottom: 30px;
          width: 56%;
          .text {
            font-size: 14px;
            margin-bottom: 7px;
          }
          .el-select {
            width: 100%;
          }
          /deep/ .el-input__inner {
            height: 45px;
          }
        }
      }
    }
    .box-customer-get {
      .box-customer-get-top {
        padding: 29px 55px 20px 44px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        .tip {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 19px;
        }
        .c-input-customer-get-number {
          float: left;
          margin-bottom: 30px;
          width: 27%;
          .text {
            font-size: 14px;
            margin-bottom: 7px;
          }
          /deep/ .el-input {
            width: 100%;
          }
          /deep/ .el-input__inner {
            height: 45px;
          }
        }
        .c-select-customer-get {
          float: right;
          margin-bottom: 30px;
          width: 56%;
          .text {
            font-size: 14px;
            margin-bottom: 7px;
          }
          // select框样式修改
          .el-select {
            width: 100%;
          }
          /deep/ .el-input__inner {
            height: 45px;
          }
        }
        .text {
          font-size: 14px;
          color: rgba(8, 8, 8, 1);
          margin-bottom: 17px;
          margin-top: 22px;
        }
        .c-discount-input {
          margin-left: 20px;
          display: inline-block;
          position: relative;
          .percent {
            position: absolute;
            right: 15px;
            top: 17px;
            font-size: 20px;
          }
          /deep/ .el-input {
            width: 224px;
          }
          /deep/ .el-input__inner {
            padding-left: 17px;
            height: 56px;
          }
        }
      }
      .box-customer-get-btm {
        padding: 24px 0 32px 46px;
        /deep/ .el-input {
          width: 210px;
        }
        /deep/ .el-input__inner {
          height: 45px;
        }
      }
    }
    .box-discounts-scope {
      .box-discounts-scope-top {
        padding: 29px 0 34px 39px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
        .text2 {
          font-size: 16px;
          font-family: DengXian;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 17px;
        }
        .c-discount-input-percentage {
          display: inline-block;
          position: relative;
          .percent {
            position: absolute;
            right: 15px;
            top: 17px;
            font-size: 20px;
          }
          /deep/ .el-input {
            width: 224px;
          }
          /deep/ .el-input__inner {
            height: 56px;
          }
        }
        .c-discount-input-fixed-amount {
          display: inline-block;
          position: relative;
          .dollar {
            position: absolute;
            left: 15px;
            top: 17px;
            font-size: 20px;
          }
          /deep/ .el-input {
            width: 224px;
          }
          /deep/ .el-input__inner {
            height: 56px;
            padding-left: 35px;
          }
        }
      }
      .box-discounts-scope-btm {
        padding: 20px 0 40px 0;
        .text1 {
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 28px;
          padding-left: 39px;
          padding-right: 39px;
        }
        .c-radio {
          padding-left: 39px;
          padding-right: 39px;
          margin-bottom: 20px;
        }
        .special {
          margin-top: 25px;
          padding-left: 39px;
          padding-right: 39px;
          .tip {
            font-size: 16px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-top: 15px;
            padding-left: 27px;
          }
        }
        .box-discounts-scope-btm-search {
          padding-left: 39px;
          padding-right: 39px;
        }
      }
    }
    .box-effective-date {
      padding: 33px 24px 40px 40px;
      margin-bottom: 30px;
      .c-date-and-time-pick {
        .c-date-pick {
          float: left;
          margin-bottom: 20px;
          .text {
            margin-bottom: 19px;
          }
        }
        .c-time-pick {
          float: right;
          margin-bottom: 20px;
          width: 44.8%;
          .text {
            margin-bottom: 19px;
          }
        }
        /deep/ .el-input {
          width: 100%;
        }
        /deep/ .el-input__inner {
          padding-left: 30px;
          height: 50px;
        }
      }
    }
    .box-explain {
      padding: 52px 45px 47px 45px;
      margin-bottom: 30px;
      .tip {
        font-size: 16px;
        font-weight: bold;
        color: rgba(137, 137, 137, 1);
      }
    }
    .c-button {
      text-align: end;
      position: relative;
      .btn-save {
        margin-left: 20px;
      }
      .btn-delete {
        position: absolute;
        left: 0;
      }
    }
    // select框样式修改
    .select {
    }
  }
}
// 模态窗样式修改
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
    .list {
      padding: 22px 32px 19px 33px;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      cursor: pointer;
    }
    .special {
      cursor: default !important;
    }
    .title {
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 13px;
    }
    .instructions {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .btn-cancel {
    margin-right: 10px;
  }
}
.el-checkbox {
  margin-right: 6px;
}
p {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
