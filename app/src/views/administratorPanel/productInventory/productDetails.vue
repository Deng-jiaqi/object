<template>
  <div class="productDetails" v-loading="loading">
    <div class="productDetails-header">
      <h1 class="header-h1">{{goodsGetName}}</h1>
      <p class="add-black" @click="backTop"><span class="el-icon-arrow-left"></span>{{$t('productDetails.header.back')}}</p>
    </div>
    <div class="productDetails-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="add-form">
        <!--        产品名称-->
        <el-form-item prop="goodsname">
          <div class="add-name">
            <p class="productDetails-text">{{$t('productDetails.shopName')}}</p>
            <el-input type="text" class="product-input" v-model="ruleForm.goodsname" />
          </div>
        </el-form-item>
        <!--        产品描述，富文本编辑-->
        <el-form-item>
          <p class="productDetails-text">{{$t('productDetails.shopMs')}}</p>
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
              <p class="productDetails-text">{{$t('productDetails.proImg.shopImg')}}</p>
              <div class="img-files flex">
                <div class="img-file" v-if='imgs.length < maxCount'>
                  <input type="file" id='files' @change='fileChange($event)' multiple="multiple"
                         ref="FileValue">
                  <label for="files" style="color: #4267B2;cursor: pointer">{{$t('productDetails.proImg.shopUp')}}</label>
                </div>
              </div>
            </div>
            <div class="up-img-box">
              <div class="up-content" v-if="imgs.length>0">
                <div class="up-datu" v-if="imgs.length>0" v-dragging="{ item: imgs[0], list: imgs, group: 'item'}">
                  <div class="up-ImgBox">
                    <img :src="imgs[0].data" alt="">
                  </div>
                  <div class="mask">
                    <el-tooltip class="item" effect="dark" :content="$t('productDetails.proImg.content1')" placement="top">
                        <span class="iconfont iconfangdajing yuLan">
                            <viewer :images="imgs">
                                <img :src="imgs[0].data" alt="" class="yuLanImg">
                            </viewer>
                        </span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="$t('productDetails.proImg.content2')" placement="top">
                      <span @click="del(imgs[0],imgs[0])" class="Delete"><i class="el-icon-delete"></i></span>
                    </el-tooltip>
                  </div>
                </div>
                <div class="up-xiaotu-box">
                  <div class="up-xiaotu" v-for="(item, i) in imgs.slice(1)"
                       :key='i'
                       v-dragging="{ item: item, list: imgs, group: 'item'}">
                    <img :src="item.data" alt="">
                    <div class="mask-xiao">
                      <el-tooltip class="item" effect="dark" :content="$t('productDetails.proImg.content1')" placement="top">
                          <span class="iconfont iconfangdajing yuLan">
                              <viewer :images="imgs">
                                  <img :src="item.data" alt="" class="yuLanImg">
                              </viewer>
                          </span>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="$t('productDetails.proImg.content2')" placement="top">
                        <span @click="del(i, item)" class="Delete"><i class="el-icon-delete"></i></span>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div class="up-content1" v-else>
                <input type="file" @change="fileChange($event)">
                <img src="../../../assets/addShop/image@2x.png" alt="">
                <p>{{$t('productDetails.proImg.shopUp')}}</p>
              </div>
            </div>
            <div class="add-hr"></div>
          </div>
        </el-form-item>
        <!--        产品定价-->
        <el-form-item v-if="is_more_attribute === 0">
          <div class="add-price">
            <div>
              <p class="productDetails-text">{{$t('productDetails.price.title')}}</p>
              <el-row>
                <el-col :span="11">
                  <el-form-item prop="price">
                    <div class="priceBox">
                      <p>{{$t('productDetails.price.text1')}}</p>
                      <el-input type="text" class="product-input"
                                oninput ="value=value.replace(/[^0-9.]/g,'')"
                                placeholder="$0.00" v-model="ruleForm.price"
                                @blur="moneyFormat($event)" />
                    </div>
                    <p v-if="ruleForm.price > 0 && ruleForm.costprice !== ''">{{$t('productDetails.price.text4')}}{{profit.priceTwo}}%</p>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item prop="oldprice">
                    <div class="priceBox">
                      <p>{{$t('productDetails.price.text2')}}</p>
                      <el-input type="text"
                                oninput ="value=value.replace(/[^0-9.]/g,'')"
                                class="product-input" placeholder="$0.00" v-model="ruleForm.oldprice"
                                @blur="moneyFormat($event)" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item prop="costprice">
                <div>
                  <p>{{$t('productDetails.price.text3')}}</p>
                  <el-input type="text"
                            oninput ="value=value.replace(/[^0-9.]/g,'')"
                            class="product-input" placeholder="$0.00" v-model="ruleForm.costprice"
                            @blur="moneyFormat($event)" />
                </div>
              </el-form-item>
              <el-checkbox v-model="collect">{{$t('mulAttrDetails.content.text11')}}</el-checkbox>
            </div>
          </div>
        </el-form-item>
        <!--         跟踪数量和位置名称-->
        <el-form-item v-if="is_more_attribute === 0">
          <div class="multiple-box">
            <div>
              <p class="productDetails-text">{{$t('productDetails.repertory.title')}}</p>
              <el-row>
                <el-col :span="11">
                  <el-form-item prop="sku">
                    <div class="priceBox">
                      <p>{{$t('productDetails.repertory.text1')}}</p>
                      <el-input type="text" class="product-input" v-model="ruleForm.sku" />
                    </div>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <el-form-item prop="barCode">
                    <div class="priceBox">
                      <p>{{$t('productDetails.repertory.text2')}}</p>
                      <el-input type="text" class="product-input" v-model="ruleForm.itemcode" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="checkBox-css">
              <el-checkbox v-model="gzCheckbox">
                {{$t('productDetails.repertory.text3')}}
              </el-checkbox>
              <br>
              <el-checkbox v-if="gzCheckbox === true">
                {{$t('productDetails.repertory.text4')}}
              </el-checkbox>
            </div>
            <div class="mulBox4">
              <p> {{$t('productDetails.repertory.text5')}}</p>
              <div>
                <span> {{$t('productDetails.repertory.span1')}}</span>
                <span class="editWarehouse-text" @click="bjSite"> {{$t('productDetails.repertory.text6')}}</span>
              </div>
            </div>
            <div class="mulBox4">
              <p> {{$t('productDetails.repertory.span2')}}</p>
              <div>
                <span> {{$t('productDetails.repertory.text7')}}</span>
                <span> {{$t('productDetails.repertory.text8')}}</span>
              </div>
            </div>
            <ul>
              <li class="mulBox4" v-for="(item, index) in getCangKuData" :key="index">
                <p>{{item.name}}</p>
                <div>
                  <span>0</span>
                  <el-popover
                      placement="bottom"
                      v-model="item.visibleEditSet"
                      trigger="click">
                    <ul class="flexCss">
                      <li v-for="(item,index) in editSetNum" class="editSetNum" :key="index"
                          :class="{'editSetNumCss':editSetNumActive===index}"
                          @click="editSetStyle(item,index)">{{item.text}}
                      </li>
                    </ul>
                    <div v-if="editSetNumActive === 0">
                      <div class="editeBoxCss">
                        <p> {{$t('productDetails.repertory.span3')}}</p>
                        <el-input-number v-model="item.SetNum"></el-input-number>
                        <p> {{$t('productDetails.repertory.span4')}}</p>
                        <span v-if="item.SetNum === 0">{{item.newNum = item.num}}</span>
                        <span v-else-if="isNaN(item.SetNum)">{{item.newNum = 0}}</span>
                        <span v-else>{{item.newNum = Number(item.SetNum) + Number(item.num)}}</span>
                      </div>
                    </div>
                    <div class="setCsCss" v-else>
                      <div>
                        <div>
                          <p> {{$t('productDetails.repertory.span5')}}</p>
                          <span>{{item.num}}</span>
                        </div>
                        <div style="width: 130px">
                          <p> {{$t('productDetails.repertory.span6')}}</p>
                          <el-input v-model="SetnewNum" :min="0" />
                        </div>
                      </div>
                    </div>
                    <div class="editeCaoZuo">
                      <el-button @click="item.visibleEditSet = false"> {{$t('productDetails.repertory.btn1')}}</el-button>
                      <el-button @click="saveNewNum(item)" type="primary"> {{$t('productDetails.repertory.btn2')}}</el-button>
                    </div>
                    <span slot="reference" class="orangeColor">
                        <el-link :underline="false" style="color: #FFA400">{{item.num}}</el-link>
                      </span>
                  </el-popover>
                </div>
              </li>
            </ul>
            <div class="mulBox4" v-if="getCangKuData.length>1">
              <p> {{$t('productDetails.repertory.span7')}}</p>
              <div>
                <span>0</span>
                <span class="orangeColor">{{getNum.getZongShu}}</span>
              </div>
            </div>
          </div>
        </el-form-item>
        <!--运输方式-->
        <div class="add-carriage" v-if="is_more_attribute === 0">
          <div class="checkBox-css">
            <p class="productDetails-text"> {{$t('productDetails.transportation.title')}}</p>
            <el-checkbox v-model="carriageCheck">{{$t('productDetails.transportation.text1')}}</el-checkbox>
          </div>
          <div class="add-weight" v-if="carriageCheck">
            <p class="productDetails-text">{{$t('productDetails.transportation.text2')}}</p>
            <p class="jisuan-text">{{$t('productDetails.transportation.text3')}}</p>
            <p class="productDetails-text">{{$t('productDetails.transportation.text2')}}</p>
            <div class="weight-box" style="width: 400px">
              <el-input class="weight-input" v-model="weightNum" />
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
          <p v-else>{{$t('productDetails.transportation.text5')}}</p>
        </div>
        <!--        有多属性 多个属性/编辑/操作-->
        <el-form-item v-if="is_more_attribute === 1">
          <div class="productDetails-moreSx">
            <div>
              <p class="productDetails-text">{{$t('productDetails.haveMultiAttribute.title')}}</p>
              <div>
                <el-link @click="routerAttrs">{{$t('productDetails.haveMultiAttribute.span1')}}</el-link>
                <el-popover
                    placement="bottom"
                    trigger="click">
                  <p slot="reference" class="qiTaCaoZuo">
                    <el-link :underline="false">{{$t('productDetails.haveMultiAttribute.span2')}}<span class="el-icon-caret-bottom"></span></el-link>
                  </p>
                  <ul class="locationlistCss">
                    <li @click="bjXuanXiang">{{$t('productDetails.haveMultiAttribute.li')}}</li>
                  </ul>
                </el-popover>
              </div>
            </div>
            <div></div>
            <div>
              <div>
                <label class="flexCss">
                  <input type="checkbox" class="tui-checkbox" @click="selectProduct(isSelectAll)"
                         v-bind:checked="isSelectAll">
                  <span v-if="getTotal.length<1">
                    &nbsp;&nbsp;{{$t('productDetails.haveMultiAttribute.span3')}}
                    {{allSelect}}{{$t('productDetails.haveMultiAttribute.span4')}}
                  </span>
                  <span v-else>&nbsp;&nbsp;{{$t('productDetails.haveMultiAttribute.span5')}} {{getTotal.length}}
                    {{$t('productDetails.haveMultiAttribute.span6')}}
                  <el-button-group>
                    <el-button @click="openAttrs">{{$t('productDetails.haveMultiAttribute.btn1')}}</el-button>
                  <el-popover
                      visible-arrow="false"
                      placement="bottom"
                      trigger="click">
                  <el-button slot="reference">{{$t('productDetails.haveMultiAttribute.btn2')}} <span class="el-icon-caret-bottom"></span></el-button>
                  <ul class="locationlistCss">
                    <li @click="bjPrice">{{$t('productDetails.haveMultiAttribute.li1')}}</li>
                    <li @click="bjNum">{{$t('productDetails.haveMultiAttribute.li2')}}</li>
                    <li @click="bjOption">{{$t('productDetails.haveMultiAttribute.li3')}}</li>
                    <li @click="bjSku">{{$t('productDetails.haveMultiAttribute.li4')}}</li>
                    <li @click="bjCode">{{$t('productDetails.haveMultiAttribute.li5')}}</li>
                    <li @click="delMul">{{$t('productDetails.haveMultiAttribute.li6')}}</li>
                  </ul>
                </el-popover>
                  </el-button-group>
                </span>
                </label>
              </div>
              <div class="BianJiBox" v-if="getTotal.length < 1">
                <el-popover
                    placement="bottom"
                    v-model="visibleWeiZhi"
                    trigger="click">
                  <el-button slot="reference">{{weiZhi}}<span class="el-icon-caret-bottom"></span></el-button>
                  <ul class="locationlistCss">
                    <li v-for="(item, index) in locationlist" :key="index" @click="pitchCangKu(item,index)"
                        :class="{'pitchCss':active===index}">{{item.name}}
                    </li>
                  </ul>
                </el-popover>
              </div>
            </div>
            <ul>
              <li v-for="(item, index) in multiattributeData" :key="index" @click="jumpDetails(item, index)">
                <div>
                  <div><input type="checkbox" class="tui-checkbox" v-bind:checked="item.isSelect"
                              @click="item.isSelect=!item.isSelect"
                              @click.stop></div>
                  <div class="productDetails-imgBox" @click="productBox(item,index)" @click.stop>
                    <img :src="item.attr_img === null ? item.attr_img = upImg : item.attr_img" alt="">
                  </div>
                  <div>
                    <p>{{item.attr_value}}</p>
                    <p>{{item.sku}}</p>
                  </div>
                </div>
                <div class="productDetails-price">
                  <p>￥{{item.price}}</p>
                  <p>{{item.desc}}</p>
                </div>
              </li>
            </ul>
            <div class="allNum">
              <p><span>{{weiZhi}}</span> {{$t('productDetails.haveMultiAttribute.span7')}}</p>
              <p><span>{{totalstorage}}</span>{{$t('productDetails.haveMultiAttribute.span8')}}</p>
            </div>
          </div>
        </el-form-item>
        <!--        没多属性 设置多个属性-->
        <el-form-item v-if="is_more_attribute === 0">
          <div class="add-attributes">
            <p class="productDetails-text">{{$t('productDetails.noMultiAttribute.title')}}</p>
            <div class="checkBox-css">
              <el-checkbox v-model="attrTable">{{$t('productDetails.noMultiAttribute.elCheckbox')}}</el-checkbox>
            </div>
            <div class="attributes-box" v-if="attrTable === true">
              <table width="100%">
                <thead style="text-align: left">
                <tr>
                  <th>{{$t('productDetails.noMultiAttribute.text1')}}</th>
                  <th>{{$t('productDetails.noMultiAttribute.text2')}}</th>
                </tr>
                </thead>
                <tbody class="attributes-xuanXiang" ref="Tbody">
                <tr class="attributes-tr" v-for="(item,index) in MuladdData" :key="item.value">
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
                                 @blur="carriageBlur($event,index, item)">
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td @click="DeleteTr(index)" v-if="MuladdData.length!==1"><span
                      class="iconfont iconlajitong" style="font-size: 20px;cursor: pointer"></span></td>
                </tr>
                <tr class="attributes-tr" v-if="MuladdData.length!==3">
                  <el-button class="attributes-btn" @click="MuladdShuXin">
                    {{$t('productDetails.noMultiAttribute.btn')}}
                  </el-button>
                </tr>
                </tbody>
              </table>
              <template v-if="attrTable === true">
                <div class="add-option" v-if="dataArr.length > 0">
                  <div class="edit-site">
                    <div class="edit-site-box">
                      <div>
                        <label class="flexCss">
                          <input class="check_box tui-checkbox"
                                 type="checkbox"
                                 @click="MulselectProduct(MulisSelectAll)"
                                 v-bind:checked="MulisSelectAll">
                          <span v-if="MulgetTotal.length<1">
                            &nbsp;&nbsp;{{$t('productDetails.noMultiAttribute.showText1')}}
                            {{editData.length}} {{$t('productDetails.noMultiAttribute.showText2')}}</span>
                          <span v-else>&nbsp;&nbsp; <span> {{$t('productDetails.noMultiAttribute.showText3')}}
                            {{MulgetTotal.length}} {{$t('productDetails.noMultiAttribute.showText4')}} </span>
                          <el-popover
                              placement="bottom"
                              trigger="click">
                          <div class="compile">
                            <ul class="locationlistCss">
                              <li @click="MulbjPrice">{{$t('productDetails.noMultiAttribute.li1')}}</li>
                              <li @click="MuldialogVisibleLocation = true">{{$t('productDetails.noMultiAttribute.li2')}}</li>
                              <li @click="MulbjSku">{{$t('productDetails.noMultiAttribute.li3')}}</li>
                              <li @click="MulbjCode">{{$t('productDetails.noMultiAttribute.li4')}}</li>
                            </ul>
                          </div>
                          <el-button slot="reference" class="el-icon-edit">{{$t('productDetails.noMultiAttribute.btn2')}}</el-button>
                        </el-popover>
                        </span>
                        </label>
                      </div>
                      <div class="edit-popover" v-if="MulgetTotal.length<1">
                        <el-popover
                            placement="bottom"
                            v-model="MulvisibleWeiZhi"
                            trigger="click">
                          <div>
                            <ul class="locationlistCss">
                              <li v-for="(item, index) in Mullocationlist" :key="index"
                                  :class="{'pitchCss':activeTwo===index}"
                                  @click="pitchCangKu(item,index)">{{item.name}}
                              </li>
                            </ul>
                          </div>
                          <el-button slot="reference" class="el-icon-location-information">{{siteName}}</el-button>
                        </el-popover>
                      </div>
                    </div>
                    <ul class="edit-site-ul">
                      <li v-for="(item, index) in editData" :key="index" @click="editDetails(item, index)">
                        <div>
                          <input class="check_box tui-checkbox" type="checkbox" v-bind:checked="item.MulisSelect"
                                 @click="item.MulisSelect = !item.MulisSelect"
                                 @click.stop>&nbsp;&nbsp;
                          <span v-for="(i,idx) in item.name" :key="idx"
                                :class="idx===0 ? sxColor[0] : idx===1 ? sxColor[1] :sxColor[2] "><span
                              v-if="idx!==0">-</span>{{i}}</span>
                        </div>
                        <div>
                          <span>{{item.price  | currency('')}}￥</span>
                          <div>
                            <template v-for="(val, indexTwo) in item.location">
                              <span v-if="activeTwo === 0" :key="indexTwo">{{ cangKuNum = +val.num}}</span>
                            </template>
                            <span>{{$t('productDetails.noMultiAttribute.text3')}}{{item.site}}{{$t('productDetails.noMultiAttribute.text4')}}</span>
                            <template v-for="(data, i) in item.location">
                              <span v-if="qhCangkuName === data.name" :key="i">{{data.num}} {{$t('productDetails.noMultiAttribute.text5')}}</span>
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
      <div class="btnCss">
        <el-button @click="delProduct" type="danger" v-preventReClick="2000">{{$t('productDetails.delBtn')}}</el-button>
        <el-button @click="saveMultiple('ruleForm')" v-preventReClick="2000">{{$t('productDetails.saveBtn')}}</el-button>
      </div>
    </div>
    <!--    ===================================有多属性的模态框-->
    <div>
      <!--    编辑位置-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogSite.title')"
          :visible.sync="dialogVisibleSite"
          width="40%">
        <div class="editWarehouse-box2" v-show="judgeSite">
          <p><span class="el-icon-warning"></span>{{$t('productDetails.haveElDialogSite.text1')}}</p>
        </div>
        <span>{{$t('productDetails.haveElDialogSite.text2')}}</span>
        <ul>
          <li v-for="(item, index) in checkedEdit" :key="index" class="checkBox-css">
            <el-checkbox v-model="item.checked"
                         :label="item.name"
                         @change="getCheck(item)">
            </el-checkbox>
            <p v-if="item.checked === false"><span v-if="item.num !==0">{{$t('productDetails.haveElDialogSite.text3')}} {{item.num}} {{$t('productDetails.haveElDialogSite.text4')}}</span></p>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleSite = false">{{$t('productDetails.haveElDialogSite.btn1')}}</el-button>
    <button type="button" @click="addWarehouse" ref="BtnCss" v-preventReClick="2000" class="confirmBtn">{{$t('productDetails.haveElDialogSite.btn2')}}</button>
  </span>
      </el-dialog>
      <!--    编辑价格-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogPrice.title')"
          :visible.sync="dialogVisible"
          width="40%">
        <div>
          <div>
            <div class="editPrice">
              <p>{{$t('productDetails.haveElDialogPrice.text1')}}</p>
              <div class="priceInput">
                <span class="priceSpanTwo">￥</span>
                <input type="text" placeholder="0.00" v-model="editPrice" @blur="myPrice" />
                <button @click="allPrice">{{$t('productDetails.haveElDialogPrice.btn1')}}</button>
              </div>
            </div>
            <ul class="editPrice-ul">
              <li v-for="(item, index) in Editprice" :key="index">
                <span>{{item.attr_value}}</span>
                <div>
                  <MyInput v-model="item.price"></MyInput>
                  <p v-if="item.price > 0"><span>{{item.costprice}}</span> {{$t('productDetails.haveElDialogPrice.text2')}}
                    {{$t('productDetails.haveElDialogPrice.text3')}}{{parseFloat((item.price-item.costprice)/item.price*100).toFixed(2)}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="offPrice">{{$t('productDetails.haveElDialogPrice.btn2')}}</el-button>
    <el-button type="primary" @click="savePrice" style="background-color: #4267B2">{{$t('productDetails.haveElDialogPrice.btn3')}}</el-button>
    </span>
      </el-dialog>
      <!--    编辑选项值-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogOptions.title')"
          :visible.sync="dialogVisible1"
          width="40%">
        <div class="editOptions" v-for="(item, index) in Editattr" :key="index">
          <p>{{item.name}}</p>
          <div class="editOptions-box1">
            <template v-for="(im, idx) in item.attr">
              <div v-if="idx < 2" :key="idx">
                <label>{{im.attr_name}}</label>
                <el-input type="primary" v-model="im.attr_value" />
              </div>
            </template>
          </div>
          <div v-for="(im, idx) in item.attr.slice(3)" :key="idx">
            <label>{{im.attr_name}}</label>
            <br>
            <el-input type="primary" v-model="im.attr_value" />
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="offOptions">{{$t('productDetails.haveElDialogOptions.btn1')}}</el-button>
      <el-button type="primary" @click="saveAttr" style="background-color: #4267B2">{{$t('productDetails.haveElDialogOptions.btn2')}}</el-button>
      </span>
      </el-dialog>
      <!--    选择编辑数量-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogLocation.title')"
          :visible.sync="dialogVisibleLocation"
          width="40%">
        <!--    编辑数量-->
        <el-dialog
            :title="$t('productDetails.haveElDialogLocation.title')"
            :visible.sync="dialogVisibleNum"
            width="40%"
            append-to-body>
          <div>
            <div v-if="attrs.length > 0">
              <div class="editNum">
                <p>{{$t('productDetails.haveElDialogLocation.span1')}}
                  <span style="color: black;font-weight: bold">{{attrsName}}
                  </span>{{$t('productDetails.haveElDialogLocation.span2')}}</p>
                <p>{{$t('productDetails.haveElDialogLocation.text1')}}</p>
                <div class="attrNum">
                  <el-input-number v-model="editNum" controls-position="right"></el-input-number>
                  <button @click="allNum">{{$t('productDetails.haveElDialogLocation.btn1')}}</button>
                </div>
              </div>
              <ul class="editPrice-ul">
                <li v-for="(item, index) in attrs" :key="index">
                  <span>{{item.attr_value}}</span>
                  <div class="priceInput">
                    <el-input-number v-model="item.num" controls-position="right"
                                     v-if="item.locategid !== ''"></el-input-number>
                    <span v-else>{{$t('productDetails.haveElDialogLocation.span3')}} {{attrsName}}{{$t('productDetails.haveElDialogLocation.span4')}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <p v-else>{{$t('productDetails.haveElDialogLocation.span5')}} {{attrsName}} {{$t('productDetails.haveElDialogLocation.span6')}}</p>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleNum = false">{{$t('productDetails.haveElDialogLocation.btn2')}}</el-button>
    <el-button type="primary" @click="saveNum" style="background-color: #4267B2">{{$t('productDetails.haveElDialogLocation.btn3')}}</el-button>
    </span>
        </el-dialog>
        <div class="editOptions-num">
          <p>{{$t('productDetails.haveElDialogLocation.text2')}}</p>
          <ul>
            <li v-for="(item, index) in cangkuData" :key="index" @click="bianJiNum(item,index)">
              <span>{{item.name}}</span>
              <span class="el-icon-arrow-right"></span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleLocation = false">{{$t('productDetails.haveElDialogLocation.btn2')}}</el-button>
      <el-button type="primary" @click="dialogVisibleLocation = false">{{$t('productDetails.haveElDialogLocation.btn4')}}</el-button>
      </span>
      </el-dialog>
      <!--    编辑选项-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogOption.title')"
          :visible.sync="dialogVisibleOption"
          width="40%">
        <div class="bjOptionsHint">
          <p><img src="" alt=""> {{$t('productDetails.haveElDialogOption.text1')}}</p>
        </div>
        <ul class="bianjiOption">
          <li v-for="(item, index) in addData" :key="index">
            <div>
              <div>
                <el-input v-model="item.attr_name"></el-input>
              </div>
              <div>
                <el-input v-model="item.attr_value" v-if="item.judge === false" class="bianjiOption-box"
                          :placeholder="item.placeholder"></el-input>
                <ul class="option-ul" v-else>
                  <li v-for="(it, idx) in item.attrs" :key="idx">
                    <div><span>{{it.attr_value}}</span></div>
                    <div v-if="item.attrs.length>1" @click="delattrsX(index,idx)"><span>x</span></div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <span v-if="item.attrs.length<=1">
                <span @click="delAttrs(index)"
                      class="delCss"
                      v-if="addData.length!==1">{{$t('productDetails.haveElDialogOption.text2')}}</span></span>
            </div>
          </li>
        </ul>
        <el-button class="addQiTa" @click="addShuXin" v-if="addData.length!==3">{{$t('productDetails.haveElDialogOption.text3')}}</el-button>
        <span slot="footer" class="dialog-footer">
      <el-button @click="OptionNo">{{$t('productDetails.haveElDialogOption.btn1')}}</el-button>
      <el-button type="primary" @click="saveOption">{{$t('productDetails.haveElDialogOption.btn2')}}</el-button>
    </span>
      </el-dialog>
      <!--    编辑上传多属性图片-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogImg.title')"
          :visible.sync="dialogVisibleImg"
          width="40%">
        <div class="editImgCss">
          <div v-for="(item, index) in imgs"
               :key="index" @click="pitchImg(item, index)"
               class="editImgCss-box"
               :class="{'pichImgCss':activeImg===index}">
            <img :src=item.data alt="">
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <div class="leftBtn-footer">
        <div>
           <el-button type="danger" v-if="attrImg !== require('../../../assets/addShop/imgdiushi.png')"
                      @click="delImg">{{$t('productDetails.haveElDialogImg.btn1')}}</el-button>
        </div>
        <div>
           <el-button @click="dialogVisibleImg = false">{{$t('productDetails.haveElDialogImg.btn2')}}</el-button>
            <el-button class="editAddImg" @click="uploadHint">{{$t('productDetails.haveElDialogImg.btn4')}}
              <template v-if='imgs.length < maxCount'>
              <input type="file" id='filesEdit' @change='fileChange($event)' multiple="multiple" ref="FileValueEdit">
              </template>
            </el-button>
            <el-button type="primary" @click="upImgs">{{$t('productDetails.haveElDialogImg.btn3')}}</el-button>
        </div>
        </div>
    </span>
      </el-dialog>
      <!--    编辑SKU-->
      <el-dialog
          :title="$t('productDetails.haveElDialogSku.title')"
          :close-on-click-modal="false"
          :visible.sync="dialogVisibleSku"
          width="40%">
        <div class="bjSku">
          <ul>
            <li v-for="(item, index) in skuData" :key="index">
              <p>{{item.attr_value}}</p>
              <el-input v-model="item.sku"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="offSku">{{$t('productDetails.haveElDialogSku.btn1')}}</el-button>
      <el-button type="primary" @click="saveEditSku">{{$t('productDetails.haveElDialogSku.btn2')}}</el-button>
    </span>
      </el-dialog>
      <!--    编辑条码-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.haveElDialogCode.title')"
          :visible.sync="dialogVisibleCode"
          width="40%">
        <div class="bjSku">
          <ul>
            <li v-for="(item, index) in CodeData" :key="index">
              <p>{{item.attr_value}}</p>
              <el-input v-model="item.itemcode"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="offCode">{{$t('productDetails.haveElDialogCode.btn1')}}</el-button>
      <el-button type="primary" @click="saveEditCode">{{$t('productDetails.haveElDialogCode.btn2')}}</el-button>
    </span>
      </el-dialog>
    </div>
    <!--    ============================================================-->
    <!--    ========================================没有多属性的模特框-->
    <div>
      <!--    编辑价格-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.elDialogPrice.title')"
          :visible.sync="MuldialogVisiblePrice"
          width="40%">
        <div>
          <div>
            <div class="editPrice">
              <p>{{$t('productDetails.elDialogPrice.text1')}}</p>
              <div class="priceInput">
                <span class="priceSpanTwo">￥</span>
                <input type="text" placeholder="100.00"
                       v-model="editPrice" @blur="myPrice" />
                <button @click="allApp">{{$t('productDetails.elDialogPrice.btn1')}}</button>
              </div>
            </div>
            <ul class="editPrice-ul">
              <li v-for="(item,index) in ulData" :key="index">
                <span>{{item.name.join('-')}}</span>
                <div>
                  <MyInput v-model="item.price"></MyInput>
                  <p v-if="item.price > 0"><span>{{item.costprice}}</span>{{$t('productDetails.elDialogPrice.text2')}}
                    {{$t('productDetails.elDialogPrice.text3')}}{{parseFloat((item.price-item.costprice)/item.price*100).toFixed(2)}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="MuldialogVisiblePrice = false">{{$t('productDetails.elDialogPrice.btn2')}}</el-button>
    <el-button type="primary" @click="saveMprice">{{$t('productDetails.elDialogPrice.btn3')}}</el-button>
    </span>
      </el-dialog>
      <!--    选择编辑仓库数量和位置-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.elDialogLocation.title')"
          :visible.sync="MuldialogVisibleLocation"
          width="40%">
        <!--    编辑仓库数量-->
        <el-dialog
            :close-on-click-modal="false"
            :title="$t('productDetails.elDialogLocation.title')"
            append-to-body
            :visible.sync="MuldialogVisibleStore"
            width="40%">
          <div>
            <div>
              <div class="editNum">
                <p>{{$t('productDetails.elDialogLocation.span1')}}
                  <span>{{MulattrsName}}</span>{{$t('productDetails.elDialogLocation.span2')}}</p>
                <p>{{$t('productDetails.elDialogLocation.text1')}}</p>
                <div class="attrNum">
                  <el-input-number v-model="editNum" controls-position="right" :min="0"></el-input-number>
                  <button @click="MulallNum">{{$t('productDetails.elDialogLocation.btn1')}}</button>
                </div>
              </div>
              <ul class="editPrice-ul">
                <li v-for="(item, index) in Mulattrs" :key="index">
                  <span>{{item.name.join('-')}}</span>
                  <div class="priceInput">
                    <template v-for="(data, idx) in item.location">
                      <el-input-number v-if="cangkuName === data.name" :key="idx" v-model="data.num"
                                       @change="vaidateCycle(data)"
                                       controls-position="right"></el-input-number>
                    </template>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="MuldialogVisibleStore = false">{{$t('productDetails.elDialogLocation.btn2')}}</el-button>
          <el-button type="primary" @click="MulsaveNum">{{$t('productDetails.elDialogLocation.btn3')}}</el-button>
          </span>
        </el-dialog>
        <div class="editOptions-num">
          <p>{{$t('productDetails.elDialogLocation.text2')}}</p>
          <ul>
            <li v-for="(item, index) in MulcangkuData" :key="index" @click="MulbianJiNum(item,index)">
              <span>{{item.name}}</span>
              <span class="el-icon-arrow-right"></span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="MuldialogVisibleLocation = false">{{$t('productDetails.elDialogLocation.btn2')}}</el-button>
      <el-button type="primary" @click="MuldialogVisibleLocation = false">{{$t('productDetails.elDialogLocation.btn4')}}</el-button>
      </span>
      </el-dialog>
      <!--    编辑SKU-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.elDialogSku.title')"
          :visible.sync="MuldialogVisibleSku"
          width="40%">
        <div class="bjSku">
          <ul>
            <li v-for="(item, index) in MulskuData" :key="index">
              <p>{{item.name.join('-')}}</p>
              <el-input v-model="item.sku"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="MuldialogVisibleSku = false">{{$t('productDetails.elDialogSku.btn1')}}</el-button>
      <el-button type="primary" @click="saveEditMsku">{{$t('productDetails.elDialogSku.btn2')}}</el-button>
    </span>
      </el-dialog>
      <!--    编辑条码-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.elDialogCode.title')"
          :visible.sync="MuldialogVisibleCode"
          width="40%">
        <div class="bjSku">
          <ul>
            <li v-for="(item, index) in MulCodeData" :key="index">
              <p>{{item.name.join('-')}}</p>
              <el-input v-model="item.itemcode"></el-input>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="MuldialogVisibleCode = false">{{$t('productDetails.elDialogCode.btn1')}}</el-button>
          <el-button type="primary" @click="saveMCode">{{$t('productDetails.elDialogCode.btn2')}}</el-button>
        </div>
      </el-dialog>
      <!--    编辑当前属性-->
      <el-dialog
          :close-on-click-modal="false"
          :title="$t('productDetails.elDialogEdit.title') + attrNameTwo"
          :visible.sync="MuldialogVisibleEdit"
          width="40%">
        <div class="editOptions-edits">
          <div>
            <div class="editOptions-edits-box1" v-for="(item, index) in attrsData" :key="index">
              <el-row>
                <el-col :span="11">
                  <div class="editOptions-edits-box1-d">
                    <span class="priceDw">￥</span>
                    <span>{{$t('productDetails.elDialogEdit.span1')}}</span>
                    <el-input type="text" oninput="value=value.replace(/[^\d]/g, '')" v-model="item.price" @blur="moneyFormat($event)" />
                    <span :v-show="item.price!==''&&item.costprice!==''? hidecost=true : hidecost =false"
                        v-show="hidecost">{{$t('productDetails.elDialogEdit.span2')}}
                      {{parseFloat((item.price - item.costprice) / item.costprice * 100).toFixed(1)}}%</span>
                  </div>
                </el-col>
                <el-col :span="2">&nbsp;</el-col>
                <el-col :span="11">
                  <div class="editOptions-edits-box1-d">
                    <span class="priceDw">￥</span>
                    <span>{{$t('productDetails.elDialogEdit.span3')}}</span>
                    <el-input type="text" oninput="value=value.replace(/[^\d]/g, '')" v-model="item.costprice" @blur="moneyFormat($event)" />
                  </div>
                </el-col>
              </el-row>
              <div class="priceBox">
                <el-row>
                  <el-col :span="11">
                    <div>
                      <span>{{$t('productDetails.elDialogEdit.span4')}}</span>
                      <el-input type="text" v-model="item.sku" />
                    </div>
                  </el-col>
                  <el-col :span="2">&nbsp;</el-col>
                  <el-col :span="11">
                    <div>
                      <span>{{$t('productDetails.elDialogEdit.span5')}}</span>
                      <el-input type="text" v-model="item.itemcode" />
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="editOptions-edits-box2">
                <p><span>{{$t('productDetails.elDialogEdit.span6')}}</span><span>{{$t('productDetails.elDialogEdit.span7')}}</span></p>
                <p><span>{{$t('productDetails.elDialogEdit.span8')}}</span><span>{{$t('productDetails.elDialogEdit.span9')}}</span></p>
                <ul>
                  <li v-for="(val, idx) in item.location" :key="idx">
                    <span>{{val.name}}</span>
                    <el-input-number v-model="val.num" :min="0" controls-position="right" @change="vaidateCycle(val)"></el-input-number>
                  </li>
                </ul>
              </div>
              <div class="btnFooter">
                <el-button @click="MuldialogVisibleEdit = false">{{$t('productDetails.elDialogEdit.btn1')}}</el-button>
                <el-button type="primary" @click="saveRepertory(item, index)">{{$t('productDetails.elDialogEdit.btn2')}}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MyInput from '../../../components/public/priceInput'
import { formatMoney, currency, validateValue } from '../../../common/validator'
import { EvalidateValue } from '../../../common/enValidator'
import {
  editproduct,
  deleteattr,
  numberlocation,
  editprice,
  editnumber,
  editattr,
  showoption,
  saveattrupload,
  deleteattrimg,
  saveprice,
  savenumber,
  editmultlocation, saveitemcode,
  deletelocate,
  saveattr,
  deleteimglist, saveattrimg,
  editsku, edititemcode,
  saveoption, detaildelete,
  saveproduct, savesku, showlocation
} from '../../../common/api/api'
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
  name: 'productDetails',
  // inject: ['reload'],
  components: {
    MyInput
  },
  data () {
    return {
      loading: true,
      collect: true, // 税收
      serverUrl: '/Shop/public/index.php/Product/Goods/uploadeditimg', // 这里写你要上传的图片服务器地址
      editSetNumActive: 0,
      cangKuNum: 0, // 在线仓库总数
      getNewNum: 0,
      SetNum: 0,
      newNum: 0,
      SetnewNum: 0,
      editSetNum: [{ text: this.$t('productDetails.hint.text2') }, { text: this.$t('productDetails.hint.text3') }],
      judgeSite: false, // 判断位置
      dialogVisibleSite: false, // 编辑仓库位置
      MuldialogVisiblePrice: false, // 编辑价格模态框状态
      MuldialogVisibleLocation: false, // 选择编辑仓库模态框状态
      MuldialogVisibleStore: false, // 编辑仓库数量模态框状态
      MuldialogVisibleSku: false, // 编辑SKU模态框状态
      MuldialogVisibleCode: false, // 编辑条码模态框状态
      MuleditPrice: '', // 编辑价格
      MuldialogVisibleNum: false, // 编辑数量
      MuldialogVisibleEdit: false, // 编辑当前属性
      dialogVisiblePlace: false, // 编辑仓库位置
      dialogVisibleGetSite: false, // 仓库未选中提示
      qhCangkuName: '', // 切换仓库名字
      attrTable: false, // 多属性勾选
      checkedEdit: [], // 仓库选中
      hidecost: false,
      MuladdData: [{
        attribute: 'Size',
        optionSpan: [],
        placeholder: 'Separated by commas',
        input: ''
      }],
      attrsData: [], // 当前行的多属性状态
      gouxuanArr: [], // 勾选中的属性
      createAttrs: true, // 创建此多属性勾选
      ulData: [],
      shuzunum: [], // 生成的数组，用来存放多属性
      result: [], // 新组成的数组,多属性的组合
      resultSize: 0, // 新数组的拆分尺寸，按几个拆分为新数组
      warehouseData: [], // 仓库数据
      MulattrsName: '', // 编辑选项值名字
      dataArr: [], // 所有属性组合的数组
      activeTwo: 0, // 默认选中的索引值
      siteName: this.$t('productDetails.hint.text1'), // 仓库位置名字
      editData: [], // 多属性数据
      attrNameTwo: null, // 多属性的name
      sstt: ['ss1', 'ss2', 'ss3'], // 设置3个class改变li的样式
      sxColor: ['sx1', 'sx2', 'sx3'], // 设置的3个字体颜色
      getPrice: 0,
      MulvisibleWeiZhi: false,
      Mullocationlist: [
        { name: this.$t('productDetails.hint.text1'), locateid: 0 }
      ], // 仓库位置
      // =================================
      // ================================================
      addHide: true,
      delJudge: '',
      Materail: null, // 所有对应的属性
      gzCheckbox: true, // 跟踪勾选
      editPrice: '', // 全部应用的价钱
      editNum: '', // 全部应用的数量
      active: 0,
      activeImg: null,
      siteId: 0, // 地址id
      weiZhi: this.$t('productDetails.hint.text1'),
      visibleWeiZhi: false,
      dialogVisible: false, // 编辑价格
      dialogVisibleImg: false, // 编辑上传图片
      dialogVisible1: false, // 编辑选项值
      dialogVisibleLocation: false, // 选择编辑数量
      dialogVisibleNum: false, // 编辑数量
      dialogVisible4: false, // 重新排列多属性
      dialogVisibleOption: false, // 编辑选项
      dialogVisibleSku: false, // 编辑SKU
      dialogVisibleCode: false, // 编辑条码
      checkList: [],
      ruleForm: {
        goodsname: '', // 产品名称
        content: ``, // 产品描述
        price: '', // 价格
        oldprice: '', // 原价
        costprice: '', // 成本价
        sku: '', // sku货号
        itemcode: '', // 条码
        carriageType: '', // 运输类型
        carriagePrice: '' // 运输价钱
      },
      rules: {
        goodsname: this.$i18n.locale === 'en-us' ? [{ validator: EvalidateValue, trigger: 'blur' }] : [{ validator: validateValue, trigger: 'blur' }]
      },
      TiLength: 0, // 显示富文本输入数量
      multiattributeData: [], // 多属性数据
      totalstorage: '', // 仓库数量
      locationlist: [
        { name: this.$t('productDetails.hint.text1'), locateid: 0 }
      ], // 仓库位置
      content: ``, // 产品的描述
      goodsname: '', // 产品的名称
      goodsGetName: '', // 产品的名称
      weightNum: '0.0', // 重量
      hideCustoms: false, // 海关和选地区
      carriageCheck: true, // 运输勾选
      unit: [{ monad: 'lb' }, { monad: 'oz' }, { monad: 'kg' }], // 存放重量单位
      unitid: 'lb', // 重量单位
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
      imgfiles: [], // 图片原文件，上传到后台的数据
      imgs: [], // 图片预览地址
      addImg: [], // 图片存放变量
      maxCount: 9, // 限制上传数量
      Editprice: [], // 编辑价格
      EditpriceNo: [], // 编辑价格
      cangkuData: [], // 选择编辑仓库
      MulcangkuData: [], // 选择编辑仓库
      attrs: [], // 编辑仓库多属性的数量
      Mulattrs: [], // 编辑仓库多属性的数量
      Editattr: [], // 编辑选项值
      EditattrNo: [], // 编辑选项值
      attrsName: '', // 编辑选项值名字
      upImg: require('../../../assets/addShop/imgdiushi.png'),
      rowData: [],
      skuData: [], // sku的数据
      MulskuData: [], // sku的数据
      skuDataNo: [], // sku的数据
      CodeData: [], // 条码的数据
      MulCodeData: [], // 条码的数据
      codeDataNo: [], // 取消条码的数据
      productid: '',
      attrImg: '',
      getAttrs: [],
      getIndex: '',
      getImg: '',
      allSelect: '',
      locateid: 0,
      attrsStorage: '',
      is_more_attribute: 0, // 判断是否有多属性
      locationInfo: [], // 初始获取仓库数据
      getCangKuData: [], // 仓库数据
      addData: [ // 添加多属性
        {
          attr_name: 'Size',
          attr_value: '',
          judge: true,
          attrs: [
            {
              Id: '',
              attr_name: '',
              attr_value: ''
            }
          ]
        }
      ],
      addDataNo: [],
      getSelfImgs: [],
      getMulIndex: 0 // 获取没多属性当前行的下标
    }
  },
  filters: {
    currency: currency
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
    // 取消有多属性的SKU
    offSku () {
      this.skuData = this.skuDataNo
      this.dialogVisibleSku = false
    },
    // 取消有多属性的条码
    offCode () {
      this.CodeData = this.CodeDataNo
      this.dialogVisibleCode = false
    },
    // 取消有多属性的价钱
    offPrice () {
      this.Editprice = this.EditpriceNo
      this.dialogVisible = false
    },
    // 取消有多属性的选项值
    offOptions () {
      this.Editattr = this.EditattrNo
      this.dialogVisible1 = false
    },
    // 有多属性确认保存条码
    saveEditCode () {
      let a
      let b = []
      this.CodeData.forEach(val => {
        a = val.Id + '-' + val.itemcode
        b.push(a)
      })
      saveitemcode({
        attritemcode: b
      }).then(resp => {
        this.dialogVisibleCode = false
      })
    },
    // 有多属性确认保存sku
    saveEditSku () {
      let a
      let b = []
      this.skuData.forEach(val => {
        a = val.Id + '-' + val.sku
        b.push(a)
      })
      savesku({
        attrsku: b
      }).then(resp => {
        this.dialogVisibleSku = false
      })
    },
    // 点击切换重量单位
    selectStyle (item, index) {
      this.active = index
      this.unitid = item.monad
    },
    // 切换设置数量和调整数量
    editSetStyle (item, index) {
      this.editSetNumActive = index
      this.newNum = 0
    },
    // 添加其它属性
    MuladdShuXin () {
      let arr = ['Size', 'Color', 'Material']
      let inputs = {
        attribute: '',
        optionSpan: [],
        placeholder: 'Separated by commas',
        input: ''
      }
      let data = this.MuladdData.length
      if (data < arr.length) {
        this.MuladdData.forEach(item => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item.attribute) {
              arr.splice(i, 1)
              i--
            }
          }
        })
        inputs.attribute = arr[0]
        this.MuladdData.push(inputs)
      } else {
        this.$message(this.$t('productDetails.hint.text4'))
      }
    },
    // 删除当前添加的行
    DeleteTr (index) {
      this.MuladdData.splice(index, 1)
      this.ArrMethods()
    },
    // inpu的失焦事件，添加属性
    carriageBlur (e, index, item) {
      let judge = false
      let suxing = e.target.value
      let length = item.input.split(' ').join('').length
      let optionData = this.MuladdData[index].optionSpan
      for (let i = 0; i < optionData.length; i++) {
        if (optionData[i] === suxing) {
          judge = true
          this.$message(this.$t('productDetails.hint.text5'))
        }
      }
      if (!judge) { // 判断是否重复
        if (length > 0) {
          optionData.push(e.target.value)
          judge = false
          this.ArrMethods()
        }
        this.MuladdData[index].input = ''
      }
    },
    // 删除添加属性
    DeleteSpan (i, ind, item) {
      if (this.MuladdData[i].optionSpan.indexOf(item) >= 0) {
        this.MuladdData[i].optionSpan.splice(ind, 1)
      }
      this.ArrMethods()
    },
    // 失焦方法
    ArrMethods () {
      this.shuzunum = [] // 每一次添加都清空一次数组
      let data = this.MuladdData
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
        this.locationInfo.forEach(val => {
          arr.push(JSON.parse(JSON.stringify(val)))
        })
        let obj = {
          name: [],
          price: '',
          num: '',
          checkbox: true
        }
        let obj2 = {
          name: [],
          siteId: this.siteId++,
          MulisSelect: false,
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
    // 点击编辑价格
    MulbjPrice () {
      this.MuldialogVisiblePrice = true
      if (this.MulgetTotal.length > 0) {
        this.ulData = JSON.parse(JSON.stringify(this.MulgetTotal))
      } else {
        this.ulData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 没多属性保存编辑价格
    saveMprice () {
      if (this.MulgetTotal.length > 0) {
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
      this.MuldialogVisiblePrice = false
    },
    // 编辑数量的全部应用功能
    MulallNum () {
      this.Mulattrs.forEach(val => {
        val.location.forEach(data => {
          if (this.cangkuName === data.name) {
            data.num = this.editNum
          }
        })
      })
    },
    // 点击编辑SKU
    MulbjSku () {
      this.MuldialogVisibleSku = true
      if (this.MulgetTotal.length > 0) {
        this.MulskuData = JSON.parse(JSON.stringify(this.MulgetTotal))
      } else {
        this.MulskuData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 无多属性保存sku
    saveEditMsku () {
      if (this.MulgetTotal.length > 0) {
        this.MulskuData.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.MulskuData[idx].siteId === this.editData[index].siteId) {
              this.editData[index].sku = this.MulskuData[idx].sku
            }
          })
        })
      } else {
        this.editData = this.MulskuData
      }
      this.MuldialogVisibleSku = false
    },
    // 点击编辑条码
    MulbjCode () {
      this.MuldialogVisibleCode = true
      if (this.MulgetTotal.length > 0) {
        this.MulCodeData = JSON.parse(JSON.stringify(this.MulgetTotal))
      } else {
        this.MulCodeData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存条码 -没多属性
    saveMCode () {
      if (this.MulgetTotal.length > 0) {
        this.MulCodeData.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.MulCodeData[idx].siteId === this.editData[index].siteId) {
              this.editData[index].itemcode = this.MulCodeData[idx].itemcode
            }
          })
        })
      } else {
        this.editData = this.MulCodeData
      }
      this.MuldialogVisibleCode = false
    },
    // 当前（行）属性的状态
    editDetails (item, index) {
      console.log(item)
      if (this.MulgetTotal.length > 0) {
        item.MulisSelect = !item.MulisSelect
        return false
      } else {
        this.getMulIndex = index
        this.attrsData = []
        this.attrsData.push(JSON.parse(JSON.stringify(item)))
        this.attrNameTwo = item.name.join('-')
        this.MuldialogVisibleEdit = true
      }
    },
    // 保存当前行多属性值
    saveRepertory (item) {
      this.$set(this.editData, this.getMulIndex, item)
      this.MuldialogVisibleEdit = false
    },
    // 设置选中
    MulselectProduct (MulisSelect) {
      for (var i = 0; i < this.editData.length; i++) {
        this.editData[i].MulisSelect = !MulisSelect
      }
    },
    // 点击修改全部价格
    allApp () {
      this.ulData.forEach(val => {
        val.price = this.editPrice
      })
    },
    // 点击选中仓库
    MulbianJiNum (item) {
      this.cangkuName = item.name
      this.MulattrsName = item.name
      this.MuldialogVisibleStore = true
      if (this.MulgetTotal.length > 0) {
        this.Mulattrs = JSON.parse(JSON.stringify(this.MulgetTotal))
      } else {
        this.Mulattrs = JSON.parse(JSON.stringify(this.editData))
      }
    },
    // 保存编辑数量
    MulsaveNum () {
      if (this.MulgetTotal.length > 0) {
        this.Mulattrs.forEach((val, idx) => {
          this.editData.forEach((data, index) => {
            if (this.Mulattrs[idx].siteId === this.editData[index].siteId) {
              this.editData[index].location = this.Mulattrs[idx].location
            }
          })
        })
      } else {
        this.editData = this.Mulattrs
      }
      this.MuldialogVisibleLocation = false
      this.MuldialogVisibleStore = false
    },
    // 编辑位置
    bjSite () {
      this.dialogVisibleSite = true
      editmultlocation({
        attrpid: 0,
        productid: sessionStorage.getItem('PrId')
      }).then(resp => {
        this.checkedEdit = resp.data.data
      })
    },
    // 仓库勾选确定
    addWarehouse () {
      if (this.judgeSite === false) {
        let a = this.$route.query.attrpid
        if (this.is_more_attribute === 0) {
          a = 0
        }
        deletelocate({
          attrpid: a,
          productid: sessionStorage.getItem('PrId'),
          locategid: this.checkedEdit
        }).then(resp => {
          this.getCangKuData = []
          this.checkedEdit.forEach((data, index) => {
            if (data.checked === true) {
              this.$set(data, 'visibleEditSet', false)
              this.$set(data, 'SetNum', 0)
              this.$set(data, 'newNum', 0)
              this.getCangKuData.push(data)
            }
          })
          this.dialogVisibleSite = false
        })
      } else {
        return false
      }
    },
    // 获取勾选的仓库值
    getCheck () {
      let c = false
      this.checkedEdit.forEach((data, index) => {
        if (data.checked) {
          this.$refs.BtnCss.style.backgroundColor = '#5563c1'
          this.$refs.BtnCss.style.cursor = 'pointer'
          c = true
          this.judgeSite = false
        }
      })
      if (!c) {
        this.$refs.BtnCss.style.backgroundColor = '#bac0e6'
        this.$refs.BtnCss.style.cursor = 'default'
        this.$refs.BtnCss.style.border = '0'
        this.$refs.BtnCss.style.outline = 'none'
        this.judgeSite = true
        return false
      }
    },
    // ========================================
    // ========================================
    // 点击编辑选项
    bjXuanXiang () {
      this.dialogVisibleOption = true
      showoption({
        productid: sessionStorage.getItem('PrId')
      }).then(resp => {
        this.addData = JSON.parse(JSON.stringify(resp.data.data))
        this.addDataNo = JSON.parse(JSON.stringify(resp.data.data))
      })
    },
    // 保存编辑选项
    saveOption () {
      let judgeAttr = false
      let judgeName = false
      let judge = false
      let a = []
      for (let v of this.addData) {
        a.push(v.attr_name)
      }
      this.addData.forEach(val => {
        if (val.judge === false && val.attr_value === '') {
          judge = true
        }
        if (val.attr_name === '') {
          judgeName = true
        }
      })
      if (new Set(a).size !== a.length) {
        judgeAttr = true
      }
      if (judgeAttr === true) {
        this.$message(this.$t('productDetails.hint.text4'))
        return false
      } else if (judge === true) {
        this.$message(this.$t('productDetails.hint.text6'))
        return false
      } else if (judgeName === true) {
        this.$message(this.$t('productDetails.hint.text6'))
      } else {
        saveoption({
          productid: sessionStorage.getItem('PrId'),
          attr: this.addData
        }).then(resp => {
          this.$message({
            type: 'success',
            message: resp.data.msg
          })
          this.dialogVisibleOption = false
        })
      }
    },
    // 点击取消选项
    OptionNo () {
      this.addData = this.addDataNo
      this.dialogVisibleOption = false
    },
    // 添加属性
    addShuXin () {
      this.addHide = false
      let arr = ['Size', 'Color', 'Material']
      let inputs = {
        attr_name: '',
        attr_value: '',
        placeholder: '',
        judge: false,
        attrs: [
          {
            Id: '',
            attr_name: '',
            attr_value: ''
          }
        ]
      }
      let data = this.addData.length
      if (data < arr.length) {
        this.addData.forEach(item => {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === item.attr_name) {
              arr.splice(i, 1)
              i--
            }
          }
        })
        inputs.attr_name = arr[0]
        this.addData.push(inputs)
      } else {
        this.$message(this.$t('productDetails.hint.text4'))
      }
    },
    // 删除多属性
    delAttrs (index) {
      this.addData.splice(index, 1)
    },
    // 删除多属性的值
    delattrsX (index, idx) {
      this.addData[index].attrs.splice(idx, 1)
    },
    // 金钱格式
    moneyFormat (e) {
      e.target.value = formatMoney(e.target.value)
    },
    // 设置选中
    selectProduct (isSelect) {
      for (var i = 0; i < this.multiattributeData.length; i++) {
        this.multiattributeData[i].isSelect = !isSelect
      }
    },
    // 失焦转换金钱格式
    myPrice () {
      this.editPrice = formatMoney(this.editPrice)
    },
    // 编辑价格的全部应用功能
    allPrice () {
      this.Editprice.forEach(val => {
        val.price = this.editPrice
      })
    },
    // 删除当前选中多属性
    delMul () {
      this.$confirm(this.$t('productDetails.hint.text7'), this.$t('productDetails.hint.btn1'), {
        confirmButtonText: this.$t('productDetails.hint.btn2'),
        cancelButtonText: this.$t('productDetails.hint.btn3'),
        type: 'warning'
      }).then(() => {
        let attrpid = []
        this.getTotal.forEach(val => {
          attrpid.push(val.Id)
        })
        deleteattr({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          // this.reload()
          this.$message({
            type: 'success',
            message: this.$t('productDetails.hint.btn4')
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('productDetails.hint.btn5')
        })
      })
    },
    // 点击编辑价格
    bjPrice () {
      let attrpid = []
      this.dialogVisible = true
      if (this.getTotal.length > 0) {
        this.getTotal.forEach(val => {
          attrpid.push(val.Id)
        })
        editprice({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.Editprice = JSON.parse(JSON.stringify(resp.data.data))
          this.EditpriceNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      } else {
        editprice({
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.Editprice = JSON.parse(JSON.stringify(resp.data.data))
          this.EditpriceNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      }
    },
    // 保存编辑价格
    savePrice () {
      let a
      let b = []
      this.Editprice.forEach(val => {
        a = val.Id + '-' + val.price
        b.push(a)
      })
      this.multiattributeData.forEach((val, index) => {
        this.Editprice.forEach((tes, idx) => {
          if (this.multiattributeData[index].Id === this.Editprice[idx].Id) {
            val.price = formatMoney(tes.price)
          }
        })
      })
      saveprice({
        attrprice: b
      }).then(resp => {
        this.dialogVisible = false
        this.$message(resp.data.msg)
      })
    },
    // 编辑数量的全部应用功能
    allNum () {
      this.attrs.forEach(val => {
        val.num = this.editNum
      })
    },
    // 点击编辑数量
    bjNum () {
      let attrpid = []
      if (this.locateid === 0) {
        this.dialogVisibleLocation = true
        if (this.getTotal.length > 0) {
          this.getTotal.forEach(val => {
            attrpid.push(val.Id)
          })
          editnumber({
            locateid: this.locateid,
            attrpid: attrpid,
            productid: Number(sessionStorage.getItem('PrId'))
          }).then(resp => {
            this.cangkuData = resp.data.data
          })
        } else {
          editnumber({
            locateid: this.locateid,
            attrpid: attrpid,
            productid: Number(sessionStorage.getItem('PrId'))
          }).then(resp => {
            this.cangkuData = resp.data.data
          })
        }
      } else {
        this.dialogVisibleNum = true
        if (this.getTotal.length > 0) {
          this.getTotal.forEach(val => {
            attrpid.push(val.Id)
          })
          editnumber({
            locateid: this.locateid,
            attrpid: attrpid,
            productid: sessionStorage.getItem('PrId')
          }).then(resp => {
            this.attrs = resp.data.data[0].attrs
            this.attrsName = resp.data.data[0].name
          })
        } else {
          editnumber({
            locateid: this.locateid,
            attrpid: attrpid,
            productid: sessionStorage.getItem('PrId')
          }).then(resp => {
            this.attrs = resp.data.data[0].attrs
            this.attrsName = resp.data.data[0].name
          })
        }
      }
    },
    // 选择编辑数量仓库
    bianJiNum (item, index) {
      console.log(item)
      this.dialogVisibleNum = true
      this.attrs = JSON.parse(JSON.stringify(item.attrs))
      this.attrsName = item.name
    },
    // 保存编辑数量
    saveNum () {
      let a
      let b = []
      this.attrs.forEach(val => {
        a = val.locategid + '-' + val.num
        b.push(a)
      })
      if (this.attrs.length > 0) {
        savenumber({
          location: b
        }).then(resp => {
          editproduct({
            productid: sessionStorage.getItem('PrId')
          }).then(res => {
            this.multiattributeData = res.data.data.attr_location.info
            this.dialogVisibleNum = false
            this.dialogVisibleLocation = false
            this.$message(res.data.msg)
          })
        })
      } else {
        this.$message(this.$t('productDetails.hint.text8'))
        return false
      }
    },
    // 点击当前多属性图片打开模态框
    productBox (item, index) {
      this.getIndex = index
      this.dialogVisibleImg = true
      this.rowData = item
      this.attrImg = item.attr_img
      this.imgs.forEach((val, index) => {
        if (item.attr_img === this.imgs[index].data) {
          this.activeImg = index
        } else if (item.attr_img === this.upImg) {
          this.activeImg = ''
        }
      })
    },
    // 点击选中多属性图片
    pitchImg (item, index) {
      this.activeImg = index
      this.getImg = item.data
    },
    // 删除当前多属性的图片
    delImg () {
      deleteattrimg({
        attrpid: [this.rowData.Id],
        productid: sessionStorage.getItem('PrId')
      }).then(resp => {
        this.dialogVisibleImg = false
        this.$message(resp.data.msg)
        this.multiattributeData[this.getIndex].attr_img = this.upImg
      })
    },
    // 保存编辑当前选中的图片
    upImgs () {
      this.dialogVisibleImg = false
      saveattrimg({
        attrpid: this.rowData.Id,
        productid: sessionStorage.getItem('PrId'),
        image: this.getImg
      }).then(resp => {
        this.$message({
          type: 'success',
          message: resp.data.msg
        })
        this.multiattributeData[this.getIndex].attr_img = this.getImg
      })
    },
    // 点击跳转到当前多属性详情编辑
    jumpDetails (item, index) {
      this.$router.push({
        path: '/administratorPanel/productInventory/allProducts/multiattributeDetail',
        query: {
          attrpid: item.Id,
          productid: sessionStorage.getItem('PrId')
        }
      })
    },
    // 点击编辑选项值
    bjOption () {
      let attrpid = []
      this.dialogVisible1 = true
      if (this.getTotal.length > 0) {
        this.getTotal.forEach(val => {
          attrpid.push(val.Id)
        })
        editattr({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.Editattr = JSON.parse(JSON.stringify(resp.data.data))
          this.EditattrNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      } else {
        editattr({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.Editattr = JSON.parse(JSON.stringify(resp.data.data))
          this.EditattrNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      }
    },
    // 保存编辑完成的选项值
    saveAttr () {
      saveattr({
        attr: this.Editattr
      }).then(resp => {
        this.dialogVisible1 = false
      })
    },
    // 点击编辑SKU
    bjSku () {
      let attrpid = []
      this.dialogVisibleSku = true
      if (this.getTotal.length > 0) {
        this.getTotal.forEach(val => {
          attrpid.push(val.Id)
        })
        editsku({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.skuData = JSON.parse(JSON.stringify(resp.data.data))
          this.skuDataNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      } else {
        editsku({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.skuData = JSON.parse(JSON.stringify(resp.data.data))
          this.skuDataNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      }
    },
    // 点击编辑条码
    bjCode () {
      let attrpid = []
      this.dialogVisibleCode = true
      if (this.getTotal.length > 0) {
        this.getTotal.forEach(val => {
          attrpid.push(val.Id)
        })
        edititemcode({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.CodeData = JSON.parse(JSON.stringify(resp.data.data))
          this.CodeDataNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      } else {
        edititemcode({
          attrpid: attrpid,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.CodeData = JSON.parse(JSON.stringify(resp.data.data))
          this.CodeDataNo = JSON.parse(JSON.stringify(resp.data.data))
        })
      }
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
    fileChange (e) {
      var _this = this
      var file = e.target.files
      var leng = file.length
      if (leng + _this.imgs.length > _this.maxCount) {
        alert(_this.$t('productDetails.hint.text9') + _this.maxCount + _this.$t('productDetails.hint.text10'))
        return false
      }
      for (let i = 0; i < leng; i++) {
        var reader = new FileReader() // 使用 FileReader 来获取图片路径及预览效果
        _this.imgfiles.push(file[i])
        reader.readAsDataURL(file[i])
        reader.onload = (e) => {
          _this.addImg = []
          let obj = { data: e.target.result }
          _this.addImg.push(obj)
          _this.imgs.push(obj)
          saveattrupload({
            productid: sessionStorage.getItem('PrId'),
            image: _this.addImg
          }).then(resp => {
            _this.imgs = resp.data.data
          })
        }
      }
      _this.$refs.FileValue.value = ''
      _this.$refs.FileValueEdit.value = ''
    },
    // 判断图片上传限制置灰
    uploadHint () {
      if (this.imgs.length > 8) {
        alert('最多上传9张图片！')
        return false
      }
    },
    // 根据下标删除图片
    del (i, item) {
      this.$confirm(this.$t('productDetails.hint.text11'), this.$t('productDetails.hint.btn1'), {
        confirmButtonText: this.$t('productDetails.hint.btn2'),
        cancelButtonText: this.$t('productDetails.hint.btn3'),
        type: 'warning'
      }).then(() => {
        deleteimglist({
          productid: sessionStorage.getItem('PrId'),
          img: item.data
        }).then(resp => {
          this.imgs = resp.data.data
          this.$message({
            type: 'success',
            message: this.$t('productDetails.hint.btn4')
          })
        })
        this.imgfiles.splice(i + 1, 1)
        this.imgs.splice(i + 1, 1)
        // this.reload()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('productDetails.hint.btn5')
        })
      })
    },
    handleClose (done) {
      this.$confirm(this.$t('productDetails.hint.btn6'))
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    // 切换仓库，重新渲染
    pitchCangKu (item, index) {
      this.weiZhi = item.name
      this.locateid = item.locateid
      this.active = index
      this.MulvisibleWeiZhi = false
      this.visibleWeiZhi = false
      numberlocation({
        locateid: item.locateid,
        productid: sessionStorage.getItem('PrId')
      }).then(resp => {
        this.totalstorage = resp.data.data.totalstorage
        this.multiattributeData = resp.data.data.attr_location
      })
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
    // 保存当前编辑好的产品详情
    saveMultiple (formName) {
      let num = Number
      if (this.is_more_attribute === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            saveproduct({
              productid: sessionStorage.getItem('PrId'),
              goodsname: this.ruleForm.goodsname,
              content: this.content,
              is_more_attribute: this.is_more_attribute
            }).then(resp => {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              })
              this.$router.push({
                path: '/administratorPanel/productInventory/allProducts'
              })
            })
          } else {
            this.$message(this.$t('productDetails.hint.text12'))
          }
        })
      } else {
        this.attrTable === false ? num = 0 : num = 1
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let tax
            let transport
            this.collect === true ? tax = 1 : tax = 0
            this.carriageCheck === true ? transport = 1 : transport = 0
            saveproduct({
              is_tax: tax,
              is_transport: transport,
              productid: sessionStorage.getItem('PrId'),
              goodsname: this.ruleForm.goodsname,
              content: this.content,
              price: this.ruleForm.price,
              oldprice: this.ruleForm.oldprice,
              costprice: this.ruleForm.costprice,
              sku: this.ruleForm.sku,
              itemcode: this.ruleForm.itemcode,
              unitid: this.unitid,
              weight: this.weightNum,
              is_more_attribute: num,
              attr: this.MuladdData, // 多属性名称与值
              attprice: this.editData, // 多属性对应的价格库存等
              locate_inventory: this.getCangKuData // 位置对应的库存
            }).then(resp => {
              this.$router.push({
                path: '/administratorPanel/productInventory/allProducts'
              })
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'success'
              })
            })
          } else {
            this.$message(this.$t('productDetails.hint.text12'))
          }
        })
      }
    },
    // 删除当前产品的产品详情
    delProduct () {
      this.$confirm(this.$t('productDetails.hint.text13'), this.$t('productDetails.hint.btn1'), {
        confirmButtonText: this.$t('productDetails.hint.btn2'),
        cancelButtonText: this.$t('productDetails.hint.btn3'),
        type: 'warning'
      }).then(() => {
        detaildelete({
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.$router.go(-1)
          this.$message({
            type: 'success',
            message: this.$t('productDetails.hint.btn4')
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('productDetails.hint.btn5')
        })
      })
    },
    // 打开批量编辑器
    openAttrs () {
      let getProcdut = []
      this.getTotal.forEach(val => {
        getProcdut.push(val.Id)
      })
      this.$router.push({
        path: '/bulkEdit',
        query: {
          idDs: getProcdut,
          ds: '1'
        }
      })
    },
    // 添加多属性跳转
    routerAttrs () {
      this.$router.push({
        path: '/administratorPanel/productInventory/allProducts/multiattributeDetail',
        query: {
          productid: sessionStorage.getItem('PrId')
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
    // 检测是否全选
    isSelectAll () {
      // 如果productList中每一条数据的isSelect都为true，返回true，否则返回false;
      return this.multiattributeData.every(function (val) {
        return val.isSelect
      })
    },
    // 检测是否全选
    MulisSelectAll () {
      return this.editData.every(function (val) {
        return val.MulisSelect
      })
    },
    MulgetTotal () {
      var prolist = this.editData.filter((val) => {
        return val.MulisSelect
      })
      return prolist
    },
    getTotal () {
      var prolist = this.multiattributeData.filter(function (val) {
        return val.isSelect
      })
      return prolist
    },
    profit: function () {
      var pricelist
      var priceTwo
      var getJtPrice = 0
      this.Editprice.forEach((val, index) => {
        getJtPrice = (this.Editprice[index].price - this.Editprice[index].costprice) / this.Editprice[index].price * 100
      })
      pricelist = (this.dprice - this.dcost) / this.dprice * 100
      priceTwo = (this.ruleForm.price - this.ruleForm.costprice) / this.ruleForm.price * 100
      return {
        pricelist: parseFloat(pricelist).toFixed(1),
        priceTwo: parseFloat(priceTwo).toFixed(1),
        getJtPrice: parseFloat(getJtPrice).toFixed(1)
      }
    },
    getNum: function () {
      var getZongShu = 0
      this.getCangKuData.forEach(val => {
        getZongShu += Number(val.num)
      })
      return { getZongShu: getZongShu }
    }
  },
  mounted: function () {
    var _this = this
    // 为productList添加select（是否选中）字段，初始值为true
    this.multiattributeData.map(function (item) {
      _this.$set(item, 'isSelect', false)
    })
    this.editData.map(function (item) {
      _this.$set(item, 'MulisSelect', false)
    })
  },
  created () {
    showlocation({}).then(resp => {
      resp.data.data.forEach((res) => {
        this.$set(res, 'checked', true)
        this.Mullocationlist.push(res)
      })
    })
    this.productid = sessionStorage.getItem('PrId')
    editproduct({
      productid: sessionStorage.getItem('PrId')
    }).then(resp => {
      let Arr = []
      let a = resp.data.data
      a.is_tax === 1 ? this.collect = true : this.collect = false
      console.log(a.is_transport)
      a.is_transport === 1 ? this.carriageCheck = true : this.carriageCheck = false
      this.content = a.content
      this.imgs = a.imgs
      this.ruleForm.goodsname = a.goodsname
      this.goodsGetName = JSON.parse(JSON.stringify(a.goodsname))
      this.multiattributeData = a.attr_location.info
      if (a.is_more_attribute === 1) {
        this.allSelect = this.multiattributeData.length
      } else {
        editmultlocation({
          attrpid: 0,
          productid: sessionStorage.getItem('PrId')
        }).then(resp => {
          this.checkedEdit = resp.data.data
          this.checkedEdit.forEach((data, index) => {
            if (data.checked === true) {
              this.$set(data, 'visibleEditSet', false)
              this.$set(data, 'SetNum', 0)
              this.$set(data, 'newNum', 0)
              this.getCangKuData.push(data)
              this.MulcangkuData.push(data)
            }
          })
        })
      }
      this.totalstorage = a.attr_location.totalstorage
      this.locationlist = a.locationlist
      this.is_more_attribute = Number(a.is_more_attribute)
      if (a.location === []) {
        resp.data.data.location.info.forEach((res) => {
          this.$set(res, 'checked', true)
          Arr.push(res)
        })
        this.checkedEdit = a.location.info
        this.warehouseData = this.checkedEdit
      }
      this.locationInfo = a.location.info
      a.costprice === '0.00' ? a.costprice = '' : this.ruleForm.costprice = a.costprice
      a.price === '0.00' ? a.price = '' : this.ruleForm.price = a.price
      a.oldprice === '0.00' ? a.oldprice = '' : this.ruleForm.oldprice = a.oldprice
      this.ruleForm.sku = a.sku
      this.ruleForm.itemcode = a.itemcode
      this.weightNum = a.weight
      this.unit.forEach((val, idx) => {
        if (a.unitid === val.monad) {
          this.active = idx
        }
      })
      this.loading = false
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
  .bjSku {
    > ul {
      li {
        padding: 10px 0;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
          width: 240px;
          > .el-input__inner {
            height: 50px;
          }
        }
      }
    }
  }
  .add-price {
    .el-form-item__content {
      line-height: 22px;
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid #D5D5D5;
  }
  .weight-input {
    > input {
      width: 180px;
      height: 48px;
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
  .product-input {
    .el-input__inner {
      height: 50px;
      background: rgba(251, 250, 250, 1);
      border: 1px solid rgb(227, 227, 227);
      border-radius: 4px;
    }
  }
  .el-popover {
    padding: 0;
    margin-left: 6px;
    > .popper__arrow {
      display: none;
    }
  }
  .el-input__inner:focus {
    border: 2px solid #4267B2;
    outline: none;
    border-radius: 4px;
  }
  @import '../../../common/css/elementCommon';
</style>
<style scoped lang="less">
  @import '../../../common/css/common';
  @import '../../../common/css/productCommon';
  @import '../../../common/css/productDetails';
  .productDetails-form{
  }
  .avatar-uploader{
    height: 0;
  }
</style>
