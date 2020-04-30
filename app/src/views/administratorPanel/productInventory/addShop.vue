<template>
  <div class="add-box">
    <div class="add-shop">
      <div class="add-header">
        <p class="header-h1">{{$t('addShop.header.title')}}</p>
        <p class="add-black" @click="backTop"><span class="el-icon-arrow-left"></span>{{$t('addShop.header.back')}}</p>
      </div>
      <el-form class="add-form" ref="ruleForm" :rules="rules" :model="ruleForm">
        <!--产品名称-->
        <el-form-item prop="goodsname">
          <div class="add-name" id="ProdInput">
            <p class="name-title ">{{$t('addShop.shopName')}}</p>
            <el-input type="text" class="product-input" v-model="ruleForm.goodsname" />
          </div>
        </el-form-item>
        <!--产品描述-->
        <el-form-item prop="content">
          <div class="add-describe" id="DesMs">
            <p class="name-title">{{$t('addShop.shopMs')}}</p>
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
          </div>
        </el-form-item>
        <!--产品图片-->
        <el-form-item prop="imgs">
          <div class="add-img">
            <div class="addUp-box">
              <p class="name-title">{{$t('addShop.proImg.shopImg')}}</p>
              <div class="img-files flex">
                <div class="img-file" v-if='ruleForm.imgs.length < ruleForm.maxCount'>
                  <input type="file" id='files' @change='fileChange($event)' multiple="multiple"
                         ref="FileValue">
                  <label for="files" style="color: #4267B2;cursor: pointer">{{$t('addShop.proImg.shopUp')}}</label>
                </div>
              </div>
            </div>
            <div class="up-img-box">
              <div class="up-content" v-if="ruleForm.imgs.length>0">
                <div class="up-datu" v-if="ruleForm.imgs.length>0"
                     v-dragging="{ item: ruleForm.imgs[0], list: ruleForm.imgs, group: 'item'}">
                  <div class="up-ImgBox">
                    <img :src="ruleForm.imgs[0].data" alt="">
                  </div>
                  <div class="mask">
                    <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content1')" placement="top">
                        <span class="iconfont iconfangdajing yuLan">
                            <viewer :images="ruleForm.imgs">
                                <img :src="ruleForm.imgs[0].data" alt="" class="yuLanImg">
                            </viewer>
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content2')" placement="top">
                      <span @click="del()" class="Delete"><i class="el-icon-delete"></i></span>
                    </el-tooltip>
                  </div>
                </div>
                <div class="up-xiaotu-box">
                  <div class="up-xiaotu"
                       v-for="(item, i) in ruleForm.imgs.slice(1)"
                       :key='i'
                       v-dragging="{ item: item, list: ruleForm.imgs, group: 'item'}">
                    <img :src="item.data" alt="">
                    <div class="mask-xiao">
                      <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content1')" placement="top">
                          <span class="iconfont iconfangdajing yuLan">
                              <viewer :images="ruleForm.imgs">
                                  <img :src="item.data" alt="" class="yuLanImg">
                              </viewer>
                          </span>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="$t('addShop.proImg.content2')" placement="top">
                        <span @click="del(i)" class="Delete"><i class="el-icon-delete"></i></span>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div class="up-content1" v-else>
                <input type="file" @change="fileChange($event)" multiple="multiple" />
                <img src="../../../assets/addShop/image@2x.png" alt="">
                <p>{{$t('addShop.proImg.shopUp')}}</p>
              </div>
            </div>
          </div>
        </el-form-item>
        <!--价格，和库存-->
        <el-form-item>
          <div class="add-price">
            <div class="add-price-cssbox">
              <p class="name-title">{{$t('addShop.price.title')}}</p>
              <el-row>
                <el-col :span="11">
                  <el-form-item prop="price">
                    <div class="priceBox">
                      <p>{{$t('addShop.price.text1')}}</p>
                      <el-input type="text" class="add-price-input"
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                                placeholder="$0.00" v-model="ruleForm.price"
                                @blur="moneyFormat($event)" />
                    </div>
                    <p v-if="ruleForm.price > 0 && ruleForm.costprice !== ''"><span>{{$t('addShop.price.text4')}}</span>{{profit.priceTwo}}%
                    </p>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item prop="oldprice">
                    <div class="priceBox">
                      <p>{{$t('addShop.price.text2')}}</p>
                      <el-input type="text" class="add-price-input"
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                                placeholder="$0.00" v-model="ruleForm.oldprice"
                                @blur="moneyFormat($event)" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item prop="costprice">
                <div class="priceBox">
                  <p>{{$t('addShop.price.text3')}}</p>
                  <el-input type="text" class="add-price-input"
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            placeholder="$0.00" v-model="ruleForm.costprice"
                            @blur="moneyFormat($event)" />
                </div>
              </el-form-item>
            </div>
            <el-checkbox v-model="collect">{{$t('mulAttrDetails.content.text11')}}</el-checkbox>
          </div>
        </el-form-item>
        <!--数量，编辑仓库位置-->
        <el-form-item>
          <p class="name-title">{{$t('addShop.repertory.title')}}</p>
          <el-row>
            <el-col :span="11">
              <el-form-item prop="sku">
                <div class="priceBox">
                  <p>{{$t('addShop.repertory.text1')}}</p>
                  <el-input type="text" class="add-price-input" v-model="ruleForm.sku" />
                </div>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="barCode">
                <div class="priceBox">
                  <p>{{$t('addShop.repertory.text2')}}</p>
                  <el-input type="text" class="add-price-input" v-model="ruleForm.barCode" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="hide-tail">
            <el-checkbox v-model="gzCheckbox">
              {{$t('addShop.repertory.text3')}}
            </el-checkbox>
            <br>
            <el-checkbox v-if="gzCheckbox === true">
              {{$t('addShop.repertory.text4')}}
            </el-checkbox>
          </div>
          <div class="editWarehouse" v-if="warehouseData.length>0">
            <div class="editWarehouse-box1">
              <span>{{$t('addShop.repertory.text5')}}</span>
              <span class="editWarehouse-text" @click="dialogVisible2 = true">{{$t('addShop.repertory.text6')}}</span>
            </div>
            <div class="editWarehouse-box1">
              <span>{{$t('addShop.repertory.text7')}}</span>
              <span>{{$t('addShop.repertory.text8')}}</span>
            </div>
            <ul style="border-bottom: 1px solid #e3e3e3">
              <li v-for="(item, index) in warehouseData" :key="index">
                <span>{{item.name}}</span>
                <el-input-number controls-position="right" @change="vaidateCycle(item)" :min="0"
                                 v-model.number="item.num" />
              </li>
            </ul>
          </div>
        </el-form-item>
        <!--运输方式-->
        <div class="add-carriage">
          <div class="add-carriage-box">
            <p class="name-title">{{$t('addShop.transportation.title')}}</p>
            <div class="checkBox-css">
              <el-checkbox v-model="carriageCheck">{{$t('addShop.transportation.text1')}}</el-checkbox>
            </div>
          </div>
          <div class="add-weight" v-if="carriageCheck">
            <p class="name-title">{{$t('addShop.transportation.text2')}}</p>
            <p class="jisuan-text">{{$t('addShop.transportation.text3')}}</p>
            <p class="name-title">{{$t('addShop.transportation.text2')}}</p>
            <div class="weight-box" style="width: 400px">
              <el-input class="weight-input" v-model="weightNum" oninput="value=value.replace(/[^\d\.]/g, '')"
                        type="text" />
              <ul class="unit-ul">
                <li v-for="(item,index) in unit" class="unit" :key="index"
                    :class="{'unitBgcolor':active===index}"
                    @click="selectStyle(item,index)">
                  {{item.monad}}
                </li>
              </ul>
            </div>
            <div class="customs" v-if="hideCustoms">
              <p>海关信息</p>
              <p>用于目的国/地区海关计算关税。该信息将显示报关单上。</p>
              <div class="customs-box">
                <p>发货国家/地区</p>
                <select value="">
                  <option>1231233</option>
                  <option>1231233</option>
                  <option>1231233</option>
                </select>
                <br>
                <span>商品生产国/地区或者发货仓库所在国家/地区。</span>
              </div>
              <div class="customs-hs">
                <p>HS（协调制度）代码</p>
                <el-input placeholder="按产品关键字或 HS 代码搜索" prefix-icon="el-icon-search"></el-input>
                <span>用于目的国/地区海关分类</span>
              </div>
            </div>
          </div>
          <p v-else>{{$t('addShop.transportation.text5')}}</p>
        </div>
        <!--设置多个属性-->
        <el-form-item>
          <div class="add-attributes">
            <p class="name-title">{{$t('addShop.multiAttribute.title')}}</p>
            <div class="checkBox-css">
              <el-checkbox v-model="attrTable">{{$t('addShop.multiAttribute.elCheckbox')}}</el-checkbox>
            </div>
            <div class="attributes-box" v-if="attrTable === true">
              <table width="100%">
                <thead style="text-align: left">
                <tr>
                  <th>{{$t('addShop.multiAttribute.text1')}}</th>
                  <th>{{$t('addShop.multiAttribute.text2')}}</th>
                </tr>
                </thead>
                <tbody ref="Tbody">
                <tr class="attributes-tr" v-for="(item,index) in addData" :key="item.value">
                  <td><input type="text" class="carriage-input" v-model="item.attribute"></td>
                  <td>
                    <div class="attributes-option-box">
                      <ul class="attributes-ul" style="margin: 1px">
                        <li v-for="(i,idx) in item.optionSpan" :key="idx"
                            :class="index===0 ? sstt[0] : index === 1 ? sstt[1] :sstt[2] ">
                          <span class="attributes-option">{{i}}</span>
                          <span class="attributes-close" @click="DeleteSpan(index,idx,i)"><span
                              class="iconfont iconclose"
                              style="cursor: pointer"></span></span>
                        </li>
                        <li>
                          <input type="text" class="carriageInput" maxlength="20"
                                 v-model="item.input"
                                 @keyup.enter="carriageBlur($event,index, item)"
                                 @blur="carriageBlur($event,index,item)">
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td @click="DeleteTr(index)" v-if="addData.length!==1"><span
                      class="iconfont iconlajitong" style="font-size: 20px;cursor: pointer"></span></td>
                </tr>
                <tr class="attributes-tr" v-if="this.addData.length!==3">
                  <el-button class="attributes-btn" @click="addShuXin">
                    {{$t('addShop.multiAttribute.btn')}}
                  </el-button>
                </tr>
                </tbody>
              </table>
              <template v-if="attrTable === true">
                <div v-if="dataArr.length > 0">
                  <!--              <table ref="listPowerSupplyTab" class="table-Css" cellpadding="10" style="border-collapse:separate; border-spacing:0px 10px;width: 100%">-->
                  <!--                <thead style="text-align: left">-->
                  <!--                <th>{{$t('lang.addShop.multiattribute.gouxuan')}}</th>-->
                  <!--                <th>{{$t('lang.addShop.multiattribute.option')}}</th>-->
                  <!--                <th>{{$t('lang.addShop.multiattribute.jiage')}}</th>-->
                  <!--                <th>{{$t('lang.addShop.multiattribute.kucun')}}</th>-->
                  <!--                </thead>-->
                  <!--                <tbody style="word-break:break-all; word-wrap:break-spaces;">-->
                  <!--                <tr v-for="(item, index) in dataArr" :key="index">-->
                  <!--                  <td>-->
                  <!--                    <el-checkbox v-model="item.checked" size="medium" fill="#FDC258"></el-checkbox>-->
                  <!--                  </td>-->
                  <!--                  <td width="120">-->
                  <!--                   <span v-for="(i,idx) in item.name" :key="idx"-->
                  <!--                         :class="idx===0 ? sxColor[0] : idx===1 ? sxColor[1] :sxColor[2] ">-->
                  <!--                   <span v-if="idx!==0">-</span>{{i}}</span>-->
                  <!--                  </td>-->
                  <!--                  <td>-->
                  <!--                    <input v-model="item.price" placeholder="价格" class="shuInput" />-->
                  <!--                  </td>-->
                  <!--                  <td>-->
                  <!--                    <input v-model="item.num" placeholder="库存" class="shuInput" />-->
                  <!--                  </td>-->
                  <!--                </tr>-->
                  <!--                </tbody>-->
                  <!--              </table>-->
                  <div class="edit-site">
                    <div class="edit-site-box">
                      <div>
                        <label class="flexCss">
                          <input class="check_box tui-checkbox" type="checkbox" @click="selectProduct(isSelectAll)"
                                 v-bind:checked="isSelectAll">
                          <span
                              v-if="getTotal.length<1">&nbsp;&nbsp;<span>{{$t('addShop.multiAttribute.showText1')}}</span> {{editData.length}} <span>{{$t('addShop.multiAttribute.showText2')}}</span></span>
                          <span v-else>&nbsp;&nbsp; <span> {{$t('addShop.multiAttribute.showText3')}} {{getTotal.length}} {{$t('addShop.multiAttribute.showText4')}} </span>
                             <el-popover
                                 placement="bottom"
                                 trigger="click">
                        <div class="compile">
                          <ul class="locationlistCss">
                            <li @click="bjPrice">{{$t('addShop.multiAttribute.li1')}}</li>
                            <li @click="bjNum">{{$t('addShop.multiAttribute.li2')}}</li>
                            <li @click="bjSku">{{$t('addShop.multiAttribute.li3')}}</li>
                            <li @click="bjCode">{{$t('addShop.multiAttribute.li4')}}</li>
                          </ul>
                        </div>
                        <el-button slot="reference"
                                   class="el-icon-edit">{{$t('addShop.multiAttribute.btn2')}}</el-button>
                      </el-popover>
                        </span>
                        </label>
                      </div>
                      <div class="edit-popover" v-if="getTotal.length<1">
                        <el-popover
                            placement="bottom"
                            v-model="visibleWeiZhi"
                            trigger="click">
                          <div>
                            <ul class="locationlistCss">
                              <li v-for="(item, index) in locationlist" :key="index"
                                  :class="{'pitchCss':activeTwo===index}"
                                  @click="pitchCangKu(item,index)">{{item.name}}
                              </li>
                            </ul>
                          </div>
                          <el-button slot="reference" class="el-icon-location-information" v-if="warehouseLength > 1">
                            {{siteName}}
                          </el-button>
                        </el-popover>
                      </div>
                    </div>
                    <ul class="edit-site-ul">
                      <li v-for="(item, index) in editData" :key="index" @click="editDetails(item, index)">
                        <div>
                          <input class="check_box tui-checkbox" type="checkbox" v-bind:checked="item.isSelect"
                                 @click="item.isSelect = !item.isSelect"
                                 @click.stop>&nbsp;&nbsp;
                          <span v-for="(i,idx) in item.name" :key="idx"
                                :class="idx===0 ? sxColor[0] : idx===1 ? sxColor[1] :sxColor[2] "><span
                              v-if="idx!==0">-</span>{{i}}</span>
                        </div>
                        <div>
                          <span>{{item.price  | currency('')}}￥</span>
                          <div>
                            <template v-for="(v, i) in item.location">
                              <span v-if="activeTwo === 0" :key="i">{{cangKuNum = +v.num}}</span>
                            </template>
                            <span>{{$t('addShop.multiAttribute.text3')}}{{item.site}}{{$t('addShop.multiAttribute.text4')}}</span>
                            <template v-for="(data, i) in item.location">
                              <span v-if="qhCangkuName === data.name" :key="i">{{data.num}} {{$t('addShop.multiAttribute.text5')}}</span>
                            </template>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="add-btn-box">
        <el-button class="save-btn" v-preventReClick="2000" @click="save('ruleForm')" ref="SaveBtn">
          {{$t('addShop.save')}}
        </el-button>
      </div>
    </div>
    <!--    编辑位置-->
    <el-dialog
        :title="$t('addShop.elDialogSite.title')"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible2"
        width="40%">
      <div class="editWarehouse-box2" v-show="dialogVisible3">
        <p><span class="el-icon-warning"></span>{{$t('addShop.elDialogSite.text1')}}</p>
      </div>
      <span>{{$t('addShop.elDialogSite.text2')}}</span>
      <ul class="editWarehouse-box2-ul">
        <li v-for="(item, index) in checkedEdit" :key="index">
          <el-checkbox v-model="item.checked"
                       :label="item.name"
                       @change="getCheck(item)">
          </el-checkbox>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible2 = false">{{$t('addShop.elDialogSite.btn1')}}</el-button>
    <button type="button" @click="addWarehouse" ref="BtnCss"
            class="confirmBtn">{{$t('addShop.elDialogSite.btn2')}}</button>
  </span>
    </el-dialog>
    <!--    编辑价格-->
    <el-dialog
        :close-on-click-modal="false"
        :title="$t('addShop.elDialogPrice.title')"
        :visible.sync="dialogVisiblePrice"
        width="40%">
      <div>
        <div>
          <div class="editPrice">
            <p>{{$t('addShop.elDialogPrice.text1')}}</p>
            <div class="editPrice-pricBox">
              <span>￥</span>
              <input type="text" v-model="editPrice" @blur="moneyFormat($event)" />
              <button @click="allApp">{{$t('addShop.elDialogPrice.btn1')}}</button>
            </div>
          </div>
          <ul class="editPrice-ul">
            <li v-for="(item,index) in ulData" :key="index">
              <span>{{item.name.join('-')}}</span>
              <div>
                <el-input type="text" placeholder="$100.00" v-model="item.price" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisiblePrice = false">{{$t('addShop.elDialogPrice.btn2')}}</el-button>
    <el-button type="primary" @click="savePrice">{{$t('addShop.elDialogPrice.btn3')}}</el-button>
    </span>
    </el-dialog>
    <!--    选择编辑仓库数量和位置-->
    <el-dialog
        :close-on-click-modal="false"
        :title="$t('addShop.elDialogLocation.title')"
        :visible.sync="dialogVisibleLocation"
        width="40%">
      <!--    编辑仓库数量-->
      <el-dialog
          :title="$t('addShop.elDialogLocation.title')"
          :visible.sync="dialogVisibleStore"
          append-to-body
          width="40%">
        <div>
          <div>
            <div class="editNum">
              <p>{{$t('addShop.elDialogLocation.span1')}} <span>{{attrsName}}</span>
                {{$t('addShop.elDialogLocation.span2')}}</p>
              <p>{{$t('addShop.elDialogLocation.text1')}}</p>
              <div class="attrNum">
                <el-input-number v-model="editNum" controls-position="right"></el-input-number>
                <button @click="allNum">{{$t('addShop.elDialogLocation.btn1')}}</button>
              </div>
            </div>
            <ul class="editPrice-ul">
              <li v-for="(item, index) in attrs" :key="index">
                <span>{{item.name.join('-')}}</span>
                <div class="priceInput">
                  <template v-for="(data, idx) in item.location">
                    <el-input-number v-if="cangkuName === data.name" :key="idx" v-model="data.num"
                                     controls-position="right"></el-input-number>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleStore = false">{{$t('addShop.elDialogLocation.btn2')}}</el-button>
    <el-button type="primary" @click="saveNum">{{$t('addShop.elDialogLocation.btn3')}}</el-button>
    </span>
      </el-dialog>
      <div class="editOptions-num">
        <p>{{$t('addShop.elDialogLocation.text2')}}</p>
        <ul>
          <li v-for="(item, index) in cangkuData" :key="index" @click="bianJiNum(item,index)">
            <span>{{item.name}}</span>
            <span class="el-icon-arrow-right"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleLocation = false">{{$t('addShop.elDialogLocation.btn2')}}</el-button>
      <el-button type="primary"
                 @click="dialogVisibleLocation = false">{{$t('addShop.elDialogLocation.btn4')}}</el-button>
      </span>
    </el-dialog>
    <!--    编辑SKU-->
    <el-dialog
        :close-on-click-modal="false"
        :title="$t('addShop.elDialogSku.title')"
        :visible.sync="dialogVisibleSku"
        width="40%">
      <div class="bjSku">
        <ul>
          <li v-for="(item, index) in skuData" :key="index">
            <p>{{item.name.join('-')}}</p>
            <el-input v-model="item.sku"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleSku = false">{{$t('addShop.elDialogSku.btn1')}}</el-button>
      <el-button type="primary" @click="saveSku">{{$t('addShop.elDialogSku.btn2')}}</el-button>
    </span>
    </el-dialog>
    <!--    编辑条码-->
    <el-dialog
        :close-on-click-modal="false"
        :title="$t('addShop.elDialogCode.title')"
        :visible.sync="dialogVisibleCode"
        width="40%">
      <div class="bjSku">
        <ul>
          <li v-for="(item, index) in CodeData" :key="index">
            <p>{{item.name.join('-')}}</p>
            <el-input v-model="item.itemcode"></el-input>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCode = false">{{$t('addShop.elDialogCode.btn1')}}</el-button>
        <el-button type="primary" @click="saveCode">{{$t('addShop.elDialogCode.btn2')}}</el-button>
      </div>
    </el-dialog>
    <!--    编辑当前属性-->
    <el-dialog
        :close-on-click-modal="false"
        :title="$t('addShop.elDialogEdit.title') + attrNameTwo"
        :visible.sync="dialogVisibleEdit"
        width="40%">
      <div class="editOptions-edits">
        <el-checkbox v-model="createAttrs">{{$t('addShop.elDialogEdit.elCheckbox')}}</el-checkbox>
        <div>
          <div class="editOptions-edits-box1" v-for="(item, index) in attrsData" :key="index">
            <el-row>
              <el-col :span="11">
                <div class="editOptions-edits-box1-d">
                  <span class="priceDw">￥</span>
                  <span>{{$t('addShop.elDialogEdit.span1')}}</span>
                  <el-input type="text" v-model="item.price" @blur="moneyFormat($event)" />
                  <span
                      :v-show="item.price!==''&&item.costprice!==''? hidecost=true : hidecost =false"
                      v-show="hidecost">{{$t('addShop.elDialogEdit.span2')}}{{parseFloat((item.price - item.costprice) / item.costprice * 100).toFixed(1)}}%</span>
                </div>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
              <el-col :span="11">
                <div class="editOptions-edits-box1-d">
                  <span class="priceDw">￥</span>
                  <span>{{$t('addShop.elDialogEdit.span3')}}</span>
                  <el-input type="text" v-model="item.costprice" @blur="moneyFormat($event)" />
                </div>
              </el-col>
            </el-row>
            <div class="priceBox">
              <el-row>
                <el-col :span="11">
                  <div>
                    <span>{{$t('addShop.elDialogEdit.span4')}}</span>
                    <el-input type="text" v-model="item.sku" />
                  </div>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <div>
                    <span>{{$t('addShop.elDialogEdit.span5')}}</span>
                    <el-input type="text" v-model="item.itemcode" />
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="editOptions-edits-box2">
              <p><span>{{$t('addShop.elDialogEdit.span6')}}</span><span>{{$t('addShop.elDialogEdit.span7')}}</span></p>
              <p><span>{{$t('addShop.elDialogEdit.span8')}}</span><span>{{$t('addShop.elDialogEdit.span9')}}</span></p>
              <ul>
                <li v-for="(val, idx) in item.location" :key="idx">
                  <span>{{val.name}}</span>
                  <el-input-number v-model="val.num" controls-position="right"></el-input-number>
                </li>
              </ul>
            </div>
            <div class="btnFooter">
              <el-button @click="dialogVisibleEdit = false">{{$t('addShop.elDialogEdit.btn1')}}</el-button>
              <el-button type="primary" @click="saveRepertory(item)" v-preventReClick="2000">
                {{$t('addShop.elDialogEdit.btn2')}}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddShop, showlocation } from '../../../common/api/api'
import { currency, formatMoney, validateValue } from '../../../common/validator'
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
  name: 'addShop',
  data () {
    return {
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      header: {},
      loading: true,
      collect: true,
      cangKuNum: 0,
      warehouseLength: 0, // 仓库长度
      cangkuData: [], // 选择编辑仓库
      cangkuName: '', // 仓库名字
      qhCangkuName: '', // 切换仓库名字
      skuData: null, // sku的数据
      CodeData: null, // 条码的数据
      attrs: [], // 编辑仓库多属性的数量
      attrsName: '', // 编辑仓库多属性的名字
      num: '',
      siteName: '所有位置', // 仓库位置名字
      locationlist: [
        { name: '所有位置', locateid: 0 }// 仓库位置
      ],
      ruleForm: {
        imageUrl: '', // img绑定的src地址
        postUrl: '', // 需要上传到的地址
        imgs: [], // 图片预览地址
        imgfiles: [], // 图片原文件，上传到后台的数据
        maxCount: 9, // 限制上传数量
        goodsname: '', // 产品名称
        price: '', // 价格
        oldprice: '', // 原价
        costprice: '', // 成本价
        sku: '', // sku货号
        barCode: '' // 条码
      },
      imgs: [],
      content: ``,
      rules: {
        goodsname: this.$i18n.locale === 'en-us' ? [{
          validator: EvalidateValue,
          trigger: 'blur'
        }] : [{ validator: validateValue, trigger: 'blur' }]
      },
      hideCustoms: false, // 海关和选地区
      gzCheckbox: true, // 跟踪勾选
      attrTable: false, // 多属性勾选
      carriageCheck: true, // 运输勾选
      createAttrs: true, // 创建此多属性勾选
      visibleWeiZhi: false, // 切换仓库框
      ulData: [],
      hidecost: false,
      editData: [], // 多属性数据
      getEditPrice: '',
      dialogVisiblePrice: false, // 编辑价格模态框状态
      dialogVisibleLocation: false, // 选择编辑仓库模态框状态
      dialogVisibleStore: false, // 编辑仓库数量模态框状态
      dialogVisibleSku: false, // 编辑SKU模态框状态
      dialogVisibleCode: false, // 编辑条码模态框状态
      editPrice: '', // 编辑价格
      dialogVisibleNum: false, // 编辑数量
      dialogVisibleEdit: false, // 编辑当前属性
      editNum: '', // 全部应用的数量
      BgColor: '',
      locate_inventory: [],
      color1: '#409EFF',
      checkedEdit: [], // 仓库选中
      warehouseData: [], // 仓库数据
      // serverUrl: '', // 这里写你要上传的图片服务器地址
      priceTiShi: '', // 价格提示
      addTishi: false, // 添加提示
      TiLength: 0,
      sstt: ['ss1', 'ss2', 'ss3'], // 设置3个class改变li的样式
      sxColor: ['sx1', 'sx2', 'sx3'], // 设置的3个字体颜色
      inventory: '', // 产品库存
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
      serverUrl: '/Shop/public/index.php/Product/Goods/uploadeditimg', // 这里写你要上传的图片服务器地址
      weightNum: '', // 重量
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible2: false, // 编辑仓库位置
      dialogVisible3: false, // 仓库未选中提示
      addData: [
        {
          attribute: 'Size',
          optionSpan: [],
          placeholder: 'Separated by commas',
          input: ''
        }
      ],
      checked: true, // 勾选属性
      arr: [],
      optionData: '',
      shuzunum: [], // 生成的数组，用来存放多属性
      result: [], // 新组成的数组,多属性的组合
      resultSize: 0, // 新数组的拆分尺寸，按几个拆分为新数组
      unit: [{ monad: 'lb' }, { monad: 'oz' }, { monad: 'kg' }], // 存放重量单位
      unitid: 'lb', // 重量单位
      active: 0, // 默认选中的索引值
      activeTwo: 0, // 默认选中的索引值
      JiaGe: '', // 产品价格
      KuCun: '', // 产品库存
      siteId: 0, //
      dataArr: [], // 所有属性组合的数组
      attrNameTwo: null, // 多属性的name
      getPrice: 0,
      attrsData: [], // 当前行的多属性状态
      gouxuanArr: [], // 勾选中的属性
      getIndex: 0 // 获取当前下标
    }
  },
  filters: {
    currency: currency
  },
  methods: {
    // 富文本内容改变事件
    onEditorChange (event) {
      event.quill.deleteText(800, 4)
      if (this.content === '') {
        this.TiLength = 0
      } else {
        this.TiLength = event.quill.getLength() - 1
      }
    },
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
    // 返回产品页面
    backTop () {
      this.$router.go(-1)
    },
    // 正整数0-9
    vaidateCycle (item) {
      let re = /^[0-9]+$/
      if (!re.test(item.num)) {
        this.$nextTick(() => {
          item.num = parseInt(item.num)
          item.num = 0
        })
      }
    },
    // 金钱格式
    moneyFormat (e) {
      e.target.value = formatMoney(e.target.value)
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.editData.length; i++) {
        this.editData[i].isSelect = !isSelect
      }
    },
    // 点击修改全部价格
    allApp () {
      this.ulData.forEach(val => {
        val.price = this.editPrice
      })
    },
    // 点击选中仓库
    bianJiNum (item) {
      this.cangkuName = item.name
      this.attrsName = item.name
      this.dialogVisibleStore = true
      if (this.getTotal.length > 0) {
        this.attrs = JSON.parse(JSON.stringify(this.getTotal))
      } else {
        this.attrs = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存编辑数量
    saveNum () {
      if (this.getTotal.length > 0) {
        this.attrs.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.attrs[idx].siteId === this.editData[index].siteId) {
              this.editData[index].location = this.attrs[idx].location
            }
          })
        })
      } else {
        this.editData = this.attrs
      }
      this.dialogVisibleLocation = false
      this.dialogVisibleStore = false
    },
    // 点击编辑价格
    bjPrice () {
      this.dialogVisiblePrice = true
      if (this.getTotal.length > 0) {
        this.ulData = JSON.parse(JSON.stringify(this.getTotal))
      } else {
        this.ulData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存价格
    savePrice () {
      if (this.getTotal.length > 0) {
        this.ulData.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.ulData[idx].siteId === this.editData[index].siteId) {
              this.editData[index].price = this.ulData[idx].price
            }
          })
        })
      } else {
        this.editData = this.ulData
      }
      this.dialogVisiblePrice = false
    },
    // 打开编辑数量
    bjNum () {
      this.dialogVisibleLocation = true
    },
    // 编辑数量的全部应用功能
    allNum () {
      this.attrs.forEach(val => {
        val.location.forEach(data => {
          if (this.cangkuName === data.name) {
            data.num = this.editNum
          }
        })
      })
    },
    // 点击编辑SKU
    bjSku () {
      this.dialogVisibleSku = true
      if (this.getTotal.length > 0) {
        this.skuData = JSON.parse(JSON.stringify(this.getTotal))
      } else {
        this.skuData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存sku
    saveSku () {
      if (this.getTotal.length > 0) {
        this.skuData.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.skuData[idx].siteId === this.editData[index].siteId) {
              this.editData[index].sku = this.skuData[idx].sku
            }
          })
        })
      } else {
        this.editData = this.skuData
      }
      this.dialogVisibleSku = false
    },
    // 点击编辑条码
    bjCode () {
      this.dialogVisibleCode = true
      if (this.getTotal.length > 0) {
        this.CodeData = JSON.parse(JSON.stringify(this.getTotal))
      } else {
        this.CodeData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存条码
    saveCode () {
      if (this.getTotal.length > 0) {
        this.CodeData.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.CodeData[idx].siteId === this.editData[index].siteId) {
              this.editData[index].itemcode = this.CodeData[idx].itemcode
            }
          })
        })
      } else {
        this.editData = this.CodeData
      }
      this.dialogVisibleCode = false
    },
    // 当前（行）属性的状态
    editDetails (item, index) {
      if (this.getTotal.length > 0) {
        item.isSelect = !item.isSelect
        return false
      } else {
        this.getIndex = index
        this.attrsData = []
        this.attrsData.push(JSON.parse(JSON.stringify(item))) // 深复制当前行数据
        this.attrNameTwo = item.name.join('-')
        this.dialogVisibleEdit = true
      }
    },
    // 保存当前行多属性值
    saveRepertory (item) {
      this.$set(this.editData, this.getIndex, item)
      this.dialogVisibleEdit = false
    },
    // 仓库勾选确定
    addWarehouse () {
      let b = false // 定义一个变量
      this.warehouseData = []
      this.checkedEdit.forEach((data, index) => {
        if (data.checked === true) {
          this.warehouseData.push(data)
        }
        if (data.checked) b = true // 循环判断值，如果有值（true）那么就用变量就为true
      })
      if (!b) {
        this.warehouseData = this.checkedEdit
        return false
      } else {
        if (this.editData.length > 0) {
          this.editData.forEach(val => {
            val.site = this.warehouseData.length
            val.location = []
            this.warehouseData.forEach(item => {
              val.location.push(JSON.parse(JSON.stringify(item)))
            })
          })
        }
      }// 如果没有值（true）那么就执行下一步
      this.dialogVisible2 = false
    },
    // 获取勾选的仓库值
    getCheck () {
      let c = false
      this.checkedEdit.forEach((data, index) => {
        if (data.checked) {
          this.$refs.BtnCss.style.backgroundColor = '#5563c1'
          c = true
          this.dialogVisible3 = false
        }
      })
      if (!c) {
        this.$refs.BtnCss.style.backgroundColor = '#bac0e6'
        this.dialogVisible3 = true
        return false
      }
    },
    // 加入图片
    fileChange (e) {
      var _this = this
      var file = e.target.files
      var leng = file.length
      if (leng + _this.ruleForm.imgs.length > _this.ruleForm.maxCount) {
        alert(this.$t('addShop.hint.text1') + _this.ruleForm.maxCount + this.$t('addShop.hint.text2'))
        return
      }
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        _this.ruleForm.imgfiles.push(file[i])
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          let obj = {
            data: e.target.result
          }
          _this.ruleForm.imgs.push(obj) // base64 图片地址形成预览
        }
      }
      this.$refs.FileValue.value = ''
    },
    // 根据下标删除图片
    del (i) {
      this.ruleForm.imgfiles.splice(i + 1, 1)
      this.ruleForm.imgs.splice(i + 1, 1)
    },
    // 添加属性
    addShuXin () {
      let arr = ['Size', 'Color', 'Material']
      let inputs = {
        attribute: '',
        optionSpan: [],
        placeholder: 'Separated by commas',
        input: ''
      }
      let data = this.addData.length
      if (data < arr.length) {
        this.addData.forEach(item => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item.attribute) {
              arr.splice(i, 1)
              i--
            }
          }
        })
        inputs.attribute = arr[0]
        this.addData.push(inputs)
      } else {
        this.$message(this.$t('addShop.hint.text3'))
      }
    },
    // 删除当前添加的行
    DeleteTr (index) {
      this.addData.splice(index, 1)
      this.ArrMethods()
    },
    // inpu的失焦事件，添加属性
    carriageBlur (e, index, item) {
      let judge = false
      let suxing = e.target.value
      let length = item.input.split(' ').join('').length
      let optionData = this.addData[index].optionSpan
      for (let i = 0; i < optionData.length; i++) {
        if (optionData[i] === suxing) {
          judge = true
          this.$message(this.$t('addShop.hint.text4'))
        }
      }
      if (!judge) { // 判断是否重复
        if (length > 0) {
          optionData.push(item.input)
          judge = false
          this.ArrMethods()
        }
        this.addData[index].input = ''
      }
    },
    // 删除添加属性
    DeleteSpan (i, ind, item) {
      if (this.addData[i].optionSpan.indexOf(item) >= 0) {
        this.addData[i].optionSpan.splice(ind, 1)
      }
      this.ArrMethods()
    },
    // 点击切换重量单位
    selectStyle (item, index) {
      this.active = index
      this.unitid = item.monad
    },
    // 失焦方法
    ArrMethods () {
      this.shuzunum = [] // 每一次添加都清空一次数组
      let data = this.addData
      // 判断添加属性的方法
      if (data[0]) {
        // 如果有第一项
        if (data[0].optionSpan.length > 0) {
          // 如果第一项的数组长度>0
          for (let x of data[0].optionSpan) {
            if (data[1]) {
              // 如果有第二项
              if (data[1].optionSpan.length > 0) {
                // 如果第二项的数组长度>0
                for (let y of data[1].optionSpan) {
                  if (data[2]) {
                    // 如果有第三项
                    if (data[2].optionSpan.length > 0) {
                      // 如果第三项的数组长度>0
                      for (let z of data[2].optionSpan) {
                        this.shuzunum.push(x, y, z)
                        this.resultSize = 3
                      }
                    } else {
                      this.shuzunum.push(x, y)
                      this.resultSize = 2
                    }
                  } else {
                    this.shuzunum.push(x, y)
                    this.resultSize = 2
                  }
                }
              } else {
                // 否则第二项的长度<0
                if (data[2]) {
                  // 如果有第三项
                  if (data[2].optionSpan.length > 0) {
                    // 如果第三项的数组长度>0
                    for (let z of data[2].optionSpan) {
                      this.shuzunum.push(x, z)
                      this.resultSize = 2
                    }
                  } else {
                    this.shuzunum.push(x)
                    this.resultSize = 1
                  }
                } else {
                  this.shuzunum.push(x)
                  this.resultSize = 1
                }
              }
            } else {
              this.shuzunum.push(x)
              this.resultSize = 1
            }
          }
        } else {
          // 否则第一项的长度<0
          if (data[1]) {
            // 如果有第二项
            if (data[1].optionSpan.length > 0) {
              // 如果第二项的数组长度>0
              for (let y of data[1].optionSpan) {
                if (data[2]) {
                  // 如果有第三项
                  if (data[2].optionSpan.length > 0) {
                    // 如果第三项的数组长度>0
                    for (let z of data[2].optionSpan) {
                      this.shuzunum.push(y, z)
                      this.resultSize = 2
                    }
                  } else {
                    // 如果第三项的数组长度<0
                    this.shuzunum.push(y)
                    this.resultSize = 1
                  }
                } else {
                  this.shuzunum.push(y)
                  this.resultSize = 1
                }
              }
            } else {
              // 否则第二项的长度<0
              if (data[2]) {
                // 如果有第三项
                if (data[2].optionSpan.length > 0) {
                  // 如果第三项的数组长度>0
                  for (let z of data[2].optionSpan) {
                    this.shuzunum.push(z)
                    this.resultSize = 1
                  }
                }
              }
            }
          }
        }
      }
      this.result = [] // 每一次添加都清空一次数组
      // ===========================================
      for (let i = 0; i < this.shuzunum.length; i += this.resultSize) { // 拆分数组
        this.result.push(this.shuzunum.slice(i, i + this.resultSize))
      }
      this.funfa()
    },
    // 生成的方法
    funfa () {
      this.dataArr = []
      this.editData = []
      for (let item of this.result) {
        let arr = []
        this.warehouseData.forEach(val => {
          arr.push(JSON.parse(JSON.stringify(val)))
        })
        let obj = {
          name: [],
          price: this.getPrice.toFixed(2),
          num: '',
          checkbox: true
        }
        let obj2 = {
          name: [],
          siteId: this.siteId++,
          isSelect: false,
          price: this.getPrice.toFixed(2),
          costprice: '',
          oldprice: '',
          sku: '',
          itemcode: '',
          repertoryNum: 0,
          location: arr,
          site: this.warehouseData.length
        }
        obj.name = item
        obj2.name = item
        this.dataArr.push(obj)
        this.editData.push(obj2)
      }
    },
    // 切换库存
    pitchCangKu (item, index) {
      this.qhCangkuName = item.name
      this.activeTwo = index
      this.visibleWeiZhi = false
      this.siteName = item.name
    },
    // 保存产品
    save (formName) {
      let arr = []
      let num = Number
      let tax
      let transport
      this.collect === true ? tax = 1 : tax = 0
      this.carriageCheck === true ? transport = 1 : transport = 0
      if (this.attrTable === false) {
        num = 0
      } else {
        num = 1
      }
      if (this.getTotal.length > 0) {
        for (let x of this.editData) {
          if (x.isSelect === true) {
            arr.push(x)
          }
        } // 循环获取勾选的数据
      } else {
        arr = this.editData
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddShop({
            is_tax: tax,
            is_transport: transport,
            sellerid: this.$cookies.get('storeid'),
            goodsname: this.ruleForm.goodsname, // 产品的名称
            content: this.content, // 产品的描述
            image: this.ruleForm.imgs, // 产品的图片
            price: this.ruleForm.price, // 产品售价
            oldprice: this.ruleForm.oldprice, // 产品的原价
            costprice: this.ruleForm.costprice, // 产品成本价
            sku: this.ruleForm.sku, // sku货号
            itemcode: this.ruleForm.barCode, // 产品条码
            unitid: this.unitid, // 重量单位
            weight: this.weightNum, // 重量
            attr: this.addData, // 多属性名称与值
            attprice: arr, // 多属性对应的价格库存等
            is_more_attribute: num, // 是否有多属性
            locate_inventory: this.warehouseData // 位置对应的库存
          }).then(resp => {
            this.$message({ type: 'success', message: resp.data.msg })
            this.$router.push({
              path: '/administratorPanel/productInventory/allProducts'
            })
          })
        } else {
          document.getElementById('ProdInput').scrollIntoView()
          return false
        }
      })
    }
  },
  computed: {
    editor () {
      this.$refs.myQuillEditor.quill.getText(0, 50)
      this.$refs.myQuillEditor.quill.getLength(50)
      return this.$refs.myQuillEditor.quill
    },
    // // 检测是否全选
    isSelectAll () {
      // 如果productList中每一条数据的isSelect都为true，返回true，否则返回false;
      return this.editData.every(function (val) {
        return val.isSelect
      })
    },
    getTotal () {
      var prolist = this.editData.filter(function (val) {
        return val.isSelect
      })
      return prolist
    },
    profit: function () {
      var priceTwo
      priceTwo = (this.ruleForm.price - this.ruleForm.costprice) / this.ruleForm.price * 100
      return { priceTwo: parseFloat(priceTwo).toFixed(1) }
    }
  },
  created () {
    let Arr = []
    showlocation({}).then(resp => {
      this.warehouseLength = resp.data.data.length
      this.loading = false
      resp.data.data.forEach((res) => {
        this.$set(res, 'checked', true)
        Arr.push(res)
        this.locationlist.push(res)
      })
      this.checkedEdit = resp.data.data
      this.warehouseData = this.checkedEdit
      this.cangkuData = resp.data.data
    })
  }
}
</script>
<style lang="less">
  .checkBox-css {
    label {
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
  .add-price {
    .el-form-item__content {
      line-height: 22px;
    }
  }
  .weight-input {
    > input {
      width: 180px;
      height: 48px;
    }
  }
  .bjSku {
    color: black;
    border-top: 1px solid #F4F4F4;
    > ul {
      li:first-child {
        padding-top: 0;
      }
      li {
        padding: 10px 0;
        height: 50px;
        border-bottom: 1px solid #F4F4F4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          width: 300px;
          > .el-input__inner {
            height: 40px;
          }
        }
      }
    }
  }
  .attrNum {
    > .el-input-number {
      width: 540px;
      .el-input-number__decrease {
        height: 24px;
        bottom: 2px;
      }
      .el-input-number__increase {
        height: 23px;
      }
      > .el-input {
        > input {
          height: 47px;
          text-align: left;
        }
      }
    }
  }
  .editOptions-edits-box1 {
    margin-top: 20px;
  }
  .editOptions-edits-box1-d {
    position: relative;
    .priceDw {
      position: absolute;
      z-index: 10;
      top: 44px;
      left: 10px;
    }
    .el-input {
      margin-bottom: 10px;
    }
    .el-input__inner {
      margin-top: 10px;
      height: 50px;
      background: rgba(251, 250, 250, 1);
      border: 1px solid rgb(227, 227, 227);
      border-radius: 4px;
      padding-left: 24px;
    }
    margin-bottom: 20px;
  }
  .customs-hs {
    > p:nth-child(1) {
      color: black;
      font-size: 14px;
      font-weight: bold;
    }
    > p:nth-child(2) {
      color: #acabab;
    }
    > div {
      > input {
        height: 50px;
        background: rgba(251, 250, 250, 1);
        border: 1px solid rgb(227, 227, 227);
        border-radius: 4px;
      }
      margin-bottom: 9px;
    }
    > span {
      color: #acabab;
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
  .priceBox {
    > p {
      margin-bottom: 0;
    }
    .el-input__inner {
      margin-top: 8px;
      height: 50px;
      background: rgba(251, 250, 250, 1);
      border: 1px solid rgb(227, 227, 227);
      border-radius: 4px;
    }
  }
  @import '../../../common/css/elementCommon';
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  @import '../../../common/css/addShop';
  @import '../../../common/css/productCommon';
  .avatar-uploader{
    height: 0;
  }
</style>
