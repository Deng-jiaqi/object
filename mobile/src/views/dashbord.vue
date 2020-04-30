<template>
  <div class="c-dashbord" id="home">
    <!-- Page Loader-->
    <div class="mask" v-show="maskShow" @click="setMaskShow"></div>
    <!-- 顶部 -->
    <div class="header" @touchmove.prevent>
      <div class="header-col">
        <div class="header-col1">
          <img @click="setMaskShow" src="../assets/images/caidan.png" alt />
          <span>{{$t('lang.dashbord.text1')}}</span>
        </div>
        <!-- CHECK -->
        <div>
          <div class="checkImg" v-if="showModalImg" @click="showModalImg=false"></div>
          <div class="refpop" v-if="showModalImg">
            <!-- <p @click="showModalImg=false" ></p> -->
            <div class="clickCheck">
              <ul>
                <li class="check-col">
                  <span>{{$t('lang.dashbord.text5')}}</span>
                  <span>{{$t('lang.dashbord.text6')}}</span>
                </li>
                <li class="check-col">
                  <span>{{$t('lang.dashbord.text7')}}</span>
                  <img class="check-col-img" src="../assets/images/f.png" alt />
                  <img class="check-col-img2" src="../assets/images/g.png" alt />
                </li>
              </ul>
            </div>
          </div>
          <div @click="showModalImg=true">
            <img class="showModalImg-img" src="../assets/images/check.png" alt />
          </div>
        </div>
        <!-- <div class="header-col2">
          <el-popover
            placement="bottom"
            :visible-arrow="false"
            :open-delay="2000"
            width="240"
            trigger="click"
          >
            <div class="check">
              <ul>
                <li class="check-col">
                  <span>{{$t('lang.dashbord.text5')}}</span>
                  <span>{{$t('lang.dashbord.text6')}}</span>
                </li>
                <li class="check-col">
                  <span>{{$t('lang.dashbord.text7')}}</span>
                  <img class="check-col-img" src="../assets/images/f.png" alt />
                  <img class="check-col-img2" src="../assets/images/g.png" alt />
                </li>
              </ul>
            </div>
            <img slot="reference" src="../assets/images/check.png" alt />
          </el-popover>
        </div>-->
      </div>
      <!-- 菜单弹框 -->
      <transition name="fade">
        <template v-if="show">
          <div class="child" id="child" v-show="maskShow">
            <div class="drawer-ul">
              <ul>
                <li
                  @click="toHome('home')"
                  :class="activeNavigation==='home'?'navigation-li-active':''"
                >
                  <a>{{$t('lang.dashbord.text9')}}</a>
                  <!-- 主页 -->
                </li>
                <li @click="toLoginAdmin">{{$t('lang.dashbord.text8')}}</li>
                <li
                  @click="toHome('about')"
                  :class="activeNavigation==='about'?'navigation-li-active':''"
                >
                  <a>{{$t('lang.dashbord.text10')}}</a>
                  <!-- 关于 -->
                </li>
                <li
                  @click="toHome('services')"
                  :class="activeNavigation==='services'?'navigation-li-active':''"
                >
                  <a>{{$t('lang.dashbord.text11')}}</a>
                  <!-- 服务 -->
                </li>
                <li>
                  <el-popover
                    placement="bottom"
                    popper-class="dashbord-language-popover"
                    v-model="languageSwitchVisible"
                  >
                    <ul class="yuyan">
                      <li
                        class="popover-language"
                        @click="tabLang('zh-cn')"
                      >{{$t('lang.dashbord.text17')}}</li>
                      <li
                        class="popover-language"
                        @click="tabLang('en-us')"
                      >{{$t('lang.dashbord.text18')}}</li>
                    </ul>
                    <span class="popover-language-reference" slot="reference">
                      <a>{{$t('lang.dashbord.text12')}}</a>
                    </span>
                  </el-popover>
                </li>
                <li
                  @click="toHome('contact')"
                  :class="activeNavigation==='contact'?'navigation-li-active':''"
                >
                  <a>{{$t('lang.dashbord.text13')}}</a>
                  <!-- 联系我们 -->
                </li>
                <li @click="toHelp">{{$t('lang.dashbord.text14')}}</li>
              </ul>
            </div>
          </div>
        </template>
      </transition>
      <!-- check -->
      <div class="header-text">
        <p
          class="header-text-col"
          ref="contentTextH1"
          style="visibility:hidden"
        >{{$t('lang.dashbord.text15')}}</p>
        <p
          class="header-text-col2"
          ref="contentTextP"
          style="visibility:hidden"
        >{{$t('lang.dashbord.text16')}}</p>
      </div>
      <div class="header-button" ref="toRegisterBtn" style="visibility:hidden">
        <button
          @click="toRegister"
          class="button button-gradient button-ujarak"
        >{{$t('lang.dashbord.text2')}}</button>
      </div>
    </div>
    <!-- 分栏 -->
    <section class="section section-lg bg-white" id="about">
      <div class="container">
        <div class="row row-50 justify-content-md-center justify-content-lg-start">
          <div class="col-md-10 col-lg-6 wow-outer">
            <div class="wow" ref="introductionLeft" style="visibility:hidden">
              <div class="image-custom-1">
                <img src="../assets/images/img.png" alt width="601" height="350" />
              </div>
            </div>
          </div>
          <div class="col-md-10 col-lg-6 wow-outer">
            <div class="box-inset-1 wow" ref="introductionRight" style="visibility:hidden">
              <!-- Bootstrap tabs-->
              <div
                class="tabs-custom tabs-horizontal tabs-corporate tabs-corporate_left"
                id="tabs-about"
              >
                <!-- Nav tabs-->
                <ul class="nav nav-tabs">
                  <li
                    class="nav-item"
                    @click="qiehuan(index)"
                    v-for="(item, index) in routerData"
                    :key="index"
                  >
                    <span class="nav-link" :class="{'liBack': activeColor === index}">{{item.text}}</span>
                  </li>
                </ul>
                <!-- Tab panes-->
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tabs-about-1">
                    <h4>{{$t('lang.dashbord.text24')}}</h4>
                    <p>{{$t('lang.dashbord.text25')}}</p>
                    <p>{{$t('lang.dashbord.text26')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 数字 -->
    <section
      class="section parallax-container bg-gray-darker"
      data-parallax-img="images/bg-image-2-1920x1121.jpg"
    >
      <div class="parallax-content parallax-content-col1">
        <div class="section-lg text-center">
          <div class="container">
            <div class="row row-30 offset-top-1">
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterOne" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <span>{{boxCounterOneString}}</span>
                      <span class="small">{{$t('lang.dashbord.text28')}}</span>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text29')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterTwo" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">{{boxCounterTwoString}}</div>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text31')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterThree" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">{{boxCounterThreeString}}</div>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text33')}}</p>
                  </article>
                </div>
              </div>
              <div class="col-sm-6 col-md-3 wow-outer">
                <div class="wow" ref="boxCounterFour" style="visibility:hidden">
                  <!-- Box counter-->
                  <article class="box-counter">
                    <div class="box-counter__main">
                      <div class="counter">{{boxCounterFourString}}</div>
                      <span class="small small_top">{{$t('lang.dashbord.text35')}}</span>
                    </div>
                    <div class="box-counter__divider"></div>
                    <p class="box-counter__title">{{$t('lang.dashbord.text36')}}</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- whychooseus -->
    <section class="section section-md text-center bg-gray-lighter" id="choose">
      <div class="container">
        <h2 class="wow-outer">
          <span
            class="wow"
            ref="whyChooseTitle"
            style="visibility:hidden"
          >{{$t('lang.dashbord.text37')}}</span>
        </h2>
        <div class="row row-30 row-md-70 wow" ref="whyChooseContent" style="visibility:hidden">
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-gear30"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text38')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text39')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-headphones32"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text40')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text41')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-circular229"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text42')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text43')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon box-lucy__icon-md fl-bigmug-line-lock64"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text44')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text45')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon box-lucy__icon-sm fl-bigmug-line-email64"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text46')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text47')}}</p>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Lucy-->
            <article class="box-lucy">
              <div class="box-lucy__aside">
                <div class="box-lucy__icon-outer">
                  <svg
                    class="box-lucy__icon-shape"
                    xmlns="http://www.w3.org/2000/svg"
                    width="59px"
                    height="68px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="2px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M29.000,66.000 L1.012,49.750 L1.012,17.250 L29.000,1.000 L56.988,17.250 L56.988,49.750 L29.000,66.000 Z"
                    />
                  </svg>
                  <span class="box-lucy__icon fl-bigmug-line-cloud255"></span>
                </div>
                <h5 class="box-lucy__title">{{$t('lang.dashbord.text48')}}</h5>
              </div>
              <div class="box-lucy__main">
                <p>{{$t('lang.dashbord.text49')}}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <!-- 我们的服务 -->
    <section class="section section-sm bg-white" id="services">
      <div class="container">
        <h2 class="wow-outer text-center">
          <span
            class="wow"
            ref="ourServicesTitle"
            style="visibility:hidden"
          >{{$t('lang.dashbord.text50')}}</span>
        </h2>
        <div class="row row-30 wow fadeIn" ref="ourServicesContent" style="visibility:hidden">
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-chat51"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text51')}}</h5>
                  <p>{{$t('lang.dashbord.text52')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-three142"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text53')}}</h5>
                  <p>{{$t('lang.dashbord.text54')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-graphical8"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text55')}}</h5>
                  <p>{{$t('lang.dashbord.text56')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-circular228"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text57')}}</h5>
                  <p>{{$t('lang.dashbord.text58')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-favourites5"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text59')}}</h5>
                  <p>{{$t('lang.dashbord.text60')}}</p>
                </div>
              </div>
            </article>
          </div>
          <div class="col-md-6 col-lg-4">
            <!-- Box Alice-->
            <article class="box-alice">
              <div class="box-alice__inner">
                <div class="box-alice__aside">
                  <div class="box-alice__icon-outer">
                    <span class="box-alice__icon fl-bigmug-line-list63"></span>
                  </div>
                </div>
                <div class="box-alice__main">
                  <h5 class="box-alice__title">{{$t('lang.dashbord.text61')}}</h5>
                  <p>{{$t('lang.dashbord.text62')}}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <!-- 联系二维码 -->
    <div class="c-contact">
      <h3 class="c-contact-title">
        <span ref="codeTitle" style="visibility:hidden">{{$t('lang.dashbord.text79')}}</span>
      </h3>
      <div class="c-contact-qr-code" ref="codeimgOne" style="visibility:hidden">
        <img src="../assets/images/code-left.png" alt />
        <p class="qr-describe">{{$t('lang.dashbord.text80')}}</p>
      </div>
      <div class="c-contact-qr-code" ref="codeimgTwo" style="visibility:hidden">
        <img src="../assets/images/code-left.png" alt />
        <p class="qr-describe">{{$t('lang.dashbord.text82')}}</p>
      </div>
    </div>
    <!-- 填写信息 -->
    <section class="section section-md bg-white contact-us-section" id="contact-us">
      <div class="container container_bigger">
        <div
          class="row justify-content-md-center justify-content-xl-between row-2-columns-bordered row-50"
        >
          <div class="col-md-10 col-lg-5 wow-outer">
            <div class="wow" ref="getInTouch" style="visibility: hidden">
              <h3>{{$t('lang.dashbord.text66')}}</h3>
              <ul class="list-creative">
                <li>
                  <dl class="list-terms-medium list-terms-medium_tertiary">
                    <dt>{{$t('lang.dashbord.text71')}}</dt>
                    <dd>
                      <ul class="list-comma">
                        <li>
                          <a href="mailto:#">{{$t('lang.dashbord.text72')}}</a>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
          <div id="contact">
            <div ref="contactForm" style="visibility: hidden">
              <h3 class="text-center">{{$t('lang.dashbord.text73')}}</h3>
              <!-- RD Mailform-->
              <el-form class="formCss" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item prop="getname">
                  <el-input
                    type="text"
                    class="getname"
                    v-model="ruleForm.getname"
                    :placeholder="$t('lang.dashbord.text75')"
                  />
                </el-form-item>
                <el-form-item prop="getphone">
                  <el-input
                    type="text"
                    class="getphone"
                    v-model="ruleForm.getphone"
                    :placeholder="$t('lang.dashbord.text76')"
                  />
                </el-form-item>
                <el-form-item prop="getmessage">
                  <el-input
                    type="textarea"
                    class="getmessage"
                    v-model="ruleForm.getmessage"
                    :placeholder="$t('lang.dashbord.text77')"
                  />
                </el-form-item>
                <el-form-item prop="getemail">
                  <el-input
                    type="text"
                    class="getemail"
                    v-model="ruleForm.getemail"
                    :placeholder="$t('lang.dashbord.text78')"
                  />
                </el-form-item>
                <div class="form-col4">
                  <button
                    v-preventReClick="2000"
                    v-loading="loading"
                    @click="centerDialogVisibleBtn('ruleForm')"
                  >{{btnHint}}</button>
                </div>
                <button @click="resetForm('ruleForm')" class="btnHint"></button>
              </el-form>
              <!-- 底部 -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { concatusData } from '../common/api/api'
export default {
  name: 'Dashbord',
  data () {
    var validatePhone = (rule, value, callback) => {
      const reg = /^[0-9]*$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text1')))
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error(this.$t('lang.dashbord.hint.text2')))
        } else {
          callback()
        }
      }
    }
    var validateEMail = (rule, value, callback) => {
      // eslint-disable-next-line no-useless-escape
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (value === '' || value === undefined || value == null) {
        callback(new Error(this.$t('lang.dashbord.hint.text3')))
      } else {
        if (!reg.test(value)) {
          callback(new Error(this.$t('lang.dashbord.hint.text4')))
        } else {
          callback()
        }
      }
    }
    var validateName = (rule, value, callback) => {
      const reg = /^[ \u4E00-\u9FA5a-zA-Z/ ]+$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text5')))
      } else {
        if ((!reg.test(value)) && value !== '') {
          callback(new Error(this.$t('lang.dashbord.hint.text6')))
        } else {
          callback()
        }
      }
    }
    var validateLength = (rule, value, callback) => {
      const reg = /^.{5,60}$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error(this.$t('lang.dashbord.hint.text7')))
      } else {
        if (!reg.test(value)) {
          callback(new Error(this.$t('lang.dashbord.hint.text7')))
        } else {
          callback()
        }
      }
    }
    return {
      showModalImg: false,
      maskShow: false,
      show: true,
      btnHint: this.$t('lang.dashbord.text74'),
      activeNavigation: 'Home',
      activeColor: 0, // 0为默认选择第一个，-1为不选择
      routerData: [
        {
          href: 'javascript:void(0)',
          text: this.$t('lang.dashbord.text20')
        },
        {
          href: '#choose',
          text: this.$t('lang.dashbord.text21')
        },
        {
          href: '#services',
          text: this.$t('lang.dashbord.text23')
        }
      ],
      // 变量
      boxCounterOne: 0,
      boxCounterTwo: 0,
      boxCounterThree: 0,
      boxCounterFour: 0,
      afterNumberChange: false,
      // data
      animateRefList: [
        // 需要增加动画的元素的ref和动画名称的集合
        {
          refName: 'contentTextH1',
          animateName: 'fadeInUp'
        },
        {
          refName: 'contentTextP',
          animateName: 'fadeInUp'
        },
        {
          refName: 'toRegisterBtn',
          animateName: 'fadeInUp'
        },
        {
          refName: 'introductionLeft',
          animateName: 'slideInLeft'
        },
        {
          refName: 'introductionRight',
          animateName: 'slideInRight'
        },
        {
          refName: 'boxCounterOne',
          animateName: 'slideInDown'
        },
        {
          refName: 'boxCounterTwo',
          animateName: 'fadeInUp'
        },
        {
          refName: 'boxCounterThree',
          animateName: 'fadeInUp'
        },
        {
          refName: 'boxCounterFour',
          animateName: 'slideInDown'
        },
        {
          refName: 'whyChooseTitle',
          animateName: 'fadeInUp'
        },
        {
          refName: 'whyChooseContent',
          animateName: 'fadeIn'
        },
        {
          refName: 'ourServicesTitle',
          animateName: 'fadeInUp'
        },
        {
          refName: 'ourServicesContent',
          animateName: 'fadeIn'
        },
        {
          refName: 'codeTitle',
          animateName: 'fadeInUp'
        },
        {
          refName: 'codeimgOne',
          animateName: 'fadeIn'
        },
        {
          refName: 'codeimgTwo',
          animateName: 'fadeIn'
        },
        {
          refName: 'getInTouch',
          animateName: 'slideInLeft'
        },
        {
          refName: 'contactForm',
          animateName: 'slideInRight'
        }
      ],
      languageSwitchVisible: false,
      drawer: false,
      direction: 'ltr',
      ruleForm: {
        getname: '', // 名字
        getphone: '', // 电话
        getmessage: '', // 信息
        getemail: '' // 邮箱
      },
      rules: {
        getphone: [
          { validator: validatePhone, trigger: 'change' }
        ],
        getemail: [
          { validator: validateEMail, trigger: 'change' }
        ],
        getname: [
          { validator: validateName, trigger: 'change' }
        ],
        getmessage: [
          { validator: validateLength, trigger: 'change' }
        ]
      },
      getFormName: ''
    }
  },
  computed: {
    boxCounterOneString () {
      return this.boxCounterOne.toFixed(1)
    },
    boxCounterTwoString () {
      return this.boxCounterTwo.toFixed(0)
    },
    boxCounterThreeString () {
      return this.boxCounterThree.toFixed(0)
    },
    boxCounterFourString () {
      return this.boxCounterFour.toFixed(0)
    }
  },
  methods: {
    setMaskShow () {
      this.maskShow = !this.maskShow
    },
    qiehuan (index) {
      this.activeColor = index
      if (index === 0) {
      } else if (index === 1) {
        document.getElementById('choose').scrollIntoView({ block: 'start', behavior: 'smooth' })
      } else {
        document.getElementById('services').scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    },
    toHome (id) {
      this.drawer = false
      this.maskShow = false
      this.activeNavigation = id
      document
        .getElementById(id)
        .scrollIntoView({ block: 'center', behavior: 'smooth' })
      this.addAnimate()
    },
    handleScroll () {
      // 滚动事件
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.addAnimate()
      }, 200)
    },
    addAnimate () {
      // 增加动画
      this.animateRefList.forEach(item => {
        if (
          this.$refs[item.refName].getBoundingClientRect().top <
          window.innerHeight + document.body.scrollTop
        ) {
          this.$refs[item.refName].style.visibility = 'visible'
          this.$refs[item.refName].classList.add(item.animateName)
          this.$refs[item.refName].classList.add('animated') // ie不支持同时添加
          switch (item.refName) {
            // 数字递增
            case 'boxCounterOne':
              // js小数计算问题
              if (this.afterNumberChange) {
                break
              }
              this.afterNumberChange = true
              this.numberIncreasing('one', 0.08)
              this.numberIncreasing('two', 1.35)
              this.numberIncreasing('three', 4.35)
              this.numberIncreasing('four', 4.95)
              break
            default:
              break
          }
        }
      })
    },
    numberIncreasing (increaseTarget, growthRate) { // 动画是2秒默认2秒内增加到多少
      let count = 0
      let timer = setInterval(() => {
        if (count === 19) {
          clearInterval(timer)
        }
        count += 1
        switch (increaseTarget) {
          case 'one':
            this.boxCounterOne += growthRate
            break
          case 'two':
            this.boxCounterTwo += growthRate
            break
          case 'three':
            this.boxCounterThree += growthRate
            break
          case 'four':
            this.boxCounterFour += growthRate
            break
          default:
            break
        }
      }, 100)
    },
    showToggle () {
      this.drawer = !this.drawer
    },
    toRegister () {
      this.$router.push({
        path: '/loginAndRegister/ARegisterOfIndex'
      })
      this.drawer = false
      this.maskShow = false
    },
    toLoginAdmin () {
      if (this.$cookies.get('ALoginInfoSuccessList')) {
        this.$router.push({
          path: '/loginAndRegister/loginOfRecent',
          query: { isWho: 'admin' }
        })
      } else {
        this.$router.push({ path: '/loginAndRegister/ALogin' })
      }
    },
    tabLang (type) {
      this.$cookies.set('think_var', type)
      this.$i18n.locale = type
      // this.reload()
      this.btnHint = this.$t('lang.dashbord.text74')
      this.languageSwitchVisible = false
      this.maskShow = false
      this.btnHint = this.$t('lang.dashbord.text74')
      this.routerData = [
        {
          href: 'javascript:void(0)',
          text: this.$t('lang.dashbord.text20')
        },
        {
          href: '#choose',
          text: this.$t('lang.dashbord.text21')
        },
        {
          href: '#services',
          text: this.$t('lang.dashbord.text23')
        }
      ]
      this.resetForm('ruleForm')
      this.drawer = false
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toHelp () {
      this.$router.push({
        path: '/helpCenter/help/helpRegister'
      })
    },
    centerDialogVisibleBtn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnHint = this.$t('lang.dashbord.text86')
          console.log('通过验证')
          concatusData({
            name: this.ruleForm.getname,
            message: this.ruleForm.getmessage,
            phone: this.ruleForm.getphone,
            email: this.ruleForm.getemail
          }).then(resp => {
            if (resp.data.code === 1) {
              this.$message.success(resp.data.msg)
              this.btnHint = this.$t('lang.dashbord.text74')
              this.ruleForm.getname = ''
              this.ruleForm.getmessage = ''
              this.ruleForm.getphone = ''
              this.ruleForm.getemail = ''
              this.resetForm('ruleForm')
            } else {
              this.$message.error(resp.data.msg)
            }
          })
        } else {
        }
      })
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.addAnimate() // 防止在顶部时候已经有元素需要加动画
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style src='../utils/css/bootstrap.css' scoped>
</style>
<style  src='../utils/css/fonts.css' scoped>
</style>
<style src='../utils/css/style.css' scoped>
</style>
<style lang='less'>
.dashbord-language-popover {
  border: 0;
  min-width: fit-content;
  margin-left: 8px;
  // padding: 0 px;
}
.el-drawer__header {
  padding: 0;
  margin-bottom: 0.2rem;
}
.el-form-item__error {
  margin-left: 20px;
}

.el-form-item__error:nth-child(3) {
  margin-top: 10px;
}
.el-input__inner {
  background-color: rgb(246, 243, 247);
}
.el-textarea__inner {
  background-color: rgb(246, 243, 247);
  height: 2.5rem;
}
</style>
<style lang="less" scoped>
@import "../common/css/dashbord";
.formCss {
  > .el-form-item {
    display: flex;
    align-items: center;
  }
}
.btnHint {
  height: 0 !important;
  width: 0 !important;
  overflow: hidden !important;
  opacity: 0;
}
.dashbord-popover-language {
  min-width: 0;
}
.backOne {
  background: #55bbbb;
}
.backTwo {
  background: #55bbbb;
}
.popover-language {
  line-height: 40px;
  width: 100px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}
.popover-language:hover {
  background-color: #f9fafb;
}
.popover-language-reference {
  cursor: pointer;
}
.popover-language-reference:focus {
  outline: none;
}
.liBack {
  background: linear-gradient(
    -20deg,
    rgba(60, 97, 172, 1),
    rgba(108, 129, 228, 1)
  ) !important;
  color: white !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.father {
  width: 100%;
  height: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
  z-index: 111;
}
.child {
  position: fixed;
  width: 45%;
  height: 10rem;
  border: 1px solid #ccc;
  top: 40px;
  background: #fff;
  z-index: 222;
}
.checkImg {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.refpop {
  background-color: #ffffff;
  position: fixed;
  top: 40px;
  left: 32%;
  width: calc(100% - 600px);
  left: 140px;
  height: calc(100% - 200px);
  z-index: 3;
}
.clickCheck {
  background-color: #ffffff;
  border: 1px solid;
  width: 64vw;
  border: 1px solid;
  height: 2.1rem;
}
</style>
