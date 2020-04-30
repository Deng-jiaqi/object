<template>
  <div class="c-createDiscountCode" v-show="pageInitializationRequestEnd">
    <div class="content-createDiscountCode">
      <!-- top -->
      <div class="top">
        <span @click="back" class="iconfont icon-fanhui1"></span>
        <span class="title" v-if="discountId==='new'">{{$t('lang.discountcode.text1')}}</span>
        <span class="title" v-if="discountId!=='new'">{{pageInfo.code}}</span>
      </div>
      <div class="c-disableOrEnable" v-show="discountId!=='new'">
        <div class="disable" v-show="!pageInfo.status">
          <span @click="openOperationModal(0)">{{$t('lang.discountcode.enable')}}</span>
        </div>
        <div class="enable" v-show="pageInfo.status">
          <span @click="openOperationModal(1)">{{$t('lang.discountcode.disable')}}</span>
        </div>
      </div>
      <!-- 错误提示框 -->
      <div class="c-error-messagebox" id='errorbox'>
        <div class='error-messagebox'  v-show='errorMessageList.length>0'>
        <p class='error-messagebox-title'>此折扣码的错误：</p>
        <ul>
          <li class='error-messagebox-error' v-for='(item,index) in errorMessageList' :key='index'>
            <span class="error-messagebox-circle"></span>
            <span>{{item}}</span>
          </li>
        </ul>
        </div>
      </div>
      <!-- 折扣码框 -->
      <div class="box box-discount-code">
        <div class="c-box-discount-code-top">
          <span class="text1">{{$t('lang.discountcode.text3')}}</span>
          <span class="text2" @click="createCode">{{$t('lang.discountcode.text4')}}</span>
        </div>
        <el-input v-model="pageInfo.code"></el-input>
        <p class="tip">{{$t('lang.discountcode.text5')}}</p>
      </div>
      <!-- 类型选择框 -->
      <div class="box box-type">
        <p class="title">{{$t('lang.discountcode.text6')}}</p>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="0">{{$t('lang.discountcode.text7')}}</el-radio>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="1">{{$t('lang.discountcode.text8')}}</el-radio>
          <span></span>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="2">{{$t('lang.discountcode.text9')}}</el-radio>
          <span></span>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.type" :label="3">{{$t('lang.discountcode.text10')}}</el-radio>
        </div>
      </div>
      <!-- 客户购买/消费框 -->
      <div class="box box-customer-buy" v-show="pageInfo.type===3">
        <p class="title" v-show="pageInfo.xy_min_require==2">{{$t('lang.discountcode.text52')}}</p>
        <p class="title" v-show="pageInfo.xy_min_require==1">{{$t('lang.discountcode.text53')}}</p>
        <div class="c-check">
          <div class="c-type-check">
            <el-radio v-model="pageInfo.xy_min_require" :label="2">{{$t('lang.discountcode.text54')}}</el-radio>
          </div>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.xy_min_require" :label="1">{{$t('lang.discountcode.text55')}}</el-radio>
          </div>
        </div>
        <div class="box-customer-buy-top clearfix">
          <div class="c-input-customer-buy-number">
            <div v-show="pageInfo.xy_min_require===2">
              <p class="text">{{$t('lang.discountcode.text56')}}</p>
              <el-input v-model="pageInfo.xy_min_goods_num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </div>
            <div class="input-money" v-show="pageInfo.xy_min_require===1">
              <p class="text">{{$t('lang.discountcode.text57')}}</p>
              <el-input v-model="pageInfo.xy_min_money" @input.native="oninput"></el-input>
              <div class="dollar-sign">$</div>
            </div>
          </div>
          <div class="select c-select-customer-buy">
            <p class="text">{{$t('lang.discountcode.text58')}}</p>
            <el-select v-model="pageInfo.buy_type" :placeholder="$t('lang.discountcode.text59')">
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
              :placeholder="$t('lang.discountcode.text15')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSpecificProduct('buy')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <div class="c-search" v-show="pageInfo.buy_type===0">
            <el-input
              v-model="buy_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.discountcode.text18')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSeriesOfSpecificProduct('buy')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <!-- 特定产品 -->
          <SpecificProduct
            v-show="pageInfo.buy_type===1&&buy_selectedSpecificProducts"
            :data="buy_selectedSpecificProducts"
          />
          <!-- 特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.buy_type===0&&buy_selectedSeriesOfSpecificProducts"
            :data="buy_selectedSeriesOfSpecificProducts"
          />
        </div>
      </div>
      <!-- 客户获得框 -->
      <div class="box box-customer-get" v-show="pageInfo.type===3">
        <div class="box-customer-get-top">
          <p class="title">{{$t('lang.discountcode.text60')}}</p>
          <p class="tip">{{$t('lang.discountcode.text61')}}</p>
          <div class="c-input-customer-get-number">
            <p class="text">{{$t('lang.discountcode.text56')}}</p>
            <el-input v-model="pageInfo.get_num" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
          </div>
          <div class="select c-select-customer-get">
            <p class="text">{{$t('lang.discountcode.text58')}}</p>
            <el-select v-model="pageInfo.get_type" :placeholder="$t('lang.discountcode.text59')">
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
              :placeholder="$t('lang.discountcode.text15')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSpecificProduct('get')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <div class="c-search" v-show="pageInfo.get_type===0">
            <el-input
              v-model="get_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.discountcode.text18')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              @click="browseSeriesOfSpecificProduct('get')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <!-- 特定产品 -->
          <SpecificProduct
            v-show="pageInfo.get_type===1&&get_selectedSpecificProducts"
            :data="get_selectedSpecificProducts"
          />
          <!-- 特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.get_type===0&&get_selectedSeriesOfSpecificProducts"
            :data="get_selectedSeriesOfSpecificProducts"
          />
          <p class="text">{{$t('lang.discountcode.text62')}}</p>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount" :label="0">{{$t('lang.discountcode.text63')}}</el-radio>
            <div class="c-discount-input" v-show="pageInfo.discount===0">
              <el-input v-model="pageInfo.discount_percent" @input.native="oninput"></el-input>
              <span class="percent">%</span>
            </div>
          </div>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount" :label="1">{{$t('lang.discountcode.text64')}}</el-radio>
          </div>
        </div>
        <div class="box-customer-get-btm">
          <div class="c-type-check">
            <el-checkbox v-model="pageInfo.single_use_num.status" />
            <span>{{$t('lang.discountcode.text65')}}</span>
            &nbsp;&nbsp;&nbsp;
            <el-input
              v-show="pageInfo.single_use_num.status"
              v-model="pageInfo.single_use_num.number"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 国家地区选择框 -->
      <div class="box box-geographical-position" v-show="pageInfo.type===2">
        <div class="box-geographical-position-top">
          <p class="title">{{$t('lang.discountcode.text47')}}</p>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount_area" :label="0">{{$t('lang.discountcode.text48')}}</el-radio>
          </div>
          <div class="c-type-check">
            <el-radio v-model="pageInfo.discount_area" :label="1">{{$t('lang.discountcode.text49')}}</el-radio>
          </div>
          <div class="c-search" v-show="pageInfo.discount_area!==0">
            <el-input v-model="country_search" prefix-icon="iconfont icon-sousuo4" :placeholder="$t('lang.discountcode.text92')"></el-input>
            <button @click="openCountryModal">{{$t('lang.discountcode.text17')}}</button>
          </div>
          <Country v-show="selectedCountries.length>0&&pageInfo.discount_area!==0" />
        </div>
        <div class="box-geographical-position-btm">
          <p class="text">{{$t('lang.discountcode.text50')}}</p>
          <div class="c-type-check">
            <el-checkbox v-model="pageInfo.limit_shipping.status" />
            <span>{{$t('lang.discountcode.text51')}}</span>
          </div>
          <div class="c-discount-input-specific-amount" v-show="pageInfo.limit_shipping.status">
            <el-input v-model="pageInfo.limit_shipping.amount" @input.native="oninput"></el-input>
            <span class="dollar">$</span>
          </div>
        </div>
      </div>
      <!-- 适用于/折扣额框 -->
      <div class="box box-discounts-scope" v-show="pageInfo.type===0||pageInfo.type===1">
        <div class="box-discounts-scope-top">
          <p class="title">{{$t('lang.discountcode.text11')}}</p>
          <p class="text2">{{$t('lang.discountcode.text12')}}</p>
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
          <p class="text1">{{$t('lang.discountcode.text13')}}</p>
          <div class="c-radio">
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="0"
              >{{$t('lang.discountcode.text14')}}</el-radio>
            </div>
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="1"
              >{{$t('lang.discountcode.text15')}}</el-radio>
            </div>
            <div class="c-type-check">
              <el-radio
                v-model="pageInfo.suitable_for"
                :label="2"
              >{{$t('lang.discountcode.text18')}}</el-radio>
            </div>
          </div>
          <!-- 百分比时的搜索框 -->
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===0&&pageInfo.suitable_for===1"
          >
            <el-input
              v-model="percent_search_specificProducts"
              :placeholder="$t('lang.discountcode.text15')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSpecificProduct('percent')"
            >{{$t('lang.discountcode.text17')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSpecificProduct('fixed')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===0&&pageInfo.suitable_for===2"
          >
            <el-input
              v-model="percent_search_SeriesOfSpecificProduct"
              :placeholder="$t('lang.discountcode.text18')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSeriesOfSpecificProduct('percent')"
            >{{$t('lang.discountcode.text17')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSeriesOfSpecificProduct('fixed')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <!-- 固定金额时的搜索框 -->
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===1&&pageInfo.suitable_for===1"
          >
            <el-input
              v-model="fixed_search_specificProducts"
              :placeholder="$t('lang.discountcode.text15')"
              prefix-icon="iconfont icon-sousuo4"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSpecificProduct('percent')"
            >{{$t('lang.discountcode.text17')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSpecificProduct('fixed')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <div
            class="box-discounts-scope-btm-search c-search"
            v-show="pageInfo.type===1&&pageInfo.suitable_for===2"
          >
            <el-input
              v-model="fixed_search_SeriesOfSpecificProduct"
              prefix-icon="iconfont icon-sousuo4"
              :placeholder="$t('lang.discountcode.text18')"
            ></el-input>
            <button
              v-preventReClick
              v-show="pageInfo.type===0"
              @click="browseSeriesOfSpecificProduct('percent')"
            >{{$t('lang.discountcode.text17')}}</button>
            <button
              v-preventReClick
              v-show="pageInfo.type===1"
              @click="browseSeriesOfSpecificProduct('fixed')"
            >{{$t('lang.discountcode.text17')}}</button>
          </div>
          <!-- 百分比时特定产品 -->
          <SpecificProduct
            v-show="pageInfo.type===0&&pageInfo.suitable_for===1&&percent_selectedSpecificProducts"
            :data="percent_selectedSpecificProducts"
          />
          <!-- 百分比时特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.type===0&&pageInfo.suitable_for===2&&percent_selectedSeriesOfSpecificProducts"
            :data="percent_selectedSeriesOfSpecificProducts"
          />
          <!-- 固定金额时特定产品 -->
          <SpecificProduct
            v-show="pageInfo.type===1&&pageInfo.suitable_for===1&&fixed_selectedSpecificProducts"
            :data="fixed_selectedSpecificProducts"
          />
          <!-- 固定金额时特定产品系列 -->
          <SeriesOfSpecificProduct
            v-show="pageInfo.type===1&&pageInfo.suitable_for===2&&fixed_selectedSeriesOfSpecificProducts"
            :data="fixed_selectedSeriesOfSpecificProducts"
          />
          <div class="c-type-check special" v-show="pageInfo.type===1&&pageInfo.suitable_for!==0">
            <el-checkbox v-model="pageInfo.is_single" />
            <span>{{$t('lang.discountcode.text25')}}</span>
            <p class="tip">{{$t('lang.discountcode.text26')}}</p>
          </div>
        </div>
      </div>
      <!-- 最低要求 -->
      <div class="box box-mini-Requirements" v-show="pageInfo.type!==3">
        <p class="title">{{$t('lang.discountcode.text19')}}</p>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.min_require" :label="0">{{$t('lang.discountcode.text20')}}</el-radio>
        </div>
        <div class="c-type-check c-minimum-amount">
          <el-radio v-model="pageInfo.min_require" :label="1">{{$t('lang.discountcode.text21')}} (￥)</el-radio>
          <div class="c-minimum-amount-input" v-show="pageInfo.min_require===1">
            <el-input v-model="pageInfo.min_money" @input.native="oninput"></el-input>
            <span class="dollar">$</span>
          </div>
          <p class="tip1" v-show="pageInfo.min_require===1">{{$t('lang.discountcode.text22')}}</p>
        </div>
        <div class="c-type-check c-minimum-quantity">
          <el-radio v-model="pageInfo.min_require" :label="2">{{$t('lang.discountcode.text23')}}</el-radio>
          <div class="c-minimum-quantity-input" v-show="pageInfo.min_require===2">
            <el-input v-model="pageInfo.min_goods_num" oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
          </div>
          <p class="tip2" v-show="pageInfo.min_require===2">{{$t('lang.discountcode.text24')}}</p>
        </div>
      </div>
      <!-- 客户资格 -->
      <div class="box box-customer-qualification">
        <p class="title">{{$t('lang.discountcode.text27')}}</p>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.client_require" :label="0">{{$t('lang.discountcode.text28')}}</el-radio>
        </div>
        <!-- <div class="c-type-check">
          <el-radio v-model="pageInfo.client_require" :label="1">特定客户</el-radio>
        </div>
        <div class="c-type-check">
          <el-radio v-model="pageInfo.client_require" :label="2">特定的客户组</el-radio>
        </div>
        <div class="c-search">
          <el-input></el-input>
          <button>浏览</button>
        </div>
        <p class="tip">选择可以使用此折扣的客户组。</p>-->
      </div>
      <!-- 使用限制 -->
      <div class="box box-use-restrictions">
        <p class="title">{{$t('lang.discountcode.text29')}}</p>
        <div class="c-type-check c-use-number">
          <el-checkbox v-model="pageInfo.use_amount.status" />
          <span>{{$t('lang.discountcode.text30')}}</span>
          <div class="c-use-number-input">
            <el-input v-show="pageInfo.use_amount.status" v-model="pageInfo.use_amount.number"></el-input>
          </div>
        </div>
        <div class="c-type-check">
          <el-checkbox v-model="pageInfo.client_once" />
          <span>{{$t('lang.discountcode.text31')}}</span>
        </div>
      </div>
      <!-- 生效日期 -->
      <div class="box box-effective-date">
        <p class="title">{{$t('lang.discountcode.text32')}}</p>
        <div class="c-date-and-time-pick">
          <div class="clearfix">
            <div class="c-date-pick">
              <p class="text">{{$t('lang.discountcode.text33')}}</p>
              <el-date-picker
                :picker-options="pickerOptionsStart"
                v-model="takeEffectDate"
                type="date"
                :placeholder="$t('lang.discountcode.text41')"
              ></el-date-picker>
            </div>
            <div class="c-time-pick">
              <p class="text">{{$t('lang.discountcode.text34')}}</p>
              <el-time-select
                v-model="takeEffectTime"
                :picker-options="{start: '00:00',step: '00:15', end: '24:00'}"
                :placeholder="$t('lang.discountcode.text42')"
              ></el-time-select>
            </div>
          </div>
          <div class="c-type-check">
            <el-checkbox v-model="pageInfo.end_time.status" />
            <span>{{$t('lang.discountcode.text35')}}</span>
          </div>
          <!-- 结束日期 -->
          <div class="clearfix" v-show="pageInfo.end_time.status">
            <div class="c-date-pick">
              <p class="text">{{$t('lang.discountcode.text36')}}</p>
              <el-date-picker
                :picker-options="pickerOptionsEnd"
                v-model="endDate"
                type="date"
                :placeholder="$t('lang.discountcode.text41')"
              ></el-date-picker>
            </div>
            <div class="c-time-pick">
              <p class="text">{{$t('lang.discountcode.text37')}}</p>
              <el-time-select
                v-model="endTime"
                :picker-options="{start: '00:00',step: '00:15', end: '24:00',minTime: takeEffectTime}"
                :placeholder="$t('lang.discountcode.text42')"
              ></el-time-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="c-button">
        <el-button
          @click="deleteDiscountVisible=true"
          class="btn-delete"
          v-show="discountId!=='new'"
          type="danger"
        >{{$t('lang.discountcode.text40')}}</el-button>
        <el-button @click="cancel" plain>{{$t('lang.discountcode.text38')}}</el-button>
        <el-button
          :disabled="pageInfo.code===''"
          @click="save"
          type="primary"
        >{{$t('lang.discountcode.text39')}}</el-button>
      </div>
      <!-- 禁用折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.discountcode.text70')} ${pageInfo.code}？`"
          :visible.sync="disableDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.discountcode.text71')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button
              plain
              @click="disableDiscountVisible=false"
            >{{$t('lang.discountcode.text72')}}</el-button>
            <el-button type="primary" @click="disableDiscount">{{$t('lang.discountcode.text73')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 启用折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.discountcode.text66')} ${pageInfo.code}？`"
          :visible.sync="enableDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.discountcode.text67')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button plain @click="enableDiscountVisible=false">{{$t('lang.discountcode.text68')}}</el-button>
            <el-button type="primary" @click="enableDiscount">{{$t('lang.discountcode.text69')}}</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 特定国家模态窗 -->
      <CountryModalWindow ref="countryModalWindow" />
      <!-- 特定产品模态窗 -->
      <SpecificProductModalWindow ref="specificProductModalWindow" />
      <!-- 删除折扣模态窗 -->
      <div class="modal">
        <el-dialog
          :title="`${$t('lang.discountcode.text43')} ${pageInfo.code}`"
          :visible.sync="deleteDiscountVisible"
          width="100%"
        >
          <div class="list">
            <p class="instructions">{{$t('lang.discountcode.text44')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button plain @click="deleteDiscountVisible=false">{{$t('lang.discountcode.text45')}}</el-button>
            <el-button type="danger" @click="deleteDiscount">{{$t('lang.discountcode.text46')}}</el-button>
          </span>
        </el-dialog>
      </div>
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
import CountryModalWindow from '@/components/administratorPanel/discount/countryModalWindow'
import AttrModalWindow from '@/components/administratorPanel/discount/attrModalWindow'
import Country from '@/components/administratorPanel/discount/country'
import SpecificProduct from '@/components/administratorPanel/discount/specificProduct'
import SeriesOfSpecificProduct from '@/components/administratorPanel/discount/seriesOfSpecificProduct'
import {
  getDiscountDetail,
  addDiscountOrAutodiscount,
  discountOperation,
  savediscountAutodiscount
} from '@/common/api/api.js'
import { randomString } from '@/utils/randomString'
import { getTime } from '@/utils/timeTransformation'
import messageAlert from '@/utils/messageAlert'
import { cloneDeep } from 'lodash'
export default {
  components: {
    SpecificProductModalWindow,
    SeriesOfSpecificProductModalWindow,
    AttrModalWindow,
    SpecificProduct,
    SeriesOfSpecificProduct,
    CountryModalWindow,
    Country
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
        total_type: 0,
        code: '',
        type: 0,
        status: 0,
        end_time: {
          status: false
        },
        use_amount: {
          status: false,
          number: null
        },
        client_once: false,
        client_require: 0,
        // 最低需求   （买x送y时没有0---即为无时候的情况）
        min_require: 0,
        min_money: null,
        min_goods_num: null,
        xy_min_require: 2,
        xy_min_money: null,
        xy_min_goods_num: null,
        // 固定金额/百分比时特有
        discount_amount: null, // 百分比/固定金额
        suitable_for: 0, // 适用于
        attrpid: ['1-1'],
        collection_id: '1',
        // 固定金额折扣特有的 （当不选择适用于整个订单时的可选项）
        is_single: true,
        // 免费送货特有的
        discount_area: 0,
        limit_shipping: {
          status: false,
          amount: null
        },
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
      country_search: '',
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
    ...mapState(['selectedCountries']),
    ...mapState(['percent_selectedSpecificProducts']),
    ...mapState(['percent_selectedSeriesOfSpecificProducts']),
    ...mapState(['fixed_selectedSpecificProducts']),
    ...mapState(['fixed_selectedSeriesOfSpecificProducts']),
    ...mapState(['buy_selectedSpecificProducts']),
    ...mapState(['buy_selectedSeriesOfSpecificProducts']),
    ...mapState(['get_selectedSpecificProducts']),
    ...mapState(['get_selectedSeriesOfSpecificProducts'])
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
    country_search: {
      handler (val) {
        if (val) {
          this.$refs.countryModalWindow.modalWindowVisible = true
          this.forCountry_modal_search(this.country_search)
          this.country_search = ''
        }
      }
    },
    percent_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.percent_search_specificProducts)
          this.percent_search_specificProducts = ''
          this.forClickTime('percent')
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
          this.forClickTime('percent')
        }
      }
    },
    fixed_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.fixed_search_specificProducts)
          this.fixed_search_specificProducts = ''
          this.forClickTime('fixed')
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
          this.forClickTime('fixed')
        }
      }
    },
    buy_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.buy_search_specificProducts)
          this.buy_search_specificProducts = ''
          this.forClickTime('buy')
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
          this.forClickTime('buy')
        }
      }
    },
    get_search_specificProducts: {
      handler (val) {
        if (val) {
          this.$refs.specificProductModalWindow.modalWindowVisible = true
          this.forSpecific_modal_search(this.get_search_specificProducts)
          this.get_search_specificProducts = ''
          this.forClickTime('get')
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
          this.forClickTime('get')
        }
      }
    }
  },
  methods: {
    ...mapMutations(['forClickTime']),
    ...mapMutations(['forCountry_modal_search']),
    ...mapMutations(['forSelectedCountries']),
    ...mapMutations(['forSpecific_modal_search']),
    ...mapMutations(['forSeriesOfSpecific_modal_search']),
    ...mapMutations(['percent_addSpecificProducts']),
    ...mapMutations(['percent_addSeriesOfSpecificProducts']),
    ...mapMutations(['fixed_addSpecificProducts']),
    ...mapMutations(['fixed_addSeriesOfSpecificProducts']),
    ...mapMutations(['buy_addSpecificProducts']),
    ...mapMutations(['buy_addSeriesOfSpecificProducts']),
    ...mapMutations(['get_addSpecificProducts']),
    ...mapMutations(['get_addSeriesOfSpecificProducts']),
    ...mapMutations(['forRightLoadingVisible']),
    createCode () {
      this.pageInfo.code = randomString()
    },
    oninput (e) {
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    },
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
            this.disableDiscountVisible = false
          }
        }
      )
    },
    enableDiscount () {
      discountOperation({ discount_id: [this.discountId], type: 0 }).then(
        res => {
          console.log(res)
          if (res.data.code === 1) {
            this.pageInfo.status = 1
            this.enableDiscountVisible = false
          }
        }
      )
    },
    async deleteDiscount () {
      const res = await discountOperation({
        discount_id: [this.discountId],
        type: 2
      })
      if (res.data.code === 1) {
        this.deleteDiscountVisible = false
        this.$message({
          message: `${res.data.msg}`,
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            path: '/administratorPanel/indexOfDiscount/discountCode',
            query: { status: 'all' }
          })
        }, 1000)
      }
    },
    openCountryModal () {
      this.$refs.countryModalWindow.modalWindowVisible = true
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
    submitValidate () { // 提交时候验证页面数据是否提交完整
      let errNumber = 0
      // 公共部分
      if (this.pageInfo.code === '') {
        this.errorMessageList.push(this.$t('lang.discountcode.text101'))
        errNumber += 1
      }
      if (this.pageInfo.use_amount.status) {
        if (!this.pageInfo.use_amount.number) {
          this.errorMessageList.push(this.$t('lang.discountcode.text102'))
          errNumber += 1
        }
      }
      switch (this.pageInfo.type) {
        case 0: case 1: // 类型是百分比或者固定金额时
          if (!this.pageInfo.discount_amount) {
            this.errorMessageList.push(this.$t('lang.discountcode.text103'))
            errNumber += 1
          }
          if (this.pageInfo.suitable_for === 1) { // 适用于特定产品时候
            if (!this.percent_selectedSpecificProducts && this.pageInfo.type === 0) {
              this.errorMessageList.push(this.$t('lang.discountcode.text104'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 2 && this.pageInfo.type === 0) { // 适用于特定产品系列时候
            if (!this.percent_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text105'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 1) { // 适用于特定产品时候
            if (!this.fixed_selectedSpecificProducts && this.pageInfo.type === 1) {
              this.errorMessageList.push(this.$t('lang.discountcode.text106'))
              errNumber += 1
            }
          }
          if (this.pageInfo.suitable_for === 2 && this.pageInfo.type === 1) { // 适用于特定产品系列时候
            if (!this.fixed_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text107'))
              errNumber += 1
            }
          }
          if (this.pageInfo.min_require === 1) {
            if (!this.pageInfo.min_money) {
              this.errorMessageList.push(this.$t('lang.discountcode.text108'))
              errNumber += 1
            }
          }
          if (this.pageInfo.min_require === 2) {
            if (!this.pageInfo.min_goods_num) {
              this.errorMessageList.push(this.$t('lang.discountcode.text109'))
              errNumber += 1
            }
          }
          break
        case 2 :
          if (this.pageInfo.discount_area === 1) {
            if (!this.selectedCountries) {
              this.errorMessageList.push(this.$t('lang.discountcode.text110'))
              errNumber += 1
            }
          }
          if (this.pageInfo.limit_shipping.status) {
            if (!this.pageInfo.limit_shipping.amount) {
              this.errorMessageList.push(this.$t('lang.discountcode.text111'))
              errNumber += 1
            }
          }
          if (this.pageInfo.min_require === 1) {
            if (!this.pageInfo.min_money) {
              this.errorMessageList.push(this.$t('lang.discountcode.text112'))
              errNumber += 1
            }
          }
          if (this.pageInfo.min_require === 2) {
            if (!this.pageInfo.min_goods_num) {
              this.errorMessageList.push(this.$t('lang.discountcode.text113'))
              errNumber += 1
            }
          }
          break
        case 3 :
          if (this.pageInfo.xy_min_require === 2) {
            if (!this.pageInfo.xy_min_goods_num) {
              this.errorMessageList.push(this.$t('lang.discountcode.text114'))
              errNumber += 1
            }
          }
          if (this.pageInfo.xy_min_require === 1) {
            if (!this.pageInfo.xy_min_money) {
              this.errorMessageList.push(this.$t('lang.discountcode.text115'))
              errNumber += 1
            }
          }
          if (this.pageInfo.buy_type === 0) {
            if (!this.buy_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text116'))
              errNumber += 1
            }
          }
          if (this.pageInfo.buy_type === 1) {
            if (!this.buy_selectedSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text117'))
              errNumber += 1
            }
          }
          if (!this.pageInfo.get_num) {
            this.errorMessageList.push(this.$t('lang.discountcode.text118'))
            errNumber += 1
          }
          if (this.pageInfo.get_type === 0) {
            if (!this.get_selectedSeriesOfSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text119'))
              errNumber += 1
            }
          }
          if (this.pageInfo.get_type === 1) {
            if (!this.get_selectedSpecificProducts) {
              this.errorMessageList.push(this.$t('lang.discountcode.text120'))
              errNumber += 1
            }
          }
          if (this.pageInfo.discount === 0) {
            if (!this.pageInfo.discount_percent) {
              this.errorMessageList.push(this.$t('lang.discountcode.text121'))
              errNumber += 1
            }
          }
          if (this.pageInfo.single_use_num.status) {
            if (!this.pageInfo.single_use_num.number) {
              this.errorMessageList.push(this.$t('lang.discountcode.text122'))
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
        total_type: 0,
        code: this.pageInfo.code,
        type: this.pageInfo.type,
        start_time: this.startTimeStamp / 1000,
        client_require: this.pageInfo.client_require
      }
      if (this.pageInfo.end_time.status) {
        sendData.end_time = this.endTimeStamp / 1000
      }
      // 限制该折扣总共能使用的次数 被选择时传值
      if (this.pageInfo.use_amount.status) {
        sendData.use_amount = parseInt(this.pageInfo.use_amount.number, 0)
      }
      // 是否限制客户只使用一次
      if (this.pageInfo.client_once) {
        sendData.client_once = 1
      } else {
        sendData.client_once = 0
      }
      // 最低要求
      if (this.pageInfo.type === 3) {
        sendData.min_require = this.pageInfo.xy_min_require
        switch (this.pageInfo.xy_min_require) {
          case 1:
            sendData.min_money = parseFloat(this.pageInfo.xy_min_money)
            break
          case 2:
            sendData.min_goods_num = this.pageInfo.xy_min_goods_num
            break
          default:
            break
        }
      } else {
        sendData.min_require = this.pageInfo.min_require
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
                  this.percent_selectedSpecificProducts
                )
              }
              if (this.pageInfo.type === 1) {
                sendData.attrpid = this.dataForSpecificProducts(
                  this.fixed_selectedSpecificProducts
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
                  this.percent_selectedSeriesOfSpecificProducts
                )
              }
              if (this.pageInfo.type === 1) {
                sendData.collection_id = this.dataForSeriesOfSpecificProducts(
                  this.fixed_selectedSeriesOfSpecificProducts
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
        // 免费送货时
        case 2:
          sendData.discount_area = this.pageInfo.discount_area
          switch (this.pageInfo.discount_area) {
            case 0:
              break
            case 1:
              let countryId = []
              this.selectedCountries.forEach(item => {
                countryId.push(item.id)
              })
              sendData.country_id = countryId
              break
            default:
              break
          }
          // 运费被选择时
          if (this.pageInfo.limit_shipping.status) {
            sendData.limit_shipping = this.pageInfo.limit_shipping.amount
          }
          break
        case 3:
          // 客户购买选择特定产品或者系列
          sendData.buy_type = this.pageInfo.buy_type
          switch (this.pageInfo.buy_type) {
            case 1:
              console.log(this.buy_selectedSpecificProducts)
              sendData.buy_attrpid = this.dataForSpecificProducts(
                this.buy_selectedSpecificProducts
              )
              break
            case 0: // 系列
              console.log(this.buy_selectedSeriesOfSpecificProducts)
              sendData.buy_collectid = this.dataForSeriesOfSpecificProducts(
                this.buy_selectedSeriesOfSpecificProducts
              )
              break

            default:
              break
          }

          // 客户获得选择特定产品或者系列
          sendData.get_type = this.pageInfo.get_type
          sendData.get_num = parseInt(this.pageInfo.get_num, 0)
          switch (this.pageInfo.get_type) {
            case 1:
              sendData.get_attrpid = this.dataForSpecificProducts(
                this.get_selectedSpecificProducts
              )
              break
            case 0:
              sendData.get_collectid = this.dataForSeriesOfSpecificProducts(
                this.get_selectedSeriesOfSpecificProducts
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
                path: '/administratorPanel/indexOfDiscount/discountCode',
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
                path: '/administratorPanel/indexOfDiscount/discountCode',
                query: { status: 'all' }
              })
            }, 2000)
          }
        })
      }

      console.log(sendData)
    }
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
      // 初始化页面的值
      this.pageInitializationRequestEnd = false
      this.forRightLoadingVisible(true)
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
        if (resData.use_amount) {
          this.pageInfo.use_amount.status = true
          this.pageInfo.use_amount.number = resData.use_amount
        }
        switch (resData.client_once) {
          case 0:
            this.pageInfo.client_once = false
            break
          case 1:
            this.pageInfo.client_once = true
            break
          default:
            break
        }
        // ********** //
        // min_require的处理
        if (res.data.data.type === 3) {
          this.pageInfo.xy_min_require = resData.min_require
          switch (resData.min_require) {
            case 1:
              this.pageInfo.xy_min_money = resData.min_money
              break

            case 2:
              this.pageInfo.xy_min_goods_num = resData.min_goods_num
              break
            default:
              break
          }
        } else {
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
        }
        switch (res.data.data.type) {
          case 0: // 百分比时候
            this.pageInfo.discount_amount = resData.discount_amount
            this.pageInfo.suitable_for = resData.suitable_for
            switch (resData.suitable_for) {
              case 1:
                resData.special_product.forEach(item => {
                  item.type = 'percent'
                })
                this.percent_addSpecificProducts(resData.special_product)
                break
              case 2:
                resData.special_collection.forEach(item => {
                  item.type = 'percent'
                })
                this.percent_addSeriesOfSpecificProducts(
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
                  item.type = 'fixed'
                })
                this.fixed_addSpecificProducts(resData.special_product)
                if (resData.is_single) {
                  this.pageInfo.is_single = true
                } else {
                  this.pageInfo.is_single = false
                }
                break
              case 2:
                resData.special_collection.forEach(item => {
                  item.type = 'fixed'
                })
                this.fixed_addSeriesOfSpecificProducts(
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
          case 2:
            this.pageInfo.discount_area = resData.discount_area
            if (resData.discount_area === 1) {
              // 具体国家id
              this.forSelectedCountries(resData.country)
            }
            if (resData.limit_shipping) {
              this.pageInfo.limit_shipping.status = true
              this.pageInfo.limit_shipping.amount = resData.limit_shipping
            }
            break
          case 3:
            this.pageInfo.buy_type = resData.buy_type
            switch (resData.buy_type) {
              case 0:
                resData.buy_collection.forEach(item => {
                  item.type = 'buy'
                })
                this.buy_addSeriesOfSpecificProducts(resData.buy_collection)
                break
              case 1:
                resData.buy_product.forEach(item => {
                  item.type = 'buy'
                })
                this.buy_addSpecificProducts(resData.buy_product)
                break
              default:
                break
            }
            this.pageInfo.get_num = resData.get_num
            this.pageInfo.get_type = resData.get_type
            switch (resData.get_type) {
              case 0:
                resData.get_collection.forEach(item => {
                  item.type = 'get'
                })
                this.get_addSeriesOfSpecificProducts(resData.get_collection)
                break
              case 1:
                resData.get_product.forEach(item => {
                  item.type = 'get'
                })
                this.get_addSpecificProducts(resData.get_product)
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
    this.percent_addSpecificProducts(null)
    this.percent_addSeriesOfSpecificProducts(null)
    this.fixed_addSpecificProducts(null)
    this.fixed_addSeriesOfSpecificProducts(null)
    this.buy_addSpecificProducts(null)
    this.buy_addSeriesOfSpecificProducts(null)
    this.get_addSpecificProducts(null)
    this.get_addSeriesOfSpecificProducts(null)
  }
}
</script>
<style lang="less" scoped>
.c-createDiscountCode {
  padding-top: 32px;
  padding-bottom: 32px;
  .content-createDiscountCode {
    .top {
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
    .c-disableOrEnable {
      font-size: 18px;
      color: #4267b2;
      margin-top: 23px;
      margin-bottom: 12px;
      padding-left: 15px;
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
          border: 1px solid #DCDFE6;
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
          padding-left: 37px;
          height: 45px;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
      }
    }
    .box-discount-code {
      padding: 30px 15px 30px 15px;
      .c-box-discount-code-top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        .text1 {
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
        }
        .text2 {
          font-size: 16px;
          font-weight: 400;
          color: #4267B2;
          cursor: pointer;
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
      padding: 30px 15px 30px 15px;
    }
    .box-customer-buy {
      .c-check {
        padding: 0 15px 0 15px;
      }
      .title {
        padding-left: 15px;
        padding-top: 29px;
      }
      .box-customer-buy-top {
        padding: 30px 15px 30px 15px;
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
        padding: 30px 15px 30px 15px;
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
          margin-top: 20px;
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
        padding: 30px 15px 30px 15px;
        /deep/ .el-input {
          width: 210px;
        }
        /deep/ .el-input__inner {
          height: 45px;
        }
      }
    }
    .box-geographical-position {
      .box-geographical-position-top {
        padding: 30px 15px 30px 15px;
        border-bottom: 1px solid rgba(239, 239, 239, 1);
      }
      .box-geographical-position-btm {
        padding: 30px 15px 30px 15px;
        .text {
          font-size: 16px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 20px;
        }
        .c-discount-input-specific-amount {
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
    }
    .box-discounts-scope {
      .box-discounts-scope-top {
        padding: 29px 15px 30px 15px;
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
        padding: 30px 15px 30px 15px;
        .text1 {
          font-size: 18px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 28px;
        }
        .c-radio {
          margin-bottom: 20px;
        }
        .special {
          margin-top: 25px;
          .tip {
            font-size: 16px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-top: 15px;
          }
        }
        .box-discounts-scope-btm-search {
        }
      }
    }
    .box-mini-Requirements {
      padding: 30px 15px 30px 15px;
      .c-minimum-amount {
        .c-minimum-amount-input {
          width: 149px;
          position: relative;
          margin-left: 28px;
          margin-top: 20px;
          .dollar {
            position: absolute;
            left: 10px;
            top: 14px;
            font-size: 16px;
          }
          /deep/ .el-input {
            width: 149px;
          }
          /deep/ .el-input__inner {
            padding-left: 23px;
            height: 45px;
          }
        }
        .tip1 {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-top: 10px;
          padding-left: 30px;
        }
      }
      .c-minimum-quantity {
        .c-minimum-quantity-input {
          margin-top: 20px;
        }
        .tip2 {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-top: 10px;
        }
        /deep/ .el-input {
          width: 149px;
        }
        /deep/ .el-input__inner {
          padding-left: 15px;
          height: 45px;
        }
      }
    }
    .box-customer-qualification {
      padding: 30px 15px 30px 15px;
      .tip {
        font-size: 16px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin-top: 16px;
      }
    }
    .box-use-restrictions {
      padding: 30px 15px 30px 15px;
      .c-use-number {
        .c-use-number-input {
          margin-top: 20px;
          /deep/ .el-input {
            width: 149px;
          }
          /deep/ .el-input__inner {
            height: 45px;
          }
        }
      }
    }
    .box-effective-date {
      padding: 30px 15px 30px 15px;
      margin-bottom: 30px;
      .c-date-and-time-pick {
        .c-date-pick {
          margin-bottom: 20px;
          width: 100%;
          .text {
            margin-bottom: 19px;
          }
        }
        .c-time-pick {
          margin-bottom: 20px;
          width: 100%;
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
    .c-button {
      position: relative;
      text-align: right;
      padding-right: 15px;
      .btn-delete {
        position: absolute;
        left: 15px;
      }
    }
    // select框样式修改
    .select {
    }
  }
}
// checkbox的样式修改
.el-checkbox {
  margin-right: 6px;
}
// 模态窗样式修改
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
p {
  margin: 0;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
ul {
  margin: 0;
}
</style>
